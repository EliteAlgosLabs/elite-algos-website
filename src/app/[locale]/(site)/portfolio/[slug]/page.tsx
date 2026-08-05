import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/sections/page-hero'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/primitives'
import { Container, Hairline, Section } from '@/components/ui/layout'
import { Badge, Card } from '@/components/ui/card'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale, locales } from '@/lib/i18n/config'
import { href, routes } from '@/lib/i18n/routes'
import { buildPageMetadata } from '@/lib/seo'
import { content } from '@/lib/content/repository'
import { disciplineLabels } from '@/lib/content/data/disciplines'
import { caseStudies } from '@/lib/content/data/portfolio'

/** Pre-render every case study in every language at build time. */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    caseStudies.map((study) => ({ locale, slug: study.slug })),
  )
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/portfolio/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}

  const [dict, study] = await Promise.all([getDictionary(locale), content.getCaseStudy(slug)])
  if (!study) return {}

  return buildPageMetadata({
    locale,
    page: 'portfolio',
    dict,
    path: `/portfolio/${slug}`,
    overrides: {
      title: study.title[locale],
      description: study.summary[locale],
      type: 'article',
    },
  })
}

export default async function CaseStudyPage({ params }: PageProps<'/[locale]/portfolio/[slug]'>) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const [dict, study, next] = await Promise.all([
    getDictionary(locale),
    content.getCaseStudy(slug),
    content.getAdjacentCaseStudy(slug),
  ])
  if (!study) notFound()

  const t = dict.portfolio
  const sample = (study as { sample?: true }).sample === true

  const narrative = [
    { label: t.challengeLabel, body: study.challenge[locale] },
    { label: t.approachLabel, body: study.approach[locale] },
    { label: t.outcomeLabel, body: study.outcome[locale] },
  ]

  return (
    <>
      <PageHero
        eyebrow={disciplineLabels[study.discipline][locale]}
        title={study.title[locale]}
        lead={study.summary[locale]}
      >
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {study.confidential ? <Badge>{t.confidential}</Badge> : null}
          {sample ? (
            <Badge tone="warning">{locale === 'fr' ? 'Exemple' : 'Sample'}</Badge>
          ) : null}
        </div>
      </PageHero>

      <Section spacing="tight">
        <Container>
          {/* Facts */}
          <Reveal>
            <dl className="grid grid-cols-2 gap-8 border-y border-border py-8 sm:grid-cols-4">
              {[
                { term: t.sectorLabel, value: study.sector[locale] },
                { term: t.yearLabel, value: String(study.year) },
                { term: t.durationLabel, value: study.duration[locale] },
                {
                  term: t.filterLabel,
                  value: disciplineLabels[study.discipline][locale],
                },
              ].map((fact) => (
                <div key={fact.term}>
                  <dt className="eyebrow">{fact.term}</dt>
                  <dd className="mt-2.5 text-[0.9375rem] text-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Results */}
          <Reveal delay={0.06}>
            <h2 className="eyebrow mt-16">{t.resultsLabel}</h2>
          </Reveal>
          <Stagger className="mt-8 grid gap-8 sm:grid-cols-3">
            {study.metrics.map((metric) => (
              <StaggerItem key={metric.label[locale]}>
                <span className="block font-display text-[2.75rem] leading-none text-brushed sm:text-5xl">
                  {metric.value[locale]}
                </span>
                <span className="mt-4 block text-[0.9375rem] font-medium text-foreground">
                  {metric.label[locale]}
                </span>
                {metric.detail ? (
                  <span className="mt-2 block text-sm leading-relaxed text-muted">
                    {metric.detail[locale]}
                  </span>
                ) : null}
              </StaggerItem>
            ))}
          </Stagger>

          <Hairline className="my-16" />

          {/* Narrative */}
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {narrative.map((part, index) => (
                <Reveal key={part.label} delay={index * 0.05}>
                  <div className={index > 0 ? 'mt-12' : undefined}>
                    <h2 className="font-display text-2xl leading-snug sm:text-3xl">{part.label}</h2>
                    <p className="mt-5 text-lg leading-relaxed text-muted">{part.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <aside className="lg:col-span-4">
              <Reveal delay={0.12}>
                <Card className="p-7">
                  <h2 className="eyebrow">{t.stackLabel}</h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {study.stack.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            </aside>
          </div>

          {/* Before / after */}
          {study.comparison ? (
            <Reveal>
              <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
                <div className="bg-surface p-8">
                  <h2 className="eyebrow">{t.beforeLabel}</h2>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                    {study.comparison.before[locale]}
                  </p>
                </div>
                <div className="bg-background p-8">
                  <h2 className="eyebrow text-accent-strong">{t.afterLabel}</h2>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-foreground">
                    {study.comparison.after[locale]}
                  </p>
                </div>
              </div>
            </Reveal>
          ) : null}

          {/* Navigation */}
          <Hairline className="my-16" />
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={href(routes.portfolio, locale)}
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-foreground"
            >
              <ArrowLeft
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1"
              />
              {t.filterAll}
            </Link>

            {next ? (
              <Link
                href={href(routes.portfolioCase(next.slug), locale)}
                className="group inline-flex items-center gap-3 text-right"
              >
                <span>
                  <span className="block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted">
                    {t.nextCase}
                  </span>
                  <span className="mt-1 block font-display text-lg text-foreground transition-colors duration-300 group-hover:text-accent-strong">
                    {next.title[locale]}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-accent transition-transform duration-500 group-hover:translate-x-1"
                />
              </Link>
            ) : null}
          </div>
        </Container>
      </Section>
    </>
  )
}
