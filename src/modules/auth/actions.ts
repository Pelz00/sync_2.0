/**
 * Server Actions for the 'auth' module.
 * Every action must:
 *   1. Run on the server ('use server').
 *   2. Re-validate input with a zod schema from @/lib/validations.
 *   3. Use the server Supabase client (@/lib/supabase/server).
 *   4. Return a typed result, never throw raw errors to the client.
 *
 * Flow: signUp (creates the user + emails a 6-digit OTP) → /verify enters the
 * code → verifySignupOtp confirms it and establishes the session. signIn is the
 * email+password login. The session cookies are written by the server client,
 * which is allowed to set them from within a Server Action.
 */
'use server';

import { createClient } from '@/lib/supabase/server';
import {
  email as emailRule,
  loginSchema,
  signupSchema,
  verifyOtpSchema,
  type LoginInput,
  type SignupInput,
  type VerifyOtpInput,
} from '@/lib/validations';
import type { AuthResult, Role, SignUpResult, VerifyResult } from './types';

/** First zod issue message, or a sensible fallback. */
function firstIssue(error: { issues: { message: string }[] }, fallback: string): string {
  return error.issues[0]?.message ?? fallback;
}

/**
 * Create an account. Stores name/phone/role in user_metadata and triggers the
 * confirmation OTP email. Does NOT sign the user in - they must verify first.
 */
export async function signUp(input: SignupInput): Promise<SignUpResult> {
  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error, 'Invalid details') };

  const { email, password, fullName, phone, role, vendorCategory, trade } = parsed.data;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone,
        role,
        // Vendor specialisation - null for students. `landlord` is read by the
        // proxy gate; the rest scope the vendor's listings.
        vendor_category: role === 'vendor' ? (vendorCategory ?? null) : null,
        trade: role === 'vendor' && vendorCategory === 'tradesman' ? (trade ?? null) : null,
      },
    },
  });
  if (error) {
    const alreadyRegistered = /already registered|already exists/i.test(error.message);
    return { ok: false, error: error.message, alreadyRegistered };
  }
  // Supabase obfuscates an existing confirmed account: it returns a user with an
  // empty `identities` array and sends no email. Treat that as already-registered
  // so the form can route to login instead of a dead-end /verify.
  if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
    return {
      ok: false,
      error: 'An account with this email already exists. Please log in.',
      alreadyRegistered: true,
    };
  }
  return { ok: true };
}

/**
 * Confirm a signup with the 6-digit OTP. On success the session is established
 * (cookies set) and we return the role so the caller can route appropriately.
 */
export async function verifySignupOtp(input: VerifyOtpInput): Promise<VerifyResult> {
  const parsed = verifyOtpSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error, 'Invalid code') };

  const { email, code } = parsed.data;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.verifyOtp({ email, token: code, type: 'signup' });
  if (error) return { ok: false, error: error.message };

  const role = (data.user?.user_metadata?.role as Role | undefined) ?? 'student';
  return { ok: true, role };
}

/** Resend the signup confirmation OTP. */
export async function resendSignupOtp(rawEmail: string): Promise<AuthResult> {
  const parsed = emailRule.safeParse(rawEmail);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error, 'Enter a valid email') };

  const supabase = await createClient();
  const { error } = await supabase.auth.resend({ type: 'signup', email: parsed.data });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/** Email + password sign-in. Establishes the session and returns the role so
 *  the form can route vendors to their dashboard. */
export async function signIn(input: LoginInput): Promise<VerifyResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error, 'Invalid credentials') };

  const { email, password } = parsed.data;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: error.message };

  const role = (data.user?.user_metadata?.role as Role | undefined) ?? 'student';
  return { ok: true, role };
}

/** Sign out the current user. Clears the session cookies. */
export async function signOut(): Promise<AuthResult> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
