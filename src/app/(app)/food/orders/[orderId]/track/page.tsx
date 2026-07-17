'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { ChevronDown, FileText, HelpCircle } from 'lucide-react'
import { getDemoOrder, updateDemoOrderStatus, type DemoOrder } from '@/lib/demo-order'

const TrackMap = dynamic(
    () => import('./TrackLeaflet'),
    {
        ssr: false,
        loading: () => (
            <div className="h-full w-full flex items-center justify-center bg-[#1a1d1a]">
                <p className="text-xs text-white/40">Loading map…</p>
            </div>
        ),
    }
)

// ── Stages with realistic proportions ────────────────────────────────────────
// Each stage gets a % of the total ETA. They should add up to 100.
// "preparing" takes the longest, "arriving" is the shortest.
const STAGE_WEIGHTS = [0.30, 0.25, 0.30, 0.15] // preparing, picked_up, on_the_way, arriving

const STAGES: {
    status: DemoOrder['status']
    label: (vendorName: string) => string
}[] = [
        { status: 'preparing', label: v => `${v} has received your order` },
        { status: 'picked_up', label: v => `Rider is on the way to ${v}` },
        { status: 'on_the_way', label: () => 'Rider has picked up your order' },
        { status: 'on_the_way', label: () => 'Rider is almost at your location' },
        { status: 'delivered', label: () => 'Order delivered — enjoy your meal!' },
    ]

const STATUS_ORDER: DemoOrder['status'][] = [
    'preparing', 'picked_up', 'on_the_way', 'delivered'
]

function getStageIndex(status: DemoOrder['status']): number {
    // Maps status → which STAGES index is currently active
    if (status === 'preparing') return 0
    if (status === 'picked_up') return 1
    if (status === 'on_the_way') return 2  // starts at step 2, advances to 3 mid-stage
    return 4 // delivered
}

function progressPct(status: DemoOrder['status'], subStep: number): number {
    if (status === 'preparing') return 5 + subStep
    if (status === 'picked_up') return 30 + subStep
    if (status === 'on_the_way') return 55 + subStep
    if (status === 'delivered') return 100
    return 0
}

function fmt(d: Date) {
    return d.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit', hour12: false })
}

