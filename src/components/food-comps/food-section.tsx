"use client"
import { useState, useRef, useEffect } from "react"
import FoodCards from "./food-card"
import { StaticImageData } from "next/image"
import { X, ChevronDown, SlidersHorizontal, Crown, Tag, ArrowUpDown } from "lucide-react"

interface Food {
    slug: string
    image: StaticImageData | string
    name: string
    tags: string[]
    rating: string
    reviewCount?: number
    location: string
    time: string
    category: string
    isFree?: boolean
    deliveryTime?: string
    discount?: string
}

interface Props {
    food: Food[]
}

// ── Data ──────────────────────────────────────────────────────────────────────
const QUICK_TABS = ["All", "Breakfast", "Jollof", "Swallow", "Fast Food", "Small Chops", "Desert", "Suya", "Drinks"]

const FOOD_TYPE_CATEGORIES = [
    { label: "Breakfast", emoji: "🍳" },
    { label: "Jollof", emoji: "🍛" },
    { label: "Swallow", emoji: "🍲" },
    { label: "Fast Food", emoji: "🍔" },
    { label: "Small Chops", emoji: "🥟" },
    { label: "Desert", emoji: "🍨" },
    { label: "Suya", emoji: "🍢" },
    { label: "Drinks", emoji: "🧃" },
    { label: "Pizza", emoji: "🍕" },
    { label: "Rice", emoji: "🍚" },
    { label: "Chicken", emoji: "🍗" },
    { label: "Pasta", emoji: "🍝" },
]

const SORT_OPTIONS = [
    { label: "Recommended", value: "recommended", icon: "👤" },
    { label: "Near me", value: "near", icon: "📍" },
    { label: "Ratings", value: "rating", icon: "👍" },
    { label: "Delivery fee", value: "delivery", icon: "🛵" },
]

