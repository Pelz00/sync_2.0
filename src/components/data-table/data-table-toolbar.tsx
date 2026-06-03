'use client';

import type { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props<TData> {
  table: Table<TData>;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function DataTableToolbar<TData>({ table, searchValue, onSearchChange }: Props<TData>) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md bg-panel p-4">
      <Input
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        className="!border-line/20 max-w-sm !ring-0 !outline-none focus:!ring-0 focus-visible:!ring-0 focus-visible:!outline-none"
      />

      <Select
        onValueChange={(value) =>
          table.getColumn('status')?.setFilterValue(value === 'all' ? undefined : value)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Processing">Processing</SelectItem>
          <SelectItem value="Delivered">Delivered</SelectItem>
          <SelectItem value="Cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
