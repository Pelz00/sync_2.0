/**
 * Suspense skeleton for (app) pages. Shows instantly on navigation while the
 * server renders - the shell (header + dock) persists, only this content area
 * swaps, so navigation feels continuous rather than a blank reload.
 */
import { Skeleton } from '@/components/ui/skeleton';

export default function AppLoading() {
  return (
    <section className="flex flex-col gap-3">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-11 w-64 max-w-full" />
      <Skeleton className="h-4 w-80 max-w-full" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-2xl" />
        ))}
      </div>
    </section>
  );
}
