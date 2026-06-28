"use client"

import { useState } from "react"
import { User, Mail } from "lucide-react"

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

const inputClass =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-content placeholder:text-content-muted/60 outline-none transition focus:border-lime"

export default function ContactForm({ value, onChange }: ContactFormProps) {
    function set<K extends keyof ContactFormData>(key: K, val: ContactFormData[K]) {
        onChange({ ...value, [key]: val })
    }

    return (
        <div className="space-y-6">
            {/* Purchaser details — this is the person actually buying/paying,
                always required regardless of who the tickets get sent to. */}
            <div className="rounded-2xl border border-line bg-panel p-5 sm:p-6 space-y-5">
                <div className="flex items-center gap-2">
                    <User size={16} className="text-lime-deep dark:text-lime" />
                    <h2 className="font-bold text-content">Your details</h2>
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

            {/* Where should the tickets be sent? Defaults to the purchaser's
                own email above; toggling reveals a separate recipient field. */}
            <div className="rounded-2xl border border-line bg-panel p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2">
                    <Mail size={16} className="text-lime-deep dark:text-lime" />
                    <h2 className="font-bold text-content">Send tickets to</h2>
                </div>

                <div className="flex flex-col gap-2.5">
                    <label className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 cursor-pointer">
                        <input
                            type="radio"
                            name="ticketRecipient"
                            checked={!value.sendToOther}
                            onChange={() => set("sendToOther", false)}
                            className="h-4 w-4 accent-lime cursor-pointer"
                        />
                        <span className="text-sm text-content">
                            My own email
                            {value.email && (
                                <span className="text-content-muted"> ({value.email})</span>
                            )}
                        </span>
                    </label>

                    <label className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 cursor-pointer">
                        <input
                            type="radio"
                            name="ticketRecipient"
                            checked={value.sendToOther}
                            onChange={() => set("sendToOther", true)}
                            className="h-4 w-4 accent-lime cursor-pointer"
                        />
                        <span className="text-sm text-content">Someone else&apos;s email</span>
                    </label>
                </div>

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