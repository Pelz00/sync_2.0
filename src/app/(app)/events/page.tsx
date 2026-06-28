import Link from "next/link";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import { LuDot } from "react-icons/lu";
import { ArrowDown } from 'lucide-react';
import EventCLients from "@/components/event-comps/EventsClient";
import type { Metadata } from 'next';
import partyEvent from '@/assets/images/partyImage.jpg'
import BirthdayImage from '@/assets/images/birthday.jpg'
import ShineImage from '@/assets/images/shine.jpg'
import {
  events
} from "@/lib/event"

export const metadata: Metadata = { title: 'Events' };

// Featured row — tix.africa-style horizontal scroll of poster cards.
// Every slug below now points at a REAL event with its own image, tickets,
// and lineup in [slug]/page.tsx — queen-birthday and paintball-party were
// added as full events rather than borrowing afro-house-pool/comedy's data.
const featuredEvents = [
  {
    slug: "freshers-night-phyno-live",
    image: partyEvent,
    badge: "HIGHLIGHTED EVENT",
    title: "Fresher's Night '26 — Phyno Live",
    when: "Tonight, 8:00pm",
  },
  {
    slug: "queen-birthday",
    image: BirthdayImage,
    badge: "HIGHLIGHTED EVENT",
    title: "Queen Tima's Birthday Party",
    when: "Sat, Jun 28th, 6PM",
  },
  {
    slug: "paintball-party",
    image: ShineImage,
    badge: "HIGHLIGHTED EVENT",
    title: "Paintball Party",
    when: "Mon, Jun 30th, 8PM",
  },
]

export default function Page() {


  return (
    <section className="flex flex-col gap-3">

      <h1 className="text-content-muted font-mono text-[10px] lg:text-[12px] lg:tracking-[3px] flex items-center justify-start">
        EVENTS <LuDot /> ILORIN <LuDot /> THIS WEEK
      </h1>

      <div className="space-y-1">
        <h2 className="text-3xl text-left lg:text-left font-black tracking-tight md:text-4xl lg:text-5xl font-display text-content leading-none">
          What&apos;s on{" "}
          <span className="text-ink bg-lime px-1 py-1 inline-block transform-rotate-1">
            this week.
          </span>
        </h2>
      </div>

      {/* FEATURED ROW — horizontal scroll of poster cards, tix.africa style.
          Each card is a tall self-contained poster: full-bleed image, a
          "HIGHLIGHTED EVENT" eyebrow, title, and a date/time line — all
          stacked at the bottom of the image rather than split into a
          separate info panel below it. */}
      <main className="mt-1">
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1 snap-x snap-mandatory">
          {featuredEvents.map((ev) => (
            <Link
              key={ev.slug}
              href={`/events/${ev.slug}`}
              className="group relative flex-1 min-w-[260px] h-[420px] rounded-2xl overflow-hidden border border-line/10 shadow-card snap-start"
            >
              <Image
                src={ev.image}
                alt={ev.title}
                fill
                priority
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Gradient so white text stays legible over any part of the photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col gap-1.5">
                <span className="font-mono text-[10px] tracking-widest uppercase text-white/70">
                  {ev.badge}
                </span>
                <h3 className="font-display text-3xl font-bold text-white leading-snug">
                  {ev.title}
                </h3>
                <p className="flex items-center gap-1 text-sm text-white/80">
                  <GoDotFill className="text-lime animate-pulse" size={10} />
                  {ev.when}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* UPCOMING HEADER */}
      <div className="flex justify-between items-center mt-3">
        <h3 className="flex items-center font-mono text-[10px] lg:text-xs tracking-widest uppercase text-content-muted">
          UPCOMING <LuDot /> EVENTS
        </h3>
        {/* <p className="text-xs flex items-center text-content-muted">
          Sort: nearest <ArrowDown strokeWidth={2} height={12} width={15} />
        </p> */}
      </div>

      <EventCLients events={events} />

    </section>
  );
}