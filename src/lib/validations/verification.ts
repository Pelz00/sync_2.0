/**
 * Verification schemas - the details a vendor submits to get verified
 * (business identity + what they offer + where they operate). Used by the
 * vendor onboarding wizard and the matching server action in
 * modules/verification.
 */
import { z } from 'zod';
import { displayName, nigerianPhone } from './primitives';
import { TRADES, VENDOR_CATEGORIES } from './auth';

export const vendorVerificationSchema = z.object({
  /** Liveness/identity check must be completed before submitting. */
  livenessConfirmed: z.boolean().refine((v) => v === true, 'Complete the liveness check'),
  businessName: displayName,
  /** Free-text description of what the vendor sells / offers. */
  sells: z.string().trim().min(10, 'Tell us a bit more about what you offer').max(500),
  businessAddress: z.string().trim().min(6, 'Enter your business address').max(200),
});
export type VendorVerificationInput = z.infer<typeof vendorVerificationSchema>;

/**
 * Full vendor onboarding wizard input: profile → business → category →
 * (documents handled client-side) → review.
 */
export const vendorOnboardingSchema = z
  .object({
    fullName: displayName,
    phone: nigerianPhone,
    businessName: displayName,
    sells: z.string().trim().min(10, 'Tell us a bit more about what you offer').max(500),
    vendorCategory: z.enum(VENDOR_CATEGORIES, { message: 'Select what you offer' }),
    trade: z.enum(TRADES).optional(),
    businessAddress: z.string().trim().min(6, 'Enter your business address').max(200),
  })
  .superRefine((d, ctx) => {
    if (d.vendorCategory === 'tradesman' && !d.trade) {
      ctx.addIssue({ code: 'custom', message: 'Select your trade', path: ['trade'] });
    }
  });
export type VendorOnboardingInput = z.infer<typeof vendorOnboardingSchema>;
