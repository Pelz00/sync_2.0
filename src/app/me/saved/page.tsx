/**
 * ROUTE: /me/saved
 * ACCESS: authenticated student
 * PURPOSE: Saved listings across all modules.
 * BUILT HERE: <ListingCard> grid filtered to current user's saves, <EmptyState> on empty.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';
import { ListingCard, EmptyState } from '@/components/shared'; 
import type { ListingCardData } from '@/components/shared/listing-card'; 

export const metadata: Metadata = { title: 'Saved' };

export default function SavedPage() {
  // 1. Change this to an empty array [] to test the EmptyState UI visually!
  const savedItems: ListingCardData[] = []; 

  return (
    <section className="flex flex-col gap-3">
      {/* Eyebrow Path */}
      <h1 className="font-mono text-sm tracking-wide text-content-muted">
        /ME/SAVED
      </h1>

      {/* Header Block */}
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display mt-2 text-3xl font-medium text-content">
          Saved <span className="text-lime-deep">Places & Events</span>
        </h2>
      </div>

      <section className="mt-5">
        {savedItems.length === 0 ? (
          /* 2. Official shared EmptyState component applied */
          <EmptyState 
            title="No saved items yet"
            description="Explore available hostels, food hubs, and events around campus to save them to your dashboard."
          />
        ) : (
          /* 3. Cards grid renders when rows exist */
          <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-mono text-sm uppercase tracking-wide text-content-muted">
                Total Items . {savedItems.length}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {savedItems.map((item, index) => (
                <ListingCard key={index} {...item} />
              ))}
            </div>
          </>
        )}
      </section>
    </section>
  );
}