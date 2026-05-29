/**
 * Typed Redux hooks. Always import these instead of the raw `useSelector`
 * and `useDispatch` from `react-redux` - they're pre-bound to RootState
 * and AppDispatch so you get full type safety.
 */
import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, AppStore, RootState } from './index';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
