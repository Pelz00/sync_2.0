/**
 * Auth schemas - login, signup, OTP, password reset. Used by both the
 * react-hook-form client and the matching server actions in modules/auth.
 */
import { z } from 'zod';
import { displayName, email, nigerianPhone, otp, password } from './primitives';

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Password is required'),
});
export type LoginInput = z.infer<typeof loginSchema>;

/** What a vendor offers. `tradesman` further specifies a `trade` below. */
export const VENDOR_CATEGORIES = ['landlord', 'food', 'beauty', 'laundry', 'tradesman'] as const;
export type VendorCategory = (typeof VENDOR_CATEGORIES)[number];

/** Specific trades shown when a vendor picks `tradesman`. */
export const TRADES = [
  'carpenter',
  'plumber',
  'tailor',
  'electrician',
  'mechanic',
  'painter',
  'other',
] as const;
export type Trade = (typeof TRADES)[number];

export const signupSchema = z
  .object({
    role: z.enum(['student', 'vendor'], { message: 'Choose an account type' }),
    fullName: displayName,
    email,
    phone: nigerianPhone,
    password,
    confirmPassword: z.string(),
    acceptedTerms: z
      .boolean()
      .refine((v) => v === true, 'You must accept the terms to continue'),
    // Vendor-only. Required when role === 'vendor' (see superRefine); `trade` is
    // required only when the chosen category is 'tradesman'.
    vendorCategory: z.enum(VENDOR_CATEGORIES).optional(),
    trade: z.enum(TRADES).optional(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .superRefine((d, ctx) => {
    if (d.role !== 'vendor') return;
    if (!d.vendorCategory) {
      ctx.addIssue({ code: 'custom', message: 'Select what you offer', path: ['vendorCategory'] });
    }
    if (d.vendorCategory === 'tradesman' && !d.trade) {
      ctx.addIssue({ code: 'custom', message: 'Select your trade', path: ['trade'] });
    }
  });
export type SignupInput = z.infer<typeof signupSchema>;

export const verifyOtpSchema = z.object({
  email,
  code: otp,
});
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;

export const resetPasswordSchema = z.object({ email });
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
