/**
 * PasswordInput - masked text field with two affordances:
 *   1. An eye toggle to show / hide the whole value.
 *   2. "Reveal last char": while typing (and hidden), the most recently typed
 *      character shows briefly, then masks to a dot - like mobile keyboards.
 *
 * Controlled: pass `value` + `onChange(value)`. Because masking is done in JS
 * (the element is type="text"), the real value lives in React state, not the
 * DOM - so browser password managers won't autofill this field.
 *
 * Pair with react-hook-form via <Controller> (spread `field`).
 */
'use client';

import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

const PEEK_MS = 700;
const DOT = '•';

interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
  value?: string;
  onChange?: (value: string) => void;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ value = '', onChange, className, ...props }, ref) {
    const [visible, setVisible] = React.useState(false);
    const [peek, setPeek] = React.useState(-1);
    const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    React.useEffect(() => () => clearTimeout(timer.current ?? undefined), []);

    // What the input element actually shows.
    const display = visible
      ? value
      : value
          .split('')
          .map((ch, i) => (i === peek ? ch : DOT))
          .join('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const next = e.target.value;
      const prev = display;

      // Diff prev↔next display strings to find the edited region; the inserted
      // text is literal (just typed), so map it back onto the real value.
      let p = 0;
      while (p < prev.length && p < next.length && prev[p] === next[p]) p++;
      let s = 0;
      while (
        s < prev.length - p &&
        s < next.length - p &&
        prev[prev.length - 1 - s] === next[next.length - 1 - s]
      ) {
        s++;
      }
      const inserted = next.slice(p, next.length - s);
      const nextValue = value.slice(0, p) + inserted + value.slice(value.length - s);
      onChange?.(nextValue);

      // Briefly reveal the last inserted char (only while hidden).
      if (!visible && inserted.length > 0) {
        setPeek(p + inserted.length - 1);
        clearTimeout(timer.current ?? undefined);
        timer.current = setTimeout(() => setPeek(-1), PEEK_MS);
      } else {
        setPeek(-1);
      }
    }

    return (
      <div className="relative">
        <input
          ref={ref}
          type="text"
          value={display}
          onChange={handleChange}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          className={cn(
            'border-line/15 bg-panel text-content placeholder:text-content-muted h-11 w-full rounded-lg border pr-10 pl-3 text-sm transition-colors',
            'focus:border-line focus:outline-none disabled:opacity-50',
            className,
          )}
          {...props}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="text-content-muted hover:text-content absolute top-1/2 right-3 -translate-y-1/2"
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    );
  },
);
