"use client";

import { useState, useRef, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { ARTICLE_CATEGORIES } from "../admin-editorialConstants";
import type { Article, ArticleStatus } from "../admin-editorialTypes";
import Image from "next/image";
import { Input, Button, Textarea, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Checkbox } from "@/components/ui";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EditArticleFormValues {
  title: string;
  category: Article["category"] | "";
  excerpt: string;
  content: string;
  featuredImage: File | null;
  existingImage: string | undefined;
  markAsFeatured: boolean;
  status: ArticleStatus;
}

interface EditArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onSave: (id: string, values: EditArticleFormValues) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_OPTIONS: ArticleStatus[] = ["Published", "Draft", "Scheduled"];

export function EditArticleModal({ article, onClose, onSave }: EditArticleModalProps) {
  const [form, setForm] = useState<EditArticleFormValues | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // ── Populate form when article loads ──────────────────────────────────────
  useEffect(() => {
    if (article) {
      setForm({
        title: article.title,
        category: article.category,
        excerpt: article.excerpt,
        content: article.content ?? "",
        featuredImage: null,
        existingImage: article.image,
        markAsFeatured: article.featured,
        status: article.status,
      });
    }
  }, [article]);

  // ── Enter animation — fires after article + form are ready ───────────────
  useEffect(() => {
    if (article) {
      const id = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(id);
    }
  }, [article]);

  // ── Exit: animate out, then call onClose ──────────────────────────────────
  function handleClose() {
    setIsVisible(false);
    setTimeout(onClose, 200);
  }

  // ── Escape key ────────────────────────────────────────────────────────────
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    if (article) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [article]);

  if (!article || !form) return null;

  // ── Field helpers ─────────────────────────────────────────────────────────

  function updateField<K extends keyof EditArticleFormValues>(
    key: K,
    value: EditArticleFormValues[K],
  ) {
    setForm((prev) => prev ? { ...prev, [key]: value } : prev);
  }

  function handleSave() {
    if (!article || !form) return;
    if (!form.title || !form.category) return;
    onSave(article.id, form);
    handleClose();
  }

  function handleSaveDraft() {
    if (!article || !form) return;
    if (!form.title || !form.category) return;
    onSave(article.id, { ...form, status: "Draft" });
    handleClose();
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ease-out",
        isVisible ? "bg-black/60 backdrop-blur-xs" : "bg-black/0 backdrop-blur-none",
      )}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }} >
      
      {/* Modal Layout Frame */}
      <div
        className={cn(
          "bg-panel border border-line/15 rounded-xl shadow-pop w-full max-w-xl flex flex-col max-h-[85vh] origin-center",
          "transition-all duration-200 ease-out",
          isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-98 translate-y-2"
        )} >
        
        {/* Header Block */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-line/15 shrink-0">
          <div>
            <h2 className="text-xl font-display font-semibold text-content tracking-tight">Edit Article</h2>
            <p className="text-sm text-content-muted/80 mt-0.5 line-clamp-1 max-w-xs">
              {article.title}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-lg text-content-muted/60 hover:text-content hover:bg-surface-deep border border-line/15 transition-colors cursor-pointer" >
            <X size={15} />
          </button>
        </div>

        {/* Input Fields Wrapper */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5 CustomScrollbar">

          {/* Title */}
          <div className="space-y-1.5">
            <label className="block text-[12px] uppercase tracking-widest font-bold text-content-muted/90">
              Article Title
            </label>
            <Input
              type="text"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Enter article title..."
              className="w-full bg-surface-deep/40 border-line/15 text-sm text-content placeholder:text-content-muted/50 h-9 transition-colors focus:border-line/40 focus:bg-surface-deep/70" />
          </div>

          {/* Category + Status Side by Side (Radix UI Select Architecture) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[12px] uppercase tracking-widest font-bold text-content-muted/90">
                Category
              </label>
              <Select
                value={form.category}
                onValueChange={(val) => updateField("category", val as EditArticleFormValues["category"])} >
                <SelectTrigger className="w-full h-9 bg-surface-deep/40 border-line/15 text-sm focus:border-line/40 focus:bg-surface-deep/70 focus:ring-0">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="w-[--radix-select-trigger-width]">
                  {ARTICLE_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-sm">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[12px] uppercase tracking-widest font-bold text-content-muted/90">
                Status
              </label>
              <Select
                value={form.status}
                onValueChange={(val) => updateField("status", val as ArticleStatus)} >
                <SelectTrigger className="w-full h-9 bg-surface-deep/40 border-line/15 text-sm focus:border-line/40 focus:bg-surface-deep/70 focus:ring-0">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="w-[--radix-select-trigger-width]">
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s} className="text-sm">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-1.5">
            <label className="block text-[12px] uppercase tracking-widest font-bold text-content-muted/90">
              Excerpt
            </label>
            <Textarea
              value={form.excerpt}
              onChange={(e) => updateField("excerpt", e.target.value)}
              placeholder="Brief summary of the article..."
              rows={2}
              className="w-full bg-surface-deep/40 border-line/15 rounded-md px-3 py-2 text-sm text-content placeholder:text-content-muted/50 resize-none transition-colors focus:border-line/40 focus:bg-surface-deep/70 outline-none! ring-0!" />
          </div>

          {/* Content */}
          <div className="space-y-1.5">
            <label className="block text-[12px] uppercase tracking-widest font-bold text-content-muted/90">
              Content
            </label>
            <Textarea
              value={form.content}
              onChange={(e) => updateField("content", e.target.value)}
              placeholder="Write your article content here..."
              rows={6}
              className="w-full bg-surface-deep/40 border-line/15 rounded-md px-3 py-2 text-sm text-content placeholder:text-content-muted/50 resize-none transition-colors focus:border-line/40 focus:bg-surface-deep/70 outline-none! ring-0! font-sans leading-relaxed" />
          </div>

          {/* Media Attachments Layer */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-[12px] uppercase tracking-widest font-bold text-content-muted/90">
              Featured Image
            </label>

            {/* Existing image preview */}
            {form.existingImage && !form.featuredImage && (
              <div className="relative w-full h-36 rounded-lg overflow-hidden mb-2 bg-surface-deep/20 border border-line/10">
                <Image
                  src={form.existingImage}
                  alt="Current featured"
                  className="w-full h-full object-cover"
                  width={200}
                  height={200} />
                <div className="absolute inset-0 bg-black/30 flex items-end p-2">
                  <span className="text-[12px] uppercase tracking-wider font-bold text-white bg-black/60 rounded-lg px-2 py-0.5">
                    Current image
                  </span>
                </div>
              </div>
            )}

            {/* New file preview */}
            {form.featuredImage && (
              <div className="relative w-full h-36 rounded-lg overflow-hidden mb-2 bg-surface-deep/20 border border-line/10">
                <Image
                  src={URL.createObjectURL(form.featuredImage)}
                  alt="New featured"
                  className="w-full h-full object-cover"
                  width={200}
                  height={200} />
                <div className="absolute inset-0 bg-black/30 flex items-end p-2">
                  <span className="text-[12px] uppercase tracking-wider font-bold text-white bg-black/60 rounded-lg px-2 py-0.5">
                    New image
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-surface-deep/20 border border-line/10 p-3 rounded-lg">
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileRef.current?.click()}
                  className="bg-panel text-sm border-line/15 gap-2 hover:bg-surface-deep" >
                  <Upload size={13} className="text-content-muted/80" />
                  <span className="max-w-[140px] truncate">
                    {form.featuredImage ? form.featuredImage.name : form.existingImage ? "Change image" : "Choose File"}
                  </span>
                </Button>
                {form.featuredImage && (
                  <button
                    type="button"
                    onClick={() => updateField("featuredImage", null)}
                    className="text-sm font-semibold text-coral hover:underline transition-colors cursor-pointer" >
                    Remove
                  </button>
                )}
              </div>
              
              <Input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => updateField("featuredImage", e.target.files?.[0] ?? null)} />

              {/* Checkbox */}
              <label className="flex items-center gap-2 text-sm text-content-muted/80 cursor-pointer sm:ml-auto select-none group">
                <Checkbox
                  id="markAsFeatured"
                  checked={form.markAsFeatured}
                  onCheckedChange={(checked) => updateField("markAsFeatured", !!checked)}
                  className="h-3.5 w-3.5 border-line/20 bg-surface-deep transition-colors focus:ring-0" />
                <span className="group-hover:text-content transition-colors">
                  Mark as featured asset
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Form Control Strip */}
        <div className="flex items-center gap-2 px-2 md:px-6 py-4 border-t border-line/15 shrink-0 bg-surface-deep/10">
          <Button
            type="button"
            size="sm"
            onClick={handleSave}
            disabled={!form.title || !form.category}
            className="bg-lime text-ink font-semibold hover:opacity-90 transition-opacity text-xs md:text-sm md:px-4 h-9 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed" >
            Save Changes
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSaveDraft}
            disabled={!form.title || !form.category}
            className="bg-panel border-line/15 text-content hover:bg-surface-deep text-xs md:text-sm md:px-4 h-9 disabled:opacity-40 disabled:cursor-not-allowed" >
            Save as Draft
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClose}
            className="bg-panel border-line/15 text-content hover:bg-surface-deep md:px-4 text-xs md:text-sm h-9" >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}