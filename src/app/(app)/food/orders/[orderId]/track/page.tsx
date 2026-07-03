"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { ChevronDown, FileText, HelpCircle, CheckCircle2 } from "lucide-react"
import { getDemoOrder, updateDemoOrderStatus, type DemoOrder } from "@/lib/demo-order"

const STAGES: {
    status: DemoOrder["status"]
    title: string
    etaMinutes: number
    durationMs: number
}[] = [
        { status: "preparing", title: "Restaurant is preparing your order", etaMinutes: 25, durationMs: 10000 },
        { status: "rider_assigned", title: "Rider is on the way to the restaurant", etaMinutes: 18, durationMs: 10000 },
        { status: "en_route", title: "Rider has picked up your order", etaMinutes: 10, durationMs: 10000 },
        { status: "arriving", title: "Rider is almost at your location", etaMinutes: 3, durationMs: 10000 },
        { status: "delivered", title: "Order delivered — enjoy your meal!", etaMinutes: 0, durationMs: 0 },
    ]

export default function TrackOrderPage() {
    const { orderId } = useParams<{ orderId: string }>()
    const router = useRouter()
    const [order, setOrder] = useState<DemoOrder | null>(null)
    const [stageIndex, setStageIndex] = useState(0)
    const [etaUpdated, setEtaUpdated] = useState(false)
    const startTimeRef = useRef(Date.now())

    useEffect(() => {
        const found = getDemoOrder(orderId)
        if (!found) { router.replace("/food/orders"); return }
        setOrder(found)
        const savedIndex = STAGES.findIndex(s => s.status === found.status)
        if (savedIndex > 0) { setStageIndex(savedIndex); setEtaUpdated(true) }
    }, [orderId, router])

    useEffect(() => {
        if (!order || stageIndex >= STAGES.length - 1) return
        const stage = STAGES[stageIndex]
        const t = setTimeout(() => {
            const next = stageIndex + 1
            setStageIndex(next)
            setEtaUpdated(true)
            updateDemoOrderStatus(orderId, STAGES[next].status, STAGES[next].etaMinutes)
        }, stage.durationMs)
        return () => clearTimeout(t)
    }, [stageIndex, order, orderId])

    if (!order) return null

    const stage = STAGES[stageIndex]
    const isDelivered = stage.status === "delivered"
    const progressPct = ((stageIndex + 1) / STAGES.length) * 100

    const now = new Date()
    const etaStart = new Date(now.getTime() + stage.etaMinutes * 60000)
    const etaEnd = new Date(etaStart.getTime() + 15 * 60000)
    const fmt = (d: Date) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })

    const originalStart = useRef(new Date(startTimeRef.current + 25 * 60000)).current
    const originalEnd = useRef(new Date(originalStart.getTime() + 15 * 60000)).current

    return (
        <div className="fixed inset-0 z-50 bg-ink flex flex-col overflow-hidden">

            {/* Top bar */}
            <div className="flex items-center justify-between px-4 pt-10 pb-3 flex-shrink-0">
                <button
                    onClick={() => router.push("/food/orders")}
                    className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white cursor-pointer"
                >
                    <ChevronDown size={20} />
                </button>
                <div className="flex items-center gap-2">
                    <button className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white cursor-pointer">
                        <FileText size={18} />
                    </button>
                    <button className="h-11 px-5 rounded-full bg-white/10 text-white font-bold text-sm cursor-pointer flex items-center gap-1.5">
                        <HelpCircle size={16} /> Help
                    </button>
                </div>
            </div>

            {/* ETA */}
            <div className="px-5 pt-2 pb-5 flex-shrink-0">
                {etaUpdated && !isDelivered ? (
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                            Updated arrival
                        </span>
                        <span className="text-white/40 text-sm line-through">
                            {fmt(originalStart)} – {fmt(originalEnd)}
                        </span>
                    </div>
                ) : (
                    <div className="h-[26px] mb-2" />
                )}

                <h1 className="text-white font-bold text-4xl tabular-nums">
                    {isDelivered ? "Delivered 🎉" : `${fmt(etaStart)} – ${fmt(etaEnd)}`}
                </h1>

                <div className="mt-4 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${progressPct}%` }}
                    />
                </div>
            </div>

            {/* Status feed */}
            <div className="px-4 pb-4 flex-shrink-0">
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/10">
                    {STAGES.slice(0, stageIndex + 1).reverse().map((s, idx) => (
                        <div key={s.status} className="flex items-center gap-3 px-4 py-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${idx === 0 ? "bg-lime/20" : "bg-white/5"
                                }`}>
                                {idx === 0
                                    ? <div className="w-2.5 h-2.5 rounded-full bg-lime animate-pulse" />
                                    : <CheckCircle2 size={14} className="text-white/30" />
                                }
                            </div>
                            <p className={`text-sm leading-snug ${idx === 0 ? "text-white font-medium" : "text-white/40"
                                }`}>
                                {s.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mock map */}
            <div className="flex-1 relative bg-[#1a1d1a] mx-4 rounded-2xl overflow-hidden">
                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300">
                    <line x1="0" y1="150" x2="400" y2="150" stroke="#4a5568" strokeWidth="1" />
                    <line x1="200" y1="0" x2="200" y2="300" stroke="#4a5568" strokeWidth="1" />
                    <line x1="0" y1="75" x2="400" y2="75" stroke="#2d3748" strokeWidth="0.5" />
                    <line x1="0" y1="225" x2="400" y2="225" stroke="#2d3748" strokeWidth="0.5" />
                    <line x1="100" y1="0" x2="100" y2="300" stroke="#2d3748" strokeWidth="0.5" />
                    <line x1="300" y1="0" x2="300" y2="300" stroke="#2d3748" strokeWidth="0.5" />
                    <path d="M 80 200 Q 160 160 240 130 Q 300 110 340 80" stroke="#ffffff20" strokeWidth="2" fill="none" strokeDasharray="6 4" />
                </svg>

                <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-[1500ms] ease-in-out"
                    style={{
                        left: `${20 + stageIndex * 16}%`,
                        top: `${72 - stageIndex * 12}%`,
                    }}
                >
                    <div className="w-9 h-9 rounded-full bg-amber-400 border-2 border-ink shadow-lg flex items-center justify-center text-lg">
                        🛵
                    </div>
                </div>

                <div className="absolute left-[84%] top-[20%] -translate-x-1/2 -translate-y-full">
                    <div className="w-9 h-9 rounded-full bg-emerald-500 border-2 border-white shadow-lg flex items-center justify-center">
                        🏠
                    </div>
                </div>

                <div className="absolute left-[18%] top-[72%] -translate-x-1/2 -translate-y-full">
                    <div className="w-9 h-9 rounded-full bg-lime border-2 border-ink shadow-lg flex items-center justify-center text-sm">
                        🍽️
                    </div>
                </div>

                <p className="absolute bottom-2 right-3 text-white/20 text-[10px] font-mono">
                    Map · demo only
                </p>
            </div>

            {/* Order info */}
            <div className="flex-shrink-0 px-4 py-3 mt-2">
                <p className="text-white/40 text-xs text-center">
                    Order from{" "}
                    <span className="text-white/70 font-medium">{order.vendorName}</span>
                    {" · "}Delivering to {order.deliveryAddress}
                </p>
            </div>

        </div>
    )
}