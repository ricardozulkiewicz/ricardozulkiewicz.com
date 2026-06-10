type StateMode = "remote" | "memory";

type FixedWindowCounter = {
  count: number;
  resetAt: number;
};

type EphemeralValue = {
  value: string;
  expiresAt: number;
};

type RedisRestResponse<T> = {
  result?: T;
  error?: string;
};

const memoryCounters = new Map<string, FixedWindowCounter>();
const memoryValues = new Map<string, EphemeralValue>();

function getRedisRestConfig() {
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  if (kvUrl && kvToken) {
    return {
      url: kvUrl.replace(/\/$/, ""),
      token: kvToken,
    };
  }

  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (upstashUrl && upstashToken) {
    return {
      url: upstashUrl.replace(/\/$/, ""),
      token: upstashToken,
    };
  }

  return null;
}

export function isRemoteServerStateConfigured() {
  return Boolean(getRedisRestConfig());
}

export function getServerStateMode(): StateMode {
  return isRemoteServerStateConfigured() ? "remote" : "memory";
}

async function redisCommand<T>(command: Array<string | number>) {
  const config = getRedisRestConfig();

  if (!config) {
    throw new Error("Remote state store is not configured.");
  }

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  const payload = (await response.json()) as RedisRestResponse<T>;

  if (!response.ok || payload.error) {
    throw new Error(payload.error || "Remote state command failed.");
  }

  return payload.result as T;
}

function cleanupExpiredValues(now = Date.now()) {
  for (const [key, entry] of Array.from(memoryValues.entries())) {
    if (entry.expiresAt <= now) {
      memoryValues.delete(key);
    }
  }
}

function incrementMemoryFixedWindow(args: {
  key: string;
  limit: number;
  windowMs: number;
  now?: number;
}) {
  const now = args.now || Date.now();
  const existing = memoryCounters.get(args.key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + args.windowMs;
    memoryCounters.set(args.key, { count: 1, resetAt });

    return {
      allowed: true,
      remaining: args.limit - 1,
      resetAt,
      mode: "memory" as const,
    };
  }

  if (existing.count >= args.limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: existing.resetAt,
      mode: "memory" as const,
    };
  }

  existing.count += 1;
  memoryCounters.set(args.key, existing);

  return {
    allowed: true,
    remaining: Math.max(args.limit - existing.count, 0),
    resetAt: existing.resetAt,
    mode: "memory" as const,
  };
}

export async function incrementFixedWindow(args: {
  key: string;
  limit: number;
  windowMs: number;
}) {
  const now = Date.now();
  const ttlMs = Math.max(args.windowMs, 1000);

  if (isRemoteServerStateConfigured()) {
    try {
      const count = Number(await redisCommand<number>(["INCR", args.key]));

      if (count === 1) {
        await redisCommand<number>(["PEXPIRE", args.key, ttlMs]);
      }

      let remoteTtlMs = Number(await redisCommand<number>(["PTTL", args.key]));

      if (remoteTtlMs < 0) {
        await redisCommand<number>(["PEXPIRE", args.key, ttlMs]);
        remoteTtlMs = ttlMs;
      }

      return {
        allowed: count <= args.limit,
        remaining: Math.max(args.limit - count, 0),
        resetAt: now + remoteTtlMs,
        mode: "remote" as const,
      };
    } catch (error) {
      const fallback = incrementMemoryFixedWindow({ ...args, now });

      return {
        ...fallback,
        remoteError: error instanceof Error ? error.message : "Remote state failed.",
      };
    }
  }

  return incrementMemoryFixedWindow({ ...args, now });
}

export async function setEphemeralIfAbsent(args: {
  key: string;
  value: string;
  ttlSeconds: number;
}) {
  const ttlSeconds = Math.max(Math.ceil(args.ttlSeconds), 1);

  if (isRemoteServerStateConfigured()) {
    try {
      const result = await redisCommand<string | null>([
        "SET",
        args.key,
        args.value,
        "NX",
        "EX",
        ttlSeconds,
      ]);

      return {
        stored: result === "OK",
        mode: "remote" as const,
      };
    } catch (error) {
      const fallback = setMemoryEphemeralIfAbsent(args);

      return {
        ...fallback,
        remoteError: error instanceof Error ? error.message : "Remote state failed.",
      };
    }
  }

  return setMemoryEphemeralIfAbsent(args);
}

function setMemoryEphemeralIfAbsent(args: {
  key: string;
  value: string;
  ttlSeconds: number;
}) {
  const now = Date.now();
  cleanupExpiredValues(now);

  const existing = memoryValues.get(args.key);

  if (existing && existing.expiresAt > now) {
    return {
      stored: false,
      mode: "memory" as const,
    };
  }

  memoryValues.set(args.key, {
    value: args.value,
    expiresAt: now + Math.max(args.ttlSeconds, 1) * 1000,
  });

  return {
    stored: true,
    mode: "memory" as const,
  };
}
