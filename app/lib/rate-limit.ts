import { incrementFixedWindow } from "./server-state";

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

export async function checkRateLimit(args: {
  key: string;
  limit: number;
  windowMs: number;
}) {
  return incrementFixedWindow(args);
}

export function getRetryAfterSeconds(resetAt: number) {
  return Math.max(Math.ceil((resetAt - Date.now()) / 1000), 1);
}
