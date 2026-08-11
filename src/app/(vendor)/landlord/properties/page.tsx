'use client';

import Link from 'next/link';
import { useState } from 'react';
import { LayoutGrid, List, Plus, Search, Building2 } from 'lucide-react';
import { Button, Input, Tabs, TabsList, TabsTrigger, Chip } from '@/components/ui';
import { PageHeader } from '../(components)/shared/page-header';
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
      <PageHeader
        title="My Properties"
        description="Manage your listings, availability and approval status."
      >
        <Button asChild>
          <Link href="/landlord/properties/new">
            <Plus className="size-4" />
            Add New Property
          </Link>
        </Button>
      </PageHeader>

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
        <div
          className={cn(
            view === 'grid'
              ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
              : 'flex flex-col gap-3',
          )}
        >
          {filtered.map((p) => (
            <PropertyListCard key={p.id} property={p} onDelete={remove} />
          ))}
        </div>
      )}
    </div>
  );
}
