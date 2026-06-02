/**
 * Layout for the (auth) route group: login, signup, verify.
 *
 * Passthrough: each page wraps its form in <AuthLayout eyebrow title> itself so
 * the brand panel's heading is dynamic per route.
 */
export default function AuthRouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
