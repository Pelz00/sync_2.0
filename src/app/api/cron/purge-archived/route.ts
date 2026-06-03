/**
 * Scheduled purge of long-archived accounts (>60 days).
 *
 * Accounts are archived (soft-deleted) on "delete account". After 60 days they
 * are permanently purged from Supabase. This route does that purge and is meant
 * to be hit on a daily schedule (Vercel Cron / external cron), authenticated
 * with CRON_SECRET.
 *
 * Vercel Cron example (vercel.json):
 *   { "crons": [{ "path": "/api/cron/purge-archived", "schedule": "0 3 * * *" }] }
 * Vercel sends `Authorization: Bearer <CRON_SECRET>` automatically.
 */
import { createAdminClient } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

const PURGE_AFTER_DAYS = 60;

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const admin = createAdminClient();
  const cutoff = new Date(Date.now() - PURGE_AFTER_DAYS * 86_400_000).toISOString();

  const { data: stale, error } = await admin
    .from('profiles')
    .select('id')
    .not('archived_at', 'is', null)
    .lt('archived_at', cutoff);
  if (error) return Response.json({ error: error.message }, { status: 500 });

  let purged = 0;
  for (const row of stale ?? []) {
    const { error: delErr } = await admin.auth.admin.deleteUser(row.id as string);
    if (!delErr) purged++;
  }

  return Response.json({ purged, checked: stale?.length ?? 0 });
}
