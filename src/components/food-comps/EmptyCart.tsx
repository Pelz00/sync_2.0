// components/food-comps/EmptyCart.tsx
export default function EmptyCart() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-3 px-4 py-8 text-center">
            {/* Cart SVG illustration */}
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="80" height="80" rx="40" fill="#C5FF4A" fillOpacity="0.12" />
                <path d="M20 24h5l6 24h22l4-16H29" stroke="#C5FF4A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="36" cy="54" r="2.5" fill="#C5FF4A" />
                <circle cx="48" cy="54" r="2.5" fill="#C5FF4A" />
                <path d="M29 32h26" stroke="#C5FF4A" strokeWidth="2" strokeLinecap="round" />
            </svg>

            <div>
                <h3 className="font-bold text-base text-content">Your order</h3>
                <p className="text-sm text-content-muted mt-1 leading-relaxed">
                    When you add products from a store,<br />they will appear here.
                </p>
            </div>

            <div className="w-full border-t border-dashed border-content-muted/30 pt-4 mt-2">
                <p className="text-xs text-content-muted">
                    Reach <span className="font-bold text-content">₦3,000</span> to avoid an extra fee of{" "}
                    <span className="font-bold text-content">₦600</span>
                </p>
                <p className="text-xs text-content-muted mt-2 flex items-center justify-center gap-1">
                    <span className="text-accent-fg">ⓘ</span> Sync delivery fees information
                </p>
            </div>
        </div>
    )
}