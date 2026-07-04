"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Info } from "lucide-react"

export type DeliveryType = "standard" | "scheduled"

interface Props {
    value: DeliveryType
    onChange: (value: DeliveryType) => void
}

export default function DeliveryOptions({
    value,
    onChange,
}: Props) {
    const [open, setOpen] = useState(true)

    return (
        <div className="rounded-2xl border border-line/10 bg-panel overflow-hidden">

            {/* Header */}

            <div className="flex items-center justify-between px-5 py-5">

                <div className="flex items-center gap-3">

                    <h2 className="font-bold text-2xl text-content">
                        Delivery options
                    </h2>

                    <Info
                        size={18}
                        className="text-content-muted"
                    />

                </div>

                <button
                    onClick={() => setOpen(!open)}
                    className="cursor-pointer"
                >
                    {open ? (
                        <ChevronUp size={22} />
                    ) : (
                        <ChevronDown size={22} />
                    )}
                </button>

            </div>

            {open && (

                <div className="px-5 pb-5 space-y-3">

                    {/* Standard */}

                    <button
                        onClick={() => onChange("standard")}
                        className={`w-full rounded-2xl border p-5 text-left transition cursor-pointer ${value === "standard"
                                ? "border-black dark:border-white"
                                : "border-line/10 hover:border-line/30"
                            }`}
                    >

                        <div className="flex items-center gap-4">

                            <span className="font-bold text-lg">
                                Standard
                            </span>

                            <span className="text-content-muted">
                                40–60 min
                            </span>

                        </div>

                    </button>

                    {/* Scheduled */}

                    <button
                        disabled
                        className="w-full rounded-2xl border border-line/10 p-5 text-left opacity-60 cursor-not-allowed"
                    >

                        <div className="flex items-center gap-4">

                            <span className="font-bold text-lg">
                                Schedule
                            </span>

                            <span className="text-content-muted">
                                Not available in this store
                            </span>

                        </div>

                    </button>

                </div>

            )}

        </div>
    )
}