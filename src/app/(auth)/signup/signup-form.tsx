/**
 * SignupForm - account creation, validated with the shared `signupSchema`
 * (react-hook-form + zod). Calls the `signUp` server action which creates the
 * Supabase user and emails a 6-digit OTP, then sends the user to /verify.
 *
 * `next` is preserved so the flow can resume at the originally-requested page
 * after verification. Role drives post-verify routing and the proxy gate; when
 * "vendor" is chosen, a category dropdown (and trade, for tradesmen) appears.
 */
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormField } from '@/components/forms';
import { toast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';
import {
  signupSchema,
  type SignupInput,
  type Trade,
  type VendorCategory,
} from '@/lib/validations';
import { signUp } from '@/modules/auth/actions';

const ROLES: { id: SignupInput['role']; label: string; desc: string }[] = [
  { id: 'student', label: "I'm a student", desc: 'Find hostels, food & services' },
  { id: 'vendor', label: 'I sell or rent', desc: 'Rooms, food, services & more' },
];

const VENDOR_CATEGORIES: { value: VendorCategory; label: string }[] = [
  { value: 'landlord', label: 'Landlord (rooms & hostels)' },
  { value: 'food', label: 'Food vendor' },
  { value: 'beauty', label: 'Beauty pro' },
  { value: 'laundry', label: 'Laundry service' },
  { value: 'tradesman', label: 'Tradesman / artisan' },
];

const TRADES: { value: Trade; label: string }[] = [
  { value: 'carpenter', label: 'Carpenter' },
  { value: 'plumber', label: 'Plumber' },
  { value: 'tailor', label: 'Tailor' },
  { value: 'electrician', label: 'Electrician' },
  { value: 'mechanic', label: 'Mechanic' },
  { value: 'painter', label: 'Painter' },
  { value: 'other', label: 'Other' },
];

export function SignupForm({ next }: { next?: string }) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: 'student', acceptedTerms: false },
  });

  const role = watch('role');
  const vendorCategory = watch('vendorCategory');
  const acceptedTerms = watch('acceptedTerms');
  const loginHref = next ? `/login?next=${encodeURIComponent(next)}` : '/login';

  function selectRole(id: SignupInput['role']) {
    setValue('role', id, { shouldValidate: true });
    if (id === 'student') {
      setValue('vendorCategory', undefined);
      setValue('trade', undefined);
    }
  }

  async function onSubmit(values: SignupInput) {
    const res = await signUp(values);
    if (!res.ok) {
      toast(res.error);
      // Existing account → send them to login (with their email preserved).
      if (res.alreadyRegistered) {
        router.push(`/login?email=${encodeURIComponent(values.email)}`);
      }
      return;
    }
    router.push(`/verify?email=${encodeURIComponent(values.email)}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3" noValidate>
      {/* Role selector */}
      <fieldset className="flex flex-col gap-1.5">
        <legend className="text-content mb-1.5 text-sm font-medium">I am a…</legend>
        <div className="grid grid-cols-2 gap-3">
          {ROLES.map((r) => {
            const selected = role === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => selectRole(r.id)}
                aria-pressed={selected}
                className={cn(
                  'flex flex-col rounded-2xl border p-5 text-left transition-all',
                  selected
                    ? 'border-line bg-lime shadow-[3px_3px_0_0_var(--color-ink)]'
                    : 'border-line/15 hover:border-line/40 bg-panel',
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn('eyebrow', selected ? 'text-ink/60' : 'text-content/60')}>
                    {selected ? 'Role · Selected' : 'Role'}
                  </span>
                  <span
                    className={cn(
                      'flex h-5 w-5 items-center justify-center border',
                      selected ? 'border-line bg-ink rounded-md text-white' : 'border-line/30 rounded-full',
                    )}
                  >
                    {selected && <Check className="h-3 w-3" strokeWidth={3} />}
                  </span>
                </div>
                <span
                  className={cn('font-display mt-4 text-xl font-bold', selected ? 'text-ink' : 'text-content')}
                >
                  {r.label}
                </span>
                <span className={cn('mt-1 text-sm', selected ? 'text-ink/70' : 'text-content-muted')}>
                  {r.desc}
                </span>
              </button>
            );
          })}
        </div>
        {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
      </fieldset>

      {/* Vendor specialisation - only when "vendor" is selected. */}
      {role === 'vendor' && (
        <FormField label="What do you offer?" htmlFor="vendorCategory" error={errors.vendorCategory?.message}>
          <Select
            value={vendorCategory}
            onValueChange={(v) => {
              setValue('vendorCategory', v as VendorCategory, { shouldValidate: true });
              if (v !== 'tradesman') setValue('trade', undefined);
            }}
          >
            <SelectTrigger id="vendorCategory">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {VENDOR_CATEGORIES.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      )}

      {role === 'vendor' && vendorCategory === 'tradesman' && (
        <FormField label="Your trade" htmlFor="trade" error={errors.trade?.message}>
          <Select
            value={watch('trade')}
            onValueChange={(v) => setValue('trade', v as Trade, { shouldValidate: true })}
          >
            <SelectTrigger id="trade">
              <SelectValue placeholder="Select your trade" />
            </SelectTrigger>
            <SelectContent>
              {TRADES.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      )}

      <FormField label="Full name" htmlFor="fullName" error={errors.fullName?.message}>
        <Input id="fullName" type="text" autoComplete="name" placeholder="Aisha Olawale" {...register('fullName')} />
      </FormField>

      <FormField label="Email" htmlFor="email" error={errors.email?.message}>
        <Input id="email" type="email" autoComplete="email" placeholder="you@student.edu.ng" {...register('email')} />
      </FormField>

      <FormField label="Phone" htmlFor="phone" error={errors.phone?.message}>
        <Input id="phone" type="tel" autoComplete="tel" placeholder="0801 234 5678" {...register('phone')} />
      </FormField>

      <FormField label="Password" htmlFor="password" error={errors.password?.message}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              id="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          )}
        />
      </FormField>

      <FormField label="Confirm password" htmlFor="confirmPassword" error={errors.confirmPassword?.message}>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <PasswordInput
              id="confirmPassword"
              autoComplete="new-password"
              placeholder="Repeat your password"
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          )}
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
            acceptedTerms ? 'bg-lime border-lime' : 'border-line/25 bg-transparent',
          )}
        >
          {acceptedTerms && <span className="text-content text-xs font-bold">✓</span>}
        </button>
        <p className="text-content-muted text-xs">
          I agree to Sync&rsquo;s{' '}
          <Link href="/terms" className="text-content underline">
            Terms &amp; Privacy Policy
          </Link>
        </p>
      </div>
      {errors.acceptedTerms && <p className="-mt-1 text-xs text-red-500">{errors.acceptedTerms.message}</p>}

      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-1 w-full">
        {isSubmitting ? 'Creating account…' : 'Create account'}
      </Button>

      <p className="text-content-muted text-center text-sm">
        Already have an account?{' '}
        <Link href={loginHref} className="text-lime-deep font-medium hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
