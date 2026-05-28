/**
 * ListingCard - the single most-reused composite in Sync. Deliberately one
 * card shape across hostels / food vendors / beauty pros / tradespeople /
 * laundry / hotspots. Modules pass their own data; the card stays consistent
 * so students get the same scanning rhythm everywhere.
 *
 * The whole card is a single link to the listing detail. The save button is
 * a separate <form action> with a server action; it stops propagation so a
 * click on the heart never navigates.
 */
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MapPin } from 'lucide-react';
import { VerifiedBadge } from './verified-badge';
import { RatingStars } from './rating-stars';
import { PriceTag } from './price-tag';
import { cn } from '@/lib/utils';

export interface ListingCardData {
  href: string;
  title: string;
  /** Short location string e.g. "Malete, off-campus". */
  location?: string;
  /** Hero image URL. Use a square 1:1 image; the card crops to 4:3 for grid. */
  image?: string;
  /** Optional price; pass `null` for listings without a public price (e.g. quotes). */
  price?: { amount: number; unit?: string } | null;
  rating?: { value: number; count: number };
  verified?: boolean;
  /** Top-left ribbon e.g. "New", "Limited", "Popular". */
  ribbon?: string;
  /** Optional small chip row under the location (Wi-Fi · Water · 24h light). */
  amenities?: string[];
  /** Has the current user saved this listing? */
  saved?: boolean;
  /** Optional save action - if omitted the heart button is hidden. */
  saveAction?: (formData: FormData) => void;
}

export function ListingCard({
  href,
  title,
  location,
  image,
  price,
  rating,
  verified,
  ribbon,
  amenities,
  saved,
  saveAction,
  className,
}: ListingCardData & { className?: string }) {
  return (
    <article
      className={cn(
        'group bg-white shadow-card relative flex flex-col overflow-hidden rounded-xl transition-shadow hover:shadow-pop',
        className,
      )}
    >
      <Link href={href} className="flex flex-1 flex-col">
        <div className="bg-cream-deep relative aspect-[4/3] w-full overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div aria-hidden="true" className="h-full w-full" />
          )}
          {ribbon && (
            <span className="bg-ink text-cream font-mono absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider">
              {ribbon}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-card text-ink line-clamp-2 leading-tight">{title}</h3>
            {verified && <VerifiedBadge />}
          </div>
          {location && (
            <p className="text-muted flex items-center gap-1 text-xs">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {location}
            </p>
          )}
          {amenities && amenities.length > 0 && (
            <ul className="text-muted flex flex-wrap items-center gap-1 text-[11px]">
              {amenities.map((a, i) => (
                <li key={a} className="flex items-center gap-1">
                  <span className="border-ink/15 rounded-full border px-2 py-0.5">{a}</span>
                  {i < amenities.length - 1 && <span aria-hidden="true" className="sr-only">·</span>}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-auto flex items-end justify-between pt-2">
            {price !== null && price !== undefined && (
              <PriceTag amount={price.amount} unit={price.unit} />
            )}
            {rating && <RatingStars value={rating.value} count={rating.count} />}
          </div>
        </div>
      </Link>
      {saveAction && (
        <form action={saveAction} className="absolute right-3 top-3">
          <button
            type="submit"
            aria-label={saved ? 'Remove from saved' : 'Save listing'}
            aria-pressed={saved}
            className={cn(
              'bg-white/90 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition-colors',
              'hover:bg-white',
            )}
          >
            <Heart
              className={cn('h-4 w-4', saved ? 'fill-coral text-coral' : 'text-ink')}
              strokeWidth={2}
            />
          </button>
        </form>
      )}
    </article>
  );
}
