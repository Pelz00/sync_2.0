/**
 * Seed the passwordless admin accounts via the Supabase ADMIN API. This is the
 * reliable path (GoTrue creates auth.users + auth.identities correctly) - unlike
 * a direct SQL insert, which is version-fragile. Creates each user if missing
 * (email-confirmed, no password → OTP login), then sets profiles.role. The
 * service-role key bypasses RLS + the column-guard trigger. Idempotent.
 *
 * Run: npm run seed:admins   (reads .env.local)
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createClient } from '@supabase/supabase-js';

// Load .env.local into process.env without a dependency.
for (const line of readFileSync(join(process.cwd(), '.env.local'), 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
  if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2];
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVER_ROLE_KEY;
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVER_ROLE_KEY in .env.local');
  process.exit(1);
}

const ADMINS = [
  { email: 'hello@raavon.com', role: 'super_admin' },
  { email: 'muiz@raavon.com', role: 'admin' },
] as const;

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function findUser(email: string) {
  for (let page = 1; ; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw error;
    const found = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
    if (found) return found;
    if (data.users.length < 200) return null;
  }
}

async function main() {
  for (const { email, role } of ADMINS) {
    let user = await findUser(email);
    if (!user) {
      const { data, error } = await supabase.auth.admin.createUser({ email, email_confirm: true });
      if (error) {
        console.error(`✗ create ${email}: ${error.message}`);
        continue;
      }
      user = data.user;
      console.log(`✓ created ${email}`);
    } else {
      console.log(`• exists  ${email}`);
    }
    if (!user) continue;

    const { error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, role }, { onConflict: 'id' });
    if (error) console.error(`✗ role ${email}: ${error.message}`);
    else console.log(`✓ ${email} → ${role}`);
  }
  console.log('Done. Both admins sign in with an email OTP at /login.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
