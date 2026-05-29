/**
 * AppShell — authenticated student shell. Persistent sidebar (ModuleNav) on
 * md+, mobile bottom nav on small screens. Top bar has search + profile.
 *
 * Used by the (app) route group layout. Pages render inside <main>.
 */
import Link from 'next/link';
import { Bell } from 'lucide-react';
import { ModuleNav } from '@/components/shared/module-nav';
import { SearchBar } from '@/components/shared/search-bar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MobileBottomNav } from './mobile-bottom-nav';
import { SITE } from '@/config/site';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-cream text-ink min-h-screen">
      {/* Top bar */}
      <header className="bg-cream/90 border-ink/5 sticky top-0 z-30 border-b backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">
          <Link href="/around" className="font-display text-card text-ink shrink-0">
            {SITE.name}
          </Link>
          <div className="hidden flex-1 md:block">
            <SearchBar />
          </div>
          <div className="ml-auto flex items-center gap-2">
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

      {/* Body */}
      <div className="mx-auto flex max-w-7xl gap-8 px-4 pb-24 pt-6 md:px-6 md:pb-12">
        <aside className="sticky top-20 hidden h-fit w-56 shrink-0 md:block">
          <ModuleNav variant="sidebar" />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
