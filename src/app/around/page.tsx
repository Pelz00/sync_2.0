/**
 * ROUTE: /around
 * ACCESS: public (the "home hub of the full Sync app" per the hi-fi guide)
 * PURPOSE: Personalised feed surfacing what matters around the student's
 *          hostel right now - events, food, laundry, hotspots, hostel
 *          board posts, MTN sponsored slot, and a hostel-resume nudge.
 * BUILT HERE (per section 02 Around you · Home Hub of the hi-fi PDF):
 *   - Eyebrow date + verified-spots pill
 *   - Personalised hero "Hi Aisha - today in your radius."
 *   - QUICK STATS block (3 rooms left / 240 going / 28 min)
 *   - Full-width segmented search (SEARCH / MODULE / BUDGET / WHEN)
 *   - 3-column mosaic: Featured event / food + sponsored / laundry + hotspots
 *   - Bottom: hostel board + resume booking
 * DATA: mock from `@/mock/around`. DEV-ONLY 5s delay below so the
 *       BrandLoader stays on screen - remove when real queries land.
 */
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowRight, ChevronDown, Plus, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AroundMap } from '@/components/shared/around-map';
import {
  FEATURED_EVENT,
  FEATURED_FOOD,
  HOSTEL_BOARD,
  HOTSPOTS_TRENDING,
  LAUNDRY_PROMO,
  MOCK_USER,
  QUICK_STATS,
  RESUME_BOOKING,
  SPONSORED_SLOT,
  VERIFIED_SPOTS_COUNT,
} from '@/mock/around';
import { getCurrentUser, getFirstName } from '@/modules/auth/queries';
import { formatNaira } from '@/lib/utils';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Around you',
  description: 'Events, food, laundry, hotspots - everything around your hostel, in one place.',
};

// DEV ONLY - artificial delay so the BrandLoader stays visible.
const DEV_LOADER_DELAY_MS = 5000;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default async function AroundPage() {
  if (process.env.NODE_ENV !== 'production') await sleep(DEV_LOADER_DELAY_MS);

  // Personalise only when signed in; signed-out visitors see a generic greeting.
  const firstName = getFirstName(await getCurrentUser());

  const today = new Date();
  const dateLine = `${format(today, 'EEE').toUpperCase()} · ${format(today, 'MMM d').toUpperCase()} · ${MOCK_USER.campus.toUpperCase()}`;

  return (
    <main className="mx-auto max-w-7xl px-6 pt-8 pb-12">
      {/* ─── Eyebrow row ────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-content-muted font-mono text-[11px] tracking-wider">{dateLine}</p>
        <span className="bg-lime text-ink inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium">
          <span className="bg-lime-deep h-1.5 w-1.5 rounded-full" />
          {VERIFIED_SPOTS_COUNT} verified spots near you
        </span>
      </div>

      {/* ─── Hero + Quick stats ─────────────────────────────────────── */}
      <header className="mt-6 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
        <div>
          <h1 className="font-display text-[44px] leading-[0.98] font-bold tracking-[-0.035em] md:text-[64px] md:leading-[0.96] md:tracking-[-0.04em]">
            {firstName ? (
              <>
                Hi <span className="text-accent-fg italic">{firstName}</span>
                <span className="text-foreground"> - today</span>
              </>
            ) : (
              <span className="text-foreground">Today</span>
            )}
            <br />
            in{' '}
            <span className="bg-lime text-ink box-decoration-clone px-1.5 leading-[1.1]">
              your radius
            </span>
            .
          </h1>
          <p className="text-content-muted text-lead mt-4 max-w-2xl">
            Tonight&rsquo;s events, food near your hostel, who&rsquo;s free for braids, the plumber
            4 minutes away. Everything Sync, in one place.
          </p>
        </div>
        <QuickStats />
      </header>

      {/* ─── Smart search row ───────────────────────────────────────── */}
      <SmartSearch />

      {/* ─── On the map (radius view with distances) ────────────────── */}
      <section aria-labelledby="around-map-heading" className="mt-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow text-content-muted">On the map</p>
            <h2 id="around-map-heading" className="font-display text-section text-foreground mt-1">
              Everything within your radius
            </h2>
          </div>
          <p className="text-content-muted text-xs">Tap a pin · distances from your hostel</p>
        </div>
        <AroundMap className="mt-5" />
      </section>

      {/* ─── 3-column mosaic ────────────────────────────────────────── */}
      <section className="mt-6 grid gap-5 lg:grid-cols-12">
        <FeaturedEventCard className="lg:col-span-5 lg:row-span-2" />
        <FoodCard className="lg:col-span-4" />
        <LaundryCard className="lg:col-span-3" />
        <SponsoredCard className="lg:col-span-4" />
        <HotspotsCard className="lg:col-span-3" />
      </section>

      {/* ─── Bottom row ─────────────────────────────────────────────── */}
      <section className="mt-5 grid gap-5 lg:grid-cols-12">
        <HostelBoardCard className="lg:col-span-7" />
        <ResumeBookingCard className="lg:col-span-5" />
      </section>
    </main>
  );
}

