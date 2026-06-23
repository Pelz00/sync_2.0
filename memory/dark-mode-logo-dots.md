---
name: dark-mode-logo-dots
description: Sync logo two-dot mark colors in dark mode (one white, one lime)
metadata:
  type: feedback
---

The Sync logo's two-dot mark should render as **one white (cream) dot + one lime dot on dark backgrounds** (dark mode, and always-dark bands like the marketing footer). Do not use the theme `foreground`/`accent-fg` tokens on always-dark surfaces — `foreground` resolves to ink there and the dot disappears.

**Why:** On the always-dark `bg-ink` footer (and in dark mode generally) a theme-aware ink dot is invisible against the dark surface.

**How to apply:** Use fixed `bg-cream` (white-ish) for the larger dot and `bg-lime` for the smaller dot on dark surfaces. The header logo at `src/components/layouts/marketing-header.tsx` uses theme tokens (`bg-foreground`/`bg-accent-fg`) which already resolve to cream+lime in dark mode; the footer mark uses fixed cream+lime. Related: [[admin-role-seeding-gotcha]] is unrelated — see marketing layout components.
