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
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
export type SignupInput = z.infer<typeof signupSchema>;

export const verifyOtpSchema = z.object({
  email,
  code: otp,
});
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;

export const resetPasswordSchema = z.object({ email });
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
