/**
 * ROUTE: /dev/design-system
 * ACCESS: development only - NOT linked from production nav.
 * PURPOSE: Visual QA surface for the Sync design system. Renders every
 *          design token (colours, type scale, radii, shadows) and - as
 *          they land - every component in components/ui and components/shared.
 * BUILT HERE: Token swatches + type specimens. Component sections are added
 *             in Phase 3 (primitives) and Phase 4 (composites).
 * NOTE: Excluded from `robots` and from any sitemap. Safe to ship to a
 *       preview deploy; do not link it from the public app.
 */
import type { Metadata } from 'next';
import { Heart, MapPin, Search } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Chip,
  Input,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  Spinner,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from '@/components/ui';
import { Stepper } from '@/components/ui/stepper';

export const metadata: Metadata = {
  title: 'Design System',
  robots: { index: false, follow: false },
};

const COLOR_TOKENS = [
  { name: 'cream', cls: 'bg-cream', hex: '#F4F1E8', note: '60% - primary surface' },
  { name: 'cream-deep', cls: 'bg-cream-deep', hex: '#ECE7D8', note: 'surfaces, hovers' },
  { name: 'ink', cls: 'bg-ink', hex: '#0E0E12', note: '30% - primary text' },
  { name: 'lime', cls: 'bg-lime', hex: '#C5FF4A', note: '10% - accent fills only' },
  { name: 'lime-deep', cls: 'bg-lime-deep', hex: '#4A8500', note: 'lime as text on cream' },
  { name: 'white', cls: 'bg-white', hex: '#FFFFFF', note: 'cards on cream' },
  { name: 'muted', cls: 'bg-muted', hex: '#6A6A72', note: 'meta text' },
  { name: 'coral', cls: 'bg-coral', hex: '#FF8B5C', note: 'warnings, sparingly' },
];

const TYPE_SAMPLES = [
  { name: 'hero', cls: 'text-hero font-display', sample: 'Your campus, in one app' },
  { name: 'section', cls: 'text-section font-display', sample: 'Find a place to stay' },
  { name: 'card', cls: 'text-card font-display', sample: 'Sunshine Hostel · Block B' },
  { name: 'lead', cls: 'text-lead font-body', sample: 'Verified vendors, instant booking, escrow built in.' },
  { name: 'body', cls: 'text-body font-body', sample: 'The quick brown fox jumps over the lazy dog.' },
  { name: 'eyebrow', cls: 'eyebrow', sample: 'New on Sync' },
];

const RADII = [
  { name: 'xs', cls: 'rounded-xs' },
  { name: 'sm', cls: 'rounded-sm' },
  { name: 'md', cls: 'rounded-md' },
  { name: 'lg', cls: 'rounded-lg' },
  { name: 'xl', cls: 'rounded-xl' },
  { name: '2xl', cls: 'rounded-2xl' },
  { name: 'full', cls: 'rounded-full' },
];

const SHADOWS = [
  { name: 'card', cls: 'shadow-card' },
  { name: 'pop', cls: 'shadow-pop' },
];

