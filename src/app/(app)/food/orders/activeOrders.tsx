"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { getDemoOrders, type DemoOrder } from "@/lib/demo-order"

const STATUS_LABEL: Record<DemoOrder["status"], string> = {
    preparing: "Preparing your order",
    rider_assigned: "Rider heading to restaurant",
    en_route: "On the way to you",
    arriving: "Almost there",
    delivered: "Delivered",
}

export default function ActiveOrders() {
    const [orders, setOrders] = useState<DemoOrder[]>([])

    useEffect(() => {
        const active = getDemoOrders().filter(o => o.status !== "delivered")
        setOrders(active)
    }, [])

    if (orders.length === 0) return (
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
    )

    return (
        <div className="mt-2 flex flex-col gap-3">
            {orders.map(order => (
                <Link
                    key={order.id}
                    href={`/food/orders/${order.id}/track`}
                    className="flex items-center gap-3 rounded-2xl border border-line/10 bg-panel px-4 py-4 transition-colors hover:bg-content-muted/5"
                >
                    <div className="w-12 h-12 rounded-xl bg-content-muted/10 flex-shrink-0 flex items-center justify-center text-xl">
                        🍽️
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-display text-sm font-semibold text-content truncate">
                            {order.vendorName}
                        </p>
                        <p className="text-sm text-content-muted mt-0.5">
                            {STATUS_LABEL[order.status]}
                            {order.status !== "delivered" && ` · ${order.etaMinutes} min`}
                        </p>
                    </div>
                    <span className="flex-shrink-0 rounded-full bg-lime px-4 py-2 text-xs font-bold text-ink">
                        Track
                    </span>
                </Link>
            ))}
        </div>
    )
}