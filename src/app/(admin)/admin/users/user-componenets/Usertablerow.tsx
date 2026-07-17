'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { restoreAccount } from '@/modules/account/actions';
import { cn } from '@/lib/utils';
import type { EnrichedUser } from './UsersClient';
import { avatarColors, initials, statusBadge, formatRole, formatDate } from './Userutils';

type Props = {
  user: EnrichedUser;
  isSuperAdmin: boolean;
  onView: () => void;
  onPatch: (id: string, patch: Partial<EnrichedUser>) => void;
  onRemove: (id: string) => void;
};

// shared classes for the "label on mobile, hidden on desktop" pattern
const cellBase =
  'flex items-center justify-between gap-3 px-4 py-2 md:table-cell md:px-4 md:py-3';
const label = 'text-content-muted shrink-0 text-xs font-medium md:hidden';

export function UserTableRow({ user: u, isSuperAdmin, onView, onPatch }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const archived = Boolean(u.archived_at);
  const [bg, fg] = avatarColors(u.full_name ?? '');

  function restore() {
    start(async () => {
      const res = await restoreAccount(u.id);
      if (res.ok) {
        onPatch(u.id, { archived_at: null });
        toast('Account restored.');
      } else {
        toast(res.error);
      }
      router.refresh();
    });
  }

  return (
    <tr
      className={cn(
        'border-line/10 block border-b md:table-row md:border-0',
        'hover:bg-surface-deep/60 transition-colors',
        archived && 'opacity-60',
      )}
    >
      <td className={cellBase}>
        <span className={label}>User</span>
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold"
            style={{ background: bg, color: fg }}
          >
            {initials(u.full_name)}
          </div>
          <p className="text-content text-sm font-semibold">{u.full_name ?? '—'}</p>
        </div>
      </td>

      <td className={cellBase}>
        <span className={label}>Email</span>
        <span className="text-content-muted text-xs">{u.email}</span>
      </td>

      <td className={cellBase}>
        <span className={label}>Role</span>
        <span className="flex items-center gap-1">
          <span
            className={cn(
              'rounded-md px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider capitalize',
              u.role === 'vendor'
                ? 'bg-lime/20 text-accent-fg'
                : u.role === 'landlord'
                  ? 'bg-content/10 text-content'
                  : u.role === 'admin' || u.role === 'super_admin'
                    ? 'bg-coral/15 text-coral'
                    : 'bg-surface-deep text-content-muted',
            )}
          >
            {formatRole(u.role)}
          </span>
          {u.vendor_category && (
            <span className="text-content-muted text-xs">· {u.vendor_category}</span>
          )}
        </span>
      </td>

      <td className={cellBase}>
        <span className={label}>Status</span>
        {statusBadge(u)}
      </td>

      <td className={cellBase}>
        <span className={label}>Joined</span>
        <span className="text-content-muted text-xs whitespace-nowrap">
          {formatDate(u.created_at)}
        </span>
      </td>

      <td className={cn(cellBase, 'md:table-cell')}>
        <span className={label}>Actions</span>
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          <Button size="sm" variant="outline" onClick={onView}>
            View
          </Button>
          {archived ? (
            <Button size="sm" variant="outline" disabled={pending} onClick={restore}>
              Restore
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              disabled={pending}
              onClick={() => {
                onPatch(u.id, { archived_at: new Date().toISOString() });
                toast('Account archived.');
              }}
            >
              Archive
            </Button>
          )}
          {isSuperAdmin && (
            <Button
              size="sm"
              variant="outline"
              className="text-coral border-coral/30 hover:bg-coral/10"
            >
              Purge
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}