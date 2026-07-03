'use client';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockCategories } from '@/mock/listings';
import { Listing } from '@/modules/vendor/types';
import { AppSelect } from '@/components/shared/app-select';

function Modal({
  open,
  children,
  onClose,
}: {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        className="bg-panel relative w-full max-w-md rounded-2xl p-6 shadow-xl"
      >
        <button onClick={onClose} className="text-muted hover:text-ink absolute top-4 right-4">
          <X className="size-4" />
        </button>

        {children}
      </div>
    </div>
  );
}
// ── Delete confirm ───────────────────────────────────────────────
interface DeleteModalProps {
  open: boolean;
  listing: Listing;
  onConfirm: () => void;
  onClose: () => void;
}
export function DeleteModal({ open, listing, onConfirm, onClose }: DeleteModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="font-display text-ink text-lg font-semibold">Delete listing</h2>
      <p className="text-muted mt-2 text-sm">
        Are you sure you want to delete{' '}
        <span className="text-ink font-semibold">&ldquo;{listing?.name}&rdquo;</span>? This action
        cannot be undone.
      </p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button size="sm" className="bg-red-500 text-white hover:bg-red-600" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}

// ── Bulk delete confirm ──────────────────────────────────────────
interface BulkDeleteModalProps {
  open: boolean;
  count: number;
  onConfirm: () => void;
  onClose: () => void;
}
export function BulkDeleteModal({ open, count, onConfirm, onClose }: BulkDeleteModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="font-display text-ink text-lg font-semibold">Delete {count} listings</h2>
      <p className="text-muted mt-2 text-sm">
        Are you sure you want to delete{' '}
        <span className="text-ink font-semibold">{count} listings</span>? This action cannot be
        undone.
      </p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button size="sm" className="bg-red-500 text-white hover:bg-red-600" onClick={onConfirm}>
          Delete all
        </Button>
      </div>
    </Modal>
  );
}

// ── Archive confirm ──────────────────────────────────────────────
interface ArchiveModalProps {
  open: boolean;
  count: number;
  onConfirm: () => void;
  onClose: () => void;
}
export function ArchiveModal({ open, count, onConfirm, onClose }: ArchiveModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="font-display text-ink text-lg font-semibold">
        Archive {count} listing{count > 1 ? 's' : ''}
      </h2>
      <p className="text-muted mt-2 text-sm">
        Archived listings are hidden from your storefront but can be restored anytime from your
        archive.
      </p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button size="sm" variant="primary" onClick={onConfirm}>
          Archive
        </Button>
      </div>
    </Modal>
  );
}

// ── Edit modal ───────────────────────────────────────────────────
interface EditModalProps {
  open: boolean;
  listing: Listing;
  onSave: (updated: Listing) => void;
  onClose: () => void;
}
export function EditModal({ open, listing, onSave, onClose }: EditModalProps) {
  const [form, setForm] = useState({ ...listing });
  if (!open) return null;

  const set = (key: keyof Listing, value: string | number) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="font-display text-ink text-lg font-semibold">Edit listing</h2>
      <div className="mt-4 flex flex-col gap-3">
        <Field label="Name">
          <Input
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            className="input-clean"
          />
        </Field>
        <AppSelect
          label="Category"
          value={form.category}
          onValueChange={(value) => set('category', value)}
          options={mockCategories.filter((c) => c !== 'All')}
        />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Price (₦)">
            <Input
              type="number"
              value={form.price}
              onChange={(e) => set('price', Number(e.target.value))}
              className="input-clean"
            />
          </Field>
          <Field label="Stock">
            <Input
              type="number"
              value={form.stock}
              onChange={(e) => set('stock', Number(e.target.value))}
              className="input-clean"
            />
          </Field>
        </div>

        <AppSelect
          label="Category"
          value={form.category}
          onValueChange={(value) => set('category', value)}
          options={mockCategories.filter((c) => c !== 'All')}
        />
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button size="sm" variant="primary" onClick={() => onSave(form)}>
          Save changes
        </Button>
      </div>
    </Modal>
  );
}

// ── Add new listing modal ────────────────────────────────────────
const EMPTY: Omit<Listing, 'id' | 'sold'> = {
  name: '',
  category: 'Rice',
  price: 0,
  stock: 0,
  status: 'Active',
  imageUrl: '',
};

interface AddListingModalProps {
  open: boolean;
  onAdd: (listing: Listing) => void;
  onClose: () => void;
}

export function AddListingModal({ open, onAdd, onClose }: AddListingModalProps) {
  const [form, setForm] = useState({ ...EMPTY });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof typeof form, value: string | number) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    const e: Record<string, string> = {};

    if (!form.name.trim()) e.name = 'Name is required';
    if (form.price <= 0) e.price = 'Price must be greater than 0';
    if (form.stock < 0) e.stock = 'Stock cannot be negative';

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;

    onAdd({
      ...form,
      id: `lst-${Date.now()}`,
      sold: 0,
    });

    // Reset form for the next time the modal opens
    setForm({ ...EMPTY });
    setErrors({});

    onClose();
  };

  const handleClose = () => {
    setForm({ ...EMPTY });
    setErrors({});
    onClose();
  };

  if (!open) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <h2 className="font-display text-ink text-lg font-semibold">Add new listing</h2>

      <div className="mt-4 flex flex-col gap-3">
        <Field label="Product name" error={errors.name}>
          <Input
            placeholder="e.g. Jollof Rice"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            className={cn('input-clean', errors.name && 'border-red-400')}
          />
        </Field>

        <AppSelect
          label="Category"
          value={form.category}
          onValueChange={(value) => set('category', value)}
          options={mockCategories.filter((c) => c !== 'All')}
        />

        <div className="grid grid-cols-2 gap-3">
          <Field label="Price (₦)" error={errors.price}>
            <Input
              type="number"
              placeholder="0"
              value={form.price || ''}
              onChange={(e) => set('price', Number(e.target.value))}
              className={cn('input-clean', errors.price && 'border-red-400')}
            />
          </Field>

          <Field label="Stock" error={errors.stock}>
            <Input
              type="number"
              placeholder="0"
              value={form.stock || ''}
              onChange={(e) => set('stock', Number(e.target.value))}
              className={cn('input-clean', errors.stock && 'border-red-400')}
            />
          </Field>
        </div>

        <Field label="Status">
          <select
            value={form.status}
            onChange={(e) => set('status', e.target.value as Listing['status'])}
            className="border-line/15 text-ink bg-panel h-11 w-full rounded-lg border px-3 text-sm focus:outline-none"
          >
            <option>Active</option>
            <option>Draft</option>
            <option>Out of Stock</option>
          </select>
        </Field>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" size="sm" onClick={handleClose}>
          Cancel
        </Button>

        <Button size="sm" variant="primary" onClick={handleAdd}>
          Add listing
        </Button>
      </div>
    </Modal>
  );
}

// ── tiny helper ──────────────────────────────────────────────────
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-muted text-xs font-medium">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
