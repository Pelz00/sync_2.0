/**
 * Skeleton for the (marketing) route group - primarily the landing page.
 * Mirrors hero + featured rail + 3-step block so the transition into the
 * real page is a fade-replace, not a layout shift.
 */
import { Skeleton } from '@/components/ui/skeleton';

export default function MarketingLoading() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 pt-10 md:pt-16">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center md:gap-12">
          <div className="space-y-6">
            <Skeleton className="h-4 w-64" />
            <div className="space-y-3">
              <Skeleton className="h-12 w-3/4 md:h-16" />
              <Skeleton className="h-12 w-1/2 md:h-16" />
            </div>
            <div className="bg-panel shadow-card grid gap-px overflow-hidden rounded-2xl sm:grid-cols-[1fr_1fr_1fr_auto]">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-panel space-y-1.5 px-4 py-3">
                  <Skeleton className="h-2.5 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
              <div className="bg-surface-deep flex items-center p-2 sm:bg-transparent">
                <Skeleton className="h-12 w-full rounded-lg sm:w-32" />
              </div>
            </div>
            <Skeleton className="h-3 w-56" />
          </div>
          <div className="space-y-3">
            <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="aspect-[5/4] w-full rounded-lg" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured rail */}
      <section className="px-6 pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-9 w-72" />
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-panel shadow-card flex flex-col overflow-hidden rounded-xl"
              >
                <Skeleton className="aspect-[4/3] w-full rounded-none" />
                <div className="space-y-2 p-4">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <div className="flex gap-1.5 pt-1">
                    <Skeleton className="h-5 w-12 rounded-full" />
                    <Skeleton className="h-5 w-12 rounded-full" />
                    <Skeleton className="h-5 w-14 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-3 w-10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl space-y-3">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-9 w-96" />
          <div className="grid gap-6 pt-8 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-3 w-8" />
                <Skeleton className="h-5 w-3/5" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