// ── Small helpers ─────────────────────────────────────────────────────────────
function Pill({
    label, active, onClick, icon, suffix
}: { label: string; active?: boolean; onClick: () => void; icon?: React.ReactNode; suffix?: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer flex-shrink-0
                ${active
                    ? "bg-lime text-ink border-transparent shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] font-bold"
                    : "bg-panel text-content border-content-muted/20 hover:border-content-muted/50"
                }`}
        >
            {icon}
            {label}
            {suffix}
        </button>
    )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function FoodSection({ food }: Props) {
    // quick tab filter
    const [activeTab, setActiveTab] = useState("All")

    // filter bar state
    const [promotionsOn, setPromotionsOn] = useState(false)
    const [topRatedOn, setTopRatedOn] = useState(false)
    const [sortBy, setSortBy] = useState("recommended")
    const [foodTypes, setFoodTypes] = useState<string[]>([])

    // modals
    const [foodTypeOpen, setFoodTypeOpen] = useState(false)
    const [sortOpen, setSortOpen] = useState(false)

    // temp selections inside modal (only committed on "Show results")
    const [tempFoodTypes, setTempFoodTypes] = useState<string[]>([])
    const [tempSort, setTempSort] = useState("recommended")

    // sticky filter bar ref
    const filterBarRef = useRef<HTMLDivElement>(null)

    function openFoodType() { setTempFoodTypes(foodTypes); setFoodTypeOpen(true) }
    function openSort() { setTempSort(sortBy); setSortOpen(true) }

    function applyFoodType() { setFoodTypes(tempFoodTypes); setFoodTypeOpen(false) }
    function applySort() { setSortBy(tempSort); setSortOpen(false) }

    function toggleTempType(label: string) {
        setTempFoodTypes(prev =>
            prev.includes(label) ? prev.filter(t => t !== label) : [...prev, label]
        )
    }

    function resetAll() {
        setPromotionsOn(false)
        setTopRatedOn(false)
        setSortBy("recommended")
        setFoodTypes([])
        setActiveTab("All")
    }

    // ── Filtering logic ───────────────────────────────────────────────────
    let filtered = food

    // quick tab
    if (activeTab !== "All") filtered = filtered.filter(f => f.category === activeTab)

    // food type modal selection
    if (foodTypes.length > 0) filtered = filtered.filter(f => foodTypes.includes(f.category))

    // promotions = only items with a discount
    if (promotionsOn) filtered = filtered.filter(f => f.discount)

    // top rated = rating >= 4.6
    if (topRatedOn) filtered = filtered.filter(f => parseFloat(f.rating) >= 4.6)

    // sort
    if (sortBy === "rating") {
        filtered = [...filtered].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    } else if (sortBy === "delivery") {
        filtered = [...filtered].sort((a, b) => (a.isFree ? -1 : 1) - (b.isFree ? -1 : 1))
    }

    const hasActiveFilters = promotionsOn || topRatedOn || foodTypes.length > 0 || sortBy !== "recommended"


    return (
        <>
            <h2 className="mt-5 text-2xl text-center lg:text-left font-black tracking-tight md:text-4xl lg:text-4xl font-display leading-none">
                <span className="text-lime bg-ink dark:bg-[#111111] border-2 border-lime px-2 py-1 lg:px-4 lg:py-1 inline-block shadow-[4px_4px_0px_0px_rgba(197,255,74,1)]">
                    Order up.
                </span>
            </h2>

            {/* ── Quick category tabs ───────────────────────────────────── */}
            <div className="mt-3 flex flex-row gap-1.5 flex-wrap">
                {QUICK_TABS.map(tab => (
                    <div
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`border rounded-full px-3 py-1 lg:px-5 lg:py-2 cursor-pointer text-xs lg:text-sm transition-colors ${activeTab === tab
                            ? "bg-lime text-ink font-bold border-transparent shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                            : "bg-panel text-content border-content-muted/20"
                            }`}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            {/* ── Sticky filter bar ─────────────────────────────────────── */}
            <div
                ref={filterBarRef}
                className="sticky top-16 z-20 py-2 bg-surface/90 backdrop-blur-md border-b border-content-muted/10"
            >
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">

                    {/* Promotions */}
                    <Pill
                        label="Promotions"
                        active={promotionsOn}
                        onClick={() => setPromotionsOn(p => !p)}
                        icon={<Tag size={13} />}
                        suffix={promotionsOn ? <X size={12} className="ml-0.5" /> : undefined}
                    />

                    {/* Food type */}
                    <Pill
                        label={foodTypes.length > 0 ? `Food type (${foodTypes.length})` : "Food type"}
                        active={foodTypes.length > 0}
                        onClick={openFoodType}
                        icon={<SlidersHorizontal size={13} />}
                        suffix={<ChevronDown size={13} />}
                    />

                    {/* Sort by */}
                    <Pill
                        label={sortBy !== "recommended" ? `Sort: ${SORT_OPTIONS.find(s => s.value === sortBy)?.label}` : "Sort by"}
                        active={sortBy !== "recommended"}
                        onClick={openSort}
                        icon={<ArrowUpDown size={13} />}
                        suffix={<ChevronDown size={13} />}
                    />


                    <Pill
                        label="Top Rated"
                        active={topRatedOn}
                        onClick={() => setTopRatedOn(r => !r)}
                        icon={<Crown size={13} />}
                        suffix={topRatedOn ? <X size={12} className="ml-0.5" /> : undefined}
                    />


                    {hasActiveFilters && (
                        <button
                            onClick={resetAll}
                            className="flex-shrink-0 text-xs text-content-muted underline underline-offset-2 hover:text-content transition ml-1 cursor-pointer"
                        >
                            Reset
                        </button>
                    )}
                </div>


                {(foodTypes.length > 0 || promotionsOn || topRatedOn) && (
                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                        {promotionsOn && (
                            <span className="flex items-center gap-1 bg-lime/15 text-lime-deep dark:text-lime text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-lime/20">
                                Promotions <button onClick={() => setPromotionsOn(false)} className="cursor-pointer"><X size={10} /></button>
                            </span>
                        )}
                        {topRatedOn && (
                            <span className="flex items-center gap-1 bg-lime/15 text-lime-deep dark:text-lime text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-lime/20">
                                Top Rated <button onClick={() => setTopRatedOn(false)} className="cursor-pointer"><X size={10} /></button>
                            </span>
                        )}
                        {foodTypes.map(t => (
                            <span key={t} className="flex items-center gap-1 bg-lime/15 text-lime-deep dark:text-lime text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-lime/20">
                                {t} <button onClick={() => setFoodTypes(prev => prev.filter(x => x !== t))} className="cursor-pointer"><X size={10} /></button>
                            </span>
                        ))}
                    </div>
                )}
            </div>


            <p className="text-xs text-content-muted mt-2 mb-1">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </p>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 mt-1">
                {filtered.length > 0 ? (
                    filtered.map((item, index) => (
                        <FoodCards key={index} {...item} isTopRated={parseFloat(item.rating) >= 4.6} />
                    ))
                ) : (
                    <p className="col-span-3 text-center text-content-muted text-sm py-12">
                        No food spots match your filters.
                    </p>
                )}
            </div>

            {foodTypeOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center"
                    onClick={e => { if (e.target === e.currentTarget) setFoodTypeOpen(false) }}
                >
                    <div className="bg-panel w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl border border-content-muted/20 shadow-[0_-8px_32px_rgba(0,0,0,0.15)] flex flex-col max-h-[85vh]">

                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-content-muted/20 flex-shrink-0">
                            <h3 className="font-bold text-lg text-content">Food type</h3>
                            <button onClick={() => setFoodTypeOpen(false)} className="w-8 h-8 rounded-full border border-content-muted/30 flex items-center justify-center text-content-muted hover:text-content cursor-pointer">
                                <X size={16} />
                            </button>
                        </div>

                        {/* Grid of categories */}
                        <div className="overflow-y-auto flex-1 px-5 py-4">
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                {FOOD_TYPE_CATEGORIES.map(({ label, emoji }) => {
                                    const selected = tempFoodTypes.includes(label)
                                    return (
                                        <button
                                            key={label}
                                            onClick={() => toggleTempType(label)}
                                            className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl border-2 cursor-pointer transition-all ${selected
                                                ? "border-lime bg-lime/10"
                                                : "border-content-muted/20 bg-surface-deep hover:border-content-muted/40"
                                                }`}
                                        >
                                            {/* Checkmark */}
                                            {selected && (
                                                <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-lime rounded-full flex items-center justify-center">
                                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                                        <path d="M1 4l2.5 2.5L9 1" stroke="#0e0e12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </span>
                                            )}
                                            <span className="text-3xl">{emoji}</span>
                                            <span className="text-xs font-medium text-content text-center leading-tight">{label}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-5 py-4 border-t border-content-muted/20 flex-shrink-0 flex gap-3">
                            <button
                                onClick={() => setTempFoodTypes([])}
                                className="flex-1 border border-content-muted/30 text-content font-medium text-sm py-3 rounded-xl cursor-pointer hover:bg-content-muted/5 transition"
                            >
                                Clear
                            </button>
                            <button
                                onClick={applyFoodType}
                                className="flex-2 flex-grow-[2] bg-lime text-ink font-bold text-sm py-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer"
                            >
                                Show results {tempFoodTypes.length > 0 && `(${tempFoodTypes.length})`}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {sortOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center"
                    onClick={e => { if (e.target === e.currentTarget) setSortOpen(false) }}
                >
                    <div className="bg-panel w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl border border-content-muted/20 shadow-[0_-8px_32px_rgba(0,0,0,0.15)]">

                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-content-muted/20">
                            <h3 className="font-bold text-lg text-content">Sort by</h3>
                            <button onClick={() => setSortOpen(false)} className="w-8 h-8 rounded-full border border-content-muted/30 flex items-center justify-center text-content-muted hover:text-content cursor-pointer">
                                <X size={16} />
                            </button>
                        </div>

                        {/* Options */}
                        <div className="px-5 py-3 flex flex-col gap-1">
                            {SORT_OPTIONS.map(opt => (
                                <button
                                    key={opt.value}
                                    onClick={() => setTempSort(opt.value)}
                                    className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl hover:bg-content-muted/5 cursor-pointer transition group"
                                >
                                    <span className="flex items-center gap-3 text-sm text-content font-medium">
                                        <span className="text-xl">{opt.icon}</span>
                                        {opt.label}
                                    </span>
                                    {/* Radio */}
                                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${tempSort === opt.value ? "border-lime bg-lime" : "border-content-muted/40"
                                        }`}>
                                        {tempSort === opt.value && (
                                            <span className="w-2 h-2 rounded-full bg-ink" />
                                        )}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="px-5 py-4 border-t border-content-muted/20">
                            <button
                                onClick={applySort}
                                className="w-full bg-lime text-ink font-bold text-sm py-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer"
                            >
                                Show results
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}