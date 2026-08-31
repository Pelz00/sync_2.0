/**
 * RoleDashboard - the ONE dashboard overview design, shared by every vendor
 * type. The variant (vendor, landlord, …) only changes the *content*: the live
 * profile block, the words (from config/dashboard-content), the data passed in
 * (KPIs, pending rows, chart), and the role-specific lower sections supplied as
 * `children`. There is no second copy of this layout.
 *
 * Server component: it reads the signed-in profile to personalise the eyebrow,
 * verified badge and avatar. The interactive bits (chart, pending list) are
 * client components it renders with plain data.
 */
import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, Dot, Wallet, ShoppingBag, Star, AlertTriangle } from 'lucide-react';
import { Avatar, AvatarFallback, Badge, Button } from '@/components/ui';
import type { LucideIcon } from 'lucide-react';
import { getDashboardProfile } from '@/components/layouts/dashboard-profile';
import { DASHBOARD_CONTENT, type DashboardVariant } from '@/config/dashboard-content';

import { CustomCard } from '../shared/card';
import { RevenueDatum } from './revenue-bar-chart';
import { RevenueChartPanel } from './revenue-chart-panel';
import { PendingRequestItem, PendingRequestList } from './pending-request-card';

export interface DashboardKpi {
  label: string;
  value: string;
  sub: string;
  icon?: LucideIcon;
  iconBg?: string;
}

/**
 * Presentation-only lookup: maps a KPI's label to the icon + badge tint
 * shown in its CustomCard. Never sourced from the database — the backend
 * only ever needs to send { label, value, sub }. Add an entry here whenever
 * a new KPI label is introduced; unmatched labels simply render without a
 * badge (CustomCard already handles icon/iconBg being undefined).
 */
const KPI_STYLE: Record<string, { icon: LucideIcon; iconBg: string }> = {
  'Total Revenue': { icon: Wallet, iconBg: 'bg-emerald-100' },
  Orders: { icon: ShoppingBag, iconBg: 'bg-blue-100' },
  'Store Rating': { icon: Star, iconBg: 'bg-amber-100' },
  'Stock Alerts': { icon: AlertTriangle, iconBg: 'bg-red-100' },
};

function withKpiStyle(kpi: DashboardKpi): DashboardKpi {
  const style = KPI_STYLE[kpi.label];
  return {
    ...kpi,
    icon: kpi.icon ?? style?.icon,
    iconBg: kpi.iconBg ?? style?.iconBg,
  };
}

interface RoleDashboardProps {
  variant: DashboardVariant;
  /** Headline + pending-list count. */
  count: number;
  kpis: DashboardKpi[];
  pending: PendingRequestItem[];
  /** Initial chart data, shown for the "weekly" period on first paint. */
  chart: RevenueDatum[];
  /** Role-specific lower sections (e.g. products & earnings, or hostels). */
  children?: ReactNode;
}

export async function RoleDashboard({
  variant,
  count,
  kpis,
  pending,
  chart,
  children,
}: RoleDashboardProps) {
  const content = DASHBOARD_CONTENT[variant];
  const profile = await getDashboardProfile(variant);
  const verified = profile.eyebrow.startsWith('Verified');
  const storeName = profile.metaValue;
  const { lead, accent } = content.headline(count);
  const ActionIcon = content.action?.icon;
  const styledKpis = kpis.map(withKpiStyle);

  return (
    <section className="flex flex-col gap-3">
      <h1 className="text-content-muted max-w-xl font-mono text-sm tracking-wide">
        {content.eyebrow}
        {storeName ? ` . ${storeName.toUpperCase()}` : ''}
      </h1>

      <div className="w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-2 flex items-center justify-between gap-3">
          <Badge
            variant="accent"
            className="border-line/50 flex items-center self-start border whitespace-normal sm:self-auto sm:whitespace-nowrap"
          >
            <span className="relative inline-flex items-center justify-center">
              <Dot size={20} className="relative z-10" />
              <Dot size={20} className="absolute animate-ping opacity-75" />
            </span>
            {verified ? profile.eyebrow : content.unverifiedBadge}
          </Badge>
        </div>
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
          {variant !== 'landlord' ? (
            <h2 className="text-section text-content font-display mt-2 font-medium md:mt-0">
              {lead} <span className="text-lime-deep">{accent}</span>
            </h2>
          ) : null}
          {content.action && (
            <Link href={content.action.href}>
              <Button className="mt-4 flex items-center justify-end gap-2 md:mt-0 md:justify-start">
                {ActionIcon && <ActionIcon />}
                {content.action.label}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {styledKpis.map(({ label, value, sub, icon: Icon, iconBg }) => (
          <CustomCard
            key={label}
            className="border-line/10 shadow-2xl"
            label={label}
            value={value}
            subtext={sub}
            icon={Icon && <Icon className="h-5 w-5" />}
            iconBg={iconBg}
          />
        ))}
      </div>

      {/* Pending list + revenue chart */}
      <section className="mt-5">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-content-muted text-body font-mono uppercase">
                {content.pendingTitle} . {count}
              </h2>
              {content.pendingViewAllHref && (
                <Link href={content.pendingViewAllHref}>
                  <Button
                    variant="outline"
                    className="text-content-muted border-transparent font-light"
                  >
                    View all <ArrowRight />
                  </Button>
                </Link>
              )}
            </div>
            <PendingRequestList items={pending} />
          </div>

          <div className="flex-1">
            <RevenueChartPanel initialData={chart} initialPeriod="weekly" />
          </div>
        </div>
      </section>

      {/* Role-specific lower sections */}
      {children}
    </section>
  );
}
