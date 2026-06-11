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
import type { Article, NewArticleFormValues, StatusFilterOption, CategoryFilterOption } from "../admin-editorialTypes";
import { Button } from "@/components/ui";

export function AdminEditorialPage() {
  const [articles, setArticles] = useState<Article[]>(ARTICLES);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>("All Status");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilterOption>("All Categories");
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [viewingArticle, setViewingArticle] = useState<Article | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // ── Filtered articles ──
  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchesSearch =
        !searchQuery ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.id.includes(searchQuery);
      const matchesStatus = statusFilter === "All Status" || a.status === statusFilter;
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
    const updatedFields = {
      title: values.title,
      excerpt: values.excerpt,
      content: values.content,
      category: values.category as Article["category"],
      status: values.status,
      featured: values.markAsFeatured,
    };

    setArticles((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a;
        return {
          ...a,
          ...updatedFields,
          image: values.featuredImage
            ? URL.createObjectURL(values.featuredImage)
            : values.existingImage,
        };
      })
    );

    setViewingArticle((prev) => {
      if (prev?.id !== id) return prev;
      return {
        ...prev,
        ...updatedFields,
        image: values.featuredImage
          ? URL.createObjectURL(values.featuredImage)
          : values.existingImage,
      };
    });
  }

  // ── View → Edit transition ──
  function handleEditFromView(article: Article) {
    setViewingArticle(null);
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
    <div className="w-full mx-auto p-1 transition-colors duration-300">
      {/* Page Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <p className="eyebrow text-content-muted">ADMIN</p>
          <h1 className="text-2xl font-display font-semibold tracking-tight text-content md:text-3xl mt-1">Editorial</h1>
          <p className=" text-content-muted/80 mt-1">
            Create and manage blog posts, articles, and content layouts.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() => setNewModalOpen(true)}
          className="bg-lime text-ink cursor-pointer font-semibold hover:opacity-90 transition-opacity h-10 px-4 shadow-sm gap-2 whitespace-nowrap" >
          <Plus size={16} />
          New Article
        </Button>
      </div>
      
      {/* Analytics Aggregators */}
      <EditorialStatsRow stats={liveStats} />

      {/* Main Interactive Table & Filter Layer */}
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

      {/* Composition Overlays */}
      <NewArticleModal
        open={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        onPublish={(v) => createArticle(v, "Published")}
        onSaveDraft={(v) => createArticle(v, "Draft")}
        onSchedule={(v) => createArticle(v, "Scheduled")} />

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