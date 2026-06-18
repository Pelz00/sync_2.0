/**
 * ROUTE: /me/reviews
 * ACCESS: authenticated student
 * PURPOSE: Reviews the student has left, and prompts to leave reviews on completed bookings.
 * BUILT HERE: Tabs: 'To review' / 'Posted'. <ReviewCard> list, inline rating form.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
"use client";

import { useState } from 'react';
import { EmptyState, ReviewCard } from '@/components/shared'; // Added the official ReviewCard import
import { Star, MessageSquare, Calendar, Send } from 'lucide-react';

interface PendingReview {
  id: string;
  type: string;
  title: string;
  provider: string;
  date: string;
}

// Updated data properties to align nicely with global shared ReviewCard structures
interface MockPostedReview {
  id: string;
  title: string;
  subtitle?: string;
  rating: number;
  content: string;
  date: string;
}

export default function MyReviewsPage() {
  const [activeTab, setActiveTab] = useState<'pending' | 'posted'>('pending');
  const [selectedPendingId, setSelectedPendingId] = useState<string | null>(null);
  
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([
    {
      id: "pr-1",
      type: "Hostel",
      title: "Tanke Crescent Lodge · Room 4B",
      provider: "Hostel Management",
      date: "Session Ended June 2026",
    },
    {
      id: "pr-2",
      type: "Laundry",
      title: "8kg Mixed Express Wash",
      provider: "QuickWash Hub",
      date: "Completed June 18, 2026",
    }
  ]);

  const [postedReviews, setPostedReviews] = useState<MockPostedReview[]>([
    {
      id: "rev-1",
      title: "Glamour Touch Salon · Box Braids",
      subtitle: "Verified Review · Beauty",
      rating: 5,
      content: "Absolutely amazing experience. The stylist was fast, highly professional, and the atmosphere was super comfortable. Definitely coming back!",
      date: "May 14, 2026",
    },
    {
      id: "rev-2",
      title: "Tech Innovation Hub Summit",
      subtitle: "Verified Review · Event",
      rating: 4,
      content: "Great speaker lineup and superb organization. The check-in ticketing system was completely seamless. Knocked off one star just because the acoustics in the hall could be better.",
      date: "April 21, 2026",
    }
  ]);

  const handleSubmitReview = (item: PendingReview) => {
    if (rating === 0) return;

    const newReview: MockPostedReview = {
      id: `rev-${Date.now()}`,
      title: item.title,
      subtitle: `Verified Review · ${item.type}`,
      rating: rating,
      content: comment || "Spontaneous rating left by student.",
      date: "Today",
    };

    setPostedReviews([newReview, ...postedReviews]);
    setPendingReviews(pendingReviews.filter(p => p.id !== item.id));
    
    setSelectedPendingId(null);
    setRating(0);
    setComment('');
    setActiveTab('posted'); 
  };

  return (
    <section className="flex flex-col gap-3">
      <h1 className="font-mono text-sm tracking-wide text-content-muted">
        /ME/REVIEWS
      </h1>

      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display mt-2 text-3xl font-medium text-content">
          My <span className="text-lime">Reviews</span>
        </h2>
      </div>

      {/* View Selector Tabs */}
      <div className="border-line/10 mt-4 flex gap-2 border-b pb-px">
        <button
          onClick={() => setActiveTab('pending')}
          className={`font-body relative pb-3 text-sm font-medium transition-colors flex items-center gap-2 ${
            activeTab === 'pending' ? 'text-content' : 'text-content-muted hover:text-content'
          }`}
        >
          To Review
          {pendingReviews.length > 0 && (
            <span className="bg-lime text-ink flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold">
              {pendingReviews.length}
            </span>
          )}
          {activeTab === 'pending' && <div className="bg-lime absolute bottom-0 left-0 h-0.5 w-full" />}
        </button>

        <button
          onClick={() => setActiveTab('posted')}
          className={`font-body relative pb-3 text-sm font-medium transition-colors flex items-center gap-2 ${
            activeTab === 'posted' ? 'text-content' : 'text-content-muted hover:text-content'
          }`}
        >
          Posted History
          <span className="text-content-muted text-xs">({postedReviews.length})</span>
          {activeTab === 'posted' && <div className="bg-lime absolute bottom-0 left-0 h-0.5 w-full" />}
        </button>
      </div>

      {/* Main Content Render Block */}
      <section className="mt-6">
        {activeTab === 'pending' ? (
          pendingReviews.length === 0 ? (
            <EmptyState
              title="All caught up!"
              description="You don't have any pending orders or completed campus services waiting for a review right now."
            />
          ) : (
            <div className="flex flex-col gap-4">
              {pendingReviews.map((item) => {
                const isFormOpen = selectedPendingId === item.id;
                return (
                  <div 
                    key={item.id}
                    className="border-line/10 bg-panel/40 flex flex-col rounded-xl border p-5 backdrop-blur-sm transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-lime bg-lime/10 px-2 py-0.5 rounded">
                          {item.type}
                        </span>
                        <h3 className="font-display text-lg font-medium text-content mt-2">
                          {item.title}
                        </h3>
                        <p className="font-body text-xs text-content-muted mt-0.5">
                          Provided by {item.provider}
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedPendingId(isFormOpen ? null : item.id)}
                        className="bg-lime text-ink hover:bg-lime/90 flex items-center gap-2 rounded-lg px-4 py-2 font-body text-xs font-semibold transition-colors shadow-sm"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        {isFormOpen ? "Close Form" : "Write Review"}
                      </button>
                    </div>

                    {/* Expanding Dynamic Rating Form */}
                    {isFormOpen && (
                      <div className="bg-panel/60 border border-line/5 mt-5 rounded-lg p-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="flex items-center gap-2">
                          <span className="font-body text-xs text-content-muted mr-2">Your Rating:</span>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="transition-transform active:scale-95"
                            >
                              <Star 
                                className={`h-5 w-5 ${
                                  star <= (hoverRating || rating) 
                                    ? 'text-lime fill-lime' 
                                    : 'text-content-muted/30'
                                }`} 
                              />
                            </button>
                          ))}
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="font-body text-xs text-content-muted">Share your detailed experience:</label>
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="How was the service? Mention responsiveness, value, or location details..."
                            className="bg-panel/40 border border-line/10 focus:border-lime/30 rounded-lg p-3 font-body text-sm text-content placeholder-content-muted/50 focus:outline-none resize-none h-24 transition-colors"
                          />
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={() => handleSubmitReview(item)}
                            disabled={rating === 0}
                            className="bg-ink text-cream hover:bg-ink/90 disabled:opacity-30 disabled:hover:bg-ink flex items-center gap-2 rounded-lg px-4 py-2 font-body text-xs font-medium transition-all"
                          >
                            <Send className="h-3.5 w-3.5" />
                            Submit Feedback
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )
        ) : (
          postedReviews.length === 0 ? (
            <EmptyState
              title="No posted feedback"
              description="Reviews or ratings you publish across campus spaces will show up directly in this history log."
            />
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {/* Refactored loop cleanly applying the system's official <ReviewCard /> composite component */}
              {postedReviews.map((review) => (
                <ReviewCard key={review.id} {...review} />
              ))}
            </div>
          )
        )}
      </section>
    </section>
  );
}