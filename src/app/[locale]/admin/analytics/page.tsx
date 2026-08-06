import { notFound } from 'next/navigation'
import { PageHeader, Panel, StatTile } from '@/components/admin/primitives'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { requirePermission } from '@/lib/auth/guard'
import { analytics } from '@/lib/analytics/store'

/**
 * Website analytics — first-party, cookie-free, privacy-preserving.
 *
 * Reads aggregate counters recorded by the `/api/track` beacon. No provider,
 * no consent banner, no personal data. Empty until traffic arrives; never
 * fabricated.
 */
export default async function AnalyticsPage({ params }: PageProps<'/[locale]/admin/analytics'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  await requirePermission('viewAnalytics', locale)
  const dict = await getDictionary(locale)
  const t = dict.admin.analytics
  const c = dict.admin.common

  const summary = await analytics.summary(30)
  const nf = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US')

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />

      <div className="mb-6 flex items-center gap-2 text-sm text-muted">
        <span>{t.range}:</span>
        <span className="text-foreground">{t.ranges.d30}</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label={t.metrics.visitors} value={nf.format(summary.visitors)} />
        <StatTile label={t.metrics.pageviews} value={nf.format(summary.pageviews)} />
        <StatTile
          label={locale === 'fr' ? 'Vues / visiteur' : 'Views / visitor'}
          value={summary.visitors > 0 ? summary.viewsPerVisitor.toFixed(1) : '—'}
        />
        <StatTile
          label={locale === 'fr' ? 'Jours suivis' : 'Days tracked'}
          value={nf.format(summary.series.length)}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <RankPanel title={t.topPages} rows={summary.topPaths} empty={c.noResults} nf={nf} />
        <RankPanel title={t.topSources} rows={summary.topReferrers} empty={c.noResults} nf={nf} />
        <RankPanel title={t.byCountry} rows={summary.topCountries} empty={c.noResults} nf={nf} />
        <RankPanel
          title={t.byLanguage}
          rows={summary.byLocale.map((r) => ({
            key: r.key === 'unknown' ? (locale === 'fr' ? 'Inconnu' : 'Unknown') : r.key.toUpperCase(),
            count: r.count,
          }))}
          empty={c.noResults}
          nf={nf}
        />
      </div>
    </>
  )
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
