/**
 * LoginForm - email-first, adaptive sign-in.
 *
 * Step 1: enter email. We detect the account type (getLoginMethod):
 *   - students / vendors  → reveal a PASSWORD field (signIn)
 *   - admins / super_admins (passwordless) → email a code + show OTP boxes
 *
 * Detection defaults to "password" for unknown emails (and when the backend
 * isn't reachable), and there's still a manual "use an email code" fallback.
 * Both paths route by the trusted role. `next` resumes the requested page.
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { OtpInput } from '@/components/ui/otp-input';
import { FormField } from '@/components/forms';
import { toast } from '@/components/ui/toast';
import { getLoginMethod, sendLoginOtp, signIn, verifyLoginOtp } from '@/modules/auth/actions';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Matches Supabase's default OTP resend window, so resends never hit its limit.
const RESEND_COOLDOWN = 60;

function destFor(role: string | undefined, handle?: string, next?: string) {
  if (next) return next;
  // Vendors land on their personalised handle root (/<business-name>); the proxy
  // rewrites it to the right per-type dashboard - generic /vendor or /landlord -
  // so we never hardcode the wrong one. Falls back to /vendor if no handle.
  if (role === 'vendor') return handle ? `/${handle}` : '/vendor';
  if (role === 'admin' || role === 'super_admin') return '/admin';
  return '/around';
}

type Step = 'email' | 'password' | 'otp';

export function LoginForm({ next, email: initialEmail }: { next?: string; email?: string }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState(initialEmail ?? '');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const signupHref = next ? `/signup?next=${encodeURIComponent(next)}` : '/signup';

  // Tick the resend cooldown down to 0.
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setTimeout(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  async function continueFromEmail(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      toast('Enter a valid email.');
      return;
    }
    setBusy(true);
    try {
      const { method } = await getLoginMethod(value);
      if (method === 'otp') {
        // Show the OTP boxes regardless; still attempt to send the code.
        setStep('otp');
        const res = await sendLoginOtp(value);
        if (res.ok) setCooldown(RESEND_COOLDOWN);
        toast(res.ok ? 'Sign-in code sent — check your email.' : res.error);
      } else {
        setStep('password');
      }
    } finally {
      setBusy(false);
    }
  }

  async function submitPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!password) {
      toast('Enter your password.');
      return;
    }
    setBusy(true);
    const res = await signIn({ email: email.trim(), password });
    setBusy(false);
    if (!res.ok) {
      toast(res.error);
      return;
    }
    router.push(destFor(res.role, res.handle, next));
    router.refresh();
  }

  async function sendCode() {
    if (cooldown > 0) return;
    setBusy(true);
    const res = await sendLoginOtp(email.trim());
    setBusy(false);
    if (!res.ok) {
      toast(res.error);
      return;
    }
    setStep('otp');
    setCooldown(RESEND_COOLDOWN);
    toast('Sign-in code sent — check your email.');
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    if (code.length < 6) {
      toast('Enter the 6-digit code.');
      return;
    }
    setBusy(true);
    const res = await verifyLoginOtp({ email: email.trim(), code });
    setBusy(false);
    if (!res.ok) {
      toast(res.error);
      return;
    }
    router.push(destFor(res.role, res.handle, next));
    router.refresh();
  }

  function changeEmail() {
    setStep('email');
    setPassword('');
    setCode('');
  }

  // The entered email, shown above the password/OTP step with a "Change" link.
  const emailRow = (
    <div className="border-line/10 flex items-center justify-between rounded-lg border px-3 py-2.5">
      <span className="text-content truncate text-sm">{email.trim()}</span>
      <button
        type="button"
        onClick={changeEmail}
        className="text-lime-deep ml-2 shrink-0 text-sm font-medium hover:underline"
      >
        Change
      </button>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      {step === 'email' && (
        <form onSubmit={continueFromEmail} className="flex flex-col gap-4" noValidate>
          <FormField label="Email" htmlFor="email">
            <Input
              id="email"
              type="email"
              autoComplete="email"
              autoFocus
              placeholder="you@student.edu.ng"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormField>
          <Button type="submit" size="lg" disabled={busy} className="w-full">
            {busy ? 'Checking…' : 'Continue'}
          </Button>
        </form>
      )}

      {step === 'password' && (
        <form onSubmit={submitPassword} className="flex flex-col gap-4" noValidate>
          {emailRow}
          <FormField label="Password" htmlFor="password">
            <PasswordInput
              id="password"
              autoComplete="current-password"
              autoFocus
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
            />
          </FormField>
          <Button type="submit" size="lg" disabled={busy} className="w-full">
            {busy ? 'Logging in…' : 'Log in'}
          </Button>
          <button
            type="button"
            onClick={sendCode}
            disabled={busy}
            className="text-content-muted hover:text-content text-center text-sm disabled:opacity-50"
          >
            Sign in with an email code instead
          </button>
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={verify} className="flex flex-col gap-4" noValidate>
          {emailRow}
          <FormField label="Sign-in code" htmlFor="otp">
            <OtpInput value={code} onChange={setCode} autoFocus disabled={busy} />
          </FormField>
          <Button type="submit" size="lg" disabled={busy || code.length < 6} className="w-full">
            {busy ? 'Verifying…' : 'Verify & sign in'}
          </Button>
          <button
            type="button"
            onClick={sendCode}
            disabled={busy || cooldown > 0}
            className="text-lime-deep text-center text-sm font-medium hover:underline disabled:no-underline disabled:opacity-50"
          >
            {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code'}
          </button>
        </form>
      )}

      <p className="text-content-muted text-center text-sm">
        Don&rsquo;t have an account?{' '}
        <Link href={signupHref} className="text-lime-deep font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
