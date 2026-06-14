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

export function ArticleRow({ article, onView, onEdit, onDelete }: ArticleRowProps) {
  return (
    <div className="flex flex-col items-start gap-4 px-5 py-4 transition-colors hover:bg-surface-deep/40 group md:flex-row border-line/10">
      {/* Article Thumbnail Display Canvas */}
      <div
        className="relative w-full h-32 md:w-36 md:h-20 shrink-0 rounded-lg overflow-hidden border border-line/15 bg-surface-deep cursor-pointer"
        onClick={() => onView(article)} >
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            sizes="(max-width: 768px) 100vw, 150px"
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-102"
            fill />
        ) : (
          <div className="flex items-center justify-center w-full h-full opacity-30">
            <svg viewBox="0 0 80 64" className="w-10 h-10 text-content-muted" fill="none">
              <path d="M10 12h60v40H10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="28" cy="26" r="6" stroke="currentColor" strokeWidth="2"/>
              <path d="M10 46l18-18 16 16 8-8 18 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>

      {/* Info Context Metadata Area */}
      <div className="flex-1 min-w-0">
        {article.featured && (
          <span className="inline-flex items-center text-eyebrow font-mono text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full mb-1.5">
            Featured
          </span>
        )}

        {/* Header Title Section */}
        <h3
          className="font-bold text-content leading-snug mb-1 cursor-pointer hover:text-accent-fg transition-colors line-clamp-1 md:text-lg tracking-tight"
          onClick={() => onView(article)} >
          {article.title}
        </h3>

        {/* Content Preview Block */}
        <p className="text-xs text-content-muted line-clamp-1 mb-3 md:text-sm">{article.excerpt}</p>

        {/* Nested Information Array List */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <ArticleCategoryBadge category={article.category} />

          <span className="flex items-center gap-1.5 text-xs text-content-muted/80">
            <User size={13} className="text-content-muted/50 shrink-0" />
            {article.author}
          </span>

          <span className="flex items-center gap-1.5 text-xs text-content-muted/80">
            <Calendar size={13} className="text-content-muted/50 shrink-0" />
            {article.date}
          </span>

          <span className="flex items-center gap-1.5 text-xs text-content-muted/80">
            <Eye size={13} className="text-content-muted/50 shrink-0" />
            {article.views.toLocaleString()}
          </span>

          <ArticleStatusBadge status={article.status} />
        </div>
      </div>

      {/* Action Popover Interface */}
      <div className="shrink-0 self-end transition-opacity md:opacity-0 group-hover:opacity-100 md:self-start md:block">
        <ArticleRowMenu
          article={article}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete} />
      </div>
    </div>
  );
}