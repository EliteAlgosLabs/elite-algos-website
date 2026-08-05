'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { LinkCard } from '@/components/ui/card'
import { Badge } from '@/components/ui/card'
import { href, routes } from '@/lib/i18n/routes'
import type { Locale } from '@/lib/i18n/config'
import type { CaseStudy, Discipline, Localised } from '@/lib/content/types'
import { cn } from '@/lib/utils'

type Labels = {
  filterAll: string
  filterLabel: string
  empty: string
  confidential: string
  sampleBadge: string
}

/**
 * Filterable portfolio grid.
 *
 * A Client Component only because filtering is interactive. The case-study data
 * is passed in already resolved by the server, so no content fetching happens on
 * the client and the initial HTML contains every card — the grid is fully
 * indexable and works with JavaScript disabled, just without the filter.
 */
export function PortfolioGrid({
  locale,
  caseStudies,
  disciplines,
  disciplineLabels,
  labels,
}: {
  locale: Locale
  caseStudies: (CaseStudy & { sample?: true })[]
  disciplines: Discipline[]
  disciplineLabels: Record<Discipline, Localised>
  labels: Labels
}) {
  const [active, setActive] = useState<Discipline | 'all'>('all')
  const reduced = useReducedMotion()

  const filtered = useMemo(
    () =>
      active === 'all'
        ? caseStudies
        : caseStudies.filter((study) => study.discipline === active),
    [active, caseStudies],
  )

  const filters: Array<{ key: Discipline | 'all'; label: string }> = [
    { key: 'all', label: labels.filterAll },
    ...disciplines.map((discipline) => ({
      key: discipline,
      label: disciplineLabels[discipline][locale],
    })),
  ]

  return (
    <div>
      <div role="group" aria-label={labels.filterLabel} className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const selected = active === filter.key
          return (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActive(filter.key)}
              aria-pressed={selected}
              className={cn(
                'h-9 rounded-full border px-4 text-sm transition-colors duration-300',
                selected
                  ? 'border-accent bg-accent/10 text-accent-strong'
                  : 'border-border text-muted hover:border-accent/40 hover:text-foreground',
              )}
            >
              {filter.label}
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-muted">{labels.empty}</p>
      ) : (
        <motion.ul layout={!reduced} className="mt-12 grid gap-6 lg:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((study) => (
              <motion.li
                key={study.slug}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <LinkCard
                  href={href(routes.portfolioCase(study.slug), locale)}
                  label={study.title[locale]}
                  className="flex h-full flex-col p-8 sm:p-10"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="accent">{disciplineLabels[study.discipline][locale]}</Badge>
                    {study.confidential ? <Badge>{labels.confidential}</Badge> : null}
                    {study.sample ? <Badge tone="warning">{labels.sampleBadge}</Badge> : null}
                  </div>

                  <h2 className="mt-6 font-display text-[1.75rem] leading-tight sm:text-3xl">
                    {study.title[locale]}
                  </h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                    {study.summary[locale]}
                  </p>

                  <dl className="mt-auto grid grid-cols-3 gap-4 border-t border-border pt-7 sm:gap-6">
                    {study.metrics.slice(0, 3).map((metric) => (
                      <div key={metric.label[locale]}>
                        <dt className="sr-only">{metric.label[locale]}</dt>
                        <dd>
                          <span className="block font-display text-2xl leading-none text-brushed">
                            {metric.value[locale]}
                          </span>
                          <span className="mt-2 block text-xs leading-snug text-muted">
                            {metric.label[locale]}
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </LinkCard>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  )
}
