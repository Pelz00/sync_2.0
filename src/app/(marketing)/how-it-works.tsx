/**
 * HowItWorks - the "Three steps" rail. The three cards rotate through four
 * flows (hostels, around you, food, events) every 6s so one section sells the
 * whole app. Client component: it owns the rotation timer.
 */
'use client';

import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Bike,
  CalendarDays,
  MapPin,
  MessageSquare,
  Navigation,
  QrCode,
  Radar,
  Search,
  ShieldCheck,
  ShoppingBag,
  Ticket,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from './reveal';

type Step = { icon: LucideIcon; title: string; body: string };
type Flow = { key: string; steps: [Step, Step, Step] };

const FLOWS: Flow[] = [
  {
    key: 'hostel',
    steps: [
      {
        icon: Search,
        title: 'Search & filter',
        body: 'Pick a campus, set a budget, choose your room type. Real-time filtered list.',
      },
      {
        icon: MessageSquare,
        title: 'Request to book',
        body: 'Message the verified landlord, schedule a visit, agree on terms - all in app.',
      },
      {
        icon: ShieldCheck,
        title: 'Pay in escrow',
        body: 'Rent + caution sits in Sync escrow via Paystack. Released once you move in.',
      },
    ],
  },
  {
    key: 'around',
    steps: [
      {
        icon: MapPin,
        title: 'Open the map',
        body: 'See verified hostels, food, events and hotspots live around your campus.',
      },
      {
        icon: Radar,
        title: "Spot what's live",
        body: 'Filter by what is open now, trending, or closest to you in real time.',
      },
      {
        icon: Navigation,
        title: 'Tap to go',
        body: 'Get directions, opening hours, and reviews - then head straight there.',
      },
    ],
  },
  {
    key: 'food',
    steps: [
      {
        icon: UtensilsCrossed,
        title: 'Pick a kitchen',
        body: 'Browse verified campus vendors by cuisine, rating, and delivery time.',
      },
      {
        icon: ShoppingBag,
        title: 'Build your order',
        body: 'Add meals to your cart, customise, and pay securely in a few taps.',
      },
      {
        icon: Bike,
        title: 'Track to your door',
        body: 'Follow your rider live until the food reaches your hostel gate.',
      },
    ],
  },
  {
    key: 'event',
    steps: [
      {
        icon: CalendarDays,
        title: 'Find an event',
        body: "Discover fresher's nights, shows, and campus happenings near you.",
      },
      {
        icon: Ticket,
        title: 'Grab your ticket',
        body: 'Pay once - your ticket lands in the app instantly, no touts.',
      },
      {
        icon: QrCode,
        title: 'Show your QR',
        body: 'Scan in at the gate. Fast entry, no paper, no stress.',
      },
    ],
  },
];

const ROTATE_MS = 6000;

export function HowItWorks() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % FLOWS.length), ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  const flow = FLOWS[active];

  return (
    <section className="px-6 pt-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow text-accent-fg">How it works</p>
          <h2 className="font-display text-section text-foreground mt-2 capitalize">
           Sync in three steps
          </h2>
        </Reveal>
        <div className="relative mt-12 grid gap-5 md:grid-cols-3">
          {flow.steps.map(({ icon: Icon, title, body }, i) => {
            const num = `0${i + 1}`;
            return (
              <div
                key={`${flow.key}-${num}`}
                className="group bg-panel shadow-card hover:shadow-pop animate-fade-swap relative flex flex-col gap-5 overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Oversized ghost number */}
                <span
                  aria-hidden="true"
                  className="font-display text-foreground/4 pointer-events-none absolute -top-4 -right-2 text-[120px] leading-none"
                >
                  {num}
                </span>
                <div className="relative flex items-center gap-3">
                  <span className="bg-lime text-ink flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-rotate-6">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-accent-fg font-mono text-xs tracking-wider">
                    Step {num}
                  </span>
                </div>
                <div className="relative">
                  <p className="font-display text-card text-foreground">{title}</p>
                  <p className="text-content-muted mt-2 text-sm">{body}</p>
                </div>
                {/* Connector arrow to the next step (desktop) */}
                {i < 2 && (
                  <span
                    aria-hidden="true"
                    className="bg-surface text-foreground absolute top-1/2 -right-2.5 z-10 hidden h-7 w-7 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-sm md:flex"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
