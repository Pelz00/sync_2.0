'use client';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Hostel } from '@/mock/hostels';

interface HostelCardListProps {
  hostels: Hostel[];
  onSelect?: (id: string) => void;
}

function HostelCard({ hostel, onSelect }: { hostel: Hostel; onSelect?: (id: string) => void }) {
  return (
    <Card
      onClick={() => onSelect?.(hostel.id)}
      className="group border-line w-full cursor-pointer border bg-transparent transition-shadow duration-300 hover:shadow-lg"
    >
      {/* Image / Placeholder */}
      <div className="border-line/25 m-3 overflow-hidden rounded-xl border border-dashed">
        {hostel.imageUrl ? (
          <Image
            src={hostel.imageUrl}
            alt={hostel.name}
            width={400}
            height={160}
            className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="relative h-36 w-full bg-[#f0ece4] transition-transform duration-300 group-hover:scale-110">
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

      {/* Info */}
      <CardContent className="pt-0">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-sm">{hostel.name}</CardTitle>
          <p className="text-content shrink-0 font-mono text-sm">
            ₦{(hostel.price / 1000).toFixed(0)}k
          </p>
        </div>
        <CardDescription className="mt-0.5 text-xs">
          {hostel.distanceMinutes} min · {hostel.landmark}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export function HostelCardList({ hostels, onSelect }: HostelCardListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {hostels.map((hostel) => (
        <HostelCard key={hostel.id} hostel={hostel} onSelect={onSelect} />
      ))}
    </div>
  );
}
