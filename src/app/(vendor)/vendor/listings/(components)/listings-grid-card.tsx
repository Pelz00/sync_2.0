'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Pencil, Megaphone, MoreHorizontal } from 'lucide-react';
import { Listing } from '@/modules/vendor/types';

interface ListingGridCardProps {
  listing: Listing;
  selected: boolean;
  onToggleSelect: (id: string) => void;
  onEdit: (listing: Listing) => void;
  onPromote: (listing: Listing) => void;
  onMore: (listing: Listing) => void;
}

const statusStyle: Record<Listing['status'], string> = {
  Active: 'bg-green-500 text-white',
  Draft: 'bg-ink/60 text-white',
  'Out of Stock': 'bg-red-500 text-white',
};

export function ListingGridCard({
  listing,
  selected,
  onToggleSelect,
  onEdit,
  onPromote,
  onMore,
}: ListingGridCardProps) {
  return (
    <div
      className={cn(
        'bg-panel shadow-card group relative flex flex-col overflow-hidden rounded-xl transition-all duration-200',
        selected && 'ring-2 ring-violet-600',
      )}
    >
      {/* Image area */}
      <div
        className="relative h-44 cursor-pointer overflow-hidden bg-[#f0ece4]"
        onClick={() => onToggleSelect(listing.id)}
      >
        {listing.imageUrl ? (
          <Image
            src={listing.imageUrl}
            alt={listing.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <svg
            className="absolute inset-0 h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="#c5bfb5" strokeWidth="1.5" />
            <line x1="100%" y1="0" x2="0" y2="100%" stroke="#c5bfb5" strokeWidth="1.5" />
          </svg>
        )}

        {/* Checkbox */}
        <div
          className={cn(
            'absolute top-3 left-3 flex size-5 items-center justify-center rounded border-2 bg-white transition-all',
            selected ? 'border-violet-600' : 'border-white/70',
          )}
        >
          {selected && <div className="size-2.5 rounded-sm bg-violet-600" />}
        </div>

        {/* Status badge */}
        <span
          className={cn(
            'absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-xs font-semibold',
            statusStyle[listing.status],
          )}
        >
          {listing.status}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 px-4 pt-3 pb-2">
        <p className="text-ink font-display font-semibold">{listing.name}</p>
        <p className="text-muted text-xs">{listing.category}</p>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-ink text-base font-bold">₦{listing.price.toLocaleString()}</p>
          <p className="text-muted text-xs">{listing.sold} sold</p>
        </div>
        <p className="text-muted text-xs">
          {listing.stock === 0 ? (
            <span className="text-red-500">Out of stock</span>
          ) : (
            `${listing.stock} in stock`
          )}
        </p>
      </div>

      {/* Actions */}
      <div className="border-line/5 flex items-center gap-2 border-t px-4 py-2.5">
        <button
          onClick={() => onEdit(listing)}
          className="text-muted hover:text-ink flex items-center gap-1.5 text-xs transition-colors"
        >
          <Pencil className="size-3.5" /> Edit
        </button>
        <button
          onClick={() => onPromote(listing)}
          className="text-muted hover:text-ink flex items-center gap-1.5 text-xs transition-colors"
        >
          <Megaphone className="size-3.5" /> Promote
        </button>
        <button
          onClick={() => onMore(listing)}
          className="text-muted hover:text-ink ml-auto transition-colors"
        >
          <MoreHorizontal className="size-4" />
        </button>
      </div>
    </div>
  );
}
