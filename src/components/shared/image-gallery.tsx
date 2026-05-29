/**
 * ImageGallery - hero gallery for listing detail pages (hostel rooms, food
 * dishes, hotspots). Shows a primary image with a thumbnail strip; clicking
 * a thumbnail swaps the primary.
 *
 * Uses next/image for optimization. Pass at least one image - the component
 * gracefully handles a single image (no strip).
 */
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
  className?: string;
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  if (images.length === 0) return null;
  const active = images[activeIndex];

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="bg-cream-deep relative aspect-[4/3] w-full overflow-hidden rounded-xl">
        <Image
          src={active.src}
          alt={active.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 800px"
          className="object-cover"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === activeIndex ? 'true' : undefined}
              className={cn(
                'relative h-16 w-20 shrink-0 overflow-hidden rounded-md transition-opacity',
                i === activeIndex ? 'ring-ink ring-2' : 'opacity-70 hover:opacity-100',
              )}
            >
              <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
