import React from 'react';
import { TopProduct } from './types';

interface TopProductsChartProps {
  data: TopProduct[];
}

export function TopProductsChart({ data }: TopProductsChartProps) {
  const max = Math.max(...data.map((d) => d.revenue));
  return (
    <div className="bg-panel shadow-card border-line/10 w-full rounded-xl border p-3">
      <span className="font-display text-content text-base font-medium">Top Products</span>
      <div className="mt-4 space-y-3">
        {data.map((product) => (
          <div key={product.name} className="flex items-center gap-3">
            <span className="text-content-muted w-24 shrink-0 truncate text-right text-xs">
              {product.name}
            </span>
            <div className="bg-surface-deep h-6 flex-1 overflow-hidden rounded-full">
              <div
                className="h-full rounded-full bg-lime-500 transition-all"
                style={{ width: `${(product.revenue / max) * 100}%` }}
              />
            </div>
            <span className="text-content-muted w-16 text-right font-mono text-[11px]">
              ₦{(product.revenue / 1000).toFixed(0)}k
            </span>
          </div>
        ))}
      </div>
      {/* X-axis labels */}
      <div className="text-content-muted mt-2 flex justify-between gap-4 px-26 font-mono text-[10px]">
        <span>₦0k</span>
        <span>₦20k</span>
        <span>₦40k</span>
        <span>₦60k</span>
        <span>₦80k</span>
      </div>
    </div>
  );
}
