/**
 * Suspense skeleton shown instantly on navigation while the server renders.
 */
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <section className="flex flex-col gap-3 p-4 md:p-6">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-11 w-64 max-w-full" />
      <Skeleton className="h-4 w-80 max-w-full" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-36 rounded-2xl" />
        ))}
      </div>
    </section>
  );
}
