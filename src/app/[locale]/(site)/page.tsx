import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Hero } from '@/components/sections/hero'
import {
  CtaSection,
  MissionSection,
  PhilosophySection,
  PortfolioPreviewSection,
  ServicesSection,
  SolutionsSection,
  WhySection,
} from '@/components/sections/home-sections'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { buildMetadata, organisationJsonLd } from '@/lib/seo'
import { content } from '@/lib/content/repository'

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return buildMetadata({ locale, page: 'home', dict, path: '/' })
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  // Fetched in parallel — these are independent reads and awaiting them in
  // sequence would serialise for no reason.
  const [dict, services, solutions, caseStudies] = await Promise.all([
    getDictionary(locale),
    content.listServices(),
    content.listSolutions({ featuredOnly: true }),
    content.listCaseStudies({ featuredOnly: true, limit: 3 }),
  ])

  return (
    <>
      {/* Organisation schema. Emitted once, on the home page only — repeating it
          on every route adds weight without adding signal. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organisationJsonLd(locale, dict)),
        }}
      />

      <Hero locale={locale} dict={dict} />
      <MissionSection dict={dict} />
      <ServicesSection locale={locale} dict={dict} services={services} />
      <WhySection dict={dict} />
      <PhilosophySection dict={dict} />
      <SolutionsSection locale={locale} dict={dict} solutions={solutions.slice(0, 4)} />
      <PortfolioPreviewSection locale={locale} dict={dict} caseStudies={caseStudies} />
      <CtaSection locale={locale} dict={dict} />
    </>
  )
}
