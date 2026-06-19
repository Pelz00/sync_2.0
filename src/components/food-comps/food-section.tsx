"use client"
import { useState, useRef } from "react"
import Image, { StaticImageData } from "next/image"
import FoodCards from "./food-card"
import { X, ChevronDown, SlidersHorizontal, Crown, Tag, ArrowUpDown } from "lucide-react"
import BurgerImage from '@/assets/images/illustrtions/burger-illustration.png'
import PizzaImage from '@/assets/images/illustrtions/pizza-illustration.png'
import BreakfastImage from '@/assets/images/illustrtions/breakfast-illustration.png'
import HealthyImage from '@/assets/images/illustrtions/healthy-illustration.png'
import SmallchopsImage from '@/assets/images/illustrtions/small-chops-illustration.png'
import LocalFoodImage from '@/assets/images/illustrtions/local-food-illustration.png'
import JollofImage from '@/assets/images/illustrtions/jollof-illustration.png'
import DesertImage from '@/assets/images/illustrtions/deserts-illustration.png'
import SuyaImage from '@/assets/images/illustrtions/suya-illustration.png'
import DrinksImage from '@/assets/images/illustrtions/drinks-illustration.png'

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

// Illustration tabs — image + label, label must match food category values
const ILLUS_TABS = [
    { label: "All", image: null },
    { label: "Breakfast", image: BreakfastImage },
    { label: "Jollof", image: JollofImage },
    { label: "Swallow", image: LocalFoodImage },
    { label: "Fast Food", image: BurgerImage },
    { label: "Small Chops", image: SmallchopsImage },
    { label: "Desert", image: DesertImage },
    { label: "Suya", image: SuyaImage },
    { label: "Drinks", image: DrinksImage },
    { label: "Pizza", image: PizzaImage },
    { label: "Healthy", image: HealthyImage },
] as { label: string; image: StaticImageData | null }[]

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
            {icon}{label}{suffix}
        </button>
    )
}

