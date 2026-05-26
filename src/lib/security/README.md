# lib/security

Security helpers — headers, rate-limit factories, sanitization.

- `headers.ts` — CSP, X-Frame-Options, etc. (applied via `next.config.ts`).
- `rateLimit.ts` — Upstash-backed limiters for auth, OTP, and quote endpoints.
- `sanitize.ts` — for any rich text. Never `dangerouslySetInnerHTML` raw user input.
- `mask.ts` — masks NIN/BVN/document numbers for display.
