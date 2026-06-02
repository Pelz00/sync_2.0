/**
 * ROUTE: /onboarding
 * ACCESS: authenticated vendor (newly signed up)
 * PURPOSE: 5-step vendor onboarding wizard: profile → business → category → documents → review. Drives auto ID check (Smile ID/Dojah) and triggers an admin verification visit.
 * BUILT HERE: <Stepper>, react-hook-form + zod per step, document upload to Supabase Storage.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Vendor onboarding' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-accent-fg">/onboarding</p>
      <h1 className="font-display text-section text-content">Vendor onboarding</h1>
      <p className="text-content-muted max-w-xl text-sm">
        Placeholder - see the route header above for what gets built here.
      </p>
    </section>
  );
}
