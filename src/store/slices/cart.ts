/**
 * Cart slice - client-only food/laundry/event-ticket cart.
 *
 * Persisted to localStorage by the store bootstrap so it survives reloads.
 * Server-side authority is established at checkout: the Server Action
 * re-validates prices and stock before initialising a Paystack transaction.
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  /** Stable id - typically `${vendorId}:${itemId}`. */
  id: string;
  vendorId: string;
  /** Display name. */
  name: string;
  /** Unit price in Naira (server re-validates at checkout). */
  unitPrice: number;
  quantity: number;
  /** Optional thumbnail URL. */
  image?: string;
}

interface CartState {
  /** Cart is single-vendor at a time; switching vendor warns and clears. */
  vendorId: string | null;
  items: Record<string, CartItem>;
}

const initialState: CartState = { vendorId: null, items: {} };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const item = action.payload;
      if (state.vendorId && state.vendorId !== item.vendorId) {
        // Different vendor - replace the cart. UI should confirm beforehand.
        state.items = {};
      }
      state.vendorId = item.vendorId;
      const existing = state.items[item.id];
      state.items[item.id] = existing
        ? { ...existing, quantity: existing.quantity + item.quantity }
        : item;
    },
    setQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const { id, quantity } = action.payload;
      const item = state.items[id];
      if (!item) return;
      if (quantity <= 0) delete state.items[id];
      else item.quantity = quantity;
      if (Object.keys(state.items).length === 0) state.vendorId = null;
    },
    removeItem(state, action: PayloadAction<string>) {
      delete state.items[action.payload];
      if (Object.keys(state.items).length === 0) state.vendorId = null;
    },
    clear(state) {
      state.items = {};
      state.vendorId = null;
    },
    /** Replace state wholesale (used by ReduxProvider to rehydrate from localStorage). */
    hydrate(_state, action: PayloadAction<CartState>) {
      return action.payload;
    },
  },
});

export const { addItem, setQuantity, removeItem, clear, hydrate } = cartSlice.actions;
export default cartSlice.reducer;
