"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { isVendorOpen } from "@/lib/vendor-hours"
import Image, { StaticImageData } from "next/image"
import { X, Plus, Minus, ShoppingBag, Star, AlarmClock, MapPin, Bike, ArrowLeft, Trash2, ShoppingCart } from "lucide-react"
import { TbCurrencyNaira } from "react-icons/tb"
import { GoDotFill } from "react-icons/go"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import EmptyCart from '@/components/food-comps/EmptyCart'
import StoreInfoModal, { type StoreInfo } from "@/components/food-comps/StoreInfoModal"
import { Sheet, SheetContent, SheetClose, SheetTitle } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import { useCart } from "@/app/(app)/food/cart-context"


interface MenuItem {
    id: string
    name: string
    description: string
    price: number
    image: StaticImageData | string
}
interface MenuSection { title: string; items: MenuItem[] }

interface Props {
    vendorName: string
    tagline: string
    location: string
    rating: number
    reviews: number
    deliveryTime: string
    deliveryFee: string
    time: string
    heroImage: StaticImageData | string
    menu: MenuSection[]
    storeInfo: StoreInfo
}

const SYNC_FEE = 150
const DELIVERY_FEE = 300
const PACKAGING_FEE = 100
const NAV_H = 63

type MobileView = "menu" | "cart"

