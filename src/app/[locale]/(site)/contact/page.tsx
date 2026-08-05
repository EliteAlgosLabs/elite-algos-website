import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/sections/page-hero'
import { ContactForm } from '@/components/sections/contact-form'
import { Reveal } from '@/components/motion/primitives'
import { Container, Hairline, Section } from '@/components/ui/layout'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale } from '@/lib/i18n/config'
import { buildPageMetadata } from '@/lib/seo'
import { COMPANY } from '@/lib/brand'

export async function generateMetadata({ params }: PageProps<'/[locale]/contact'>): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return buildPageMetadata({ locale, page: 'contact', dict, path: '/contact' })
}

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const dict = await getDictionary(locale)
  const t = dict.contact

  const channels = [
    { ...t.channels.business, email: COMPANY.email.business },
    { ...t.channels.general, email: COMPANY.email.general },
    { ...t.channels.founder, email: COMPANY.email.founder },
  ]

  const steps = [t.response.steps.one, t.response.steps.two, t.response.steps.three]

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lead={t.hero.lead} />

      <Section spacing="tight">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Channels */}
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="eyebrow">{t.channels.title}</h2>
                <ul className="mt-6 space-y-px overflow-hidden rounded-2xl border border-border bg-border">
                  {channels.map((channel) => (
                    <li key={channel.email} className="bg-background">
                      <a
                        href={`mailto:${channel.email}`}
                        className="group flex items-start justify-between gap-4 p-6 transition-colors duration-300 hover:bg-surface"
                      >
                        <span>
                          <span className="block text-[0.9375rem] font-medium text-foreground">
                            {channel.label}
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-muted">
                            {channel.description}
                          </span>
                          <span className="mt-3 block font-mono text-[0.8125rem] tracking-[0.02em] text-accent-strong">
                            {channel.email}
                          </span>
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="mt-1 h-4 w-4 shrink-0 text-muted transition-[transform,color] duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1}>
                <Hairline className="my-10" />
                <h2 className="eyebrow">{t.response.title}</h2>
                <ol className="mt-6 space-y-5">
                  {steps.map((step, index) => (
                    <li key={step} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border font-mono text-[0.625rem] text-accent-strong"
                      >
                        {index + 1}
                      </span>
                      <span className="text-[0.9375rem] leading-relaxed text-muted">{step}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <Reveal delay={0.08}>
                <ContactForm dict={dict} />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
