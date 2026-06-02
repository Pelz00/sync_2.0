/**
 * Verification schemas - the details a vendor submits to get verified
 * (business identity + what they offer + where they operate). Used by the
 * vendor verification sheet and the matching server action in
 * modules/verification.
 */
import { z } from 'zod';
import { displayName } from './primitives';

export const vendorVerificationSchema = z.object({
  /** Liveness/identity check must be completed before submitting. */
  livenessConfirmed: z.boolean().refine((v) => v === true, 'Complete the liveness check'),
  businessName: displayName,
  /** Free-text description of what the vendor sells / offers. */
  sells: z.string().trim().min(10, 'Tell us a bit more about what you offer').max(500),
  businessAddress: z.string().trim().min(6, 'Enter your business address').max(200),
});
export type VendorVerificationInput = z.infer<typeof vendorVerificationSchema>;
