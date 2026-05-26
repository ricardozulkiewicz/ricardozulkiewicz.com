type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateLimitEntry>();

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

export function checkRateLimit(args: {
  key: string;
  limit: number;
  windowMs: number;
}) {
  const now = Date.now();
  const existing = buckets.get(args.key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(args.key, {
      count: 1,
      resetAt: now + args.windowMs,
    });

    return {
      allowed: true,
      remaining: args.limit - 1,
      resetAt: now + args.windowMs,
    };
  }

  if (existing.count >= args.limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: existing.resetAt,
    };
  }

  existing.count += 1;
  buckets.set(args.key, existing);

  return {
    allowed: true,
    remaining: Math.max(args.limit - existing.count, 0),
    resetAt: existing.resetAt,
  };
}

export function getRetryAfterSeconds(resetAt: number) {
  return Math.max(Math.ceil((resetAt - Date.now()) / 1000), 1);
}
