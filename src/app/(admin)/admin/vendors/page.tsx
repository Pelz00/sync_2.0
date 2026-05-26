/**
 * ROUTE: /admin/vendors
 * ACCESS: admin only
 * PURPOSE: Vendor directory + verification approval queue. Drill into a vendor to inspect docs and approve/reject.
 * BUILT HERE: Filterable table, status badges, approve/reject actions.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Vendors' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/admin/vendors</p>
      <h1 className="font-display text-section text-ink">Vendors</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
    </section>
  );
}
