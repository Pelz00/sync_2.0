'use client';

import { useState } from 'react';
import { CornerDownRight, MessageSquareReply } from 'lucide-react';
import { Avatar, AvatarFallback, Button, Card, CardContent, Badge, Textarea } from '@/components/ui';
import { StarRating } from './star-rating';
import type { Review } from '@/lib/landlord-data';

export function ReviewCard({ review, onRespond }: { review: Review; onRespond: (id: string, response: string) => void }) {
  const [replying, setReplying] = useState(false);
  const [draft, setDraft] = useState('');

  function submit() {
    const text = draft.trim();
    if (!text) return;
    onRespond(review.id, text);
    setDraft('');
    setReplying(false);
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-5">
        <div className="flex items-start gap-4">
          <Avatar className="size-11">
            <AvatarFallback>{review.studentInitials}</AvatarFallback>
          </Avatar>

          <div className="flex flex-1 flex-col gap-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-col gap-0.5">
                <span className="font-display text-sm font-semibold leading-none">{review.studentName}</span>
                <span className="text-content-muted text-xs">{review.propertyName}</span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <StarRating rating={review.rating} />
                <span className="text-content-muted text-xs">{review.date}</span>
              </div>
            </div>

            <p className="text-content/90 text-sm leading-relaxed">{review.body}</p>
          </div>
        </div>

        {review.response ? (
          <div className="border-line/10 bg-surface-deep ml-4 flex gap-3 rounded-lg border p-4">
            <CornerDownRight className="text-lime-deep mt-0.5 size-4 shrink-0" />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-display text-xs font-semibold">Your response</span>
                <Badge variant="neutral" size="sm">
                  Landlord
                </Badge>
              </div>
              <p className="text-content-muted text-sm leading-relaxed">{review.response}</p>
            </div>
          </div>
        ) : replying ? (
          <div className="ml-4 flex flex-col gap-2">
            <Textarea
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write a public response to this review..."
              rows={3}
            />
            <div className="flex items-center justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setReplying(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={submit} disabled={!draft.trim()}>
                Post response
              </Button>
            </div>
          </div>
        ) : (
          <div className="ml-4">
            <Button variant="outline" size="sm" onClick={() => setReplying(true)}>
              <MessageSquareReply className="size-4" />
              Respond
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
