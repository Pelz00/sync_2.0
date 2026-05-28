/**
 * ROUTE: /login
 * ACCESS: public
 * PURPOSE: Email + password login (and magic-link option). Submits to a server action that calls Supabase auth.
 * BUILT HERE: <FormField> for email + password, 'Forgot password' link, link to /signup.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Log in' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/login</p>
      <h1 className="font-display text-section text-ink">Log in</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder - see the route header above for what gets built here.
      </p>
    </section>
  );
}
