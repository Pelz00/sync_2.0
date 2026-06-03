'use client';

import { Order } from '@/types/order';
import { ColumnDef } from '@tanstack/react-table';

export const orderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: 'ORDER ID',
  },
  {
    accessorKey: 'customer',
    header: 'CUSTOMER',
  },
  {
    accessorKey: 'product',
    header: 'PRODUCT',
  },
  {
    accessorKey: 'date',
    header: 'DATE',
  },
  {
    accessorKey: 'amount',
    header: 'AMOUNT',
    cell: ({ row }) => <span>₦{row.original.amount.toLocaleString()}</span>,
  },
  {
    accessorKey: 'payment',
    header: 'PAYMENT',
  },
  {
    accessorKey: 'status',
    header: 'STATUS',
  },
];
