'use client';

import React from 'react';
import { Wallet } from 'lucide-react';

import { Button } from '@/components/ui';
import { Modal } from '@/components/shared/custom-modal';

interface WithdrawDialogProps {
  open: boolean;
  onClose: () => void;
  availableBalance: number;
}

export function WithdrawDialog({ open, onClose, availableBalance }: WithdrawDialogProps) {
  return (
    <Modal
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      className="max-w-sm"
      showHeader={false}
    >
      <div className="text-center">
        <div className="bg-surface-deep mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full">
          <Wallet className="text-content-muted h-6 w-6" />
        </div>

        <h3 className="font-display text-content mb-1 text-lg font-semibold">Withdraw Funds</h3>

        <p className="text-content-muted mb-6 text-sm">
          You have{' '}
          <span className="text-content font-semibold">₦{availableBalance.toLocaleString()}</span>{' '}
          available.
          <br />
          This feature is coming soon.
        </p>

        <Button className="w-full" disabled>
          Coming Soon
        </Button>
      </div>
    </Modal>
  );
}
