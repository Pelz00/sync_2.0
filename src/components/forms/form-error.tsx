/**
 * FormError - accessible inline error message. Used by FormField; can be
 * used standalone for form-level errors (e.g. "Wrong password").
 */
import type { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormErrorProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export function FormError({ id, children, className }: FormErrorProps) {
  return (
    <p
      id={id}
      role="alert"
      className={cn('text-coral flex items-start gap-1 text-xs', className)}
    >
      <AlertCircle className="mt-px h-3 w-3 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
