/**
 * Row actions for the admin users table: Restore an archived account (admin+),
 * or permanently Purge it (super_admin only, irreversible).
 */
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
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
  const [confirming, setConfirming] = useState(false);

  function restore() {
    start(async () => {
      const res = await restoreAccount(userId);
      toast(res.ok ? 'Account restored.' : res.error);
      if (res.ok) router.refresh();
    });
  }

  function purge() {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    start(async () => {
      const res = await purgeAccount(userId);
      toast(res.ok ? 'Account purged.' : res.error);
      setConfirming(false);
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
        <Button
          size="sm"
          variant="outline"
          disabled={pending}
          onClick={purge}
          className="text-coral border-coral/30 hover:bg-coral/10"
        >
          {confirming ? 'Confirm purge' : 'Purge'}
        </Button>
      )}
    </div>
  );
}
