/**
 * Wizard slice - generic step + form-data store for multi-step flows
 * (vendor onboarding, workmanship request, checkout). Keyed by `id` so
 * multiple wizards can run side-by-side without colliding.
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type WizardData = Record<string, unknown>;

interface WizardState {
  /** Per-wizard state, keyed by an id (e.g. 'vendor-onboarding'). */
  byId: Record<string, { step: number; data: WizardData }>;
}

const initialState: WizardState = { byId: {} };

const wizardSlice = createSlice({
  name: 'wizard',
  initialState,
  reducers: {
    start(state, action: PayloadAction<{ id: string; initial?: WizardData }>) {
      state.byId[action.payload.id] = { step: 0, data: action.payload.initial ?? {} };
    },
    goTo(state, action: PayloadAction<{ id: string; step: number }>) {
      const w = state.byId[action.payload.id];
      if (w) w.step = action.payload.step;
    },
    patch(state, action: PayloadAction<{ id: string; data: WizardData }>) {
      const w = state.byId[action.payload.id];
      if (w) w.data = { ...w.data, ...action.payload.data };
    },
    end(state, action: PayloadAction<string>) {
      delete state.byId[action.payload];
    },
  },
});

export const { start, goTo, patch, end } = wizardSlice.actions;
export default wizardSlice.reducer;
