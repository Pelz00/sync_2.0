/**
 * OtpInput - segmented one-time-code input (one box per digit). Auto-advances on
 * entry, backspaces to the previous box, supports arrow keys and pasting the
 * whole code. Value is the joined string; `length` defaults to 6.
 */
'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  autoFocus?: boolean;
  disabled?: boolean;
}

export function OtpInput({ value, onChange, length = 6, autoFocus, disabled }: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const chars = Array.from({ length }, (_, i) => value[i] ?? '');

  function setChar(i: number, raw: string) {
    const digit = raw.replace(/\D/g, '').slice(-1);
    const next = (value.slice(0, i) + digit + value.slice(i + 1)).slice(0, length);
    onChange(next);
    if (digit && i < length - 1) refs.current[i + 1]?.focus();
  }

  function onKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !chars[i] && i > 0) refs.current[i - 1]?.focus();
    else if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus();
    else if (e.key === 'ArrowRight' && i < length - 1) refs.current[i + 1]?.focus();
  }

  function onPaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!digits) return;
    onChange(digits);
    refs.current[Math.min(digits.length, length - 1)]?.focus();
  }

  return (
    <div className="flex gap-2" onPaste={onPaste}>
      {chars.map((c, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          aria-label={`Digit ${i + 1}`}
          value={c}
          disabled={disabled}
          autoFocus={autoFocus && i === 0}
          onChange={(e) => setChar(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          onFocus={(e) => e.target.select()}
          className={cn(
            'border-line/15 bg-panel text-content h-12 w-11 rounded-lg border text-center text-lg font-semibold transition-colors',
            'focus:border-line focus:outline-none disabled:opacity-50',
          )}
        />
      ))}
    </div>
  );
}
