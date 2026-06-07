/**
 * Personalised dashboard handles. Student and vendor dashboards are reachable at
 * a name-based root URL (e.g. `/muiz-owolabi/insights`, `/hifoods/orders`) which
 * the proxy rewrites to the real `/me` and `/vendor` pages.
 *
 * The handle is cosmetic + private: the proxy only rewrites when the first path
 * segment equals the SIGNED-IN user's own handle, so it never exposes other
 * users' dashboards. Both the proxy and getDashboardProfile derive the handle
 * from the SAME inputs (user_metadata + email) via `resolveHandle`, so the
 * sidebar links and the rewrite always agree.
 */

/** Lowercase, hyphenated slug of a display name. Returns null if it's empty. */
export function toHandle(name?: string | null): string | null {
  if (!name) return null;
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || null;
}

/**
 * The signed-in user's handle: vendors key off business name, everyone else off
 * full name, falling back to the email local-part. Kept deliberately simple
 * (no uniqueness suffix) - swap for a stored `handle` column when we need it.
 */
export function resolveHandle(opts: {
  role?: string;
  full_name?: string | null;
  business_name?: string | null;
  email?: string | null;
}): string | null {
  const primary = opts.role === 'vendor' ? opts.business_name || opts.full_name : opts.full_name;
  return toHandle(primary || opts.email?.split('@')[0]);
}

/**
 * Top-level URL segments that are real routes, so they must NEVER be treated as
 * a personalised handle. (Static routes win over a handle anyway, but this keeps
 * the proxy from even trying - and documents the reserved namespace.)
 */
export const RESERVED_HANDLES: ReadonlySet<string> = new Set([
  '403',
  'about',
  'admin',
  'api',
  'around',
  'beauty',
  'checkout',
  'dev',
  'events',
  'food',
  'for-vendors',
  'hostels',
  'hotspots',
  'how-it-works',
  'landlord',
  'laundry',
  'login',
  'me',
  'onboarding',
  'search',
  'signup',
  'vendor',
  'verify',
  'wallet',
  'workmanship',
]);

export function isReservedHandle(segment: string): boolean {
  return RESERVED_HANDLES.has(segment.toLowerCase());
}
