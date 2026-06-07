"use client";

import { useState, useRef, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { ARTICLE_CATEGORIES } from "../admin-editorialConstants";
import type { Article, ArticleStatus } from "../admin-editorialTypes";
import Image from "next/image";
import { Input } from "@/components/ui";
import { Textarea } from "@/components/ui";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EditArticleFormValues {
  title:          string;
  category:       Article["category"] | "";
  excerpt:        string;
  content:        string;
  featuredImage:  File | null;
  existingImage:  string | undefined;
  markAsFeatured: boolean;
  status:         ArticleStatus;
}

interface EditArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onSave:  (id: string, values: EditArticleFormValues) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_OPTIONS: ArticleStatus[] = ["Published", "Draft", "Scheduled"];

/**
 * EditArticleModal
 *
 * Pre-populated form for editing an existing article.
 * All fields from the article are loaded on open.
 * Actions: Save Changes | Save as Draft | Cancel.
 *
 * Transition: panel slides in from the right on open (drawer feel),
 * slides back out on close. Backdrop fades independently.
 */
export function EditArticleModal({ article, onClose, onSave }: EditArticleModalProps) {
  const [form,      setForm]      = useState<EditArticleFormValues | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // ── Populate form when article loads ──────────────────────────────────────
  useEffect(() => {
    if (article) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: seed the form from the article prop on open
      setForm({
        title:          article.title,
        category:       article.category,
        excerpt:        article.excerpt,
        content:        article.content ?? "",
        featuredImage:  null,
        existingImage:  article.image,
        markAsFeatured: article.featured,
        status:         article.status,
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
    setTimeout(onClose, 320);
  }

  // ── Escape key ────────────────────────────────────────────────────────────
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    if (article) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [article]);

  // ── Body scroll lock ──────────────────────────────────────────────────────
  useEffect(() => {
    if (article) document.body.style.overflow = "hidden";
    else         document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
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
      className={[
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "transition-all duration-300 ease-in-out",
        isVisible ? "bg-black/50 backdrop-blur-sm" : "bg-black/0 backdrop-blur-none",
      ].join(" ")}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }} >
      {/* Modal panel — slides up from below + fades in */}
      <div
        className={[
          "bg-white rounded-md shadow-2xl w-full max-w-xl flex flex-col max-h-[92vh]",
          "transition-all duration-300 ease-out",
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-[0.97]",
        ].join(" ")} >
        {/* ── Header ── */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Edit Article</h2>
            <p className="text-sm text-gray-500 mt-0.5 line-clamp-1 max-w-xs">
              {article.title}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors" >
            <X size={18} />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Article Title
            </label>
            <Input
              type="text"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Enter article title..."
              className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none! ring-0! transition" />
          </div>

          {/* Category + Status side by side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Category
              </label>
              <div className="relative">
                <select
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value as EditArticleFormValues["category"])}
                  className="w-full appearance-none border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-900 outline-none! ring-0! bg-white transition cursor-pointer" >
                  <option value="">Select category</option>
                  {ARTICLE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Status
              </label>
              <div className="relative">
                <select
                  value={form.status}
                  onChange={(e) => updateField("status", e.target.value as ArticleStatus)}
                  className="w-full appearance-none border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-900 outline-none! ring-0! bg-white transition cursor-pointer" >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Excerpt
            </label>
            <Textarea
              value={form.excerpt}
              onChange={(e) => updateField("excerpt", e.target.value)}
              placeholder="Brief summary of the article..."
              rows={2}
              className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none! ring-0! resize-none transition" />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Content
            </label>
            <Textarea
              value={form.content}
              onChange={(e) => updateField("content", e.target.value)}
              placeholder="Write your article content here..."
              rows={6}
              className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none! ring-0! resize-none transition" />
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image
            </label>

            {/* Existing image preview */}
            {form.existingImage && !form.featuredImage && (
              <div className="relative w-full h-36 rounded-md overflow-hidden mb-2 bg-gray-100">
                <Image
                  src={form.existingImage}
                  alt="Current featured"
                  className="w-full h-full object-cover"
                  width={200}
                  height={200} />
                <div className="absolute inset-0 bg-black/20 flex items-end p-2">
                  <span className="text-xs text-white bg-black/50 rounded px-2 py-0.5">
                    Current image
                  </span>
                </div>
              </div>
            )}

            {/* New file preview */}
            {form.featuredImage && (
              <div className="relative w-full h-36 rounded-md overflow-hidden mb-2 bg-gray-100">
                <Image
                  src={URL.createObjectURL(form.featuredImage)}
                  alt="New featured"
                  className="w-full h-full object-cover"
                  width={200}
                  height={200} />
                <div className="absolute inset-0 bg-black/20 flex items-end p-2">
                  <span className="text-xs text-white bg-black/50 rounded px-2 py-0.5">
                    New image
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors" >
                <Upload size={14} />
                {form.featuredImage ? "Change image" : "Replace image"}
              </button>
              {form.featuredImage && (
                <button
                  onClick={() => updateField("featuredImage", null)}
                  className="text-sm text-red-500 hover:text-red-700 transition-colors" >
                  Remove
                </button>
              )}
              <Input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => updateField("featuredImage", e.target.files?.[0] ?? null)} />

              {/* Mark as featured */}
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer ml-auto">
                <Input
                  type="checkbox"
                  checked={form.markAsFeatured}
                  onChange={(e) => updateField("markAsFeatured", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 accent-transparent cursor-pointer" />
                Mark as featured
              </label>
            </div>
          </div>
        </div>

        {/* ── Footer actions ── */}
        <div className="flex items-center gap-2 px-6 py-4 border-t border-gray-100 shrink-0">
          <button
            onClick={handleSave}
            disabled={!form.title || !form.category}
            className="bg-[#90d505] text-white text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-[#90d505e2] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors" >
            Save Changes
          </button>
          <button
            onClick={handleSaveDraft}
            disabled={!form.title || !form.category}
            className="border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-md cursor-pointer hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" >
            Save as Draft
          </button>
          <button
            onClick={handleClose}
            className="ml-auto text-sm text-gray-500 hover:text-gray-700 cursor-pointer transition-colors" >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}