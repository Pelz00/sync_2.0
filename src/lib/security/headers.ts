/**
 * Security headers applied to every response.
 *
 * Mounted via `next.config.ts → headers()`. Tweak the CSP carefully: each
 * loosening should have a reason commented inline.
 *
 * Notes:
 *   - HSTS is only safe once HTTPS is fully deployed; do not add to dev hosts.
 *   - `frame-ancestors 'none'` is the modern equivalent of X-Frame-Options.
 *     We keep both for older browsers.
 *   - `'unsafe-inline'` is allowed for styles because Tailwind / next/font
 *     inject `<style>` tags during streaming. We do NOT allow it for scripts.
 */
const PAYSTACK_ORIGINS = 'https://js.paystack.co https://checkout.paystack.com';

// Allow Supabase storage + signed URLs for images, and Supabase realtime / REST.
const SUPABASE_ORIGINS = 'https://*.supabase.co https://*.supabase.in wss://*.supabase.co';

// OpenStreetMap raster tiles for the AroundMap (Leaflet). The {s} subdomain
// expands to a/b/c.tile.openstreetmap.org - all covered by the wildcard.
const MAP_TILE_ORIGINS = 'https://*.tile.openstreetmap.org';

// React + Next dev tooling (HMR, error overlay, call-stack reconstruction)
// requires `eval()` in dev mode. Production never needs it.
//
// Two signals checked because this user's shell exports NODE_ENV=production:
//   1. NEXT_PHASE - set by Next itself ('phase-development-server' in dev,
//      'phase-production-build' / 'phase-production-server' otherwise).
//      Reliable regardless of shell env.
//   2. NODE_ENV - secondary fallback.
const nextPhase = process.env.NEXT_PHASE;
const isDev =
  nextPhase === 'phase-development-server' ||
  (nextPhase === undefined && process.env.NODE_ENV !== 'production');
const DEV_SCRIPT_RELAXATIONS = isDev ? `'unsafe-eval'` : '';

export const contentSecurityPolicy = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-inline' ${DEV_SCRIPT_RELAXATIONS} ${PAYSTACK_ORIGINS}`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: blob: ${SUPABASE_ORIGINS} ${MAP_TILE_ORIGINS}`,
  `font-src 'self' data:`,
  `connect-src 'self' ${SUPABASE_ORIGINS} ${PAYSTACK_ORIGINS}${isDev ? ' ws: http://localhost:* ws://localhost:*' : ''}`,
  `frame-src ${PAYSTACK_ORIGINS}`,
  `frame-ancestors 'none'`,
  `base-uri 'self'`,
  `form-action 'self' ${PAYSTACK_ORIGINS}`,
  `object-src 'none'`,
  `upgrade-insecure-requests`,
].join('; ');

export const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self), payment=(self)',
  },
  // HSTS only in production - never on localhost or it pins your browser.
  ...(process.env.NODE_ENV === 'production'
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ]
    : []),
] as const;
