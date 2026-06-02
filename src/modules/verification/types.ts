/**
 * Domain types for the 'verification' module.
 * Cross-module shared types belong in @/types.
 */

/**
 * Vendor verification lifecycle:
 *   unverified → pending (submitted, awaiting admin) → verified (or rejected).
 * Stored on the auth user's metadata as `verification_status`.
 */
export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export type VerificationResult = { ok: true } | { ok: false; error: string };
