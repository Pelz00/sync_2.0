/**
 * OnboardingWizard - the 5-step vendor onboarding wizard
 * (profile → business → category → documents → review). Validated per step with
 * react-hook-form + the shared `vendorOnboardingSchema`. Submitting flips the
 * vendor to `pending` (admin approves via /admin/vendors) and routes to the
 * vendor dashboard.
 *
 * Documents upload to Supabase Storage best-effort; liveness/auto-ID via Smile
 * ID / Dojah is wired in later. Some fields are prefilled from signup.
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, FileText, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { createClient } from '@/lib/supabase/client';
import {
  vendorOnboardingSchema,
  type Trade,
  type VendorCategory,
  type VendorOnboardingInput,
} from '@/lib/validations';
import { submitVendorOnboarding } from '@/modules/verification/actions';

const STEPS = ['Profile', 'Business', 'Category', 'Documents', 'Review'] as const;

const CATEGORY_OPTIONS: { value: VendorCategory; label: string }[] = [
  { value: 'landlord', label: 'Landlord (rooms & hostels)' },
  { value: 'food', label: 'Food vendor' },
  { value: 'beauty', label: 'Beauty pro' },
  { value: 'laundry', label: 'Laundry service' },
  { value: 'tradesman', label: 'Tradesman / artisan' },
];

const TRADE_OPTIONS: { value: Trade; label: string }[] = [
  { value: 'carpenter', label: 'Carpenter' },
  { value: 'plumber', label: 'Plumber' },
  { value: 'tailor', label: 'Tailor' },
  { value: 'electrician', label: 'Electrician' },
  { value: 'mechanic', label: 'Mechanic' },
  { value: 'painter', label: 'Painter' },
  { value: 'other', label: 'Other' },
];

export function OnboardingWizard({ initial }: { initial: Partial<VendorOnboardingInput> }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [docs, setDocs] = useState<File[]>([]);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<VendorOnboardingInput>({
    resolver: zodResolver(vendorOnboardingSchema),
    defaultValues: {
      fullName: initial.fullName ?? '',
      phone: initial.phone ?? '',
      vendorCategory: initial.vendorCategory,
      businessName: '',
      sells: '',
      businessAddress: '',
    },
  });

  const category = watch('vendorCategory');

  const stepFields: Record<number, (keyof VendorOnboardingInput)[]> = {
    0: ['fullName', 'phone'],
    1: ['businessName', 'sells', 'businessAddress'],
    2: category === 'tradesman' ? ['vendorCategory', 'trade'] : ['vendorCategory'],
    3: [],
    4: [],
  };

  async function goNext() {
    const fields = stepFields[step];
    if (fields.length === 0 || (await trigger(fields))) {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }
  }

  function onDocs(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    if (list) setDocs((d) => [...d, ...Array.from(list)]);
  }

  async function onSubmit(values: VendorOnboardingInput) {
    const paths: string[] = [];
    if (docs.length) {
      try {
        const supabase = createClient();
        for (const file of docs) {
          const path = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
          const { error } = await supabase.storage
            .from('vendor-verification')
            .upload(path, file, { upsert: true });
          if (!error) paths.push(path);
        }
      } catch {
        // Storage not wired yet - submit the details anyway.
      }
    }

    const res = await submitVendorOnboarding(values, paths);
    if (!res.ok) {
      toast(res.error);
      return;
    }
    toast('Submitted — we’ll review your business shortly.');
    router.push('/vendor');
    router.refresh();
  }

  const v = getValues();
  const categoryLabel = CATEGORY_OPTIONS.find((o) => o.value === category)?.label ?? '—';

  return (
    <div className="mx-auto w-full max-w-xl">
      {/* Step indicator */}
      <ol className="mb-8 flex items-center">
        {STEPS.map((label, i) => (
          <li key={label} className={cn('flex items-center', i < STEPS.length - 1 && 'flex-1')}>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium',
                  i < step ? 'bg-ink text-white' : i === step ? 'bg-lime text-ink' : 'bg-ink/10 text-content-muted',
                )}
              >
                {i < step ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
              </span>
              <span className={cn('hidden text-xs sm:inline', i === step ? 'text-content font-medium' : 'text-content-muted')}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && <span className="bg-line/15 mx-2 h-px flex-1" />}
          </li>
        ))}
      </ol>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        {/* Step 1 - Profile */}
        {step === 0 && (
          <>
            <FormField label="Full name" htmlFor="fullName" error={errors.fullName?.message}>
              <Input id="fullName" placeholder="Aisha Olawale" {...register('fullName')} />
            </FormField>
            <FormField label="Phone" htmlFor="phone" error={errors.phone?.message}>
              <Input id="phone" type="tel" placeholder="0801 234 5678" {...register('phone')} />
            </FormField>
          </>
        )}

        {/* Step 2 - Business */}
        {step === 1 && (
          <>
            <FormField label="Business name" htmlFor="businessName" error={errors.businessName?.message}>
              <Input id="businessName" placeholder="Mama Put Tanke" {...register('businessName')} />
            </FormField>
            <FormField label="What do you sell or offer?" htmlFor="sells" error={errors.sells?.message}>
              <Textarea id="sells" rows={4} placeholder="Describe your menu, rooms, or services…" {...register('sells')} />
            </FormField>
            <FormField label="Business address" htmlFor="businessAddress" error={errors.businessAddress?.message}>
              <Input id="businessAddress" placeholder="Tanke Crescent, Ilorin" {...register('businessAddress')} />
            </FormField>
          </>
        )}

        {/* Step 3 - Category */}
        {step === 2 && (
          <>
            <FormField label="What do you offer?" htmlFor="vendorCategory" error={errors.vendorCategory?.message}>
              <Controller
                name="vendorCategory"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="vendorCategory">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORY_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>
            {category === 'tradesman' && (
              <FormField label="Your trade" htmlFor="trade" error={errors.trade?.message}>
                <Controller
                  name="trade"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="trade">
                        <SelectValue placeholder="Select your trade" />
                      </SelectTrigger>
                      <SelectContent>
                        {TRADE_OPTIONS.map((o) => (
                          <SelectItem key={o.value} value={o.value}>
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormField>
            )}
          </>
        )}

        {/* Step 4 - Documents */}
        {step === 3 && (
          <div className="flex flex-col gap-3">
            <p className="text-content-muted text-sm">
              Upload your ID and any business documents (CAC, proof of address, property papers).
              Optional now — you can add them later.
            </p>
            <label
              htmlFor="docs"
              className="border-line/30 hover:border-line/50 flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed p-8 text-center"
            >
              <Upload className="text-content-muted h-7 w-7" />
              <span className="text-content-muted text-sm">Tap to add documents</span>
            </label>
            <input id="docs" type="file" multiple accept="image/*,application/pdf" className="hidden" onChange={onDocs} />
            {docs.length > 0 && (
              <ul className="flex flex-col gap-2">
                {docs.map((f, i) => (
                  <li key={i} className="border-line/10 text-content flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
                    <FileText className="text-content-muted h-4 w-4 shrink-0" />
                    <span className="truncate">{f.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Step 5 - Review */}
        {step === 4 && (
          <dl className="border-line/10 divide-line/10 divide-y rounded-xl border">
            {[
              ['Name', v.fullName],
              ['Phone', v.phone],
              ['Business', v.businessName],
              ['Offers', categoryLabel + (v.trade ? ` · ${v.trade}` : '')],
              ['Address', v.businessAddress],
              ['Documents', docs.length ? `${docs.length} file(s)` : 'None yet'],
            ].map(([k, val]) => (
              <div key={k} className="flex justify-between gap-4 px-4 py-3 text-sm">
                <dt className="text-content-muted">{k}</dt>
                <dd className="text-content max-w-[60%] truncate text-right font-medium">{val || '—'}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Footer */}
        <div className="mt-2 flex gap-3">
          {step > 0 && (
            <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
          )}
          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={goNext} className="flex-1">
              Continue
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Submitting…' : 'Submit for review'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
