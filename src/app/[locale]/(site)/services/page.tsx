import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/page-hero'
import { CtaSection } from '@/components/sections/home-sections'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/primitives'
import { Container, Hairline, Section, SectionHeading } from '@/components/ui/layout'
import { Card } from '@/components/ui/card'
import { IconTile } from '@/components/ui/icon'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { buildPageMetadata } from '@/lib/seo'
import { content } from '@/lib/content/repository'

export async function generateMetadata({ params }: PageProps<'/[locale]/services'>): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return buildPageMetadata({ locale, page: 'services', dict, path: '/services' })
}

export default async function ServicesPage({ params }: PageProps<'/[locale]/services'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [dict, services] = await Promise.all([getDictionary(locale), content.listServices()])
  const t = dict.services
  const steps = [
    t.process.steps.one,
    t.process.steps.two,
    t.process.steps.three,
    t.process.steps.four,
    t.process.steps.five,
  ]

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lead={t.hero.lead} />

      <Section spacing="tight">
        <Container>
          <Stagger className="grid gap-6 lg:grid-cols-2">
            {services.map((service) => (
              <StaggerItem key={service.slug}>
                <Card className="flex h-full flex-col p-8 sm:p-10">
                  <div className="flex items-center gap-4">
                    <IconTile name={service.icon} />
                    <h2 className="font-sans text-xl font-semibold leading-snug text-foreground">
                      {service.title[locale]}
                    </h2>
                  </div>

                  <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted">
                    {service.summary[locale]}
                  </p>

                  <div className="mt-8">
                    <h3 className="eyebrow">{t.includesLabel}</h3>
                    <ul className="mt-4 space-y-3">
                      {service.includes[locale].map((item) => (
                        <li key={item} className="flex gap-3">
                          <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          <span className="text-sm leading-relaxed text-muted">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-8">
                    <Hairline />
                    <div className="mt-6 space-y-5">
                      <div>
                        <h3 className="eyebrow">{t.deliverableLabel}</h3>
                        <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-foreground">
                          {service.deliverable[locale]}
                        </p>
                      </div>
                      <div>
                        <h3 className="eyebrow">{t.timelineLabel}</h3>
                        <p className="mt-2 font-mono text-sm tracking-[0.04em] text-accent-strong">
                          {service.timeline[locale]}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Process */}
      <Section tone="surface">
        <Container>
          <SectionHeading
            eyebrow={t.process.eyebrow}
            title={t.process.title}
            lead={t.process.lead}
          />

          <ol className="mt-16">
            {steps.map((step, index) => (
              <Reveal key={step.index} delay={index * 0.04} as="li">
                <div className="group grid gap-4 border-t border-border py-9 md:grid-cols-12 md:gap-8">
                  <div className="flex items-baseline gap-4 md:col-span-3">
                    <span className="font-mono text-sm tracking-[0.1em] text-accent-strong">
                      {step.index}
                    </span>
                    <h3 className="font-display text-2xl leading-snug">{step.title}</h3>
                  </div>
                  <p className="text-[0.9375rem] leading-relaxed text-muted md:col-span-9">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Hairline />
        </Container>
      </Section>

      <CtaSection locale={locale} dict={dict} />
    </>
  )
}
