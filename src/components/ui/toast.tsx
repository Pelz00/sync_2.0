/**
 * Toast — re-exports sonner with Sync styling. Mount `<Toaster />` once in the
 * root providers tree, then call `toast(...)` from anywhere (client only).
 *
 * Use for transient feedback (saved, posted, paid). Don't use for errors that
 * need acknowledgement — those go in a dialog.
 */
'use client';

import { Toaster as SonnerToaster, toast } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      richColors
      toastOptions={{
        style: {
          fontFamily: 'var(--font-body)',
          borderRadius: 'var(--radius-lg)',
        },
      }}
    />
  );
}

export { toast };
