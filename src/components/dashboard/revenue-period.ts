/**
 * Shared period config for the revenue chart's period switcher. One source
 * of truth for: the dropdown options, their display labels, the chart title,
 * and the bucket-noun used in the legend ("Past weeks", "Past days", …).
 *
 * `value` is also the query param the backend should expect, e.g.
 *   GET /api/.../revenue?period=monthly
 */
export const REVENUE_PERIODS = [
  { value: 'daily', label: 'Daily', title: 'REVENUE · LAST 30 DAYS', unit: 'day' },
  { value: 'weekly', label: 'Weekly', title: 'REVENUE · LAST 12 WEEKS', unit: 'week' },
  { value: 'monthly', label: 'Monthly', title: 'REVENUE · LAST 12 MONTHS', unit: 'month' },
  { value: '3m', label: '3 Months', title: 'REVENUE · LAST 3 MONTHS', unit: 'week' },
  { value: '6m', label: '6 Months', title: 'REVENUE · LAST 6 MONTHS', unit: 'month' },
  { value: 'yearly', label: '12 Months', title: 'REVENUE · LAST YEAR', unit: 'month' },
  { value: 'all', label: 'All Time', title: 'REVENUE · ALL TIME', unit: 'year' },
] as const;

export type RevenuePeriod = (typeof REVENUE_PERIODS)[number]['value'];

export function getPeriodConfig(period: RevenuePeriod) {
  return REVENUE_PERIODS.find((p) => p.value === period) ?? REVENUE_PERIODS[1];
}