export default function TrackPage() {
    const { orderId } = useParams<{ orderId: string }>()
    const router = useRouter()

    const [order, setOrder] = useState<DemoOrder | null>(null)
    const [stageIndex, setStageIndex] = useState(0)
    const [subStep, setSubStep] = useState(0) // 0–25 progress within a stage
    const [remainingMs, setRemainingMs] = useState(0)
    const mountTimeRef = useRef(Date.now())

    // ── Load order ────────────────────────────────────────────────────────
    useEffect(() => {
        const o = getDemoOrder(orderId)
        if (!o) { router.replace('/food/orders'); return }
        setOrder(o)
        setStageIndex(getStageIndex(o.status))
        // remaining = etaMinutes from when we loaded the page
        setRemainingMs(o.etaMinutes * 60_000)
        mountTimeRef.current = Date.now()
    }, [orderId, router])

    // ── Realistic countdown — ticks every second ──────────────────────────
    const stageIndexRef = useRef(0)
    const orderStatusRef = useRef<DemoOrder['status']>('preparing')

    useEffect(() => {
        if (!order || order.status === 'delivered') return

        // Sync refs on each effect run
        stageIndexRef.current = getStageIndex(order.status)
        orderStatusRef.current = order.status

        const totalMs = order.etaMinutes * 60_000
        const phaseDurations = STAGE_WEIGHTS.map(w => Math.floor(w * totalMs))

        const tick = setInterval(() => {
            const elapsed = Date.now() - mountTimeRef.current
            const remaining = Math.max(0, totalMs - elapsed)
            setRemainingMs(remaining)

            // Figure out which phase we're in
            let acc = 0
            let phaseIdx = phaseDurations.length // default = delivered
            for (let i = 0; i < phaseDurations.length; i++) {
                acc += phaseDurations[i]
                if (elapsed < acc) {
                    phaseIdx = i
                    break
                }
            }

            let newStage: number
            let newStatus: DemoOrder['status']
            let newSubStep: number

            if (phaseIdx === 0) {
                newStage = 0
                newStatus = 'preparing'
                newSubStep = Math.floor((elapsed / phaseDurations[0]) * 25)
            } else if (phaseIdx === 1) {
                newStage = 1
                newStatus = 'picked_up'
                const pe = elapsed - phaseDurations[0]
                newSubStep = Math.floor((pe / phaseDurations[1]) * 25)
            } else if (phaseIdx === 2) {
                newStage = 2
                newStatus = 'on_the_way'
                const pe = elapsed - phaseDurations[0] - phaseDurations[1]
                newSubStep = Math.floor((pe / phaseDurations[2]) * 25)
            } else if (phaseIdx === 3) {
                newStage = 3
                newStatus = 'on_the_way'
                const pe = elapsed - phaseDurations[0] - phaseDurations[1] - phaseDurations[2]
                newSubStep = Math.floor((pe / phaseDurations[3]) * 25)
            } else {
                // Delivered
                newStage = 4
                newStatus = 'delivered'
                newSubStep = 0
                clearInterval(tick)
            }

            setSubStep(newSubStep)

            // Use refs to avoid stale closure
            if (newStage !== stageIndexRef.current) {
                stageIndexRef.current = newStage
                setStageIndex(newStage)
            }

            if (newStatus !== orderStatusRef.current) {
                orderStatusRef.current = newStatus
                const newEta = Math.ceil(remaining / 60_000)
                updateDemoOrderStatus(orderId, newStatus, newEta)
                setOrder(prev => prev ? { ...prev, status: newStatus, etaMinutes: newEta } : prev)
            }
        }, 1000)

        return () => clearInterval(tick)
    }, [order?.id, orderId]) // ← key change: depend on order.id not order object

    if (!order) return (
        <div className="min-h-screen bg-ink flex items-center justify-center">
            <p className="text-white/60 text-sm">Loading order…</p>
        </div>
    )

    const isDelivered = order.status === 'delivered'
    const pct = progressPct(order.status, subStep)

    // ETA window — based on actual remaining time
    const now = new Date()
    const etaEnd = new Date(now.getTime() + remainingMs)
    const etaStart = new Date(etaEnd.getTime() - 15 * 60_000)

    return (
        <div className="min-h-screen bg-ink text-white flex flex-col">

            {/* Top bar */}
            <div className="flex items-center justify-between px-4 pt-4 pb-3 flex-shrink-0">
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
                            {fmt(etaStart)} – {fmt(etaEnd)}
                        </h1>
                    </>
                )}
                <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-lime rounded-full transition-all duration-1000"
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
                {STAGES.map((stage, i) => {
                    const done = i < stageIndex
                    const active = i === stageIndex
                    const isLast = i === STAGES.length - 1

                    return (
                        <div key={i} className="flex gap-3">
                            <div className="flex flex-col items-center w-5 flex-shrink-0">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-500 ${active
                                        ? 'border-lime bg-lime'
                                        : done
                                            ? 'border-lime/40 bg-transparent'
                                            : 'border-content-muted/20 bg-transparent'
                                    }`}>
                                    {active && <div className="w-2 h-2 rounded-full bg-ink animate-pulse" />}
                                </div>
                                {!isLast && (
                                    <div className={`w-0.5 flex-1 my-1 min-h-[24px] transition-colors duration-500 ${done ? 'bg-lime/30' : 'bg-content-muted/10'
                                        }`} />
                                )}
                            </div>
                            <p className={`pb-5 text-sm leading-snug transition-all duration-500 ${active
                                    ? 'font-bold text-content'
                                    : done
                                        ? 'text-content-muted'
                                        : 'text-content-muted/30'
                                }`}>
                                {stage.label(order.vendorName)}
                            </p>
                        </div>
                    )
                })}

                <div className="mt-4 pt-4 border-t border-line/10 text-xs text-content-muted">
                    Order from{' '}
                    <span className="font-semibold text-content">{order.vendorName}</span>
                    {' · '}Delivering to{' '}
                    <span className="font-semibold text-content">{order.deliveryAddress}</span>
                </div>
            </div>
        </div>
    )
}