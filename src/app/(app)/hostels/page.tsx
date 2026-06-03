'use client';

import { useMemo, useState } from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface Hostel {
  slug: string;
  name: string;
  location: string;
  status: 'available' | 'reserved' | 'limited';
  rating: number;
  price: string;
  tags: string[];
}

const HOSTELS: Hostel[] = [
  {
    slug: 'woss-hostel',
    name: 'Woss Hostel',
    location: '4 min walk · KWASU Gate',
    status: 'available',
    rating: 4.9,
    price: '₦180k',
    tags: ['Wi-Fi', 'Water', '24h light'],
  },
  {
    slug: 'la-marida-malete',
    name: 'La Marida Hotel',
    location: '9 min walk · Malete Town',
    status: 'available',
    rating: 4.7,
    price: '₦150k',
    tags: ['Wi-Fi', 'Water', 'Security'],
  },
  {
    slug: 'amina-villa',
    name: 'Amina Villa',
    location: '12 min walk · Malete Town',
    status: 'reserved',
    rating: 4.6,
    price: '₦95k',
    tags: ['Wi-Fi', 'Water', 'Female only'],
  },
  {
    slug: 'success-hostel',
    name: 'Success Hostel',
    location: '15 min walk · Malete Town',
    status: 'limited',
    rating: 4.5,
    price: '₦70k',
    tags: ['Water', '24h light', 'Budget'],
  },
  {
    slug: 'montresor-capitol',
    name: 'MonTresor Capitol Hostel',
    location: '11 min walk · Safari',
    status: 'available',
    rating: 4.8,
    price: '₦165k',
    tags: ['Wi-Fi', 'Water', 'Security'],
  },
  {
    slug: 'eniduro-villa',
    name: 'Eniduro Villa',
    location: '13 min walk · Malete Town',
    status: 'reserved',
    rating: 4.6,
    price: '₦110k',
    tags: ['Wi-Fi', 'Water', 'Male only'],
  },
];

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'available', label: 'Available' },
  { value: 'reserved', label: 'Reserved' },
  { value: 'limited', label: 'Limited' },
] as const;

const STATUS_MAP = {
  available: {
    label: 'Available',
    cls: 'bg-emerald-100 border-emerald-200 text-emerald-800',
  },
  reserved: {
    label: 'Reserved',
    cls: 'bg-amber-100 border-amber-200 text-amber-800',
  },
  limited: {
    label: 'Limited',
    cls: 'bg-violet-100 border-violet-200 text-violet-800',
  },
} as const;

const t = {
  pageText: 'text-[#111827]',
  breadcrumbMuted: 'text-slate-500',
  muted: 'text-slate-500',
  cardBg: '',
  cardBorder: 'border-slate-200',
  searchBg: '',
  pillActive: 'bg-slate-900 text-white border-slate-900',
  pillDefault: 'text-slate-700 border-slate-200',
  resultsText: 'text-slate-500',
  cardImgBg: '',
  tagBg: '',
  tagText: 'text-slate-600',
};

