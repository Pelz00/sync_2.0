/**
 * ROUTE: /vendor
 * ACCESS: authenticated vendor
 * PURPOSE: Vendor dashboard overview — KPIs, latest orders, unread inbox count, plan status, verification status.
 * BUILT HERE: KPI <Card>s, recent orders table, <VerifiedBadge> banner if pending.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
// app/vendor/dashboard/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = { title: 'Vendor dashboard — Mama Put Tanke' }

const orders = [
  { initials: 'AO', name: 'Aisha O.',  meta: 'UIUI · chicken · chapman · 2 min ago', status: 'new',     statusLabel: 'new' },
  { initials: 'DB', name: 'David B.',  meta: '2x suya combo · 8 min ago',            status: 'cooking', statusLabel: 'cooking' },
  { initials: 'SK', name: 'Sarah K.',  meta: 'Amala · ewedu · 21 min ago',           status: 'ready',   statusLabel: 'ready' },
]

const listings = [
  { name: 'Mama Put Tanke menu',  meta: '112 views · 8 orders today', status: 'active',  statusLabel: 'Active',         img: '/images/menu.jpg' },
  { name: 'Suya combo plate',     meta: '46 views · 3 orders',        status: 'paused',  statusLabel: 'Paused',         img: '/images/suya.jpg' },
  { name: 'Sunday brunch buffet', meta: '— Submitted 2h ago',         status: 'review',  statusLabel: 'Pending review', img: '/images/brunch.jpg' },
]

const statusBadge: Record<string, string> = {
  new:     'bg-[#c8f135] border-[#b8e020] text-[#4a5800]',
  cooking: 'bg-[#fff3cd] border-[#ffd86b] text-[#7a5500]',
  ready:   'bg-[#d1f7e0] border-[#6ee09a] text-[#1a6b3a]',
  active:  'bg-[#c8f135] border-[#b8e020] text-[#4a5800]',
  paused:  'bg-[#ffeaea] border-[#ffb3b3] text-[#a33333]',
  review:  'bg-[#fff3cd] border-[#ffd86b] text-[#7a5500]',
}

export default function VendorDashboardPage() {
  return (
    <main className="h-screen bg-[#f5f2eb] p-4 font-['display'] text-[#1a1a1a]">

      {/* Top row */}
      <div className="flex items-start justify-between mb-1">
        <p className="text-15 tracking-widest uppercase text-[#aaa]">
          Vendor dashboard &rsaquo; <span className="text-[#888]">Mama Put Tanke</span>
        </p>
        <div className="flex items-center gap-2">
          <span className="flex items-center bg-[#c8f135] border border-[#b8e020] text-[#4a5800] text-7 font-sm px-3 py-1 rounded-full">
             Verified pro
          </span>
                 </div>
      </div>

      {/* Page title */}
      <h1 className="text-2xl font-display mb-8 leading-tight">
        8 new orders <span className="font-mono text-[#c8f135] font-semibold">this week.</span>
      </h1>

      {/* Stats */}
     <div className="grid grid-cols-4 gap-2 mb-3 w-full h-40">
  {[
    { label: 'This week',   value: '₦68,500', sub: '+24%',               highlight: true  },
    { label: 'Next payout', value: '₦52,300', sub: 'Sat 11pm',           highlight: false },
    { label: 'Conversion',  value: '31%',     sub: 'views → orders',     highlight: false },
    { label: 'Plan usage',  value: '6/10',    sub: 'listings · Pro yearly', highlight: false },
  ].map(s => (
    <div
      key={s.label}
      className={`rounded-2xl border px-4 py-3 ${
        s.highlight
          ? 'bg-[#c8f135] border-[#b8e020]'
          : 'bg-white border-[#e0ddd5]'
      }`}
    >
      <p className={`text-[9px] tracking-widest uppercase font-medium mb-2 ${
        s.highlight ? 'text-[#6a7a00]' : 'text-[#aaa]'
      }`}>
        {s.label}
      </p>
      <p className={`text-[26px] font-semibold leading-none mb-2 ${
        s.highlight ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]'
      }`}>
        {s.value}
      </p>
      <p className={`text-[12px] font-medium ${
        s.highlight ? 'text-[#4a5800]' : 'text-[#888]'
      }`}>
        {s.sub}
      </p>
    </div>
  ))}
</div>

      {/* Two columns */}
      <div className="grid grid-cols-2 gap-3 mb-3">

        {/* Orders */}
        <div className="bg-white border border-[#e0ddd5] rounded-xl p-3">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] tracking-widest uppercase text-[#aaa]">
              Live orders <span className="bg-[#1a1a1a] text-[#f5f2eb] text-[10px] px-1.5 py-0.5 rounded-full ml-1">5</span>
              &nbsp;|&nbsp; 0 pending
            </p>
            <Link href="/vendor/orders" className="text-[11px] text-[#1a1a1a] hover:underline">View all →</Link>
          </div>
          {orders.map(o => (
            <div key={o.name} className="flex items-center gap-2 py-2 border-t border-[#f0ede5] first:border-t-0 first:pt-0">
              <div className="w-7 h-7 rounded-full bg-[#f5f2eb] border border-[#e0ddd5] flex items-center justify-center text-[11px] font-medium text-[#666] flex-shrink-0">
                {o.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium">{o.name}</p>
                <p className="text-[11px] text-[#aaa] truncate">{o.meta}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${statusBadge[o.status]}`}>
                  {o.statusLabel}
                </span>
                <button className="bg-[#1a1a1a] text-white text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1">
                  Next →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Listings */}
        <div className="bg-white border border-[#e0ddd5] rounded-xl p-3">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] tracking-widest uppercase text-[#aaa]">My listings · 3</p>
            <button className="text-[11px] text-[#1a1a1a] hover:underline">+ Add</button>
          </div>
          {listings.map(l => (
            <div key={l.name} className="flex items-center gap-2 py-2 border-t border-[#f0ede5] first:border-t-0 first:pt-0">
              {/* Listing image */}
              <div className="w-9 h-9 rounded-lg bg-[#f0ede5] border border-[#e0ddd5] flex-shrink-0 overflow-hidden">
                <Image
                  src={l.img}
                  alt={l.name}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium">{l.name}</p>
                <p className="text-[11px] text-[#aaa]">{l.meta}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium whitespace-nowrap ${statusBadge[l.status]}`}>
                {l.statusLabel}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Subscription bar */}
      <div className="bg-white border border-[#e0ddd5] rounded-xl px-4 py-3 flex items-center justify-between gap-4">
        <div>
          <p className="text-[9px] tracking-widest uppercase text-[#aaa] mb-1">Subscription · Pro yearly</p>
          <p className="text-[13px] font-medium">Renews Apr 12, 2027 · ₦39,600 · Paystack card ending 2241</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="bg-white border border-[#d6d2c8] text-[#1a1a1a] text-[11px] px-3 py-1.5 rounded-full hover:border-[#b8e020] transition-colors">
            Update payment
          </button>
          <button className="bg-[#c8f135] border border-[#b8e020] text-[#4a5800] text-[11px] font-medium px-3 py-1.5 rounded-full hover:bg-[#b8e020] transition-colors">
            Upgrade to Business
          </button>
        </div>
      </div>

    </main>
  )
}
