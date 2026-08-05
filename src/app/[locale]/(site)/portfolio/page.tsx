import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AlertTriangle } from 'lucide-react'
import { PageHero } from '@/components/sections/page-hero'
import { PortfolioGrid } from '@/components/sections/portfolio-grid'
import { CtaSection } from '@/components/sections/home-sections'
import { Container, Section } from '@/components/ui/layout'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { buildPageMetadata } from '@/lib/seo'
import { content } from '@/lib/content/repository'
import { disciplineLabels } from '@/lib/content/data/disciplines'

export async function generateMetadata({ params }: PageProps<'/[locale]/portfolio'>): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return buildPageMetadata({ locale, page: 'portfolio', dict, path: '/portfolio' })
}

export default async function PortfolioPage({ params }: PageProps<'/[locale]/portfolio'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [dict, caseStudies, disciplines, hasSamples] = await Promise.all([
    getDictionary(locale),
    content.listCaseStudies(),
    content.listDisciplines(),
    content.hasSampleContent(),
  ])
  const t = dict.portfolio

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lead={t.hero.lead} />

      <Section spacing="tight">
        <Container>
          {/*
            Visible while any case study is still flagged `sample: true`.
            Deliberately rendered in production, not just development: sample
            work must never be mistaken for a client reference. It disappears
            on its own once the flags are removed from the data.
          */}
          {hasSamples ? (
            <div className="mb-12 flex gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
              <AlertTriangle
                aria-hidden="true"
                className="mt-0.5 h-4.5 w-4.5 shrink-0 text-amber-600 dark:text-amber-400"
              />
              <p className="text-sm leading-relaxed text-foreground">
                {locale === 'fr'
                  ? 'Ces études de cas sont des exemples structurels destinés à valider la mise en page. Elles décrivent des missions plausibles et non des travaux livrés, et doivent être remplacées par des projets réels avant la mise en ligne publique.'
                  : 'These case studies are structural samples used to validate the layout. They describe plausible engagements rather than delivered work, and must be replaced with real projects before public launch.'}
              </p>
            </div>
          ) : null}

          <PortfolioGrid
            locale={locale}
            caseStudies={caseStudies}
            disciplines={disciplines}
            disciplineLabels={disciplineLabels}
            labels={{
              filterAll: t.filterAll,
              filterLabel: t.filterLabel,
              empty: t.empty,
              confidential: t.confidential,
              sampleBadge: locale === 'fr' ? 'Exemple' : 'Sample',
            }}
          />
        </Container>
      </Section>

      <CtaSection locale={locale} dict={dict} />
    </>
  )
}
