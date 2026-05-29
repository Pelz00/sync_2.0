/**
 * ROUTE: /for-vendors
 * ACCESS: public
 * PURPOSE: Vendor recruitment landing. Pitches plan tiers, walks through verification, links to /signup with role=vendor.
 * BUILT HERE: Hero, value props, plan grid (<PlanCard>), verification timeline, CTA.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'For vendors' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-accent-fg">/for-vendors</p>
      <h1 className="font-display text-section text-foreground">For vendors</h1>
      <p className="text-content-muted max-w-xl text-sm">
        Placeholder - see the route header above for what gets built here.
      </p>
    </section>
  );
}
