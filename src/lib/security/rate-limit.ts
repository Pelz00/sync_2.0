/**
 * Rate-limit factories - Upstash-backed.
 *
 * Apply to: auth endpoints (login, signup), OTP requests, password reset,
 * trades-quote submission, and any other write endpoint a single user
 * shouldn't be hitting hundreds of times a minute.
 *
 * `getIdentifier(req)` picks the IP from common Vercel/Cloudflare headers,
 * falling back to a UA fingerprint. For authenticated endpoints, prefer
 * `user.id` as the identifier to avoid one bad NAT killing a whole campus.
 *
 * If Upstash env vars are missing (local dev), every limiter is a no-op so
 * the app stays usable.
 */
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const isConfigured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

const redis = isConfigured ? Redis.fromEnv() : null;

interface LimiterSpec {
  /** Window length, accepted by Ratelimit.slidingWindow. */
  window: `${number} ${'s' | 'm' | 'h' | 'd'}`;
  /** Requests per window. */
  requests: number;
}

const SPECS = {
  auth: { window: '1 m', requests: 5 },
  otp: { window: '15 m', requests: 5 },
  passwordReset: { window: '1 h', requests: 3 },
  quote: { window: '1 m', requests: 10 },
  webhook: { window: '1 s', requests: 100 },
} as const satisfies Record<string, LimiterSpec>;

export type LimiterName = keyof typeof SPECS;

function build(name: LimiterName) {
  if (!redis) return null;
  const spec = SPECS[name];
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(spec.requests, spec.window),
    prefix: `sync:rl:${name}`,
    analytics: true,
  });
}

const limiters: Partial<Record<LimiterName, Ratelimit | null>> = {};

export function rateLimiter(name: LimiterName) {
  if (!(name in limiters)) limiters[name] = build(name);
  return limiters[name];
}

/**
 * Run a limiter and return whether the request should proceed.
 * No-ops to `{ success: true }` if Upstash isn't configured.
 */
export async function checkRateLimit(name: LimiterName, identifier: string) {
  const limiter = rateLimiter(name);
  if (!limiter) {
    return { success: true, limit: 0, remaining: 0, reset: 0 } as const;
  }
  return limiter.limit(identifier);
}

/** Best-effort caller identifier from request headers. */
export function getRequestIdentifier(req: Request): string {
  const h = req.headers;
  return (
    h.get('x-real-ip') ??
    h.get('cf-connecting-ip') ??
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'anonymous'
  );
}
