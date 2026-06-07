/**
 * ProfileForm - edits the signed-in user's profile via RTK Query. Demonstrates
 * the secure client data path: useGetProfileQuery / useUpdateProfileMutation
 * both go through the /api/profile route handler, never Supabase directly.
 *
 * Only client-editable fields are exposed (name, phone). Read-only,
 * server-trusted fields (role, verification status) are shown but not editable.
 *
 * Split in two: the outer component owns the query (loading/error), the inner
 * <Fields> mounts only once data exists - so its form state initialises
 * straight from props, with no setState-in-effect.
 */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/toast';
import { useGetProfileQuery, useUpdateProfileMutation } from '@/store/api/profile-api';
import type { Profile } from '@/modules/auth/queries';

export function ProfileForm() {
  const { data: profile, isLoading, isError, refetch } = useGetProfileQuery();

  if (isLoading) {
    return (
      <div className="flex max-w-md flex-col gap-4">
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-32" />
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="border-line/10 flex flex-col items-start gap-3 rounded-2xl border border-dashed p-5">
        <p className="text-content-muted text-sm">
          Couldn&rsquo;t load your profile. You may be signed out.
        </p>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  // key={profile.id} remounts (and re-seeds) if the signed-in user changes.
  return <Fields key={profile.id} profile={profile} />;
}

function Fields({ profile }: { profile: Profile }) {
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [fullName, setFullName] = useState(profile.full_name ?? '');
  const [phone, setPhone] = useState(profile.phone ?? '');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await updateProfile({ full_name: fullName.trim(), phone: phone.trim() }).unwrap();
      toast('Profile saved.');
    } catch (err) {
      const message =
        typeof err === 'object' && err && 'data' in err
          ? ((err.data as { error?: string })?.error ?? 'Could not save profile.')
          : 'Could not save profile.';
      toast(message);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-md flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="full_name" className="text-content text-sm font-medium">
          Full name
        </label>
        <Input
          id="full_name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your name"
          autoComplete="name"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-content text-sm font-medium">
          Phone
        </label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="080…"
          autoComplete="tel"
        />
      </div>

      {/* Server-trusted, read-only - shown for context, never editable here. */}
      <div className="border-line/10 flex flex-wrap gap-x-6 gap-y-1 border-t pt-4">
        <div>
          <p className="eyebrow text-content-muted">Role</p>
          <p className="text-content text-sm capitalize">{profile.role.replace('_', ' ')}</p>
        </div>
        <div>
          <p className="eyebrow text-content-muted">Verification</p>
          <p className="text-content text-sm capitalize">{profile.verification_status}</p>
        </div>
      </div>

      <Button type="submit" disabled={isSaving} className="self-start">
        {isSaving ? 'Saving…' : 'Save changes'}
      </Button>
    </form>
  );
}
