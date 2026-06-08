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
  const headers = ['Invoice', 'Date', 'Plan', 'Amount (₦)', 'Status'];
  const lines = rows.map((r) =>
    [r.id, r.date, r.plan, r.amount, r.status].join(','),
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
        <div className="rounded-xl border border-line/5 bg-panel">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((group) => (
                <TableRow key={group.id} className="border-line/5">
                  {group.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="font-mono text-[10px] uppercase tracking-widest text-content-muted"
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
                    className="h-24 text-center text-content-muted"
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
          <p className="text-xs text-content-muted">
            Showing {table.getRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} invoices
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            {Array.from({ length: table.getPageCount() }, (_, i) => (
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
