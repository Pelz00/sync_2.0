"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Calendar, Eye, User, Pencil, ArrowLeft } from "lucide-react";
import { ArticleStatusBadge } from "./ArticleStatusBadge";
import { ArticleCategoryBadge } from "./ArticleCategoryBadge";
import type { Article } from "../admin-editorialTypes";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface ArticleViewModalProps {
  article: Article | null;
  onClose: () => void;
  onEdit: (article: Article) => void;
}

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
    setTimeout(onClose, 200);
  }

  // ── Escape key ──────────────────────────────────────────────────────────────
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    if (article) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [article]);

  if (!article) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 w-screen transition-all duration-200 ease-out flex items-center justify-center p-0 md:p-4",
        isVisible ? "bg-black/60 backdrop-blur-xs" : "bg-black/0 backdrop-blur-none"
      )}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }} >
      
      {/* Modal Layout Frame */}
      <div 
        className={cn(
          "bg-panel border border-line/15 rounded-none md:rounded-xl shadow-pop w-full h-full md:h-auto md:max-h-[85vh] max-w-4xl flex flex-col overflow-hidden origin-center",
          "transition-all duration-200 ease-out",
          isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-98 translate-y-2"
        )} >
        
        {/* Header Block / Sticky top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line/15 shrink-0 bg-panel">
          <button
            type="button"
            onClick={handleClose}
            className="flex items-center gap-2 text-xs font-medium text-content-muted/80 hover:text-content transition-colors cursor-pointer" >
            <ArrowLeft size={14} />
            Back to Editorial
          </button>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              onClick={() => onEdit(article)}
              className="bg-lime text-ink font-semibold hover:opacity-90 transition-opacity px-4 h-9 shadow-sm gap-2" >
              <Pencil size={13} />
              Edit Article
            </Button>
            <button
              type="button"
              onClick={handleClose}
              className="p-1.5 rounded-md text-content-muted/60 hover:text-content hover:bg-surface-deep border border-line/15 transition-colors cursor-pointer" >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Input Fields / Details Wrapper */}
        <div className="flex-1 overflow-y-auto CustomScrollbar bg-panel">
          {/* Hero image preview banner frame */}
          {article.image && (
            <div className="relative w-full bg-surface-deep/20 border-b border-line/10 flex justify-center h-[240px] md:h-[360px]">
              <Image
                src={article.image}
                alt={article.title}
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-cover w-full h-full"
                width={800}
                height={360}
                priority />
              {article.featured && (
                <div className="absolute top-4 left-6">
                  <span className="inline-flex items-center text-[10px] uppercase tracking-widest font-bold text-coral bg-coral/10 border border-coral/20 px-2.5 py-1 rounded-md shadow-sm backdrop-blur-xs">
                    Featured
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Core Content Layout Area */}
          <div className="px-6 py-6 md:py-8 max-w-3xl mx-auto space-y-5">

            {/* Category + Status Pipeline Badge Row */}
            <div className="flex flex-wrap items-center gap-2">
              <ArticleCategoryBadge category={article.category} />
              <ArticleStatusBadge status={article.status} />
              {article.featured && !article.image && (
                <span className="inline-flex items-center text-[10px] uppercase tracking-widest font-bold text-coral bg-coral/10 border border-coral/20 px-2 py-0.5 rounded-md">
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-xl font-display font-semibold text-content leading-snug tracking-tight md:text-2xl">
              {article.title}
            </h1>

            {/* Meta Row Meta Array Data Strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-content-muted/80 pb-4 border-b border-line/15">
              <span className="flex items-center gap-1.5">
                <User size={13} className="text-content-muted/50" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-content-muted/50" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5 font-mono">
                <Eye size={13} className="text-content-muted/50" />
                {article.views.toLocaleString()} views
              </span>
            </div>

            {/* Main Content Body Container */}
            <div className="space-y-2">
              <p className="block text-[10px] uppercase tracking-widest font-bold text-content-muted/90">
                Content
              </p>
              {article.content ? (
                <div className="prose prose-sm max-w-none text-content/85 font-sans leading-relaxed whitespace-pre-wrap antialiased">
                  {article.content}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 bg-surface-deep/20 rounded-xl border border-dashed border-line/15">
                  <p className="text-xs text-content-muted/80 font-medium">No content written yet</p>
                  <button
                    type="button"
                    onClick={() => onEdit(article)}
                    className="mt-2 text-xs text-lime font-bold uppercase tracking-widest hover:opacity-80 transition-opacity cursor-pointer" >
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