/**
 * ROUTE: /wallet
 * ACCESS: authenticated student
 * PURPOSE: Student wallet — balance, top-ups, payouts (e.g. workmanship refunds), transaction history.
 * BUILT HERE: Balance card, top-up CTA, transaction list with stage chips.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Wallet' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/wallet</p>
      <h1 className="font-display text-section text-ink">Wallet</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
    </section>
  );
}
