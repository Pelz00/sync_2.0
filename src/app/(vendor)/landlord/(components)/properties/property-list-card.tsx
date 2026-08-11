'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, BedDouble, Bath, Star, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui';
import { Card, CardContent, CardFooter, CardTitle, CardDescription, Button } from '@/components/ui';
import { StatusBadge } from '../shared/status-badge';
import { formatNaira, type Property } from '@/lib/landlord-data';

export function PropertyListCard({ property, onDelete }: { property: Property; onDelete: (id: string) => void }) {
  return (
    <Card className="border-line group w-full border bg-transparent transition-shadow duration-300 hover:shadow-lg">
      <div className="border-line/30 mx-4 mt-4 overflow-hidden rounded-lg border border-dashed">
        {property.imageUrl ? (
          <Image
            src={property.imageUrl}
            alt={property.name}
            width={400}
            height={400}
            className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="bg-surface-deep relative h-40 w-full" />
        )}
      </div>

      <CardContent className="pt-4">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{property.name}</CardTitle>
          <StatusBadge status={property.status ?? 'Active'} />
        </div>
        {property.address ? (
          <p className="text-content-muted mt-1 flex items-center gap-1 truncate text-xs">
            <MapPin className="size-3 shrink-0" />
            {property.address}
          </p>
        ) : null}
        <CardDescription className="mt-1">
          {property.roomsBooked}/{property.roomsTotal} rooms booked
        </CardDescription>

        <div className="text-content-muted mt-3 flex flex-wrap items-center gap-3 text-xs">
          {property.beds ? (
            <span className="flex items-center gap-1">
              <BedDouble className="size-3.5" />
              {property.beds}
            </span>
          ) : null}
          {property.baths ? (
            <span className="flex items-center gap-1">
              <Bath className="size-3.5" />
              {property.baths}
            </span>
          ) : null}
          {property.availability ? <StatusBadge status={property.availability} /> : null}
          {property.rating ? (
            <span className="flex items-center gap-1">
              <Star className="fill-lime-deep text-lime-deep size-3.5" />
              {property.rating}
            </span>
          ) : null}
        </div>

        {property.price ? (
          <p className="mt-3 text-sm">
            <span className="font-display font-semibold">{formatNaira(property.price)}</span>
            <span className="text-content-muted"> {property.term ?? 'per session'}</span>
          </p>
        ) : null}
      </CardContent>

      <CardFooter className="border-t-0 pt-0">
        <Button variant="outline" size="sm" className="rounded-full" asChild>
          <Link href={`/landlord/properties/${property.id}/edit`}>Edit</Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={() => {
            onDelete(property.id);
            toast.success(`"${property.name}" removed`);
          }}
        >
          <Trash2 className="size-3.5" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
