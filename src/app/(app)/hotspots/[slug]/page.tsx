/**
 * ROUTE: /hotspots/[slug]
 * ACCESS: authenticated student
 * PURPOSE: Single hotspot - story, gallery, hours, location, reviews.
 * BUILT HERE: <ImageGallery>, body content, hours/contact block, <ReviewCard> list.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Hot spot' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-accent-fg">/hotspots/[slug]</p>
      <h1 className="font-display text-section text-content">Hot spot</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder - see the route header above for what gets built here.
      </p>
    </section>
  );
}
