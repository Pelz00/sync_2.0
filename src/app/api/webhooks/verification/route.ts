/**
 * ROUTE: POST /api/webhooks/verification
 * ACCESS: public (provider-only); rejected unless provider signature matches.
 * PURPOSE: Receive identity verification results from the chosen provider
 *          (Smile ID or Dojah). Drives modules/verification state forward
 *          from `pending` → `id_verified` or `id_failed`.
 *
 * SECURITY:
 *   1. Verify provider signature (each has its own header + scheme).
 *   2. Match on the vendor's stored verification session id; never trust
 *      identity claims from the request body alone.
 *   3. Respond 200 once acknowledged; log failures, do not echo provider
 *      payload back to the caller.
 *
 * TODO: implement signature verification per the chosen provider's docs
 *       (provider selection happens in Phase 7).
 */
import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  // TODO: read provider-specific signature header + verify.
  const raw = await req.text();
  console.info('verification webhook received (length=%d)', raw.length);
  return NextResponse.json({ ok: true });
}
