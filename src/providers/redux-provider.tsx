/**
 * ReduxProvider - instantiates the store once per browser tab.
 *
 * Uses `useState(init)` so the store is created lazily on the first render
 * and stays stable for the lifetime of the component. Cart is rehydrated
 * from localStorage during init, then persisted on every subsequent change.
 */
'use client';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/store';
import { hydrate } from '@/store/slices/cart';

const STORAGE_KEY = 'sync.cart.v1';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(() => {
    const s = makeStore();
    if (typeof window !== 'undefined') {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const cart = JSON.parse(raw);
          if (cart && typeof cart === 'object' && 'items' in cart) {
            s.dispatch(hydrate(cart));
          }
        }
      } catch {
        // Corrupt storage - start fresh.
      }
    }
    return s;
  });

  // Persist cart on every change. Slim subscription - reads cart only.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    return store.subscribe(() => {
      const { cart } = store.getState();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    });
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
