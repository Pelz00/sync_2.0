/**
 * Bootstrap admin allowlist from the `ADMIN_EMAILS` env var. Format is comma-
 * separated `email[:role]`, where role is `admin` (default) or `super_admin`:
 *
 *   ADMIN_EMAILS=hello@raavon.com:super_admin,muiz@raavon.com:admin
 *
 * This lets the founding admins be detected + routed even before the DB
 * `profiles.role` is set (and self-heals it on first OTP login). The `profiles`
 * table stays the source of truth once seeded. Not a secret - it only decides
 * which login input shows + bootstraps routing; real access is RLS + the
 * server-side role checks on /admin pages.
 */
export type AdminRole = 'admin' | 'super_admin';

const MAP = new Map<string, AdminRole>();
for (const entry of (process.env.ADMIN_EMAILS ?? '').split(',')) {
  const [email, role] = entry.split(':').map((s) => s.trim().toLowerCase());
  if (email) MAP.set(email, role === 'super_admin' ? 'super_admin' : 'admin');
}

/** The bootstrap admin role for an email, or null if it isn't an admin email. */
export function adminRoleForEmail(email?: string | null): AdminRole | null {
  if (!email) return null;
  return MAP.get(email.toLowerCase()) ?? null;
}
