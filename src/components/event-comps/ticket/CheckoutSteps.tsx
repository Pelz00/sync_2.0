import { Check } from "lucide-react"

export type CheckoutStep = "tickets" | "contact" | "payment"

const STEPS: { key: CheckoutStep; label: string }[] = [
    { key: "tickets", label: "Tickets" },
    { key: "contact", label: "Contact" },
    { key: "payment", label: "Payment" },
]

interface CheckoutStepsProps {
    current: CheckoutStep
}

export default function CheckoutSteps({ current }: CheckoutStepsProps) {
    const currentIndex = STEPS.findIndex(s => s.key === current)

    return (
        <div className="flex items-center w-full max-w-xl mx-auto">
            {STEPS.map((step, i) => {
                const isDone = i < currentIndex
                const isCurrent = i === currentIndex
                const isLast = i === STEPS.length - 1

                return (
                    <div key={step.key} className={`flex items-center ${isLast ? "" : "flex-1"}`}>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <span
                                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold flex-shrink-0 ${isDone
                                    ? "bg-content text-surface"
                                    : isCurrent
                                        ? "bg-content text-surface"
                                        : "border-2 border-line text-transparent"
                                    }`}
                            >
                                {isDone ? <Check size={15} strokeWidth={5} color="#4A8500" /> : null}
                            </span>
                            <span
                                className={`text-sm sm:text-base font-bold whitespace-nowrap ${isDone || isCurrent ? "text-content" : "text-content-muted"
                                    }`}
                            >
                                {step.label}
                            </span>
                        </div>

                        {!isLast && (
                            <div className="flex-1 h-px bg-line mx-3 sm:mx-4" />
                        )}
                    </div>
                )
            })}
        </div>
    )
}