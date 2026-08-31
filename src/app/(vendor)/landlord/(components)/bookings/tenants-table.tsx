'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  CalendarDays,
  Check,
  Download,
  Eye,
  Filter,
  MessageSquare,
  Search,
  ShieldCheck,
  Users,
} from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  Button,
  Card,
  CardContent,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { formatDate, formatNaira, initials, properties, type Tenant } from '@/lib/landlord-data';
import { cn } from '@/lib/utils';
import { StatusBadge } from '../shared/status-badge';
import { TenantSheet } from './tenant-sheet';

type PaymentFilter = 'all' | Tenant['paymentStatus'];

export function TenantsTable({ tenants }: { tenants: Tenant[] }) {
  const [query, setQuery] = useState('');
  const [propertyFilter, setPropertyFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState<PaymentFilter>('all');
  const propertyOptions = useMemo(
    () => Array.from(new Set(tenants.map((tenant) => tenant.property))),
    [tenants],
  );
  const filteredTenants = tenants.filter((tenant) => {
    const needle = query.toLowerCase();
    return (
      (!query ||
        tenant.name.toLowerCase().includes(needle) ||
        tenant.email.toLowerCase().includes(needle)) &&
      (propertyFilter === 'all' || tenant.property === propertyFilter) &&
      (paymentFilter === 'all' || tenant.paymentStatus === paymentFilter)
    );
  });
  const counts = {
    paid: tenants.filter((tenant) => tenant.paymentStatus === 'paid').length,
    due: tenants.filter((tenant) => tenant.paymentStatus === 'due').length,
    overdue: tenants.filter((tenant) => tenant.paymentStatus === 'overdue').length,
  };

  function exportTenants() {
    const rows = [
      ['Tenant', 'Email', 'Property', 'Move in', 'Lease ends', 'Payment status'],
      ...filteredTenants.map((tenant) => [
        tenant.name,
        tenant.email,
        tenant.property,
        tenant.moveIn,
        tenant.leaseEnd,
        tenant.paymentStatus,
      ]),
    ];
    const url = URL.createObjectURL(
      new Blob([rows.map((row) => row.map(csvCell).join(',')).join('\n')], { type: 'text/csv' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = 'current-tenants.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-5">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <TenantMetric
          icon={Users}
          tone="lime"
          label="Active Tenants"
          value={tenants.length}
          detail={`Across ${propertyOptions.length} properties`}
        />
        <TenantMetric
          icon={Check}
          tone="lime"
          label="Paid"
          value={counts.paid}
          detail="This month"
        />
        <TenantMetric
          icon={CalendarDays}
          tone="amber"
          label="Due"
          value={counts.due}
          detail="This month"
        />
        <TenantMetric
          icon={Filter}
          tone="coral"
          label="Overdue"
          value={counts.overdue}
          detail="This month"
        />
      </section>
      <Card className="border-line/10 overflow-hidden rounded-3xl border shadow-sm">
        <CardContent className="p-0">
          <div className="border-line/10 flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center">
            <div className="relative min-w-0 lg:w-64">
              <Search className="text-content-muted pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search tenants..."
                className="pl-9"
              />
            </div>
            <Select value={propertyFilter} onValueChange={setPropertyFilter}>
              <SelectTrigger className="lg:w-56">
                <SelectValue placeholder="All Properties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                {propertyOptions.map((property) => (
                  <SelectItem key={property} value={property}>
                    {property}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={paymentFilter}
              onValueChange={(value) => setPaymentFilter(value as PaymentFilter)}
            >
              <SelectTrigger className="lg:w-56">
                <span className="flex items-center gap-2">
                  <Filter className="size-4" />
                  <SelectValue placeholder="All Payment Status" />
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payment Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="due">Due</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="lg:ml-auto" onClick={exportTenants}>
              <Download className="size-4" /> Export
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Tenant</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Lease period</TableHead>
                <TableHead>Next payment</TableHead>
                <TableHead>Payment status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={6} className="text-content-muted py-14 text-center">
                    No tenants match these filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTenants.map((tenant) => <TenantRow key={tenant.id} tenant={tenant} />)
              )}
            </TableBody>
          </Table>
          <div className="text-content-muted border-line/10 flex items-center justify-between border-t px-5 py-4 text-sm">
            <span>
              Showing {filteredTenants.length} of {tenants.length} tenants
            </span>
            <span className="bg-lime/15 text-lime-deep grid size-9 place-items-center rounded-lg font-medium">
              1
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TenantRow({ tenant }: { tenant: Tenant }) {
  const property = properties.find((item) => item.id === tenant.propertyId);
  const paymentMessage = {
    paid: `Paid on ${formatDate(tenant.moveIn)}`,
    due: 'Payment due soon',
    overdue: 'Payment overdue',
  }[tenant.paymentStatus];
  const leaseTone =
    tenant.paymentStatus === 'paid'
      ? 'bg-lime/15 text-lime-deep'
      : tenant.paymentStatus === 'due'
        ? 'bg-amber-500/15 text-amber-700'
        : 'bg-coral/15 text-coral';
  return (
    <TableRow className="hover:bg-surface-deep/50">
      <TableCell>
        <div className="flex min-w-52 items-center gap-3">
          <Avatar className="bg-surface-deep size-11">
            <AvatarFallback>{initials(tenant.name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 font-medium">
              <span className="truncate">{tenant.name}</span>
              {tenant.studentVerified ? (
                <ShieldCheck className="text-lime-deep size-4 shrink-0" />
              ) : null}
            </p>
            <p className="text-content-muted truncate text-xs">{tenant.email}</p>
            <p className="text-content-muted mt-1 text-xs">{tenant.phone}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <p className="min-w-32 font-medium">{tenant.property}</p>
        <p className="text-content-muted mt-1 text-xs">{property?.roomsTotal ?? '—'} rooms</p>
      </TableCell>
      <TableCell>
        <p className="flex min-w-36 items-center gap-1.5 text-sm">
          <CalendarDays className="text-content-muted size-4" /> {formatDate(tenant.moveIn)}
        </p>
        <p className="mt-1 pl-5.5 text-sm">– {formatDate(tenant.leaseEnd)}</p>
        <span className={cn('mt-2 inline-flex rounded-full px-2 py-0.5 text-xs', leaseTone)}>
          Lease active
        </span>
      </TableCell>
      <TableCell>
        <p className="min-w-28 font-medium">{formatDate(tenant.leaseEnd)}</p>
        <p className="mt-1 text-sm">{formatNaira(property?.price ?? 0)}</p>
      </TableCell>
      <TableCell>
        <StatusBadge status={tenant.paymentStatus} />
        <p className="text-content-muted mt-2 text-xs">{paymentMessage}</p>
      </TableCell>
      <TableCell>
        <div className="flex justify-end gap-2">
          <TenantSheet
            tenant={tenant}
            trigger={
              <Button variant="outline" size="icon" aria-label={`View ${tenant.name}`}>
                <Eye className="size-4" />
              </Button>
            }
          />
          <Button variant="outline" size="icon" asChild>
            <Link
              href={`/landlord/inbox?tenantId=${encodeURIComponent(tenant.id)}`}
              aria-label={`Message ${tenant.name}`}
            >
              <MessageSquare className="size-4" />
            </Link>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

function TenantMetric({
  icon: Icon,
  tone,
  label,
  value,
  detail,
}: {
  icon: typeof Users;
  tone: 'lime' | 'amber' | 'coral';
  label: string;
  value: number;
  detail: string;
}) {
  const toneClass = {
    lime: 'bg-lime/10 text-lime-deep',
    amber: 'bg-amber-500/10 text-amber-600',
    coral: 'bg-coral/10 text-coral',
  };
  return (
    <Card className="border-line/10 rounded-2xl border shadow-sm">
      <CardContent className="flex items-center gap-4 p-5">
        <span className={`${toneClass[tone]} grid size-12 place-items-center rounded-full`}>
          <Icon className="size-5" />
        </span>
        <div>
          <p className="text-content-muted text-sm">{label}</p>
          <p className="font-display mt-1 text-2xl font-semibold">{value}</p>
          <p className="text-content-muted mt-1 text-xs">{detail}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function csvCell(value: string) {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}
