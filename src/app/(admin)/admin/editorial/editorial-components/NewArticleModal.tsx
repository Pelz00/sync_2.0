"use client";

import { useState, useRef, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { ARTICLE_CATEGORIES } from "../admin-editorialConstants";
import type { NewArticleFormValues } from "../admin-editorialTypes";
import { Input, Button, Textarea, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Checkbox } from "@/components/ui";
import { cn } from "@/lib/utils";

interface NewArticleModalProps {
  open: boolean;
  onClose: () => void;
  onPublish: (values: NewArticleFormValues) => void;
  onSaveDraft: (values: NewArticleFormValues) => void;
  onSchedule: (values: NewArticleFormValues) => void;
}

const INITIAL_FORM: NewArticleFormValues = {
  title: "",
  category: "",
  excerpt: "",
  content: "",
  featuredImage: null,
  markAsFeatured: false,
};

export function NewArticleModal({ open, onClose, onPublish, onSaveDraft, onSchedule,
}: NewArticleModalProps) {
  const [form, setForm] = useState<NewArticleFormValues>(INITIAL_FORM);
  const [isVisible, setIsVisible] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Smooth entrance interpolation
  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  function handleClose() {
    setIsVisible(false);
    setTimeout(() => {
      setForm(INITIAL_FORM);
      onClose();
    }, 200);
  }

  // Keyboard shortcut layout trap closure
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function updateField<K extends keyof NewArticleFormValues>(
    key: K,
    value: NewArticleFormValues[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ease-out",
        isVisible ? "bg-black/60 backdrop-blur-xs" : "bg-black/0 backdrop-blur-none",
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }} >
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
            <h2 className="text-base text-xl font-display font-semibold text-content tracking-tight">
              Create New Article
            </h2>
            <p className=" text-content-muted/80 mt-0.5">
              Write and configuration manage platform editorial parameters.
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
          {/* Article Title */}
          <div className="space-y-1.5">
            <label className="block text-[12px] uppercase tracking-widest font-bold text-content-muted/90">
              Article Title
            </label>
            <Input
              type="text"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Enter article title..."
              className="w-full bg-surface-deep/40 border-line/15  text-content placeholder:text-content-muted/50 h-9 transition-colors focus:border-line/40 focus:bg-surface-deep/70" />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="block text-[12px] uppercase tracking-widest font-bold text-content-muted/90">
              Category
            </label>
            <Select
              value={form.category}
              onValueChange={(val) => updateField("category", val as NewArticleFormValues["category"])} >
              <SelectTrigger className="w-full h-9 bg-surface-deep/40 border-line/15  focus:border-line/40 focus:bg-surface-deep/70 focus:ring-0">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="w-[--radix-select-trigger-width]">
                {ARTICLE_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat} className="">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              className="w-full bg-surface-deep/40 border border-line/15 outline-none! ring-0! rounded-md px-3 py-2  text-content placeholder:text-content-muted/50 resize-none transition-colors focus:border-line/40 focus:bg-surface-deep/70 outline-none" />
          </div>

          {/* Content Body */}
          <div className="space-y-1.5">
            <label className="block text-[12px] uppercase tracking-widest font-bold text-content-muted/90">
              Content
            </label>
            <Textarea
              value={form.content}
              onChange={(e) => updateField("content", e.target.value)}
              placeholder="Write your article content here..."
              rows={6}
              className="w-full bg-surface-deep/40 border border-line/15 outline-none! ring-0! rounded-md px-3 py-2  text-content placeholder:text-content-muted/50 resize-none transition-colors focus:border-line/40 focus:bg-surface-deep/70 font-sans leading-relaxed" />
          </div>

          {/* file Attachments */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-[12px] uppercase tracking-widest font-bold text-content-muted/90">
              Featured Image
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-surface-deep/20 border border-line/10 p-3 rounded-lg">
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileRef.current?.click()}
                  className="bg-panel  border-line/15 gap-2 hover:bg-surface-deep" >
                  <Upload size={13} className="text-content-muted/80" />
                  <span className="max-w-[140px] truncate">
                    {form.featuredImage ? form.featuredImage.name : "Choose File"}
                  </span>
                </Button>
                {!form.featuredImage && (
                  <span className=" text-content-muted/50 font-medium text-[12px] md:text-sm">
                    No image file selected
                  </span>
                )}
              </div>

              <Input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => updateField("featuredImage", e.target.files?.[0] ?? null)} />

              {/* Checkbox */}
              <label className="flex items-center gap-2  text-content-muted/80 cursor-pointer sm:ml-auto select-none group">
                <Checkbox
                  id="markAsFeatured"
                  checked={form.markAsFeatured}
                  onCheckedChange={(checked) => updateField("markAsFeatured", !!checked)}
                  className="h-3.5 w-3.5  border-line/20 bg-surface-deep transition-colors focus:ring-0" />
                <span className="group-hover:text-content transition-colors">
                  Mark as featured asset
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Form Control Strip */}
        <div className="flex items-center justify-start gap-2 px-2 md:px-6 py-4 border-t border-line/15 shrink-0 bg-surface-deep/10">
          <Button
            type="button"
            size="sm"
            onClick={() => onPublish(form)}
            className="bg-lime text-ink font-semibold text-xs hover:opacity-90 transition-opacity md:px-4 h-9 shadow-sm cursor-pointer" >
            Publish Now
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onSaveDraft(form)}
            className="bg-panel border-line/15 text-content text-xs hover:bg-surface-deep md:px-4 h-9 cursor-pointer" >
            Save as Draft
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onSchedule(form)}
            className="bg-panel border-line/15 text-content text-xs hover:bg-surface-deep md:px-4 h-9 cursor-pointer" >
            Schedule
          </Button>
        </div>
      </div>
    </div>
  );
}