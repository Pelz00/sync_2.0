'use client';

import { Check } from 'lucide-react';
import type { CurrentPlan } from './types';

interface Props {
  plan: CurrentPlan;
}

function formatRenewalDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-NG', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function CurrentPlanBanner({ plan }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-lime-600 px-8 py-7 text-white">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute right-20 -bottom-14 h-56 w-56 rounded-full bg-white/5" />

      {/* Commission pill */}
      <div className="absolute top-1/2 right-8 -translate-y-1/2">
        <div className="flex flex-col items-center justify-center rounded-xl bg-white/15 px-5 py-3 backdrop-blur-sm">
          <span className="font-mono text-xs tracking-widest text-white/70 uppercase">
            Commission
          </span>
          <span className="font-display text-2xl font-bold">{plan.commission}%</span>
        </div>
      </div>

      {/* Left content */}
      <div className="max-w-[60%]">
        <span className="font-mono text-[10px] tracking-[0.15em] text-white/60 uppercase">
          Current Plan
        </span>
        <h2 className="font-display mt-1 text-4xl leading-none font-bold">{plan.name}</h2>
        <p className="mt-2 text-sm text-white/70">
          ₦{plan.price.toLocaleString('en-NG')}/month · Renews {formatRenewalDate(plan.renewsAt)}
        </p>

        {/* Feature pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {plan.features.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm"
            >
              <Check className="h-3 w-3" />
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
