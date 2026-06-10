'use client';

import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  PaginationState,
} from '@tanstack/react-table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { BillingHistoryToolbar } from './BillingHistoryToolbar';
import { createBillingColumns } from './billing-columns';
import { InvoiceDetailModal } from './InvoiceDetailModal';
import type { Invoice } from './types';

interface Props {
  invoices: Invoice[];
}

function exportToCSV(rows: Invoice[], filename: string) {
  const headers = ['Invoice', 'Date', 'Plan', 'Amount (NGN)', 'Status'];

  const escape = (val: string | number) => {
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const lines = rows.map((r) =>
    [escape(r.id), escape(r.date), escape(r.plan), r.amount, escape(r.status)].join(','),
  );
  // Use \r\n line endings for Excel compatibility
  const csv = [headers.join(','), ...lines].join('\r\n');
  // Prepend UTF-8 BOM so Excel opens with correct encoding
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportToPDF(invoice: Invoice) {
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' });

  const statusColour =
    invoice.status === 'Paid' ? '#065f46' : invoice.status === 'Failed' ? '#991b1b' : '#92400e';
  const statusBg =
    invoice.status === 'Paid' ? '#d1fae5' : invoice.status === 'Failed' ? '#fee2e2' : '#fef3c7';

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>${invoice.id}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f9fafb; display: flex; justify-content: center; padding: 40px 16px; }
    .card { background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); padding: 40px 48px; width: 480px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
    .brand { font-size: 22px; font-weight: 800; color: #111; }
    .brand span { color: #65a30d; }
    .invoice-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; text-align: right; }
    .invoice-id { font-size: 18px; font-weight: 700; color: #4c1d95; font-family: monospace; }
    hr { border: none; border-top: 1px solid #f3f4f6; margin: 24px 0; }
    .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f9fafb; }
    .row:last-child { border-bottom: none; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af; }
    .value { font-size: 14px; color: #111; font-weight: 500; }
    .amount { font-family: monospace; font-size: 16px; font-weight: 700; color: #111; }
    .badge { display: inline-block; padding: 3px 10px; border-radius: 99px; font-size: 12px; font-weight: 600; background: ${statusBg}; color: ${statusColour}; }
    .footer { margin-top: 32px; font-size: 11px; color: #d1d5db; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="brand">Sync<span>.</span></div>
      <div>
        <div class="invoice-label">Invoice</div>
        <div class="invoice-id">${invoice.id}</div>
      </div>
    </div>
    <hr/>
    <div class="row"><span class="label">Date</span><span class="value">${formatDate(invoice.date)}</span></div>
    <div class="row"><span class="label">Plan</span><span class="value">${invoice.plan}</span></div>
    <div class="row"><span class="label">Amount</span><span class="amount">₦${invoice.amount.toLocaleString('en-NG')}</span></div>
    <div class="row"><span class="label">Status</span><span class="badge">${invoice.status}</span></div>
    <div class="footer">Generated on ${new Date().toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })} · sync.ng</div>
  </div>
</body>
</html>`;

  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => {
    win.print();
    win.close();
  }, 400);
}

export function BillingHistoryTable({ invoices }: Props) {
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Apply date range filter on top of TanStack global filter
  const filteredData = useMemo(() => {
    return invoices.filter((inv) => {
      const d = new Date(inv.date);
      if (dateRange.from && d < new Date(dateRange.from)) return false;
      if (dateRange.to && d > new Date(dateRange.to)) return false;
      return true;
    });
  }, [invoices, dateRange]);

  const columns = useMemo(() => createBillingColumns(exportToPDF), []);

  const table = useReactTable({
    data: filteredData,
    columns: columns,
    state: { globalFilter: search, pagination },
    onGlobalFilterChange: setSearch,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  function handleExportAll() {
    exportToCSV(invoices, 'billing-history-all.csv');
  }

  function handleExportFiltered() {
    const visible = table.getFilteredRowModel().rows.map((r) => r.original);
    exportToCSV(
      visible,
      `billing-history-${dateRange.from || 'start'}-${dateRange.to || 'end'}.csv`,
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <BillingHistoryToolbar
            data={filteredData}
            search={search}
            onSearchChange={setSearch}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            onExportAll={handleExportAll}
            onExportFiltered={handleExportFiltered}
          />

          {/* Table */}
          <div className="border-line/5 bg-panel rounded-xl border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((group) => (
                  <TableRow key={group.id} className="border-line/5">
                    {group.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-content-muted font-mono text-[10px] tracking-widest uppercase"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="border-line/5 hover:bg-ink/5 cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedInvoice(row.original);
                        setDetailOpen(true);
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="text-content-muted h-24 text-center"
                    >
                      No invoices found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-content-muted text-xs">
              Showing {table.getRowModel().rows.length} of {table.getFilteredRowModel().rows.length}{' '}
              invoices
            </p>
            <div className="flex items-center space-x-2">
              {(() => {
                const pageCount = table.getPageCount();
                const current = table.getState().pagination.pageIndex;
                const maxVisible = 5;

                if (pageCount <= maxVisible) {
                  return Array.from({ length: pageCount }, (_, i) => (
                    <Button
                      key={i}
                      size="sm"
                      variant={current === i ? 'dark' : 'outline'}
                      onClick={() => table.setPageIndex(i)}
                    >
                      {i + 1}
                    </Button>
                  ));
                }

                const pages = new Set(
                  [0, current - 1, current, current + 1, pageCount - 1].filter(
                    (p) => p >= 0 && p < pageCount,
                  ),
                );
                return Array.from(pages)
                  .sort((a, b) => a - b)
                  .flatMap((i, idx, arr) => [
                    idx > 0 && arr[idx - 1] !== i - 1 ? (
                      <span key={`ellipsis-${i}`} className="px-2">
                        …
                      </span>
                    ) : null,
                    <Button
                      key={i}
                      size="sm"
                      variant={current === i ? 'dark' : 'outline'}
                      onClick={() => table.setPageIndex(i)}
                    >
                      {i + 1}
                    </Button>,
                  ]);
              })()}
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <InvoiceDetailModal
        invoice={selectedInvoice}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onExportPDF={exportToPDF}
      />
    </>
  );
}
