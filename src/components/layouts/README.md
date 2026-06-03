# components/layouts

Page-shell components used by route-group `layout.tsx` files.

- `MarketingHeader` / `MarketingFooter` - public marketing pages.
- `AppShell` - authenticated student shell with persistent ModuleNav.
- `MobileBottomNav` - Home / Browse / Saved / Inbox / Me.
- `DashboardShell` - per-role dashboard sidebar shell (vendor / landlord / admin)
  with the desktop rail + mobile drawer. `DashboardSidebar` is the shared panel;
  nav config lives in `config/dashboard-nav`, the profile block in
  `dashboard-profile`. Students reuse `DashboardSidebar` nested in `AppShell`.
- `AuthLayout` - login/signup/verify.
