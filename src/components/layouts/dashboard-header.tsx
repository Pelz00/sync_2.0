/**
 * DashboardHeader - the persistent top bar across every dashboard screen. Shows
 * which screen you're on (left) and the quick actions (right): notifications +
 * the account-avatar dropdown. On mobile it also hosts the hamburger that opens
 * the sidebar in a slide-out drawer.
 */
'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X } from 'lucide-react';
import { DASHBOARD_NAV, activeNav, type DashboardNavKey } from '@/config/dashboard-nav';
import { DashboardSidebar } from './dashboard-sidebar';
import { NotificationBell } from './notification-bell';
import { AccountMenu } from './account-menu';
import type { DashboardProfile } from './dashboard-profile';

interface DashboardHeaderProps {
  navKey: DashboardNavKey;
  profile: DashboardProfile;
}

export function DashboardHeader({ navKey, profile }: DashboardHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { brandLabel, rootHref } = DASHBOARD_NAV[navKey];

  const handle = navKey === 'student' || navKey === 'vendor' ? profile.handle : undefined;
  const base = handle ? `/${handle}` : rootHref;
  const { label, heading } = activeNav(navKey, pathname, handle);
  // Only the student dashboard has a dedicated profile page.
  const profileHref = navKey === 'student' ? `${base}/profile` : undefined;

  return (
    <header className="border-line/10 bg-surface/90 sticky top-0 z-30 flex shrink-0 items-center justify-between gap-3 border-b px-4 py-4 backdrop-blur md:px-8">
      <div className="flex min-w-0 items-center gap-2">
        {/* Mobile hamburger + slide-out drawer */}
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="text-content hover:bg-ink/5 -ml-1 inline-flex size-10 items-center justify-center rounded-full md:hidden"
            >
              <Menu className="size-5" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out fixed inset-0 z-40 bg-black/40 md:hidden" />
            <Dialog.Content className="bg-panel data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-left fixed inset-0 z-50 flex h-dvh w-screen flex-col overflow-y-auto p-4 md:hidden">
              <Dialog.Title className="sr-only">Menu</Dialog.Title>
              <Dialog.Description className="sr-only">Dashboard navigation.</Dialog.Description>
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="text-content hover:bg-ink/5 absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-full"
                >
                  <X className="size-5" />
                </button>
              </Dialog.Close>
              <DashboardSidebar
                navKey={navKey}
                profile={profile}
                onNavigate={() => setOpen(false)}
              />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <div className="min-w-0">
          <p className="eyebrow text-content-muted uppercase">
            {brandLabel} . {label}
          </p>
          <h1 className="font-display text-content mt-1 truncate text-2xl leading-none font-semibold md:text-3xl">
            {heading}
          </h1>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <NotificationBell basePath={base} />
        <AccountMenu
          name={profile.name}
          email={profile.email}
          initial={profile.initial}
          avatarUrl={profile.avatarUrl}
          profileHref={profileHref}
          settingsHref={`${base}/settings`}
        />
      </div>
    </header>
  );
}
