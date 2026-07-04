// lib/vendor-hours.ts

// Parses time strings like "7am", "10:30pm", "2pm" into minutes since midnight
function parseTime(raw: string): number {
    const clean = raw.trim().toLowerCase()
    const isPm = clean.endsWith('pm')
    const isAm = clean.endsWith('am')
    const timePart = clean.replace('am', '').replace('pm', '').trim()
    const [hourStr, minStr] = timePart.split(':')
    let hour = parseInt(hourStr, 10)
    const min = minStr ? parseInt(minStr, 10) : 0

    if (isPm && hour !== 12) hour += 12
    if (isAm && hour === 12) hour = 0

    return hour * 60 + min
}

// Checks if a vendor is open right now given their time string e.g. "7am – 10pm"
export function isVendorOpen(timeString: string): boolean {
    try {
        const [openRaw, closeRaw] = timeString.split('–').map(s => s.trim())
        if (!openRaw || !closeRaw) return true // can't parse, assume open

        const openMin = parseTime(openRaw)
        const closeMin = parseTime(closeRaw)

        const now = new Date()
        const nowMin = now.getHours() * 60 + now.getMinutes()

        // Handle overnight hours (e.g. 8pm – 2am)
        if (closeMin < openMin) {
            return nowMin >= openMin || nowMin < closeMin
        }

        return nowMin >= openMin && nowMin < closeMin
    } catch {
        return true // fail open
    }
}