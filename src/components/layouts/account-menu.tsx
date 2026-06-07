/**
 * AccountMenu - the profile-avatar dropdown shown in the dashboard header.
 * Opens to Profile (where available) + Settings + Log out. Logging out goes
 * through a confirmation modal first.
 */
'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, Settings, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { toast } from '@/components/ui/toast';
import { signOut } from '@/modules/auth/actions';

interface AccountMenuProps {
  name: string;
  email: string;
  initial: string;
  avatarUrl?: string;
  /** Omit for roles without a profile page (e.g. vendor/admin). */
  profileHref?: string;
  settingsHref: string;
}

export function AccountMenu({
  name,
  email,
  initial,
  avatarUrl,
  profileHref,
  settingsHref,
}: AccountMenuProps) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pending, start] = useTransition();

  function logOut() {
    start(async () => {
      const res = await signOut();
      if (!res.ok) {
        toast(res.error);
        return;
      }
      setConfirmOpen(false);
      router.push('/');
      router.refresh();
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="Account menu"
            className="focus-visible:ring-foreground/30 rounded-full focus:outline-none focus-visible:ring-2"
          >
            <Avatar className="border-line size-9 border">
              {avatarUrl && <AvatarImage src={avatarUrl} alt="" />}
              <AvatarFallback>{initial}</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <p className="text-content truncate text-sm font-medium">{name}</p>
            <p className="text-content-muted truncate text-xs">{email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {profileHref && (
            <DropdownMenuItem asChild>
              <Link href={profileHref}>
                <User className="h-4 w-4" /> Profile
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link href={settingsHref}>
              <Settings className="h-4 w-4" /> Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-coral"
            onSelect={(e) => {
              e.preventDefault();
              setConfirmOpen(true);
            }}
          >
            <LogOut className="h-4 w-4" /> Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Log out?"
        description="You'll need to sign in again to get back into your dashboard."
        confirmLabel="Log out"
        destructive
        loading={pending}
        onConfirm={logOut}
      />
    </>
  );
}
