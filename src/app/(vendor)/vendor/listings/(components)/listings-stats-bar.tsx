import { CustomCard } from '@/components/shared/card';
import { Listing } from '@/modules/vendor/types';
import { BadgeCheck, FilePenLine, Package, PackageX } from 'lucide-react';
interface ListingStatsBarProps {
  listings: Listing[];
}

export function ListingStatsBar({ listings }: ListingStatsBarProps) {
  const total = listings.length;
  const active = listings.filter((l) => l.status === 'Active').length;
  const draft = listings.filter((l) => l.status === 'Draft').length;
  const outOfStock = listings.filter((l) => l.status === 'Out of Stock').length;

  const stats = [
    {
      label: 'TOTAL LISTINGS',
      value: total,
      // valueColor: 'text-ink',
      icon: <Package className="size-5 text-blue-600" />,
      iconBg: 'bg-blue-100',
    },
    {
      label: 'ACTIVE',
      value: active,
      // valueColor: 'text-green-600',
      icon: <BadgeCheck className="size-5 text-green-600" />,
      iconBg: 'bg-green-100',
    },
    {
      label: 'DRAFT',
      value: draft,
      // valueColor: 'text-amber-600',
      icon: <FilePenLine className="size-5 text-amber-600" />,
      iconBg: 'bg-amber-100',
    },
    {
      label: 'OUT OF STOCK',
      value: outOfStock,
      valueColor: 'text-red-600',
      icon: <PackageX className="size-5 text-red-600" />,
      iconBg: 'bg-red-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => (
        <CustomCard
          key={stat.label}
          label={stat.label}
          value={<span className={stat.valueColor}>{stat.value}</span>}
          icon={stat.icon}
          iconBg={stat.iconBg}
        />
      ))}
    </div>
  );
}
