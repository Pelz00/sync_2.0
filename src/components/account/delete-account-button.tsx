/**
 * DeleteAccountButton - "delete my account" → archives (soft delete), signs out,
 * and sends the user home. Data is retained; logging back in within 30 days
 * restores the account (see project account-lifecycle). Confirms via a modal.
 */
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { toast } from '@/components/ui/toast';
import { archiveAccount } from '@/modules/account/actions';

export function DeleteAccountButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();

  function confirm() {
    start(async () => {
      const res = await archiveAccount();
      if (!res.ok) {
        toast(res.error);
        return;
      }
      toast('Account deleted. Log back in within 30 days to restore it.');
      setOpen(false);
      router.push('/');
      router.refresh();
    });
  }

  return (
    <div className="border-line/10 flex flex-col items-start gap-2 rounded-2xl border border-dashed p-5">
      <p className="text-content text-sm font-medium">Delete account</p>
      <p className="text-content-muted max-w-md text-xs">
        Your data is archived, not erased — log in again within 30 days to restore it. After 60 days
        it&rsquo;s permanently removed.
      </p>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="text-coral border-coral/30 hover:bg-coral/10 mt-1"
      >
        <Trash2 className="h-4 w-4" />
        Delete account
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete your account?"
        description="Your data is archived, not erased — log in again within 30 days to restore it. After 60 days it's permanently removed."
        confirmLabel="Delete account"
        destructive
        loading={pending}
        onConfirm={confirm}
      />
    </div>
  );
}
