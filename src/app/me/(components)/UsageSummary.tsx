/**
 * UsageSummary - KPI strip at the top of the student dashboard. A quick read on
 * what the student is spending and tracking (spend, active bookings, upcoming
 * events, savings). Mirrors the vendor dashboard's stat-card pattern.
 */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { studentUsage } from '@/mock/student';

export function UsageSummary() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {studentUsage.map(({ label, value, sub, icon: Icon }) => (
        <Card key={label} className="border-line/10 border bg-transparent">
          <CardHeader>
            <CardTitle className="text-content-muted flex items-center gap-2 font-mono text-xs tracking-wide">
              <Icon className="size-4 shrink-0" />
              {label}
            </CardTitle>
          </CardHeader>
          <CardContent className="font-body">
            <p className="text-content text-2xl font-bold">{value}</p>
            <p className="text-content-muted mt-1 text-xs">{sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
