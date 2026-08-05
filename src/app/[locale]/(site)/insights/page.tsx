import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/sections/page-hero'
import { Stagger, StaggerItem } from '@/components/motion/primitives'
import { Container, Section } from '@/components/ui/layout'
import { Badge, LinkCard } from '@/components/ui/card'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { href, routes } from '@/lib/i18n/routes'
import { buildPageMetadata } from '@/lib/seo'
import { content, findAuthor } from '@/lib/content/repository'
import { formatDate } from '@/lib/utils'

export async function generateMetadata({ params }: PageProps<'/[locale]/insights'>): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return buildPageMetadata({ locale, page: 'insights', dict, path: '/insights' })
}

export default async function InsightsPage({ params }: PageProps<'/[locale]/insights'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [dict, posts] = await Promise.all([getDictionary(locale), content.listPosts()])
  const t = dict.insights

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lead={t.hero.lead} />

      <Section spacing="tight">
        <Container>
          {posts.length === 0 ? (
            <p className="text-lg text-muted">{t.empty}</p>
          ) : (
            <Stagger as="ul" className="grid gap-6 lg:grid-cols-2">
              {posts.map((post) => {
                const author = findAuthor(post.authorId)
                return (
                  <StaggerItem as="li" key={post.slug}>
                    <LinkCard
                      href={href(routes.insightsPost(post.slug), locale)}
                      label={post.title[locale]}
                      className="flex h-full flex-col p-8 sm:p-10"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        {post.featured ? <Badge tone="accent">{t.featured}</Badge> : null}
                        {post.topics.map((topic) => (
                          <Badge key={topic.en}>{topic[locale]}</Badge>
                        ))}
                      </div>

                      <h2 className="mt-6 font-display text-[1.75rem] leading-tight sm:text-3xl">
                        {post.title[locale]}
                      </h2>
                      <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                        {post.excerpt[locale]}
                      </p>

                      <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                        <time dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt, locale)}
                        </time>
                        <span aria-hidden="true">·</span>
                        <span>
                          {post.readingMinutes} {t.readingTime}
                        </span>
                        {author ? (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{author.name}</span>
                          </>
                        ) : null}
                      </div>
                    </LinkCard>
                  </StaggerItem>
                )
              })}
            </Stagger>
          )}
        </Container>
      </Section>
    </>
  )
}
