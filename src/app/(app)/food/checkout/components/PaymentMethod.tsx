"use client"

import {
    CreditCard,
    Wallet,
    Banknote,
    CheckCircle2,
} from "lucide-react"

export type PaymentType =
    | "cash"
    | "card"
    | "wallet"

interface PaymentMethodProps {
    value: PaymentType
    onChange: (value: PaymentType) => void
}

const methods = [
    {
        id: "cash",
        title: "Cash on delivery",
        subtitle: "Pay the rider when your order arrives.",
        icon: Banknote,
    },
    {
        id: "card",
        title: "Debit / Credit card",
        subtitle: "Visa, Mastercard and Verve",
        icon: CreditCard,
    },
    {
        id: "wallet",
        title: "Sync Wallet",
        subtitle: "Pay with your Sync balance",
        icon: Wallet,
    },
] as const

export default function PaymentMethod({
    value,
    onChange,
}: PaymentMethodProps) {
    return (
        <div className="rounded-xl border border-line/10 bg-panel shadow-card overflow-hidden">

            <div className="p-5 border-b border-line/10">

                <h2 className="font-bold text-content text-lg">
                    Payment method
                </h2>

                <p className="text-sm text-content-muted mt-1">
                    Choose how you'd like to pay.
                </p>

            </div>

            <div className="p-5 space-y-3">

                {methods.map((method) => {

                    const Icon = method.icon
                    const active = value === method.id

                    return (
                        <button
                            key={method.id}
                            type="button"
                            onClick={() => onChange(method.id)}
                            className={`
                                w-full
                                rounded-xl
                                border
                                p-4
                                text-left
                                transition-all
                                cursor-pointer
                                flex
                                items-center
                                justify-between

                                ${
                                    active
                                        ? "border-lime bg-lime/10"
                                        : "border-line/10 hover:border-lime/40"
                                }
                            `}
                        >

                            <div className="flex items-center gap-4">

                                <div
                                    className={`
                                        w-11
                                        h-11
                                        rounded-full
                                        flex
                                        items-center
                                        justify-center

                                        ${
                                            active
                                                ? "bg-lime text-ink"
                                                : "bg-surface text-content"
                                        }
                                    `}
                                >
                                    <Icon size={20} />
                                </div>

                                <div>

                                    <h3 className="font-semibold text-content">
                                        {method.title}
                                    </h3>

                                    <p className="text-sm text-content-muted">
                                        {method.subtitle}
                                    </p>

                                </div>

                            </div>

                            {active && (
                                <CheckCircle2
                                    size={22}
                                    className="text-lime"
                                />
                            )}

                        </button>
                    )
                })}

            </div>

        </div>
    )
}