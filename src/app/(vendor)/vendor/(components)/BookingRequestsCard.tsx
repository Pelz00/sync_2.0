'use client';
import { Button, Card } from '@/components/ui';
import { BookingRequest } from '@/mock/vendor';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface BookingRequestCardProps {
  data: BookingRequest[];
}

export function BookingRequestCard({ data }: BookingRequestCardProps) {
  return (
    <div className="flex flex-col gap-4">
      {data.map(
        ({
          orderId,
          name,
          avatarUrl,
          items,
          total,
          timeAgo,
          deliveryType,
          onAccept,
          onDecline,
        }) => (
          <Card
            key={orderId}
            className="border-line group flex items-center justify-between border bg-transparent px-5 py-4 transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="bg-ink/10 size-10 shrink-0 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-110">
                {avatarUrl && (
                  <Image
                    src={avatarUrl}
                    alt={name}
                    className="size-full object-cover"
                    width={100}
                    height={100}
                  />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-card leading-tight font-semibold">{name}</h1>
                  <span className="text-content-muted font-mono text-xs">{orderId}</span>
                </div>
                <p className="text-content-muted text-sm">{items}</p>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-[#7ab800]">{total}</span>
                  <span className="text-content-muted text-xs">·</span>
                  <span className="text-content-muted text-xs capitalize">{deliveryType}</span>
                  <span className="text-content-muted text-xs">· {timeAgo} ago</span>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Button variant="outline" onClick={onDecline}>
                Decline
              </Button>
              <Button
                onClick={onAccept}
                className="text-content border-line rounded-full border bg-[#CAFF4D] font-semibold hover:bg-[#b8f030]"
              >
                Accept <ArrowRight className="ml-1 size-4" />
              </Button>
            </div>
          </Card>
        ),
      )}
    </div>
  );
}
