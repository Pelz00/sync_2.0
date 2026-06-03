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
    cls: 'bg-emerald-100 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300',
  },
  reserved: {
    label: 'Reserved',
    cls: 'bg-amber-100 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300',
  },
  limited: {
    label: 'Limited',
    cls: 'bg-violet-100 dark:bg-violet-950/40 border-violet-200 dark:border-violet-800 text-violet-800 dark:text-violet-300',
  },
} as const;

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
    <main className="min-h-screen text-slate-900 dark:text-slate-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-lime-500 animate-pulse" />
            <span className="text-xs font-mono tracking-widest uppercase opacity-60">KWASU Accommodation</span>
          </div>
          <ThemeToggle />
        </div>

        {/* Hero Section */}
        <section className="mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-slate-900 dark:text-white leading-tight">
            Find your{' '}
            <span className="block md:inline italic text-lime-600 dark:text-lime-400 font-serif font-normal">
              perfect hostel.
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm md:text-base text-slate-500 dark:text-slate-400">
            Browse available student hostels, compare prices, explore amenities and reserve your
            room before spaces fill up.
          </p>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 mt-8 max-w-2xl">
            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition-all duration-300 hover:shadow-md">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Available</p>
              <h3 className="text-2xl font-bold mt-1 text-slate-800 dark:text-slate-200">
                {HOSTELS.filter((h) => h.status === 'available').length}
              </h3>
            </div>

            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition-all duration-300 hover:shadow-md">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Starting From</p>
              <h3 className="text-2xl font-bold mt-1 text-slate-800 dark:text-slate-200">₦70k</h3>
            </div>

            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition-all duration-300 hover:shadow-md">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Avg Rating</p>
              <h3 className="text-2xl font-bold mt-1 text-slate-800 dark:text-slate-200">4.6★</h3>
            </div>
          </div>
        </section>

        {/* Search Input */}
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus-within:border-lime-500 focus-within:ring-2 focus-within:ring-lime-500/20 rounded-2xl px-4 h-12 mb-4 transition-all duration-200 shadow-sm">
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hostels by name, area, features..."
            className="flex-1 bg-transparent outline-none text-sm placeholder-slate-400 dark:placeholder-slate-500 text-slate-800 dark:text-slate-100"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 no-scrollbar scroll-smooth">
          {FILTERS.map((filter) => {
            const isSelected = active === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActive(filter.value)}
                className={`whitespace-nowrap px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200 transform active:scale-95 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800 dark:hover:bg-slate-800'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Item Counter */}
        <div className="mb-4 animate-fade-in">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Showing {visible.length} hostel{visible.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Hostels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {visible.map((hostel) => (
            <button
              key={hostel.slug}
              type="button"
              onClick={() => setSelected(hostel)}
              className="group text-left overflow-hidden rounded-3xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800/80 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-lime-500/40"
            >
              {/* Dynamic Animated Placeholder / Image section */}
              <div className="h-44 w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900/40 relative flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-slate-800">
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full border text-xs font-semibold backdrop-blur-sm z-10 shadow-sm transition-transform duration-300 group-hover:scale-105 ${STATUS_MAP[hostel.status].cls}`}>
                  {STATUS_MAP[hostel.status].label}
                </span>
                
                {/* Visual architectural house shape abstraction */}
                <svg className="w-16 h-16 text-slate-300 dark:text-slate-700 group-hover:scale-110 group-hover:text-lime-500/50 dark:group-hover:text-lime-400/30 transition-all duration-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9.3V4h-3v2.6L12 3 2 12h3v8h5v-6h4v6h5v-8h3L19 9.3zM10 10c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z"/>
                </svg>
              </div>

              {/* Content Box */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors duration-200">
                        {hostel.name}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {hostel.location}
                      </p>
                    </div>
                    <div className="bg-lime-50 dark:bg-lime-950/30 text-lime-700 dark:text-lime-400 font-bold text-xs px-2 py-1 rounded-lg flex items-center gap-0.5 whitespace-nowrap">
                      ★ {hostel.rating}
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">{hostel.price}</p>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">per session</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-5">
                  {hostel.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60 dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-700/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Help Banner Section */}
        <section className="mt-16 rounded-3xl p-8 text-center bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 relative overflow-hidden group shadow-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400/10 dark:bg-lime-400/5 rounded-full blur-2xl -mr-10 -mt-10" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Need help choosing a hostel?</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Compare prices, amenities and locations to find the accommodation that perfectly suits your budget.
          </p>
          <button type="button" className="mt-6 px-6 py-3 rounded-full bg-lime-500 hover:bg-lime-600 text-slate-950 font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0">
            View Available Rooms
          </button>
        </section>
      </div>

      {/* Detail Drawer Modal */}
      {selected && <HostelDrawer hostel={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}

function HostelDrawer({ hostel, onClose }: { hostel: Hostel; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 backdrop-blur-sm p-4 sm:items-center animate-fade-in transition-all">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-100 dark:border-slate-800 transform transition-all duration-300 scale-100 animate-slide-up">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-6 py-5">
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Hostel details</p>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">{hostel.name}</h2>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Drawer Content */}
        <div className="space-y-5 p-6">
          <div className="grid gap-4 grid-cols-2">
            <div className="bg-slate-50 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60">
              <p className="text-xs font-semibold text-slate-400">Location</p>
              <p className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-1">{hostel.location}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60">
              <p className="text-xs font-semibold text-slate-400">Status</p>
              <p className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-1">{STATUS_MAP[hostel.status].label}</p>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-2">
            <div className="bg-slate-50 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60">
              <p className="text-xs font-semibold text-slate-400">Price</p>
              <p className="font-black text-lg text-slate-900 dark:text-white mt-0.5 font-mono">{hostel.price}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60">
              <p className="text-xs font-semibold text-slate-400">Rating</p>
              <p className="font-bold text-sm text-lime-600 dark:text-lime-400 mt-1">★ {hostel.rating}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2">Included Amenities</p>
            <div className="flex flex-wrap gap-2">
              {hostel.tags.map((tag) => (
                <span key={tag} className="rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-200/40 dark:border-slate-700/40">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button type="button" className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-950 font-bold transition-all shadow-md active:scale-[0.99]">
              Proceed to Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}