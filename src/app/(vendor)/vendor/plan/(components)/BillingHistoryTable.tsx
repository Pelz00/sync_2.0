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
import { billingColumns } from './billing-columns';
import type { Invoice } from './types';

interface Props {
  invoices: Invoice[];
}

function exportToCSV(rows: Invoice[], filename: string) {
  const headers = ['Invoice', 'Date', 'Plan', 'Amount', 'Status'];

  const escape = (val: string | number) => {
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const lines = rows.map((r) =>
    [escape(r.id), escape(r.date), escape(r.plan), `₦${r.amount}`, escape(r.status)].join(','),
  );
  const csv = [headers.join(','), ...lines].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function BillingHistoryTable({ invoices }: Props) {
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  // Apply date range filter on top of TanStack global filter
  const filteredData = useMemo(() => {
    return invoices.filter((inv) => {
      const d = new Date(inv.date);
      if (dateRange.from && d < new Date(dateRange.from)) return false;
      if (dateRange.to && d > new Date(dateRange.to)) return false;
      return true;
    });
  }, [invoices, dateRange]);

  const table = useReactTable({
    data: filteredData,
    columns: billingColumns,
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
    exportToCSV(visible, 'billing-history-filtered.csv');
  }

  return (
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
                  <TableRow key={row.id} className="border-line/5">
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
                    colSpan={billingColumns.length}
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
              
              // Show first, last, current, and neighbors
              const pages = new Set([0, current - 1, current, current + 1, pageCount - 1].filter(p => p >= 0 && p < pageCount));
              return Array.from(pages).sort((a, b) => a - b).map((i, idx, arr) => (
                <>
                  {idx > 0 && arr[idx - 1] !== i - 1 && <span key={`ellipsis-${i}`} className="px-2">…</span>}
                  <Button
                    key={i}
                    size="sm"
                    variant={current === i ? 'dark' : 'outline'}
                    onClick={() => table.setPageIndex(i)}
                  >
                    {i + 1}
                  </Button>
                </>
              ));
            })()}
              <Button
                key={i}
                size="sm"
                variant={table.getState().pagination.pageIndex === i ? 'dark' : 'outline'}
                onClick={() => table.setPageIndex(i)}
              >
                {i + 1}
              </Button>
            ))}
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
  );
}
