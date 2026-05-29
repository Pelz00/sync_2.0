/**
 * ROUTE: /admin/disputes
 * ACCESS: admin only
 * PURPOSE: Dispute resolution - held escrow cases, evidence review, refund/release decision.
 * BUILT HERE: Case queue, evidence viewer, decision form (refund/release/partial).
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Disputes' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/admin/disputes</p>
      <h1 className="font-display text-section text-ink">Disputes</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder - see the route header above for what gets built here.
      </p>
    </section>
  );
}
