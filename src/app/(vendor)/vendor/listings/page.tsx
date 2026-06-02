/**
 * ROUTE: /vendor/listings
 * ACCESS: authenticated vendor
 * PURPOSE: Manage listings - create, edit, publish/unpublish. Listing form is module-specific (food menu vs beauty service vs trade quote).
 * BUILT HERE: Listings table, 'New listing' CTA, status <Badge>s, edit/duplicate actions.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Listings' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-accent-fg">/vendor/listings</p>
      <h1 className="font-display text-section text-content">Listings</h1>
      <p className="text-content-muted max-w-xl text-sm">
        Placeholder - see the route header above for what gets built here.
      </p>
    </section>
  );
}
