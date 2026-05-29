/**
 * ThemeToggle - flips between light and dark, persisted to localStorage.
 *
 * Stateless by design: it renders BOTH icons and lets CSS show the right one
 * based on the active theme (`.theme-icon-*` rules in globals.css, keyed off
 * the `.dark` class / prefers-color-scheme). This avoids any SSR/client
 * hydration mismatch from swapping icons via React state. The click handler
 * reads the current theme from the DOM at call time and flips it.
 */
'use client';

import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const el = document.documentElement;
    const isDark =
      el.classList.contains('dark') ||
      (!el.classList.contains('light') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    const next = !isDark;
    el.classList.toggle('dark', next);
    el.classList.toggle('light', !next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      // ignore storage failures (private mode, etc.)
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className={cn(
        'text-foreground hover:bg-foreground/5 inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors',
        className,
      )}
    >
      <Moon className="theme-icon-moon h-4 w-4" />
      <Sun className="theme-icon-sun h-4 w-4" />
    </button>
  );
}
