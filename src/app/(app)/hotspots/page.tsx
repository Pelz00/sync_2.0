/**
 * ROUTE: /hotspots
 * ACCESS: authenticated student
 * PURPOSE: Editorial hot-spots directory - lounges/places worth knowing. Curated, non-transactional.
 * BUILT HERE: Editorial card grid, optional category filter.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Hot spots' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-accent-fg">/hotspots</p>
      <h1 className="font-display text-section text-content">Hot spots</h1>
      <p className="text-content-muted max-w-xl text-sm">
        Placeholder - see the route header above for what gets built here.
      </p>
    </section>
  );
}
