/**
 * MapPlaceholder - neutral placeholder for hostel/event/hotspot maps until
 * the real map integration lands. Keeps layouts honest without pulling a
 * heavy map SDK on every page during the scaffolding phase.
 *
 * TODO: replace with a real map (Mapbox GL or Leaflet) once we ship Phase 1
 * of the hostel module. Keep the bounding container so callers don't shift.
 */
import { Map as MapIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapPlaceholderProps {
  /** Aspect ratio classname, e.g. "aspect-video" or "aspect-square". */
  aspect?: string;
  /** Tiny meta label rendered inside the placeholder. */
  label?: string;
  className?: string;
}

export function MapPlaceholder({
  aspect = 'aspect-[16/9]',
  label = 'Map will load here',
  className,
}: MapPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        'bg-surface-deep text-content-muted flex w-full flex-col items-center justify-center gap-2 rounded-xl',
        aspect,
        className,
      )}
    >
      <MapIcon className="h-6 w-6" aria-hidden="true" />
      <p className="text-xs">{label}</p>
    </div>
  );
}
