/**
 * Server Actions for the 'verification' module.
 * Every action must:
 *   1. Run on the server ('use server').
 *   2. Re-validate input with a zod schema from @/lib/validations.
 *   3. Use the server Supabase client (@/lib/supabase/server).
 *   4. Return a typed result, never throw raw errors to the client.
 */
'use server';

import { createClient } from '@/lib/supabase/server';
import {
  vendorOnboardingSchema,
  vendorVerificationSchema,
  type VendorOnboardingInput,
  type VendorVerificationInput,
} from '@/lib/validations';
import type { VerificationResult } from './types';

/**
 * Submit the full vendor onboarding wizard. Stores profile + business +
 * category + document paths on the user's metadata and flips status to
 * `pending` for admin review (/admin/vendors + /admin/verify-visits).
 *
 * `documentPaths` are Supabase Storage object paths uploaded client-side
 * (best-effort); empty if Storage isn't wired yet.
 *
 * TODO: when the identity provider (Smile ID / Dojah) is live, verify ID
 * server-side here, and persist to a `vendor_verifications` table.
 */
export async function submitVendorOnboarding(
  input: VendorOnboardingInput,
  documentPaths: string[] = [],
): Promise<VerificationResult> {
  const parsed = vendorOnboardingSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid details' };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'You need to be signed in to continue.' };

  const { fullName, phone, businessName, sells, vendorCategory, trade, businessAddress } =
    parsed.data;
  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: fullName,
      phone,
      verification_status: 'pending',
      business_name: businessName,
      sells,
      vendor_category: vendorCategory,
      trade: vendorCategory === 'tradesman' ? (trade ?? null) : null,
      business_address: businessAddress,
      documents: documentPaths,
    },
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/**
 * Submit a vendor's verification details. Flips their status to `pending` for
 * an admin to approve (see /admin/vendors + /admin/verify-visits) and stores
 * the business details on the user's metadata.
 *
 * `locationPhotoPath` is the Storage object path of the business-location photo
 * uploaded client-side (best-effort); null if Storage isn't wired yet.
 *
 * TODO: when the identity provider (Smile ID / Dojah) is live, verify the
 * liveness result server-side here instead of trusting the client flag, and
 * persist the submission to a `vendor_verifications` table rather than metadata.
 */
export async function submitVendorVerification(
  input: VendorVerificationInput,
  locationPhotoPath?: string | null,
): Promise<VerificationResult> {
  const parsed = vendorVerificationSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid details' };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'You need to be signed in to verify your business.' };

  const { businessName, sells, businessAddress } = parsed.data;
  const { error } = await supabase.auth.updateUser({
    data: {
      verification_status: 'pending',
      liveness_confirmed: true,
      business_name: businessName,
      sells,
      business_address: businessAddress,
      business_location_photo: locationPhotoPath ?? null,
    },
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
