"use client"
import { useState, useEffect, useRef } from "react"
import Image, { StaticImageData } from "next/image"
import { X, Plus, Minus, ShoppingBag, Star, AlarmClock, MapPin, Bike, ArrowLeft, Trash2 } from "lucide-react"
import { TbCurrencyNaira } from "react-icons/tb"
import { GoDotFill } from "react-icons/go"
import EmptyCart from '@/components/food-comps/EmptyCart'
import StoreInfoModal, { type StoreInfo } from "@/components/food-comps/StoreInfoModal"

interface MenuItem {
    id: string
    name: string
    description: string
    price: number
    image: StaticImageData | string
}
interface MenuSection { title: string; items: MenuItem[] }
interface CartItem { id: string; name: string; price: number; qty: number; image: StaticImageData | string }

interface Props {
    vendorName: string
    tagline: string
    location: string
    rating: number
    reviews: number
    deliveryTime: string
    deliveryFee: string
    heroImage: StaticImageData | string
    menu: MenuSection[]
    storeInfo: StoreInfo
}

const SYNC_FEE = 150
const DELIVERY_FEE = 300
const NAV_H = 80

type MobileView = "menu" | "item" | "cart"

export default function VendorClient({
    vendorName, tagline, location, rating, reviews,
    deliveryTime, deliveryFee, heroImage, menu, storeInfo
}: Props) {
    const [cart, setCart] = useState<CartItem[]>([])
    const [activeSection, setActiveSection] = useState(menu[0]?.title ?? "")
    const [modalItem, setModalItem] = useState<MenuItem | null>(null)
    const [modalQty, setModalQty] = useState(1)
    const [storeInfoOpen, setStoreInfoOpen] = useState(false)

    // Mobile-only full-screen views
    const [mobileView, setMobileView] = useState<MobileView>("menu")
    const [mobileSelectedItem, setMobileSelectedItem] = useState<MenuItem | null>(null)
    const [mobileItemQty, setMobileItemQty] = useState(1)

    const isScrollingRef = useRef(false)

    const subtotal = cart.reduce((acc, i) => acc + i.price * i.qty, 0)
    const total = cart.length > 0 ? subtotal + DELIVERY_FEE + SYNC_FEE : 0
    const totalItems = cart.reduce((acc, i) => acc + i.qty, 0)

    // Lock body scroll on mobile full-screen views
    useEffect(() => {
        if (mobileView !== "menu") document.body.style.overflow = "hidden"
        else document.body.style.overflow = ""
        return () => { document.body.style.overflow = "" }
    }, [mobileView])

    // ── cart helpers ─────────────────────────────────────────────────────
    function getQty(id: string) { return cart.find(i => i.id === id)?.qty ?? 0 }

    function addOne(item: { id: string; name: string; price: number; image: StaticImageData | string }) {
        setCart(prev => {
            const ex = prev.find(i => i.id === item.id)
            if (ex) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
            return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1, image: item.image }]
        })
    }

    function removeOne(id: string) {
        setCart(prev => {
            const ex = prev.find(i => i.id === id)
            if (!ex) return prev
            if (ex.qty === 1) return prev.filter(i => i.id !== id)
            return prev.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i)
        })
    }

    function removeFromCart(id: string) { setCart(prev => prev.filter(i => i.id !== id)) }
    function clearCart() { setCart([]) }

    function updateQty(id: string, delta: number) {
        setCart(prev => {
            const updated = prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
            return updated.filter(i => i.qty > 0)
        })
    }

    // ── scroll spy ───────────────────────────────────────────────────────
    useEffect(() => {
        if (mobileView !== "menu") return
        const observers: IntersectionObserver[] = []
        menu.forEach(section => {
            const el = document.getElementById(`sec-${section.title}`)
            if (!el) return
            const obs = new IntersectionObserver(
                entries => {
                    if (isScrollingRef.current) return
                    entries.forEach(e => { if (e.isIntersecting) setActiveSection(section.title) })
                },
                { rootMargin: `-${NAV_H + 24}px 0px -55% 0px`, threshold: 0 }
            )
            obs.observe(el)
            observers.push(obs)
        })
        return () => observers.forEach(o => o.disconnect())
    }, [menu, mobileView])

    function scrollToSection(title: string) {
        setActiveSection(title)
        const el = document.getElementById(`sec-${title}`)
        if (!el) return
        isScrollingRef.current = true
        const top = el.getBoundingClientRect().top + window.scrollY - NAV_H - 16
        window.scrollTo({ top, behavior: "smooth" })
        setTimeout(() => { isScrollingRef.current = false }, 900)
    }

    // ── desktop modal ────────────────────────────────────────────────────
    function openDesktopModal(item: MenuItem) { setModalItem(item); setModalQty(1) }
    function closeModal() { setModalItem(null) }

    function addToCartFromModal() {
        if (!modalItem) return
        setCart(prev => {
            const ex = prev.find(i => i.id === modalItem.id)
            if (ex) return prev.map(i => i.id === modalItem.id ? { ...i, qty: i.qty + modalQty } : i)
            return [...prev, { id: modalItem.id, name: modalItem.name, price: modalItem.price, qty: modalQty, image: modalItem.image }]
        })
        closeModal()
    }

    // ── mobile item detail ───────────────────────────────────────────────
    function openMobileItem(item: MenuItem) {
        setMobileSelectedItem(item)
        setMobileItemQty(1)
        setMobileView("item")
    }

    function addToCartFromMobileItem() {
        if (!mobileSelectedItem) return
        setCart(prev => {
            const ex = prev.find(i => i.id === mobileSelectedItem.id)
            if (ex) return prev.map(i => i.id === mobileSelectedItem.id ? { ...i, qty: i.qty + mobileItemQty } : i)
            return [...prev, { id: mobileSelectedItem.id, name: mobileSelectedItem.name, price: mobileSelectedItem.price, qty: mobileItemQty, image: mobileSelectedItem.image }]
        })
        setMobileView("menu")
    }

    // ── shared vendor header ─────────────────────────────────────────────
    const VendorHeader = () => (
        <>
            <div className="relative w-full h-48 sm:h-60 lg:h-72 rounded-xl overflow-hidden">
                <Image src={heroImage} alt={vendorName} fill className="object-cover" />
                <div className="absolute bottom-3 left-3 bg-black/70 text-white text-[10px] font-mono px-2 py-1 rounded-lg flex items-center gap-1">
                    <GoDotFill className="text-lime animate-pulse" />
                    312+ orders today
                </div>
            </div>
            <div className="mt-4 pb-4 border-b border-content-muted/20">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <div className="flex items-baseline gap-2 flex-wrap">
                            <h1 className="font-bold text-xl sm:text-2xl text-content">{vendorName}</h1>
                            <button
                                onClick={() => setStoreInfoOpen(true)}
                                className="text-sm underline underline-offset-2 text-content-muted hover:text-content transition cursor-pointer"
                            >
                                more info
                            </button>
                        </div>
                        <p className="text-sm text-content-muted mt-1">{tagline}</p>
                    </div>
                    <span className="flex items-center gap-1 bg-lime text-ink text-xs font-bold px-3 py-1 rounded-full flex-shrink-0">
                        <GoDotFill className="animate-pulse" /> Open now
                    </span>
                </div>
                <div className="flex flex-wrap gap-3 mt-3">
                    <span className="flex items-center gap-1 text-xs sm:text-sm text-content-muted">
                        <MapPin size={14} className="text-lime-deep dark:text-lime" /> {location}
                    </span>
                    <span className="flex items-center gap-1 text-xs sm:text-sm text-content-muted">
                        <Star size={14} fill="gold" color="gold" /> {rating} ({reviews} reviews)
                    </span>
                    <span className="flex items-center gap-1 text-xs sm:text-sm text-content-muted">
                        <AlarmClock size={14} className="text-accent-fg" /> {deliveryTime}
                    </span>
                    <span className="flex items-center gap-1 text-xs sm:text-sm text-content-muted">
                        <Bike size={14} /> {deliveryFee}
                    </span>
                </div>
            </div>
        </>
    )

    // ── menu sections ────────────────────────────────────────────────────
    const MenuSections = ({ mobile }: { mobile: boolean }) => (
        <div className={`flex flex-col gap-6 ${mobile ? "pb-28" : "pb-8"}`}>
            {menu.map(section => (
                <div key={section.title} id={`sec-${section.title}`}>
                    <h2 className="font-bold text-xl text-content mb-3">{section.title}</h2>
                    <div className="flex flex-col border border-content-muted/20 rounded-xl overflow-hidden">
                        {section.items.map((item, idx) => {
                            const qty = getQty(item.id)
                            const cartItem = cart.find(i => i.id === item.id)
                            const isLast = idx === section.items.length - 1
                            return (
                                <div key={item.id}>
                                    <div className={`flex gap-3 p-3 sm:p-4 ${!isLast || (mobile && qty > 0) ? "border-b border-content-muted/20" : ""}`}>
                                        <div className="relative w-20 h-16 sm:w-24 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex flex-col justify-between flex-1 min-w-0">
                                            <div>
                                                <div className="flex items-start justify-between gap-2">
                                                    <h3 className="font-medium text-sm text-content">{item.name}</h3>
                                                    <p className="font-bold text-sm text-content flex-shrink-0 flex items-center">
                                                        <TbCurrencyNaira />{item.price.toLocaleString()}
                                                    </p>
                                                </div>
                                                <p className="text-xs text-content-muted mt-1 line-clamp-2">{item.description}</p>
                                            </div>
                                            <div className="flex justify-end mt-2">
                                                {mobile ? (
                                                    /* Mobile: tap + opens full-screen item detail */
                                                    qty === 0 ? (
                                                        <button
                                                            onClick={() => openMobileItem(item)}
                                                            className="w-8 h-8 rounded-full border-2 border-lime flex items-center justify-center text-content hover:bg-lime hover:text-ink transition-colors cursor-pointer"
                                                        >
                                                            <Plus size={16} strokeWidth={2} />
                                                        </button>
                                                    ) : (
                                                        <div className="flex items-center gap-1.5">
                                                            <button
                                                                onClick={() => removeOne(item.id)}
                                                                className="w-7 h-7 rounded-full border-2 border-lime flex items-center justify-center text-content hover:bg-lime hover:text-ink transition cursor-pointer"
                                                            >
                                                                <Minus size={12} strokeWidth={2.5} />
                                                            </button>
                                                            <span className="text-sm font-bold text-content w-5 text-center">{qty}</span>
                                                            <button
                                                                onClick={() => openMobileItem(item)}
                                                                className="w-7 h-7 rounded-full bg-lime text-ink flex items-center justify-center cursor-pointer"
                                                            >
                                                                <Plus size={12} strokeWidth={2.5} />
                                                            </button>
                                                        </div>
                                                    )
                                                ) : (
                                                    /* Desktop: opens modal */
                                                    <button
                                                        onClick={() => openDesktopModal(item)}
                                                        className="w-8 h-8 rounded-full border-2 border-lime flex items-center justify-center text-content hover:bg-lime hover:text-ink transition-colors cursor-pointer"
                                                        aria-label={`Add ${item.name}`}
                                                    >
                                                        <Plus size={16} strokeWidth={2} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile inline cart row */}
                                    {mobile && cartItem && (
                                        <div className={`flex items-center justify-between px-3 py-2.5 bg-surface-deep ${!isLast ? "border-b border-content-muted/20" : ""}`}>
                                            <p className="text-xs font-medium text-content truncate flex-1 mr-2">{cartItem.name}</p>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <button onClick={() => removeOne(cartItem.id)} className="w-6 h-6 rounded-full border border-content-muted/30 flex items-center justify-center text-content-muted hover:text-red-500 cursor-pointer">
                                                    <Minus size={10} />
                                                </button>
                                                <span className="text-xs font-bold text-content w-4 text-center">{cartItem.qty}</span>
                                                <button onClick={() => openMobileItem(item)} className="w-6 h-6 rounded-full border border-lime flex items-center justify-center text-content hover:bg-lime hover:text-ink cursor-pointer">
                                                    <Plus size={10} />
                                                </button>
                                                <span className="text-xs font-semibold text-content flex items-center ml-1">
                                                    <TbCurrencyNaira />{(cartItem.price * cartItem.qty).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}
            {mobile && (
                <div className="flex items-center justify-center gap-1 text-xs text-content-muted pt-2">
                    <span>Fees information</span>
                    <span className="w-4 h-4 rounded-full border border-content-muted/40 flex items-center justify-center text-[9px]">i</span>
                </div>
            )}
        </div>
    )

    // ── MOBILE: full-screen item detail ──────────────────────────────────
    const MobileItemView = () => {
        if (!mobileSelectedItem) return null
        return (
            <div className="fixed inset-0 z-50 bg-panel flex flex-col overflow-y-auto">
                <div className="relative w-full h-64 flex-shrink-0">
                    <Image src={mobileSelectedItem.image} alt={mobileSelectedItem.name} fill className="object-cover" />
                    <button
                        onClick={() => setMobileView("menu")}
                        className="absolute top-4 left-4 w-9 h-9 bg-black/60 text-white rounded-full flex items-center justify-center cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="flex-1 flex flex-col p-5 gap-5">
                    <div className="flex items-start justify-between gap-3">
                        <h1 className="font-bold text-2xl text-content leading-tight">{mobileSelectedItem.name}</h1>
                        <p className="font-bold text-xl text-content flex-shrink-0 flex items-center">
                            <TbCurrencyNaira />{mobileSelectedItem.price.toLocaleString()}
                        </p>
                    </div>
                    <p className="text-sm text-content-muted leading-relaxed">{mobileSelectedItem.description}</p>

                    <div className="border-t border-content-muted/20" />

                    <div className="flex flex-col gap-3">
                        <p className="font-bold text-sm text-content">Quantity</p>
                        <div className="flex items-center gap-5">
                            <button
                                onClick={() => setMobileItemQty(q => Math.max(1, q - 1))}
                                className="w-11 h-11 rounded-full border-2 border-content-muted/30 flex items-center justify-center text-content hover:border-lime transition cursor-pointer"
                            >
                                <Minus size={18} />
                            </button>
                            <span className="font-bold text-2xl text-content w-10 text-center">{mobileItemQty}</span>
                            <button
                                onClick={() => setMobileItemQty(q => q + 1)}
                                className="w-11 h-11 rounded-full border-2 border-lime flex items-center justify-center text-content hover:bg-lime hover:text-ink transition cursor-pointer"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sticky CTA */}
                <div className="sticky bottom-0 p-4 bg-panel border-t border-content-muted/20">
                    <button
                        onClick={addToCartFromMobileItem}
                        className="w-full bg-lime text-ink font-bold text-base border-2 border-black rounded-xl py-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer font-mono flex items-center justify-center gap-2"
                    >
                        Add {mobileItemQty} to order
                        <span className="opacity-60">·</span>
                        <span className="flex items-center">
                            <TbCurrencyNaira />{(mobileSelectedItem.price * mobileItemQty).toLocaleString()}
                        </span>
                    </button>
                </div>
            </div>
        )
    }

    // ── MOBILE: full-screen cart page ────────────────────────────────────
    const MobileCartView = () => (
        <div className="fixed inset-0 z-50 bg-panel flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-content-muted/20 flex-shrink-0">
                <button
                    onClick={() => setMobileView("menu")}
                    className="w-9 h-9 rounded-full border border-content-muted/20 flex items-center justify-center text-content cursor-pointer"
                >
                    <ArrowLeft size={18} />
                </button>
                <h1 className="font-bold text-lg text-content flex-1">Your Cart</h1>
                {cart.length > 0 && (
                    <button
                        onClick={clearCart}
                        className="w-9 h-9 rounded-full border border-content-muted/20 flex items-center justify-center text-content-muted hover:text-red-500 cursor-pointer"
                    >
                        <Trash2 size={16} />
                    </button>
                )}
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5">
                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-4">
                        <p className="text-content-muted text-sm">Your cart is empty</p>
                        <button onClick={() => setMobileView("menu")} className="text-sm font-bold text-lime underline cursor-pointer">
                            Browse menu
                        </button>
                    </div>
                ) : (
                    <>
                        <p className="text-sm text-content-muted">
                            {cart.length} product{cart.length > 1 ? "s" : ""} from{" "}
                            <span className="font-bold text-content">{vendorName}</span>
                        </p>

                        {/* Cart items */}
                        <div className="flex flex-col gap-3">
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center gap-3 border border-content-muted/20 rounded-xl p-3">
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm text-content truncate">{item.name}</p>
                                        <p className="text-sm font-bold text-content flex items-center mt-0.5">
                                            <TbCurrencyNaira />{(item.price * item.qty).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <button
                                            onClick={() => updateQty(item.id, -1)}
                                            className="w-8 h-8 rounded-full border border-content-muted/30 flex items-center justify-center text-content cursor-pointer"
                                        >
                                            {item.qty === 1 ? <Trash2 size={13} /> : <Minus size={13} />}
                                        </button>
                                        <span className="text-sm font-bold text-content w-5 text-center">{item.qty}</span>
                                        <button
                                            onClick={() => updateQty(item.id, 1)}
                                            className="w-8 h-8 rounded-full border-2 border-lime flex items-center justify-center text-content hover:bg-lime hover:text-ink cursor-pointer transition"
                                        >
                                            <Plus size={13} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setMobileView("menu")}
                            className="self-start text-xs font-bold text-content border border-content-muted/30 rounded-full px-4 py-2 cursor-pointer"
                        >
                            + Add more items
                        </button>

                        {/* Fee breakdown */}
                        <div className="border border-content-muted/20 rounded-xl overflow-hidden">
                            <div className="flex flex-col divide-y divide-content-muted/10">
                                {([["Subtotal", subtotal], ["Delivery fee", DELIVERY_FEE], ["Sync fee", SYNC_FEE]] as [string, number][]).map(([label, val]) => (
                                    <div key={label} className="flex justify-between px-4 py-3 text-sm">
                                        <span className="text-content-muted">{label}</span>
                                        <span className="font-medium text-content flex items-center"><TbCurrencyNaira />{val.toLocaleString()}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between px-4 py-3 font-bold text-base text-content bg-content-muted/5">
                                    <span>Total</span>
                                    <span className="flex items-center"><TbCurrencyNaira />{total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Sticky checkout CTA */}
            {cart.length > 0 && (
                <div className="flex-shrink-0 p-4 bg-panel border-t border-content-muted/20">
                    <button className="w-full bg-lime text-ink font-bold text-base border-2 border-black rounded-xl py-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer font-mono flex items-center justify-between px-5">
                        <span className="flex items-center gap-1">
                            <TbCurrencyNaira />{total.toLocaleString()}
                        </span>
                        <span>Go to checkout →</span>
                    </button>
                </div>
            )}
        </div>
    )

    return (
        <>
            {/* ════════════════════════════════════════
                MOBILE LAYOUT
            ════════════════════════════════════════ */}
            <div className="block sm:hidden">
                <VendorHeader />

                {/* Sticky horizontal tabs */}
                <div className="sticky top-0 z-20 bg-surface/95 backdrop-blur-sm border-b border-content-muted/20 flex overflow-x-auto scrollbar-none mt-2">
                    {menu.map(s => (
                        <button
                            key={s.title}
                            onClick={() => scrollToSection(s.title)}
                            className={`flex-shrink-0 px-4 py-3 text-sm cursor-pointer transition-all ${activeSection === s.title
                                ? "border-b-2 border-lime text-content font-bold"
                                : "text-content-muted"
                                }`}
                        >
                            {s.title}
                        </button>
                    ))}
                </div>

                <div className="mt-4">
                    <MenuSections mobile={true} />
                </div>
            </div>

            {/* ════════════════════════════════════════
                DESKTOP LAYOUT
            ════════════════════════════════════════ */}
            <div className="hidden sm:flex gap-5 items-start">
                <div className="w-full lg:w-[65%] min-w-0">
                    <VendorHeader />
                    <div className="flex gap-4 mt-4">
                        {/* Left sticky category nav */}
                        <nav className="flex flex-col gap-1 w-32 flex-shrink-0 self-start" style={{ position: "sticky", top: NAV_H + 16 }}>
                            {menu.map(s => (
                                <button
                                    key={s.title}
                                    onClick={() => scrollToSection(s.title)}
                                    className={`text-left text-sm px-3 py-2.5 rounded-lg w-full cursor-pointer transition-all ${activeSection === s.title
                                        ? "bg-lime/15 text-content font-bold border-l-[3px] border-lime"
                                        : "text-content-muted hover:text-content hover:bg-content-muted/5"
                                        }`}
                                >
                                    {s.title}
                                </button>
                            ))}
                        </nav>

                        <div className="flex-1 min-w-0">
                            <MenuSections mobile={false} />
                        </div>
                    </div>
                </div>

                {/* Right sticky cart */}
                <div
                    className="hidden lg:flex flex-col w-[35%] flex-shrink-0 border border-content-muted/20 rounded-lg bg-panel shadow-sm overflow-hidden"
                    style={{ position: "sticky", top: NAV_H + 16, height: `calc(100vh - ${NAV_H + 32}px)` }}
                >
                    <div className="px-4 py-3 border-b border-content-muted/20 flex items-center justify-between flex-shrink-0">
                        <h3 className="font-bold text-sm text-content flex items-center gap-2">
                            <ShoppingBag size={16} className="text-lime" /> Your order
                        </h3>
                        {cart.length > 0 && (
                            <span className="bg-lime text-ink text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </div>

                    {cart.length === 0 ? <EmptyCart /> : (
                        <>
                            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 min-h-0">
                                {cart.map(item => (
                                    <div key={item.id} className="flex items-start gap-2">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium text-content truncate">{item.name}</p>
                                            <p className="text-xs text-content-muted flex items-center mt-0.5">
                                                <TbCurrencyNaira />{(item.price * item.qty).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 flex-shrink-0">
                                            <button onClick={() => updateQty(item.id, -1)} className="w-5 h-5 rounded-full border border-content-muted/30 flex items-center justify-center text-content hover:bg-content-muted/10 cursor-pointer"><Minus size={10} /></button>
                                            <span className="text-xs font-bold text-content w-4 text-center">{item.qty}</span>
                                            <button onClick={() => updateQty(item.id, 1)} className="w-5 h-5 rounded-full border border-content-muted/30 flex items-center justify-center text-content hover:bg-content-muted/10 cursor-pointer"><Plus size={10} /></button>
                                            <button onClick={() => removeFromCart(item.id)} className="w-5 h-5 rounded-full flex items-center justify-center text-content-muted hover:text-red-500 cursor-pointer ml-1"><X size={10} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex-shrink-0 border-t border-content-muted/20">
                                <div className="px-4 pt-3 pb-1 flex flex-col gap-1 border-b border-dashed border-content-muted/20">
                                    {([["Subtotal", subtotal], ["Delivery", DELIVERY_FEE], ["Sync fee", SYNC_FEE]] as [string, number][]).map(([label, val]) => (
                                        <div key={label} className="flex justify-between text-xs text-content-muted">
                                            <span>{label}</span>
                                            <span className="flex items-center"><TbCurrencyNaira />{val.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between px-4 py-2 font-bold text-sm text-content">
                                    <span>Total</span>
                                    <span className="flex items-center"><TbCurrencyNaira />{total.toLocaleString()}</span>
                                </div>
                                <div className="px-4 pb-4">
                                    <button className="w-full bg-lime text-ink font-bold text-sm border-2 border-black rounded-xl py-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer font-mono">
                                        Proceed to Checkout →
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile sticky "Go to cart" bar */}
            {cart.length > 0 && mobileView === "menu" && (
                <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-panel/95 backdrop-blur-sm border-t border-content-muted/20 px-4 py-3">
                    <button
                        onClick={() => setMobileView("cart")}
                        className="w-full flex items-center justify-between bg-lime text-ink font-bold text-sm px-5 py-3.5 rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-mono cursor-pointer"
                    >
                        <span className="flex items-center gap-2">
                            <span className="bg-ink text-lime text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{totalItems}</span>
                            Go to cart
                        </span>
                        <span className="flex items-center"><TbCurrencyNaira />{total.toLocaleString()}</span>
                    </button>
                </div>
            )}

            {/* Mobile full-screen views */}
            {mobileView === "item" && <MobileItemView />}
            {mobileView === "cart" && <MobileCartView />}

            {/* Desktop modal */}
            {modalItem && (
                <div
                    className="fixed inset-0 z-50 bg-black/60 hidden sm:flex items-center justify-center px-4"
                    onClick={e => { if (e.target === e.currentTarget) closeModal() }}
                >
                    <div className="bg-panel border border-content-muted/20 rounded-2xl w-full max-w-md overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <div className="relative w-full h-48">
                            <Image src={modalItem.image} alt={modalItem.name} fill className="object-cover" />
                            <button onClick={closeModal} className="absolute top-3 right-3 w-8 h-8 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black cursor-pointer">
                                <X size={16} />
                            </button>
                        </div>
                        <div className="p-5">
                            <div className="flex items-start justify-between gap-2">
                                <h2 className="font-bold text-lg text-content leading-tight">{modalItem.name}</h2>
                                <p className="font-bold text-lg text-content flex-shrink-0 flex items-center">
                                    <TbCurrencyNaira />{modalItem.price.toLocaleString()}
                                </p>
                            </div>
                            <p className="text-sm text-content-muted mt-1">{modalItem.description}</p>
                            <div className="flex items-center justify-center gap-6 mt-5">
                                <button onClick={() => setModalQty(q => Math.max(1, q - 1))} className="w-10 h-10 rounded-full border-2 border-content-muted/30 flex items-center justify-center text-content hover:border-lime transition cursor-pointer"><Minus size={18} /></button>
                                <span className="font-bold text-xl text-content w-8 text-center">{modalQty}</span>
                                <button onClick={() => setModalQty(q => q + 1)} className="w-10 h-10 rounded-full border-2 border-lime flex items-center justify-center text-content hover:bg-lime hover:text-ink transition cursor-pointer"><Plus size={18} /></button>
                            </div>
                            <button onClick={addToCartFromModal} className="w-full mt-5 bg-lime text-ink font-bold text-sm border-2 border-black rounded-xl py-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer font-mono">
                                Add {modalQty} to order · <TbCurrencyNaira className="inline" />{(modalItem.price * modalQty).toLocaleString()}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Store info modal */}
            {storeInfoOpen && (
                <StoreInfoModal
                    vendorName={vendorName}
                    info={storeInfo}
                    onClose={() => setStoreInfoOpen(false)}
                />
            )}
        </>
    )
}