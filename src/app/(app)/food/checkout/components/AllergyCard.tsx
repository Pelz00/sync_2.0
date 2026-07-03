"use client"

import { useState } from "react"
import { ShieldAlert, ChevronDown, ChevronUp } from "lucide-react"

interface AllergyCardProps {
    value: string
    onChange: (value: string) => void
}

export default function AllergyCard({
    value,
    onChange,
}: AllergyCardProps) {
    const [expanded, setExpanded] = useState(false)

    return (
        <div className="rounded-xl border border-line/10 bg-panel shadow-card overflow-hidden">

            {/* Header */}
            <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
            >
                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                        <ShieldAlert
                            size={20}
                            className="text-red-500"
                        />
                    </div>

                    <div>
                        <h2 className="font-bold text-content">
                            Allergies or dietary notes
                        </h2>

                        <p className="text-sm text-content-muted">
                            Tell the restaurant about allergies or special requests.
                        </p>
                    </div>

                </div>

                {expanded ? (
                    <ChevronUp size={20} />
                ) : (
                    <ChevronDown size={20} />
                )}
            </button>

            {expanded && (
                <div className="border-t border-line/10 p-5">

                    <textarea
                        rows={4}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Example: No onions, peanut allergy, less pepper..."
                        className="
                            w-full
                            rounded-xl
                            border
                            border-line/10
                            bg-surface
                            px-4
                            py-3
                            text-sm
                            text-content
                            placeholder:text-content-muted/60
                            outline-none
                            resize-none
                            transition
                            focus:border-lime
                        "
                    />

                    <p className="mt-3 text-xs text-content-muted">
                        We'll send these notes to the restaurant, but we can't guarantee every request can be accommodated.
                    </p>

                </div>
            )}

        </div>
    )
}