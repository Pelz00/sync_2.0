import { RevenueDatum } from './revenue-bar-chart';
import type { RevenuePeriod } from './revenue-period';

/**
 * TEMPORARY mock fetcher. Swap the body of this function for a real call,
 * e.g.:
 *
 *   const res = await fetch(`/api/vendor/revenue?period=${period}`);
 *   return res.json();
 *
 * The backend should return buckets already aggregated for the requested
 * period (see revenue-period.ts for what each period means) — do not fetch
 * daily data and re-aggregate it on the client for monthly/yearly/all-time,
 * the volume gets out of hand for vendors with long histories.
 *
 * Keep the returned shape identical to RevenueDatum: { week, revenue }.
 * `week` is reused as the generic bucket label across all periods (e.g.
 * "Jan 1" for daily, "May W1" for weekly, "Jan" for monthly, "2024" for
 * yearly) since RevenueBarChart only uses it as a label + month-prefix key.
 */
export async function fetchRevenueMock(period: RevenuePeriod): Promise<RevenueDatum[]> {
  // Simulate network latency so the loading state is visible during dev.
  await new Promise((resolve) => setTimeout(resolve, 350));

  switch (period) {
    case 'daily':
      return Array.from({ length: 30 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        return {
          week: `${d.toLocaleString('en', { month: 'short' })} ${d.getDate()}`,
          revenue: Math.round(800 + Math.random() * 4000),
        };
      });

    case 'weekly':
      return [
        { week: 'Feb W1', revenue: 2700 },
        { week: 'Feb W2', revenue: 3600 },
        { week: 'Feb W3', revenue: 2300 },
        { week: 'Mar W1', revenue: 5100 },
        { week: 'Mar W2', revenue: 3700 },
        { week: 'Mar W3', revenue: 5400 },
        { week: 'Apr W1', revenue: 3500 },
        { week: 'Apr W2', revenue: 6300 },
        { week: 'Apr W3', revenue: 5500 },
        { week: 'Apr W4', revenue: 6800 },
        { week: 'May W1', revenue: 6000 },
        { week: 'May W2', revenue: 7900 },
      ];

    case '3m':
      return Array.from({ length: 13 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (12 - i) * 7);
        return {
          week: `${d.toLocaleString('en', { month: 'short' })} W${Math.ceil(d.getDate() / 7)}`,
          revenue: Math.round(2000 + Math.random() * 6000),
        };
      });

    case 'monthly':
    case '6m':
    case 'yearly': {
      const months = period === '6m' ? 6 : 12;
      return Array.from({ length: months }, (_, i) => {
        const d = new Date();
        d.setMonth(d.getMonth() - (months - 1 - i));
        return {
          week: d.toLocaleString('en', { month: 'short' }),
          revenue: Math.round(15000 + Math.random() * 40000),
        };
      });
    }

    case 'all': {
      const startYear = new Date().getFullYear() - 3;
      return Array.from({ length: 4 }, (_, i) => ({
        week: String(startYear + i),
        revenue: Math.round(120000 + i * 60000 + Math.random() * 30000),
      }));
    }

    default:
      return [];
  }
}
