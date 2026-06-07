"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

interface FilterDropdownProps<T extends string> {
  value: T;
  options: T[];
  onChange: (value: T) => void;
  width?: string;
}

/**
 * FilterDropdown
 *
 * Generic dropdown used for both "All Status" and "All Categories" filters.
 * Shows a checkmark next to the active option.
 */
export function FilterDropdown<T extends string>(props: FilterDropdownProps<T>) {
  const { value, options, onChange } = props;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2 bg-white hover:border-gray-300 hover:bg-gray-50 transition-colors" >
        <span>{value}</span>
        <ChevronDown size={14} className={cn("text-gray-400 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className={cn("absolute left-0 right-0 top-10 z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-48 md:left-auto")}>
          {options.map((option) => (
            <button
              key={option}
              onClick={() => { onChange(option); setOpen(false); }}
              className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors" >
              <span>{option}</span>
              {value === option && <Check size={13} className="text-[#90D505]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
