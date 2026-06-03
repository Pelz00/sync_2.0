import { Listing } from '@/modules/vendor/types';

interface ListingStatsBarProps {
  listings: Listing[];
}

export function ListingStatsBar({ listings }: ListingStatsBarProps) {
  const total = listings.length;
  const active = listings.filter((l) => l.status === 'Active').length;
  const draft = listings.filter((l) => l.status === 'Draft').length;
  const outOfStock = listings.filter((l) => l.status === 'Out of Stock').length;

  const stats = [
    { label: 'TOTAL LISTINGS', value: total, color: 'text-ink' },
    { label: 'ACTIVE', value: active, color: 'text-green-600' },
    { label: 'DRAFT', value: draft, color: 'text-ink' },
    { label: 'OUT OF STOCK', value: outOfStock, color: 'text-red-500' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map(({ label, value, color }) => (
        <div key={label} className="bg-panel shadow-card rounded-xl p-5">
          <p className="text-muted font-mono text-[10px] tracking-widest uppercase">{label}</p>
          <p className={`mt-1 text-3xl font-bold ${color}`}>{value}</p>
        </div>
      ))}
    </div>
  );
}
