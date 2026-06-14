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
import { ArrowRight, ChevronDown, Dot } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import type { LucideIcon } from 'lucide-react';
import { getDashboardProfile } from '@/components/layouts/dashboard-profile';
import { DASHBOARD_CONTENT, type DashboardVariant } from '@/config/dashboard-content';
import { RevenueBarChart, type RevenueDatum } from './revenue-bar-chart';
import { PendingRequestList, type PendingRequestItem } from './pending-request-card';

export interface DashboardKpi {
  label: string;
  value: string;
  sub: string;
  icon?: LucideIcon;
}

interface RoleDashboardProps {
  variant: DashboardVariant;
  /** Headline + pending-list count. */
  count: number;
  kpis: DashboardKpi[];
  pending: PendingRequestItem[];
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

  return (
    <section className="flex flex-col gap-3">
      <h1 className="text-content-muted max-w-xl font-mono text-sm tracking-wide">
        {content.eyebrow}
        {storeName ? ` . ${storeName.toUpperCase()}` : ''}
      </h1>

      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-section text-content font-display mt-2 font-medium">
          {lead} <span className="text-lime-deep">{accent}</span>
        </h2>
        <div>
          <div className="flex items-center gap-3">
            <Badge
              variant="accent"
              className="border-line flex items-center self-start border whitespace-normal sm:self-auto sm:whitespace-nowrap"
            >
              <Dot size={20} />
              {verified ? profile.eyebrow : content.unverifiedBadge}
            </Badge>
            <Avatar className="size-10">
              <AvatarFallback>{profile.initial}</AvatarFallback>
            </Avatar>
          </div>
          {content.action && (
            <Link href={content.action.href}>
              <Button className="mt-4 flex items-center gap-2">
                {ActionIcon && <ActionIcon />}
                {content.action.label}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {kpis.map(({ label, value, sub, icon: Icon }) => (
          <Card key={label} className="border-line/10 bg-transparent shadow-2xl">
            <CardHeader>
              <CardTitle className="text-content-muted font-mono tracking-wide">{label}</CardTitle>
            </CardHeader>
            <CardContent className="text-section font-body text-3xl font-bold">
              <p>{value}</p>
              <CardDescription className="mt-3.5 border-transparent">
                <span className="text-lime-deep font-body flex items-center gap-1 text-sm font-medium">
                  {Icon && <Icon className="size-3.75" />}
                  {sub}
                </span>
              </CardDescription>
            </CardContent>
          </Card>
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
            <Card className="border-cream-deep mb-4 h-full border bg-transparent">
              <CardHeader>
                <CardTitle className="text-content-muted flex items-center justify-between font-mono tracking-wide">
                  <p>REVENUE . LAST 12 WEEKS</p>
                  <Button
                    variant="outline"
                    className="text-content-muted mt-2 flex items-center gap-1 border-transparent font-light"
                  >
                    Weekly
                    <ChevronDown className="size-3.75" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RevenueBarChart data={chart} />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Role-specific lower sections */}
      {children}
    </section>
  );
}
