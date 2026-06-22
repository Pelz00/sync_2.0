import React, { type ComponentType } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '../ui';

type Trend = 'up' | 'down' | 'neutral';

interface CustomCardProps {
  label?: string;
  value?: React.ReactNode;
  subtext?: React.ReactNode;
  trend?: Trend;
  icon?: React.ReactNode;
  iconBg?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const trendStyles: Record<
  Trend,
  { textClass: string; Icon?: ComponentType<{ className?: string }> }
> = {
  up: { textClass: 'text-emerald-600', Icon: ArrowUpRight },
  down: { textClass: 'text-red-500', Icon: ArrowDownRight },
  neutral: { textClass: 'text-content-muted' },
};

export function CustomCard({
  label,
  value,
  subtext,
  trend = 'neutral',
  icon,
  iconBg = 'bg-content/5',
  children,
  className,
  onClick,
}: CustomCardProps) {
  const { textClass, Icon } = trendStyles[trend];

  return (
    <Card
      onClick={onClick}
      className={cn(onClick && 'cursor-pointer transition-shadow hover:shadow-md', className)}
    >
      <CardContent className="flex items-start justify-between gap-4 pt-5">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          {label && (
            <span className="text-content-muted font-mono text-[10px] tracking-widest uppercase">
              {label}
            </span>
          )}
          {value && (
            <span className="font-display text-content text-2xl font-semibold">{value}</span>
          )}
          {subtext && (
            <span className={cn('text-lime-deep flex items-center gap-1 text-xs', textClass)}>
              {Icon && <Icon className="h-3 w-3" />}
              {subtext}
            </span>
          )}
          {children}
        </div>

        {icon && (
          <div
            className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', iconBg)}
          >
            {icon}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
