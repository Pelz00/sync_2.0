/**
 * ROUTE: /admin/analytics
 * ACCESS: admin only
 * PURPOSE: Business analytics — DAU/WAU, GMV, take-rate, by module + cohort.
 * BUILT HERE: Chart grid (placeholder pending analytics integration).
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Analytics' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/admin/analytics</p>
      <h1 className="font-display text-section text-ink">Analytics</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
    </section>
  );
}
