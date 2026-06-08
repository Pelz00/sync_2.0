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
      description: 'Order #ORD-5819',
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
      description: 'Order #ORD-5815',
      type: 'order',
      customer: 'Femi Adeleke',
      date: '23 May 2026',
      amount: 12300,
      status: 'Settled',
    },
    {
      id: 'TXN-1013',
      description: 'Order #ORD-5814',
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

function exportStatement(data: EarningsData) {
  const rows = [
    ['Sync Vendor Account Statement'],
    [
      `Generated: ${new Date().toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}`,
    ],
    [`Account: ${data.bankName} — ${data.accountNumber} (${data.accountHolderName})`],
    [''],
    ['TRANSACTION ID', 'DESCRIPTION', 'DATE', 'AMOUNT (₦)', 'STATUS'],
    ...data.transactions.map((t) => [
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

  const csv = rows.map((r) => r.join(',')).join('');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sync-statement-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

interface EarningsPageProps {
  data?: EarningsData;
}

export default function EarningsPage({ data = mockData }: EarningsPageProps) {
  const [changeAccountOpen, setChangeAccountOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>('1Y');

  const handleWithdrawClick = () => setWithdrawOpen(true);

  const chartData =
    chartPeriod === '3M'
      ? data.monthlyRevenue.slice(-3)
      : chartPeriod === '6M'
        ? data.monthlyRevenue.slice(-6)
        : data.monthlyRevenue;

  return (
    <>
      <ChangeAccountDialog
        open={changeAccountOpen}
        onClose={() => setChangeAccountOpen(false)}
        current={{
          bankName: data.bankName,
          accountNumber: data.accountNumber,
          holderName: data.accountHolderName,
        }}
      />
      <WithdrawDialog
        open={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        availableBalance={data.availableBalance}
      />

      <div className="bg-cream-deep min-h-screen space-y-6 px-6 py-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-content text-2xl font-bold">Earnings</h1>
            <p className="text-content-muted mt-0.5 text-sm">Financial overview &amp; payouts</p>
          </div>
          <button
            onClick={handleWithdrawClick}
            className="font-display flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-emerald-600 active:scale-95"
          >
            <Receipt className="h-4 w-4" />
            Withdraw Funds
          </button>
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
            label="Lifetime Earnings"
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
              {data.bankName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-display text-content text-sm font-semibold">
                {data.bankName} — {data.accountNumber}
              </p>
              <p className="text-content-muted text-xs">
                {data.accountHolderName} · Next payout: {data.nextPayoutDate}
              </p>
            </div>
          </div>
          <button
            onClick={() => setChangeAccountOpen(true)}
            className="border-line/20 text-content hover:bg-surface-deep flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
          >
            Change Account
            <ChevronRight className="text-content-muted h-3.5 w-3.5" />
          </button>
        </div>

        {/* Transaction History Table */}
        <div className="bg-panel shadow-card border-line/10 overflow-hidden rounded-xl border">
          <div className="border-line/5 flex items-center justify-between border-b px-5 py-4">
            <span className="font-display text-content text-base font-semibold">
              Transaction History
            </span>
            <button
              onClick={() => exportStatement(data)}
              className="border-line/20 text-content hover:bg-surface-deep flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-line/5 border-b">
                  <th className="text-content-muted h-11 px-5 text-left font-mono text-[10px] tracking-widest uppercase">
                    Transaction ID
                  </th>
                  <th className="text-content-muted h-11 px-4 text-left font-mono text-[10px] tracking-widest uppercase">
                    Description
                  </th>
                  <th className="text-content-muted h-11 px-4 text-left font-mono text-[10px] tracking-widest uppercase">
                    Date
                  </th>
                  <th className="text-content-muted h-11 px-4 text-right font-mono text-[10px] tracking-widest uppercase">
                    Amount
                  </th>
                  <th className="text-content-muted h-11 px-5 text-right font-mono text-[10px] tracking-widest uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.transactions.map((txn) => (
                  <tr
                    key={txn.id}
                    className="border-line/5 hover:bg-surface-deep/40 border-b transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs font-medium text-violet-600">
                        {txn.id}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <TxnDot type={txn.type} />
                        <span className="text-content text-sm">
                          {txn.customer ? `${txn.description} – ${txn.customer}` : txn.description}
                        </span>
                      </div>
                    </td>
                    <td className="text-content-muted px-4 py-3.5 text-sm">{txn.date}</td>
                    <td
                      className={`font-display px-4 py-3.5 text-right text-sm font-semibold ${txn.amount > 0 ? 'text-emerald-600' : 'text-red-500'}`}
                    >
                      {txn.amount > 0 ? '+' : ''}₦{Math.abs(txn.amount).toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <TxnStatusBadge status={txn.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
