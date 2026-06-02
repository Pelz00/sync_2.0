/**
 * ROUTE: /verify
 * ACCESS: public during signup; otherwise authenticated
 * PURPOSE: OTP verification (email). 6-digit code, resend, then redirects into the app shell.
 * BUILT HERE: OTP input, resend button, role-based redirect on success.
 */
import type { Metadata } from 'next';
import { VerifyForm } from './verify-form';

export const metadata: Metadata = { title: 'Verify' };

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; next?: string }>;
}) {
  const { email, next } = await searchParams;
  return <VerifyForm email={email ?? ''} next={next} />;
}
