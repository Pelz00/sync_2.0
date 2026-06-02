/**
 * Domain types for the 'auth' module.
 * Cross-module shared types belong in @/types.
 */

/** Account roles captured at signup (drives post-verify routing + the proxy gate). */
export type Role = 'student' | 'vendor';

/** Result of an auth mutation. Actions return this instead of throwing, so the
 *  client can surface a friendly message and never sees raw Supabase errors. */
export type AuthResult = { ok: true } | { ok: false; error: string };

/** Verify result also carries the role so the client can route to the right
 *  landing (vendors → /onboarding, students → the app). */
export type VerifyResult = { ok: true; role: Role } | { ok: false; error: string };
