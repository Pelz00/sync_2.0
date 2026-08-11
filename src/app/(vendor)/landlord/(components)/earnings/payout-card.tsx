'use client';

import { useState } from 'react';
import { Banknote, Building, Clock3, Pencil } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  toast,
} from '@/components/ui';
import { StatusBadge } from '../shared/status-badge';
import { payoutMethod as seedMethod, pendingPayout, formatNaira } from '@/lib/landlord-data';

const banks = [
  'Guaranty Trust Bank',
  'Access Bank',
  'Zenith Bank',
  'First Bank of Nigeria',
  'United Bank for Africa',
  'Kuda Microfinance Bank',
];

export function PayoutCard() {
  const [method, setMethod] = useState(seedMethod);
  const [editing, setEditing] = useState(false);
  const [bank, setBank] = useState(method?.bankName ?? banks[0]);
  const [accName, setAccName] = useState(method?.accountName ?? '');
  const [accNo, setAccNo] = useState(method?.accountNumber ?? '');

  const save = () => {
    if (!accName.trim() || accNo.length < 10) {
      toast.error('Enter a valid account name and 10-digit number.');
      return;
    }
    setMethod({ bankName: bank, accountName: accName, accountNumber: accNo });
    setEditing(false);
    toast.success('Payout method saved');
  };

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <CardTitle>Payout method</CardTitle>
          <CardDescription>Where Sync sends your rent.</CardDescription>
        </div>
        {method && !editing ? (
          <Button variant="ghost" size="icon" onClick={() => setEditing(true)}>
            <Pencil className="size-4" />
          </Button>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {method && !editing ? (
          <div className="border-line/10 bg-surface-deep flex items-center gap-3 rounded-xl border p-3">
            <div className="bg-lime/15 text-lime-deep flex size-10 items-center justify-center rounded-lg">
              <Building className="size-5" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">{method.accountName}</span>
              <span className="text-content-muted text-xs">
                {method.bankName} · ••••{method.accountNumber.slice(-4)}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Bank</span>
              <Select value={bank} onValueChange={setBank}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {banks.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="accNo" className="text-sm font-medium">
                Account number
              </label>
              <Input
                id="accNo"
                inputMode="numeric"
                maxLength={10}
                value={accNo}
                onChange={(e) => setAccNo(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="0123456789"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="accName" className="text-sm font-medium">
                Account name
              </label>
              <Input id="accName" value={accName} onChange={(e) => setAccName(e.target.value)} placeholder="Account holder name" />
            </div>
            <div className="flex gap-2">
              <Button onClick={save} className="flex-1">
                Save method
              </Button>
              {method ? (
                <Button variant="outline" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              ) : null}
            </div>
          </div>
        )}

        <div className="border-line/10 flex items-center justify-between rounded-xl border p-3">
          <div className="flex items-center gap-2 text-sm">
            <Clock3 className="text-content-muted size-4" />
            <span className="text-content-muted">Pending payout</span>
          </div>
          <span className="flex items-center gap-2">
            <StatusBadge status="due" />
            <span className="text-sm font-medium">{formatNaira(pendingPayout)}</span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export function RequestPayoutButton({ balance }: { balance: number }) {
  const [requested, setRequested] = useState(false);

  if (requested) {
    return (
      <span className="border-line/15 bg-surface-deep text-content-muted inline-flex h-11 items-center gap-1.5 rounded-lg border px-4 text-sm font-medium">
        <Clock3 className="size-3.5" /> Payout requested
      </span>
    );
  }

  return (
    <Button
      onClick={() => {
        setRequested(true);
        toast.success('Payout requested', { description: `${formatNaira(balance)} will arrive within 24 hours.` });
      }}
    >
      <Banknote className="size-4" />
      Request payout
    </Button>
  );
}
