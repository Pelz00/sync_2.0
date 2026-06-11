"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

interface FilterDropdownProps<T extends string> {
  value: T;
  options: T[];
  onChange: (value: T) => void;
  width?: string;
}

export function FilterDropdown<T extends string>({
  value,
  options,
  onChange,
  width = "w-48"
}: FilterDropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Handle click boundary escape conditions smoothly
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
    <div ref={ref} className="relative inline-block text-left">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen((v) => !v)}
        className="bg-panel font-sans text-xs font-semibold gap-2 border-line/15 text-content shadow-card hover:bg-surface-deep/40" >
        <span>{value}</span>
        <ChevronDown 
          size={13} 
          className={cn(
            "text-content-muted/60 transition-transform duration-200", 
            open && "rotate-180"
          )} />
      </Button>

      {open && (
        <div 
          className={cn(
            "absolute top-10 z-50 bg-panel border border-line/15 rounded-md shadow-pop p-1 origin-top-right",
            "animate-in fade-in slide-in-from-top-1 duration-150",
            width
          )} >
          {options.map((option) => {
            const isSelected = value === option;
            
            return (
              <button
                key={option}
                type="button"
                onClick={() => { 
                  onChange(option); 
                  setOpen(false); 
                }}
                className={cn(
                  "flex items-center justify-between w-full px-3 h-8 rounded-sm text-xs transition-colors cursor-pointer text-left",
                  isSelected 
                    ? "bg-surface-deep text-content font-bold" 
                    : "text-content-muted hover:text-content hover:bg-surface-deep/50"
                )} >
                <span>{option}</span>
                {isSelected && <Check size={13} className="text-lime shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}