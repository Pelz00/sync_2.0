"use client";

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { EditorialStatsRow } from "./EditorialStatsRow";
import { ArticleList } from "./ArticleList";
import { NewArticleModal } from "./NewArticleModal";
import { ArticleViewModal } from "./ArticleViewModal";
import { EditArticleModal } from "./EditArticleModal";
import type { EditArticleFormValues } from "./EditArticleModal";
import { ARTICLES, EDITORIAL_STATS } from "../admin-editorialConstants";
import type { Article, NewArticleFormValues, StatusFilterOption,CategoryFilterOption, } from "../admin-editorialTypes";

/**
 * AdminEditorialPage
 *
 * Full admin editorial management page.
 * - Stats row (Total / Published / Drafts / Views)
 * - Article list with search + status + category filters
 * - New Article modal (Publish / Draft / Schedule)
 * - Article View slide-over (click card or "View" in menu)
 * - Edit Article modal (pre-populated form)
 * - Three-dot row menu (View / Edit / Delete)
 */
export function AdminEditorialPage() {
  const [articles, setArticles] = useState<Article[]>(ARTICLES);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>("All Status");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilterOption>("All Categories");
  const [newModalOpen,    setNewModalOpen]    = useState(false);
  const [viewingArticle,  setViewingArticle]  = useState<Article | null>(null);
  const [editingArticle,  setEditingArticle]  = useState<Article | null>(null);

  // ── Filtered articles ──
  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchesSearch =
        !searchQuery ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.id.includes(searchQuery);
      const matchesStatus = statusFilter === "All Status" || a.status   === statusFilter;
      const matchesCategory = categoryFilter === "All Categories" || a.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [articles, searchQuery, statusFilter, categoryFilter]);

  // ── New article handlers ──
  function createArticle(values: NewArticleFormValues, status: Article["status"]) {
    if (!values.title || !values.category) return;
    const article: Article = {
      id: String(Date.now()),
      title: values.title,
      excerpt: values.excerpt,
      content: values.content,
      category: values.category as Article["category"],
      author: "Admin Team",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      views: 0,
      status,
      featured: values.markAsFeatured,
    };
    setArticles((prev) => [article, ...prev]);
  }

  // ── Edit save handler ──
  function handleSaveEdit(id: string, values: EditArticleFormValues) {
    setArticles((prev) =>
      prev.map((a) =>
        a.id !== id
          ? a
          : {
              ...a,
              title: values.title,
              excerpt: values.excerpt,
              content: values.content,
              category: values.category as Article["category"],
              status: values.status,
              featured: values.markAsFeatured,
              // Keep existing image if no new file chosen
              image: values.featuredImage
                ? URL.createObjectURL(values.featuredImage)
                : values.existingImage,
            }
      )
    );
    // Update viewingArticle too so the view panel reflects edits immediately
    setViewingArticle((prev) =>
      prev?.id === id
        ? {
            ...prev,
            title: values.title,
            excerpt: values.excerpt,
            content: values.content,
            category: values.category as Article["category"],
            status: values.status,
            featured: values.markAsFeatured,
            image: values.featuredImage
              ? URL.createObjectURL(values.featuredImage)
              : values.existingImage,
          }
        : prev
    );
  }

  // ── View → Edit transition ──
  function handleEditFromView(article: Article) {
    setViewingArticle(null);
    // Small delay so view panel closes before edit modal opens
    setTimeout(() => setEditingArticle(article), 150);
  }

  // ── Delete handler ──
  function handleDelete(article: Article) {
    setArticles((prev) => prev.filter((a) => a.id !== article.id));
    if (viewingArticle?.id === article.id) setViewingArticle(null);
  }

  // ── Live stats ──
  const liveStats = {
    ...EDITORIAL_STATS,
    totalArticles: articles.length,
    published: articles.filter((a) => a.status === "Published").length,
    drafts: articles.filter((a) => a.status === "Draft").length,
  };

  return (
    <div className="p-0 max-w-6xl mx-auto w-full md:p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">
            Admin
          </p>
          <h1 className="text-2xl font-bold text-gray-900">Editorial</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Create and manage blog posts, articles, and content.
          </p>
        </div>
        <button
          onClick={() => setNewModalOpen(true)}
          className="flex items-center min-w-30 gap-1 px-2 py-1.5 bg-[#9AE600] hover:bg-[#90d505] text-black cursor-pointer text-sm font-semibold rounded-sm transition-colors shadow-sm md:gap-2  md:px-4 md:py-2.5" >
          <Plus size={15} />
          New Article
        </button>
      </div>
      <EditorialStatsRow stats={liveStats} />

      <ArticleList
        articles={filtered}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        categoryFilter={categoryFilter}
        onSearchChange={setSearchQuery}
        onStatusChange={setStatusFilter}
        onCategoryChange={setCategoryFilter}
        onView={setViewingArticle}
        onEdit={setEditingArticle}
        onDelete={handleDelete} />

      <NewArticleModal
        open={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        onPublish={(v)   => createArticle(v, "Published")}
        onSaveDraft={(v) => createArticle(v, "Draft")}
        onSchedule={(v)  => createArticle(v, "Scheduled")} />

      <ArticleViewModal
        article={viewingArticle}
        onClose={() => setViewingArticle(null)}
        onEdit={handleEditFromView} />

      <EditArticleModal
        article={editingArticle}
        onClose={() => setEditingArticle(null)}
        onSave={handleSaveEdit} />
    </div>
  );
}
