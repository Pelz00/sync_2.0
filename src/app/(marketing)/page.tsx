/**
 * ROUTE: /
 * ACCESS: public
 * PURPOSE: Sync marketing landing - Wireframe Variant A (Classic hero +
 *          overview). Hostel-led positioning since hostels are the primary
 *          acquisition driver. The broader 8-module hub lives inside the
 *          authenticated app.
 * BUILT HERE:
 *   1. Hero with verified-count eyebrow, two-line headline with lime
 *      underline on the action word, smart-search row (Area / Budget /
 *      Room type → Search), and a 1-big-image + 3-thumbnail preview block.
 *   2. "Hostels students love" - featured rail of 3 <ListingCard>s.
 *   3. "How it works" - 3-step explainer.
 *   4. Verification trust band + landlord CTA.
 *
 * DATA: mock from `@/mock/hostels` until Supabase + RLS are wired.
 */
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ListingCard } from '@/components/shared/listing-card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HeroHighlights } from './hero-highlights';
import { Newsletter } from './newsletter';
import { FEATURED_HOSTELS, HOSTEL_STATS } from '@/mock/hostels';
import { FEATURED_EVENT, FEATURED_FOOD, HOTSPOTS_TRENDING } from '@/mock/around';
import { SITE } from '@/config/site';

const FAQS = [
  {
    q: 'Is every hostel really verified?',
    a: 'Yes. Our team runs an ID check on the landlord, reviews business proof, and visits the property in person before it goes live. The photos you see are taken by us.',
  },
  {
    q: 'How does payment work?',
    a: 'Rent and caution sit in Paystack escrow until you confirm move-in. Our 5% verified-listing fee replaces the 10-20% agents normally charge.',
  },
  {
    q: 'Which campuses are live?',
    a: 'We launched in KWASU, Malete and cover UNILORIN, Al-Hikmah, and Ilorin Poly. More campuses are rolling out each semester.',
  },
  {
    q: 'Is Sync only for hostels?',
    a: 'No. Hostels are where we started, but Around you brings events, food, laundry, beauty, trades, and hot spots into one feed.',
  },
];

