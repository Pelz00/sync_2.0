"use client";

import { useState, useRef, useEffect } from "react";
import { Trash2, Eye, MoreVertical } from "lucide-react";
import type { Article } from "../admin-editorialTypes";

interface ArticleRowMenuProps {
  article: Article;
  onView: (article: Article) => void;
  onEdit: (article: Article) => void;
  onDelete: (article: Article) => void;
}

/**
 * ArticleRowMenu
 *
 * Three-dot (⋮) dropdown menu on each article row.
 * Options: View, Edit, Delete.
 */
export function ArticleRowMenu({ 
  article, onView, onDelete } : ArticleRowMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
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
        className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        aria-label="Article options" >
        <MoreVertical size={16} />
      </button>
          
          {open && (
        <div className="absolute right-0 bottom-0 z-50 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
          <button
            onClick={() => { onView(article); setOpen(false); }}
            className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors" >
            <Eye size={14} /> View
          </button>
          <div className="border-t border-gray-100 my-1" />
          <button
            onClick={() => { onDelete(article); setOpen(false); }}
            className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors" >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
     
    </div>
  );
}
