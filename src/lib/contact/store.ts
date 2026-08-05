import 'server-only'

import type { Budget, Topic } from './schema'

/**
 * Contact submission storage.
 *
 * The same seam as `ContentRepository`: one interface, one swappable
 * implementation. The dashboard inbox reads through `list()`, so wiring a real
 * database later changes this file and nothing else.
 */

export type Submission = {
  id: string
  name: string
  email: string
  company?: string
  topic: Topic
  budget?: Budget
  message: string
  receivedAt: string
  userAgent?: string
  status: 'unread' | 'read' | 'replied' | 'archived'
}

export type NewSubmission = Omit<Submission, 'id' | 'status'>

export interface SubmissionStore {
  create(input: NewSubmission): Promise<Submission>
  list(options?: { status?: Submission['status']; limit?: number }): Promise<Submission[]>
  get(id: string): Promise<Submission | null>
  countUnread(): Promise<number>
}

/**
 * In-memory implementation.
 *
 * ⚠ SUBMISSIONS DO NOT SURVIVE A RESTART OR A DEPLOY.
 *
 * This is a deliberate V1 boundary, not an oversight. It keeps the contact form
 * working end-to-end — validation, rate limiting, the dashboard inbox — with no
 * infrastructure to provision, and it makes the shape of the persistence layer
 * concrete so the database version is a mechanical translation.
 *
 * BEFORE TAKING ENQUIRIES SERIOUSLY, do one of:
 *   1. Add an email adapter in `create()` so every submission is also delivered
 *      to hello@elitealgoslabs.com — the smallest change that makes losing the
 *      in-memory copy harmless.
 *   2. Replace this object with a Postgres-backed implementation.
 *
 * Tracked in the Company Brain under `06-Decisions/contact-persistence.md`.
 */
class InMemorySubmissionStore implements SubmissionStore {
  #items: Submission[] = []

  async create(input: NewSubmission): Promise<Submission> {
    const submission: Submission = {
      ...input,
      id: crypto.randomUUID(),
      status: 'unread',
    }
    this.#items.unshift(submission)
    return submission
  }

  async list({ status, limit }: { status?: Submission['status']; limit?: number } = {}) {
    let result = this.#items
    if (status) result = result.filter((item) => item.status === status)
    return typeof limit === 'number' ? result.slice(0, limit) : result
  }

  async get(id: string) {
    return this.#items.find((item) => item.id === id) ?? null
  }

  async countUnread() {
    return this.#items.filter((item) => item.status === 'unread').length
  }
}

export const submissions: SubmissionStore = new InMemorySubmissionStore()
