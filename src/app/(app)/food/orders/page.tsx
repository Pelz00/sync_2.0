import type { Metadata } from 'next'
import Link from 'next/link'
import { ShoppingBag, ShoppingCart, History } from 'lucide-react'

export const metadata: Metadata = { title: 'Orders' }

export default function OrdersPage() {
    return (
        <section className="flex flex-col gap-3 pb-24">
            <h1 className="text-center text-2xl font-display text-content">Orders</h1>

            {/* ── Track your orders ─────────────────────────────────────── */}
            <div className="mt-2 flex flex-col items-center gap-3 rounded-2xl border border-line/10 bg-panel px-6 py-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-content-muted/10">
                    <ShoppingBag className="h-6 w-6 text-content" strokeWidth={1.5} />
                </div>
                <div>
                    <p className="font-display text-base font-semibold text-content">
                        Track your orders
                    </p>
                    <p className="mt-1 text-sm text-content-muted">
                        Your ongoing orders will be listed here
                    </p>
                </div>
            </div>

            {/* ── Continue your order ───────────────────────────────────── */}
            <h2 className="mt-3 font-display text-xl font-bold text-content">
                Continue your order
            </h2>

            <div className="flex flex-col items-center gap-3 rounded-2xl border border-line/10 bg-panel px-6 py-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-content-muted/10">
                    <ShoppingCart className="h-6 w-6 text-content" strokeWidth={1.5} />
                </div>
                <div>
                    <p className="font-display text-base font-semibold text-content">
                        No carts yet
                    </p>
                    <p className="mt-1 text-sm text-content-muted">
                        Add items from stores to create new carts
                    </p>
                </div>
            </div>

            {/* ── Order history banner ──────────────────────────────────── */}
            <Link
                href="/food/orders/history"
                className="mt-2 flex items-center gap-3 rounded-2xl border border-line/10 bg-panel px-4 py-4 transition-colors hover:bg-content-muted/5"
            >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-content-muted/10">
                    <History className="h-5 w-5 text-content" strokeWidth={1.5} />
                </div>
                <p className="text-sm text-content">
                    Need to review past orders or reorder?{' '}
                    <span className="font-semibold text-lime-deep dark:text-lime underline underline-offset-2">
                        Check your order history
                    </span>
                </p>
            </Link>
        </section>
    )
}   