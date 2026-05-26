/**
 * Layout for the (auth) route group: login, signup, verify.
 * Wraps in the split-pane AuthLayout shell.
 */
import { AuthLayout } from '@/components/layouts/auth-layout';

export default function AuthRouteLayout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
