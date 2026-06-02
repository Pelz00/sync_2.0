# Sync

**Your campus, in one place.**

Sync is the verified marketplace for Nigerian student life — hostels, food, events,
beauty, trades, laundry, and the hotspots around campus, all in one app. It's built
by **Raavon Limited** and launching first at **KWASU, Malete**.

## What Sync is trying to achieve

Student life around a Nigerian campus is run on scattered WhatsApp groups, word of
mouth, and cash hand-offs. That makes three things hard:

- **Trust** — Is this hostel real? Is this vendor legit? Will the room match the photos?
- **Discovery** — Everything (rooms, food, events, artisans, laundry) lives in a
  different place, with no single, local view of what's *around you*.
- **Safe payments** — Paying upfront for a room or service you haven't received is risky.

Sync exists to fix that by being a **single, verified hub** for everything a student
needs near campus:

- **Verification first** — vendors and landlords are identity- and visit-verified before
  they can transact; listings carry a trust signal instead of a promise.
- **One home for "around you"** — a localised feed of rooms, food, events, services, and
  hotspots near the student's hostel, personalised once they sign in.
- **Escrow-backed payments** — money is held until the student confirms delivery, with
  an admin dispute path, so neither side has to trust the other blindly.

The goal: make finding, booking, and paying for campus life as simple and safe as one
trusted app — starting at one university and expanding market by market.

## How it's structured (hub-and-spoke)

`/around` is the home of the app — a mosaic feed of what's nearby. From there, students
move into focused **modules**:

| Area | Modules |
| --- | --- |
| **Student categories** | Hostels · Food · Events · Beauty · Trades (workmanship) · Laundry · Hotspots |
| **Student account** | Search, wallet, checkout, bookings, saved, messages, reviews, notifications, profile (`/me/*`) |
| **Vendors** | Onboarding/verification wizard, dashboard, listings, orders, inbox, earnings, promotions, plan, documents — plus a landlord dashboard |
| **Admin** | Verification approvals, in-person visit log, user moderation, analytics, editorial curation, escrow dispute resolution |

The complete list of routes and their access levels lives in **[ROUTE_MAP.md](ROUTE_MAP.md)**.

## Tech stack

- **Framework:** Next.js 16 (App Router, RSC) + React 19
- **Styling:** Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- **Auth & data:** Supabase (`@supabase/ssr`) — auth + Postgres with Row-Level Security
  as the real authorization layer
- **Client state / data:** Redux Toolkit (cart, wizard, UI) + TanStack Query (realtime/
  messaging/live data)
- **Forms & validation:** react-hook-form + Zod (shared schemas in `src/lib/validations`)
- **Payments:** Paystack (escrow-style hold/release)
- **Maps:** Leaflet (the `/around` map) · **Charts:** Recharts (dashboards)
- **Rate limiting:** Upstash Redis

## Architecture notes

- **Route groups** under `src/app/` mirror the audiences: `(marketing)`, `(auth)`,
  `(app)` (student), `(vendor)`, `(admin)`.
- **Domain logic** lives in `src/modules/<domain>/` (e.g. `auth`, `hostels`, `payments`)
  with `actions.ts` (server actions), `queries.ts` (RSC reads), and `types.ts`.
- **Auth gate:** `src/proxy.ts` (Next 16's renamed middleware — exports `proxy()`)
  refreshes the Supabase session and redirects unauthenticated users away from protected
  route groups, bouncing wrong-role users to `/403`. Real authorization is enforced by
  Supabase RLS on the data layer; the proxy is UX + defence-in-depth.
- **Validation contract:** every server action re-validates its input with a Zod schema
  from `src/lib/validations` and returns a typed result rather than throwing.

> **Status:** active development. Several screens still render mock data from `src/mock/`
> while the data layer is wired up.

## Getting started

### 1. Prerequisites

- Node.js 20+ and npm
- A Supabase project (for auth/data) — optional to boot the UI, required for sign-in

### 2. Environment

Copy the example env file and fill in your keys:

```bash
cp .env.example .env.local
```

At minimum, `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` are
needed for auth. Without them the app still runs, but every visitor is treated as
logged-out and protected routes redirect to `/login`. See `.env.example` for the full
list (Paystack, identity verification, Upstash).

### 3. Install & run

> **Note:** if your shell exports `NODE_ENV=production`, run installs with it overridden
> or dev dependencies (ESLint, Tailwind, etc.) are silently skipped:

```bash
NODE_ENV=development npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server (`NODE_ENV=development`) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier write · `format:check` to verify |

CI (`.github/workflows/ci.yml`) runs `npm ci → lint → build` on every push.

## Conventions

This repo pins **Next.js 16**, which has breaking changes from earlier versions — see
[AGENTS.md](AGENTS.md). When in doubt, check the bundled docs in
`node_modules/next/dist/docs/` before reaching for older patterns.
