/**
 * ActivityTicker - thin auto-scrolling marquee of recent platform activity.
 * Embodies the "around you, right now" promise and adds FOMO under the hero.
 *
 * Pure CSS marquee (keyframe `marquee` in globals.css). The list is rendered
 * twice back-to-back so the loop is seamless. Pauses on hover.
 *
 * DATA: mock for now. Wire to a realtime Supabase channel of recent bookings
 * / orders / ticket sales once those modules ship.
 */
import { CalendarCheck, Home, ShoppingBag, Ticket } from 'lucide-react';

const ACTIVITY = [
  { icon: Home, text: 'Aisha booked Tanke Crescent Lodge', age: '2m ago' },
  { icon: Ticket, text: "David grabbed tickets to Fresher's Night", age: '5m ago' },
  { icon: ShoppingBag, text: 'Bisi ordered jollof from Mama Put Tanke', age: '8m ago' },
  { icon: Home, text: 'Tunde booked Safari Self-Contain', age: '12m ago' },
  { icon: CalendarCheck, text: 'Zainab scheduled a laundry pickup', age: '15m ago' },
  { icon: Home, text: 'Chidi saved Oke-Odo Female Hall', age: '21m ago' },
];

export function ActivityTicker() {
  return (
    <div className="border-line/5 bg-ink text-cream group/ticker overflow-hidden border-y">
      <div className="flex w-max animate-[marquee_38s_linear_infinite] group-hover/ticker:[animation-play-state:paused]">
        {/* Rendered twice for a seamless loop. */}
        {[0, 1].map((dup) => (
          <ul key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center">
            {ACTIVITY.map(({ icon: Icon, text, age }, i) => (
              <li key={`${dup}-${i}`} className="flex items-center gap-2 px-6 py-2.5 text-sm">
                <Icon className="text-lime h-3.5 w-3.5 shrink-0" />
                <span className="whitespace-nowrap">{text}</span>
                <span className="text-cream/40 font-mono text-[11px] whitespace-nowrap">· {age}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
