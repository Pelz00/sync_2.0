'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { cn } from '@/lib/utils';

interface AppSelectProps {
  label?: string;
  placeholder?: string;
  value: string;
  options: string[];
  error?: string;
  disabled?: boolean;
  className?: string;
  onValueChange: (value: string) => void;
}

export function AppSelect({
  label,
  placeholder = 'Select an option',
  value,
  options,
  error,
  disabled,
  className,
  onValueChange,
}: AppSelectProps) {
  return (
    <div className="space-y-2">
      {label && <label className="text-muted text-sm font-medium">{label}</label>}

      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger
          className={cn(
            'border-line/10 bg-background h-11 rounded-xl transition-colors',
            'focus:ring-2 focus:ring-lime-500/20',
            error && 'border-red-500',
            className,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="border-border bg-popover w- rounded-xl shadow-xl">
          {options.map((option) => (
            <SelectItem key={option} value={option} className="cursor-pointer rounded-lg">
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
