"use client"

import { useState } from "react"
import { User, Mail, Check } from "lucide-react"

export interface ContactFormData {
    firstName: string
    lastName: string
    email: string
    confirmEmail: string
    phone: string
    sendToOther: boolean
    recipientEmail: string
}

interface ContactFormProps {
    value: ContactFormData
    onChange: (next: ContactFormData) => void
}

function Field({
    label,
    required,
    children,
}: {
    label: string
    required?: boolean
    children: React.ReactNode
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-content mb-1.5">
                {required && <span className="text-red-500 mr-0.5">*</span>}
                {label}
            </label>
            {children}
        </div>
    )
}

// Matches OrderSummary's borders exactly: plain `border` (default 1px) +
// border-line/10, nothing fancier. The previous thick look was very likely
// the `hover:border-line/30` class on the card wrapper firing while the
// cursor sat over the card during the screenshot (3x more opaque than /10,
// and a hover state — not the resting style). That class is removed below
// for the same reason OrderSummary never had it either.
const inputClass =
    "w-full rounded-xl border border-line/10 bg-surface px-4 py-3 text-sm text-content placeholder:text-content-muted/60 outline-none transition focus:border-lime"

export default function ContactForm({ value, onChange }: ContactFormProps) {
    function set<K extends keyof ContactFormData>(key: K, val: ContactFormData[K]) {
        onChange({ ...value, [key]: val })
    }

    return (
        <div className="space-y-6">
            {/* Purchaser details — same shell as OrderSummary: rounded-xl,
                plain border + border-line/10, bg-panel, shadow-card. No
                hover brightening, so it stays calm at rest like the
                summary card does. */}
            <div className="rounded-xl border border-line/10 bg-panel shadow-card p-5 sm:p-6 space-y-5">
                <div className="flex items-center gap-2">
                    <User size={16} className="text-accent-fg" />
                    <h2 className="text-xl text-content font-display">Your details</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="First name" required>
                        <input
                            type="text"
                            value={value.firstName}
                            onChange={e => set("firstName", e.target.value)}
                            placeholder="First name"
                            className={inputClass}
                        />
                    </Field>
                    <Field label="Last name" required>
                        <input
                            type="text"
                            value={value.lastName}
                            onChange={e => set("lastName", e.target.value)}
                            placeholder="Last name"
                            className={inputClass}
                        />
                    </Field>
                </div>

                <Field label="Email address" required>
                    <input
                        type="email"
                        value={value.email}
                        onChange={e => set("email", e.target.value)}
                        placeholder="Email address"
                        className={inputClass}
                    />
                </Field>

                <Field label="Confirm email address" required>
                    <input
                        type="email"
                        value={value.confirmEmail}
                        onChange={e => set("confirmEmail", e.target.value)}
                        placeholder="Confirm email address"
                        className={inputClass}
                    />
                </Field>

                <Field label="Phone number" required>
                    <input
                        type="tel"
                        value={value.phone}
                        onChange={e => set("phone", e.target.value)}
                        placeholder="Phone number"
                        className={inputClass}
                    />
                </Field>
            </div>

            {/* Where should the tickets be sent? — same calm shell, pill
                buttons for the choice itself. */}
            <div className="rounded-xl border border-line/10 bg-panel shadow-card p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2">
                    <Mail size={16} className="text-accent-fg" />
                    <h2 className="text-xl text-content font-display">Send tickets to</h2>
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => set("sendToOther", false)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${!value.sendToOther
                            ? "bg-lime text-ink"
                            : "border border-line/10 text-content hover:bg-content-muted/5"
                            }`}
                    >
                        {!value.sendToOther && <Check size={14} />}
                        My own email
                    </button>

                    <button
                        type="button"
                        onClick={() => set("sendToOther", true)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${value.sendToOther
                            ? "bg-lime text-ink"
                            : "border border-line/10 text-content hover:bg-content-muted/5"
                            }`}
                    >
                        {value.sendToOther && <Check size={14} />}
                        Someone else&apos;s email
                    </button>
                </div>

                {!value.sendToOther && value.email && (
                    <p className="text-xs text-content-muted">
                        Tickets will be sent to <span className="text-content font-medium">{value.email}</span>
                    </p>
                )}

                {value.sendToOther && (
                    <Field label="Recipient's email address" required>
                        <input
                            type="email"
                            value={value.recipientEmail}
                            onChange={e => set("recipientEmail", e.target.value)}
                            placeholder="Recipient's email address"
                            className={inputClass}
                        />
                    </Field>
                )}
            </div>
        </div>
    )
}