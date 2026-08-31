import { Wallet, TrendingUp, Clock3 } from 'lucide-react';
import { Card, CardHeader, CardDescription, CardContent } from '@/components/ui';
import { PageHeader } from '../(components)/shared/page-header';
import { EarningsChart } from '../(components)/earnings/earnings-chart';
import { TransactionsTable } from '../(components)/earnings/transactions-table';
import { PayoutCard, RequestPayoutButton } from '../(components)/earnings/payout-card';
import { availableBalance, pendingPayout, formatNaira } from '@/lib/landlord-data';

const summary = [
  { label: 'Available balance', value: formatNaira(availableBalance), icon: Wallet },
  { label: 'Pending payout', value: formatNaira(pendingPayout), icon: Clock3 },
  { label: 'Total earned (2026)', value: formatNaira(2450000), icon: TrendingUp },
];

export default function EarningsPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Earnings & Payouts" description="Track rent income and manage how you get paid.">
        <RequestPayoutButton balance={availableBalance} />
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-3">
        {summary.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex-row items-center justify-between gap-2">
              <CardDescription>{s.label}</CardDescription>
              <s.icon className="text-content-muted size-4" />
            </CardHeader>
            <CardContent>
              <p className="font-display text-card font-bold tabular-nums">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <EarningsChart />
        <PayoutCard />
      </div>

      <TransactionsTable />
    </div>
  );
}