export default function Page() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<(typeof FILTERS)[number]['value']>('all');
  const [selected, setSelected] = useState<Hostel | null>(null);

  const visible = useMemo(
    () =>
      HOSTELS.filter((hostel) => {
        const matchesQuery =
          query.trim() === '' ||
          [hostel.name, hostel.location, hostel.tags.join(' ')]
            .join(' ')
            .toLowerCase()
            .includes(query.toLowerCase());

        const matchesFilter =
          active === 'all' ? true : hostel.status === active;

        return matchesQuery && matchesFilter;
      }),
    [active, query],
  );

  return (
    <main
      className={`min-h-screen ${t.pageText} transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center justify-between mb-8">
          <div>
           
          </div>

          <ThemeToggle />
        </div>

        <section className="mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-none font-mono text-gray-400nt">
            Find your
            <span className="block italic text-[#c6ff4a] font-bold font-Display">
              perfect hostel.
            </span>
          </h1>

          <p className={`mt-4 max-w-2xl text-sm md:text-base ${t.muted}`}>
            Browse available student hostels, compare prices, explore amenities and reserve your
            room before spaces fill up.
          </p>

          <div className="grid grid-cols-3 gap-3 mt-8 max-w-2xl">
            <div className={` ${t.cardBg} ${t.cardBorder} border rounded-2xl p-4`}>
              <p className={`text-xs ${t.muted}`}>Available</p>
              <h3 className="text-2xl font-semibold">
                {HOSTELS.filter((h) => h.status === 'available').length}
              </h3>
            </div>

            <div className={` ${t.cardBg} ${t.cardBorder} border rounded-2xl p-4`}>
              <p className={`text-xs ${t.muted}`}>Starting From</p>
              <h3 className="text-2xl font-semibold">₦70k</h3>
            </div>

            <div className={` ${t.cardBg} ${t.cardBorder} border rounded-2xl p-4`}>
              <p className={`text-xs ${t.muted}`}>Avg Rating</p>
              <h3 className="text-2xl font-semibold">4.6★</h3>
            </div>
          </div>
        </section>

        <div className={`flex items-center gap-3 border rounded-2xl px-4 h-12 mb-4 ${t.searchBg}`}>
          <i className="ti ti-search text-sm" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hostels..."
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 no-scrollbar">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActive(filter.value)}
              className={`whitespace-nowrap px-4 py-2 rounded-full border text-sm transition-all ${
                active === filter.value ? t.pillActive : t.pillDefault
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <p className={`text-sm ${t.resultsText}`}>
            Showing {visible.length} hostel{visible.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {visible.map((hostel) => (
            <button
              key={hostel.slug}
              type="button"
              onClick={() => setSelected(hostel)}
              className={`group overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${t.cardBg} ${t.cardBorder}`}
            >
              <div className={`h-47.5 ${t.cardImgBg} relative flex items-center justify-center`}>
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full border text-xs font-medium ${STATUS_MAP[hostel.status].cls}`}
                >
                  {STATUS_MAP[hostel.status].label}
                </span>
                <svg width="90" height="90" viewBox="0 0 60 60">
                  <rect x="5" y="20" width="50" height="34" rx="3" fill="#d6d2c8" />
                  <polygon points="30,5 3,22 57,22" fill="#c4c0b8" />
                </svg>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{hostel.name}</h3>
                    <p className={`text-sm ${t.muted} mt-1`}>{hostel.location}</p>
                  </div>
                  <div className="text-lime-deep text-sm">★ {hostel.rating}</div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-semibold font-['DM_Mono']">{hostel.price}</p>
                  <span className={`text-xs ${t.muted}`}>per session</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {hostel.tags.map((tag) => (
                    <span key={tag} className={`text-xs px-3 py-1 rounded-full border ${t.tagBg} ${t.tagText}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        <section className={`mt-16 rounded-3xl p-8 text-center ${t.cardBg} ${t.cardBorder} border`}>
          <h2 className="text-2xl font-semibold">Need help choosing a hostel?</h2>
          <p className={`mt-2 ${t.muted}`}>
            Compare prices, amenities and locations to find the accommodation that suits your budget.
          </p>
          <button type="button" className="mt-5 px-6 py-3 rounded-full bg-[#c8f135] text-[#4a5800] font-medium">
            View Available Rooms
          </button>
        </section>
      </div>

      {selected && <HostelDrawer hostel={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}

function HostelDrawer({ hostel, onClose }: { hostel: Hostel; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-4 sm:items-center">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <p className="text-xs text-slate-500">Hostel details</p>
            <h2 className="text-xl font-semibold">{hostel.name}</h2>
          </div>
          <button type="button" onClick={onClose} className="text-slate-600 hover:text-slate-900">
            Close
          </button>
        </div>
        <div className="space-y-4 p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-slate-500">Location</p>
              <p className="font-medium">{hostel.location}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Status</p>
              <p className="font-medium">{STATUS_MAP[hostel.status].label}</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-slate-500">Price</p>
              <p className="font-medium">{hostel.price}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Rating</p>
              <p className="font-medium">★ {hostel.rating}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-500">Amenities</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {hostel.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
