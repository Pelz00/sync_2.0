"use client";
import { useState } from "react";
import type { TopProduct } from "../data";

const RANK_COLORS = ["bg-[#90d505]","bg-blue-500","bg-orange-500","bg-purple-500","bg-pink-500"];

export function TopProductsList({ products }: { products: TopProduct[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="rounded-2xl border border-line/15 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold">Top Products</h3>
        <span className="text-xs text-gray-400 font-medium">by revenue</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 px-3 mb-1">
        <div className="w-7 shrink-0" />
        <span className="flex-1 text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest">Product</span>
        <span className="w-20 text-right text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest">Orders</span>
        <span className="w-24 text-right text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest">Revenue</span>
      </div>

      <div className="flex flex-col">
        {products.map((p, i) => (
          <div key={p.rank}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all cursor-pointer ${
              hovered === i ? "bg-surface scale-[1.01]" : "hover:bg-gray-50/60"
            }`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Rank */}
            <div className={`w-7 h-7 rounded-full ${RANK_COLORS[i]} flex items-center justify-center shrink-0`}>
              <span className="text-xs font-black text-white">{p.rank}</span>
            </div>

            {/* Name + orders */}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate transition-colors ${
                hovered === i ? "text-[#5a9e00]" : "text-content-muted"
              }`}>
                {p.name}
              </p>
              <p className="text-xs text-gray-400">{p.orders.toLocaleString()} orders</p>
            </div>

            {/* Orders count */}
            <span className="w-20 text-right text-xs font-semibold text-gray-500 shrink-0">
              {p.orders.toLocaleString()}
            </span>

            {/* Revenue */}
            <span className="w-24 text-right text-sm font-black text-content-muted shrink-0">
              ₦{p.revenue.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
