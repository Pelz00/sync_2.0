"use client";

import { Search } from "lucide-react";
import { FilterDropdown } from "./FilterDropdown";
import { ArticleRow } from "./ArticleRow";
import { STATUS_FILTER_OPTIONS, CATEGORY_FILTER_OPTIONS } from "../admin-editorialConstants";
import type { Article, StatusFilterOption, CategoryFilterOption } from "../admin-editorialTypes";
import { Input } from "@/components/ui";

interface ArticleListProps {
  articles: Article[];
  searchQuery: string;
  statusFilter: StatusFilterOption;
  categoryFilter: CategoryFilterOption;
  onSearchChange: (q: string) => void;
  onStatusChange: (s: StatusFilterOption) => void;
  onCategoryChange: (c: CategoryFilterOption) => void;
  onView: (article: Article) => void;
  onEdit: (article: Article) => void;
  onDelete: (article: Article) => void;
}

export function ArticleList({
  articles, searchQuery, statusFilter, categoryFilter, onSearchChange, onStatusChange, onCategoryChange, onView, onEdit, onDelete,
}: ArticleListProps) {
  return (
    <div className="bg-panel border border-line/15 rounded-xl  transition-all duration-300">
      {/* Filters & Actions Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 px-5 py-4 border-b border-line/15">
        
        {/* Search Input Box */}
        <div className="relative flex-1 flex items-center bg-panel border border-line/15 rounded-lg px-3 focus-within:border-accent/60 transition-all h-10">
          <Search
            size={15}
            className="text-content-muted/50 shrink-0" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search articles by title, content, or ID..."
            className="w-full bg-transparent border-none! outline-none! ring-0! text-sm text-content placeholder:text-content-muted/40 py-1 pl-2" />
        </div>

        {/* Modular Filter System Layouts */}
        <div className="flex items-center gap-2 shrink-0">
          <FilterDropdown<StatusFilterOption>
            value={statusFilter}
            options={STATUS_FILTER_OPTIONS}
            onChange={onStatusChange}
            width="w-40" />

          <FilterDropdown<CategoryFilterOption>
            value={categoryFilter}
            options={CATEGORY_FILTER_OPTIONS}
            onChange={onCategoryChange}
            width="w-40"  />
        </div>
      </div>

      {/* ── Content Render */}
      {articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-10 h-10 rounded-lg bg-surface-deep border border-line/15 flex items-center justify-center mb-3 shadow-card">
            <Search size={18} className="text-content-muted/60" />
          </div>
          <h3 className="text-sm font-bold text-content">No articles found</h3>
          <p className="text-xs text-content-muted mt-1 max-w-xs">
            Try adjusting your query parameters or reset selected options.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-line/10">
          {articles.map((article) => (
            <ArticleRow
              key={article.id}
              article={article}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
}