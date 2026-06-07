"use client";
import { useState, useRef, useEffect } from "react";
import { X, Upload, ChevronDown } from "lucide-react";
import { ARTICLE_CATEGORIES } from "../admin-editorialConstants";
import type { NewArticleFormValues } from "../admin-editorialTypes";
import { Input } from "@/components/ui";

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

/**
 * NewArticleModal
 *
 * Full-screen dialog for creating a new article.
 * Fields: Title, Category (dropdown), Excerpt, Content,
 * Featured Image (file picker), Mark as featured checkbox.
 * Actions: Publish Now | Save as Draft | Schedule.
 */
export function NewArticleModal({
  open, onClose, onPublish, onSaveDraft, onSchedule,
}: NewArticleModalProps) {
  const [form, setForm] = useState<NewArticleFormValues>(INITIAL_FORM);
  const [isVisible, setIsVisible] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // animation 
  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  // Play exit animation first, then reset form and call onClose
  function handleClose() {
    setIsVisible(false);
    setTimeout(() => {
      setForm(INITIAL_FORM);
      onClose();
    }, 300);
  }

  // Escape key
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
      className={[
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "transition-all duration-300 ease-in-out",
        isVisible ? "bg-black/40 backdrop-blur-sm" : "bg-black/0 backdrop-blur-none",
      ].join(" ")}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }} >
      {/* Modal panel */}
      <div
        className={[
          "bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]",
          "transition-all duration-300 ease-in-out",
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4" ].join(" ")} >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-[#90d505]">Create New Article</h2>
            <p className="text-sm text-gray-400 mt-0.5">
              Write and publish content for your platform.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors" >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
          {/* Article Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Article Title
            </label>
            <Input
              type="text"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Enter article title..."
              className="w-full border border-gray-200 focus:outline-none rounded-md px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none! transition ring-0!" />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Category
            </label>
            <div className="relative">
              <select
                value={form.category}
                onChange={(e) => updateField("category", e.target.value as NewArticleFormValues["category"])}
                className="w-full appearance-none border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-900 outline-none! ring-0! bg-white transition cursor-pointer" >
                <option value="">Select category</option>
                {ARTICLE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Excerpt
            </label>
            <textarea
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
            <textarea
              value={form.content}
              onChange={(e) => updateField("content", e.target.value)}
              placeholder="Write your article content here..."
              rows={4}
              className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none! ring-0! resize-none transition" />
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Featured Image
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors" >
                <Upload size={14} />
                {form.featuredImage ? form.featuredImage.name : "Choose File"}
              </button>
              {!form.featuredImage && (
                <span className="text-sm text-gray-400">No file chosen</span>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => updateField("featuredImage", e.target.files?.[0] ?? null)} />
              {/* Mark as featured checkbox */}
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer ml-auto">
                <input
                  type="checkbox"
                  checked={form.markAsFeatured}
                  onChange={(e) => updateField("markAsFeatured", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 accent-transparent cursor-pointer" />
                Mark as featured
              </label>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="flex items-center gap-2 px-6 py-4 border-t border-gray-100">
          <button
            onClick={() => { onPublish(form); handleClose(); }}
            className="text-white text-xs md:text-sm font-semibold px-5 py-2.5 rounded-md bg-[#9AE600] hover:bg-[#90d505] cursor-pointer transition-colors" >
            Publish Now
          </button>
          <button
            onClick={() => { onSaveDraft(form); handleClose(); }}
            className="border border-gray-200 text-gray-700 text-xs md:text-sm font-medium px-3 md:px-5 py-2.5 rounded-md hover:bg-gray-50 cursor-pointer transition-colors" >
            Save as Draft
          </button>
          <button
            onClick={() => { onSchedule(form); handleClose(); }}
            className="border border-gray-200 text-gray-700 text-sm font-medium px-5 py-3.5 md:py-2.5 rounded-md cursor-pointer hover:bg-gray-50 transition-colors" >
            Schedule
          </button>
        </div>

      </div>
    </div>
  );
}