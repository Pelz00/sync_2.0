/**
 * Redux Toolkit store. Scope is intentionally narrow - only the things the
 * PRD calls out as needing client state across pages:
 *   - cart  (multi-step purchase flows)
 *   - wizard (multi-step forms: onboarding, request, etc)
 *   - ui     (mobile nav, dismissed banners - transient UI state)
 *
 * Server data lives in RSCs (queries.ts) or TanStack Query (for realtime).
 * NEVER add a "user" slice here - auth comes from Supabase, not Redux.
 */
import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit';
import cart from './slices/cart';
import wizard from './slices/wizard';
import ui from './slices/ui';

export const makeStore = () =>
  configureStore({
    reducer: { cart, wizard, ui },
    // Use Redux DevTools in development only.
    devTools: process.env.NODE_ENV !== 'production',
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<R = void> = ThunkAction<R, RootState, unknown, Action>;
