/**
 * UserMenu - the signed-in avatar + dropdown. Replaces the "Sign in / Sign up"
 * buttons once a user is authenticated. Profile → /me, a role-aware dashboard
 * link, and Sign out (which clears the session and refreshes so the server
 * components re-render in the signed-out state).
 *
 * Receives a plain user summary from a server component (no client auth store
 * needed - the proxy keeps the session fresh and router.refresh() re-reads it).
 */
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, LogOut, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/toast';
import { signOut } from '@/modules/auth/actions';

export interface UserMenuProps {
  name: string;
  email: string;
  initial: string;
  role?: string;
}

export function UserMenu({ name, email, initial, role }: UserMenuProps) {
  const router = useRouter();
  // Vendors get a dashboard link; students live in /me.
  const dashboardHref = role === 'vendor' ? '/vendor' : null;

  async function handleSignOut() {
    const res = await signOut();
    if (!res.ok) {
      toast(res.error);
      return;
    }
    router.push('/');
    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Account menu"
          className="focus-visible:ring-foreground/30 rounded-full focus:outline-none focus-visible:ring-2"
        >
          <Avatar className="h-9 w-9">
            <AvatarFallback>{initial}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>
          <p className="text-content truncate text-sm font-medium">{name}</p>
          <p className="text-content-muted truncate text-xs">{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/me">
            <User className="h-4 w-4" /> Profile
          </Link>
        </DropdownMenuItem>

        {dashboardHref && (
          <DropdownMenuItem asChild>
            <Link href={dashboardHref}>
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-coral"
          onSelect={(e) => {
            e.preventDefault();
            handleSignOut();
          }}
        >
          <LogOut className="h-4 w-4" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
