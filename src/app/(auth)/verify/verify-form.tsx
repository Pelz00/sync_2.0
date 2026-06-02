/**
 * VerifyForm - confirms a signup with the 6-digit OTP emailed by Supabase.
 * Validates with the shared `verifyOtpSchema`, calls `verifySignupOtp`, and on
 * success routes by role (vendors → /onboarding, students → the app).
 *
 * The email is passed from the /verify page via the `?email=` query set during
 * signup. If it's missing (someone hit /verify directly) we nudge them back to
 * signup rather than submitting an incomplete form.
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/forms';
import { toast } from '@/components/ui/toast';
import { verifyOtpSchema, type VerifyOtpInput } from '@/lib/validations';
import { resendSignupOtp, verifySignupOtp } from '@/modules/auth/actions';

export function VerifyForm({ email, next }: { email: string; next?: string }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtpInput>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { email },
  });

  // Resend cooldown - a code is sent when they arrive from signup, so the
  // button starts on a 60s countdown and resets after each successful resend.
  const [cooldown, setCooldown] = useState(60);
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  if (!email) {
    return (
      <p className="text-content-muted text-sm">
        We couldn&rsquo;t find which email to verify. Please{' '}
        <Link href="/signup" className="text-lime-deep font-medium hover:underline">
          start signup
        </Link>{' '}
        again.
      </p>
    );
  }

  async function onSubmit(values: VerifyOtpInput) {
    const res = await verifySignupOtp(values);
    if (!res.ok) {
      toast(res.error);
      return;
    }
    router.push(res.role === 'vendor' ? '/onboarding' : (next ?? '/me'));
    router.refresh();
  }

  async function onResend() {
    if (cooldown > 0) return;
    const res = await resendSignupOtp(email);
    if (res.ok) {
      setCooldown(60);
      toast('A new code is on its way.');
    } else {
      toast(res.error);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-content-muted text-sm">
        Enter the 6-digit code we sent to <span className="text-content font-medium">{email}</span>.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <input type="hidden" {...register('email')} />

        <FormField label="Verification code" htmlFor="code" error={errors.code?.message}>
          <Input
            id="code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="123456"
            {...register('code')}
          />
        </FormField>

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Verifying…' : 'Verify'}
        </Button>
      </form>

      <p className="text-content-muted text-center text-sm">
        Didn&rsquo;t get it?{' '}
        <button
          type="button"
          onClick={onResend}
          disabled={cooldown > 0}
          className="text-lime-deep font-medium hover:underline disabled:cursor-not-allowed disabled:no-underline disabled:opacity-50"
        >
          {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code'}
        </button>
      </p>
    </div>
  );
}
