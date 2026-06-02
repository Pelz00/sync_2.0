'use client';

import { Card, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Product } from '@/mock/vendor';

interface ProductsCardProps {
  products: Product[];
  onEdit?: (id: string) => void;
  onBoost?: (id: string) => void;
}

export function ProductsCard({ products, onEdit, onBoost }: ProductsCardProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product, index) => {
        const quantityAvailable = product.quantityAvailable ?? 0;
        const quantitySold = product.quantitySold ?? 0;

        const quantityLeft = Math.max(quantityAvailable - quantitySold, 0);

        const salesPct =
          quantityAvailable > 0 ? Math.round((quantitySold / quantityAvailable) * 100) : 0;

        const remainingPct = quantityAvailable > 0 ? (quantityLeft / quantityAvailable) * 100 : 0;

        // Inventory status
        const isSoldOut = quantityLeft === 0;
        const isLowStock = !isSoldOut && remainingPct <= 10;

        const statusStyles = isSoldOut
          ? 'border-red-200 text-red-500 bg-red-50'
          : isLowStock
            ? 'border-amber-200 text-amber-600 bg-amber-50'
            : 'border-green-200 text-green-600 bg-green-50';

        const barColor = isSoldOut ? 'bg-red-400' : isLowStock ? 'bg-amber-400' : 'bg-green-500';

        const statusText = isSoldOut ? 'Sold Out' : isLowStock ? 'Low Stock' : 'Available';

        return (
          <Card
            key={product.id}
            className={`border-line group flex flex-col overflow-hidden border bg-transparent transition-shadow duration-300 hover:shadow-lg`}
          >
            {/* Image */}
            <div className="border-line/20 h-24 overflow-hidden border-b border-dashed">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={400}
                  height={200}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="relative h-full w-full bg-surface-deep">
                  <svg
                    className="absolute inset-0 h-full w-full"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <line x1="0" y1="0" x2="100%" y2="100%" stroke="var(--color-content-muted)" strokeWidth="1" />
                    <line x1="100%" y1="0" x2="0" y2="100%" stroke="var(--color-content-muted)" strokeWidth="1" />
                  </svg>
                </div>
              )}
            </div>

            {/* Content */}
            <CardContent className="flex flex-col gap-1 px-3 pt-2.5 pb-1">
              <div className="flex items-center justify-between gap-1">
                <CardTitle className="text-xs leading-tight font-semibold">
                  {product.name}
                </CardTitle>

                <span
                  className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusStyles}`}
                >
                  {statusText}
                </span>
              </div>

              <CardDescription className="text-[11px]">
                {quantitySold} sold • {quantityLeft} left
              </CardDescription>

              {/* Sales Progress Bar */}
              <div className="bg-ink/10 mt-1 h-1 w-full rounded-full">
                <div
                  className={`h-1 rounded-full transition-all duration-300 ${barColor}`}
                  style={{ width: `${Math.min(salesPct, 100)}%` }}
                />
              </div>
            </CardContent>

            {/* Actions */}
            <CardFooter className="gap-1.5 px-3 pt-1 pb-2.5">
              <Button
                variant="outline"
                size="sm"
                className="h-6 rounded-full px-3 text-[11px]"
                onClick={() => onEdit?.(product.id)}
              >
                Edit
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="h-6 rounded-full px-3 text-[11px]"
                onClick={() => onBoost?.(product.id)}
              >
                Boost
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
