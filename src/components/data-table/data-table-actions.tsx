'use client';

import { Eye, Pencil, Trash2 } from 'lucide-react';

interface Props<TData> {
  row: TData;
  onView: (row: TData) => void;
  onEdit: (row: TData) => void;
  onDelete: (row: TData) => void;
}

export function DataTableActions<TData>({ row, onView, onEdit, onDelete }: Props<TData>) {
  return (
    <div className="flex gap-2">
      <button type="button" aria-label="View" onClick={() => onView(row)}>
        <Eye className="h-4 w-4 cursor-pointer" />
      </button>

      <button type="button" aria-label="Edit" onClick={() => onEdit(row)}>
        <Pencil className="h-4 w-4 cursor-pointer" />
      </button>

      <button type="button" aria-label="Delete" onClick={() => onDelete(row)}>
        <Trash2 className="h-4 w-4 cursor-pointer text-red-500" />
      </button>
    </div>
  );
}
