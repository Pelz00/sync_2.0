/**
 * Skeleton for /around. Mirrors the mosaic layout so the page swap feels
 * continuous instead of a layout shift. Uses the existing <Skeleton>
 * primitive (subtle ink/8 pulse on cream). Minimalist - fewer, larger blocks.
 */
import { Skeleton } from '@/components/ui/skeleton';

export default function AroundLoading() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-12 pt-10">
      {/* Header */}
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-3 w-44" />
          <Skeleton className="h-12 w-[420px] max-w-full" />
          <Skeleton className="h-12 w-[280px] max-w-full" />
          <Skeleton className="mt-2 h-4 w-80" />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Skeleton className="h-9 w-24 rounded-full" />
          <Skeleton className="h-9 w-28 rounded-full" />
          <Skeleton className="h-9 w-20 rounded-full" />
        </div>
      </header>

      {/* Mosaic */}
      <section className="mt-10 grid gap-5 lg:grid-cols-12">
        <CardSkeleton hero className="lg:col-span-5 lg:row-span-2" />
        <CardSkeleton className="lg:col-span-4" />
        <ListCardSkeleton rows={3} className="lg:col-span-4" />
        <CardSkeleton compact className="lg:col-span-3" />
        <ListCardSkeleton rows={3} compact className="lg:col-span-3" />
      </section>

      {/* Bottom row */}
      <section className="mt-5 grid gap-5 lg:grid-cols-12">
        <div className="border-ink/10 flex flex-col gap-4 rounded-2xl border border-dashed bg-white p-5 lg:col-span-4">
          <Skeleton className="h-3 w-40" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-9 w-32 self-start rounded-md" />
        </div>
        <div className="flex flex-col gap-4 lg:col-span-8">
          <div className="flex items-end justify-between">
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white shadow-card flex items-center gap-3 overflow-hidden rounded-xl p-2"
              >
                <Skeleton className="h-14 w-20 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3.5 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function CardSkeleton({
  hero,
  compact,
  className,
}: {
  hero?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={`bg-white shadow-card flex flex-col overflow-hidden rounded-2xl ${className ?? ''}`}>
      <Skeleton
        className={
          hero
            ? 'aspect-[4/3] w-full rounded-none lg:aspect-[5/6]'
            : compact
              ? 'h-32 w-full rounded-none'
              : 'aspect-[16/10] w-full rounded-none'
        }
      />
      <div className="flex flex-col gap-3 p-5">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-24 rounded-full" />
          {hero && <Skeleton className="h-6 w-20 rounded-full" />}
        </div>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        {hero && (
          <div className="mt-2 flex items-end justify-between">
            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-10 w-28 rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
}

function ListCardSkeleton({
  rows = 3,
  compact,
  className,
}: {
  rows?: number;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={`bg-white shadow-card flex flex-col gap-3 rounded-2xl p-5 ${className ?? ''}`}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-10" />
      </div>
      <ul className="divide-ink/5 -mx-1 divide-y">
        {Array.from({ length: rows }).map((_, i) => (
          <li key={i} className="flex items-center justify-between gap-3 px-1 py-3">
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-3.5 w-2/3" />
              {!compact && <Skeleton className="h-3 w-1/2" />}
            </div>
            <Skeleton className="h-6 w-14 shrink-0 rounded-full" />
          </li>
        ))}
      </ul>
    </div>
  );
}
