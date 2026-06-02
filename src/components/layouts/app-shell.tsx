/**
 * AppShell - authenticated student shell.
 *
 * Uses the same chrome as /around: the MarketingHeader (in dockMode) + the
 * horizontal ServicesDock, with a search row beneath. This keeps navigation
 * identical across the public /around feed and the signed-in module pages.
 * Built on the semantic surface tokens so it follows light/dark theme.
 *
 * Used by the (app) route group layout. Pages render inside <main>.
 */
import { MarketingHeader } from './marketing-header';
import { ServicesDock } from './services-dock';
import { SearchBar } from '@/components/shared/search-bar';
import { MobileBottomNav } from './mobile-bottom-nav';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface text-foreground flex min-h-screen flex-col">
      <MarketingHeader dockMode />
      <ServicesDock />

      {/* Search row - sits under the nav (was inline in the old top bar). */}
      <div className="border-line/5 border-b">
        <div className="mx-auto w-full max-w-7xl px-4 py-3 md:px-6">
          <SearchBar />
        </div>
      </div>

      <main className="mx-auto w-full min-w-0 max-w-7xl flex-1 px-4 pt-6 pb-24 md:px-6 md:pb-12">
        {children}
      </main>

      <MobileBottomNav />
    </div>
  );
}
