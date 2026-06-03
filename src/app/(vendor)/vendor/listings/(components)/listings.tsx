'use client';
import { useState, useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Listing } from '@/modules/vendor/types';
import { mockCategories, mockListings } from '@/mock/listings';
import { ListingStatsBar } from './listings-stats-bar';
import { ListingFilters } from './listings-filters';
import { ListingBulkBar } from './listings-bulk-bar';
import { ListingGridCard } from './listings-grid-card';
import { ListingListView } from './listings-view';
import {
  AddListingModal,
  ArchiveModal,
  BulkDeleteModal,
  DeleteModal,
  EditModal,
} from './listings-modal';

type ModalState =
  | { type: 'none' }
  | { type: 'add' }
  | { type: 'edit'; listing: Listing }
  | { type: 'delete'; listing: Listing }
  | { type: 'bulk-delete' }
  | { type: 'archive' };

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>(mockListings);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All Status');
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [modal, setModal] = useState<ModalState>({ type: 'none' });

  // ── filtering ────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return listings.filter((l) => {
      const matchCat = category === 'All' || l.category === category;
      const matchStatus = status === 'All Status' || l.status === status;
      const matchSearch = l.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchStatus && matchSearch;
    });
  }, [listings, category, status, search]);

  // ── selection ────────────────────────────────────────────────
  const toggleSelect = (id: string) =>
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const clearSelection = () => setSelectedIds(new Set());

  // ── CRUD ─────────────────────────────────────────────────────
  const handleAdd = (listing: Listing) => {
    setListings((prev) => [listing, ...prev]);
    setModal({ type: 'none' });
  };

  const handleEdit = (updated: Listing) => {
    setListings((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    setModal({ type: 'none' });
  };

  const handleDelete = (listing: Listing) => {
    setListings((prev) => prev.filter((l) => l.id !== listing.id));
    setModal({ type: 'none' });
  };

  const handleDuplicate = (listing: Listing) => {
    const dupe: Listing = {
      ...listing,
      id: `lst-${Date.now()}`,
      name: `${listing.name} (copy)`,
      sold: 0,
    };
    setListings((prev) => [dupe, ...prev]);
  };

  const handleBulkDelete = () => {
    setListings((prev) => prev.filter((l) => !selectedIds.has(l.id)));
    clearSelection();
    setModal({ type: 'none' });
  };

  const handleArchive = () => {
    // In production: PATCH status to 'archived' via API
    setListings((prev) => prev.map((l) => (selectedIds.has(l.id) ? { ...l, status: 'Draft' } : l)));
    clearSelection();
    setModal({ type: 'none' });
  };

  return (
    <section className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-ink text-2xl font-bold">Listings</h1>
          <p className="text-muted text-sm">
            {listings.length} products · {listings.filter((l) => l.status === 'Active').length}{' '}
            active
          </p>
        </div>
        <Button
          variant="primary"
          className="hover:bg-accent-fg bg-lime-500 text-white"
          onClick={() => setModal({ type: 'add' })}
        >
          <Plus className="size-4" /> Add New Listing
        </Button>
      </div>

      {/* Stats */}
      <ListingStatsBar listings={listings} />

      {/* Filters */}
      <ListingFilters
        categories={mockCategories}
        selectedCategory={category}
        onCategoryChange={setCategory}
        selectedStatus={status}
        onStatusChange={setStatus}
        searchValue={search}
        onSearchChange={setSearch}
        view={view}
        onViewChange={(v) => {
          setView(v);
          clearSelection();
        }}
      />

      {/* Bulk bar */}
      <ListingBulkBar
        count={selectedIds.size}
        onEdit={() => {
          const first = listings.find((l) => selectedIds.has(l.id));
          if (first) setModal({ type: 'edit', listing: first });
        }}
        onArchive={() => setModal({ type: 'archive' })}
        onDelete={() => setModal({ type: 'bulk-delete' })}
        onClear={clearSelection}
      />

      {/* Content */}
      {view === 'grid' ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((listing) => (
            <ListingGridCard
              key={listing.id}
              listing={listing}
              selected={selectedIds.has(listing.id)}
              onToggleSelect={toggleSelect}
              onEdit={(l) => setModal({ type: 'edit', listing: l })}
              onPromote={() => {}}
              onMore={() => {}}
            />
          ))}
          {filtered.length === 0 && (
            <p className="text-muted col-span-full py-16 text-center text-sm">
              No listings match your filters.
            </p>
          )}
        </div>
      ) : (
        <ListingListView
          listings={filtered}
          onEdit={(l) => setModal({ type: 'edit', listing: l })}
          onDuplicate={handleDuplicate}
          onDelete={(l) => setModal({ type: 'delete', listing: l })}
        />
      )}

      {/* Modals */}
      {modal.type === 'add' && (
        <AddListingModal onAdd={handleAdd} onClose={() => setModal({ type: 'none' })} />
      )}
      {modal.type === 'edit' && (
        <EditModal
          listing={modal.listing}
          onSave={handleEdit}
          onClose={() => setModal({ type: 'none' })}
        />
      )}
      {modal.type === 'delete' && (
        <DeleteModal
          listing={modal.listing}
          onConfirm={() => handleDelete(modal.listing)}
          onClose={() => setModal({ type: 'none' })}
        />
      )}
      {modal.type === 'bulk-delete' && (
        <BulkDeleteModal
          count={selectedIds.size}
          onConfirm={handleBulkDelete}
          onClose={() => setModal({ type: 'none' })}
        />
      )}
      {modal.type === 'archive' && (
        <ArchiveModal
          count={selectedIds.size}
          onConfirm={handleArchive}
          onClose={() => setModal({ type: 'none' })}
        />
      )}
    </section>
  );
}
