'use client';

import { useMemo, useState } from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent, Chip, toast } from '@/components/ui';
import { StarRating } from './star-rating';
import { ReviewCard } from './review-card';
import { reviews as initialReviews, type Review } from '@/lib/landlord-data';

type Filter = 'all' | 'responded' | 'pending';

export function ReviewsClient() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [filter, setFilter] = useState<Filter>('all');

  const average = useMemo(() => {
    if (reviews.length === 0) return 0;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  }, [reviews]);

  const distribution = useMemo(() => {
    return [5, 4, 3, 2, 1].map((star) => {
      const count = reviews.filter((r) => r.rating === star).length;
      return { star, count, pct: reviews.length ? (count / reviews.length) * 100 : 0 };
    });
  }, [reviews]);

  const filtered = useMemo(() => {
    if (filter === 'responded') return reviews.filter((r) => r.response);
    if (filter === 'pending') return reviews.filter((r) => !r.response);
    return reviews;
  }, [reviews, filter]);

  function handleRespond(id: string, response: string) {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, response } : r)));
    toast.success('Response posted', { description: 'Your reply is now visible to students.' });
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="flex flex-col gap-5 lg:col-span-1">
        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
            <span className="font-display text-hero leading-none">{average.toFixed(1)}</span>
            <StarRating rating={Math.round(average)} />
            <span className="text-content-muted text-sm">Based on {reviews.length} reviews</span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-3 p-6">
            {distribution.map(({ star, count, pct }) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-content-muted flex w-10 items-center gap-1 text-sm">
                  {star}
                  <Star className="fill-lime text-lime size-3.5" />
                </span>
                <div className="bg-surface-deep h-2 flex-1 overflow-hidden rounded-full">
                  <div className="bg-lime h-full rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-content-muted w-6 text-right text-sm tabular-nums">{count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 lg:col-span-2">
        <div className="flex w-fit gap-2">
          <Chip selected={filter === 'all'} onClick={() => setFilter('all')}>
            All
          </Chip>
          <Chip selected={filter === 'pending'} onClick={() => setFilter('pending')}>
            Awaiting reply
          </Chip>
          <Chip selected={filter === 'responded'} onClick={() => setFilter('responded')}>
            Responded
          </Chip>
        </div>

        {filtered.length === 0 ? (
          <div className="border-line/15 flex flex-col items-center gap-2 rounded-xl border border-dashed py-16 text-center">
            <Star className="text-content-muted size-6" />
            <p className="text-sm font-medium">No reviews here</p>
            <p className="text-content-muted text-xs">There are no reviews matching this filter yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((review) => (
              <ReviewCard key={review.id} review={review} onRespond={handleRespond} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
