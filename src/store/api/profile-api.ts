/**
 * Profile endpoints (RTK Query). Reads/writes the signed-in user's profile
 * through the `/api/profile` route handler - never Supabase directly.
 *
 * The mutation only carries client-editable fields; the route handler is the
 * authority on what's actually allowed to change (server-trusted columns like
 * role / verification_status are rejected there).
 */
import { baseApi } from './base-api';
import type { Profile } from '@/modules/auth/queries';

/** Fields a user may edit about themselves. */
export interface ProfileUpdate {
  full_name?: string;
  phone?: string;
}

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<Profile | null, void>({
      query: () => '/profile',
      providesTags: ['Profile'],
    }),
    updateProfile: build.mutation<Profile, ProfileUpdate>({
      query: (body) => ({ url: '/profile', method: 'PATCH', body }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
