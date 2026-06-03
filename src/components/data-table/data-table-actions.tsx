'use client';

import { Eye, Pencil, Trash2 } from 'lucide-react';

interface Props {
  row: any;
  onView: (row: any) => void;
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
}

export function DataTableActions({ row, onView, onEdit, onDelete }: Props) {
  return (
    <div className="flex gap-2">
      <Eye className="h-4 w-4 cursor-pointer" onClick={() => onView(row)} />

      <Pencil className="h-4 w-4 cursor-pointer" onClick={() => onEdit(row)} />

      <Trash2 className="h-4 w-4 cursor-pointer text-red-500" onClick={() => onDelete(row)} />
    </div>
  );
}
