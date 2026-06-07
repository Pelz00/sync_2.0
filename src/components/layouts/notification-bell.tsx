/**
 * NotificationBell - bell button + dropdown of recent notifications, with an
 * unread dot and a "View all" link. Lives in the dashboard header so it's the
 * quick-access notification surface on every screen.
 *
 * Clicking a notification marks it read and routes to where it belongs (a
 * message opens the chat float; others go to the relevant page).
 *
 * Mock-driven (src/mock/student). Swap for a realtime Supabase query when the
 * backend is wired - the markup stays the same.
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { OPEN_CHAT_EVENT, studentNotifications, type StudentNotification } from '@/mock/student';

export function NotificationBell({ basePath = '/me' }: { basePath?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(studentNotifications);
  const unread = items.filter((n) => n.unread).length;

  function onSelect(n: StudentNotification) {
    setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, unread: false } : x)));
    setOpen(false);
    if (n.action === 'chat') {
      window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT));
    } else if (n.to) {
      router.push(`${basePath}/${n.to}`);
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`}
          className="border-line text-content hover:bg-ink/5 relative inline-flex size-10 items-center justify-center rounded-full border transition-colors"
        >
          <Bell className="size-5" />
          {unread > 0 && (
            <span className="bg-coral text-cream absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full text-[10px] font-semibold">
              {unread}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-104 max-w-[calc(100vw-1.5rem)] p-0">
        <div className="border-line/10 flex items-center justify-between border-b px-4 py-3">
          <p className="text-content text-sm font-medium">Notifications</p>
          {unread > 0 && (
            <button
              type="button"
              onClick={() => setItems((prev) => prev.map((n) => ({ ...n, unread: false })))}
              className="text-accent-fg text-xs font-medium hover:underline"
            >
              Mark all read
            </button>
          )}
        </div>

        <div className="max-h-112 overflow-y-auto">
          {items.map((n) => {
            const Icon = n.icon;
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => onSelect(n)}
                className={cn(
                  'border-line/5 hover:bg-ink/5 flex w-full gap-3 border-b px-4 py-3 text-left transition-colors last:border-b-0',
                  n.unread && 'bg-lime/5',
                )}
              >
                <span className="bg-ink/5 text-content-muted flex size-9 shrink-0 items-center justify-center rounded-lg">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-content truncate text-sm font-medium">{n.title}</p>
                    {n.unread && <span className="bg-coral size-1.5 shrink-0 rounded-full" />}
                  </div>
                  <p className="text-content-muted text-xs">{n.body}</p>
                  <p className="text-content-muted mt-0.5 text-[11px]">{n.timeAgo}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="border-line/10 border-t px-4 py-2.5 text-center">
          <Link
            href={`${basePath}/notifications`}
            onClick={() => setOpen(false)}
            className="text-accent-fg text-xs font-medium hover:underline"
          >
            View all notifications
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
