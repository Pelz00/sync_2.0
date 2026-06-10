'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Plan, PlanId } from './types';

interface Props {
  plan: Plan;
  currentPlanId: PlanId;
  onSelect: (plan: Plan) => void;
}

export function PlanCard({ plan, currentPlanId, onSelect }: Props) {
  const isCurrent = plan.id === currentPlanId;
  const isEnterprise = plan.highlighted;

  const handleClick = () => {
    if (plan.cta === 'contact') {
      window.location.href = 'mailto:sales@sync.ng';
      return;
    }
    if (!isCurrent) {
      onSelect(plan);
    }
  };

  return (
    <div
      className={cn(
        'relative flex flex-col rounded-xl border p-6 transition-shadow',
        isEnterprise
          ? 'text-cream border-lime-100 bg-lime-500'
          : 'border-line/10 bg-panel text-content shadow-card',
        isCurrent && !isEnterprise && 'ring-2 ring-lime-500',
      )}
    >
      {/* Current badge */}
      {isCurrent && (
        <div className="absolute -top-3 left-4">
          <Badge variant="accent" className="bg-lime-100 text-lime-700">
            Current
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="mb-4">
        <h3
          className={cn(
            'font-display text-lg font-bold',
            isEnterprise ? 'text-cream' : 'text-content',
          )}
        >
          {plan.name}
        </h3>
        <p className={cn('mt-0.5 text-sm', isEnterprise ? 'text-cream/50' : 'text-content-muted')}>
          {plan.tagline}
        </p>
      </div>

      {/* Price */}
      <div className="mb-5">
        <span
          className={cn(
            'font-display text-3xl font-black',
            isEnterprise ? 'text-cream' : 'text-content',
          )}
        >
          {plan.priceLabel}
        </span>
        {plan.price !== null && plan.price > 0 && (
          <span
            className={cn('ml-1 text-sm', isEnterprise ? 'text-cream/50' : 'text-content-muted')}
          >
            /mo
          </span>
        )}
      </div>

      {/* Features */}
      <ul className="mb-6 flex flex-col gap-2">
        {plan.features.map((f) => (
          <li key={f.label} className="flex items-center gap-2 text-sm">
            <Check
              className={cn(
                'h-3.5 w-3.5 shrink-0',
                isEnterprise ? 'text-lime-deep' : 'text-lime-500',
              )}
            />
            <span className={isEnterprise ? 'text-cream/80' : 'text-content'}>{f.label}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-auto">
        {isCurrent ? (
          <Button
            variant="outline"
            className="w-full border-lime-200 bg-lime-50 text-lime-600 hover:bg-lime-50"
            disabled
          >
            Current Plan
          </Button>
        ) : plan.cta === 'contact' ? (
          <Button
            variant="outline"
            className="border-cream/20 text-cream hover:bg-cream/10 w-full"
            onClick={handleClick}
          >
            Contact Sales
          </Button>
        ) : plan.cta === 'upgrade' ? (
          <Button className="w-full bg-lime-600 text-white hover:bg-lime-700" onClick={handleClick}>
            Upgrade
          </Button>
        ) : (
          <Button variant="outline" className="w-full" onClick={handleClick}>
            Downgrade
          </Button>
        )}
      </div>
    </div>
  );
}
