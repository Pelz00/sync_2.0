/**
 * BootSplash - first-load splash. Next's loading.tsx only covers client-side
 * navigations; this covers the cold load (first visit / hard refresh) where
 * the page is streamed straight in.
 *
 * Renders a full-screen BrandLoader overlay that's visible on initial render
 * (server + hydration), then fades out once the window finishes loading
 * (with a small minimum so it doesn't flicker on fast connections). On in-app
 * navigations the root layout never remounts, so this only ever runs once.
 */
'use client';

import { useEffect, useState } from 'react';
import { BrandLoader } from '@/components/ui/brand-loader';
import { cn } from '@/lib/utils';

const MIN_VISIBLE_MS = 2800;
const FADE_MS = 500;

export function BootSplash() {
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const finish = () => {
      const wait = Math.max(0, MIN_VISIBLE_MS - (performance.now() - start));
      const t1 = setTimeout(() => {
        setFading(true);
        const t2 = setTimeout(() => setDone(true), FADE_MS);
        timers.push(t2);
      }, wait);
      timers.push(t1);
    };

    const timers: ReturnType<typeof setTimeout>[] = [];
    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('load', finish);
    };
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden={fading}
      className={cn(
        'fixed inset-0 z-100 transition-opacity duration-500 ease-out',
        fading && 'pointer-events-none opacity-0',
      )}
    >
      <BrandLoader />
    </div>
  );
}
