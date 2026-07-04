/**
 * Redux Toolkit store. Scope is intentionally narrow - only the things the
 * PRD calls out as needing client state across pages:
 *   - cart  (multi-step purchase flows)
 *   - wizard (multi-step forms: onboarding, request, etc)
 *   - ui     (mobile nav, dismissed banners - transient UI state)
 *   - api    (RTK Query - all client-side data fetching, via /api route handlers)
 *
 * Server data is fetched in RSCs (queries.ts). For client-side reads/writes use
 * RTK Query (src/store/api), which talks to our Next route handlers, not
 * Supabase directly. NEVER add a "user" slice here - auth comes from Supabase.
 */
import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from './api/base-api';
import cart from './slices/cart';
import wizard from './slices/wizard';
import ui from './slices/ui';

export const makeStore = () => {
  const store = configureStore({
    reducer: { cart, wizard, ui, [baseApi.reducerPath]: baseApi.reducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
    // Use Redux DevTools in development only.
    devTools: process.env.NODE_ENV !== 'production',
  });
  // Enables refetchOnFocus / refetchOnReconnect behaviour for RTK Query.
  setupListeners(store.dispatch);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<R = void> = ThunkAction<R, RootState, unknown, Action>;

// Zustand store. Scope is intentionally narrow - only the things the
// PRD calls out as needing client state across pages:
//   - modals (multi-step forms: onboarding, request, etc)
//   - ui     (mobile nav, dismissed banners - transient UI state)
export * from './use-modal-store';

// export * from './listing-modal-store';
// export * from './promotion-modal-store';
// export * from './vendor-modal-store';
