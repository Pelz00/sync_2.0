import React from 'react';
import { Button, Card, CardContent } from '@/components/ui';
import { EarningsSummary } from '@/mock/vendor';

interface EarningsSummaryCardProps {
  data: EarningsSummary;
}

const EarningsSummaryCard = ({ data }: EarningsSummaryCardProps) => {
  const summaries = [
    {
      label: 'This Week',
      value: data.thisWeek,
    },
    {
      label: 'Last Week',
      value: data.lastWeek,
    },
    {
      label: 'This Month',
      value: data.thisMonth,
    },
    {
      label: 'Last Month',
      value: data.lastMonth,
    },
  ];

  return (
    <Card className="border-line/10 w-96 max-w-7xl bg-transparent">
      <CardContent className="flex-col gap-4 p-4 shadow-none">
        {summaries
          .sort((a, b) => {
            const order = ['Last Month', 'This Month', 'Last Week', 'This Week'];
            return order.indexOf(a.label) - order.indexOf(b.label);
          })
          .map((item) => (
            <div
              key={item.label}
              className="border-line/10 shadow-b-none flex items-center justify-between gap-y-8 rounded-lg border-b p-3"
            >
              <p className="text-content-muted-foreground text-xs">{item.label}</p>
              <p className="text-lime-deep font-display mt-1 text-lg font-semibold">
                ₦{item.value.toLocaleString()}
              </p>
            </div>
          ))}
        <Button className="mt-2 w-full">View Details</Button>
      </CardContent>
    </Card>
  );
};

export default EarningsSummaryCard;
