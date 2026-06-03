/**
 * Domain types for the 'auth' module.
 * Cross-module shared types belong in @/types.
 */

/** Account roles. Signup only ever assigns student/vendor; admin/super_admin
 *  are granted server-side. Drives routing + the proxy gate. */
export type Role = 'student' | 'vendor' | 'admin' | 'super_admin';

/** Result of an auth mutation. Actions return this instead of throwing, so the
 *  client can surface a friendly message and never sees raw Supabase errors. */
export type AuthResult = { ok: true } | { ok: false; error: string };

/** Signup result. `alreadyRegistered` lets the form send the user to /login
 *  instead of /verify when the email already has a confirmed account. */
export type SignUpResult =
  | { ok: true }
  | { ok: false; error: string; alreadyRegistered?: boolean };

/** Verify result also carries the role so the client can route to the right
 *  landing (vendors → /onboarding, students → the app). */
export type VerifyResult = { ok: true; role: Role } | { ok: false; error: string };
