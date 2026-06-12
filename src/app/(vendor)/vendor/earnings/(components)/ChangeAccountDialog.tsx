'use client';

import React, { useState, useEffect } from 'react';

import { Button, Input } from '@/components/ui';
import { Modal } from '@/components/shared/custom-modal';
import { banks } from '@/mock/banks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, ChevronDown } from 'lucide-react';

interface ChangeAccountDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (updated: { bankName: string; accountNumber: string; holderName: string }) => void;
  current: {
    bankName: string;
    accountNumber: string;
    holderName: string;
  };
}

export function ChangeAccountDialog({ open, onClose, onSave, current }: ChangeAccountDialogProps) {
  const [bank, setBank] = useState(current.bankName);
  const [acct, setAcct] = useState(current.accountNumber);
  const [name, setName] = useState(current.holderName);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Sync state whenever the modal re-opens with fresh current values
  useEffect(() => {
    if (open) {
      setBank(current.bankName);
      setAcct(current.accountNumber);
      setName(current.holderName);
    }
  }, [open, current.bankName, current.accountNumber, current.holderName]);

  function handleSave() {
    onSave({ bankName: bank, accountNumber: acct, holderName: name });
    onClose();
  }

  return (
    <Modal
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      title="Change Payout Account"
      description="Update your bank details for future withdrawals."
      className="max-w-md"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="text-content-muted mb-1.5 block font-mono text-[10px] tracking-widest uppercase">
            Bank Name
          </label>
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <button className="border-ink/10 flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm">
                <span className={bank ? '' : 'text-content-muted'}>{bank || 'Select a bank'}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-[var(--radix-dropdown-menu-trigger-width)]"
            >
              {banks.map((bankName) => (
                <DropdownMenuItem
                  key={bankName}
                  onSelect={() => {
                    setBank(bankName);
                    setDropdownOpen(false);
                  }}
                  className={bank === bankName ? 'font-medium text-lime-600' : ''}
                >
                  {bank === bankName ? (
                    <Check className="h-4 w-4 shrink-0" />
                  ) : (
                    <span className="h-4 w-4 shrink-0" />
                  )}
                  {bankName}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <label className="text-content-muted mb-1.5 block font-mono text-[10px] tracking-widest uppercase">
            Account Number
          </label>
          <Input
            value={acct}
            onChange={(e) => setAcct(e.target.value)}
            placeholder="0123456789"
            maxLength={10}
          />
        </div>

        <div>
          <label className="text-content-muted mb-1.5 block font-mono text-[10px] tracking-widest uppercase">
            Account Holder Name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Adeyemi"
          />
        </div>
      </div>
    </Modal>
  );
}
