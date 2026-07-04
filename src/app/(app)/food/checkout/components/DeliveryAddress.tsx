"use client"

import { useState } from "react"
import { MapPin, Navigation, Phone, X, Search, ChevronRight, Edit2, User } from "lucide-react"
import dynamic from "next/dynamic"

const DeliveryMap = dynamic(() => import("@/components/food-comps/DeliveryMap"), { ssr: false })

export interface DeliveryAddressData {
    address: string
    building: string
    instructions: string
    phone: string
    sendToSomeoneElse: boolean
    recipientName: string
    recipientPhone: string
}

interface Props {
    value: DeliveryAddressData
    onChange: (next: DeliveryAddressData) => void
}

const SAVED_ADDRESS = {
    label: "Tanke Crescent, Behind Tanke Lodge, Ilorin",
    lat: 8.4966,
    lng: 4.5426,
}

const inputClass =
    "w-full rounded-xl border border-line/10 bg-surface px-4 py-3 text-sm text-content placeholder:text-content-muted/60 outline-none transition focus:border-lime"

type ModalStep = "pick" | "search"

export default function DeliveryAddress({ value, onChange }: Props) {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalStep, setModalStep] = useState<ModalStep>("pick")
    const [searchQuery, setSearchQuery] = useState("")
    const [recipientModalOpen, setRecipientModalOpen] = useState(false)
    const [draftName, setDraftName] = useState("")
    const [draftPhone, setDraftPhone] = useState("")
    const [phoneModalOpen, setPhoneModalOpen] = useState(false)

    function set<K extends keyof DeliveryAddressData>(key: K, val: DeliveryAddressData[K]) {
        onChange({ ...value, [key]: val })
    }

    function openModal() {
        setModalStep("pick")
        setModalOpen(true)
    }

    // Pre-fill drafts with whatever is already saved, then open
    function openRecipientModal() {
        setDraftName(value.recipientName)
        setDraftPhone(value.recipientPhone)
        setRecipientModalOpen(true)
    }

    function useCurrentLocation() {
        onChange({ ...value, address: SAVED_ADDRESS.label })
        setModalOpen(false)
    }

    function applySearchedAddress() {
        if (!searchQuery.trim()) return
        onChange({ ...value, address: searchQuery.trim() })
        setSearchQuery("")
        setModalOpen(false)
    }

    // Commit drafts to parent state only on Save
    function saveRecipient() {
        onChange({ ...value, recipientName: draftName.trim(), recipientPhone: draftPhone.trim() })
        setRecipientModalOpen(false)
    }

    // Clear saved recipient and close
    function removeRecipient() {
        onChange({ ...value, recipientName: "", recipientPhone: "" })
        setRecipientModalOpen(false)
    }

    return (
        <>
            <div className="rounded-2xl border border-line/10 bg-panel overflow-hidden">

                {/* Header */}
                <div className="flex items-center gap-3 px-4 py-4 border-b border-line/10">
                    <div className="w-10 h-10 rounded-full bg-lime/15 flex items-center justify-center flex-shrink-0">
                        <MapPin size={18} className="text-lime-deep dark:text-lime" />
                    </div>
                    <div>
                        <h2 className="font-bold text-content">Delivery address</h2>
                        <p className="text-sm text-content-muted">Where should we deliver your food?</p>
                    </div>
                </div>

                {/* Map preview */}
                <div className="h-44 w-full border-b border-line/10 isolate z-0">
                    <DeliveryMap lat={SAVED_ADDRESS.lat} lng={SAVED_ADDRESS.lng} />
                </div>

                {/* Current address row */}
                <button
                    onClick={openModal}
                    className="w-full flex items-center gap-3 px-4 py-4 border-b border-line/10 hover:bg-content-muted/5 transition cursor-pointer text-left"
                >
                    <div className="w-8 h-8 rounded-full bg-lime flex items-center justify-center flex-shrink-0">
                        <Navigation size={14} className="text-ink" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-content truncate">
                            {value.address || SAVED_ADDRESS.label}
                        </p>
                        <p className="text-xs text-lime mt-0.5">Current location</p>
                    </div>
                    <ChevronRight size={16} className="text-content-muted flex-shrink-0" />
                </button>

                {/* Send to someone else — row reflects saved value only */}
                <button
                    onClick={openRecipientModal}
                    className="w-full flex items-center gap-3 px-4 py-4 border-b border-line/10 hover:bg-content-muted/5 transition cursor-pointer text-left"
                >
                    <div className="w-8 h-8 rounded-full bg-content-muted/10 flex items-center justify-center flex-shrink-0">
                        <User size={14} className="text-content-muted" />
                    </div>
                    <div className="flex-1 min-w-0">
                        {value.recipientName ? (
                            <>
                                <p className="text-sm font-bold text-content">
                                    Sending to {value.recipientName}
                                </p>
                                <p className="text-xs text-content-muted mt-0.5">
                                    If it's for you, remove this recipient.
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-sm font-medium text-content">Sending to someone else?</p>
                                <p className="text-xs text-content-muted mt-0.5">
                                    Add their details to help the courier
                                </p>
                            </>
                        )}
                    </div>
                    <ChevronRight size={16} className="text-content-muted flex-shrink-0" />
                </button>

                {/* Add phone number */}
                <button
                    onClick={() => {
                        setDraftPhone(value.phone)
                        setPhoneModalOpen(true)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-4 border-b border-line/10 hover:bg-content-muted/5 transition text-left cursor-pointer"
                >
                    <div className="w-8 h-8 rounded-full bg-content-muted/10 flex items-center justify-center">
                        <Phone size={14} className="text-content-muted" />
                    </div>

                    <div className="flex-1">
                        <p className="text-sm font-medium text-content">
                            Add your phone number
                        </p>

                        <p className="text-xs text-content-muted">
                            We'll send you a message to validate it
                        </p>
                    </div>

                    <ChevronRight
                        size={16}
                        className="text-content-muted"
                    />
                </button>

                {/* Delivery instructions */}
                <div className="px-4 py-4">
                    <p className="text-sm font-medium text-content mb-2">
                        Delivery instructions{" "}
                        <span className="text-content-muted font-normal">(optional)</span>
                    </p>
                    <textarea
                        rows={3}
                        className={`${inputClass} resize-none`}
                        value={value.instructions}
                        onChange={e => set("instructions", e.target.value)}
                        placeholder="Gate number, landmark, call when outside..."
                    />
                </div>
            </div>

            {/* ── Address modal ── */}
            {modalOpen && (
                <div
                    className="fixed inset-0 z-[70] bg-black/60 flex items-end sm:items-center justify-center px-4"
                    onClick={e => { if (e.target === e.currentTarget) setModalOpen(false) }}
                >
                    <div className="w-full max-w-md bg-panel rounded-t-3xl sm:rounded-3xl overflow-hidden">

                        <div className="flex items-center gap-3 px-5 pt-6 pb-4">
                            {modalStep === "search" && (
                                <button
                                    onClick={() => setModalStep("pick")}
                                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-content-muted/10 cursor-pointer"
                                >
                                    <ChevronRight size={18} className="rotate-180 text-content" />
                                </button>
                            )}
                            <h2 className="font-bold text-xl text-content flex-1">
                                Where shall we deliver to?
                            </h2>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="w-8 h-8 rounded-full border border-line/15 flex items-center justify-center cursor-pointer hover:bg-content-muted/10"
                            >
                                <X size={16} className="text-content" />
                            </button>
                        </div>

                        {modalStep === "pick" && (
                            <div className="px-5 pb-6 flex flex-col gap-3">
                                <button
                                    onClick={useCurrentLocation}
                                    className="w-full flex items-center gap-3 p-4 rounded-2xl border border-line/10 hover:bg-content-muted/5 transition cursor-pointer text-left"
                                >
                                    <div className="w-9 h-9 rounded-full bg-lime/15 flex items-center justify-center flex-shrink-0">
                                        <Navigation size={16} className="text-lime-deep dark:text-lime" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-content truncate">
                                            {value.address || SAVED_ADDRESS.label}
                                        </p>
                                        <p className="text-xs text-content-muted mt-0.5">Current location</p>
                                    </div>
                                    <button
                                        onClick={e => { e.stopPropagation(); setModalStep("search") }}
                                        className="w-8 h-8 rounded-full bg-content-muted/10 flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-content-muted/20"
                                    >
                                        <Edit2 size={13} className="text-content-muted" />
                                    </button>
                                </button>
                                <button
                                    onClick={() => setModalStep("search")}
                                    className="w-full py-4 rounded-2xl bg-lime/10 border border-lime/20 text-lime-deep dark:text-lime font-bold text-sm cursor-pointer hover:bg-lime/15 transition"
                                >
                                    Add a new address
                                </button>
                            </div>
                        )}

                        {modalStep === "search" && (
                            <div className="px-5 pb-6 flex flex-col gap-4">
                                <div className="relative">
                                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-content-muted" />
                                    <input
                                        autoFocus
                                        className="w-full rounded-xl border-2 border-lime bg-surface pl-11 pr-4 py-3 text-sm text-content placeholder:text-content-muted/60 outline-none"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        onKeyDown={e => { if (e.key === "Enter") applySearchedAddress() }}
                                        placeholder="Search address..."
                                    />
                                </div>
                                {searchQuery.trim() && (
                                    <button
                                        onClick={applySearchedAddress}
                                        className="w-full py-3.5 rounded-2xl bg-lime text-ink font-bold text-sm cursor-pointer border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all"
                                    >
                                        Use "{searchQuery}"
                                    </button>
                                )}
                                <button
                                    onClick={useCurrentLocation}
                                    className="w-full py-3.5 rounded-2xl bg-lime/10 border border-lime/20 text-lime-deep dark:text-lime font-bold text-sm cursor-pointer hover:bg-lime/15 transition"
                                >
                                    Use current location
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── Recipient modal — bottom-sheet on mobile, centered on desktop ── */}
            {recipientModalOpen && (
                <div
                    className="fixed inset-0 z-[70] bg-black/60 flex items-end sm:items-center justify-center px-4"
                    onClick={e => { if (e.target === e.currentTarget) setRecipientModalOpen(false) }}
                >
                    <div className="w-full max-w-md bg-panel rounded-t-3xl sm:rounded-3xl overflow-hidden">

                        <div className="flex items-center justify-between px-5 pt-6 pb-4">
                            <h2 className="font-bold text-xl text-content">Add a recipient</h2>
                            <button
                                onClick={() => setRecipientModalOpen(false)}
                                className="w-8 h-8 rounded-full border border-line/15 flex items-center justify-center cursor-pointer hover:bg-content-muted/10"
                            >
                                <X size={16} className="text-content" />
                            </button>
                        </div>

                        <div className="px-5 pb-6 flex flex-col gap-3">
                            <input
                                className={inputClass}
                                value={draftName}
                                onChange={e => setDraftName(e.target.value)}
                                placeholder="Recipient name"
                                autoFocus
                            />
                            <input
                                className={inputClass}
                                value={draftPhone}
                                onChange={e => setDraftPhone(e.target.value)}
                                placeholder="Phone number"
                            />
                            <p className="text-xs text-content-muted leading-relaxed">
                                By sharing the recipient's details, you are solely responsible for
                                obtaining their consent and informing them on how their data is processed.
                            </p>

                            {/* Remove — only shown when a recipient was already saved before opening */}
                            {value.recipientName && (
                                <button
                                    onClick={removeRecipient}
                                    className="w-full py-3.5 rounded-2xl bg-red-500 text-white font-bold text-sm border-0 border-red-700 hover:bg-red-600 transition"
                                >
                                    Remove
                                </button>
                            )}

                            <button
                                onClick={saveRecipient}
                                disabled={!draftName.trim() && !draftPhone.trim()}
                                className="w-full py-3.5 rounded-2xl bg-lime text-ink font-bold text-sm border-0 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Phone modal */}
            {phoneModalOpen && (
                <div
                    className="fixed inset-0 z-[70] bg-black/60 flex items-end sm:items-center justify-center px-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setPhoneModalOpen(false)
                        }
                    }}
                >
                    <div className="w-full max-w-md bg-panel rounded-t-3xl sm:rounded-3xl overflow-hidden">

                        <div className="flex items-center justify-between px-5 pt-6 pb-4">
                            <h2 className="font-bold text-xl text-content">
                                Phone number
                            </h2>

                            <button
                                onClick={() => setPhoneModalOpen(false)}
                                className="w-8 h-8 rounded-full border border-line/15 flex items-center justify-center"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="px-5 pb-6 space-y-4">

                            <p className="text-sm text-content-muted">
                                We'll send a verification code to this phone number.
                            </p>

                            <input
                                autoFocus
                                value={draftPhone}
                                onChange={(e) => setDraftPhone(e.target.value)}
                                placeholder="+234 8012345678"
                                className={inputClass}
                            />

                            <button
                                onClick={() => {
                                    set("phone", draftPhone)
                                    setPhoneModalOpen(false)
                                }}
                                className="w-full py-3.5 rounded-2xl bg-lime text-ink font-bold border-0 cursor-pointer border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all"
                            >
                                Save phone number
                            </button>

                        </div>

                    </div>
                </div>
            )}
        </>
    )
}