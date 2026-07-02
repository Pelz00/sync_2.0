/**
 * Featured event + food carousels for the /around hub. Each rotates through a
 * few items so BOTH the photo and the name/details change together every few
 * seconds. Client components - they own the rotation timer.
 */
'use client';

import { useEffect, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatNaira } from '@/lib/utils';
import { cn } from '@/lib/utils';

import partyImg1 from '@/assets/images/party.jpeg';
import partyImg2 from '@/assets/images/partyImage.jpg';
import jollof1 from '@/assets/images/Food-Pics/Jollof/JollofOne.webp';
import jollof2 from '@/assets/images/Food-Pics/Jollof/JollofThree.webp';
import jollof3 from '@/assets/images/Food-Pics/Jollof/JollofFive.webp';

type EventItem = {
  slug: string;
  title: string;
  performer: string;
  when: string;
  category: string;
  venue: string;
  goingCount: number;
  friendsGoing: number;
  priceFrom: number;
  image: StaticImageData;
};

const EVENTS: EventItem[] = [
  {
    slug: 'freshers-night-26',
    title: "Fresher's Night",
    performer: 'Phyno live',
    when: 'Tonight · 8pm',
    category: 'Concert · 18+',
    venue: 'KWASU Sports Hall · 3 min walk',
    goingCount: 240,
    friendsGoing: 38,
    priceFrom: 3500,
    image: partyImg1,
  },
  {
    slug: 'detty-december-26',
    title: 'Detty December',
    performer: 'Asake live',
    when: 'Sat · 9pm',
    category: 'Concert · 18+',
    venue: 'Banquet Hall · 6 min walk',
    goingCount: 512,
    friendsGoing: 24,
    priceFrom: 5000,
    image: partyImg2,
  },
  {
    slug: 'campus-rave-26',
    title: 'Campus Rave',
    performer: 'DJ Spinall',
    when: 'Fri · 10pm',
    category: 'Party · 18+',
    venue: 'Union Arena · 8 min walk',
    goingCount: 180,
    friendsGoing: 15,
    priceFrom: 2500,
    image: partyImg1,
  },
];

type FoodItem = {
  slug: string;
  name: string;
  etaMinutes: number;
  rating: number;
  cuisine: string;
  priceTier: string;
  promos: string[];
  priceFrom: number;
  image: StaticImageData;
};

const FOODS: FoodItem[] = [
  {
    slug: 'mama-put-malete',
    name: 'Mama Put Malete',
    etaMinutes: 20,
    rating: 4.8,
    cuisine: 'Jollof · amala · gizdodo',
    priceTier: '₦',
    promos: ['2-for-1 today', 'Free delivery'],
    priceFrom: 800,
    image: jollof1,
  },
  {
    slug: 'iya-basira-kitchen',
    name: 'Iya Basira Kitchen',
    etaMinutes: 25,
    rating: 4.6,
    cuisine: 'Jollof · fried rice · plantain',
    priceTier: '₦',
    promos: ['Free delivery'],
    priceFrom: 1000,
    image: jollof2,
  },
  {
    slug: 'campus-bukka',
    name: 'Campus Bukka',
    etaMinutes: 15,
    rating: 4.7,
    cuisine: 'Ofada · ewedu · gbegiri',
    priceTier: '₦',
    promos: ['10% off first order'],
    priceFrom: 700,
    image: jollof3,
  },
];

/** Auto-advancing index over `length` items, every `ms`. */
function useRotation(length: number, ms: number) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), ms);
    return () => clearInterval(id);
  }, [length, ms]);
  return index;
}

function Dots({ count, active, dark }: { count: number; active: number; dark?: boolean }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={cn(
            'h-1.5 rounded-full transition-all duration-300',
            i === active ? 'bg-lime w-4' : dark ? 'bg-white/50 w-1.5' : 'bg-cream/40 w-1.5',
          )}
        />
      ))}
    </div>
  );
}

function FriendStack() {
  const initials = ['B', 'K', 'T', 'D'];
  return (
    <span aria-hidden="true" className="flex -space-x-1.5">
      {initials.map((c) => (
        <span
          key={c}
          className="bg-surface-deep border-cream text-foreground flex h-4 w-4 items-center justify-center rounded-full border-2 text-[8px] font-medium"
        >
          {c}
        </span>
      ))}
    </span>
  );
}

