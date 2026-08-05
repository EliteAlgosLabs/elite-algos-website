import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PageHeader, Panel, PlaceholderNotice, StatTile, StatusDot } from '@/components/admin/primitives'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { requirePermission } from '@/lib/auth/guard'
import { content } from '@/lib/content/repository'
import { submissions } from '@/lib/contact/store'
import { formatDate } from '@/lib/utils'

export default async function AdminOverviewPage({ params }: PageProps<'/[locale]/admin'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const session = await requirePermission('viewDashboard', locale)

  const [dict, posts, caseStudies, unread, recent, hasSamples] = await Promise.all([
    getDictionary(locale),
    content.listPosts(),
    content.listCaseStudies(),
    submissions.countUnread(),
    submissions.list({ limit: 5 }),
    content.hasSampleContent(),
  ])

  const t = dict.admin
  const base = `/${locale}/admin`

  return (
    <>
      <PageHeader
        title={`${t.overview.greeting}, ${session.name.split(' ')[0]}`}
        subtitle={t.overview.subtitle}
      />

      {/* Real numbers only. Analytics tiles live on their own page, where the
          placeholder notice makes clear the source is not yet connected. */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatTile label={t.overview.stats.enquiries} value={String(unread)} />
        <StatTile label={t.overview.stats.articles} value={String(posts.length)} />
        <StatTile label={t.overview.stats.caseStudies} value={String(caseStudies.length)} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel
          title={t.overview.recentEnquiries}
          className="lg:col-span-2"
          action={
            <Link
              href={`${base}/inbox`}
              className="text-xs text-muted transition-colors hover:text-accent-strong"
            >
              {t.common.viewAll}
            </Link>
          }
        >
          {recent.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted">{t.inbox.empty}</p>
          ) : (
            <ul className="space-y-4">
              {recent.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
                    <p className="truncate text-sm text-muted">{item.email}</p>
                  </div>
                  <time
                    dateTime={item.receivedAt}
                    className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted"
                  >
                    {formatDate(item.receivedAt, locale, { day: 'numeric', month: 'short' })}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title={t.overview.systemStatus}>
          <ul className="space-y-4">
            <li className="flex items-center justify-between gap-3">
              <span className="text-sm text-muted">Website</span>
              <StatusDot tone="online" label={t.common.live} />
            </li>
            <li className="flex items-center justify-between gap-3">
              <span className="text-sm text-muted">Lexa</span>
              <StatusDot tone="standby" label={t.agents.status.standby} />
            </li>
            <li className="flex items-center justify-between gap-3">
              <span className="text-sm text-muted">Aelyn</span>
              <StatusDot tone="standby" label={t.agents.status.standby} />
            </li>
          </ul>
        </Panel>
      </div>

      {hasSamples ? (
        <div className="mt-6">
          <PlaceholderNotice
            message={
              locale === 'fr'
                ? 'Le portfolio contient encore des études de cas d’exemple.'
                : 'The portfolio still contains sample case studies.'
            }
            detail={
              locale === 'fr'
                ? 'Remplacez-les par des projets réels dans src/lib/content/data/portfolio.ts, puis supprimez l’indicateur « sample » de chaque entrée. Les avertissements disparaîtront automatiquement.'
                : 'Replace them with real engagements in src/lib/content/data/portfolio.ts, then delete the `sample` flag from each entry. Every warning disappears on its own.'
            }
          />
        </div>
      ) : null}
    </>
  )
}
