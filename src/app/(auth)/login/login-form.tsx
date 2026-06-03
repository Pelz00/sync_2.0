/**
 * LoginForm - email + password sign-in, with a passwordless OTP mode.
 *
 * Password mode is the default for students/vendors. The "email code" mode
 * (signInWithOtp → verify) is for accounts without a password — e.g. admins /
 * super_admins, who sign in with a one-time code. Both route by role.
 *
 * `next` is preserved so the flow resumes at the originally-requested page.
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { FormField } from '@/components/forms';
import { toast } from '@/components/ui/toast';
import { loginSchema, type LoginInput } from '@/lib/validations';
import { sendLoginOtp, signIn, verifyLoginOtp } from '@/modules/auth/actions';

function destFor(role: string | undefined, next?: string) {
  if (next) return next;
  if (role === 'vendor') return '/vendor';
  if (role === 'admin' || role === 'super_admin') return '/admin';
  return '/around';
}

export function LoginForm({ next, email }: { next?: string; email?: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<'password' | 'otp'>('password');

  // Passwordless OTP state.
  const [otpEmail, setOtpEmail] = useState(email ?? '');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpBusy, setOtpBusy] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: email ?? '' },
  });

  const signupHref = next ? `/signup?next=${encodeURIComponent(next)}` : '/signup';

  async function onSubmit(values: LoginInput) {
    const res = await signIn(values);
    if (!res.ok) {
      toast(res.error);
      return;
    }
    router.push(destFor(res.role, next));
    router.refresh();
  }

  async function sendCode() {
    if (!otpEmail.trim()) {
      toast('Enter your email first.');
      return;
    }
    setOtpBusy(true);
    const res = await sendLoginOtp(otpEmail.trim());
    setOtpBusy(false);
    if (!res.ok) {
      toast(res.error);
      return;
    }
    setOtpSent(true);
    toast('Sign-in code sent — check your email.');
  }

  async function verifyCode() {
    setOtpBusy(true);
    const res = await verifyLoginOtp({ email: otpEmail.trim(), code: otpCode.trim() });
    setOtpBusy(false);
    if (!res.ok) {
      toast(res.error);
      return;
    }
    router.push(destFor(res.role, next));
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6">
      {mode === 'password' ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
            <FormField label="Email" htmlFor="email" error={errors.email?.message}>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@student.edu.ng"
                {...register('email')}
              />
            </FormField>

            <FormField label="Password" htmlFor="password" error={errors.password?.message}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    id="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                )}
              />
            </FormField>

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Logging in…' : 'Log in'}
            </Button>
          </form>

          <button
            type="button"
            onClick={() => setMode('otp')}
            className="text-content-muted hover:text-content text-center text-sm"
          >
            Sign in with an email code instead
          </button>
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <FormField label="Email" htmlFor="otp-email">
            <Input
              id="otp-email"
              type="email"
              autoComplete="email"
              placeholder="you@raavon.com"
              value={otpEmail}
              onChange={(e) => setOtpEmail(e.target.value)}
              disabled={otpSent}
            />
          </FormField>

          {otpSent && (
            <FormField label="Sign-in code" htmlFor="otp-code">
              <Input
                id="otp-code"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="123456"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
              />
            </FormField>
          )}

          <Button
            type="button"
            size="lg"
            disabled={otpBusy}
            onClick={otpSent ? verifyCode : sendCode}
            className="w-full"
          >
            {otpBusy
              ? otpSent
                ? 'Verifying…'
                : 'Sending…'
              : otpSent
                ? 'Verify & sign in'
                : 'Email me a code'}
          </Button>

          <div className="flex items-center justify-between text-sm">
            {otpSent ? (
              <button
                type="button"
                onClick={sendCode}
                disabled={otpBusy}
                className="text-lime-deep font-medium hover:underline disabled:opacity-50"
              >
                Resend code
              </button>
            ) : (
              <span />
            )}
            <button
              type="button"
              onClick={() => {
                setMode('password');
                setOtpSent(false);
              }}
              className="text-content-muted hover:text-content"
            >
              Use password instead
            </button>
          </div>
        </div>
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
