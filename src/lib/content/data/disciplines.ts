import type { Discipline, Localised } from '../types'

/**
 * Display labels for the portfolio filter.
 *
 * A `Record<Discipline, …>` rather than a lookup with a fallback: adding a
 * discipline to the union without labelling it in both languages is a compile
 * error, which is exactly the failure mode we want at build time rather than a
 * blank filter chip in production.
 */
export const disciplineLabels: Record<Discipline, Localised> = {
  'ai-agents': { en: 'AI agents', fr: 'Agents IA' },
  'document-intelligence': {
    en: 'Document intelligence',
    fr: 'Intelligence documentaire',
  },
  automation: { en: 'Automation', fr: 'Automatisation' },
  platform: { en: 'Platforms', fr: 'Plateformes' },
  infrastructure: { en: 'Infrastructure', fr: 'Infrastructure' },
}
