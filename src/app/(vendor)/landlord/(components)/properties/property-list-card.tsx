'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  Bath,
  BedDouble,
  Eye,
  MapPin,
  Pencil,
  Star,
  Trash2,
  TrendingUp,
} from 'lucide-react';
import { Button, Card, CardContent, toast } from '@/components/ui';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { formatNaira, type Property } from '@/lib/landlord-data';
import { cn } from '@/lib/utils';
import { StatusBadge } from '../shared/status-badge';
import { PropertyDetailsSheet } from './property-details-sheet';

type PropertyListCardProps = {
  property: Property;
  view: 'grid' | 'list';
  onDelete: (id: string) => void;
};

function PropertyImage({ property, className }: { property: Property; className?: string }) {
  return (
    <div className={cn('bg-surface-deep relative overflow-hidden', className)}>
      {property.imageUrl ? (
        <Image
          src={property.imageUrl}
          alt={property.name}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover"
        />
      ) : null}
    </div>
  );
}

function PropertyActions({
  property,
  onDelete,
  compact = false,
}: Omit<PropertyListCardProps, 'view'> & { compact?: boolean }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  function deleteProperty() {
    onDelete(property.id);
    setConfirmOpen(false);
    toast.success(`“${property.name}” removed`);
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="flex-1 sm:flex-none" asChild>
          <Link href={`/landlord/properties/${property.id}/edit`}>
            <Pencil className="size-3.5" />
            Edit
          </Link>
        </Button>
        {!compact ? (
          <Button
            variant="outline"
            size="sm"
            className="border-coral/25 text-coral hover:bg-coral/10 hover:text-coral flex-1 sm:flex-none"
            onClick={() => setConfirmOpen(true)}
          >
            <Trash2 className="size-3.5" />
            Delete
          </Button>
        ) : null}
        <Button
          variant="outline"
          size="sm"
          className="border-lime-deep/25 text-lime-deep hover:bg-lime/10 hover:text-lime-deep flex-1 sm:flex-none"
          aria-label={`View ${property.name}`}
          onClick={() => setDetailsOpen(true)}
        >
          <Eye className="size-3.5" />
          View
        </Button>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete this property?"
        description={`This removes ${property.name} from your landlord listings. This cannot be undone.`}
        confirmLabel="Delete property"
        destructive
        onConfirm={deleteProperty}
      />
      <PropertyDetailsSheet property={property} open={detailsOpen} onOpenChange={setDetailsOpen} />
    </>
  );
}

function PropertyMeta({ property }: { property: Property }) {
  return (
    <div className="text-content-muted flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
      <span className="flex items-center gap-1.5">
        <BedDouble className="size-4" />
        {property.beds ?? 0}
      </span>
      <span className="flex items-center gap-1.5">
        <Bath className="size-4" />
        {property.baths ?? 0}
      </span>
      {property.availability ? <StatusBadge status={property.availability} /> : null}
      {property.rating ? (
        <span className="text-content flex items-center gap-1 font-medium">
          <Star className="fill-lime-deep text-lime-deep size-4" />
          {property.rating.toFixed(1)}
        </span>
      ) : null}
    </div>
  );
}

function GridPropertyCard({ property, onDelete }: Omit<PropertyListCardProps, 'view'>) {
  const isReview = property.availability === 'review';

  return (
    <Card className="border-line/10 group overflow-hidden border py-0 transition-shadow hover:shadow-lg">
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="relative">
          <PropertyImage property={property} className="h-52 rounded-xl" />
          <StatusBadge status={property.status ?? 'Active'} className="absolute top-3 right-3" />
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <h2 className="font-display text-lg font-semibold">{property.name}</h2>
            {property.address ? (
              <p className="text-content-muted mt-1 flex items-center gap-1.5 text-sm">
                <MapPin className="size-4 shrink-0" />
                <span className="truncate">{property.address}</span>
              </p>
            ) : null}
          </div>
          <p className="text-content-muted text-sm">
            {property.roomsBooked}/{property.roomsTotal} rooms booked
          </p>
          <PropertyMeta property={property} />
        </div>

        <div
          className={cn(
            'flex items-center justify-between rounded-xl px-3.5 py-3',
            isReview ? 'bg-coral/10' : 'bg-lime/10',
          )}
        >
          <p className="font-display text-lg font-semibold">
            {formatNaira(property.price ?? 0)}
            <span className="text-content-muted ml-2 font-sans text-sm font-normal">
              {property.term ?? 'per session'}
            </span>
          </p>
          <TrendingUp className={cn('size-6', isReview ? 'text-coral' : 'text-lime-deep')} />
        </div>

        <PropertyActions property={property} onDelete={onDelete} />
      </CardContent>
    </Card>
  );
}

function ListPropertyRow({ property, onDelete }: Omit<PropertyListCardProps, 'view'>) {
  return (
    <div className="border-line/10 grid gap-4 border-b px-4 py-5 last:border-b-0 lg:grid-cols-[minmax(250px,2fr)_minmax(125px,.85fr)_minmax(90px,.6fr)_minmax(95px,.6fr)_minmax(110px,.7fr)_minmax(125px,.8fr)_minmax(75px,.45fr)_minmax(110px,.75fr)] lg:items-center">
      <div className="flex min-w-0 items-center gap-4">
        <PropertyImage property={property} className="size-24 shrink-0 rounded-xl" />
        <div className="min-w-0">
          <h2 className="font-display truncate font-semibold">{property.name}</h2>
          {property.address ? (
            <p className="text-content-muted mt-1 flex gap-1.5 text-sm">
              <MapPin className="mt-0.5 size-3.5 shrink-0" />
              <span className="line-clamp-2">{property.address}</span>
            </p>
          ) : null}
        </div>
      </div>
      <p className="text-content-muted text-sm">
        <span className="text-content font-medium lg:hidden">Rooms: </span>
        {property.roomsBooked}/{property.roomsTotal} rooms booked
      </p>
      <div className="text-content-muted flex items-center gap-3 text-sm">
        <span className="flex items-center gap-1">
          <BedDouble className="size-4" />
          {property.beds ?? 0}
        </span>
        <span className="flex items-center gap-1">
          <Bath className="size-4" />
          {property.baths ?? 0}
        </span>
      </div>
      <StatusBadge status={property.status ?? 'Active'} />
      {property.availability ? <StatusBadge status={property.availability} /> : null}
      <p className="font-display font-semibold">
        {formatNaira(property.price ?? 0)}
        <span className="text-content-muted mt-1 block font-sans text-xs font-normal">
          {property.term ?? 'per session'}
        </span>
      </p>
      <span className="flex items-center gap-1 text-sm font-medium">
        <Star className="fill-lime-deep text-lime-deep size-4" />
        {property.rating ? property.rating.toFixed(1) : '—'}
      </span>
      <PropertyActions property={property} onDelete={onDelete} compact />
    </div>
  );
}

export function PropertyListCard({ property, view, onDelete }: PropertyListCardProps) {
  return view === 'grid' ? (
    <GridPropertyCard property={property} onDelete={onDelete} />
  ) : (
    <ListPropertyRow property={property} onDelete={onDelete} />
  );
}
