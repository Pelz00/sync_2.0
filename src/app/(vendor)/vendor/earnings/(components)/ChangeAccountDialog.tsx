'use client';

import React, { useState } from 'react';

interface ChangeAccountDialogProps {
  open: boolean;
  onClose: () => void;
  current: { bankName: string; accountNumber: string; holderName: string };
}

export function ChangeAccountDialog({ open, onClose, current }: ChangeAccountDialogProps) {
  const [bank, setBank] = useState(current.bankName);
  const [acct, setAcct] = useState(current.accountNumber);
  const [name, setName] = useState(current.holderName);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-panel rounded-xl shadow-pop w-full max-w-md mx-4 p-6 z-10">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-content-muted hover:text-content rounded-full p-1 transition-colors"
        >
          ✕
        </button>
        <h3 className="font-display text-lg font-semibold text-content mb-1">Change Payout Account</h3>
        <p className="text-sm text-content-muted mb-5">Update your bank details for future withdrawals.</p>

        <div className="space-y-4">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-content-muted mb-1.5">Bank Name</label>
            <input
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="w-full rounded-lg border border-line/20 bg-surface-deep px-3 py-2.5 text-sm text-content outline-none focus:border-violet-500 focus:ring-0 transition-colors"
              placeholder="e.g. GTBank"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-content-muted mb-1.5">Account Number</label>
            <input
              value={acct}
              onChange={(e) => setAcct(e.target.value)}
              className="w-full rounded-lg border border-line/20 bg-surface-deep px-3 py-2.5 text-sm text-content font-mono outline-none focus:border-violet-500 focus:ring-0 transition-colors"
              placeholder="0123456789"
              maxLength={10}
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-content-muted mb-1.5">Account Holder Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-line/20 bg-surface-deep px-3 py-2.5 text-sm text-content outline-none focus:border-violet-500 focus:ring-0 transition-colors"
              placeholder="John Adeyemi"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border border-line/20 px-4 py-2 text-sm text-content hover:bg-surface-deep transition-colors">
            Cancel
          </button>
          <button
            onClick={onClose}
            className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink/80 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
