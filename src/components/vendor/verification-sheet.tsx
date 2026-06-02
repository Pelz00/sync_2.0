/**
 * VendorVerificationSheet - the side panel that walks an unverified vendor
 * through getting verified after they sign up and log in. Three steps:
 *
 *   1. Identity  - liveness check (stubbed; real Smile ID / Dojah comes later).
 *   2. Business  - business name + what they sell.
 *   3. Location  - business address + a photo of the location.
 *
 * Submitting flips the vendor to `pending` (admin approves via /admin/vendors).
 * The location photo is uploaded to Supabase Storage best-effort; if Storage
 * isn't wired yet, the text details are still submitted.
 */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, MapPin, ScanFace, ShieldCheck, Store } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormField } from '@/components/forms';
import { toast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { vendorVerificationSchema, type VendorVerificationInput } from '@/lib/validations';
import { submitVendorVerification } from '@/modules/verification/actions';

const STEPS = ['Identity', 'Business', 'Location'] as const;

export function VendorVerificationSheet({
  defaultOpen = false,
  pending = false,
  category,
}: {
  defaultOpen?: boolean;
  pending?: boolean;
  category?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [step, setStep] = useState(0);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<VendorVerificationInput>({
    resolver: zodResolver(vendorVerificationSchema),
    defaultValues: { livenessConfirmed: false },
  });

  const liveness = watch('livenessConfirmed');

  async function goNext() {
    const fields =
      step === 0 ? (['livenessConfirmed'] as const) : (['businessName', 'sells'] as const);
    if (await trigger(fields)) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  async function onSubmit(values: VendorVerificationInput) {
    // Best-effort photo upload - the text details still submit if Storage
    // isn't configured yet.
    let locationPhotoPath: string | null = null;
    if (photo) {
      try {
        const supabase = createClient();
        const path = `${Date.now()}-${photo.name.replace(/\s+/g, '-')}`;
        const { error } = await supabase.storage
          .from('vendor-verification')
          .upload(path, photo, { upsert: true });
        if (!error) locationPhotoPath = path;
      } catch {
        // Storage / env not ready - skip the upload, keep the submission.
      }
    }

    const res = await submitVendorVerification(values, locationPhotoPath);
    if (!res.ok) {
      toast(res.error);
      return;
    }
    toast('Submitted — we’ll review your business shortly.');
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-ink flex items-center gap-2 text-xl">
            <ShieldCheck className="text-lime-deep h-5 w-5" />
            Verify your business
          </SheetTitle>
          <SheetDescription className="text-muted text-sm">
            Verified vendors get a trust badge and can take orders. It only takes a minute.
          </SheetDescription>
        </SheetHeader>

        {pending ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
            <ShieldCheck className="text-lime-deep h-10 w-10" />
            <p className="font-display text-ink text-lg">Verification under review</p>
            <p className="text-muted text-sm">
              Thanks! Our team is reviewing your details. You’ll be notified once you’re verified.
            </p>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="mt-2">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col p-4">
            {/* Step indicator */}
            <ol className="mb-5 flex items-center gap-2">
              {STEPS.map((label, i) => (
                <li key={label} className="flex flex-1 items-center gap-2">
                  <span
                    className={cn(
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium',
                      i < step
                        ? 'bg-ink text-white'
                        : i === step
                          ? 'bg-lime text-ink'
                          : 'bg-ink/10 text-muted',
                    )}
                  >
                    {i < step ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
                  </span>
                  <span className={cn('text-xs', i === step ? 'text-ink font-medium' : 'text-muted')}>
                    {label}
                  </span>
                </li>
              ))}
            </ol>

            {/* Step 1 - Identity / liveness (stub) */}
            {step === 0 && (
              <div className="flex flex-col gap-4">
                <div className="border-ink/10 flex flex-col items-center gap-3 rounded-xl border p-6 text-center">
                  <ScanFace className="text-ink h-10 w-10" />
                  <p className="text-ink text-sm font-medium">Quick liveness check</p>
                  <p className="text-muted text-xs">
                    We confirm it’s really you with a short face scan before you can take orders.
                  </p>
                  {liveness ? (
                    <p className="text-lime-deep flex items-center gap-1 text-sm font-medium">
                      <Check className="h-4 w-4" strokeWidth={3} /> Liveness confirmed
                    </p>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => setValue('livenessConfirmed', true, { shouldValidate: true })}
                    >
                      Start liveness check
                    </Button>
                  )}
                </div>
                <p className="text-muted text-xs">
                  Placeholder — the real check (Smile ID / Dojah) is wired in later.
                </p>
                {errors.livenessConfirmed && (
                  <p className="text-xs text-red-500">{errors.livenessConfirmed.message}</p>
                )}
              </div>
            )}

            {/* Step 2 - Business */}
            {step === 1 && (
              <div className="flex flex-col gap-4">
                {category && (
                  <p className="text-muted flex items-center gap-2 text-sm">
                    <Store className="h-4 w-4" /> Registering as{' '}
                    <span className="text-ink font-medium capitalize">{category}</span>
                  </p>
                )}
                <FormField label="Business name" htmlFor="businessName" error={errors.businessName?.message}>
                  <Input id="businessName" placeholder="e.g. Mama Put Tanke" {...register('businessName')} />
                </FormField>
                <FormField label="What do you sell or offer?" htmlFor="sells" error={errors.sells?.message}>
                  <Textarea
                    id="sells"
                    rows={4}
                    placeholder="Describe your menu, rooms, or services…"
                    {...register('sells')}
                  />
                </FormField>
              </div>
            )}

            {/* Step 3 - Location */}
            {step === 2 && (
              <div className="flex flex-col gap-4">
                <FormField
                  label="Business address"
                  htmlFor="businessAddress"
                  error={errors.businessAddress?.message}
                >
                  <Input
                    id="businessAddress"
                    placeholder="Tanke Crescent, Ilorin"
                    {...register('businessAddress')}
                  />
                </FormField>
                <div className="flex flex-col gap-1.5">
                  <span className="text-ink text-sm font-medium">Photo of your business location</span>
                  <label
                    htmlFor="locationPhoto"
                    className="border-ink/20 hover:border-ink/40 flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed p-6 text-center"
                  >
                    {photoPreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={photoPreview} alt="Business location preview" className="max-h-40 rounded-lg" />
                    ) : (
                      <>
                        <MapPin className="text-muted h-7 w-7" />
                        <span className="text-muted text-xs">Tap to upload a photo of your shop/property</span>
                      </>
                    )}
                  </label>
                  <input
                    id="locationPhoto"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onPhoto}
                  />
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-auto flex gap-2 pt-6">
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
        )}
      </SheetContent>
    </Sheet>
  );
}
