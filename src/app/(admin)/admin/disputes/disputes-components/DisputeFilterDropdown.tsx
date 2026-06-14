"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface DisputeFilterDropdownProps<T extends string> {
  value:    T;
  options:  T[];
  onChange: (v: T) => void;
  width?:   string;
}

export function DisputeFilterDropdown<T extends string>({
  value, options, onChange, width = "w-44",
}: DisputeFilterDropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 bg-panel border border-line/15 rounded-xl w-30 justify-center py-2.5 text-sm font-semibold text-content hover:border-line/30 transition-colors whitespace-nowrap" >
        {value}
        <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className={`absolute right-0 top-12 z-50 bg-white border border-gray-200 rounded-2xl shadow-2xl py-2 overflow-hidden ${width}`}>
          {options.map(option => (
            <button
              key={option}
              onClick={() => { onChange(option); setOpen(false); }}
              className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" >
              <span className={value === option ? "font-semibold text-gray-900" : ""}>
                {option}
              </span>
              {value === option && <Check size={13} className="text-gray-700" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
