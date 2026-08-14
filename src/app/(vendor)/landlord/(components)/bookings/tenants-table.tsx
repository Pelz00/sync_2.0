import { Users } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { formatDate, initials, type Tenant } from '@/lib/landlord-data';
import { StatusBadge } from '../shared/status-badge';
import { TenantSheet } from './tenant-sheet';

export function TenantsTable({ tenants }: { tenants: Tenant[] }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Users className="size-4" />
          Active tenants
        </CardTitle>
        <CardDescription>
          {tenants.length} students currently housed across your properties.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Tenant</TableHead>
              <TableHead className="hidden md:table-cell">Property</TableHead>
              <TableHead className="hidden lg:table-cell">Lease ends</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={5} className="text-content-muted py-12 text-center">
                  No tenants yet — approved bookings will show up here.
                </TableCell>
              </TableRow>
            ) : (
              tenants.map((t) => (
                <TableRow key={t.id} className="hover:bg-accent/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback>{initials(t.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{t.name}</span>
                        <span className="text-content-muted text-xs md:hidden">{t.property}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-content-muted hidden md:table-cell">
                    {t.property}
                  </TableCell>
                  <TableCell className="text-content-muted hidden lg:table-cell">
                    {formatDate(t.leaseEnd)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={t.paymentStatus} />
                  </TableCell>
                  <TableCell className="text-right">
                    <TenantSheet tenant={t} />
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
