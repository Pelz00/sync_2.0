/**
 * WalletPanel - the student wallet. The wallet is what students add funds to
 * (top up), then spend across Sync (hostels, food, events…). So "Add funds" is
 * the hero action: it opens a small amount dialog and credits the balance.
 *
 * Tapping a transaction opens its full detail (who it was sent to, account
 * number, reference…) in a centered modal on desktop and a bottom sheet on
 * mobile.
 *
 * Mock/optimistic for now (local state + toast). When Supabase is the backend,
 * "Add funds" calls a route handler → payment provider → credits the balance;
 * the balance + transactions come from a query. The UI stays the same.
 */
'use client';

import { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, ChevronRight, Plus, Wallet } from 'lucide-react';
import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Input,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui';
import { toast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { openWalletTopup } from '@/lib/paystack/client';
import { walletBalance, walletStats, walletTransactions, type WalletTxn } from '@/mock/student';

const naira = (n: number) => `₦${n.toLocaleString('en-NG')}`;
const QUICK = [1_000, 5_000, 10_000, 20_000];

export function WalletPanel() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [balance, setBalance] = useState(walletBalance);
  const [added, setAdded] = useState(walletStats.addedThisMonth);
  const [txns, setTxns] = useState<WalletTxn[]>(walletTransactions);
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [pending, setPending] = useState(false);
  const [selected, setSelected] = useState<WalletTxn | null>(null);

  /** Dev/demo fallback: credit locally when Paystack isn't configured yet. */
  function creditLocally(value: number) {
    setBalance((b) => b + value);
    setAdded((a) => a + value);
    setTxns((prev) => [
      {
        id: `local-${prev.length}`,
        label: 'Top-up',
        sub: 'Sync wallet',
        amount: value,
        direction: 'in',
        date: 'Just now',
        status: 'completed',
        counterparty: 'You',
        accountNumber: 'Sync wallet',
        bank: 'Sync',
        reference: `SYNC-TP-LOCAL${prev.length}`,
        method: 'Sync wallet',
        time: 'Just now',
        fee: 0,
      },
      ...prev,
    ]);
  }

  async function addFunds(e: React.FormEvent) {
    e.preventDefault();
    const value = Math.round(Number(amount));
    if (!value || value < 100) {
      toast('Enter at least ₦100.');
      return;
    }
    setPending(true);
    try {
      const res = await fetch('/api/wallet/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: value }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast(data.error ?? 'Could not start the payment.');
        return;
      }

      // No Paystack keys yet → behave like the previous mock top-up.
      if (data.mock) {
        creditLocally(value);
        toast(`${naira(value)} added to your wallet.`);
        setAmount('');
        setOpen(false);
        return;
      }

      // Real Paystack: open the popup for the server-initialized transaction.
      // The wallet is credited by the verified webhook, so we just inform here.
      setOpen(false);
      await openWalletTopup(data.accessCode, {
        onSuccess: () => toast('Payment received — your wallet will update shortly.'),
        onCancel: () => toast('Payment cancelled.'),
      });
      setAmount('');
    } catch {
      toast('Something went wrong starting your payment.');
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="flex flex-col gap-6">
      {/* Balance + Add funds */}
      <div className="bg-ink text-cream flex flex-col gap-6 rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-cream/60 font-mono text-[11px] tracking-wide uppercase">
              Sync wallet balance
            </p>
            <p className="font-display mt-1 text-4xl font-semibold">{naira(balance)}</p>
          </div>
          <span className="bg-cream/10 flex size-12 shrink-0 items-center justify-center rounded-full">
            <Wallet className="size-6" />
          </span>
        </div>
        <Button
          onClick={() => setOpen(true)}
          className="bg-lime text-ink hover:bg-lime/85 self-start rounded-full"
        >
          <Plus className="size-4" /> Add funds
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-line/10 border bg-transparent p-5">
          <p className="text-content-muted font-mono text-xs tracking-wide">ADDED THIS MONTH</p>
          <p className="text-content mt-1 text-2xl font-bold">{naira(added)}</p>
        </Card>
        <Card className="border-line/10 border bg-transparent p-5">
          <p className="text-content-muted font-mono text-xs tracking-wide">SPENT THIS MONTH</p>
          <p className="text-content mt-1 text-2xl font-bold">
            {naira(walletStats.spentThisMonth)}
          </p>
        </Card>
      </div>

      {/* Transactions */}
      <div className="flex flex-col gap-3">
        <h2 className="text-content-muted font-mono text-sm tracking-wide">TRANSACTIONS</h2>
        <Card className="border-line/10 divide-line/5 divide-y border bg-transparent">
          {txns.map((t) => {
            const inbound = t.direction === 'in';
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelected(t)}
                className="hover:bg-ink/5 flex w-full items-center gap-3 p-4 text-left transition-colors"
              >
                <span
                  className={cn(
                    'flex size-10 shrink-0 items-center justify-center rounded-full',
                    inbound ? 'bg-lime/15 text-accent-fg' : 'bg-ink/5 text-content-muted',
                  )}
                >
                  {inbound ? (
                    <ArrowDownLeft className="size-5" />
                  ) : (
                    <ArrowUpRight className="size-5" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-content truncate text-sm font-medium">{t.label}</p>
                  <p className="text-content-muted text-xs">
                    {t.sub} · {t.date}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p
                    className={cn(
                      'text-sm font-semibold',
                      inbound ? 'text-lime-deep' : 'text-content',
                    )}
                  >
                    {inbound ? '+' : '−'}
                    {naira(t.amount)}
                  </p>
                  {t.status === 'pending' && <p className="text-coral text-[11px]">Pending</p>}
                </div>
                <ChevronRight className="text-content-muted size-4 shrink-0" aria-hidden="true" />
              </button>
            );
          })}
        </Card>
      </div>

      {/* Transaction detail - modal on desktop, bottom sheet on mobile */}
      {isMobile ? (
        <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
          <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Transaction details</SheetTitle>
            </SheetHeader>
            {selected && <TxnDetails t={selected} />}
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Transaction details</DialogTitle>
            </DialogHeader>
            {selected && <TxnDetails t={selected} />}
          </DialogContent>
        </Dialog>
      )}

      {/* Add funds dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add funds</DialogTitle>
            <DialogDescription>Top up your Sync wallet to pay across the app.</DialogDescription>
          </DialogHeader>
          <form onSubmit={addFunds} className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {QUICK.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setAmount(String(q))}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-sm transition-colors',
                    Number(amount) === q
                      ? 'bg-ink text-cream border-ink'
                      : 'border-line/15 text-content hover:bg-ink/5',
                  )}
                >
                  {naira(q)}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="amount" className="text-content text-sm font-medium">
                Amount (₦)
              </label>
              <Input
                id="amount"
                type="number"
                min={1}
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                autoFocus
              />
            </div>
            <Button type="submit" disabled={!Number(amount) || pending} className="w-full">
              {pending
                ? 'Starting…'
                : `Add ${Number(amount) ? naira(Math.round(Number(amount))) : 'funds'}`}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function TxnDetails({ t }: { t: WalletTxn }) {
  const inbound = t.direction === 'in';
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'flex size-12 shrink-0 items-center justify-center rounded-full',
            inbound ? 'bg-lime/15 text-accent-fg' : 'bg-ink/5 text-content-muted',
          )}
        >
          {inbound ? <ArrowDownLeft className="size-6" /> : <ArrowUpRight className="size-6" />}
        </span>
        <div className="min-w-0">
          <p className="text-content truncate text-base font-medium">{t.label}</p>
          <p
            className={cn(
              'font-display text-2xl font-semibold',
              inbound ? 'text-lime-deep' : 'text-content',
            )}
          >
            {inbound ? '+' : '−'}
            {naira(t.amount)}
          </p>
        </div>
      </div>

      <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        <DetailRow label={inbound ? 'From' : 'To'} value={t.counterparty} />
        <DetailRow label="Account number" value={t.accountNumber} mono />
        <DetailRow label="Bank" value={t.bank} />
        <DetailRow label="Method" value={t.method} />
        <DetailRow label="Reference" value={t.reference} mono />
        <DetailRow label="Date" value={`${t.date} · ${t.time}`} />
        <DetailRow label="Fee" value={naira(t.fee)} />
        <DetailRow label="Status" value={t.status === 'pending' ? 'Pending' : 'Completed'} />
      </dl>
    </div>
  );
}

function DetailRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-content-muted font-mono text-[11px] tracking-wide uppercase">{label}</dt>
      <dd className={cn('text-content text-sm wrap-break-word', mono && 'font-mono')}>{value}</dd>
    </div>
  );
}
