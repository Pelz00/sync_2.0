'use client';

import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title?: string;
  description?: string;

  children: React.ReactNode;

  footer?: React.ReactNode;

  className?: string;

  showHeader?: boolean;
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
  showHeader = true,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={className}>
        {showHeader && (title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}

            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}

        <div>{children}</div>

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
