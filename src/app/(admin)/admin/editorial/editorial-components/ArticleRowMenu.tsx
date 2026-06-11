"use client";

import { Trash2, Eye, Edit, MoreVertical } from "lucide-react";
import type { Article } from "../admin-editorialTypes";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } 
from "@/components/ui/dropdown-menu"; 

interface ArticleRowMenuProps {
  article: Article;
  onView: (article: Article) => void;
  onEdit: (article: Article) => void;
  onDelete: (article: Article) => void;
}

export function ArticleRowMenu({ article, onView, onEdit, onDelete }: ArticleRowMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          onClick={(e) => e.stopPropagation()}
          className="p-1.5 rounded-lg text-content-muted hover:text-content hover:bg-surface-deep transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent/50"
          aria-label="Article options" >
          <MoreVertical size={16} />
        </button>
      </DropdownMenuTrigger>

      {/* Your premium min-w-[13rem] token will perfectly frame this slate */}
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={(e) => { e.stopPropagation(); onView(article); }} >
          <Eye size={14} className="text-content-muted/70" />
          <span>View</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={(e) => { e.stopPropagation(); onEdit(article); }}>
          <Edit size={14} className="text-content-muted/70" />
          <span>Edit</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem 
          onClick={(e) => { e.stopPropagation(); onDelete(article); }}
          className="text-coral data-[highlighted]:bg-coral/10 focus:text-coral font-medium" >
          <Trash2 size={14} className="shrink-0" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}