export default function VendorClient({
    vendorName, tagline, location, rating, reviews,
    deliveryTime, deliveryFee, time, heroImage, menu, storeInfo
}: Props) {

    const router = useRouter()

    const {
        items,
        addItem,
        removeItem,
        increaseQty,
        decreaseQty,
        clearCart,
        subtotal,
        totalItems,
    } = useCart()

    const [activeSection, setActiveSection] = useState(menu[0]?.title ?? "")
    const [storeInfoOpen, setStoreInfoOpen] = useState(false)
    const [confirmClearOpen, setConfirmClearOpen] = useState(false)
    const [mobileView, setMobileView] = useState<MobileView>("menu")
    const [itemSheetOpen, setItemSheetOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
    const [itemQty, setItemQty] = useState(1)
    const [closedModalOpen, setClosedModalOpen] = useState(false)

    const isScrollingRef = useRef(false)
    const open = isVendorOpen(time)
    const total = items.length > 0 ? subtotal + DELIVERY_FEE + SYNC_FEE + PACKAGING_FEE : 0

    // ── Show closed modal on mount if store is closed ─────────────────────
    useEffect(() => {
        if (!isVendorOpen(time)) {
            setClosedModalOpen(true)
        }
    }, [time])

    useEffect(() => {
        if (mobileView !== "menu") document.body.style.overflow = "hidden"
        else document.body.style.overflow = ""
        return () => { document.body.style.overflow = "" }
    }, [mobileView])

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

    function getQty(id: string) { return items.find(i => i.id === id)?.qty ?? 0 }
    function removeOne(id: string) { decreaseQty(id) }
    function removeFromCart(id: string) { removeItem(id) }

    function handleClearCart() {
        clearCart()
        setConfirmClearOpen(false)
    }

    function updateQty(id: string, delta: number) {
        if (delta > 0) increaseQty(id)
        else decreaseQty(id)
    }

    function openItemSheet(item: MenuItem) {
        if (!open) { setClosedModalOpen(true); return }
        setSelectedItem(item)
        setItemQty(1)
        setItemSheetOpen(true)
    }

    function addToCartFromSheet() {
        if (!selectedItem) return
        for (let i = 0; i < itemQty; i++) {
            addItem(
                {
                    slug: vendorName.toLowerCase().replace(/\s+/g, "-"),
                    name: vendorName,
                    image: typeof heroImage === "string" ? heroImage : (heroImage as { src: string }).src,
                },
                {
                    id: selectedItem.id,
                    name: selectedItem.name,
                    description: selectedItem.description,
                    image: typeof selectedItem.image === "string" ? selectedItem.image : (selectedItem.image as { src: string }).src,
                    price: selectedItem.price,
                }
            )
        }
        setItemSheetOpen(false)
    }

    // ── Checkout — saves to sessionStorage, navigates to checkout page ────
    function handleCheckout() {
        if (!open) { setClosedModalOpen(true); return }
        sessionStorage.setItem('sync_checkout', JSON.stringify({
            vendorName,
            vendorLogo: typeof heroImage === "string"
                ? heroImage
                : (heroImage as { src: string }).src,
            deliveryAddress: location,
            subtotal,
            items: items.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
        }))
        setMobileView("menu")
        router.push('/food/checkout')
    }

    function scrollToSection(title: string) {
        setActiveSection(title)
        const el = document.getElementById(`sec-${title}`)
        if (!el) return
        isScrollingRef.current = true
        const top = el.getBoundingClientRect().top + window.scrollY - (NAV_H + 48) - 16
        window.scrollTo({ top, behavior: "smooth" })
        setTimeout(() => { isScrollingRef.current = false }, 900)
    }

    // ── Sub-components ────────────────────────────────────────────────────

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
                    <span className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full flex-shrink-0 ${open ? "bg-lime text-ink" : "bg-red-500 text-white"
                        }`}>
                        <GoDotFill className={open ? "animate-pulse" : ""} />
                        {open ? "Open now" : "Closed"}
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

    const MenuSections = ({ mobile }: { mobile: boolean }) => (
        <div className={`flex flex-col gap-6 ${mobile ? "pt-4 pb-28" : "pb-8"}`}>
            {menu.map(section => (
                <div key={section.title} id={`sec-${section.title}`}>
                    <h2 className="font-bold text-xl text-content mb-3">{section.title}</h2>
                    <div className="flex flex-col border border-content-muted/20 rounded-xl overflow-hidden">
                        {section.items.map((item, idx) => {
                            const qty = getQty(item.id)
                            const isLast = idx === section.items.length - 1
                            return (
                                <div
                                    key={item.id}
                                    className={`flex gap-3 p-3 sm:p-4 ${!isLast ? "border-b border-content-muted/20" : ""} ${!open ? "grayscale opacity-60" : ""}`}
                                >
                                    <div className="relative w-20 h-16 sm:w-24 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex flex-col justify-between flex-1 min-w-0">
                                        <div>
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="font-medium text-sm text-content">{item.name}</h3>
                                                <p className="font-bold text-sm text-content flex-shrink-0 flex items-center">
                                                    <TbCurrencyNaira />
                                                    {qty > 0 ? (item.price * qty).toLocaleString() : item.price.toLocaleString()}
                                                </p>
                                            </div>
                                            <p className="text-xs text-content-muted mt-1 line-clamp-2">{item.description}</p>
                                        </div>
                                        <div className="flex justify-end mt-2">
                                            {!open ? (
                                                <span className="text-[10px] font-semibold text-content-muted/60 border border-content-muted/20 px-3 py-1 rounded-full">
                                                    Unavailable
                                                </span>
                                            ) : qty === 0 ? (
                                                <button
                                                    onClick={() => openItemSheet(item)}
                                                    className="w-8 h-8 rounded-full border-2 border-lime flex items-center justify-center text-content hover:bg-lime hover:text-ink transition-colors cursor-pointer"
                                                    aria-label={`Add ${item.name}`}
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
                                                        onClick={() => openItemSheet(item)}
                                                        className="w-7 h-7 rounded-full bg-lime text-ink flex items-center justify-center cursor-pointer"
                                                    >
                                                        <Plus size={12} strokeWidth={2.5} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
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

    const ConfirmClearSheet = () => (
        <div
            className="fixed inset-0 z-[60] bg-black/60 flex items-end sm:items-center justify-center"
            onClick={e => { if (e.target === e.currentTarget) setConfirmClearOpen(false) }}
        >
            <div className="w-full sm:max-w-sm bg-panel rounded-t-3xl sm:rounded-3xl px-6 pt-8 pb-6 flex flex-col items-center text-center gap-1">
                <div className="w-16 h-16 rounded-full bg-red-500/15 flex items-center justify-center mb-3">
                    <ShoppingCart size={26} className="text-red-500" strokeWidth={1.5} />
                </div>
                <h2 className="font-bold text-lg text-content">Delete cart?</h2>
                <p className="text-sm text-content-muted leading-relaxed mt-1 mb-5">
                    All items will be removed. To add items back, you&apos;ll need to start a new cart.
                </p>
                <button
                    onClick={handleClearCart}
                    className="w-full bg-red-500 text-white font-bold text-sm rounded-full py-3.5 cursor-pointer hover:bg-red-600 transition"
                >
                    Delete cart
                </button>
                <button
                    onClick={() => setConfirmClearOpen(false)}
                    className="w-full text-content font-medium text-sm rounded-full py-3.5 cursor-pointer hover:bg-content-muted/5 transition"
                >
                    Keep cart
                </button>
            </div>
        </div>
    )

    const ClosedModal = () => (
        <div className="fixed inset-0 z-[80] bg-black/60 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-panel rounded-3xl px-6 pt-8 pb-6 flex flex-col items-center text-center gap-2 shadow-xl">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden mb-2 border border-line/10">
                    <Image src={heroImage} alt={vendorName} fill className="object-cover" />
                </div>
                <h2 className="font-bold text-xl text-content leading-tight">
                    {vendorName} is temporarily closed
                </h2>
                <p className="text-sm text-content-muted mt-1 leading-relaxed">
                    This store is currently closed. Come back during opening hours or browse other stores.
                </p>
                <p className="text-xs text-content-muted/70 mt-1">
                    Opening hours: <span className="font-medium text-content-muted">{time}</span>
                </p>
                <div className="flex flex-col gap-3 w-full mt-4">
                    <Link
                        href="/food"
                        className="w-full bg-lime text-ink font-bold text-sm py-4 rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all text-center cursor-pointer"
                    >
                        Browse open stores
                    </Link>
                    <button
                        onClick={() => setClosedModalOpen(false)}
                        className="w-full bg-content-muted/10 text-content font-medium text-sm py-4 rounded-2xl cursor-pointer hover:bg-content-muted/15 transition"
                    >
                        View menu anyway
                    </button>
                </div>
            </div>
        </div>
    )

    const MobileCartView = () => (
        <div className="fixed inset-0 z-50 bg-panel flex flex-col">
            <div className="flex items-center gap-3 px-4 py-4 border-b border-content-muted/20 flex-shrink-0">
                <button
                    onClick={() => setMobileView("menu")}
                    className="w-9 h-9 rounded-full border border-content-muted/20 flex items-center justify-center text-content cursor-pointer"
                >
                    <ArrowLeft size={18} />
                </button>
                <h1 className="font-bold text-lg text-content flex-1">Your Cart</h1>
                {items.length > 0 && (
                    <button
                        onClick={() => setConfirmClearOpen(true)}
                        className="w-9 h-9 rounded-full border border-content-muted/20 flex items-center justify-center text-content-muted hover:text-red-500 cursor-pointer"
                        aria-label="Delete cart"
                    >
                        <Trash2 size={16} />
                    </button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5">
                {items.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center">
                        <EmptyCart />
                    </div>
                ) : (
                    <>
                        <p className="text-sm text-content-muted">
                            {items.length} product{items.length > 1 ? "s" : ""} from{" "}
                            <span className="font-bold text-content">{vendorName}</span>
                        </p>
                        <div className="flex flex-col gap-3">
                            {items.map(item => (
                                <div key={item.id} className="flex items-center gap-3 border border-content-muted/20 rounded-xl p-3">
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm text-content truncate">{item.name}</p>
                                        <p className="text-xs text-content-muted mt-0.5 line-clamp-2">{item.description}</p>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <span className="text-xs text-content-muted flex items-center">
                                                <TbCurrencyNaira />{item.price.toLocaleString()} each
                                            </span>
                                            <span className="text-content-muted/40">·</span>
                                            <span className="text-sm font-bold text-content flex items-center">
                                                <TbCurrencyNaira />{(item.price * item.qty).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0 self-start">
                                        <button
                                            onClick={() => updateQty(item.id, -1)}
                                            className="w-8 h-8 rounded-full border border-content-muted/30 flex items-center justify-center text-content cursor-pointer"
                                            aria-label={item.qty === 1 ? `Remove ${item.name}` : `Decrease ${item.name}`}
                                        >
                                            {item.qty === 1 ? <Trash2 size={13} /> : <Minus size={13} />}
                                        </button>
                                        <span className="text-sm font-bold text-content w-5 text-center">{item.qty}</span>
                                        <button
                                            onClick={() => updateQty(item.id, 1)}
                                            className="w-8 h-8 rounded-full border-2 border-lime flex items-center justify-center text-content hover:bg-lime hover:text-ink cursor-pointer transition"
                                            aria-label={`Increase ${item.name}`}
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
                        <div className="border border-content-muted/20 rounded-xl overflow-hidden">
                            <div className="flex flex-col divide-y divide-content-muted/10">
                                {([
                                    ["Subtotal", subtotal],
                                    ["Delivery fee", DELIVERY_FEE],
                                    ["Packaging (nylon) fee", PACKAGING_FEE],
                                    ["Sync fee", SYNC_FEE],
                                ] as [string, number][]).map(([label, val]) => (
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

            {items.length > 0 && (
                <div className="flex-shrink-0 p-4 bg-panel border-t border-content-muted/20">
                    <button
                        onClick={handleCheckout}
                        className="w-full bg-lime text-ink font-bold text-base border-2 border-black rounded-xl py-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer font-mono flex items-center justify-between px-5"
                    >
                        <span className="flex items-center gap-1">
                            <TbCurrencyNaira />{total.toLocaleString()}
                        </span>
                        <span>Go to checkout →</span>
                    </button>
                </div>
            )}

            {confirmClearOpen && <ConfirmClearSheet />}
        </div>
    )

    const ItemSheet = () => (
        <Sheet open={itemSheetOpen} onOpenChange={setItemSheetOpen}>
            <SheetContent
                side="bottom"
                className="
                    p-0 flex flex-col overflow-hidden
                    max-h-[92dvh] rounded-t-2xl
                    sm:rounded-2xl sm:max-h-[85vh]
                    sm:w-full sm:max-w-md
                    sm:inset-x-auto sm:inset-y-auto
                    sm:top-1/2 sm:left-1/2
                    sm:-translate-x-1/2 sm:-translate-y-1/2
                    sm:bottom-auto sm:right-auto
                    [&>button:last-child]:hidden
                "
            >
                <VisuallyHidden.Root asChild>
                    <SheetTitle>{selectedItem?.name ?? 'Menu item'}</SheetTitle>
                </VisuallyHidden.Root>

                {selectedItem && (
                    <>
                        <div className="relative w-full h-56 flex-shrink-0">
                            <Image
                                src={selectedItem.image}
                                alt={selectedItem.name}
                                fill
                                className="object-cover"
                            />
                            <SheetClose className="absolute top-3 left-3 w-9 h-9 bg-black/60 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-black transition z-10">
                                <X size={16} />
                            </SheetClose>
                        </div>

                        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4">
                            <div className="flex items-start justify-between gap-3">
                                <h2 className="font-bold text-xl text-content leading-tight">
                                    {selectedItem.name}
                                </h2>
                                <p className="font-bold text-xl text-content flex-shrink-0 flex items-center">
                                    <TbCurrencyNaira />
                                    {selectedItem.price.toLocaleString()}
                                </p>
                            </div>
                            <p className="text-sm text-content-muted leading-relaxed">
                                {selectedItem.description}
                            </p>
                            <div className="border-t border-content-muted/20" />
                            <div className="flex flex-col items-center gap-3">
                                <p className="font-bold text-sm text-content self-start">Quantity</p>
                                <div className="flex items-center justify-center gap-6 w-full">
                                    <button
                                        onClick={() => setItemQty(q => Math.max(1, q - 1))}
                                        className="w-11 h-11 rounded-full border-2 border-content-muted/30 flex items-center justify-center text-content hover:border-lime transition cursor-pointer"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="font-bold text-2xl text-content w-10 text-center tabular-nums">
                                        {itemQty}
                                    </span>
                                    <button
                                        onClick={() => setItemQty(q => q + 1)}
                                        className="w-11 h-11 rounded-full border-2 border-lime flex items-center justify-center text-content hover:bg-lime hover:text-ink transition cursor-pointer"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex-shrink-0 px-5 pb-6 pt-3 border-t border-content-muted/20 bg-panel">
                            <button
                                onClick={addToCartFromSheet}
                                className="w-full bg-lime text-ink font-bold text-base border-2 border-black rounded-xl py-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer font-mono flex items-center justify-center gap-2"
                            >
                                Add {itemQty} to order
                                <span className="opacity-60">·</span>
                                <span className="flex items-center">
                                    <TbCurrencyNaira />
                                    {(selectedItem.price * itemQty).toLocaleString()}
                                </span>
                            </button>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    )

    return (
        <>
            {/* ── MOBILE ── */}
            <div className="block sm:hidden">
                <VendorHeader />
                <div
                    className="sticky z-20 bg-surface/95 backdrop-blur-sm border-b border-content-muted/20 flex overflow-x-auto scrollbar-none"
                    style={{ top: NAV_H }}
                >
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
                <MenuSections mobile={true} />
            </div>

            {/* ── DESKTOP ── */}
            <div className="hidden sm:flex gap-5 items-start">
                <div className="w-full lg:w-[65%] min-w-0">
                    <VendorHeader />
                    <div className="flex gap-4 mt-4">
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

                <div
                    className="hidden lg:flex flex-col w-[35%] flex-shrink-0 border border-content-muted/20 rounded-lg bg-panel shadow-sm overflow-hidden"
                    style={{ position: "sticky", top: NAV_H + 16, height: `calc(100vh - ${NAV_H + 32}px)` }}
                >
                    <div className="px-4 py-3 border-b border-content-muted/20 flex items-center justify-between flex-shrink-0">
                        <h3 className="font-bold text-sm text-content flex items-center gap-2">
                            <ShoppingBag size={16} className="text-lime" /> Your order
                        </h3>
                        {items.length > 0 && (
                            <span className="bg-lime text-ink text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </div>

                    {items.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center">
                            <EmptyCart />
                        </div>
                    ) : open ? (
                        <>
                            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 min-h-0">
                                {items.map(item => (
                                    <div key={item.id} className="flex items-start gap-2">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[13px] font-medium text-content truncate">{item.name}</p>
                                            <p className="text-[13px] text-content-muted flex items-center mt-0.5">
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
                                    {([
                                        ["Subtotal", subtotal],
                                        ["Delivery", DELIVERY_FEE],
                                        ["Packaging fee", PACKAGING_FEE],
                                        ["Sync fee", SYNC_FEE],
                                    ] as [string, number][]).map(([label, val]) => (
                                        <div key={label} className="flex justify-between text-[13px] text-content-muted">
                                            <span>{label}</span>
                                            <span className="flex items-center"><TbCurrencyNaira />{val.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between px-4 py-2 font-bold text-sm text-content">
                                    <span className="text-base">Total</span>
                                    <span className="flex items-center"><TbCurrencyNaira className="text-xl" />{total.toLocaleString()}</span>
                                </div>
                                <div className="px-4 pb-4">
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full bg-lime text-ink font-bold text-sm border-0 border-black rounded-xl py-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer font-mono"
                                    >
                                        Proceed to Checkout →
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center gap-2">
                            <ShoppingBag size={32} className="text-content-muted/30" strokeWidth={1} />
                            <p className="text-sm text-content-muted">Store is currently closed</p>
                            <p className="text-xs text-content-muted/60">{time}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Mobile floating cart bar — hidden when closed ── */}
            {items.length > 0 && mobileView === "menu" && open && (
                <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-panel/95 backdrop-blur-sm border-t border-content-muted/20 px-4 py-3">
                    <button
                        onClick={() => setMobileView("cart")}
                        className="w-full flex items-center justify-between bg-lime text-ink font-bold text-sm px-5 py-3.5 rounded-2xl border-0 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-mono cursor-pointer"
                    >
                        <span className="flex items-center gap-2">
                            <span className="bg-ink text-lime text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{totalItems}</span>
                            Go to cart
                        </span>
                        <span className="flex items-center"><TbCurrencyNaira />{total.toLocaleString()}</span>
                    </button>
                </div>
            )}

            {/* ── Mobile cart view ── */}
            {mobileView === "cart" && <MobileCartView />}

            {/* ── Item sheet ── */}
            <ItemSheet />

            {/* ── Store info modal ── */}
            {storeInfoOpen && (
                <StoreInfoModal
                    vendorName={vendorName}
                    info={storeInfo}
                    onClose={() => setStoreInfoOpen(false)}
                />
            )}

            {/* ── Closed modal ── */}
            {closedModalOpen && <ClosedModal />}
        </>
    )
}