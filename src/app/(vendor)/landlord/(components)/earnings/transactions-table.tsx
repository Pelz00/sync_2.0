import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui';
import { StatusBadge } from '../shared/status-badge';
import { transactions, formatNaira } from '@/lib/landlord-data';

export function TransactionsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction history</CardTitle>
        <CardDescription>Payments received from tenants across your listings.</CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Property</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="text-content-muted whitespace-nowrap">{t.date}</TableCell>
                <TableCell className="font-medium">{t.tenant}</TableCell>
                <TableCell className="text-content-muted">{t.property}</TableCell>
                <TableCell className="text-right font-medium tabular-nums">{formatNaira(t.amount)}</TableCell>
                <TableCell className="text-right">
                  <StatusBadge status={t.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
