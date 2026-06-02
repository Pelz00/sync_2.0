/**
 * ROUTE: /vendor
 * ACCESS: authenticated vendor
 * PURPOSE: Vendor dashboard overview — KPIs, latest orders, unread inbox count, plan status, verification status.
 * BUILT HERE: KPI <Card>s, recent orders table, <VerifiedBadge> banner if pending.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = { title: 'Vendor dashboard — Mama Put Tanke' };

const orders = [
  {
    initials: 'AO',
    name: 'Aisha O.',
    meta: 'UIUI · chicken · chapman · 2 min ago',
    status: 'new',
    statusLabel: 'new',
  },
  {
    initials: 'DB',
    name: 'David B.',
    meta: '2x suya combo · 8 min ago',
    status: 'cooking',
    statusLabel: 'cooking',
  },
  {
    initials: 'SK',
    name: 'Sarah K.',
    meta: 'Amala · ewedu · 21 min ago',
    status: 'ready',
    statusLabel: 'ready',
  },
];

const listings = [
  {
    name: 'Mama Put Tanke menu',
    meta: '112 views · 8 orders today',
    status: 'active',
    statusLabel: 'Active',
    img: '',
  },
  {
    name: 'Suya combo plate',
    meta: '46 views · 3 orders',
    status: 'paused',
    statusLabel: 'Paused',
    img: '',
  },
  {
    name: 'Sunday brunch buffet',
    meta: '— Submitted 2h ago',
    status: 'review',
    statusLabel: 'Pending review',
    img: '',
  },
];

const statusBadge: Record<string, string> = {
  new: 'bg-[#c8f135] border-[#b8e020] text-[#4a5800]',
  cooking: 'bg-[#fff3cd] border-[#ffd86b] text-[#7a5500]',
  ready: 'bg-[#d1f7e0] border-[#6ee09a] text-[#1a6b3a]',
  active: 'bg-[#c8f135] border-[#b8e020] text-[#4a5800]',
  paused: 'bg-[#ffeaea] border-[#ffb3b3] text-[#a33333]',
  review: 'bg-[#fff3cd] border-[#ffd86b] text-[#7a5500]',
};

export default function VendorDashboardPage() {
  return (
    <main className="font-display min-h-screen bg-[#f5f2eb] p-4 text-[#1a1a1a]">
      {/* Top row */}
      <div className="mb-1 flex items-start justify-between">
        <p className="text-sm tracking-widest text-[#aaa] uppercase">
          Vendor dashboard &rsaquo; <span className="text-[#888]">Mama Put Tanke</span>
        </p>
        <div className="flex items-center gap-2">
          <span className="flex items-center rounded-full border border-[#b8e020] bg-[#c8f135] px-3 py-1 text-[11px] font-semibold text-[#4a5800]">
            Verified pro
          </span>
        </div>
      </div>

      {/* Page title */}
      <h1 className="font-display mb-8 text-2xl leading-tight">
        8 new orders <span className="font-mono font-semibold text-[#c8f135]">this week.</span>
      </h1>

      {/* Stats */}
      <div className="mb-8 grid h-40 w-full grid-cols-4 gap-2">
        {[
          { label: 'This week', value: '₦68,500', sub: '+24%', highlight: true },
          { label: 'Next payout', value: '₦52,300', sub: 'Sat 11pm', highlight: false },
          { label: 'Conversion', value: '31%', sub: 'views → orders', highlight: false },
          { label: 'Plan usage', value: '6/10', sub: 'listings · Pro yearly', highlight: false },
        ].map((s) => (
          <div
            key={s.label}
            className={`rounded-2xl border px-4 py-3 ${
              s.highlight ? 'border-[#b8e020] bg-[#c8f135]' : 'border-[#e0ddd5] bg-white'
            }`}
          >
            <p
              className={`font-display mb-2 text-sm font-medium tracking-widest uppercase ${
                s.highlight ? 'text-[#6a7a00]' : 'text-[#aaa]'
              }`}
            >
              {s.label}
            </p>
            <p
              className={`font-display mb-2 text-[26px] leading-none font-semibold ${
                s.highlight ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]'
              }`}
            >
              {s.value}
            </p>
            <p
              className={`font-display text-xs font-medium ${
                s.highlight ? 'text-[#4a5800]' : 'text-[#888]'
              }`}
            >
              {s.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Two columns */}
      <div className="mb-3 grid grid-cols-2 gap-3">
        {/* Orders */}
        <div className="rounded-2xl border border-[#e0ddd5] bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-display text-sm tracking-widest text-[#b8e020] uppercase">
              Live orders · 3 pending
            </p>
            <Link
              href="/vendor/orders"
              className="font-display text-sm text-[#1a1a1a] hover:underline"
            >
              View all →
            </Link>
          </div>

          {orders.map((o) => (
            <div
              key={o.name}
              className="flex items-center gap-3 border-t border-[#f0ede5] py-2.5 first:border-t-0 first:pt-0"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#e0ddd5] bg-[#f0ede5] font-mono text-[12px] text-[#888]">
                {o.initials}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-display text-sm leading-tight font-semibold">{o.name}</p>
                <p className="font-display mt-0.5 truncate text-xs text-[#aaa]">{o.meta}</p>
              </div>

              <div className="flex flex-shrink-0 items-center gap-1.5">
                <span
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${statusBadge[o.status]}`}
                >
                  {o.statusLabel}
                </span>
                <button className="font-display flex items-center gap-1 rounded-full border border-[#b8e020] bg-[#c8f135] px-3 py-1 text-[11px] text-[#1a1a1a] transition-colors hover:bg-[#b8e020]">
                  Next →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Listings */}
        <div className="rounded-2xl border border-[#e0ddd5] bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-display text-sm tracking-widest text-[#b8e020] uppercase">
              My listings · 3
            </p>
            <button className="font-display text-sm text-[#1a1a1a] hover:underline">+ Add</button>
          </div>

          {listings.map((l) => (
            <div
              key={l.name}
              className="flex items-center gap-3 border-t border-[#f0ede5] py-2.5 first:border-t-0 first:pt-0"
            >
              {/* Image — dashed placeholder matching screenshot */}
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border-[1.5px] border-dashed border-[#d6d2c8] bg-[#fafaf8]">
                {l.img ? (
                  <Image
                    src={l.img}
                    alt={l.name}
                    width={40}
                    height={40}
                    className="h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  // placeholder X lines when no image
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect
                      x="1"
                      y="1"
                      width="18"
                      height="18"
                      rx="2"
                      stroke="#d6d2c8"
                      strokeWidth="1.5"
                    />
                    <line x1="1" y1="1" x2="19" y2="19" stroke="#d6d2c8" strokeWidth="1.5" />
                    <line x1="19" y1="1" x2="1" y2="19" stroke="#d6d2c8" strokeWidth="1.5" />
                  </svg>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-display text-sm leading-tight font-semibold">{l.name}</p>
                <p className="font-display mt-0.5 text-[11px] text-[#aaa]">{l.meta}</p>
              </div>

              <span
                className={`font-display rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap ${statusBadge[l.status]}`}
              >
                {l.statusLabel}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription bar */}
      <div className="font-display flex items-center justify-between gap-4 rounded-xl border border-[#e0ddd5] bg-white px-4 py-3">
        <div>
          <p className="mb-1 text-xs tracking-widest text-[#aaa] uppercase">
            Subscription · Pro yearly
          </p>
          <p className="text-xs font-medium">
            Renews Apr 12, 2027 · ₦39,600 · Paystack card ending 2241
          </p>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          <button className="rounded-full border border-[#d6d2c8] bg-white px-3 py-1.5 text-xs text-[#1a1a1a] transition-colors hover:border-[#b8e020]">
            Update payment
          </button>
          <button className="rounded-full border border-[#b8e020] bg-[#c8f135] px-3 py-1.5 text-xs font-medium text-[#4a5800] transition-colors hover:bg-[#b8e020]">
            Upgrade to Business
          </button>
        </div>
      </div>
    </main>
  );
}