export function FeaturedEventCarousel({ className }: { className?: string }) {
  const i = useRotation(EVENTS.length, 4500);
  const e = EVENTS[i];
  return (
    <Link
      href={`/events/${e.slug}`}
      className={cn(
        'group text-cream relative flex min-h-[420px] flex-col overflow-hidden rounded-2xl bg-[#1e1530]',
        className,
      )}
    >
      {/* Cross-fading party shots */}
      {EVENTS.map((ev, idx) => (
        <Image
          key={idx}
          src={ev.image}
          alt={idx === i ? `${ev.title} — ${ev.performer}` : ''}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          priority={idx === 0}
          className={cn(
            'object-cover transition-opacity duration-700 ease-out',
            idx === i ? 'opacity-100' : 'opacity-0',
          )}
        />
      ))}
      {/* Legibility gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/55 to-[#0a0a14]/20"
      />

      {/* Slide indicator */}
      <div className="absolute top-5 right-5 z-10">
        <Dots count={EVENTS.length} active={i} dark />
      </div>

      {/* Pills + title (swap with the slide) */}
      <div key={i} className="animate-fade-swap relative z-10 flex flex-1 flex-col">
        <div className="flex items-start gap-2 p-5">
          <span className="bg-lime text-ink inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium">
            <span className="bg-ink h-1.5 w-1.5 rounded-full" />
            {e.when}
          </span>
          <span className="border-cream/30 text-cream/90 inline-flex items-center rounded-full border px-3 py-1 text-xs">
            {e.category}
          </span>
        </div>
        <div className="mt-auto px-5 pb-2">
          <h2 className="font-display text-[40px] leading-[0.95] font-bold tracking-[-0.035em] md:text-[48px]">
            {e.title}
            <br />
            <span className="text-lime italic">{e.performer}</span>
          </h2>
        </div>
      </div>

      {/* Footer band - cream surface */}
      <div className="bg-surface text-foreground relative z-10 mt-4 flex items-center justify-between px-5 py-4">
        <div className="min-w-0">
          <p className="text-foreground text-xs">{e.venue}</p>
          <div className="text-content-muted mt-1.5 flex items-center gap-2 text-[11px]">
            <FriendStack />
            <span>
              {e.goingCount} going · {e.friendsGoing} friends
            </span>
          </div>
        </div>
        <div className="flex shrink-0 items-end gap-3">
          <div className="text-right">
            <p className="text-content-muted text-[10px] tracking-wider uppercase">From</p>
            <p className="font-display text-card text-foreground leading-none">
              {formatNaira(e.priceFrom)}
            </p>
          </div>
          <Button size="sm">
            Get ticket <ArrowRight />
          </Button>
        </div>
      </div>
    </Link>
  );
}

export function FoodCarousel({ className }: { className?: string }) {
  const i = useRotation(FOODS.length, 3500);
  const f = FOODS[i];
  return (
    <article className={cn('bg-panel shadow-card flex flex-col overflow-hidden rounded-2xl', className)}>
      <div className="flex flex-col gap-2 p-5">
        <p className="text-content-muted font-mono text-[10px] tracking-wider uppercase">
          Food · {f.etaMinutes} min
        </p>
        {/* Cross-fading food shots */}
        <div className="relative mt-1 h-28 w-full overflow-hidden rounded-xl">
          {FOODS.map((fd, idx) => (
            <Image
              key={idx}
              src={fd.image}
              alt={idx === i ? fd.name : ''}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={idx === 0}
              className={cn(
                'object-cover transition-opacity duration-700 ease-out',
                idx === i ? 'opacity-100' : 'opacity-0',
              )}
            />
          ))}
          <div className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2">
            <Dots count={FOODS.length} active={i} dark />
          </div>
        </div>

        {/* Details (swap with the slide) */}
        <div key={i} className="animate-fade-swap flex flex-col gap-2">
          <div className="mt-3 flex items-start justify-between gap-2">
            <h3 className="font-display text-card text-foreground">{f.name}</h3>
            <span className="text-foreground inline-flex items-center gap-0.5 text-xs">
              ★ <span className="font-medium">{f.rating}</span>
            </span>
          </div>
          <p className="text-content-muted text-xs">
            {f.cuisine} · {f.priceTier}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {f.promos.map((p) => (
              <span
                key={p}
                className="border-line/15 text-foreground rounded-full border px-2.5 py-0.5 text-[11px]"
              >
                {p}
              </span>
            ))}
          </div>
          <div className="border-line/5 mt-3 flex items-center justify-between border-t pt-3">
            <p className="text-foreground text-sm">
              From <span className="font-display text-card">{formatNaira(f.priceFrom)}</span>
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href={`/food/${f.slug}`}>
                Order <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
