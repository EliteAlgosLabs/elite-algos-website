import { NextResponse, type NextRequest } from 'next/server'
import {
  contactSchema,
  toFieldErrors,
  type ContactInput,
  type ContactResponse,
} from '@/lib/contact/schema'
import { submissions } from '@/lib/contact/store'

/**
 * Contact endpoint.
 *
 * Backend-ready, deliberately not backend-complete. It validates, rate-limits
 * and persists through the `SubmissionStore` interface; wiring an email
 * provider is a single adapter away and is documented in the Company Brain.
 *
 * Runs on the Node runtime because the store will eventually talk to a database
 * driver that the edge runtime cannot load.
 */
export const runtime = 'nodejs'

/* --------------------------------------------------------------------------
   RATE LIMITING
   In-memory and therefore per-process: correct for the single-container
   deployment this ships with, and NOT correct once the app runs more than one
   replica. Swap for Redis at that point — see `docs/deployment.md`.
   -------------------------------------------------------------------------- */

const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_PER_WINDOW = 5

const attempts = new Map<string, number[]>()

function clientKey(request: NextRequest): string {
  // Behind nginx, the real client address arrives in X-Forwarded-For. Take the
  // first entry: later ones are proxies we control.
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const recent = (attempts.get(key) ?? []).filter((time) => now - time < WINDOW_MS)

  if (recent.length >= MAX_PER_WINDOW) {
    attempts.set(key, recent)
    return true
  }

  recent.push(now)
  attempts.set(key, recent)

  // Opportunistic cleanup so the map cannot grow without bound.
  if (attempts.size > 5000) {
    for (const [entryKey, times] of attempts) {
      if (times.every((time) => now - time >= WINDOW_MS)) attempts.delete(entryKey)
    }
  }

  return false
}

/* -------------------------------------------------------------------------- */

export async function POST(request: NextRequest): Promise<NextResponse<ContactResponse>> {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ ok: false, formError: 'serverError' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: toFieldErrors(parsed.error) },
      { status: 422 },
    )
  }

  const data: ContactInput = parsed.data

  // Honeypot tripped. Respond exactly as we would on success so the bot learns
  // nothing, but persist nothing.
  if (data.website) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  if (isRateLimited(clientKey(request))) {
    return NextResponse.json({ ok: false, formError: 'rateLimited' }, { status: 429 })
  }

  try {
    await submissions.create({
      name: data.name,
      email: data.email,
      company: data.company || undefined,
      topic: data.topic,
      budget: data.budget,
      message: data.message,
      receivedAt: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') ?? undefined,
    })
  } catch (error) {
    // Never leak internals to the client; the operator gets the detail.
    console.error('[contact] failed to persist submission', error)
    return NextResponse.json({ ok: false, formError: 'serverError' }, { status: 500 })
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
