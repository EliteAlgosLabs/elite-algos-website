import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/sections/page-hero'
import { CtaSection } from '@/components/sections/home-sections'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/primitives'
import { Container, Hairline, Section, SectionHeading } from '@/components/ui/layout'
import { Card } from '@/components/ui/card'
import { Mark } from '@/components/brand/mark'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { buildPageMetadata } from '@/lib/seo'
import { content } from '@/lib/content/repository'
import { COMPANY } from '@/lib/brand'

export async function generateMetadata({ params }: PageProps<'/[locale]/about'>): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return buildPageMetadata({ locale, page: 'about', dict, path: '/about' })
}

export default async function AboutPage({ params }: PageProps<'/[locale]/about'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [dict, team] = await Promise.all([getDictionary(locale), content.listTeam()])
  const t = dict.about

  const principles = [
    dict.home.philosophy.principles.one,
    dict.home.philosophy.principles.two,
    dict.home.philosophy.principles.three,
    dict.home.philosophy.principles.four,
    dict.home.philosophy.principles.five,
  ]

  const facts = [
    { term: t.numbers.incorporation, value: COMPANY.incorporationNumber },
    { term: t.numbers.founded, value: t.numbers.foundedValue },
    { term: t.numbers.jurisdiction, value: t.numbers.jurisdictionValue },
    { term: t.numbers.reach, value: t.numbers.reachValue },
    { term: t.numbers.languages, value: t.numbers.languagesValue },
  ]

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lead={t.hero.lead} />

      {/* Story */}
      <Section spacing="tight">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="eyebrow">{t.story.eyebrow}</h2>
                <p className="mt-6 font-display text-3xl leading-tight sm:text-4xl">
                  {t.story.title}
                </p>
              </Reveal>
            </div>
            <div className="space-y-6 lg:col-span-7">
              <Reveal delay={0.08}>
                <p className="text-lg leading-relaxed text-muted">{t.story.body1}</p>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="text-lg leading-relaxed text-muted">{t.story.body2}</p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Registered facts */}
      <Section tone="surface" spacing="tight">
        <Container>
          <Reveal>
            <h2 className="eyebrow">{t.numbers.eyebrow}</h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {facts.map((fact) => (
              <StaggerItem key={fact.term}>
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted">
                  {fact.term}
                </dt>
                <dd className="mt-3 font-display text-xl leading-snug text-foreground">
                  {fact.value}
                </dd>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Standards */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow={t.principles.eyebrow}
            title={t.principles.title}
            lead={t.principles.lead}
          />
          <div className="mt-16">
            {principles.map((principle, index) => (
              <Reveal key={principle.index} delay={index * 0.04}>
                <article className="grid gap-4 border-t border-border py-9 md:grid-cols-12 md:gap-8">
                  <span className="font-mono text-sm tracking-[0.1em] text-accent-strong md:col-span-2">
                    {principle.index}
                  </span>
                  <h3 className="font-display text-2xl leading-snug md:col-span-4">
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

      {/*
        Team grid renders only when there are real people to name. The section
        is omitted entirely rather than showing placeholder cards — inventing
        colleagues on a company website is a factual claim we will not make.
      */}
      {team.length > 0 ? (
        <Section tone="surface">
          <Container>
            <SectionHeading eyebrow={t.team.eyebrow} title={t.team.title} lead={t.team.lead} />
            <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <StaggerItem key={member.id}>
                  <Card className="flex h-full flex-col p-7">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background font-display text-lg text-accent-strong"
                    >
                      {member.initials}
                    </span>
                    <h3 className="mt-5 font-sans text-lg font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-accent-strong">{member.role[locale]}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {member.focus[locale]}
                    </p>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      ) : null}

      {/* Seal */}
      <Section spacing="tight" className="border-t border-border">
        <Container>
          <Reveal>
            <div className="flex flex-col items-center gap-6 text-center">
              <Mark variant="gradient" idSuffix="about-seal" className="h-10 w-auto" />
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-muted">
                {dict.common.sealMotto}
              </p>
              <p className="max-w-md font-display text-xl italic leading-snug text-foreground">
                {dict.common.tagline}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaSection locale={locale} dict={dict} />
    </>
  )
}
