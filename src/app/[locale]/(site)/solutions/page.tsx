import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/page-hero'
import { CtaSection } from '@/components/sections/home-sections'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/primitives'
import { Container, Hairline, Section } from '@/components/ui/layout'
import { IconTile } from '@/components/ui/icon'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { buildPageMetadata } from '@/lib/seo'
import { content } from '@/lib/content/repository'

export async function generateMetadata({ params }: PageProps<'/[locale]/solutions'>): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return buildPageMetadata({ locale, page: 'solutions', dict, path: '/solutions' })
}

export default async function SolutionsPage({ params }: PageProps<'/[locale]/solutions'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [dict, solutions] = await Promise.all([getDictionary(locale), content.listSolutions()])
  const t = dict.solutions

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lead={t.hero.lead} />

      <Section spacing="tight">
        <Container>
          {solutions.map((solution, index) => (
            // `scroll-mt` clears the fixed header when linked from the home page.
            <article key={solution.slug} id={solution.slug} className="scroll-mt-28">
              {index > 0 ? <Hairline className="my-16 sm:my-20" /> : null}

              <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-5">
                  <Reveal>
                    <IconTile name={solution.icon} />
                    <h2 className="mt-7 text-3xl leading-tight sm:text-4xl">
                      {solution.title[locale]}
                    </h2>
                    <p className="mt-4 font-display text-xl italic leading-snug text-accent-strong">
                      {solution.tagline[locale]}
                    </p>
                    <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted">
                      {solution.description[locale]}
                    </p>
                  </Reveal>

                  <Reveal delay={0.1}>
                    <div className="mt-8">
                      <h3 className="eyebrow">{t.stackLabel}</h3>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {solution.stack.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-border px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>

                <div className="grid gap-10 lg:col-span-7 sm:grid-cols-2 lg:gap-8">
                  <div>
                    <h3 className="eyebrow">{t.capabilitiesLabel}</h3>
                    <Stagger as="ul" className="mt-5 space-y-3.5">
                      {solution.capabilities[locale].map((capability) => (
                        <StaggerItem as="li" key={capability} className="flex gap-3">
                          <Check
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                          />
                          <span className="text-[0.9375rem] leading-relaxed text-muted">
                            {capability}
                          </span>
                        </StaggerItem>
                      ))}
                    </Stagger>
                  </div>

                  <div>
                    <h3 className="eyebrow">{t.outcomesLabel}</h3>
                    <Stagger as="ul" className="mt-5 space-y-4" delay={0.1}>
                      {solution.outcomes[locale].map((outcome) => (
                        <StaggerItem
                          as="li"
                          key={outcome}
                          className="border-l border-accent/40 pl-4 text-[0.9375rem] leading-relaxed text-foreground"
                        >
                          {outcome}
                        </StaggerItem>
                      ))}
                    </Stagger>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </Container>
      </Section>

      <CtaSection locale={locale} dict={dict} />
    </>
  )
}