export default function LandingPage() {
  return (
    <>
      {/* ─── Hero (static background image + 2-column content) ───────── */}
      <section className="relative isolate w-full overflow-hidden">
        <Image
          src="/images/background.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden="true"
          className="-z-20 object-cover"
        />
        <div aria-hidden="true" className="bg-cream/55 absolute inset-0 -z-10" />
        <div className="mx-auto grid min-h-[72vh] max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:gap-12">
          {/* Left - headline */}
          <div className="text-center md:text-left">
            <p className="text-ink bg-lime/90 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium">
              <span className="bg-lime-deep h-2 w-2 rounded-full" />
              {HOSTEL_STATS.verifiedCount} verified hostels · {HOSTEL_STATS.campusCount} campuses
            </p>
            <h1 className="font-display text-ink mt-4 text-[44px] font-bold leading-[0.98] tracking-[-0.035em] md:text-[60px] md:leading-[0.96] md:tracking-[-0.04em] lg:text-[68px]">
              Stop walking.
              <br />
              <span className="relative isolate inline-block">
                <span
                  aria-hidden="true"
                  className="bg-lime absolute inset-x-0 bottom-[0.08em] -z-10 h-[0.28em]"
                />
                Start syncing.
              </span>
            </h1>
            <p className="text-muted text-lead mx-auto mt-5 max-w-lg md:mx-0">
              Verified rooms, events, and everything around campus - all in one place.
            </p>
          </div>

          {/* Right - cross-service highlight (shuffles per load) */}
          <HeroHighlights />
        </div>
      </section>

      {/* ─── Full-width search row (under the hero) ──────────────────── */}
      <section className="border-ink/5 bg-white/70 border-b backdrop-blur">
        <div className="mx-auto w-full max-w-7xl px-6 py-5">
          <form
            action="/hostels"
            method="get"
            className="flex w-full flex-col items-stretch gap-2 sm:flex-row sm:items-center"
          >
            <div className="shadow-card divide-ink/5 grid w-full flex-1 grid-cols-1 divide-y overflow-hidden rounded-2xl bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <SearchCell label="Area / Campus" name="campus" defaultValue="UNILORIN PG" />
              <SearchCell label="Budget" name="budget" defaultValue="₦100k–₦150k" />
              <SearchCell label="Room type" name="type" defaultValue="Self-contain" />
            </div>
            <Button type="submit" size="lg" className="w-full shrink-0 sm:w-auto sm:px-7">
              Search <Search className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-muted mt-2 text-xs">↓ Single search · instant filtered results</p>
        </div>
      </section>

      {/* ─── Hostels students love ───────────────────────────────────── */}
      <section className="px-6 pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-lime-deep">Featured · This week</p>
              <h2 className="font-display text-section text-ink mt-2">Hostels students love</h2>
            </div>
            <Link
              href="/hostels"
              className="text-ink hover:text-lime-deep inline-flex items-center gap-1 text-sm"
            >
              See all {HOSTEL_STATS.verifiedCount} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_HOSTELS.map((h) => (
              <ListingCard
                key={h.slug}
                href={`/hostels/${h.slug}`}
                title={h.name}
                location={h.location}
                image={h.image}
                price={{ amount: h.pricePerSession, unit: '/ session' }}
                rating={{ value: h.rating, count: h.reviewCount }}
                verified={h.verified}
                ribbon={h.ribbon}
                amenities={h.amenities}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Happening around you (preview) ──────────────────────────── */}
      <section className="px-6 pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-lime-deep">Around you · right now</p>
              <h2 className="font-display text-section text-ink mt-2">More than just a room.</h2>
            </div>
            <Link
              href="/around"
              className="text-ink hover:text-lime-deep inline-flex items-center gap-1 text-sm"
            >
              Open Around you <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {/* Event */}
            <Link
              href={`/events/${FEATURED_EVENT.slug}`}
              className="bg-ink text-cream group flex flex-col justify-between gap-6 rounded-2xl p-6 transition-transform hover:-translate-y-0.5"
            >
              <span className="bg-lime text-ink inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium">
                <span className="bg-ink h-1.5 w-1.5 rounded-full" />
                {FEATURED_EVENT.when}
              </span>
              <div>
                <p className="text-cream/50 font-mono text-[10px] uppercase tracking-wider">Event</p>
                <p className="font-display mt-1 text-xl leading-tight">
                  {FEATURED_EVENT.title}{' '}
                  <span className="text-lime italic">{FEATURED_EVENT.performer}</span>
                </p>
                <p className="text-cream/70 mt-1 text-xs">{FEATURED_EVENT.venue}</p>
              </div>
            </Link>

            {/* Food */}
            <Link
              href={`/food/${FEATURED_FOOD.slug}`}
              className="bg-white shadow-card group flex flex-col justify-between gap-6 rounded-2xl p-6 transition-transform hover:-translate-y-0.5"
            >
              <span className="border-ink/15 text-ink inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs">
                {FEATURED_FOOD.etaMinutes} min delivery
              </span>
              <div>
                <p className="text-muted font-mono text-[10px] uppercase tracking-wider">Food</p>
                <p className="font-display text-ink mt-1 text-xl leading-tight">
                  {FEATURED_FOOD.name}
                </p>
                <p className="text-muted mt-1 text-xs">
                  ★ {FEATURED_FOOD.rating} · {FEATURED_FOOD.cuisine}
                </p>
              </div>
            </Link>

            {/* Hot spot */}
            <Link
              href={`/hotspots/${HOTSPOTS_TRENDING[0].slug}`}
              className="bg-cream-deep group flex flex-col justify-between gap-6 rounded-2xl p-6 transition-transform hover:-translate-y-0.5"
            >
              <span className="bg-lime text-ink inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium">
                <span className="bg-lime-deep h-1.5 w-1.5 rounded-full" />
                {HOTSPOTS_TRENDING[0].hereCount} here
              </span>
              <div>
                <p className="text-muted font-mono text-[10px] uppercase tracking-wider">Hot spot</p>
                <p className="font-display text-ink mt-1 text-xl leading-tight">
                  {HOTSPOTS_TRENDING[0].name}
                </p>
                <p className="text-muted mt-1 text-xs">{HOTSPOTS_TRENDING[0].meta}</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── How it works ────────────────────────────────────────────── */}
      <section className="px-6 pt-20">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-lime-deep">How it works</p>
          <h2 className="font-display text-section text-ink mt-2">
            Three steps. No agent runaround.
          </h2>
          <div className="relative mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                num: '01',
                icon: Search,
                title: 'Search & filter',
                body: 'Pick a campus, set a budget, choose your room type. Real-time filtered list.',
              },
              {
                num: '02',
                icon: MessageSquare,
                title: 'Request to book',
                body: 'Message the verified landlord, schedule a visit, agree on terms - all in app.',
              },
              {
                num: '03',
                icon: ShieldCheck,
                title: 'Pay in escrow',
                body: 'Rent + caution sits in Sync escrow via Paystack. Released once you move in.',
              },
            ].map(({ num, icon: Icon, title, body }, i) => (
              <div
                key={num}
                className="group bg-white shadow-card hover:shadow-pop relative flex flex-col gap-5 overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Oversized ghost number */}
                <span
                  aria-hidden="true"
                  className="font-display text-ink/[0.04] pointer-events-none absolute -right-2 -top-4 text-[120px] leading-none"
                >
                  {num}
                </span>
                <div className="relative flex items-center gap-3">
                  <span className="bg-lime text-ink flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-rotate-6">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-lime-deep text-xs tracking-wider">
                    Step {num}
                  </span>
                </div>
                <div className="relative">
                  <p className="font-display text-card text-ink">{title}</p>
                  <p className="text-muted mt-2 text-sm">{body}</p>
                </div>
                {/* Connector arrow to the next step (desktop) */}
                {i < 2 && (
                  <span
                    aria-hidden="true"
                    className="bg-cream text-ink absolute -right-2.5 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full shadow-sm md:flex"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About us ────────────────────────────────────────────────── */}
      <section className="px-6 pt-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <div>
            <p className="eyebrow text-lime-deep">About {SITE.name}</p>
            <h2 className="font-display text-section text-ink mt-2">
              Built for student life in Nigeria.
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-lead text-ink">
              {SITE.name} started with one problem every Nigerian student knows: finding a safe room
              without trekking street to street or losing money to a fake agent.
            </p>
            <p className="text-body text-muted">
              So we built a marketplace where every vendor is verified - ID-checked, business-proofed,
              and visited in person before they ever go live. Today {SITE.name} is more than hostels:
              events, food, laundry, beauty, trades, and the spots worth knowing, all in one feed.
              Built by {SITE.legalName}, launching in {SITE.launchMarket}.
            </p>
            <dl className="border-ink/10 mt-2 grid grid-cols-3 gap-6 border-t pt-6">
              {[
                { v: '412', l: 'Verified hostels' },
                { v: '4', l: 'Campuses live' },
                { v: '5%', l: 'Flat fee, not 20%' },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-ink text-[32px] leading-none">{s.v}</dt>
                  <dd className="text-muted mt-1 text-xs">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────────── */}
      <section className="px-6 pt-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <div>
            <p className="eyebrow text-lime-deep">FAQ</p>
            <h2 className="font-display text-section text-ink mt-2">Good questions.</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-ink text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted text-sm">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── Verification trust band ─────────────────────────────────── */}
      <section className="px-6 pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="bg-cream-deep flex flex-col items-start gap-4 rounded-2xl p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <ul className="text-ink flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
              <li className="inline-flex items-center gap-2">
                <BadgeCheck className="text-lime-deep h-4 w-4" /> Every listing verified
              </li>
              <li className="inline-flex items-center gap-2">
                <ShieldCheck className="text-lime-deep h-4 w-4" /> Photos by our team
              </li>
              <li className="inline-flex items-center gap-2">
                <Sparkles className="text-lime-deep h-4 w-4" /> Pay safely with Paystack
              </li>
              <li className="inline-flex items-center gap-2">
                <ChevronDown className="text-lime-deep h-4 w-4 rotate-[-90deg]" /> 24h response avg.
              </li>
            </ul>
            <Button asChild variant="dark" size="md">
              <Link href="/how-it-works">
                How verification works <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Newsletter ──────────────────────────────────────────────── */}
      <Newsletter />

      {/* ─── Landlord CTA (full-bleed, flush under newsletter) ───────── */}
      <section className="bg-ink text-cream w-full">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <div>
            <p className="eyebrow text-lime">Are you a landlord?</p>
            <h2 className="font-display text-section mt-3">
              List a property. Get verified students.
            </h2>
            <p className="text-cream/70 mt-3 max-w-md text-sm">
              We verify, photograph, and list your property. You keep what you earn - paid via
              Paystack.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/signup?role=vendor&category=landlord">
              List a property <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

/** Single cell in the segmented search row. Eyebrow label above, value below. */
function SearchCell({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue: string;
}) {
  const id = `search-${name}`;
  return (
    <label
      htmlFor={id}
      className="focus-within:bg-cream/40 flex cursor-text flex-col gap-0.5 bg-white px-5 py-3 transition-colors"
    >
      <span className="text-muted font-mono text-[10px] tracking-wider uppercase">{label}</span>
      <input
        id={id}
        name={name}
        defaultValue={defaultValue}
        className="text-ink placeholder:text-muted bg-transparent text-sm font-medium outline-none"
      />
    </label>
  );
}
