/**
 * SignupForm - account creation, validated with the shared `signupSchema`
 * (react-hook-form + zod). Calls the `signUp` server action which creates the
 * Supabase user and emails a 6-digit OTP, then sends the user to /verify.
 *
 * `next` is preserved so the flow can resume at the originally-requested page
 * after verification. The role selector drives post-verify routing and the
 * proxy gate (vendor vs student).
 */
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/forms';
import { toast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';
import { signupSchema, type SignupInput } from '@/lib/validations';
import { signUp } from '@/modules/auth/actions';

const ROLES: { id: SignupInput['role']; label: string; desc: string }[] = [
  { id: 'student', label: "I'm a student", desc: 'Find hostels, food & services near campus' },
  { id: 'vendor', label: "I'm a vendor", desc: 'List your business and reach students' },
];

export function SignupForm({ next }: { next?: string }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: 'student', acceptedTerms: false },
  });

  const role = watch('role');
  const acceptedTerms = watch('acceptedTerms');
  const loginHref = next ? `/login?next=${encodeURIComponent(next)}` : '/login';

  async function onSubmit(values: SignupInput) {
    const res = await signUp(values);
    if (!res.ok) {
      toast(res.error);
      return;
    }
    router.push(`/verify?email=${encodeURIComponent(values.email)}`);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="eyebrow text-lime-deep">Create your account</p>
        <h1 className="font-display text-ink mt-2 text-[32px] leading-tight tracking-tight">
          Sign up to Sync
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        {/* Role selector */}
        <fieldset className="flex flex-col gap-1.5">
          <legend className="text-ink mb-1.5 text-sm font-medium">I am a…</legend>
          <div className="grid grid-cols-2 gap-3">
            {ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setValue('role', r.id, { shouldValidate: true })}
                aria-pressed={role === r.id}
                className={cn(
                  'rounded-xl border p-3 text-left transition-colors',
                  role === r.id
                    ? 'border-ink bg-lime/15'
                    : 'border-ink/15 hover:border-ink/30 bg-transparent',
                )}
              >
                <span className="text-ink block text-sm font-medium">{r.label}</span>
                <span className="text-muted mt-0.5 block text-xs">{r.desc}</span>
              </button>
            ))}
          </div>
          {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
        </fieldset>

        <FormField label="Full name" htmlFor="fullName" error={errors.fullName?.message}>
          <Input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Aisha Olawale"
            {...register('fullName')}
          />
        </FormField>

        <FormField label="Email" htmlFor="email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@student.edu.ng"
            {...register('email')}
          />
        </FormField>

        <FormField label="Phone" htmlFor="phone" error={errors.phone?.message}>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="0801 234 5678"
            {...register('phone')}
          />
        </FormField>

        <FormField label="Password" htmlFor="password" error={errors.password?.message}>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            {...register('password')}
          />
        </FormField>

        <FormField
          label="Confirm password"
          htmlFor="confirmPassword"
          error={errors.confirmPassword?.message}
        >
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Repeat your password"
            {...register('confirmPassword')}
          />
        </FormField>

        {/* Terms */}
        <div className="flex items-start gap-3">
          <button
            type="button"
            role="checkbox"
            aria-checked={acceptedTerms}
            aria-label="Agree to Terms and Privacy Policy"
            onClick={() => setValue('acceptedTerms', !acceptedTerms, { shouldValidate: true })}
            className={cn(
              'mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-[1.5px] transition-colors',
              acceptedTerms ? 'bg-lime border-lime' : 'border-ink/25 bg-transparent',
            )}
          >
            {acceptedTerms && <span className="text-ink text-xs font-bold">✓</span>}
          </button>
          <p className="text-muted text-xs">
            I agree to Sync&rsquo;s{' '}
            <Link href="/terms" className="text-ink underline">
              Terms &amp; Privacy Policy
            </Link>
          </p>
        </div>
        {errors.acceptedTerms && (
          <p className="-mt-2 text-xs text-red-500">{errors.acceptedTerms.message}</p>
        )}

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </Button>
      </form>

      <p className="text-muted text-center text-sm">
        Already have an account?{' '}
        <Link href={loginHref} className="text-lime-deep font-medium hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
