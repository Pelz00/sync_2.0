/**
 * ROUTE: /admin/editorial
 * ACCESS: admin only
 * PURPOSE: Editorial curation surface - hotspots writeups, around-you feed promotions, banner placements.
 * BUILT HERE: Content list, rich-text editor (sanitized), publish toggle.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Editorial' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/admin/editorial</p>
      <h1 className="font-display text-section text-ink">Editorial</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder - see the route header above for what gets built here.
      </p>
    </section>
  );
}