export default function DesignSystemPage() {
  return (
    <main className="bg-cream text-ink min-h-screen px-6 py-12 md:px-12">
      <header className="mx-auto mb-16 max-w-5xl">
        <p className="eyebrow text-accent-fg">Internal · /dev/design-system</p>
        <h1 className="text-section font-display mt-3">Sync Design System</h1>
        <p className="text-lead text-muted mt-4 max-w-2xl">
          Visual QA surface for every design token and reusable component. Not linked from
          production nav. Components will populate this page as Phases 3 and 4 land.
        </p>
      </header>

      <div className="mx-auto max-w-5xl space-y-20">
        <Section eyebrow="01 - Colour" title="Tokens">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {COLOR_TOKENS.map((t) => (
              <div key={t.name} className="shadow-card overflow-hidden rounded-lg bg-white">
                <div className={`${t.cls} h-24 w-full border-b border-black/5`} />
                <div className="p-3">
                  <p className="font-display text-card text-ink leading-tight">{t.name}</p>
                  <p className="font-mono text-muted mt-1 text-xs">{t.hex}</p>
                  <p className="text-muted mt-1 text-xs">{t.note}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="02 - Typography" title="Type scale">
          <div className="divide-y divide-black/5 rounded-lg bg-white">
            {TYPE_SAMPLES.map((t) => (
              <div key={t.name} className="flex flex-col gap-2 p-6 md:flex-row md:items-baseline md:gap-8">
                <p className="font-mono text-muted w-24 shrink-0 text-xs uppercase tracking-wider">
                  {t.name}
                </p>
                <p className={`${t.cls} text-ink min-w-0 break-words`}>{t.sample}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="03 - Radius" title="Corner radius">
          <div className="flex flex-wrap gap-6">
            {RADII.map((r) => (
              <div key={r.name} className="flex flex-col items-center gap-2">
                <div className={`${r.cls} bg-ink h-16 w-16`} />
                <p className="font-mono text-muted text-xs">{r.name}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="04 - Elevation" title="Shadows">
          <div className="flex flex-wrap gap-6">
            {SHADOWS.map((s) => (
              <div key={s.name} className="flex flex-col items-center gap-2">
                <div className={`${s.cls} h-24 w-32 rounded-lg bg-white`} />
                <p className="font-mono text-muted text-xs">{s.name}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="05 - Buttons" title="Button variants">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="dark">Dark</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" size="lg">
              Large
            </Button>
            <Button variant="outline" size="icon" aria-label="Save">
              <Heart />
            </Button>
            <Button disabled>Disabled</Button>
          </div>
        </Section>

        <Section eyebrow="06 - Form controls" title="Inputs">
          <div className="grid max-w-xl gap-4">
            <Input placeholder="Search hostels in Malete…" />
            <Textarea placeholder="Tell us about your business…" rows={4} />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose a campus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kwasu">KWASU, Malete</SelectItem>
                <SelectItem value="unilorin">UNILORIN</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-6">
              <label className="text-body flex items-center gap-2">
                <Checkbox defaultChecked /> Verified vendors only
              </label>
              <label className="text-body flex items-center gap-2">
                <Switch defaultChecked /> Notifications
              </label>
            </div>
            <RadioGroup defaultValue="m" className="flex gap-6">
              <label className="text-body flex items-center gap-2">
                <RadioGroupItem value="m" /> Male
              </label>
              <label className="text-body flex items-center gap-2">
                <RadioGroupItem value="f" /> Female
              </label>
            </RadioGroup>
          </div>
        </Section>

        <Section eyebrow="07 - Tags" title="Badges & chips">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent">Verified</Badge>
            <Badge variant="neutral">New</Badge>
            <Badge variant="outline">Booked</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="muted">Closed</Badge>
            <div className="flex flex-wrap gap-2">
              <Chip selected>All</Chip>
              <Chip>Self-contain</Chip>
              <Chip>Sharing</Chip>
              <Chip>Female only</Chip>
            </div>
          </div>
        </Section>

        <Section eyebrow="08 - Surface" title="Card">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sunshine Hostel</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> Malete, off-campus
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted text-sm">Self-contain, 24/7 power, verified landlord.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Loading state</CardTitle>
                <CardDescription>Skeleton example</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section eyebrow="09 - Navigation" title="Tabs & stepper">
          <Tabs defaultValue="listings" className="max-w-xl">
            <TabsList>
              <TabsTrigger value="listings">Listings</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="inbox">Inbox</TabsTrigger>
            </TabsList>
            <TabsContent value="listings" className="text-muted text-sm">
              4 active listings, 2 drafts.
            </TabsContent>
            <TabsContent value="orders" className="text-muted text-sm">
              3 orders pending payout.
            </TabsContent>
            <TabsContent value="inbox" className="text-muted text-sm">
              12 unread messages.
            </TabsContent>
          </Tabs>
          <div className="mt-8 max-w-xl">
            <Stepper
              current={1}
              steps={[
                { id: 'profile', label: 'Profile' },
                { id: 'business', label: 'Business' },
                { id: 'docs', label: 'Documents' },
                { id: 'review', label: 'Review' },
              ]}
            />
          </div>
        </Section>

        <Section eyebrow="10 - Feedback" title="Spinner & inline">
          <div className="text-muted flex items-center gap-3 text-sm">
            <Spinner /> <span>Loading vendor matches…</span>
            <Search className="h-4 w-4" />
          </div>
        </Section>

        <Section eyebrow="11 - Composites" title="Coming in Phase 4">
          <p className="text-body text-muted">
            ListingCard, VerifiedBadge, FilterPanel, EmptyState, ServicesDock, OrderStageTracker -
            all land in Phase 4.
          </p>
        </Section>
      </div>
    </main>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="eyebrow text-accent-fg">{eyebrow}</p>
      <h2 className="text-section font-display mt-2 mb-8">{title}</h2>
      {children}
    </section>
  );
}
