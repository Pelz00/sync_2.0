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
import { Wallet2 } from 'lucide-react';
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
            <TableRow className="hover:bg-transparent">
              <TableHead>Date</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Property</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={5} className="text-content-muted py-12 text-center">
                  <Wallet2 className="mx-auto mb-2 size-6" />
                  No transactions yet.
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="text-content-muted whitespace-nowrap">{t.date}</TableCell>
                  <TableCell className="font-medium">{t.tenant}</TableCell>
                  <TableCell className="text-content-muted">{t.property}</TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    {formatNaira(t.amount)}
                  </TableCell>
                  <TableCell className="text-right">
                    <StatusBadge status={t.status} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
