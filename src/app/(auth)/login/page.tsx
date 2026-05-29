/**
 * ROUTE: /login
 * ACCESS: public
 * PURPOSE: Email + password login. Reached directly or via the proxy gate
 *          when a logged-out visitor clicks a protected module tab — the
 *          original destination arrives as `?next=`.
 * BUILT HERE: <LoginForm> (validated email + password) + Sign up link that
 *             preserves `next`.
 * TODO: wire the sign-in server action to Supabase auth.
 */
import type { Metadata } from 'next';
import { LoginForm } from './login-form';

export const metadata: Metadata = { title: 'Log in' };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return <LoginForm next={next} />;
}
