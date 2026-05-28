# Sync - Route Map

Every route the app ships. Access levels are enforced by `middleware.ts` (auth + role)
and ultimately by Supabase RLS on the data layer.

> **Access legend:** `public` · `auth` (any signed-in user) · `student` · `vendor` ·
> `landlord` (vendor with `category=landlord`) · `admin`.

## Marketing - `(marketing)`

| Path | Access | Description |
| --- | --- | --- |
| `/` | public | Landing page: hero, modules grid, verification explainer, vendor CTA. |
| `/about` | public | Brand + mission story. |
| `/how-it-works` | public | Find → book → pay explainer. |
| `/for-vendors` | public | Vendor recruitment + plan pricing. |
| `/around` | public | "Around you" - the new home of the full Sync app. Mosaic feed of events/food/laundry/hotspots near the student's hostel. Personalises once signed in. |

## Auth - `(auth)`

| Path | Access | Description |
| --- | --- | --- |
| `/login` | public | Email + password (and magic link) sign-in. |
| `/signup` | public | Account creation with role selector (student / vendor). |
| `/verify` | public during signup | OTP verification (rate-limited). |

## Student app - `(app)`

| Path | Access | Description |
| --- | --- | --- |
| `/hostels` | student | Hostel browse + filters. |
| `/hostels/[slug]` | student | Hostel detail + booking flow (escrow). |
| `/events` | student | Events listing. |
| `/events/[slug]` | student | Event detail + ticket purchase. |
| `/food` | student | Food vendor directory. |
| `/food/[vendorSlug]` | student | Vendor menu + cart. |
| `/beauty` | student | Beauty pros directory. |
| `/beauty/[slug]` | student | Beauty pro detail + booking. |
| `/workmanship` | student | Trades directory. |
| `/workmanship/request` | student | Post a trades request (multi-step). |
| `/laundry` | student | Laundry vendor list + pickup scheduler. |
| `/hotspots` | student | Editorial hot-spots directory. |
| `/hotspots/[slug]` | student | Single hot-spot. |
| `/search` | student | Global search across modules (`?q=`). |
| `/checkout` | student | Cart checkout + Paystack inline. |
| `/wallet` | student | Student wallet + transactions. |
| `/me` | student | Student dashboard hub. |
| `/me/saved` | student | Saved listings. |
| `/me/bookings` | student | Bookings (active + past). |
| `/me/messages` | student | Student↔vendor conversations. |
| `/me/reviews` | student | Reviews to leave + already left. |
| `/me/notifications` | student | Notification inbox + preferences. |
| `/me/profile` | student | Profile editing. |

## Vendor - `(vendor)`

| Path | Access | Description |
| --- | --- | --- |
| `/onboarding` | vendor (new) | 5-step verification wizard. |
| `/vendor` | vendor | Vendor dashboard overview. |
| `/vendor/listings` | vendor | Manage listings. |
| `/vendor/orders` | vendor | Orders queue. |
| `/vendor/inbox` | vendor | Vendor side of messaging. |
| `/vendor/earnings` | vendor | Payouts + escrow + statements. |
| `/vendor/promotions` | vendor | Boost a listing. |
| `/vendor/plan` | vendor | Subscription tier. |
| `/vendor/documents` | vendor | Business documents. |
| `/landlord` | landlord | Landlord dashboard overview. |

## Admin - `(admin)`

| Path | Access | Description |
| --- | --- | --- |
| `/admin` | admin | Admin overview KPIs + queues. |
| `/admin/vendors` | admin | Vendor directory + verification approval. |
| `/admin/verify-visits` | admin | In-person verification visit calendar + log. |
| `/admin/users` | admin | Student moderation. |
| `/admin/analytics` | admin | Business analytics. |
| `/admin/editorial` | admin | Editorial curation (hotspots, banners). |
| `/admin/disputes` | admin | Escrow dispute resolution. |

## API

| Path | Method | Description |
| --- | --- | --- |
| `/api/webhooks/paystack` | POST | Paystack webhooks - HMAC-SHA512 signature required. |
| `/api/webhooks/verification` | POST | ID verification provider webhooks. |

## Development-only

| Path | Access | Description |
| --- | --- | --- |
| `/dev/design-system` | public, `noindex` | Design tokens + component visual QA. Not linked from production nav. |
