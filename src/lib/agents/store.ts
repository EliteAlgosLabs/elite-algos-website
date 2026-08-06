import 'server-only'

import { promises as fs } from 'node:fs'
import path from 'node:path'

/**
 * AI agent heartbeat store.
 *
 * Each agent (Lexa, Aelyn) POSTs a small heartbeat to `/api/agents/heartbeat`
 * on a schedule. This store keeps the latest heartbeat per agent, plus a couple
 * of rolling counters, so the dashboard "AI Agents" module shows LIVE status
 * instead of a placeholder. No invented numbers: an agent that has never
 * reported simply shows as offline with em-dash fields.
 *
 * Persisted to the shared volume (`AGENTS_STORE_PATH`, default
 * `/app/data/agents.json`). Same serialised, atomic-write discipline as the
 * other file stores.
 */

export type AgentId = 'lexa' | 'aelyn'

export type HeartbeatInput = {
  agent: AgentId
  /** Free-form status word the agent chooses, e.g. 'online' | 'busy' | 'idle'. */
  status?: string
  /** Model the agent is currently running, e.g. 'claude-opus-4-8'. */
  model?: string
  /** Optional current task description. */
  task?: string
  /** Optional count of tasks handled today (agent-reported). */
  tasksToday?: number
}

export type AgentRecord = {
  agent: AgentId
  status: string
  model: string | null
  task: string | null
  tasksToday: number | null
  lastSeen: string // ISO
}

export type AgentView = AgentRecord & {
  /** Derived liveness: online if seen within the freshness window. */
  live: 'online' | 'stale' | 'offline'
  /** Seconds since last heartbeat, or null if never seen. */
  ageSeconds: number | null
}

type AgentsData = {
  version: 1
  agents: Partial<Record<AgentId, AgentRecord>>
}

// An agent is considered online if it checked in within this window.
const ONLINE_WINDOW_MS = 5 * 60 * 1000 // 5 minutes
const STALE_WINDOW_MS = 30 * 60 * 1000 // 30 minutes

export const KNOWN_AGENTS: AgentId[] = ['lexa', 'aelyn']

class FileAgentStore {
  #file: string
  #dir: string
  #chain: Promise<unknown> = Promise.resolve()

  constructor(filePath: string) {
    this.#file = filePath
    this.#dir = path.dirname(filePath)
  }

  #queue<T>(op: () => Promise<T>): Promise<T> {
    const run = this.#chain.then(op, op)
    this.#chain = run.then(
      () => undefined,
      () => undefined,
    )
    return run
  }

  async #read(): Promise<AgentsData> {
    try {
      const raw = await fs.readFile(this.#file, 'utf8')
      const parsed = JSON.parse(raw) as AgentsData
      if (parsed && parsed.version === 1 && parsed.agents) return parsed
      return { version: 1, agents: {} }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return { version: 1, agents: {} }
      }
      console.error('[agents-store] read failed', error)
      return { version: 1, agents: {} }
    }
  }

  async #write(data: AgentsData): Promise<void> {
    await fs.mkdir(this.#dir, { recursive: true })
    const tmp = `${this.#file}.${process.pid}.${Date.now()}.tmp`
    await fs.writeFile(tmp, JSON.stringify(data, null, 2), 'utf8')
    await fs.rename(tmp, this.#file)
  }

  record(input: HeartbeatInput): Promise<AgentRecord> {
    return this.#queue(async () => {
      const data = await this.#read()
      const record: AgentRecord = {
        agent: input.agent,
        status: input.status?.trim() || 'online',
        model: input.model?.trim() || null,
        task: input.task?.trim() || null,
        tasksToday:
          typeof input.tasksToday === 'number' && Number.isFinite(input.tasksToday)
            ? input.tasksToday
            : null,
        lastSeen: new Date().toISOString(),
      }
      data.agents[input.agent] = record
      await this.#write(data)
      return record
    })
  }

  /** Returns a view for every KNOWN agent, present or not. */
  list(): Promise<AgentView[]> {
    return this.#queue(async () => {
      const data = await this.#read()
      const now = Date.now()
      return KNOWN_AGENTS.map((id) => {
        const rec = data.agents[id]
        if (!rec) {
          return {
            agent: id,
            status: 'offline',
            model: null,
            task: null,
            tasksToday: null,
            lastSeen: '',
            live: 'offline' as const,
            ageSeconds: null,
          }
        }
        const age = now - new Date(rec.lastSeen).getTime()
        const live: AgentView['live'] =
          age <= ONLINE_WINDOW_MS ? 'online' : age <= STALE_WINDOW_MS ? 'stale' : 'offline'
        return { ...rec, live, ageSeconds: Math.round(age / 1000) }
      })
    })
  }
}

const STORE_PATH = process.env.AGENTS_STORE_PATH?.trim() || '/app/data/agents.json'

export const agentStore = new FileAgentStore(STORE_PATH)
