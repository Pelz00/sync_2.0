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
import { createAdminClient } from '@/lib/supabase/admin';
import { adminRoleForEmail } from '@/lib/admin-emails';
import { resolveHandle } from '@/lib/handle';
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
 * The signed-in user's personalised dashboard handle, derived from the SAME
 * inputs the proxy uses (business/full name + email) so login lands them on
 * `/<handle>` and the proxy rewrites it to the right per-type dashboard
 * (vendor vs landlord). Returns undefined when no handle can be formed.
 */
function handleFor(user: { email?: string; user_metadata?: Record<string, unknown> } | null): string | undefined {
  const meta = user?.user_metadata ?? {};
  const handle = resolveHandle({
    role: meta.role as string | undefined,
    full_name: meta.full_name as string | undefined,
    business_name: meta.business_name as string | undefined,
    email: user?.email,
  });
  return handle ?? undefined;
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

  let role = (data.user?.user_metadata?.role as Role | undefined) ?? 'student';

  // Archive lifecycle: <30d → self-restore on login; 30–60d → blocked, admin
  // must restore; >60d → account is purged (so it usually won't get here).
  try {
    const admin = createAdminClient();
    const { data: prof } = await admin
      .from('profiles')
      .select('role, archived_at')
      .eq('id', data.user.id)
      .maybeSingle();
    if (prof?.role) role = prof.role as Role;
    if (prof?.archived_at) {
      const days = (Date.now() - new Date(prof.archived_at).getTime()) / 86_400_000;
      if (days < 30) {
        await admin
          .from('profiles')
          .update({ archived_at: null, archived_reason: null })
          .eq('id', data.user.id);
      } else {
        await supabase.auth.signOut();
        return {
          ok: false,
          error:
            days < 60
              ? 'Your account is archived. Contact support to restore it.'
              : 'This account is no longer available.',
        };
      }
    }
  } catch {
    // profiles table not migrated yet - fall back to the metadata role.
  }

  return { ok: true, role, handle: handleFor(data.user) };
}

/** Which input the login form should show for an email: admins/super_admins are
 *  passwordless ('otp'), everyone else uses a password. Defaults to 'password'
 *  for unknown emails (and when Supabase isn't reachable) so we don't reveal
 *  whether an account exists. Backed by the env allowlist + the `login_method`
 *  SQL function. */
export async function getLoginMethod(rawEmail: string): Promise<{ method: 'password' | 'otp' }> {
  const parsed = emailRule.safeParse(rawEmail);
  if (!parsed.success) return { method: 'password' };
  if (adminRoleForEmail(parsed.data)) return { method: 'otp' };
  try {
    const admin = createAdminClient();
    const { data, error } = await admin.rpc('login_method', { p_email: parsed.data });
    if (error) return { method: 'password' };
    return { method: data === 'otp' ? 'otp' : 'password' };
  } catch {
    return { method: 'password' };
  }
}

/** Send a passwordless sign-in code to an existing account (used by the OTP
 *  login flow — e.g. admins / super_admins who have no password). Won't create
 *  a new user. */
export async function sendLoginOtp(rawEmail: string): Promise<AuthResult> {
  const parsed = emailRule.safeParse(rawEmail);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error, 'Enter a valid email') };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data,
    options: { shouldCreateUser: false },
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/** Verify a passwordless login OTP and establish the session. Returns the
 *  trusted role so the form can route. */
export async function verifyLoginOtp(input: VerifyOtpInput): Promise<VerifyResult> {
  const parsed = verifyOtpSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error, 'Invalid code') };

  const { email, code } = parsed.data;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.verifyOtp({ email, token: code, type: 'email' });
  if (error) return { ok: false, error: error.message };

  let role = (data.user?.user_metadata?.role as Role | undefined) ?? 'student';
  try {
    const admin = createAdminClient();
    const { data: prof } = await admin
      .from('profiles')
      .select('role, archived_at')
      .eq('id', data.user!.id)
      .maybeSingle();
    if (prof?.role) role = prof.role as Role;

    // Bootstrap: a founding admin (env allowlist) lands as admin even if
    // profiles.role wasn't seeded - self-heal it so the proxy + /admin pages
    // recognise them on this and future logins.
    const bootstrap = adminRoleForEmail(email);
    if (bootstrap && role !== 'admin' && role !== 'super_admin') {
      role = bootstrap;
      await admin.from('profiles').upsert({ id: data.user!.id, role }, { onConflict: 'id' });
    }
    if (prof?.archived_at) {
      const days = (Date.now() - new Date(prof.archived_at).getTime()) / 86_400_000;
      if (days < 30) {
        await admin
          .from('profiles')
          .update({ archived_at: null, archived_reason: null })
          .eq('id', data.user!.id);
      } else {
        await supabase.auth.signOut();
        return {
          ok: false,
          error:
            days < 60
              ? 'Your account is archived. Contact support to restore it.'
              : 'This account is no longer available.',
        };
      }
    }
  } catch {
    // profiles table not migrated yet.
  }
  return { ok: true, role, handle: handleFor(data.user) };
}

/** Sign out the current user. Clears the session cookies. */
export async function signOut(): Promise<AuthResult> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
