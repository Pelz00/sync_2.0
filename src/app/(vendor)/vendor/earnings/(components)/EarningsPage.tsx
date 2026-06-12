'use client';

import React, { useState } from 'react';
import {
  Download,
  Wallet,
  Clock,
  TrendingUp,
  ArrowDownToLine,
  ChevronRight,
  Receipt,
} from 'lucide-react';

import { EarningsData, Transaction } from './types';
import { StatCard } from './StatCard';
import { RevenueChart } from './RevenueChart';
import { TopProductsChart } from './TopProductsChart';
import { ChangeAccountDialog } from './ChangeAccountDialog';
import { WithdrawDialog } from './WithdrawDialog';
import { Button } from '@/components/ui';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DateRangePicker, DateRange } from '@/components/shared/date-range-picker';
import { Modal } from '@/components/shared/custom-modal';

type ChartPeriod = '3M' | '6M' | '1Y';

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const mockData: EarningsData = {
  availableBalance: 248500,
  pendingBalance: 35600,
  lifetimeEarnings: 3840000,
  totalWithdrawn: 3556000,
  lifetimeGrowthPct: 12,
  totalPayouts: 14,
  bankName: 'GTBank',
  accountNumber: '0123456789',
  accountHolderName: 'John Adeyemi',
  nextPayoutDate: 'Jun 7, 2026',
  monthlyRevenue: [
    { label: 'Jan', revenue: 180000 },
    { label: 'Feb', revenue: 240000 },
    { label: 'Mar', revenue: 290000 },
    { label: 'Apr', revenue: 350000 },
    { label: 'May', revenue: 380000 },
    { label: 'Jun', revenue: 360000 },
    { label: 'Jul', revenue: 420000 },
    { label: 'Aug', revenue: 460000 },
    { label: 'Sep', revenue: 440000 },
    { label: 'Oct', revenue: 480000 },
    { label: 'Nov', revenue: 510000 },
    { label: 'Dec', revenue: 530000 },
  ],
  weeklyRevenue: [
    { label: 'Feb W1', revenue: 3200 },
    { label: 'Feb W2', revenue: 4100 },
    { label: 'Feb W3', revenue: 3700 },
    { label: 'Mar W1', revenue: 5200 },
    { label: 'Mar W2', revenue: 4600 },
    { label: 'Mar W3', revenue: 5600 },
    { label: 'Mar W4', revenue: 5100 },
    { label: 'Apr W1', revenue: 6300 },
    { label: 'Apr W2', revenue: 6000 },
    { label: 'Apr W3', revenue: 6800 },
    { label: 'Apr W4', revenue: 6500 },
    { label: 'May W1', revenue: 7800 },
  ],
  topProducts: [
    { name: 'Akara + Ogi', revenue: 78000 },
    { name: 'Jollof Rice', revenue: 64000 },
    { name: 'Egusi Soup', revenue: 52000 },
    { name: 'Suya Combo', revenue: 48000 },
    { name: 'Ofada Rice', revenue: 31000 },
  ],
  transactions: [
    {
      id: 'TXN-1021',
      description: 'Order #ORD-5821',
      type: 'order',
      customer: 'Aisha Bello',
      date: '1 Jun 2026',
      amount: 8400,
      status: 'Settled',
    },
    {
      id: 'TXN-1020',
      description: 'Order #ORD-5820',
      type: 'order',
      customer: 'Peter Adeyemi',
      date: '1 Jun 2026',
      amount: 10500,
      status: 'Settled',
    },
    {
      id: 'TXN-1019',
      description: 'Withdrawal to GTBank ****4321',
      type: 'withdrawal',
      date: '31 May 2026',
      amount: -90000,
      status: 'Completed',
    },
    {
      id: 'TXN-1018',
      description: 'Order #ORD-5818',
      type: 'order',
      customer: 'Muiz Oladele',
      date: '31 May 2026',
      amount: 5000,
      status: 'Settled',
    },
    {
      id: 'TXN-1017',
      description: 'Refund #ORD-5817',
      type: 'refund',
      customer: 'Chuka Eze',
      date: '30 May 2026',
      amount: -7800,
      status: 'Processed',
    },
    {
      id: 'TXN-1016',
      description: 'Order #ORD-5816',
      type: 'order',
      customer: 'Ngozi Obi',
      date: '30 May 2026',
      amount: 7200,
      status: 'Settled',
    },
    {
      id: 'TXN-1015',
      description: 'Withdrawal to GTBank ****4321',
      type: 'withdrawal',
      date: '24 May 2026',
      amount: -75000,
      status: 'Completed',
    },
    {
      id: 'TXN-1014',
      description: 'Order #ORD-5814',
      type: 'order',
      customer: 'Femi Adeleke',
      date: '23 May 2026',
      amount: 12300,
      status: 'Settled',
    },
    {
      id: 'TXN-1013',
      description: 'Order #ORD-5813',
      type: 'order',
      customer: 'Sola Balogun',
      date: '22 May 2026',
      amount: 6700,
      status: 'Settled',
    },
    {
      id: 'TXN-1012',
      description: 'Refund #ORD-5812',
      type: 'refund',
      customer: 'Tunde Akin',
      date: '20 May 2026',
      amount: -4200,
      status: 'Processed',
    },
  ],
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

function TxnStatusBadge({ status }: { status: Transaction['status'] }) {
  const map: Record<Transaction['status'], string> = {
    Settled: 'border border-emerald-500/30 text-emerald-600 bg-emerald-50',
    Completed: 'border border-violet-500/30 text-violet-600 bg-violet-50',
    Processed: 'border border-orange-500/30 text-orange-600 bg-orange-50',
    Pending: 'border border-yellow-500/30 text-yellow-600 bg-yellow-50',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[10px] tracking-wide uppercase ${map[status]}`}
    >
      {status}
    </span>
  );
}

function TxnDot({ type }: { type: Transaction['type'] }) {
  const color =
    type === 'order' ? 'bg-emerald-500' : type === 'refund' ? 'bg-red-500' : 'bg-content-muted';
  return <span className={`inline-block h-2 w-2 shrink-0 rounded-full ${color}`} />;
}

// ─── Transaction Detail Modal ──────────────────────────────────────────────────

function TransactionDetailModal({
  txn,
  onClose,
}: {
  txn: Transaction | null;
  onClose: () => void;
}) {
  if (!txn) return null;

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: 'Transaction ID', value: <span className="font-mono text-violet-600">{txn.id}</span> },
    {
      label: 'Type',
      value: (
        <div className="flex items-center gap-2">
          <TxnDot type={txn.type} />
          <span className="capitalize">{txn.type}</span>
        </div>
      ),
    },
    { label: 'Description', value: txn.description },
    ...(txn.customer ? [{ label: 'Customer', value: txn.customer }] : []),
    { label: 'Date', value: txn.date },
    {
      label: 'Amount',
      value: (
        <span
          className={`font-display font-semibold ${txn.amount > 0 ? 'text-emerald-600' : 'text-red-500'}`}
        >
          {txn.amount > 0 ? '+' : ''}₦{Math.abs(txn.amount).toLocaleString()}
        </span>
      ),
    },
    { label: 'Status', value: <TxnStatusBadge status={txn.status} /> },
  ];

  return (
    <Modal
      open={!!txn}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      title="Transaction Details"
      description={txn.id}
      className="max-w-sm"
    >
      <div className="divide-line/10 divide-y">
        {rows.map(({ label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
          >
            <span className="text-content-muted shrink-0 font-mono text-[10px] tracking-widest uppercase">
              {label}
            </span>
            <span className="text-content text-right text-sm">{value}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
}

// ─── CSV helpers (unchanged) ───────────────────────────────────────────────────

function buildCsvRows(data: EarningsData, transactions: Transaction[], range?: DateRange) {
  return [
    ['Sync Vendor Account Statement'],
    [
      `Generated: ${new Date().toLocaleDateString('en-NG', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}`,
    ],
    [`Account: ${data.bankName} — ${data.accountNumber} (${data.accountHolderName})`],
    range?.from
      ? [
          `Period: ${range.from.toLocaleDateString('en-NG')}${
            range.to ? ' – ' + range.to.toLocaleDateString('en-NG') : ''
          }`,
        ]
      : ['Period: All time'],
    [''],
    ['TRANSACTION ID', 'DESCRIPTION', 'DATE', 'AMOUNT (₦)', 'STATUS'],
    ...transactions.map((t) => [
      t.id,
      t.customer ? `${t.description} – ${t.customer}` : t.description,
      t.date,
      t.amount > 0 ? `+${t.amount.toLocaleString()}` : t.amount.toLocaleString(),
      t.status,
    ]),
    [''],
    ['SUMMARY'],
    ['Available Balance', `₦${data.availableBalance.toLocaleString()}`],
    ['Pending Balance', `₦${data.pendingBalance.toLocaleString()}`],
    ['Lifetime Earnings', `₦${data.lifetimeEarnings.toLocaleString()}`],
    ['Total Withdrawn', `₦${data.totalWithdrawn.toLocaleString()}`],
  ];
}

function downloadCsv(rows: string[][], filename: string) {
  const csv = rows.map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function filterByRange(transactions: Transaction[], range: DateRange) {
  if (!range.from) return transactions;
  const from = range.from;
  const to = range.to ?? range.from;
  return transactions.filter((t) => {
    const d = new Date(t.date);
    return d >= from && d <= to;
  });
}

// ─── Page ──────────────────────────────────────────────────────────────────────

interface EarningsPageProps {
  data?: EarningsData;
}

export default function EarningsPage({ data = mockData }: EarningsPageProps) {
  const [changeAccountOpen, setChangeAccountOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>('1Y');
  const [dateRange, setDateRange] = useState<DateRange>({ from: null, to: null });
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null); // 👈 new
  // Add this state near the top of EarningsPage
  const [accountDetails, setAccountDetails] = useState({
    bankName: data.bankName,
    accountNumber: data.accountNumber,
    accountHolderName: data.accountHolderName,
  });

  const handleWithdrawClick = () => setWithdrawOpen(true);

  const chartData =
    chartPeriod === '3M'
      ? data.monthlyRevenue.slice(-3)
      : chartPeriod === '6M'
        ? data.monthlyRevenue.slice(-6)
        : data.monthlyRevenue;

  const filteredTransactions = filterByRange(data.transactions, dateRange);

  function handleExportAll() {
    const rows = buildCsvRows(data, data.transactions);
    downloadCsv(rows, `sync-statement-all-${new Date().toISOString().slice(0, 10)}.csv`);
  }

  function handleExportFiltered() {
    const rows = buildCsvRows(data, filteredTransactions, dateRange);
    downloadCsv(rows, `sync-statement-filtered-${new Date().toISOString().slice(0, 10)}.csv`);
  }

  return (
    <>
      {/* Update the ChangeAccountDialog usage */}
      <ChangeAccountDialog
        open={changeAccountOpen}
        onClose={() => setChangeAccountOpen(false)}
        onSave={(updated) =>
          setAccountDetails({
            bankName: updated.bankName,
            accountNumber: updated.accountNumber,
            accountHolderName: updated.holderName,
          })
        }
        current={{
          bankName: accountDetails.bankName,
          accountNumber: accountDetails.accountNumber,
          holderName: accountDetails.accountHolderName,
        }}
      />
      <WithdrawDialog
        open={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        availableBalance={data.availableBalance}
      />
      <TransactionDetailModal // 👈 new
        txn={selectedTxn}
        onClose={() => setSelectedTxn(null)}
      />
      <div className="bg-cream-deep min-h-screen space-y-6 px-6 py-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-content text-2xl font-bold">Earnings</h1>
            <p className="text-content-muted mt-0.5 text-sm">Financial overview &amp; payouts</p>
          </div>
          <Button
            onClick={handleWithdrawClick}
            className="font-display flex items-center gap-2 rounded-xl bg-lime-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-lime-600 active:scale-95"
          >
            <Receipt className="h-4 w-4" />
            Withdraw Funds
          </Button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Available Balance"
            value={`₦${data.availableBalance.toLocaleString()}`}
            subtext="Ready to withdraw"
            subtextPositive
            icon={<Wallet className="h-5 w-5 text-white" />}
            iconBg="bg-emerald-500"
          />
          <StatCard
            label="Pending Balance"
            value={`₦${data.pendingBalance.toLocaleString()}`}
            subtext="Clears in 24-48h"
            icon={<Clock className="h-5 w-5 text-white" />}
            iconBg="bg-orange-400"
          />
          <StatCard
            label="Total Earnings"
            value={`₦${data.lifetimeEarnings.toLocaleString()}`}
            subtext={`+${data.lifetimeGrowthPct}% vs last yr`}
            subtextPositive
            icon={<TrendingUp className="h-5 w-5 text-white" />}
            iconBg="bg-violet-600"
          />
          <StatCard
            label="Total Withdrawn"
            value={`₦${data.totalWithdrawn.toLocaleString()}`}
            subtext={`${data.totalPayouts} payouts total`}
            icon={<ArrowDownToLine className="h-5 w-5 text-white" />}
            iconBg="bg-ink"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
          <RevenueChart
            title="Monthly Revenue"
            data={chartData}
            variant="area"
            showPeriodSelector
            activePeriod={chartPeriod}
            onPeriodChange={setChartPeriod}
            height={230}
          />
          <TopProductsChart data={data.topProducts} />
        </div>

        {/* Bank Account Bar */}
        <div className="bg-panel shadow-card border-line/10 flex items-center justify-between gap-4 rounded-xl border px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-sm font-bold text-white">
              {accountDetails.bankName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-display text-content text-sm font-semibold">
                {accountDetails.bankName} — {accountDetails.accountNumber}
              </p>
              <p className="text-content-muted text-xs">
                {accountDetails.accountHolderName} · Next payout: {data.nextPayoutDate}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setChangeAccountOpen(true)}
            className="border-line/20 text-content hover:bg-surface-deep flex items-center gap-1.5 rounded-lg border bg-transparent px-4 py-2 text-sm font-medium transition-colors"
          >
            Change Account
            <ChevronRight className="text-content-muted h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Transaction History Table */}
        <div className="bg-panel shadow-card border-line/10 overflow-hidden rounded-xl border">
          {/* Table Header */}
          <div className="border-line/5 flex items-center justify-between gap-3 border-b px-5 py-4">
            <span className="font-display text-content text-base font-semibold">
              Transaction History
            </span>
            <div className="flex items-center gap-2">
              <DateRangePicker value={dateRange} onChange={setDateRange} />
              {dateRange.from && (
                <Button
                  onClick={handleExportFiltered}
                  className="flex items-center gap-1.5 rounded-lg bg-transparent px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-lime-600"
                >
                  <Download className="h-3.5 w-3.5" />
                  Export Filtered
                </Button>
              )}
              <Button
                onClick={handleExportAll}
                className="border-line/20 flex items-center gap-1.5 rounded-lg border-none bg-lime-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-lime-600"
              >
                <Download className="h-3.5 w-3.5" />
                Export All
              </Button>
            </div>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-5 font-mono text-[10px] tracking-widest uppercase">
                  Transaction ID
                </TableHead>
                <TableHead className="font-mono text-[10px] tracking-widest uppercase">
                  Description
                </TableHead>
                <TableHead className="font-mono text-[10px] tracking-widest uppercase">
                  Date
                </TableHead>
                <TableHead className="text-right font-mono text-[10px] tracking-widest uppercase">
                  Amount
                </TableHead>
                <TableHead className="px-5 text-right font-mono text-[10px] tracking-widest uppercase">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredTransactions.length ? (
                filteredTransactions.map((txn) => (
                  <TableRow
                    key={txn.id}
                    onClick={() => setSelectedTxn(txn)} // 👈 new
                    className="hover:bg-surface-deep/40 cursor-pointer"
                  >
                    <TableCell className="px-5 py-3.5">
                      <span className="font-mono text-xs font-medium text-violet-600">
                        {txn.id}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-2">
                        <TxnDot type={txn.type} />
                        <span className="text-content text-sm">
                          {txn.customer ? `${txn.description} – ${txn.customer}` : txn.description}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-content-muted py-3.5 text-sm">{txn.date}</TableCell>
                    <TableCell
                      className={`font-display py-3.5 text-right text-sm font-semibold ${
                        txn.amount > 0 ? 'text-emerald-600' : 'text-red-500'
                      }`}
                    >
                      {txn.amount > 0 ? '+' : ''}₦{Math.abs(txn.amount).toLocaleString()}
                    </TableCell>
                    <TableCell className="px-5 py-3.5 text-right">
                      <TxnStatusBadge status={txn.status} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-content-muted h-24 text-center text-sm">
                    No transactions found for this date range.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
