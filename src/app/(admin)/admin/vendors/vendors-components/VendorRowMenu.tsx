"use client";

import { MoreVertical, Eye, CheckCircle, PauseCircle, Trash2, ShieldCheck } from "lucide-react";
import type { Vendor } from "./vendor.types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface VendorRowMenuProps {
  vendor: Vendor;
  onView: (v: Vendor) => void;
  onActivate: (v: Vendor) => void;
  onSuspend: (v: Vendor) => void;
  onDelete: (v: Vendor) => void;
}

export function VendorRowMenu({
  vendor, onView, onActivate, onSuspend, onDelete,
}: VendorRowMenuProps) {
  return (
    <DropdownMenu>
      {/* Trigger element using standardized Button style configurations */}
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={(e) => e.stopPropagation()}
          className="h-8 w-8 rounded-md text-content-muted hover:text-content hover:bg-surface-deep/80 cursor-pointer focus-visible:ring-lime/40" >
          <MoreVertical size={15} />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      {/* Surface element container list mapping */}
      <DropdownMenuContent
        align="end"
        onClick={(e) => e.stopPropagation()}
        className="w-44 bg-panel border-line/15 text-content rounded-xl shadow-pop p-1 animate-in fade-in slide-in-from-top-1 duration-150 z-50" >
        <DropdownMenuItem
          onClick={() => onView(vendor)}
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold focus:bg-surface-deep focus:text-content rounded-lg cursor-pointer transition-colors" >
          <Eye size={13} className="text-content-muted/60 shrink-0" />
          <span>View details</span>
        </DropdownMenuItem>

        {vendor.status !== "Active" && (
          <DropdownMenuItem
            onClick={() => onActivate(vendor)}
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-lime focus:bg-surface-deep focus:text-lime rounded-lg cursor-pointer transition-colors" >
            <CheckCircle size={13} className="shrink-0" />
            <span>Activate</span>
          </DropdownMenuItem>
        )}

        {vendor.status !== "Suspended" && (
          <DropdownMenuItem
            onClick={() => onSuspend(vendor)}
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-orange-400 focus:bg-surface-deep focus:text-orange-400 rounded-lg cursor-pointer transition-colors" >
            <PauseCircle size={13} className="shrink-0" />
            <span>Suspend</span>
          </DropdownMenuItem>
        )}

        {!vendor.isVerified && (
          <DropdownMenuItem
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-blue-400 focus:bg-surface-deep focus:text-blue-400 rounded-lg cursor-pointer transition-colors" >
            <ShieldCheck size={13} className="shrink-0" />
            <span>Verify vendor</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator className="bg-line/10 my-1" />

        <DropdownMenuItem
          onClick={() => onDelete(vendor)}
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-coral focus:bg-coral/10 focus:text-coral rounded-lg cursor-pointer transition-colors" >
          <Trash2 size={13} className="shrink-0" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}