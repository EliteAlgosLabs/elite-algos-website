import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/primitives'
import {
  AmbientField,
  Container,
  Eyebrow,
  Hairline,
  Section,
  SectionHeading,
} from '@/components/ui/layout'
import { Card, LinkCard } from '@/components/ui/card'
import { IconTile } from '@/components/ui/icon'
import { Mark } from '@/components/brand/mark'
import { href, routes } from '@/lib/i18n/routes'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import type { CaseStudy, Service, Solution } from '@/lib/content/types'
import { cn } from '@/lib/utils'

/* ========================================================================== */
/* MISSION                                                                    */
/* ========================================================================== */

export function MissionSection({ dict }: { dict: Dictionary }) {
  const t = dict.home.mission
  const pillars = [t.pillars.precision, t.pillars.trust, t.pillars.longevity]

  return (
    <Section tone="surface">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>{t.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 text-4xl leading-[1.1] sm:text-5xl">{t.title}</h2>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.12}>
              <p className="text-lg leading-relaxed text-muted sm:text-xl">{t.body}</p>
            </Reveal>

            <Stagger className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
              {pillars.map((pillar) => (
                <StaggerItem key={pillar.title} className="bg-background p-7">
                  <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.1em] text-accent-strong">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{pillar.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/* SERVICES                                                                   */
/* ========================================================================== */

export function ServicesSection({
  locale,
  dict,
  services,
}: {
  locale: Locale
  dict: Dictionary
  services: Service[]
}) {
  const t = dict.home.services

  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          <Reveal delay={0.18}>
            <ArrowLink href={href(routes.services, locale)}>{t.cta}</ArrowLink>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <Card className="h-full p-8">
                <div className="flex items-start gap-5">
                  <IconTile name={service.icon} />
                  <div>
                    <h3 className="font-sans text-lg font-semibold leading-snug text-foreground">
                      {service.title[locale]}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                      {service.summary[locale]}
                    </p>
                    <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent-strong">
                      {service.timeline[locale]}
                    </p>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/* WHY                                                                        */
/* ========================================================================== */

export function WhySection({ dict }: { dict: Dictionary }) {
  const t = dict.home.why
  const points = [t.points.seniority, t.points.ownership, t.points.measurement, t.points.sovereignty]

  return (
    <Section tone="surface">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

        <Stagger className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {points.map((point, index) => (
            <StaggerItem key={point.title}>
              <div className="flex gap-5">
                <span className="font-mono text-xs leading-relaxed text-accent-strong">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-sans text-lg font-semibold text-foreground">{point.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{point.body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/* PHILOSOPHY                                                                 */
/* ========================================================================== */

export function PhilosophySection({ dict }: { dict: Dictionary }) {
  const t = dict.home.philosophy
  const principles = [
    t.principles.one,
    t.principles.two,
    t.principles.three,
    t.principles.four,
    t.principles.five,
  ]

  return (
    <Section className="relative overflow-hidden">
      <AmbientField intensity="subtle" />
      <Container className="relative">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

        <div className="mt-16">
          {principles.map((principle, index) => (
            <Reveal key={principle.index} delay={index * 0.04}>
              <article className="group grid gap-4 border-t border-border py-9 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-2">
                  <span
                    className={cn(
                      'font-mono text-sm tracking-[0.1em] text-muted',
                      'transition-colors duration-500 group-hover:text-accent-strong',
                    )}
                  >
                    {principle.index}
                  </span>
                </div>
                <h3 className="font-display text-2xl leading-snug md:col-span-4 sm:text-[1.75rem]">
                  {principle.title}
                </h3>
                <p className="text-[0.9375rem] leading-relaxed text-muted md:col-span-6">
                  {principle.body}
                </p>
              </article>
            </Reveal>
          ))}
          <Hairline />
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/* FEATURED SOLUTIONS                                                         */
/* ========================================================================== */

export function SolutionsSection({
  locale,
  dict,
  solutions,
}: {
  locale: Locale
  dict: Dictionary
  solutions: Solution[]
}) {
  const t = dict.home.solutions

  return (
    <Section tone="surface">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          <Reveal delay={0.18}>
            <ArrowLink href={href(routes.solutions, locale)}>{t.cta}</ArrowLink>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid gap-6 lg:grid-cols-2">
          {solutions.map((solution) => (
            <StaggerItem key={solution.slug}>
              <LinkCard
                href={`${href(routes.solutions, locale)}#${solution.slug}`}
                label={solution.title[locale]}
                className="h-full p-8"
              >
                <IconTile name={solution.icon} />
                <h3 className="mt-6 font-sans text-lg font-semibold text-foreground">
                  {solution.title[locale]}
                </h3>
                <p className="mt-2 font-display text-lg italic leading-snug text-accent-strong">
                  {solution.tagline[locale]}
                </p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                  {solution.description[locale]}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {solution.stack.slice(0, 4).map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </LinkCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/* PORTFOLIO PREVIEW                                                          */
/* ========================================================================== */

export function PortfolioPreviewSection({
  locale,
  dict,
  caseStudies,
}: {
  locale: Locale
  dict: Dictionary
  caseStudies: (CaseStudy & { sample?: true })[]
}) {
  const t = dict.home.portfolio

  if (caseStudies.length === 0) return null

  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          <Reveal delay={0.18}>
            <ArrowLink href={href(routes.portfolio, locale)}>{t.cta}</ArrowLink>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <StaggerItem key={study.slug}>
              <LinkCard
                href={href(routes.portfolioCase(study.slug), locale)}
                label={study.title[locale]}
                className="flex h-full flex-col p-8"
              >
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted">
                  {study.sector[locale]} · {study.year}
                </span>
                <h3 className="mt-4 font-display text-2xl leading-snug">{study.title[locale]}</h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                  {study.summary[locale]}
                </p>
                <div className="mt-7 border-t border-border pt-5">
                  <span className="font-display text-3xl text-brushed">
                    {study.metrics[0]?.value[locale]}
                  </span>
                  <p className="mt-1 text-xs text-muted">{study.metrics[0]?.label[locale]}</p>
                </div>
              </LinkCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/* CLOSING CTA                                                                */
/* ========================================================================== */

export function CtaSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.home.cta

  return (
    <Section className="relative overflow-hidden border-t border-border" spacing="loose">
      <div aria-hidden="true" className="grid-field pointer-events-none absolute inset-0 opacity-60" />
      <AmbientField />
      <Mark className="pointer-events-none absolute -right-20 top-1/2 h-72 w-auto -translate-y-1/2 text-accent opacity-[0.04]" />

      <Container className="relative">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>{t.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-7 text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.05]">{t.title}</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 text-lg leading-relaxed text-muted sm:text-xl">{t.body}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={href(routes.contact, locale)}
                className={cn(
                  'group inline-flex h-13 items-center justify-center gap-2 rounded-full px-8',
                  'bg-foreground text-base font-medium text-background',
                  'transition-[background-color,color,transform] duration-500',
                  '[transition-timing-function:var(--ease-out-expo)]',
                  'hover:bg-accent-strong hover:text-accent-contrast active:translate-y-px',
                )}
              >
                {t.primary}
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <a
                href={`mailto:${t.secondary}`}
                className="inline-flex h-13 items-center justify-center px-2 font-mono text-sm tracking-[0.04em] text-muted transition-colors duration-300 hover:text-accent-strong"
              >
                {t.secondary}
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */
/* SHARED                                                                     */
/* ========================================================================== */

/** Text link with an arrow that slides on hover. Used for every "view all". */
export function ArrowLink({
  href: to,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={to}
      className={cn(
        'group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-foreground',
        'transition-colors duration-300 hover:text-accent-strong',
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1"
      />
    </Link>
  )
}
