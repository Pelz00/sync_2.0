/**
 * ROUTE: /around
 * ACCESS: authenticated student
 * PURPOSE: The "Around you" hub — the home of the authenticated app. A
 *          curated, geo-scoped feed mixing cards from every module
 *          (verified hostels nearby, what's on tonight, food open now,
 *          editorial hot-spots). The entire spoke pattern hangs off this hub.
 * BUILT HERE: Welcome hero with <SearchBar>, module quick-links from the
 *             registry, and three editorial rails (Nearby / Tonight / Worth
 *             knowing). Real cards land in Phase 8 (mock-data wired).
 * DATA: server-fetched mixed feed from modules/around/queries.ts
 */
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SearchBar } from '@/components/shared/search-bar';
import { EmptyState } from '@/components/shared/empty-state';
import { MODULES } from '@/config/modules';

export const metadata = { title: 'Around you' };

export default function AroundPage() {
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <p className="eyebrow text-lime-deep">Around you · KWASU, Malete</p>
        <h1 className="font-display text-section text-ink leading-tight">
          What&rsquo;s good today?
        </h1>
        <div className="md:hidden">
          <SearchBar />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <p className="eyebrow text-lime-deep">Jump to</p>
        <div className="-mx-2 flex gap-2 overflow-x-auto px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {MODULES.filter((m) => m.slug !== 'around').map(({ slug, label, icon: Icon }) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="bg-white shadow-card flex h-24 w-28 shrink-0 flex-col items-center justify-center gap-2 rounded-xl text-sm"
            >
              <Icon className="text-lime-deep h-5 w-5" />
              <span className="text-ink font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Editorial rails — content wired in Phase 8 with mock data. */}
      {['Nearby this week', 'Open right now', 'Worth knowing'].map((title) => (
        <section key={title} className="flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-card text-ink">{title}</h2>
            <Link href="/search" className="text-muted hover:text-ink inline-flex items-center gap-1 text-xs">
              See all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <EmptyState
            title="Nothing here yet"
            description="This rail fills in once vendors go live in your area. Check back soon."
          />
        </section>
      ))}
    </div>
  );
}
