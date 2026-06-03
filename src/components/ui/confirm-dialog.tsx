/**
 * ConfirmDialog - reusable confirmation modal. Use for any destructive or
 * significant action (delete, purge, cancel, etc.) instead of inline confirms.
 *
 *   const [open, setOpen] = useState(false);
 *   <ConfirmDialog open={open} onOpenChange={setOpen} title="…" destructive
 *     confirmLabel="Delete" loading={pending} onConfirm={doIt} />
 */
'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
  loading = false,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter className="mt-5 gap-2">
          <DialogClose asChild>
            <Button variant="outline" size="sm" disabled={loading}>
              {cancelLabel}
            </Button>
          </DialogClose>
          <Button
            variant={destructive ? 'outline' : 'primary'}
            size="sm"
            disabled={loading}
            onClick={onConfirm}
            className={cn(destructive && 'text-coral border-coral/30 hover:bg-coral/10')}
          >
            {loading ? 'Working…' : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
