'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { MoreVertical, Mail, MapPin, Calendar, Eye, ArchiveRestore, Archive, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { toast } from '@/components/ui/toast';
import { restoreAccount, purgeAccount } from '@/modules/account/actions';
import { cn } from '@/lib/utils';
import type { EnrichedUser } from './UsersClient';
import { avatarColors, initials, statusBadge, formatRole, formatCurrency, formatDate } from './Userutils';

type Props = {
  user: EnrichedUser;
  isSuperAdmin: boolean;
  onView: () => void;
  onPatch: (id: string, patch: Partial<EnrichedUser>) => void;
  onRemove: (id: string) => void;
};

export function UserCard({ user: u, isSuperAdmin, onView, onPatch, onRemove }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [purgeOpen, setPurgeOpen] = useState(false);
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

  function purge() {
    start(async () => {
      const res = await purgeAccount(u.id);
      if (res.ok) {
        onRemove(u.id);
        toast('Account purged.');
      } else {
        toast(res.error);
      }
      setPurgeOpen(false);
      router.refresh();
    });
  }

  return (
    <div className={cn('bg-panel border-line/10 overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-md', archived && 'opacity-60')}>
      {/* Top */}
      <div className="p-5 pb-4">
        <div className="mb-4 flex items-start justify-between">
          {/* Avatar + name */}
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold"
              style={{ background: bg, color: fg }}
            >
              {initials(u.full_name)}
            </div>
            <div>
              <p className="font-display text-content text-[0.9375rem] font-bold leading-tight">{u.full_name ?? '—'}</p>
              <p className="text-content-muted text-xs mt-0.5">USR-{u.id.slice(-4).toUpperCase()}</p>
            </div>
          </div>
          {/* Badge + menu */}
          <div className="flex items-center gap-2">
            {statusBadge(u)}
            <div className="relative">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setOpen((o) => !o)}>
                <MoreVertical className="h-3.5 w-3.5" />
              </Button>
              {open && (
                <div className="bg-panel border-line/10 shadow-pop absolute right-0 top-8 z-10 min-w-[11rem] overflow-hidden rounded-xl border p-1" onMouseLeave={() => setOpen(false)}>
                  <button className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-50" onClick={() => { setOpen(false); onView(); }}>
                    <Eye className="h-3.5 w-3.5" /> View profile
                  </button>
                  {archived ? (
                    <button disabled={pending} className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-50 disabled:opacity-50" onClick={() => { setOpen(false); restore(); }}>
                      <ArchiveRestore className="h-3.5 w-3.5" /> Restore account
                    </button>
                  ) : (
                    <button disabled={pending} className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-50 disabled:opacity-50" onClick={() => { setOpen(false); onPatch(u.id, { archived_at: new Date().toISOString() }); toast('Account archived.'); }}>
                      <Archive className="h-3.5 w-3.5" /> Archive account
                    </button>
                  )}
                  {isSuperAdmin && (
                    <button className="text-coral flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-red-50" onClick={() => { setOpen(false); setPurgeOpen(true); }}>
                      <Trash2 className="h-3.5 w-3.5" /> Purge account
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Mail className="text-content-muted h-3 w-3 shrink-0" />
            <span className="text-content-muted truncate text-[0.8125rem]">{u.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="text-content-muted h-3 w-3 shrink-0" />
            <span className="text-content-muted text-[0.8125rem]">Nigeria</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="text-content-muted h-3 w-3 shrink-0" />
            <span className="text-content-muted text-[0.8125rem]">Joined {formatDate(u.created_at)}</span>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-line/10 bg-surface-deep flex items-center justify-between border-t px-5 py-3">
        <div className="flex gap-5">
          <div>
            <p className="text-content-muted mb-0.5 text-[0.6rem] font-bold uppercase tracking-wider">Role</p>
            <p className="font-display text-content text-sm font-semibold capitalize">{formatRole(u.role)}</p>
          </div>
          {u.vendor_category && (
            <div>
              <p className="text-content-muted mb-0.5 text-[0.6rem] font-bold uppercase tracking-wider">Category</p>
              <p className="font-display text-content text-sm font-semibold">{u.vendor_category}</p>
            </div>
          )}
        </div>
        <span className={cn(
          'rounded-md px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider',
          u.role === 'vendor' ? 'bg-violet-100 text-violet-700' :
          u.role === 'landlord' ? 'bg-blue-100 text-blue-700' :
          u.role === 'admin' || u.role === 'super_admin' ? 'bg-amber-100 text-amber-700' :
          'bg-gray-100 text-gray-600',
        )}>
          {formatRole(u.role)}
        </span>
      </div>

      <ConfirmDialog
        open={purgeOpen}
        onOpenChange={setPurgeOpen}
        title="Purge this account?"
        description={`This permanently removes ${u.full_name ?? 'this account'} and all associated data. This cannot be undone.`}
        confirmLabel="Purge permanently"
        destructive
        loading={pending}
        onConfirm={purge}
      />
    </div>
  );
}