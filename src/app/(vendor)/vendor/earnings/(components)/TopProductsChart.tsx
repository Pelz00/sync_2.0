import React from 'react';
import { TopProduct } from './types';

interface TopProductsChartProps {
  data: TopProduct[];
}

export function TopProductsChart({ data }: TopProductsChartProps) {
  const max = Math.max(...data.map((d) => d.revenue));
  return (
    <div className="bg-panel shadow-card rounded-xl border border-line/10 p-5 w-full">
      <span className="font-display text-base font-medium text-content">Top Products</span>
      <div className="mt-4 space-y-3">
        {data.map((product) => (
          <div key={product.name} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-right text-xs text-content-muted truncate">{product.name}</span>
            <div className="flex-1 h-6 rounded-full bg-surface-deep overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{ width: `${(product.revenue / max) * 100}%` }}
              />
            </div>
            <span className="w-16 text-right font-mono text-[11px] text-content-muted">
              ₦{(product.revenue / 1000).toFixed(0)}k
            </span>
          </div>
        ))}
      </div>
      {/* X-axis labels */}
      <div className="mt-2 flex justify-between px-[6.5rem] font-mono text-[10px] text-content-muted">
        <span>₦0k</span>
        <span>₦20k</span>
        <span>₦40k</span>
        <span>₦60k</span>
        <span>₦80k</span>
      </div>
    </div>
  );
}
