"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { FilterDropdown } from "./FilterDropdown";
import { ArticleRow } from "./ArticleRow";
import { STATUS_FILTER_OPTIONS, CATEGORY_FILTER_OPTIONS, } from "../admin-editorialConstants";
import type {  Article, StatusFilterOption, CategoryFilterOption, } from "../admin-editorialTypes";
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

/**
 * ArticleList
 *
 * Search bar + filter dropdowns header, then the list of ArticleRow items.
 */
export function ArticleList({
  articles, searchQuery, statusFilter, categoryFilter, onSearchChange, onStatusChange, onCategoryChange, onView, onEdit, onDelete,
}: ArticleListProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-md">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 px-5 py-6 border-b border-gray-100">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search articles by title, content, or ID..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-sm transition placeholder:text-gray-400 outline-none! ring-0!" />
        </div>

        {/* Filters */}
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
            width="w-52" />
        </div>
      </div>

      {/* ── Article rows ── */}
      {articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <Search size={32} className="mb-3 opacity-40" />
          <p className="text-sm font-medium">No articles found</p>
          <p className="text-xs mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {articles.map((article) => (
            <ArticleRow
              key={article.id}
              article={article}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
