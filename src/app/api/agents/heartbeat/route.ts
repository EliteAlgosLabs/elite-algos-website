import { NextResponse, type NextRequest } from 'next/server'
import { agentStore, KNOWN_AGENTS, type AgentId } from '@/lib/agents/store'

/**
 * Agent heartbeat ingest.
 *
 * Lexa and Aelyn POST here on a schedule to report they are alive, what model
 * they are running, and (optionally) what they are working on. The dashboard
 * "AI Agents" module reads the resulting records and shows live status.
 *
 * Auth: a shared bearer token (`AGENTS_HEARTBEAT_TOKEN`). This is a write
 * endpoint that feeds an operator dashboard, so it must not be open to the
 * internet — a bad actor could otherwise spoof agent status. If the token is
 * unset the endpoint refuses all writes (fail closed).
 */
export const runtime = 'nodejs'

function isAgentId(value: unknown): value is AgentId {
  return typeof value === 'string' && (KNOWN_AGENTS as string[]).includes(value)
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const expected = process.env.AGENTS_HEARTBEAT_TOKEN?.trim()
  // Fail closed: no configured token means no accepted heartbeats.
  if (!expected) {
    return NextResponse.json({ ok: false, error: 'not-configured' }, { status: 503 })
  }

  const auth = request.headers.get('authorization') ?? ''
  const provided = auth.startsWith('Bearer ') ? auth.slice(7).trim() : ''
  if (provided !== expected) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  let body: {
    agent?: string
    status?: string
    model?: string
    task?: string
    tasksToday?: number
  } = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'bad-json' }, { status: 400 })
  }

  if (!isAgentId(body.agent)) {
    return NextResponse.json(
      { ok: false, error: 'unknown-agent', allowed: KNOWN_AGENTS },
      { status: 422 },
    )
  }

  try {
    const record = await agentStore.record({
      agent: body.agent,
      status: body.status,
      model: body.model,
      task: body.task,
      tasksToday: body.tasksToday,
    })
    return NextResponse.json({ ok: true, record }, { status: 200 })
  } catch (error) {
    console.error('[agents/heartbeat] failed to record', error)
    return NextResponse.json({ ok: false, error: 'server-error' }, { status: 500 })
  }
}
