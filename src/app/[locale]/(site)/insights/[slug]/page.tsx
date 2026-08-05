import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { PageHero } from '@/components/sections/page-hero'
import { BlockRenderer } from '@/components/content/block-renderer'
import { Reveal } from '@/components/motion/primitives'
import { Container, Hairline, Section } from '@/components/ui/layout'
import { Badge, LinkCard } from '@/components/ui/card'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale, locales } from '@/lib/i18n/config'
import { href, routes } from '@/lib/i18n/routes'
import { buildPageMetadata, SITE_URL } from '@/lib/seo'
import { content, findAuthor } from '@/lib/content/repository'
import { posts } from '@/lib/content/data/insights'
import { COMPANY } from '@/lib/brand'
import { formatDate } from '@/lib/utils'

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    posts
      .filter((post) => post.status === 'published')
      .map((post) => ({ locale, slug: post.slug })),
  )
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/insights/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}

  const [dict, post] = await Promise.all([getDictionary(locale), content.getPost(slug)])
  if (!post) return {}

  const author = findAuthor(post.authorId)

  return buildPageMetadata({
    locale,
    page: 'insights',
    dict,
    path: `/insights/${slug}`,
    overrides: {
      title: post.title[locale],
      description: post.excerpt[locale],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: author ? [author.name] : undefined,
    },
  })
}

export default async function InsightPostPage({ params }: PageProps<'/[locale]/insights/[slug]'>) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const [dict, post, related] = await Promise.all([
    getDictionary(locale),
    content.getPost(slug),
    content.getRelatedPosts(slug, 2),
  ])
  if (!post) notFound()

  const t = dict.insights
  const author = findAuthor(post.authorId)

  // Headings become an in-page table of contents; ids are authored in the
  // content so anchors stay stable across translations and edits.
  const headings = post.body.filter((block) => block.type === 'heading')

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title[locale],
    description: post.excerpt[locale],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: locale,
    author: { '@type': 'Organization', name: author?.name ?? COMPANY.legalName },
    publisher: { '@type': 'Organization', name: COMPANY.legalName },
    mainEntityOfPage: `${SITE_URL}/${locale}/insights/${slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <PageHero
        eyebrow={t.hero.eyebrow}
        title={post.title[locale]}
        lead={post.excerpt[locale]}
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
          <span aria-hidden="true">·</span>
          <span>
            {post.readingMinutes} {t.readingTime}
          </span>
          {author ? (
            <>
              <span aria-hidden="true">·</span>
              <span>
                {t.author} {author.name}
              </span>
            </>
          ) : null}
        </div>
      </PageHero>

      <Section spacing="tight">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <article className="lg:col-span-8">
              <BlockRenderer blocks={post.body} locale={locale} />

              <Hairline className="my-12" />

              <div className="flex flex-wrap items-center gap-2">
                <span className="eyebrow mr-1">{t.topicsLabel}</span>
                {post.topics.map((topic) => (
                  <Badge key={topic.en}>{topic[locale]}</Badge>
                ))}
              </div>

              <Link
                href={href(routes.insights, locale)}
                className="group mt-10 inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-foreground"
              >
                <ArrowLeft
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1"
                />
                {t.backToInsights}
              </Link>
            </article>

            {/* Table of contents */}
            {headings.length > 0 ? (
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <h2 className="eyebrow">{t.tocTitle}</h2>
                  <ul className="mt-5 space-y-3 border-l border-border pl-5">
                    {headings.map((heading) => (
                      <li key={heading.id}>
                        <a
                          href={`#${heading.id}`}
                          className="text-sm leading-snug text-muted transition-colors duration-300 hover:text-accent-strong"
                        >
                          {heading.text[locale]}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            ) : null}
          </div>

          {/* Related */}
          {related.length > 0 ? (
            <Reveal>
              <div className="mt-20">
                <h2 className="eyebrow">{t.relatedTitle}</h2>
                <ul className="mt-8 grid gap-6 sm:grid-cols-2">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <LinkCard
                        href={href(routes.insightsPost(item.slug), locale)}
                        label={item.title[locale]}
                        className="h-full p-7"
                      >
                        <h3 className="font-display text-xl leading-snug">{item.title[locale]}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted">
                          {item.excerpt[locale]}
                        </p>
                      </LinkCard>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}
        </Container>
      </Section>
    </>
  )
}
