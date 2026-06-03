'use client';

import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface Props<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: Props<TData>) {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>

      {Array.from({ length: table.getPageCount() }, (_, index) => (
        <Button
          key={index}
          variant={table.getState().pagination.pageIndex === index ? 'primary' : 'outline'}
          onClick={() => table.setPageIndex(index)}
        >
          {index + 1}
        </Button>
      ))}

      <Button variant="outline" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
        Next
      </Button>
    </div>
  );
}
