/**
 * AppShell - authenticated student shell.
 *
 * General navigation (shared with /around): a top bar (logo + search +
 * notifications + profile) above the horizontal ServicesDock of module
 * pills. No vertical sidebar - the dock is the single, consistent nav across
 * every module. Mobile keeps the bottom nav.
 *
 * Used by the (app) route group layout. Pages render inside <main>.
 */
import Link from 'next/link';
import { Bell } from 'lucide-react';
import { SearchBar } from '@/components/shared/search-bar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ServicesDock } from './services-dock';
import { MobileBottomNav } from './mobile-bottom-nav';
import { SITE } from '@/config/site';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-cream text-ink min-h-screen">
      {/* Top bar - logo + search + profile */}
      <header className="bg-cream/90 border-ink/5 sticky top-0 z-30 border-b backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">
          <Link href="/around" className="font-display text-card text-ink shrink-0">
            {SITE.name}
          </Link>
          <div className="hidden flex-1 md:block">
            <SearchBar />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/me/notifications"
              aria-label="Notifications"
              className="hover:bg-ink/5 flex h-10 w-10 items-center justify-center rounded-full"
            >
              <Bell className="h-4 w-4" />
            </Link>
            <Link href="/me" aria-label="Profile">
              <Avatar className="h-9 w-9">
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>

      {/* General horizontal nav - same dock as /around */}
      <ServicesDock />

      {/* Mobile search - the topbar search is md+ only */}
      <div className="border-ink/5 border-b px-4 py-3 md:hidden">
        <SearchBar />
      </div>

      <main className="mx-auto min-w-0 max-w-7xl px-4 pb-24 pt-6 md:px-6 md:pb-12">{children}</main>

      <MobileBottomNav />
    </div>
  );
}
