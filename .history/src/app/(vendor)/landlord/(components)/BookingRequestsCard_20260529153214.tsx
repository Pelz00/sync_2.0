'use client';
import { Button, Card } from '@/components/ui';
import { ArrowRight } from 'lucide-react';

interface BookingRequestCardProps {
  name: string;
  location: string;
  room: string;
  timeAgo: string;
  avatarUrl?: string;
  onAccept?: () => void;
  onDecline?: () => void;
}

export function BookingRequestCard({
  name,
  location,
  room,
  timeAgo,
  avatarUrl,
  onAccept,
  onDecline,
}: BookingRequestCardProps) {
  return (
    <Card className="border-ink group flex items-center justify-between border bg-transparent px-5 py-4 transition-shadow duration-300 hover:shadow-lg">
      {/* Avatar + Info */}
      <div className="flex items-center gap-4">
        <div className="bg-ink/10 size-10 shrink-0 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-110">
          {avatarUrl ? <img src={avatarUrl} alt={name} className="size-full object-cover" /> : null}
        </div>
        <div>
          <h1 className="font-display text-card leading-tight font-semibold">{name}</h1>
          <p className="text-muted text-sm">
            {location} · {room} · {timeAgo}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2">
        <Button variant="outline" onClick={onDecline}>
          Decline
        </Button>
        <Button
          onClick={onAccept}
          className="text-ink border-ink rounded-full border bg-[#CAFF4D] font-semibold hover:bg-[#b8f030]"
        >
          Accept <ArrowRight className="ml-1 size-4" />
        </Button>
      </div>
    </Card>
  );
}
