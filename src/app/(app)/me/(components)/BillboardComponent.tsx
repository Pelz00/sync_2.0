'use client';
import { Badge } from '@/components/ui';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui';

interface BillboardProps {
  status?: string;
  propertyName: string;
  room: string;
  moveInDate: string;
  daysAway: number;
  awaitingStatus?: string;
  requestedAgo: string;
  onMessage?: () => void;
  onViewBooking?: () => void;
  onCancelRequest?: () => void;
}

export function BookingBillboard({
  status = 'Active booking',
  propertyName,
  room,
  moveInDate,
  daysAway,
  awaitingStatus = 'Awaiting landlord',
  requestedAgo,
  onMessage,
  onViewBooking,
  onCancelRequest,
}: BillboardProps) {
  return (
    <section className="bg-ink mt-3.5 flex w-full flex-col justify-between gap-6 rounded-xl p-6">
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        {/* Left: badge + title + subtitle */}
        <div className="flex flex-col gap-3">
          <Badge variant="outline" className="self-start border-white/20 text-white">
            {status}
          </Badge>
          <div>
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              {propertyName} · {room}
            </h2>
            <p className="mt-1 text-sm text-white/50">
              Move-in {moveInDate} · {daysAway} days away
            </p>
          </div>
        </div>

        {/* Right: awaiting status + requested time */}
        <div className="flex shrink-0 flex-col items-end gap-1">
          <p className="text-lime font-display text-right text-lg font-bold sm:text-xl">
            {awaitingStatus}
          </p>
          <p className="text-sm text-white/40">Requested {requestedAgo}</p>
        </div>
      </div>

      {/* Bottom row: actions */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          onClick={onMessage}
          className="text-content flex items-center gap-2 rounded-full bg-panel font-medium hover:bg-panel/90"
        >
          <MessageCircle className="size-4" />
          Message landlord
        </Button>
        <Button
          onClick={onViewBooking}
          variant="outline"
          className="rounded-full border-white/30 text-white hover:bg-panel/10"
        >
          View booking
        </Button>
        <Button
          onClick={onCancelRequest}
          variant="outline"
          className="rounded-full border-white/30 text-white hover:bg-panel/10"
        >
          Cancel request
        </Button>
      </div>
    </section>
  );
}
