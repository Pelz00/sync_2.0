/**
 * `cn` — class-name combiner used by every component in the design system.
 *
 * Merges with `clsx` (handles falsy/conditional values) then resolves
 * Tailwind conflicts with `tailwind-merge` (e.g. `px-2 px-4` → `px-4`).
 */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
