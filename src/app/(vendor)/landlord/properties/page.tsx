'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  BedDouble,
  Building2,
  LayoutGrid,
  List,
  Plus,
  Search,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { Button, Input, Tabs, TabsList, TabsTrigger, Chip } from '@/components/ui';
import { PropertyListCard } from '../(components)/properties/property-list-card';
import { useLandlordProperties } from '@/hooks/use-landlord-properties';
import { cn } from '@/lib/utils';
import { getMergedProperties, useLandlordMockStore } from '@/store/landlord-mock-store';

type Filter = 'all' | 'Active' | 'Inactive';

export default function PropertiesPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const { properties, hydrated, remove } = useLandlordProperties();
  const propertyOverrides = useLandlordMockStore((state) => state.propertyOverrides);
  const tenants = useLandlordMockStore((state) => state.tenants);
  const mockDataHydrated = useLandlordMockStore((state) => state.hasHydrated);
  const mergedProperties = getMergedProperties(propertyOverrides, tenants, properties);

  const filtered = mergedProperties.filter((p) => {
    const matchesFilter = filter === 'all' || p.status === filter;
    const matchesQuery =
      query === '' ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      (p.address ?? '').toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="flex flex-col gap-5">
      <div className='flex justify-end'>
        <Button asChild className='w-fit'>
          <Link href="/landlord/properties/new">
            <Plus className="size-4" />
            Add New Property
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Active">Active</TabsTrigger>
            <TabsTrigger value="Inactive">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="text-content-muted pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              placeholder="Search properties…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Chip selected={view === 'grid'} onClick={() => setView('grid')} aria-label="Grid view">
            <LayoutGrid className="size-4" />
          </Chip>
          <Chip selected={view === 'list'} onClick={() => setView('list')} aria-label="List view">
            <List className="size-4" />
          </Chip>
        </div>
      </div>

      {!hydrated || !mockDataHydrated ? null : filtered.length === 0 ? (
        <div className="border-line/15 flex flex-col items-center gap-3 rounded-xl border border-dashed py-16 text-center">
          <Building2 className="text-content-muted size-8" />
          <p className="font-display font-medium">No properties found</p>
          <p className="text-content-muted max-w-xs text-sm">
            {query || filter !== 'all'
              ? 'Try adjusting your search or filters.'
              : 'Add your first listing to start receiving student bookings.'}
          </p>
          <Button asChild className="mt-2">
            <Link href="/landlord/properties/new">
              <Plus className="size-4" />
              Add New Property
            </Link>
          </Button>
        </div>
      ) : (
        <>
          {view === 'list' ? (
            <div className="border-line/10 bg-panel overflow-hidden rounded-2xl border shadow-sm">
              <div className="text-content-muted bg-surface-deep/70 hidden grid-cols-[minmax(250px,2fr)_minmax(125px,.85fr)_minmax(90px,.6fr)_minmax(95px,.6fr)_minmax(110px,.7fr)_minmax(125px,.8fr)_minmax(75px,.45fr)_minmax(110px,.75fr)] gap-4 px-4 py-4 text-xs font-semibold tracking-wide lg:grid">
                <span>PROPERTY</span>
                <span>LOCATION</span>
                <span>ROOMS</span>
                <span>STATUS</span>
                <span>OCCUPANCY</span>
                <span>PRICE / SESSION</span>
                <span>RATING</span>
                <span>ACTIONS</span>
              </div>
              {filtered.map((p) => (
                <PropertyListCard key={p.id} property={p} view="list" onDelete={remove} />
              ))}
              <p className="text-content-muted px-4 py-4 text-sm">
                Showing {filtered.length} of {mergedProperties.length} properties
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <PropertyListCard key={p.id} property={p} view="grid" onDelete={remove} />
              ))}
            </div>
          )}

          <div className="border-line/10 bg-panel grid gap-4 rounded-2xl border p-5 shadow-sm sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: 'Total properties',
                value: mergedProperties.length,
                detail: `${mergedProperties.filter((p) => p.status === 'Active').length} active`,
                icon: Building2,
                tone: 'bg-lime/10 text-lime-deep',
              },
              {
                label: 'Total rooms',
                value: mergedProperties.reduce((total, p) => total + p.roomsTotal, 0),
                detail: `${mergedProperties.reduce((total, p) => total + p.roomsBooked, 0)} occupied`,
                icon: BedDouble,
                tone: 'bg-violet-500/10 text-violet-600',
              },
              {
                label: 'Average price / session',
                value: formatCurrency(
                  mergedProperties.reduce((total, p) => total + (p.price ?? 0), 0) /
                    mergedProperties.length,
                ),
                detail: 'Across all properties',
                icon: Wallet,
                tone: 'bg-amber-500/10 text-amber-600',
              },
              {
                label: 'Booked value',
                value: formatCurrency(
                  mergedProperties.reduce((total, p) => total + (p.price ?? 0) * p.roomsBooked, 0),
                ),
                detail: 'Current occupied rooms',
                icon: TrendingUp,
                tone: 'bg-blue-500/10 text-blue-600',
              },
            ].map(({ label, value, detail, icon: Icon, tone }) => (
              <div
                key={label}
                className="sm:border-line/10 flex items-center gap-3 sm:border-r sm:pr-4 sm:last:border-r-0"
              >
                <span className={cn('grid size-11 shrink-0 place-items-center rounded-xl', tone)}>
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-content-muted text-xs">{label}</p>
                  <p className="font-display text-xl font-semibold">{value}</p>
                  <p className="text-content-muted text-xs">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value || 0);
}
