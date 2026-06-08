'use client';

import { PlanCard } from './PlanCard';
import type { Plan, PlanId } from './types';

interface Props {
  plans: Plan[];
  currentPlanId: PlanId;
  onSelectPlan: (plan: Plan) => void;
}

export function PlanGrid({ plans, currentPlanId, onSelectPlan }: Props) {
  return (
    <section>
      <h2 className="font-display text-base font-semibold text-content">Compare Plans</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            currentPlanId={currentPlanId}
            onSelect={onSelectPlan}
          />
        ))}
      </div>
    </section>
  );
}
