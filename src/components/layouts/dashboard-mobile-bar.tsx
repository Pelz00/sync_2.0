/**
 * DashboardMobileBar - the small-screen counterpart to the desktop rail. A
 * sticky top bar with the wordmark + a hamburger that opens a left slide-out
 * drawer containing the same <DashboardSidebar>. Built on Radix Dialog for
 * focus trapping, Escape-to-close and scroll lock; visible only below `md`.
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X } from 'lucide-react';
import { SITE } from '@/config/site';
import { DASHBOARD_NAV, type DashboardNavKey } from '@/config/dashboard-nav';
import { DashboardSidebar } from './dashboard-sidebar';
import type { DashboardProfile } from './dashboard-profile';

interface DashboardMobileBarProps {
  navKey: DashboardNavKey;
  profile: DashboardProfile;
}

export function DashboardMobileBar({ navKey, profile }: DashboardMobileBarProps) {
  const [open, setOpen] = useState(false);
  const { brandLabel } = DASHBOARD_NAV[navKey];

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div className="border-line/10 bg-panel sticky top-0 z-30 flex h-14 items-center justify-between border-b px-4 md:hidden">
        <div className="flex items-baseline gap-2">
          <Link href="/" className="font-display text-card text-content">
            {SITE.name}
          </Link>
          <span className="eyebrow text-content-muted">{brandLabel}</span>
        </div>
        <Dialog.Trigger asChild>
          <button
            type="button"
            aria-label="Open menu"
            className="text-content hover:bg-ink/5 inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
        </Dialog.Trigger>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out fixed inset-0 z-40 bg-black/40 md:hidden" />
        <Dialog.Content className="bg-panel data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-left fixed inset-y-0 left-0 z-50 flex w-[18rem] max-w-[85vw] flex-col overflow-y-auto p-4 md:hidden">
          <Dialog.Title className="sr-only">Dashboard menu</Dialog.Title>
          <Dialog.Description className="sr-only">
            Account profile, navigation, and sign out.
          </Dialog.Description>
          <Dialog.Close asChild>
            <button
              type="button"
              aria-label="Close menu"
              className="text-content hover:bg-ink/5 absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </Dialog.Close>
          <DashboardSidebar navKey={navKey} profile={profile} onNavigate={() => setOpen(false)} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
