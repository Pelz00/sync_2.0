/**
 * UI slice - transient client UI state. Things that shouldn't trigger a
 * URL change but should be remembered across re-renders (open mobile nav,
 * dismissed banners, filter-panel open/closed on mobile).
 *
 * NOT for: server data (use RSC/TanStack Query), filters that should be
 * shareable (use URL search params), or auth state (use Supabase client).
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  mobileNavOpen: boolean;
  filterPanelOpen: boolean;
  dismissedBanners: string[];
}

const initialState: UiState = {
  mobileNavOpen: false,
  filterPanelOpen: false,
  dismissedBanners: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMobileNavOpen(state, action: PayloadAction<boolean>) {
      state.mobileNavOpen = action.payload;
    },
    setFilterPanelOpen(state, action: PayloadAction<boolean>) {
      state.filterPanelOpen = action.payload;
    },
    dismissBanner(state, action: PayloadAction<string>) {
      if (!state.dismissedBanners.includes(action.payload)) {
        state.dismissedBanners.push(action.payload);
      }
    },
  },
});

export const { setMobileNavOpen, setFilterPanelOpen, dismissBanner } = uiSlice.actions;
export default uiSlice.reducer;
