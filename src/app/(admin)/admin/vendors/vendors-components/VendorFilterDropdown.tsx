"use client";

import { Filter } from "lucide-react";
import { VENDOR_STATUS_FILTERS } from "./vendor.constants";
import type { VendorStatusFilter } from "./vendor.types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface VendorFilterDropdownProps {
  value: VendorStatusFilter;
  onChange: (v: VendorStatusFilter) => void;
}

export function VendorFilterDropdown({ value, onChange }: VendorFilterDropdownProps) {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as VendorStatusFilter)}>
      {/* Trigger Button container box framework layout */}
      <SelectTrigger className="w-full sm:w-[180px] h-11 text-xs font-bold uppercase tracking-widest border-line/20 bg-panel text-content focus:ring-lime/40 rounded-xl shadow-sm gap-2 px-4 outline-none! ring-0! group cursor-pointer shrink-0">
        <div className="flex items-center gap-2 truncate w-full">
          <Filter size={13} className="text-content-muted/60 shrink-0" />
          <span className="truncate  tracking-normal normal-case text-xs font-semibold">{value}</span>
        </div>
      </SelectTrigger>

      {/* Popover Layout Surface matrix options array dropdown list wrapper */}
      <SelectContent className="bg-panel border-line/15 text-content rounded-xl outline-none! ring-0! shadow-pop p-1 animate-in fade-in slide-in-from-top-1 duration-150 w-[var(--radix-select-trigger-width)] sm:w-[190px]">
        {VENDOR_STATUS_FILTERS.map((option) => {
          const isActive = value === option;
          return (
            <SelectItem
              key={option}
              value={option}
              className={cn(
                "text-xs font-medium focus:bg-surface-deep focus:text-content px-3 py-2.5 rounded-lg cursor-pointer transition-colors relative flex items-center justify-between outline-none! ring-0! data-[state=checked]:font-semibold data-[state=checked]:text-content pl-3 [&>span]:w-full",
                isActive ? "bg-surface-deep/40 text-content" : "text-content-muted/80"
              )} >
              <div className="flex items-center justify-between gap-3 w-full min-w-0">
                <span className="truncate pr-2">{option}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}