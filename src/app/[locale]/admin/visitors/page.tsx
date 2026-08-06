import { notFound } from 'next/navigation'
import { PageHeader, Panel, StatTile } from '@/components/admin/primitives'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { requirePermission } from '@/lib/auth/guard'
import { analytics } from '@/lib/analytics/store'

/**
 * Visitor statistics.
 *
 * Shares the first-party analytics data source. Records no personally
 * identifying data — aggregate country, language, device and landing pages
 * only, never a retained IP address.
 */
export default async function VisitorsPage({ params }: PageProps<'/[locale]/admin/visitors'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  await requirePermission('viewAnalytics', locale)
  const dict = await getDictionary(locale)
  const t = dict.admin.visitors
  const c = dict.admin.common

  const summary = await analytics.summary(30)
  const nf = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US')

  // "Today" figures from the most recent day in the series.
  const today = summary.series.at(-1)
  const unknownLabel = locale === 'fr' ? 'Inconnu' : 'Unknown'

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label={locale === 'fr' ? 'Visiteurs (30 j)' : 'Visitors (30d)'}
          value={nf.format(summary.visitors)}
        />
        <StatTile
          label={locale === 'fr' ? "Aujourd'hui" : 'Today'}
          value={today ? nf.format(today.visitors) : '—'}
        />
        <StatTile label={t.language} value={topLabel(summary.byLocale, unknownLabel, true)} />
        <StatTile label={t.device} value={topLabel(summary.byDevice, unknownLabel)} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <RankPanel
          title={t.country}
          rows={summary.topCountries.map((r) => ({
            key: r.key === 'unknown' ? unknownLabel : r.key,
            count: r.count,
          }))}
          empty={c.noResults}
          nf={nf}
        />
        <RankPanel
          title={t.device}
          rows={summary.byDevice.map((r) => ({ key: deviceLabel(r.key, locale), count: r.count }))}
          empty={c.noResults}
          nf={nf}
        />
        <RankPanel title={t.landingPage} rows={summary.topPaths} empty={c.noResults} nf={nf} />
        <RankPanel
          title={t.referrer}
          rows={summary.topReferrers.map((r) => ({
            key: r.key === 'direct' ? (locale === 'fr' ? 'Direct' : 'Direct') : r.key,
            count: r.count,
          }))}
          empty={c.noResults}
          nf={nf}
        />
      </div>
    </>
  )
}

function topLabel(
  rows: Array<{ key: string; count: number }>,
  unknown: string,
  upper = false,
): string {
  const top = rows[0]
  if (!top) return '—'
  if (top.key === 'unknown') return unknown
  return upper ? top.key.toUpperCase() : top.key
}

function deviceLabel(key: string, locale: string): string {
  const map: Record<string, { en: string; fr: string }> = {
    desktop: { en: 'Desktop', fr: 'Ordinateur' },
    mobile: { en: 'Mobile', fr: 'Mobile' },
    tablet: { en: 'Tablet', fr: 'Tablette' },
    unknown: { en: 'Unknown', fr: 'Inconnu' },
  }
  const entry = map[key] ?? { en: key, fr: key }
  return locale === 'fr' ? entry.fr : entry.en
}

function RankPanel({
  title,
  rows,
  empty,
  nf,
}: {
  title: string
  rows: Array<{ key: string; count: number }>
  empty: string
  nf: Intl.NumberFormat
}) {
  return (
    <Panel title={title}>
      {rows.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-sm text-muted">{empty}</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {rows.map((row) => (
            <li key={row.key} className="flex items-center justify-between gap-4">
              <span className="min-w-0 truncate text-sm text-foreground">{row.key}</span>
              <span className="shrink-0 font-mono text-sm text-muted">{nf.format(row.count)}</span>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  )
}
