/**
 * ROUTE: /vendor
 * ACCESS: authenticated vendor
 * PURPOSE: Vendor dashboard overview — KPIs, latest orders, unread inbox count, plan status, verification status.
 * BUILT HERE: KPI <Card>s, recent orders table, <VerifiedBadge> banner if pending.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
// src/app/(vendor)/vendor/page.tsximport type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const  Metadata = { title: 'Vendor dashboard — Mama Put Tanke' }

const orders = [
  { initials: 'AO', name: 'Aisha O.',  meta: 'UIUI · chicken · chapman · 2 min ago', status: 'new',     statusLabel: 'new' },
  { initials: 'DB', name: 'David B.',  meta: '2x suya combo · 8 min ago',            status: 'cooking', statusLabel: 'cooking' },
  { initials: 'SK', name: 'Sarah K.',  meta: 'Amala · ewedu · 21 min ago',           status: 'ready',   statusLabel: 'ready' },
]

const listings = [
  { name: 'Mama Put Tanke menu',  meta: '112 views · 8 orders today', status: 'active',  statusLabel: 'Active',         img: '' },
  { name: 'Suya combo plate',     meta: '46 views · 3 orders',        status: 'paused',  statusLabel: 'Paused',         img: '' },
  { name: 'Sunday brunch buffet', meta: '— Submitted 2h ago',         status: 'review',  statusLabel: 'Pending review', img: '' },
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
          <span className="flex items-center bg-[#c8f135] border border-[#b8e020] text-[#4a5800] text-7 font-semibold px-3 py-1 rounded-full">
             Verified pro
          </span>
                 </div>
      </div>

      {/* Page title */}
      <h1 className="text-2xl font-display mb-8 leading-tight">
        8 new orders <span className="font-mono text-[#c8f135] font-semibold">this week.</span>
      </h1>

      {/* Stats */}
     <div className="grid grid-cols-4 gap-2 mb-8 w-full h-40">
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
      <p className={`text-15 tracking-widest uppercase font-medium mb-2 font-display ${
        s.highlight ? 'text-[#6a7a00]' : 'text-[#aaa]'
      }`}>
        {s.label}
      </p>
      <p className={`text-[26px] font-semibold leading-none mb-2 font-display ${
        s.highlight ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]'
      }`}>
        {s.value}
      </p>
      <p className={`text-10 font-medium font-display ${
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
  <div className="bg-white border border-[#e0ddd5] rounded-2xl p-4">
    <div className="flex items-center justify-between mb-3">
      <p className="text-15 tracking-widest uppercase text-[#b8e020] font-display">
        Live orders · 3 pending
      </p>
      <Link href="/vendor/orders" className="text-15 font-display text-[#1a1a1a] hover:underline">
        View all →
      </Link>
    </div>

    {orders.map(o => (
      <div
        key={o.name}
        className="flex items-center gap-3 py-2.5 border-t border-[#f0ede5] first:border-t-0 first:pt-0"
      >
        
        <div className="w-9 h-9 rounded-full bg-[#f0ede5] border border-[#e0ddd5] flex items-center justify-center text-[12px] font-mono text-[#888] flex-shrink-0">
          {o.initials}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-15 font-semibold font-display leading-tight">{o.name}</p>
          <p className="text-10 text-[#aaa] font-display truncate mt-0.5">{o.meta}</p>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className={`text-8 px-2.5 py-1 rounded-full border font-medium ${statusBadge[o.status]}`}>
            {o.statusLabel}
          </span>
          <button className="bg-[#c8f135] border border-[#b8e020] text-[#1a1a1a] text-8 font-display px-3 py-1 rounded-full flex items-center gap-1 hover:bg-[#b8e020] transition-colors">
            Next →
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Listings */}
  <div className="bg-white border border-[#e0ddd5] rounded-2xl p-4">
    <div className="flex items-center justify-between mb-3">
      <p className="text-15 tracking-widest uppercase text-[#b8e020] font-display">
        My listings · 3
      </p>
      <button className="text-15 font-display text-[#1a1a1a] hover:underline">
        + Add
      </button>
    </div>

    {listings.map(l => (
      <div
        key={l.name}
        className="flex items-center gap-3 py-2.5 border-t border-[#f0ede5] first:border-t-0 first:pt-0"
      >
        {/* Image — dashed placeholder matching screenshot */}
        <div className="w-10 h-10 rounded-lg border-[1.5px] border-dashed border-[#d6d2c8] bg-[#fafaf8] flex-shrink-0 overflow-hidden flex items-center justify-center">
          {l.img ? (
            <Image
              src={l.img}
              alt={l.name}
              width={40}
              height={40}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            // placeholder X lines when no image
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="1" y="1" width="18" height="18" rx="2" stroke="#d6d2c8" strokeWidth="1.5"/>
              <line x1="1" y1="1" x2="19" y2="19" stroke="#d6d2c8" strokeWidth="1.5"/>
              <line x1="19" y1="1" x2="1" y2="19" stroke="#d6d2c8" strokeWidth="1.5"/>
            </svg>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-15 font-semibold font-display leading-tight">{l.name}</p>
          <p className="text-8 font-display text-[#aaa] mt-0.5">{l.meta}</p>
        </div>

        <span className={`text-10 px-2.5 py-1 rounded-full border font-medium font-display whitespace-nowrap ${statusBadge[l.status]}`}>
          {l.statusLabel}
        </span>
      </div>
    ))}
  </div>

</div>

      {/* Subscription bar */}
      <div className="bg-white border border-[#e0ddd5] rounded-xl px-4 py-3 flex items-center justify-between gap-4 font-display">
        <div>
          <p className="text-10 tracking-widest uppercase text-[#aaa] mb-1">Subscription · Pro yearly</p>
          <p className="text-6 font-medium">Renews Apr 12, 2027 · ₦39,600 · Paystack card ending 2241</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="bg-white border border-[#d6d2c8] text-[#1a1a1a] text-5 px-3 py-1.5 rounded-full hover:border-[#b8e020] transition-colors">
            Update payment
          </button>
          <button className="bg-[#c8f135] border border-[#b8e020] text-[#4a5800] text-5 font-medium px-3 py-1.5 rounded-full hover:bg-[#b8e020] transition-colors">
            Upgrade to Business
          </button>
        </div>
      </div>

    </main>
  )
}
