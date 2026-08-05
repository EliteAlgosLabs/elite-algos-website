import { notFound } from 'next/navigation'
import { Badge, DataTable, PageHeader, Panel, PlaceholderNotice } from '@/components/admin/primitives'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale, locales } from '@/lib/i18n/config'
import { requirePermission } from '@/lib/auth/guard'
import { content } from '@/lib/content/repository'
import { disciplineLabels } from '@/lib/content/data/disciplines'
import type { CaseStudy } from '@/lib/content/types'

type Row = CaseStudy & { sample?: true }

export default async function PortfolioManagerPage({
  params,
}: PageProps<'/[locale]/admin/portfolio'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  await requirePermission('managePortfolio', locale)

  const [dict, rows] = await Promise.all([getDictionary(locale), content.listCaseStudies()])
  const t = dict.admin.portfolioMgr
  const c = dict.admin.common

  /** A case study is translation-complete when every locale has a title. */
  function translationComplete(row: Row) {
    return locales.every((code) => Boolean(row.title[code]?.trim()))
  }

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />

      <div className="mb-6">
        <PlaceholderNotice
          message={
            locale === 'fr'
              ? 'Lecture seule — les études de cas sont versionnées dans Git.'
              : 'Read-only — case studies are versioned in Git.'
          }
          detail={
            locale === 'fr'
              ? 'Le contenu vit dans src/lib/content/data/portfolio.ts et se déploie avec le code, ce qui le rend relisible en pull request. L’édition depuis cette interface arrivera avec la base de données.'
              : 'Content lives in src/lib/content/data/portfolio.ts and deploys with the code, which makes it reviewable in a pull request. In-dashboard editing arrives with the database.'
          }
        />
      </div>

      <Panel>
        <DataTable<Row>
          rows={rows}
          getKey={(row) => row.slug}
          empty={c.noResults}
          columns={[
            {
              key: 'title',
              header: c.title,
              render: (row) => (
                <div>
                  <p className="font-medium text-foreground">{row.title[locale]}</p>
                  <p className="font-mono text-[0.6875rem] text-muted">{row.slug}</p>
                </div>
              ),
            },
            {
              key: 'sector',
              header: t.sector,
              render: (row) => <span className="text-muted">{row.sector[locale]}</span>,
            },
            {
              key: 'discipline',
              header: dict.portfolio.filterLabel,
              render: (row) => <Badge>{disciplineLabels[row.discipline][locale]}</Badge>,
            },
            {
              key: 'year',
              header: t.year,
              render: (row) => <span className="text-muted">{row.year}</span>,
            },
            {
              key: 'translations',
              header: t.translations,
              render: (row) =>
                translationComplete(row) ? (
                  <Badge tone="success">{t.complete}</Badge>
                ) : (
                  <Badge tone="warning">{t.missingFr}</Badge>
                ),
            },
            {
              key: 'status',
              header: c.status,
              render: (row) => (
                <div className="flex flex-wrap gap-1.5">
                  {row.featured ? <Badge tone="accent">{t.featured}</Badge> : null}
                  {row.sample ? (
                    <Badge tone="warning">{locale === 'fr' ? 'Exemple' : 'Sample'}</Badge>
                  ) : null}
                </div>
              ),
            },
          ]}
        />
      </Panel>
    </>
  )
}
