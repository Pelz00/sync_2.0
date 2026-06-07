"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Calendar, Eye, User, Pencil, ArrowLeft } from "lucide-react";
import { ArticleStatusBadge } from "./ArticleStatusBadge";
import { ArticleCategoryBadge } from "./ArticleCategoryBadge";
import type { Article } from "../admin-editorialTypes";

interface ArticleViewModalProps {
  article: Article | null;
  onClose: () => void;
  onEdit: (article: Article) => void;
}

/**
 * ArticleViewModal
 *
 * Full-screen slide-over that shows the complete article:
 * hero image, featured badge, title, all meta (author / date / views / status),
 * excerpt, and full content body.
 */
export function ArticleViewModal({ article, onClose, onEdit }: ArticleViewModalProps) {
  // ── Transition state ────────────────────────────────────────────────────────
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (article) {
      const id = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(id);
    }
  }, [article]);

  function handleClose() {
    setIsVisible(false);
    setTimeout(onClose, 350); // matches duration-300 + small buffer
  }

  // ── Escape key ──────────────────────────────────────────────────────────────
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    if (article) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [article]);

  // ── Body scroll lock ────────────────────────────────────────────────────────
  useEffect(() => {
    if (article) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [article]);

  if (!article) return null;

  return (
    <div className={[ "fixed inset-0 z-50 w-screen transition-all duration-300 ease-in-out",
        isVisible ? "backdrop-blur-sm bg-black/20" : "backdrop-blur-none bg-black/0",
      ].join(" ")}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }} >
      <div className={[ "relative h-full w-screen m-auto bg-white shadow-2xl flex flex-col overflow-hidden",
          "transition-all duration-300 ease-in-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6" ].join(" ")} >
        {/* ── Sticky top bar ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <button
            onClick={handleClose}
            className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer hover:text-gray-900 transition-colors" >
            <ArrowLeft size={15} />
            Back to Editorial
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(article)}
              className="flex items-center gap-2 bg-[#90d505] hover:bg-[#90d505e2] text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors cursor-pointer" >
              <Pencil size={13} />
              Edit Article
            </button>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer bg-gray-100 transition-colors" >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── Scrollable content ── */}
        <div className="flex-1 overflow-y-auto">

          {/* Hero image */}
          {article.image && (
            <div className="relative w-full bg-gray-100">
              <Image
                src={article.image}
                alt={article.title}
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover m-auto w-screen md:w-[80vw] md:h-120"
                width={300}
                height={200} />
              {article.featured && (
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wide text-yellow-800 bg-yellow-400 px-3 py-1 rounded-full shadow">
                    Featured
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Content area */}
          <div className="py-7 w-[90vw] md:w-[80vw] m-auto">

            {/* Category + Status row */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <ArticleCategoryBadge category={article.category} />
              <ArticleStatusBadge status={article.status} />
              {article.featured && !article.image && (
                <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wide text-yellow-700 bg-yellow-100 px-2.5 py-0.5 rounded-full">
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-4">
              {article.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500 pb-5 mb-6 border-b border-gray-100">
              <span className="flex items-center gap-1.5">
                <User size={13} className="text-gray-400" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-gray-400" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye size={13} className="text-gray-400" />
                {article.views.toLocaleString()} views
              </span>
            </div>

            {/* Excerpt */}
            {article.excerpt && (
              <div className="bg-gray-50 border-l-4 border-[#90d505] rounded-r-md px-5 py-4 mb-6">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Excerpt
                </p>
                <p className="text-base text-gray-700 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            )}

            {/* Content body */}
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                Content
              </p>
              {article.content ? (
                <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {article.content}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-md border border-dashed border-gray-200">
                  <p className="text-sm text-gray-400 font-medium">No content written yet</p>
                  <button
                    onClick={() => onEdit(article)}
                    className="mt-3 text-sm text-[#90D505] hover:underline font-medium" >
                    Add content
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}