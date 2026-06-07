/**
 * RTK Query base API. ALL client-side reads/writes go through here, and every
 * request hits our own Next route handlers under `/api` - never Supabase
 * directly. Those route handlers run server-side with the session-bound
 * Supabase client, so:
 *   - RLS still applies (defense in depth),
 *   - writes are field-whitelisted server-side (clients can't touch
 *     server-trusted columns like role / verification_status),
 *   - the schema + service-role key never reach the browser.
 *
 * Feature endpoints are added with `baseApi.injectEndpoints` (see profile-api),
 * so each feature owns its slice without editing this file.
 */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  // Cache tags for invalidation across queries/mutations.
  tagTypes: ['Profile'],
  endpoints: () => ({}),
});
