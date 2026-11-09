export type RateLimitResult =
  | { status: "allowed"; remaining: number }
  | { status: "limited"; retryAfter: number }
  | { status: "unavailable" };

export function checkRateLimit(
  request: Request,
  options: { identifier: string; limit: number; windowMs: number },
  fetchImpl?: typeof fetch,
): Promise<RateLimitResult>;
