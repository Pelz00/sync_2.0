/**
 * Reusable zod primitives composed by every domain schema. Defined once so
 * the same rules (length, format, error message) apply everywhere.
 */
import { z } from 'zod';

/** Email: trimmed, lowercased, capped to a sane DB-friendly length. */
export const email = z
  .string()
  .trim()
  .toLowerCase()
  .min(3, 'Email is required')
  .max(254, 'Email is too long')
  .email('Enter a valid email');

/**
 * Password: 8+ chars, must mix letters and numbers. Strength rules are
 * pragmatic for Nigerian student users - too strict and we lose signups.
 */
export const password = z
  .string()
  .min(8, 'Use at least 8 characters')
  .max(128, 'Password is too long')
  .regex(/[A-Za-z]/, 'Include at least one letter')
  .regex(/\d/, 'Include at least one number');

/** Nigerian phone - accepts +2348012345678 / 08012345678 / 8012345678. */
export const nigerianPhone = z
  .string()
  .trim()
  .regex(/^(?:\+?234|0)?[789][01]\d{8}$/, 'Enter a valid Nigerian mobile number');

/** Display name - 2..80 chars, no control characters. */
export const displayName = z
  .string()
  .trim()
  .min(2, 'Name is too short')
  .max(80, 'Name is too long')
  .regex(/^[^\x00-\x1F\x7F]+$/, 'Name contains invalid characters');

/** NIN - 11 digits exactly. */
export const nin = z
  .string()
  .trim()
  .regex(/^\d{11}$/, 'NIN must be 11 digits');

/** BVN - 11 digits exactly. */
export const bvn = z
  .string()
  .trim()
  .regex(/^\d{11}$/, 'BVN must be 11 digits');

/** OTP - 6 to 8 digits (Supabase's email OTP length is configurable). */
export const otp = z
  .string()
  .trim()
  .regex(/^\d{6,8}$/, 'Enter the code from your email');

/** Naira amount in whole Naira (no kobo at API boundaries). */
export const nairaAmount = z
  .number()
  .int('Amount must be a whole number')
  .nonnegative('Amount cannot be negative')
  .max(50_000_000, 'Amount is too large');

/** URL-safe slug - lowercase letters, digits, and hyphens. */
export const slug = z
  .string()
  .min(2)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, and hyphens');
