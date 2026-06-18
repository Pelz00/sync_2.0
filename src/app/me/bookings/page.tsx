/**
 * ROUTE: /me/bookings
 * ACCESS: authenticated student
 * PURPOSE: All active + past bookings (hostels, beauty, laundry, events tickets). Filterable by status.
 * BUILT HERE: Status <Tabs>, booking card list with <OrderStageTracker>.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
"use client";

import { useState } from 'react';
import { OrderStageTracker } from '@/components/shared';
import { EmptyState } from '@/components/shared';
import { Calendar, Home, Shirt, Sparkles, Ticket } from 'lucide-react';

interface MockBooking {
  id: string;
  type: 'Hostel' | 'Laundry' | 'Beauty' | 'Event';
  title: string;
  provider: string;
  date: string;
  price: string;
  status: 'active' | 'past';
  currentIndex: number;
  stages: { id: string; label: string }[];
}

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');

  const allBookings: MockBooking[] = [
    {
      id: "BK-8902",
      type: "Hostel",
      title: "Tanke Crescent Lodge · Room 4B",
      provider: "Hostel Management",
      date: "June 15, 2026",
      price: "₦165,000 / session",
      status: "active",
      currentIndex: 1,
      stages: [
        { id: "s1", label: "Applied" },
        { id: "s2", label: "Reviewed" },
        { id: "s3", label: "Allocated" }
      ]
    },
    {
      id: "BK-4412",
      type: "Laundry",
      title: "8kg Mixed Express Wash",
      provider: "QuickWash Hub",
      date: "June 18, 2026",
      price: "₦4,500",
      status: "active",
      currentIndex: 1,
      stages: [
        { id: "l1", label: "Received" },
        { id: "l2", label: "Washing" },
        { id: "l3", label: "Ready" }
      ]
    },
    {
      id: "BK-1094",
      type: "Beauty",
      title: "Box Braids & Hair Treatment",
      provider: "Glamour Touch Salon",
      date: "May 12, 2026",
      price: "₦12,000",
      status: "past",
      currentIndex: 3,
      stages: [
        { id: "b1", label: "Booked" },
        { id: "b2", label: "Serving" },
        { id: "b3", label: "Completed" }
      ]
    },
    {
      id: "BK-0043",
      type: "Event",
      title: "Tech Innovation Hub Summit",
      provider: "UNILORIN Aud.",
      date: "April 20, 2026",
      price: "₦2,500",
      status: "past",
      currentIndex: 3,
      stages: [
        { id: "e1", label: "Paid" },
        { id: "e2", label: "Verified" },
        { id: "e3", label: "Attended" }
      ]
    }
  ];

  const filteredBookings = allBookings.filter(booking => booking.status === activeTab);

  const getIcon = (type: MockBooking['type']) => {
    switch (type) {
      case 'Hostel': return <Home className="h-4 w-4 text-lime" />;
      case 'Laundry': return <Shirt className="h-4 w-4 text-lime" />;
      case 'Beauty': return <Sparkles className="h-4 w-4 text-lime" />;
      case 'Event': return <Ticket className="h-4 w-4 text-lime" />;
    }
  };

  return (
    <section className="flex flex-col gap-3">
      {/* Eyebrow Path */}
      <h1 className="font-mono text-sm tracking-wide text-content-muted">
        /ME/BOOKINGS
      </h1>

      {/* Header Title */}
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display mt-2 text-3xl font-medium text-content">
          Your <span className="text-lime">Bookings</span>
        </h2>
      </div>

      {/* Interactive Tabs Menu */}
      <div className="border-line/10 mt-4 flex gap-2 border-b pb-px">
        <button
          onClick={() => setActiveTab('active')}
          className={`font-body relative pb-3 text-sm font-medium transition-colors ${
            activeTab === 'active' ? 'text-content' : 'text-content-muted hover:text-content'
          }`}
        >
          Active Orders
          {activeTab === 'active' && (
            <div className="bg-lime absolute bottom-0 left-0 h-0.5 w-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`font-body relative pb-3 text-sm font-medium transition-colors ${
            activeTab === 'past' ? 'text-content' : 'text-content-muted hover:text-content'
          }`}
        >
          Past History
          {activeTab === 'past' && (
            <div className="bg-lime absolute bottom-0 left-0 h-0.5 w-full" />
          )}
        </button>
      </div>

      {/* Content Rendering Block */}
      <section className="mt-6">
        {filteredBookings.length === 0 ? (
          <EmptyState
            title={`No ${activeTab} bookings found`}
            description={`You do not have any registered ${activeTab} bookings or reservations processing at this moment.`}
          />
        ) : (
          <div className="flex flex-col gap-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="border-line/10 bg-panel/40 flex flex-col gap-5 rounded-xl border p-5 backdrop-blur-sm shadow-sm"
              >
                {/* Card Top Row */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-ink/5 flex h-9 w-9 items-center justify-center rounded-lg border border-ink/10">
                      {getIcon(booking.type)}
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-content-muted">
                        {booking.id} · {booking.type}
                      </span>
                      <h3 className="font-display text-lg font-medium text-content leading-snug">
                        {booking.title}
                      </h3>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-mono text-sm font-medium text-content">{booking.price}</p>
                    <p className="mt-0.5 flex items-center justify-end gap-1 font-body text-xs text-content-muted">
                      <Calendar className="h-3 w-3" /> {booking.date}
                    </p>
                  </div>
                </div>

                {/* Inner progress rail using system design tokens */}
                <div className="bg-panel/60 border border-line/5 rounded-lg p-4">
                  <OrderStageTracker 
                    stages={booking.stages} 
                    currentIndex={booking.currentIndex} 
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}