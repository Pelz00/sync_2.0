/**
 * ReviewCard - single review entry. Shown on listing detail pages and the
 * student profile's "My reviews" section. Author name is shortened (first
 * name + last initial) to protect student privacy.
 */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RatingStars } from './rating-stars';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

export interface ReviewCardData {
  author: { name: string; avatarUrl?: string };
  rating: number;
  body: string;
  createdAt: Date | string;
}

export function ReviewCard({
  author,
  rating,
  body,
  createdAt,
  className,
}: ReviewCardData & { className?: string }) {
  const initials = author.name
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <article className={cn('bg-white shadow-card rounded-xl p-5', className)}>
      <header className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          {author.avatarUrl && <AvatarImage src={author.avatarUrl} alt="" />}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="text-ink text-sm font-medium">{author.name}</p>
          <p className="text-muted text-xs">{formatDate(createdAt)}</p>
        </div>
        <RatingStars value={rating} hideValue />
      </header>
      <p className="text-body text-ink mt-3">{body}</p>
    </article>
  );
}
