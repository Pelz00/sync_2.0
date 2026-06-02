/**
 * LoginForm - email + password sign-in form.
 * Validates with the shared `loginSchema` (react-hook-form + zod). The
 * submit handler is a stub until Supabase auth is wired - it surfaces a
 * toast rather than faking a session (which would just loop back through
 * the proxy gate).
 *
 * `next` is the path the user was trying to reach before being bounced here;
 * it's preserved on the Sign up link so the flow resumes after they register.
 */
'use client';

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
import { signIn } from '@/modules/auth/actions';

export function LoginForm({ next, email }: { next?: string; email?: string }) {
  const router = useRouter();
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
    // Session cookie is set by the server action; refresh so the proxy + RSC
    // pick it up, then head to the originally-requested page (or the app home).
    router.push(next ?? '/around');
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6">
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

        <div className="-mt-1 text-right">
          <Link href="/login" className="text-content-muted hover:text-content text-xs">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Logging in…' : 'Log in'}
        </Button>
      </form>

      <p className="text-content-muted text-center text-sm">
        Don&rsquo;t have an account?{' '}
        <Link href={signupHref} className="text-lime-deep font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
