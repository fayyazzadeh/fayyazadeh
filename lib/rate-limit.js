import { createHash } from "node:crypto";

const RATE_LIMIT_SCRIPT = [
  "local count = redis.call('INCR', KEYS[1])",
  "if count == 1 then redis.call('PEXPIRE', KEYS[1], ARGV[1]) end",
  "local ttl = redis.call('PTTL', KEYS[1])",
  "return {count, ttl}",
].join("\n");

/**
 * Uses an atomic Redis fixed-window counter. Client addresses are hashed before
 * being included in Redis keys so raw IP addresses are not stored there.
 */
export async function checkRateLimit(
  request,
  { identifier, limit, windowMs },
  fetchImpl = fetch,
) {
  const url = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/+$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return { status: "unavailable" };

  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp = (
    request.headers.get("x-real-ip") ||
    (forwardedFor ? forwardedFor.split(",")[0] : "")
  ).trim();

  if (!clientIp || clientIp.length > 64) return { status: "unavailable" };

  const ipHash = createHash("sha256").update(clientIp).digest("hex").slice(0, 32);
  const redisKey = `rate-limit:v1:${identifier}:${ipHash}`;

  try {
    const response = await fetchImpl(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["EVAL", RATE_LIMIT_SCRIPT, "1", redisKey, String(windowMs)]),
      cache: "no-store",
      signal: AbortSignal.timeout(2500),
    });

    if (!response.ok) throw new Error(`Upstash HTTP ${response.status}`);

    const payload = await response.json();
    const count = Number(payload?.result?.[0]);
    const ttl = Number(payload?.result?.[1]);

    if (payload?.error || !Number.isSafeInteger(count) || !Number.isFinite(ttl) || ttl < 0) {
      throw new Error("Invalid Upstash rate-limit response");
    }

    if (count > limit) {
      return { status: "limited", retryAfter: Math.max(1, Math.ceil(ttl / 1000)) };
    }

    return { status: "allowed", remaining: Math.max(0, limit - count) };
  } catch {
    // Fail closed: an outage must not silently disable abuse protection.
    return { status: "unavailable" };
  }
}
