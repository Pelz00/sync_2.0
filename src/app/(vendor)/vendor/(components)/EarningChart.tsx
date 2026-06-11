'use client';

import React, { useState } from 'react';

import { EarningsData, RevenueDataPoint } from '@/modules/vendor/types';
import { mockData } from '@/mock/chart';
import { RevenueChart } from './RevenueChart';

type ChartPeriod = '3M' | '6M' | '1Y';

interface EarningsChartProps {
  data?: EarningsData;
}

export default function EarningsChart({ data = mockData }: EarningsChartProps) {
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>('1Y');

  const mappedChartData: RevenueDataPoint[] = data.bestSellingFood.slice(0, 3).map((food) => ({
    label: food.name, // ← just the first word e.g. "Jollof", "Egusi", "Suya", "Akara"
    revenue: food.totalRevenue,
  }));

  return (
    <>
      <RevenueChart
        title="Best Selling Food"
        data={mappedChartData}
        variant="area"
        showPeriodSelector
        activePeriod={chartPeriod}
        onPeriodChange={setChartPeriod}
        height={230}
      />
    </>
  );
}
