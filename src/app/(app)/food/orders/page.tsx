'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, ShoppingBag, ClipboardList } from 'lucide-react'
import { getAllDemoOrders, type DemoOrder } from '@/lib/demo-order'

// Maps order status to a progress percentage and colour
const STATUS_CONFIG: Record<DemoOrder['status'], {
    label: string
    pct: number
    colour: string
    timeOffset: number // minutes to add to order time for ETA end
}> = {
    preparing: { label: 'Preparing', pct: 20, colour: 'bg-yellow-400', timeOffset: 35 },
    picked_up: { label: 'Picked up', pct: 50, colour: 'bg-blue-400', timeOffset: 25 },
    on_the_way: { label: 'On the way', pct: 75, colour: 'bg-lime', timeOffset: 15 },
    delivered: { label: 'Delivered', pct: 100, colour: 'bg-lime', timeOffset: 0 },
}

function formatTimeWindow(createdAt: number, etaMinutes: number, status: DemoOrder['status']) {
    const start = new Date(createdAt)
    const endOffset = STATUS_CONFIG[status].timeOffset
    const end = new Date(createdAt + etaMinutes * 60_000)

    const fmt = (d: Date) =>
        d.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit', hour12: false })

    if (status === 'delivered') return `${fmt(start)} – ${fmt(end)}`
    return `${fmt(start)} – ${fmt(new Date(end.getTime() + endOffset * 60_000))}`
}

function OrderCard({ order }: { order: DemoOrder }) {
    const config = STATUS_CONFIG[order.status]
    const timeWindow = formatTimeWindow(order.createdAt, order.etaMinutes, order.status)
    const isActive = order.status !== 'delivered'

    return (
        <Link
            href={`/food/orders/${order.id}/track`}
            className="block rounded-2xl border border-line/10 bg-panel shadow-card overflow-hidden hover:border-line/20 transition-colors"
        >
            <div className="flex items-center gap-4 px-4 py-4">
                {/* Vendor icon */}
                <div className="w-12 h-12 rounded-xl bg-surface-deep flex items-center justify-center flex-shrink-0 border border-line/10">
                    {order.vendorLogo ? (
                        <img src={order.vendorLogo} alt={order.vendorName} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                        <ShoppingBag size={20} className="text-content-muted" />
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    {isActive && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-lime-deep dark:text-lime bg-lime/10 px-2 py-0.5 rounded-full mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                            On time
                        </span>
                    )}
                    <p className="text-sm font-semibold text-content truncate">{order.vendorName}</p>
                    <p className="text-xl font-black text-content tracking-tight">{timeWindow}</p>
                </div>

                <ChevronRight size={18} className="text-content-muted flex-shrink-0" />
            </div>

            {/* Progress bar */}
            <div className="h-1.5 bg-surface-deep">
                <div
                    className={`h-full ${config.colour} transition-all duration-700`}
                    style={{ width: `${config.pct}%` }}
                />
            </div>
        </Link>
    )
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<DemoOrder[]>([])

    useEffect(() => {
        setOrders(getAllDemoOrders())
    }, [])

    const activeOrders = orders.filter(o => o.status !== 'delivered')
    const pastOrders = orders.filter(o => o.status === 'delivered')

    return (
        <div className="flex flex-col gap-6 pb-24">
            <h1 className="text-2xl font-black text-content">Orders</h1>

            {/* Active orders */}
            {activeOrders.length > 0 && (
                <section className="flex flex-col gap-3">
                    {activeOrders.map(o => <OrderCard key={o.id} order={o} />)}
                </section>
            )}

            {/* Continue your order / empty state */}
            <section>
                <h2 className="text-lg font-bold text-content mb-3">Continue your order</h2>
                <div className="rounded-2xl border border-line/10 bg-panel shadow-card px-6 py-8 flex flex-col items-center gap-2 text-center">
                    <ShoppingBag size={36} className="text-content-muted/40" strokeWidth={1} />
                    <p className="text-sm font-semibold text-content mt-1">No carts yet</p>
                    <p className="text-xs text-content-muted">Add items from stores to create new carts</p>
                </div>
            </section>

            {/* Past orders */}
            {pastOrders.length > 0 && (
                <section className="flex flex-col gap-3">
                    <h2 className="text-lg font-bold text-content">Past orders</h2>
                    {pastOrders.map(o => <OrderCard key={o.id} order={o} />)}
                </section>
            )}

            {/* Order history link */}
            <div className="rounded-2xl border border-line/10 bg-panel shadow-card px-4 py-4 flex items-center gap-3">
                <ClipboardList size={20} className="text-content-muted flex-shrink-0" />
                <div className="flex-1">
                    <p className="text-sm text-content-muted">Need to review past orders or reorder?</p>
                    <p className="text-sm font-bold text-lime-deep dark:text-lime underline underline-offset-2">
                        Check your order history
                    </p>
                </div>
            </div>
        </div>
    )
}