'use client';

import { Download, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Invoice, InvoiceStatus } from './types';

interface Props {
  invoice: Invoice | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExportPDF: (invoice: Invoice) => void;
}

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
    month: 'long',
    year: 'numeric',
  });
}

export function InvoiceDetailModal({ invoice, open, onOpenChange, onExportPDF }: Props) {
  if (!invoice) return null;

  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: 'Invoice ID',
      value: <span className="font-mono text-sm font-semibold text-violet-600">{invoice.id}</span>,
    },
    {
      label: 'Date',
      value: <span className="text-content text-sm">{formatDate(invoice.date)}</span>,
    },
    { label: 'Plan', value: <span className="text-content text-sm">{invoice.plan}</span> },
    {
      label: 'Amount',
      value: (
        <span className="text-content font-mono text-sm font-semibold">
          ₦{invoice.amount.toLocaleString('en-NG')}
        </span>
      ),
    },
    { label: 'Status', value: <StatusBadge status={invoice.status} /> },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Invoice Details</span>
          </DialogTitle>
        </DialogHeader>

        {/* Detail rows */}
        <div className="divide-line/10 border-line/10 bg-surface-deep divide-y rounded-xl border">
          {rows.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between px-4 py-3">
              <span className="text-content-muted font-mono text-[10px] tracking-widest uppercase">
                {label}
              </span>
              {value}
            </div>
          ))}
        </div>

        {/* Export PDF */}
        <Button
          className="w-full gap-2 bg-lime-600 text-white hover:bg-lime-700"
          onClick={() => onExportPDF(invoice)}
        >
          <Download className="h-4 w-4" />
          Export as PDF
        </Button>
      </DialogContent>
    </Dialog>
  );
}
