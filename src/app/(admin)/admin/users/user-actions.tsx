/**
 * Row actions for the admin users table: Restore an archived account (admin+),
 * or permanently Purge it (super_admin only, irreversible — confirmed via modal).
 */
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { toast } from '@/components/ui/toast';
import { purgeAccount, restoreAccount } from '@/modules/account/actions';

export function UserRowActions({
  userId,
  archived,
  canPurge,
}: {
  userId: string;
  archived: boolean;
  canPurge: boolean;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [purgeOpen, setPurgeOpen] = useState(false);

  function restore() {
    start(async () => {
      const res = await restoreAccount(userId);
      toast(res.ok ? 'Account restored.' : res.error);
      if (res.ok) router.refresh();
    });
  }

  function purge() {
    start(async () => {
      const res = await purgeAccount(userId);
      toast(res.ok ? 'Account purged.' : res.error);
      setPurgeOpen(false);
      if (res.ok) router.refresh();
    });
  }

  return (
    <div className="flex justify-end gap-2">
      {archived && (
        <Button size="sm" variant="outline" disabled={pending} onClick={restore}>
          Restore
        </Button>
      )}
      {canPurge && (
        <>
          <Button
            size="sm"
            variant="outline"
            disabled={pending}
            onClick={() => setPurgeOpen(true)}
            className="text-coral border-coral/30 hover:bg-coral/10"
          >
            Purge
          </Button>
          <ConfirmDialog
            open={purgeOpen}
            onOpenChange={setPurgeOpen}
            title="Purge this account?"
            description="This permanently removes the account and its data from the system. This cannot be undone."
            confirmLabel="Purge permanently"
            destructive
            loading={pending}
            onConfirm={purge}
          />
        </>
      )}
    </div>
  );
}
