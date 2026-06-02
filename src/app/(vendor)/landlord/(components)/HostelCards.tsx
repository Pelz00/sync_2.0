'use client';
import { Card, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export interface Property {
  id: string;
  name: string;
  roomsTotal: number;
  roomsBooked: number;
  status?: 'Active' | 'Inactive';
  imageUrl?: string;
}

interface PropertyCardProps {
  properties: Property[];
  onEdit?: (id: string) => void;
  onBoost?: (id: string) => void;
}

export function PropertyCard({ properties, onEdit, onBoost }: PropertyCardProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <Card
          key={property.id}
          className="border-line group w-full border bg-transparent transition-shadow duration-300 hover:shadow-lg"
        >
          {/* Image / Placeholder */}
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
              <div className="relative h-40 w-full bg-[#f0ece4] transition-transform duration-300 group-hover:scale-110">
                <svg
                  className="absolute inset-0 h-full w-full"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <line x1="0" y1="0" x2="100%" y2="100%" stroke="#c5bfb5" strokeWidth="1.5" />
                  <line x1="100%" y1="0" x2="0" y2="100%" stroke="#c5bfb5" strokeWidth="1.5" />
                </svg>
              </div>
            )}
          </div>

          {/* Title + Status */}
          <CardContent className="pt-4">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base">{property.name}</CardTitle>
              <span className="border-line/20 text-content shrink-0 rounded-full border px-3 py-0.5 text-xs font-medium">
                {property.status ?? 'Active'}
              </span>
            </div>
            <CardDescription className="mt-1">
              {property.roomsBooked}B / {property.roomsTotal} booked
            </CardDescription>
          </CardContent>

          {/* Actions */}
          <CardFooter className="border-t-0 pt-0">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => onEdit?.(property.id)}
            >
              Edit
            </Button>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => onBoost?.(property.id)}
            >
              Boost
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
