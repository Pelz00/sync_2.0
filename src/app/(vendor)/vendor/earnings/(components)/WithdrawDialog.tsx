'use client';

import React from 'react';
import { Wallet } from 'lucide-react';

interface WithdrawDialogProps {
  open: boolean;
  onClose: () => void;
  availableBalance: number;
}

export function WithdrawDialog({ open, onClose, availableBalance }: WithdrawDialogProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-panel rounded-xl shadow-pop w-full max-w-sm mx-4 p-6 z-10 text-center">
        <button onClick={onClose} className="absolute right-4 top-4 text-content-muted hover:text-content rounded-full p-1 transition-colors">✕</button>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface-deep">
          <Wallet className="h-6 w-6 text-content-muted" />
        </div>
        <h3 className="font-display text-lg font-semibold text-content mb-1">Withdraw Funds</h3>
        <p className="text-sm text-content-muted mb-4">
          You have <span className="font-semibold text-content">₦{availableBalance.toLocaleString()}</span> available.
          <br />
          This feature is coming soon.
        </p>
        <button
          onClick={onClose}
          className="w-full rounded-lg bg-ink/10 px-4 py-2.5 text-sm font-medium text-content-muted cursor-not-allowed"
          disabled
        >
          Coming Soon
        </button>
      </div>
    </div>
  );
}
