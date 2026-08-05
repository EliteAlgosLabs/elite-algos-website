import { notFound } from 'next/navigation'
import { Badge, DataTable, PageHeader, Panel, PlaceholderNotice } from '@/components/admin/primitives'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale, locales } from '@/lib/i18n/config'
import { requirePermission } from '@/lib/auth/guard'
import { findAuthor } from '@/lib/content/repository'
import { posts } from '@/lib/content/data/insights'
import type { Post } from '@/lib/content/types'
import { formatDate } from '@/lib/utils'

export default async function BlogManagerPage({ params }: PageProps<'/[locale]/admin/blog'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  await requirePermission('manageContent', locale)
  const dict = await getDictionary(locale)

  const t = dict.admin.blogMgr
  const c = dict.admin.common

  // Reads the raw module rather than the repository so drafts are visible here.
  // The public site only ever sees published posts.
  const rows = [...posts].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  )

  function translationComplete(post: Post) {
    return locales.every(
      (code) => Boolean(post.title[code]?.trim()) && Boolean(post.excerpt[code]?.trim()),
    )
  }

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />

      <div className="mb-6">
        <PlaceholderNotice
          message={
            locale === 'fr'
              ? 'Lecture seule — les articles sont versionnés dans Git.'
              : 'Read-only — articles are versioned in Git.'
          }
          detail={
            locale === 'fr'
              ? 'Les articles vivent dans src/lib/content/data/insights.ts sous forme de blocs typés, ce qui garantit un rendu identique en anglais et en français.'
              : 'Articles live in src/lib/content/data/insights.ts as typed blocks, which is what keeps the English and French renderings identical.'
          }
        />
      </div>

      <Panel>
        <DataTable<Post>
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
              key: 'author',
              header: c.author,
              render: (row) => (
                <span className="text-muted">{findAuthor(row.authorId)?.name ?? '—'}</span>
              ),
            },
            {
              key: 'topics',
              header: t.topics,
              render: (row) => (
                <div className="flex flex-wrap gap-1.5">
                  {row.topics.map((topic) => (
                    <Badge key={topic.en}>{topic[locale]}</Badge>
                  ))}
                </div>
              ),
            },
            {
              key: 'reading',
              header: t.readingTime,
              render: (row) => (
                <span className="whitespace-nowrap text-muted">
                  {row.readingMinutes} {dict.insights.readingTime}
                </span>
              ),
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
                <div className="flex flex-col gap-1.5">
                  <Badge tone={row.status === 'published' ? 'success' : 'muted'}>
                    {row.status === 'published' ? c.published : c.draft}
                  </Badge>
                  <time dateTime={row.publishedAt} className="text-[0.6875rem] text-muted">
                    {formatDate(row.publishedAt, locale, { day: 'numeric', month: 'short', year: 'numeric' })}
                  </time>
                </div>
              ),
            },
          ]}
        />
      </Panel>
    </>
  )
}
