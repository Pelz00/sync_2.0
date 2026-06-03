/**
 * DeleteAccountButton - "delete my account" → archives (soft delete), signs out,
 * and sends the user home. Data is retained; logging back in within 30 days
 * restores the account (see project account-lifecycle). Two-tap confirm.
 */
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { archiveAccount } from '@/modules/account/actions';

export function DeleteAccountButton() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [confirming, setConfirming] = useState(false);

  function onClick() {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    start(async () => {
      const res = await archiveAccount();
      if (!res.ok) {
        toast(res.error);
        setConfirming(false);
        return;
      }
      toast('Account deleted. Log back in within 30 days to restore it.');
      router.push('/');
      router.refresh();
    });
  }

  return (
    <div className="border-line/10 mt-8 flex flex-col items-start gap-2 rounded-2xl border border-dashed p-5">
      <p className="text-content text-sm font-medium">Delete account</p>
      <p className="text-content-muted max-w-md text-xs">
        Your data is archived, not erased — log in again within 30 days to restore it. After 60 days
        it&rsquo;s permanently removed.
      </p>
      <Button
        variant="outline"
        size="sm"
        disabled={pending}
        onClick={onClick}
        onBlur={() => setConfirming(false)}
        className="text-coral border-coral/30 hover:bg-coral/10 mt-1"
      >
        <Trash2 className="h-4 w-4" />
        {confirming ? 'Confirm — delete my account' : 'Delete account'}
      </Button>
    </div>
  );
}
