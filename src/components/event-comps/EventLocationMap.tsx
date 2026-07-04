"use client"

import { useState } from "react"
import { MapPin, ExternalLink, AlertCircle } from "lucide-react"

interface EventLocationMapProps {
    location: string
    address?: string
}

export default function EventLocationMap({ location, address }: EventLocationMapProps) {
    const [loaded, setLoaded] = useState(false)

    const queryText = (address ?? location).trim()
    const plusEncoded = encodeURIComponent(queryText).replace(/%20/g, "+")
    const embedSrc = `https://www.google.com/maps?q=${plusEncoded}&z=15&output=embed`
    const externalHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(queryText)}`

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <h2 className="font-bold text-base text-content">Location</h2>
                <a
                    href={externalHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-medium text-lime dark:text-lime-deep hover:underline"
                >
                    Open in Maps <ExternalLink size={12} />
                </a>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-line/10 bg-panel p-3">
                <div className="w-9 h-9 rounded-full border border-line/15 bg-surface flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-lime-deep dark:text-lime" />
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-medium text-content truncate">{location}</p>
                    {address && <p className="text-xs text-content-muted truncate">{address}</p>}
                </div>
            </div>

            <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-line/10 bg-surface-deep">
                <iframe
                    key={embedSrc}
                    src={embedSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map showing ${location}`}
                    className="absolute inset-0"
                    onLoad={() => setLoaded(true)}
                />

                {!loaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center pointer-events-none bg-surface-deep">
                        <AlertCircle size={18} className="text-content-muted" />
                        <p className="text-xs text-content-muted">
                            Map preview loading — if it doesn&apos;t appear, use{" "}
                            <span className="font-medium text-content">Open in Maps</span> above.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}