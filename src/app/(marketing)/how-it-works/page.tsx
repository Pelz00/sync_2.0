/**
 * ROUTE: /how-it-works
 * ACCESS: public
 * PURPOSE: Explains the three flows: find → book → pay (escrow). Highlights verification and dispute handling.
 * BUILT HERE: Hero, three-step illustrated explainer, sample listing card, FAQ accordion.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'How it works' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/how-it-works</p>
      <h1 className="font-display text-section text-ink">How it works</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
    </section>
  );
}
