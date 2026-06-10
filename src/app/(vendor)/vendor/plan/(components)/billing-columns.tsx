'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Invoice, InvoiceStatus } from './types';

function StatusBadge({ status }: { status: InvoiceStatus }) {
  if (status === 'Paid')
    return (
      <Badge variant="accent" className="bg-emerald-100 text-emerald-700">
        Paid
      </Badge>
    );
  if (status === 'Failed')
    return (
      <Badge variant="warning" className="bg-red-100 text-red-600">
        Failed
      </Badge>
    );
  return <Badge variant="muted">Pending</Badge>;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function createBillingColumns(
  onExportPDF: (invoice: Invoice) => void,
): ColumnDef<Invoice>[] {
  return [
    {
      accessorKey: 'id',
      header: 'INVOICE',
      cell: ({ row }) => (
        <span className="font-mono text-xs font-semibold text-violet-600">{row.original.id}</span>
      ),
    },
    {
      accessorKey: 'date',
      header: 'DATE',
      cell: ({ row }) => (
        <span className="text-content text-sm">{formatDate(row.original.date)}</span>
      ),
    },
    {
      accessorKey: 'plan',
      header: 'PLAN',
      cell: ({ row }) => <span className="text-content text-sm">{row.original.plan}</span>,
    },
    {
      accessorKey: 'amount',
      header: 'AMOUNT',
      cell: ({ row }) => (
        <span className="text-content font-mono text-sm">
          ₦{row.original.amount.toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'STATUS',
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      id: 'download',
      header: '',
      cell: ({ row }) => (
        <button
          aria-label="Download PDF"
          className="text-content-muted flex items-center gap-1.5 text-xs transition-colors hover:text-violet-600"
          onClick={(e) => {
            e.stopPropagation(); // prevent row click opening modal
            onExportPDF(row.original);
          }}
        >
          <Download className="h-3.5 w-3.5" />
          PDF
        </button>
      ),
    },
  ];
}

// Keep the old export for backwards compat — will be replaced by BillingHistoryTable usage
export const billingColumns = createBillingColumns(() => {});
