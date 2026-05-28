/**
 * ROUTE: /beauty/[slug]
 * ACCESS: authenticated student
 * PURPOSE: Beauty pro detail + appointment booking. Portfolio, services + prices, calendar slot picker, deposit via Paystack.
 * BUILT HERE: <ImageGallery> portfolio, service list with <PriceTag>, slot picker, booking action.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Beauty pro' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/beauty/[slug]</p>
      <h1 className="font-display text-section text-ink">Beauty pro</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder - see the route header above for what gets built here.
      </p>
    </section>
  );
}
