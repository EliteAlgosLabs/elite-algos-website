import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/sections/page-hero'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/primitives'
import { AmbientField, Container, Section, SectionHeading } from '@/components/ui/layout'
import { Badge, Card } from '@/components/ui/card'
import { Mark } from '@/components/brand/mark'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { buildPageMetadata } from '@/lib/seo'
import { COMPANY } from '@/lib/brand'
import { cn } from '@/lib/utils'

export async function generateMetadata({ params }: PageProps<'/[locale]/careers'>): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return buildPageMetadata({
    locale,
    page: 'careers',
    dict,
    path: '/careers',
    // No roles are open yet. Indexing an empty careers page competes with the
    // pages that matter; this flips to indexable the moment listings exist.
    overrides: { noIndex: true },
  })
}

export default async function CareersPage({ params }: PageProps<'/[locale]/careers'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const dict = await getDictionary(locale)
  const t = dict.careers
  const traits = [t.what.traits.depth, t.what.traits.ownership, t.what.traits.clarity, t.what.traits.judgement]

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lead={t.hero.lead}>
        <div className="mt-8">
          <Badge tone="accent">
            <span
              aria-hidden="true"
              className="relative inline-flex h-1.5 w-1.5 items-center justify-center"
            >
              <span className="absolute inline-flex h-1.5 w-1.5 rounded-full bg-accent motion-safe:animate-[pulse-ring_2.4s_ease-out_infinite]" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {t.hero.badge}
          </Badge>
        </div>
      </PageHero>

      <Section spacing="tight">
        <Container>
          <SectionHeading eyebrow={t.what.eyebrow} title={t.what.title} lead={t.what.lead} />

          <Stagger className="mt-16 grid gap-6 sm:grid-cols-2">
            {traits.map((trait) => (
              <StaggerItem key={trait.title}>
                <Card className="h-full p-8">
                  <h3 className="font-sans text-lg font-semibold text-foreground">{trait.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{trait.body}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Register interest */}
      <Section className="relative overflow-hidden border-t border-border">
        <div aria-hidden="true" className="grid-field pointer-events-none absolute inset-0 opacity-60" />
        <AmbientField />
        <Mark className="pointer-events-none absolute -left-24 top-1/2 h-64 w-auto -translate-y-1/2 text-accent opacity-[0.04]" />

        <Container className="relative">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">{t.register.eyebrow}</p>
              <h2 className="mt-6 text-4xl leading-tight sm:text-5xl">{t.register.title}</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">{t.register.body}</p>

              <a
                href={`mailto:${COMPANY.email.founder}?subject=${encodeURIComponent(
                  locale === 'fr' ? 'Carrières' : 'Careers',
                )}`}
                className={cn(
                  'group mt-10 inline-flex h-13 items-center justify-center gap-2 rounded-full px-8',
                  'bg-foreground text-base font-medium text-background',
                  'transition-[background-color,color,transform] duration-500',
                  '[transition-timing-function:var(--ease-out-expo)]',
                  'hover:bg-accent-strong hover:text-accent-contrast active:translate-y-px',
                )}
              >
                {t.register.action}
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <p className="mt-5 font-mono text-xs tracking-[0.04em] text-muted">
                {t.register.note}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