/* ──────────────────── Subcomponents ──────────────────────────────── */

function QuickStats() {
  return (
    <aside aria-label="Quick stats" className="flex flex-col gap-3">
      <p className="eyebrow text-content-muted">Quick stats</p>
      <div className="grid grid-cols-3 gap-3">
        {QUICK_STATS.map((s) => (
          <div
            key={s.label}
            className="border-line/5 bg-panel/70 flex gap-1.5 rounded-xl border p-4"
          >
            <p
              className={cn(
                'font-display text-[28px] leading-none tracking-tight whitespace-nowrap',
                s.accent ? 'text-accent-fg' : 'text-foreground',
              )}
            >
              {s.value}
            </p>
            <p className="text-content-muted text-[11px] leading-tight">{s.label}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

function SmartSearch() {
  return (
    <form
      action="/search"
      method="get"
      className="border-line/10 bg-panel mt-8 grid overflow-hidden rounded-2xl border md:grid-cols-[2fr_1fr_1fr_1fr_auto]"
    >
      <SearchCell
        label="Search hostels, food, events…"
        name="q"
        placeholder="Try 'jollof, fast wifi, no wahala'"
      />
      <SearchCell label="Module" name="module" defaultValue="All" />
      <SearchCell label="Budget" name="budget" defaultValue="₦ Any" />
      <SearchCell label="When" name="when" defaultValue="Now" />
      <div className="bg-surface-deep/50 flex items-center p-2 md:bg-transparent">
        <Button type="submit" size="md" className="w-full md:w-auto">
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>
    </form>
  );
}

function SearchCell({
  label,
  name,
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  const id = `as-${name}`;
  return (
    <label
      htmlFor={id}
      className="border-line/5 focus-within:bg-surface/40 flex cursor-text flex-col gap-1 border-r px-4 py-3 transition-colors last:border-r-0"
    >
      <span className="text-content-muted font-mono text-[10px] tracking-wider uppercase">
        {label}
      </span>
      <input
        id={id}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="text-foreground placeholder:text-content-muted bg-transparent text-sm font-medium outline-none"
      />
    </label>
  );
}

function FeaturedEventCard({ className }: { className?: string }) {
  return (
    <Link
      href={`/events/${FEATURED_EVENT.slug}`}
      className={cn(
        'group text-cream relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-[#3a2150] via-[#1e1530] to-[#0a0a14]',
        'min-h-[420px]',
        className,
      )}
    >
      {/* Top pills */}
      <div className="flex items-start gap-2 p-5">
        <span className="bg-lime text-ink inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium">
          <span className="bg-ink h-1.5 w-1.5 rounded-full" />
          {FEATURED_EVENT.when}
        </span>
        <span className="border-cream/30 text-cream/90 inline-flex items-center rounded-full border px-3 py-1 text-xs">
          {FEATURED_EVENT.category}
        </span>
      </div>

      {/* Title block - pushed near the bottom */}
      <div className="mt-auto px-5 pb-2">
        <h2 className="font-display text-[40px] leading-[0.95] font-bold tracking-[-0.035em] md:text-[48px]">
          {FEATURED_EVENT.title}
          <br />
          <span className="text-lime italic">{FEATURED_EVENT.performer}</span>
        </h2>
      </div>

      {/* Footer band - cream surface */}
      <div className="bg-surface text-foreground mt-4 flex items-center justify-between px-5 py-4">
        <div className="min-w-0">
          <p className="text-foreground text-xs">{FEATURED_EVENT.venue}</p>
          <div className="text-content-muted mt-1.5 flex items-center gap-2 text-[11px]">
            <FriendStack />
            <span>
              {FEATURED_EVENT.goingCount} going · {FEATURED_EVENT.friendsGoing} friends
            </span>
          </div>
        </div>
        <div className="flex shrink-0 items-end gap-3">
          <div className="text-right">
            <p className="text-content-muted text-[10px] tracking-wider uppercase">From</p>
            <p className="font-display text-card text-foreground leading-none">
              {formatNaira(FEATURED_EVENT.priceFrom)}
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

function FriendStack() {
  // Tiny BKTD-style attendee initials, per the hi-fi.
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

function FoodCard({ className }: { className?: string }) {
  return (
    <article
      className={cn('bg-panel shadow-card flex flex-col overflow-hidden rounded-2xl', className)}
    >
      <div className="flex flex-col gap-2 p-5">
        <p className="text-content-muted font-mono text-[10px] tracking-wider uppercase">
          Food · {FEATURED_FOOD.etaMinutes} min
        </p>
        {/* Stylised food swatch (cream → coral gradient) - no external image needed. */}
        <div className="from-cream-deep mt-1 h-28 w-full rounded-xl bg-gradient-to-br via-[#f5b486] to-[#e0824a]" />
        <div className="mt-3 flex items-start justify-between gap-2">
          <h3 className="font-display text-card text-foreground">{FEATURED_FOOD.name}</h3>
          <span className="text-foreground inline-flex items-center gap-0.5 text-xs">
            ★ <span className="font-medium">{FEATURED_FOOD.rating}</span>
          </span>
        </div>
        <p className="text-content-muted text-xs">
          {FEATURED_FOOD.cuisine} · {FEATURED_FOOD.priceTier}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {FEATURED_FOOD.promos.map((p) => (
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
            From{' '}
            <span className="font-display text-card">{formatNaira(FEATURED_FOOD.priceFrom)}</span>
          </p>
          <Button asChild variant="outline" size="sm">
            <Link href={`/food/${FEATURED_FOOD.slug}`}>
              Order <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

function LaundryCard({ className }: { className?: string }) {
  return (
    <article
      className={cn(
        'bg-surface-deep flex flex-col justify-between gap-5 rounded-2xl p-5',
        className,
      )}
    >
      <div>
        <p className="text-content-muted font-mono text-[10px] tracking-wider uppercase">
          Laundry · Pickup today
        </p>
        <h3 className="font-display text-foreground mt-3 text-[22px] leading-tight font-semibold tracking-[-0.02em]">
          {LAUNDRY_PROMO.headlineParts.lead}
          <br />
          {LAUNDRY_PROMO.headlineParts.tail}{' '}
          <span className="text-accent-fg italic">{LAUNDRY_PROMO.headlineParts.accent}</span>
        </h3>
        <div className="mt-4 flex flex-wrap gap-1.5">
          <span className="bg-panel text-foreground rounded-full px-3 py-1 text-xs">
            {formatNaira(LAUNDRY_PROMO.perPiecePrice)} / piece
          </span>
          <span className="bg-panel text-foreground rounded-full px-3 py-1 text-xs">
            {LAUNDRY_PROMO.pickupLine}
          </span>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-content-muted text-xs">Next slot · {LAUNDRY_PROMO.nextSlot}</p>
        <Button asChild size="sm">
          <Link href="/laundry">
            Schedule <ArrowRight />
          </Link>
        </Button>
      </div>
    </article>
  );
}

function SponsoredCard({ className }: { className?: string }) {
  return (
    <article className={cn('bg-ink text-cream flex flex-col gap-4 rounded-2xl p-5', className)}>
      <header className="flex items-center justify-between">
        <span className="text-cream/50 font-mono text-[10px] tracking-wider uppercase">
          Sponsored
        </span>
        <span className="bg-surface text-foreground rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider">
          {SPONSORED_SLOT.brand}
        </span>
      </header>
      <h3 className="font-display text-[22px] leading-tight font-semibold tracking-[-0.02em]">
        <span className="text-lime italic">{SPONSORED_SLOT.headlineLead}</span>
        <br />
        {SPONSORED_SLOT.headlineTail.split(/(Saturday\.)/).map((part, i) =>
          part === 'Saturday.' ? (
            <span key={i} className="text-lime italic">
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </h3>
      <p className="text-cream/70 text-xs">{SPONSORED_SLOT.body}</p>
      <Button asChild variant="primary" size="sm" className="mt-auto self-start">
        <Link href={SPONSORED_SLOT.ctaHref}>
          {SPONSORED_SLOT.ctaLabel} <ArrowRight />
        </Link>
      </Button>
    </article>
  );
}

function HotspotsCard({ className }: { className?: string }) {
  return (
    <article className={cn('bg-panel shadow-card flex flex-col gap-3 rounded-2xl p-5', className)}>
      <header className="flex items-center justify-between">
        <p className="text-content-muted font-mono text-[10px] tracking-wider uppercase">
          Hot spots · {HOTSPOTS_TRENDING.length} trending
        </p>
        <span aria-hidden="true" className="text-[14px]">
          🔥
        </span>
      </header>
      <ul className="divide-line/5 -mx-1 divide-y">
        {HOTSPOTS_TRENDING.map((h) => (
          <li key={h.slug}>
            <Link
              href={`/hotspots/${h.slug}`}
              className="hover:bg-ink/[0.02] flex items-center justify-between gap-3 rounded-md px-1 py-3"
            >
              <div className="min-w-0">
                <p className="text-foreground truncate text-sm font-medium">{h.name}</p>
                <p className="text-content-muted truncate text-xs">{h.meta}</p>
              </div>
              <span className="bg-lime text-ink inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium">
                <span className="bg-lime-deep h-1 w-1 rounded-full" />
                {h.hereCount} here
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

function HostelBoardCard({ className }: { className?: string }) {
  return (
    <article className={cn('bg-panel shadow-card flex flex-col gap-3 rounded-2xl p-5', className)}>
      <header className="flex items-center justify-between">
        <p className="text-content-muted font-mono text-[10px] tracking-wider uppercase">
          Hostel board · {HOSTEL_BOARD.hostel}
        </p>
        <button
          type="button"
          aria-label="New post"
          className="text-content-muted hover:text-foreground hover:bg-ink/5 inline-flex h-6 w-6 items-center justify-center rounded-full transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </header>
      <ul className="divide-line/5 -mx-1 divide-y">
        {HOSTEL_BOARD.posts.map((p) => (
          <li key={p.id}>
            <Link
              href="/me/messages"
              className="hover:bg-ink/[0.02] flex items-center justify-between gap-3 rounded-md px-1 py-3"
            >
              <p className="text-foreground truncate text-sm">{p.title}</p>
              <p className="text-content-muted shrink-0 text-xs">
                {p.author} · {p.age}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

function ResumeBookingCard({ className }: { className?: string }) {
  return (
    <article
      className={cn(
        'border-line/10 bg-panel flex flex-col gap-4 rounded-2xl border border-dashed p-5',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="bg-lime text-ink inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium">
          <ChevronDown className="h-3 w-3 -rotate-90" />
          Resume
        </span>
        <span className="text-content-muted font-mono text-[10px] tracking-wider uppercase">
          Hostels
        </span>
      </div>
      <h3 className="font-display text-card text-foreground">
        Still searching for a <span className="text-accent-fg italic">hostel?</span>
      </h3>
      <div className="border-line/5 flex items-center gap-3 rounded-xl border p-3">
        <div className="h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br from-[#caa17a] via-[#a07a52] to-[#5e4530]" />
        <div className="min-w-0 flex-1">
          <p className="text-foreground truncate text-sm font-medium">
            {RESUME_BOOKING.hostelName}
          </p>
          <p className="text-content-muted text-xs">
            {RESUME_BOOKING.roomsLeft} rooms left · {formatNaira(RESUME_BOOKING.pricePerYear)}/yr
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href={`/hostels/${RESUME_BOOKING.hostelSlug}`}>
            <Users className="hidden h-3.5 w-3.5 sm:inline" />
            Resume
          </Link>
        </Button>
      </div>
    </article>
  );
}
