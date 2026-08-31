'use client';

import Image from 'next/image';
import { Bath, BedDouble, Building2, MapPin, Star } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui';
import { formatNaira, type Property } from '@/lib/landlord-data';
import { StatusBadge } from '../shared/status-badge';

export function PropertyDetailsSheet({
  property,
  open,
  onOpenChange,
}: {
  property: Property;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const images = Array.from(
    new Set([property.imageUrl, ...(property.imageUrls ?? [])].filter(Boolean)),
  ) as string[];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-6 overflow-y-auto sm:max-w-xl">
        <SheetHeader className="pr-8">
          <div className="flex items-center gap-2">
            <StatusBadge status={property.status ?? 'Active'} />
            {property.availability ? <StatusBadge status={property.availability} /> : null}
          </div>
          <SheetTitle>{property.name}</SheetTitle>
          <SheetDescription className="flex items-start gap-1.5">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            {property.address ?? 'Address not added'}
          </SheetDescription>
        </SheetHeader>

        {images.length ? (
          <div className="grid grid-cols-2 gap-3">
            {images.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="relative aspect-[4/3] overflow-hidden rounded-xl first:col-span-2 first:aspect-video"
              >
                <Image
                  src={image}
                  alt={`${property.name} photo ${index + 1}`}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, 480px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-3">
          <Detail
            label="Price"
            value={`${formatNaira(property.price ?? 0)} ${property.term ?? 'per session'}`}
          />
          <Detail label="Room type" value={property.roomType ?? 'Not specified'} />
          <Detail label="Rooms" value={`${property.roomsBooked}/${property.roomsTotal} booked`} />
          <Detail
            label="Rating"
            value={property.rating ? `${property.rating.toFixed(1)} / 5` : 'Not rated'}
          />
        </div>

        <div className="border-line/10 grid grid-cols-2 gap-3 border-y py-5 text-sm">
          <span className="flex items-center gap-2">
            <BedDouble className="text-content-muted size-4" /> {property.beds ?? 0} beds
          </span>
          <span className="flex items-center gap-2">
            <Bath className="text-content-muted size-4" /> {property.baths ?? 0} baths
          </span>
          <span className="flex items-center gap-2">
            <Building2 className="text-content-muted size-4" /> {property.roomsTotal} rooms total
          </span>
          <span className="flex items-center gap-2">
            <Star className="text-lime-deep size-4 fill-current" />{' '}
            {property.rating?.toFixed(1) ?? 'No rating'}
          </span>
        </div>

        {property.description ? <Detail label="Description" value={property.description} /> : null}
        {property.amenities?.length ? (
          <Detail label="Amenities" value={property.amenities.join(' · ')} />
        ) : null}
        {property.houseRules ? <Detail label="House rules" value={property.houseRules} /> : null}
      </SheetContent>
    </Sheet>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-content-muted text-xs">{label}</p>
      <p className="mt-1 text-sm leading-6 font-medium">{value}</p>
    </div>
  );
}
