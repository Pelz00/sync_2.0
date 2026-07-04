'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { ChevronDown, FileText, HelpCircle } from 'lucide-react'
import { getDemoOrder, type DemoOrder } from '@/lib/demo-order'

const TrackMap = dynamic(
    () => import('./TrackLeaflet'),
    {
        ssr: false,
        loading: () => (
            <div className="h-full w-full flex items-center justify-center bg-surface-deep">
                <p className="text-xs text-content-muted">Loading map…</p>
            </div>
        ),
    }
)

const STEPS: {
    key: DemoOrder['status']
    label: (order: DemoOrder) => string
}[] = [
        { key: 'preparing', label: o => `${o.vendorName} has received your order` },
        { key: 'picked_up', label: o => `Rider is on the way to ${o.vendorName}` },
        { key: 'on_the_way', label: () => 'Rider has picked up your order' },
        { key: 'on_the_way', label: () => 'Rider is almost at your location' },
        { key: 'delivered', label: () => 'Order delivered — enjoy your meal!' },
    ]

const STATUS_ORDER: DemoOrder['status'][] = [
    'preparing',
    'picked_up',
    'on_the_way',
    'delivered',
]

function getCompletedStepCount(status: DemoOrder['status']): number {
    const idx = STATUS_ORDER.indexOf(status)
    if (idx === 0) return 1
    if (idx === 1) return 2
    if (idx === 2) return 4
    return 5
}

function formatTimeWindow(createdAt: number, etaMinutes: number, status: DemoOrder['status']) {
    const start = new Date(createdAt)
    const end = new Date(createdAt + etaMinutes * 60_000)
    const extra = status === 'delivered' ? 0 : 15
    const fmt = (d: Date) =>
        d.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit', hour12: false })
    return `${fmt(start)} – ${fmt(new Date(end.getTime() + extra * 60_000))}`
}

function progressPct(status: DemoOrder['status']): number {
    return { preparing: 20, picked_up: 45, on_the_way: 75, delivered: 100 }[status]
}

export default function TrackPage() {
    // ✅ matches folder name [orderId]
    const { orderId } = useParams<{ orderId: string }>()
    const router = useRouter()
    const [order, setOrder] = useState<DemoOrder | null>(null)

    useEffect(() => {
        const o = getDemoOrder(orderId)
        if (!o) { router.replace('/food/orders'); return }
        setOrder(o)
    }, [orderId, router])

    if (!order) {
        return (
            <div className="min-h-screen bg-ink flex items-center justify-center">
                <p className="text-white/60 text-sm">Loading order…</p>
            </div>
        )
    }

    const isDelivered = order.status === 'delivered'
    const completedSteps = getCompletedStepCount(order.status)
    const timeWindow = formatTimeWindow(order.createdAt, order.etaMinutes, order.status)
    const pct = progressPct(order.status)

    return (
        <div className="min-h-screen bg-ink text-white flex flex-col">

            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-3 flex-shrink-0">
                <button
                    onClick={() => router.push('/food/orders')}
                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center cursor-pointer"
                >
                    <ChevronDown size={18} className="text-white/70" />
                </button>
                <div className="flex gap-2">
                    <button className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center cursor-pointer">
                        <FileText size={16} className="text-white/70" />
                    </button>
                    <button className="flex items-center gap-1.5 border border-white/10 rounded-full px-3 py-2 text-xs font-medium text-white/70 cursor-pointer">
                        <HelpCircle size={14} /> Help
                    </button>
                </div>
            </div>

            {/* ETA */}
            <div className="px-4 pt-1 pb-4 flex-shrink-0">
                {isDelivered ? (
                    <h1 className="text-4xl font-black text-white flex items-center gap-3">
                        Delivered <span className="text-3xl">🎉</span>
                    </h1>
                ) : (
                    <>
                        <p className="text-xs text-white/50 font-medium uppercase tracking-wide mb-1">
                            Estimated arrival
                        </p>
                        <h1 className="text-4xl font-black text-white tracking-tight">
                            {timeWindow}
                        </h1>
                    </>
                )}
                <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-lime rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                    />
                </div>
            </div>

            {/* Map */}
            {!isDelivered && (
                <div className="flex-shrink-0 h-52 overflow-hidden">
                    <TrackMap />
                </div>
            )}

            {/* Steps */}
            <div className="flex-1 bg-panel rounded-t-3xl mt-2 px-4 pt-5 pb-8 flex flex-col gap-0">
                {STEPS.map((step, i) => {
                    const done = i < completedSteps
                    const active = i === completedSteps - 1
                    const isLast = i === STEPS.length - 1

                    return (
                        <div key={i} className="flex gap-3">
                            <div className="flex flex-col items-center w-5 flex-shrink-0">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${active
                                        ? 'border-lime bg-lime'
                                        : done
                                            ? 'border-lime/40 bg-transparent'
                                            : 'border-content-muted/20 bg-transparent'
                                    }`}>
                                    {active && <div className="w-2 h-2 rounded-full bg-ink" />}
                                </div>
                                {!isLast && (
                                    <div className={`w-0.5 flex-1 my-1 min-h-[20px] ${done ? 'bg-lime/30' : 'bg-content-muted/10'}`} />
                                )}
                            </div>
                            <p className={`pb-5 text-sm leading-snug ${active
                                    ? 'font-bold text-content'
                                    : done
                                        ? 'text-content-muted'
                                        : 'text-content-muted/30'
                                }`}>
                                {step.label(order)}
                            </p>
                        </div>
                    )
                })}

                <div className="mt-4 pt-4 border-t border-line/10 text-xs text-content-muted">
                    Order from <span className="font-semibold text-content">{order.vendorName}</span>
                    {' · '}Delivering to <span className="font-semibold text-content">{order.deliveryAddress}</span>
                </div>
            </div>
        </div>
    )
}