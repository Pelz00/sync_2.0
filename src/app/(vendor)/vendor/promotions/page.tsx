/**
 * ROUTE: /vendor/promotions
 * ACCESS: authenticated vendor
 * PURPOSE: Boost a listing - featured slot on Around-you / category page. Billed against the vendor's plan.
 * BUILT HERE: Promotion form (listing picker, duration), running promo list.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';
import { PromotionsPage } from './(component)';

export const metadata: Metadata = { title: 'Promotions' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <PromotionsPage />
    </section>
  );
}
