import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  subColour?: 'green' | 'red' | 'default';
  valueColour?: 'default' | 'green' | 'purple';
};

export function StatCard({ icon: Icon, label, value, sub, subColour = 'default', valueColour = 'default' }: Props) {
  return (
    <div className="bg-panel border-line/10 rounded-2xl border p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-content-muted text-[0.6875rem] font-bold uppercase tracking-wider">{label}</p>
        <Icon className="text-content-muted h-4 w-4 opacity-60" />
      </div>
      <p className={cn(
        'font-display mt-2 text-3xl font-extrabold leading-none tracking-tight',
        valueColour === 'green' ? 'text-green-600' :
        valueColour === 'purple' ? 'text-violet-600' :
        'text-content',
      )}>
        {value}
      </p>
      {sub && (
        <p className={cn(
          'mt-1.5 text-xs font-semibold',
          subColour === 'green' ? 'text-green-600' :
          subColour === 'red' ? 'text-red-500' :
          'text-content-muted',
        )}>
          {sub}
        </p>
      )}
    </div>
  );
}