export default function FoodSection({ food }: Props) {
    const [activeTabs, setActiveTabs] = useState<string[]>([])
    const [promotionsOn, setPromotionsOn] = useState(false)
    const [topRatedOn, setTopRatedOn] = useState(false)
    const [sortBy, setSortBy] = useState("recommended")
    const [foodTypes, setFoodTypes] = useState<string[]>([])
    const [foodTypeOpen, setFoodTypeOpen] = useState(false)
    const [sortOpen, setSortOpen] = useState(false)
    const [tempFoodTypes, setTempFoodTypes] = useState<string[]>([])
    const [tempSort, setTempSort] = useState("recommended")
    const filterBarRef = useRef<HTMLDivElement>(null)

    function openFoodType() { setTempFoodTypes(foodTypes); setFoodTypeOpen(true) }
    function openSort() { setTempSort(sortBy); setSortOpen(true) }
    function applyFoodType() { setFoodTypes(tempFoodTypes); setFoodTypeOpen(false) }
    function applySort() { setSortBy(tempSort); setSortOpen(false) }
    function toggleTempType(label: string) {
        setTempFoodTypes(prev => prev.includes(label) ? prev.filter(t => t !== label) : [...prev, label])
    }
    function resetAll() {
        setPromotionsOn(false); setTopRatedOn(false)
        setSortBy("recommended"); setFoodTypes([]); setActiveTabs([])
    }

    let filtered = food
    if (activeTabs.length > 0) {
        filtered = filtered.filter(f => activeTabs.includes(f.category))
    }
    if (foodTypes.length > 0) filtered = filtered.filter(f => foodTypes.includes(f.category))
    if (promotionsOn) filtered = filtered.filter(f => f.discount)
    if (topRatedOn) filtered = filtered.filter(f => parseFloat(f.rating) >= 4.6)
    if (sortBy === "rating") filtered = [...filtered].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    else if (sortBy === "delivery") filtered = [...filtered].sort((a, b) => (a.isFree ? -1 : 1) - (b.isFree ? -1 : 1))

    const hasActiveFilters = promotionsOn || topRatedOn || foodTypes.length > 0 || sortBy !== "recommended"

    return (
        <>
            <h2 className="mt-5 text-2xl text-center lg:text-left font-black tracking-tight md:text-4xl lg:text-4xl font-display leading-none">
                <span className="text-lime bg-ink dark:bg-[#111111] border-2 border-lime px-2 py-1 lg:px-4 lg:py-1 inline-block shadow-[4px_4px_0px_0px_rgba(197,255,74,1)]">
                    Order up.
                </span>
            </h2>

            {/* ── Illustration category tabs ────────────────────────────── */}
            <div className="mt-4 flex gap-3 overflow-x-auto scrollbar-none pb-3">
                {ILLUS_TABS.map(tab => {
                    const active = activeTabs.includes(tab.label)

                    return (
                        <button
                            key={tab.label}
                            onClick={() =>
                                setActiveTabs(prev =>
                                    prev.includes(tab.label)
                                        ? prev.filter(t => t !== tab.label)
                                        : [...prev, tab.label]
                                )
                            }
                            className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group"
                        >
                            <div className="relative w-16 h-16">
                                {/* Solid-fill circle background — lime when active, soft neutral otherwise */}
                                <div
                                    className={`w-16 h-16 rounded-full flex items-center justify-center overflow-hidden transition-all
                                        ${active
                                            ? "bg-lime"
                                            : "bg-content-muted/10 group-hover:bg-content-muted/15"
                                        }
                                    `}
                                >
                                    {tab.image ? (
                                        <Image
                                            src={tab.image}
                                            alt={tab.label}
                                            width={50}
                                            height={50}
                                            className="object-contain w-14 h-14"
                                        />
                                    ) : (
                                        <span className="text-2xl">🍽️</span>
                                    )}
                                </div>

                                {/* Checkmark badge — sits at the corner, overlapping the circle */}
                                {active && (
                                    <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-ink border-2 border-surface flex items-center justify-center z-10">
                                        <svg width="9" height="7" viewBox="0 0 10 8" fill="none">
                                            <path
                                                d="M1 4L3.5 6.5L9 1"
                                                stroke="#C5FF4A"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            <span
                                className={`text-[11px] font-medium text-center leading-tight transition-colors ${active
                                    ? "text-content font-bold"
                                    : "text-content-muted"
                                    }`}
                            >
                                {tab.label}
                            </span>
                        </button>
                    )
                })}
            </div>
            {/* ── Sticky filter bar ─────────────────────────────────────── */}
            <div
                ref={filterBarRef}
                className="sticky top-16 z-20 py-2 bg-surface/90 backdrop-blur-md border-b border-content-muted/10"
            >
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
                    <Pill label="Promotions" active={promotionsOn} onClick={() => setPromotionsOn(p => !p)} icon={<Tag size={13} />} suffix={promotionsOn ? <X size={12} className="ml-0.5" /> : undefined} />
                    <Pill label={foodTypes.length > 0 ? `Food type (${foodTypes.length})` : "Food type"} active={foodTypes.length > 0} onClick={openFoodType} icon={<SlidersHorizontal size={13} />} suffix={<ChevronDown size={13} />} />
                    <Pill label={sortBy !== "recommended" ? `Sort: ${SORT_OPTIONS.find(s => s.value === sortBy)?.label}` : "Sort by"} active={sortBy !== "recommended"} onClick={openSort} icon={<ArrowUpDown size={13} />} suffix={<ChevronDown size={13} />} />
                    <Pill label="Top Rated" active={topRatedOn} onClick={() => setTopRatedOn(r => !r)} icon={<Crown size={13} />} suffix={topRatedOn ? <X size={12} className="ml-0.5" /> : undefined} />
                    {hasActiveFilters && (
                        <button onClick={resetAll} className="flex-shrink-0 text-xs text-content-muted underline underline-offset-2 hover:text-content transition ml-1 cursor-pointer">
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

            {/* Food type modal */}
            {foodTypeOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center" onClick={e => { if (e.target === e.currentTarget) setFoodTypeOpen(false) }}>
                    <div className="bg-panel w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl border border-content-muted/20 shadow-[0_-8px_32px_rgba(0,0,0,0.15)] flex flex-col max-h-[85vh]">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-content-muted/20 flex-shrink-0">
                            <h3 className="font-bold text-lg text-content">Food type</h3>
                            <button onClick={() => setFoodTypeOpen(false)} className="w-8 h-8 rounded-full border border-content-muted/30 flex items-center justify-center text-content-muted hover:text-content cursor-pointer"><X size={16} /></button>
                        </div>
                        <div className="overflow-y-auto flex-1 px-5 py-4">
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                {FOOD_TYPE_CATEGORIES.map(({ label, emoji }) => {
                                    const selected = tempFoodTypes.includes(label)
                                    return (
                                        <button key={label} onClick={() => toggleTempType(label)} className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl border-2 cursor-pointer transition-all ${selected ? "border-lime bg-lime/10" : "border-content-muted/20 bg-surface-deep hover:border-content-muted/40"}`}>
                                            {selected && (
                                                <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-lime rounded-full flex items-center justify-center">
                                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="#0e0e12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                </span>
                                            )}
                                            <span className="text-3xl">{emoji}</span>
                                            <span className="text-xs font-medium text-content text-center leading-tight">{label}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="px-5 py-4 border-t border-content-muted/20 flex-shrink-0 flex gap-3">
                            <button onClick={() => setTempFoodTypes([])} className="flex-1 border border-content-muted/30 text-content font-medium text-sm py-3 rounded-xl cursor-pointer hover:bg-content-muted/5 transition">Clear</button>
                            <button onClick={applyFoodType} className="flex-2 flex-grow-[2] bg-lime text-ink font-bold text-sm py-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer">
                                Show results {tempFoodTypes.length > 0 && `(${tempFoodTypes.length})`}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sort modal */}
            {sortOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center" onClick={e => { if (e.target === e.currentTarget) setSortOpen(false) }}>
                    <div className="bg-panel w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl border border-content-muted/20 shadow-[0_-8px_32px_rgba(0,0,0,0.15)]">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-content-muted/20">
                            <h3 className="font-bold text-lg text-content">Sort by</h3>
                            <button onClick={() => setSortOpen(false)} className="w-8 h-8 rounded-full border border-content-muted/30 flex items-center justify-center text-content-muted hover:text-content cursor-pointer"><X size={16} /></button>
                        </div>
                        <div className="px-5 py-3 flex flex-col gap-1">
                            {SORT_OPTIONS.map(opt => (
                                <button key={opt.value} onClick={() => setTempSort(opt.value)} className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl hover:bg-content-muted/5 cursor-pointer transition">
                                    <span className="flex items-center gap-3 text-sm text-content font-medium">
                                        <span className="text-xl">{opt.icon}</span>
                                        {opt.label}
                                    </span>
                                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${tempSort === opt.value ? "border-lime bg-lime" : "border-content-muted/40"}`}>
                                        {tempSort === opt.value && <span className="w-2 h-2 rounded-full bg-ink" />}
                                    </span>
                                </button>
                            ))}
                        </div>
                        <div className="px-5 py-4 border-t border-content-muted/20">
                            <button onClick={applySort} className="w-full bg-lime text-ink font-bold text-sm py-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer">
                                Show results
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}