/**
 * ROUTE: /admin/verify-visits
 * ACCESS: admin only
 * PURPOSE: Schedule and log in-person verification visits — the final step of vendor onboarding.
 * BUILT HERE: Visit calendar, vendor queue, visit log form.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Verification visits' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/admin/verify-visits</p>
      <h1 className="font-display text-section text-ink">Verification visits</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
    </section>
  );
}
