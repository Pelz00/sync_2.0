/**
 * AroundMap - client wrapper that lazy-loads the Leaflet map (which touches
 * `window`, so it must render client-side only). The actual map lives in
 * ./around-map-leaflet; here we just dynamic-import it with `ssr: false` and
 * show a placeholder while it loads.
 */
'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./around-map-leaflet'), {
  ssr: false,
  loading: () => (
    <div className="border-line/10 bg-cream-deep flex aspect-[4/5] w-full items-center justify-center rounded-2xl border sm:aspect-[16/10]">
      <p className="text-content-muted text-sm">Loading map…</p>
    </div>
  ),
});

export function AroundMap({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Map />
    </div>
  );
}
