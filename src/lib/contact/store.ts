import 'server-only'

import { promises as fs } from 'node:fs'
import path from 'node:path'

import type { Budget, Topic } from './schema'

/**
 * Contact submission storage.
 *
 * One interface, one swappable implementation. The dashboard inbox reads
 * through `list()`, so the persistence mechanism is an internal detail.
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
 * File-backed implementation.
 *
 * Chosen over both the previous in-memory store and a full database:
 *
 *   • The in-memory store had TWO fatal flaws in the standalone production
 *     server — submissions were lost on every redeploy, AND the contact API
 *     route and the admin inbox page can run in different module instances, so
 *     an enquiry saved by the API was frequently invisible to the inbox. The
 *     inbox appeared permanently empty even though email delivery worked.
 *   • A database is the right long-term answer but requires provisioning
 *     Postgres. This closes the gap now with zero new infrastructure.
 *
 * Data lives as a single JSON file on a mounted Docker volume
 * (`CONTACT_STORE_PATH`, default `/app/data/submissions.json`), so it survives
 * restarts and redeploys and is shared by every part of the process. Writes are
 * serialised through an in-process promise chain and written atomically (temp
 * file + rename) so a crash mid-write cannot corrupt the store.
 *
 * The `SubmissionStore` interface is unchanged, so swapping this for Postgres
 * later is still a single-file change. Tracked in the Company Brain
 * (ADR-005-Contact-Persistence).
 */
class FileSubmissionStore implements SubmissionStore {
  #file: string
  #dir: string
  // Serialises all reads/writes: every operation chains off the previous one so
  // concurrent requests cannot interleave a read-modify-write.
  #chain: Promise<unknown> = Promise.resolve()

  constructor(filePath: string) {
    this.#file = filePath
    this.#dir = path.dirname(filePath)
  }

  #queue<T>(operation: () => Promise<T>): Promise<T> {
    const run = this.#chain.then(operation, operation)
    // Keep the chain alive regardless of individual success/failure.
    this.#chain = run.then(
      () => undefined,
      () => undefined,
    )
    return run
  }

  async #readAll(): Promise<Submission[]> {
    try {
      const raw = await fs.readFile(this.#file, 'utf8')
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? (parsed as Submission[]) : []
    } catch (error) {
      // A missing file is the normal empty state, not an error.
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return []
      // A corrupt file must not take the dashboard down; log and treat as empty.
      console.error('[contact-store] failed to read submissions file', error)
      return []
    }
  }

  async #writeAll(items: Submission[]): Promise<void> {
    await fs.mkdir(this.#dir, { recursive: true })
    const tmp = `${this.#file}.${process.pid}.${Date.now()}.tmp`
    await fs.writeFile(tmp, JSON.stringify(items, null, 2), 'utf8')
    // Atomic replace — readers never see a half-written file.
    await fs.rename(tmp, this.#file)
  }

  create(input: NewSubmission): Promise<Submission> {
    return this.#queue(async () => {
      const submission: Submission = {
        ...input,
        id: crypto.randomUUID(),
        status: 'unread',
      }
      const items = await this.#readAll()
      items.unshift(submission)
      await this.#writeAll(items)
      return submission
    })
  }

  list({ status, limit }: { status?: Submission['status']; limit?: number } = {}): Promise<
    Submission[]
  > {
    return this.#queue(async () => {
      let result = await this.#readAll()
      if (status) result = result.filter((item) => item.status === status)
      return typeof limit === 'number' ? result.slice(0, limit) : result
    })
  }

  get(id: string): Promise<Submission | null> {
    return this.#queue(async () => {
      const items = await this.#readAll()
      return items.find((item) => item.id === id) ?? null
    })
  }

  countUnread(): Promise<number> {
    return this.#queue(async () => {
      const items = await this.#readAll()
      return items.filter((item) => item.status === 'unread').length
    })
  }
}

const STORE_PATH = process.env.CONTACT_STORE_PATH?.trim() || '/app/data/submissions.json'

export const submissions: SubmissionStore = new FileSubmissionStore(STORE_PATH)
