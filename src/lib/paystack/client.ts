/**
 * Paystack inline (client). Loads the v2 inline script on demand and resumes a
 * transaction the server already initialized (we pass an access code, not an
 * amount, so the charge can't be tampered with). We use the raw script rather
 * than `react-paystack` because that package doesn't support React 19.
 */
'use client';

interface PaystackPopInstance {
  resumeTransaction: (
    accessCode: string,
    callbacks?: {
      onSuccess?: (txn: unknown) => void;
      onCancel?: () => void;
      onError?: (err: unknown) => void;
    },
  ) => void;
}

declare global {
  interface Window {
    PaystackPop?: { new (): PaystackPopInstance };
  }
}

const SRC = 'https://js.paystack.co/v2/inline.js';
let loader: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'));
  if (window.PaystackPop) return Promise.resolve();
  if (loader) return loader;
  loader = new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      loader = null;
      reject(new Error('Failed to load Paystack'));
    };
    document.body.appendChild(s);
  });
  return loader;
}

/** Open the Paystack popup for a server-initialized transaction. The wallet is
 *  credited by the verified webhook, not these callbacks - they're just UX. */
export async function openWalletTopup(
  accessCode: string,
  callbacks: { onSuccess?: () => void; onCancel?: () => void } = {},
): Promise<void> {
  await loadScript();
  const Ctor = window.PaystackPop;
  if (!Ctor) throw new Error('Paystack unavailable');
  const popup = new Ctor();
  popup.resumeTransaction(accessCode, {
    onSuccess: () => callbacks.onSuccess?.(),
    onCancel: () => callbacks.onCancel?.(),
  });
}
