/**
 * ROUTE: /about
 * ACCESS: public
 * PURPOSE: Static brand + mission story. Who built Sync, why, and the verified-vendor moat.
 * BUILT HERE: Long-form hero, mission section, founder note, social proof, CTA to /signup.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/about</p>
      <h1 className="font-display text-section text-ink">About</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
    </section>
  );
}
