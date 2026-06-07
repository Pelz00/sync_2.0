"use client";

import Image from "next/image";
import { Calendar, Eye, User } from "lucide-react";
import { ArticleStatusBadge } from "./ArticleStatusBadge";
import { ArticleCategoryBadge } from "./ArticleCategoryBadge";
import { ArticleRowMenu } from "./ArticleRowMenu";
import type { Article } from "../admin-editorialTypes";

interface ArticleRowProps {
  article: Article;
  onView: (article: Article) => void;
  onEdit: (article: Article) => void;
  onDelete: (article: Article) => void;
}

/**
 * ArticleRow
 *
 * Full article list row: thumbnail | featured badge + title + excerpt
 * | category + author + date + views + status | three-dot menu.
 */
export function ArticleRow({ article, onView, onEdit, onDelete }: ArticleRowProps) {
  return (
    <div className="flex flex-col items-start gap-4 px-5 py-5 hover:bg-gray-50 transition-colors group md:flex-row">
      <div
        className="relative md:w-36 md:h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 cursor-pointer"
        onClick={() => onView(article)}  >
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            sizes="80px"
            className="object-cover w-screen md:w-full"
            width={80}
            height={80} />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <svg viewBox="0 0 80 64" className="w-full h-full text-gray-300" fill="none">
              <rect width="80" height="64" fill="#F3F4F6" />
              <line x1="0" y1="0" x2="80" y2="64" stroke="#D1D5DB" strokeWidth="1.5" />
              <line x1="80" y1="0" x2="0" y2="64" stroke="#D1D5DB" strokeWidth="1.5" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {article.featured && (
          <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-wide text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded mb-1.5">
            Featured
          </span>
        )}

        {/* Title */}
        <h3
          className="font-semibold text-gray-900 leading-snug mb-1 cursor-pointer hover:underline transition-colors line-clamp-1 md:text-lg"
          onClick={() => onView(article)} >
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs text-gray-500 line-clamp-1 mb-2 md:text-sm">{article.excerpt}</p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3">
          <ArticleCategoryBadge category={article.category} />

          <span className="flex items-center gap-1 text-xs text-gray-500">
            <User size={11} />
            {article.author}
          </span>

          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar size={11} />
            {article.date}
          </span>

          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Eye size={11} />
            {article.views.toLocaleString()} views
          </span>

          <ArticleStatusBadge status={article.status} />
        </div>
      </div>

        <div className=" shrink-0 self-end group-hover:opacity-100 transition-opacity md:opacity-0 md:self-start md:block">
        <ArticleRowMenu
          article={article}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete} />
      </div>
    </div>
  )
}
