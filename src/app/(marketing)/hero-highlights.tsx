/**
 * HeroHighlights - the hero's right column. Picks one "big" highlight card +
 * three thumbnails from the cross-service highlights pool, shuffled on mount
 * so different loads feature different services (party, hostel, around-you).
 *
 * Hydration-safe: server + first client paint render the pool in order, then
 * a useEffect shuffles. Avoids an SSR/client text mismatch.
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HIGHLIGHTS, type Highlight } from '@/mock/highlights';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function HeroHighlights() {
  const [items, setItems] = useState<Highlight[]>(HIGHLIGHTS.slice(0, 4));

  useEffect(() => {
    // Intentional post-mount shuffle: server + first paint render the pool in
    // order (so hydration matches), then we randomise client-side so each load
    // features a different service. This is the one valid case for set-in-effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(shuffle(HIGHLIGHTS).slice(0, 4));
  }, []);

  const [big, ...thumbs] = items;

  return (
    <div className="flex flex-col gap-3">
      {/* Big highlight card */}
      <Link
        href={big.href}
        className="group bg-cream-deep shadow-card relative block aspect-[4/3] w-full overflow-hidden rounded-2xl"
      >
        <Image
          src={big.image}
          alt={big.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />
        {/* Legibility gradient + content */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <span className="bg-lime text-ink inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium">
            <span className="bg-lime-deep h-1.5 w-1.5 rounded-full" />
            {big.service}
          </span>
          <p className="font-display text-cream mt-2 text-lg leading-tight">{big.title}</p>
          <p className="text-cream/80 text-xs">{big.meta}</p>
        </div>
      </Link>

      {/* Thumbnails */}
      <div className="grid grid-cols-3 gap-3">
        {thumbs.map((t) => (
          <Link key={t.id} href={t.href} className="group flex flex-col gap-2">
            <div className="bg-cream-deep shadow-card relative aspect-[5/4] w-full overflow-hidden rounded-lg">
              <Image
                src={t.image}
                alt=""
                fill
                sizes="(max-width: 768px) 33vw, 17vw"
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <p className="text-ink truncate text-xs font-medium">{t.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
