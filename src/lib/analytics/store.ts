import 'server-only'

import { promises as fs } from 'node:fs'
import path from 'node:path'

/**
 * First-party, privacy-preserving analytics store.
 *
 * Design principles (non-negotiable):
 *   • No cookies, no cross-site identifiers, no fingerprinting. This is why the
 *     site needs no consent banner.
 *   • No IP addresses are ever stored. The ingest route derives a coarse,
 *     per-day, salted visitor hash purely to distinguish "new vs returning"
 *     within a single day, and even that is discarded at day boundaries.
 *   • Aggregate only. We keep per-day counters (pageviews, unique visitors) and
 *     small top-N maps (paths, referrers, countries, locales, devices). We do
 *     NOT keep a per-request event log — nothing that could reconstruct an
 *     individual's browsing.
 *
 * Storage is a single JSON file on the same persistent volume as the contact
 * store (`ANALYTICS_STORE_PATH`, default `/app/data/analytics.json`). Writes are
 * serialised and atomic (temp + rename). Same swappable-interface discipline as
 * the contact store, so moving to Plausible/Umami or a database later is a
 * contained change.
 */

export type DeviceKind = 'desktop' | 'mobile' | 'tablet' | 'unknown'

export type IngestEvent = {
  /** Locale-less path, e.g. "/about". Query and hash are stripped upstream. */
  path: string
  /** Registrable referrer host, or 'direct'. Never a full URL. */
  referrer: string
  /** ISO country code (2 letters) or 'unknown'. */
  country: string
  /** 'en' | 'fr' | 'unknown'. */
  locale: string
  device: DeviceKind
  /** Per-day salted visitor hash — used only to count uniques for the day. */
  visitorHash: string
}

type DayBucket = {
  pageviews: number
  visitors: string[] // per-day visitor hashes (unique-counted, then length kept)
  visitorCount: number
  paths: Record<string, number>
  referrers: Record<string, number>
  countries: Record<string, number>
  locales: Record<string, number>
  devices: Record<string, number>
}

type AnalyticsData = {
  version: 1
  /** Keyed by YYYY-MM-DD (UTC). */
  days: Record<string, DayBucket>
}

function emptyDay(): DayBucket {
  return {
    pageviews: 0,
    visitors: [],
    visitorCount: 0,
    paths: {},
    referrers: {},
    countries: {},
    locales: {},
    devices: {},
  }
}

function bump(map: Record<string, number>, key: string, by = 1): void {
  map[key] = (map[key] ?? 0) + by
}

export type AnalyticsSummary = {
  rangeDays: number
  pageviews: number
  visitors: number
  /** pageviews / visitors, 1-dp. */
  viewsPerVisitor: number
  /** Share of single-view visitors, 0–100, as a proxy bounce rate. */
  topPaths: Array<{ key: string; count: number }>
  topReferrers: Array<{ key: string; count: number }>
  topCountries: Array<{ key: string; count: number }>
  byLocale: Array<{ key: string; count: number }>
  byDevice: Array<{ key: string; count: number }>
  /** Per-day series, oldest→newest, for a sparkline. */
  series: Array<{ date: string; pageviews: number; visitors: number }>
}

class FileAnalyticsStore {
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

  async #read(): Promise<AnalyticsData> {
    try {
      const raw = await fs.readFile(this.#file, 'utf8')
      const parsed = JSON.parse(raw) as AnalyticsData
      if (parsed && parsed.version === 1 && parsed.days) return parsed
      return { version: 1, days: {} }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return { version: 1, days: {} }
      }
      console.error('[analytics-store] read failed', error)
      return { version: 1, days: {} }
    }
  }

  async #write(data: AnalyticsData): Promise<void> {
    await fs.mkdir(this.#dir, { recursive: true })
    const tmp = `${this.#file}.${process.pid}.${Date.now()}.tmp`
    await fs.writeFile(tmp, JSON.stringify(data), 'utf8')
    await fs.rename(tmp, this.#file)
  }

  /** Records one pageview. */
  record(event: IngestEvent): Promise<void> {
    return this.#queue(async () => {
      const data = await this.#read()
      const dayKey = new Date().toISOString().slice(0, 10)
      const day = (data.days[dayKey] ??= emptyDay())

      day.pageviews += 1
      if (!day.visitors.includes(event.visitorHash)) {
        day.visitors.push(event.visitorHash)
        day.visitorCount = day.visitors.length
        bump(day.countries, event.country)
        bump(day.locales, event.locale)
        bump(day.devices, event.device)
        bump(day.referrers, event.referrer)
      }
      bump(day.paths, event.path)

      // Retention: keep 90 days. Old buckets are pruned so the file cannot grow
      // without bound and no long-term individual signal is retained.
      const cutoff = new Date(Date.now() - 90 * 86_400_000).toISOString().slice(0, 10)
      for (const key of Object.keys(data.days)) {
        if (key < cutoff) delete data.days[key]
      }

      await this.#write(data)
    })
  }

  /** Aggregates the last `rangeDays` days (default 30) into a summary. */
  summary(rangeDays = 30): Promise<AnalyticsSummary> {
    return this.#queue(async () => {
      const data = await this.#read()
      const since = new Date(Date.now() - (rangeDays - 1) * 86_400_000)
        .toISOString()
        .slice(0, 10)

      const paths: Record<string, number> = {}
      const referrers: Record<string, number> = {}
      const countries: Record<string, number> = {}
      const locales: Record<string, number> = {}
      const devices: Record<string, number> = {}
      const series: AnalyticsSummary['series'] = []
      let pageviews = 0
      let visitors = 0

      const dayKeys = Object.keys(data.days)
        .filter((k) => k >= since)
        .sort()

      for (const key of dayKeys) {
        const d = data.days[key]
        pageviews += d.pageviews
        visitors += d.visitorCount
        merge(paths, d.paths)
        merge(referrers, d.referrers)
        merge(countries, d.countries)
        merge(locales, d.locales)
        merge(devices, d.devices)
        series.push({ date: key, pageviews: d.pageviews, visitors: d.visitorCount })
      }

      return {
        rangeDays,
        pageviews,
        visitors,
        viewsPerVisitor: visitors > 0 ? Math.round((pageviews / visitors) * 10) / 10 : 0,
        topPaths: topN(paths, 8),
        topReferrers: topN(referrers, 8),
        topCountries: topN(countries, 8),
        byLocale: topN(locales, 5),
        byDevice: topN(devices, 5),
        series,
      }
    })
  }
}

function merge(into: Record<string, number>, from: Record<string, number>): void {
  for (const [k, v] of Object.entries(from)) into[k] = (into[k] ?? 0) + v
}

function topN(map: Record<string, number>, n: number): Array<{ key: string; count: number }> {
  return Object.entries(map)
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, n)
}

const STORE_PATH =
  process.env.ANALYTICS_STORE_PATH?.trim() || '/app/data/analytics.json'

export const analytics = new FileAnalyticsStore(STORE_PATH)
