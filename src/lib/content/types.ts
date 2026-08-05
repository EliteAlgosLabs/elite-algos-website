import type { Locale } from '../i18n/config'

/**
 * A string that exists in every supported language.
 *
 * `Record<Locale, string>` means adding a language turns every piece of content
 * missing that translation into a compile error — the same enforcement the UI
 * dictionaries get, extended to editorial content.
 */
export type Localised = Record<Locale, string>

/** A list that exists in every supported language. */
export type LocalisedList = Record<Locale, string[]>

export function pick(value: Localised, locale: Locale): string {
  return value[locale]
}

export function pickList(value: LocalisedList, locale: Locale): string[] {
  return value[locale]
}

/* ========================================================================== */

/** Icon names are validated against lucide-react's export map at the call site. */
export type IconName =
  | 'Bot'
  | 'ScanText'
  | 'Workflow'
  | 'ShieldCheck'
  | 'Database'
  | 'Cloud'
  | 'Layers'
  | 'Compass'
  | 'Cpu'
  | 'GitBranch'
  | 'LineChart'
  | 'Blocks'

export type Service = {
  slug: string
  icon: IconName
  title: Localised
  summary: Localised
  includes: LocalisedList
  deliverable: Localised
  timeline: Localised
}

export type Solution = {
  slug: string
  icon: IconName
  title: Localised
  tagline: Localised
  description: Localised
  capabilities: LocalisedList
  outcomes: LocalisedList
  stack: string[]
  featured: boolean
}

export type CaseStudyMetric = {
  value: Localised
  label: Localised
  detail?: Localised
}

export type CaseStudy = {
  slug: string
  title: Localised
  client: Localised
  /** True when the client cannot be named; the UI shows a confidentiality note. */
  confidential: boolean
  sector: Localised
  discipline: Discipline
  year: number
  duration: Localised
  summary: Localised
  challenge: Localised
  approach: Localised
  outcome: Localised
  metrics: CaseStudyMetric[]
  /** Optional before/after pair for process-transformation work. */
  comparison?: {
    before: Localised
    after: Localised
  }
  stack: string[]
  featured: boolean
  /** Reserved for media once assets exist; the UI renders a brand plate when empty. */
  media?: {
    kind: 'image' | 'video'
    src: string
    poster?: string
    alt: Localised
  }[]
}

export type Discipline =
  | 'ai-agents'
  | 'document-intelligence'
  | 'automation'
  | 'platform'
  | 'infrastructure'

/**
 * Article bodies are structured blocks rather than raw HTML or MDX.
 *
 * Three reasons this is the right shape for a bilingual site:
 *   • Every block renders through one typed component, so English and French
 *     articles cannot drift apart visually.
 *   • No `dangerouslySetInnerHTML` anywhere in the codebase.
 *   • A future CMS or database maps onto this cleanly; MDX would not.
 */
export type Block =
  | { type: 'paragraph'; text: Localised }
  | { type: 'heading'; text: Localised; id: string }
  | { type: 'list'; items: LocalisedList; ordered?: boolean }
  | { type: 'quote'; text: Localised; attribution?: Localised }
  | { type: 'code'; code: string; language: string; caption?: Localised }
  | { type: 'callout'; text: Localised; tone: 'note' | 'warning' }

export type Author = {
  id: string
  name: string
  role: Localised
}

export type Post = {
  slug: string
  title: Localised
  excerpt: Localised
  body: Block[]
  authorId: string
  publishedAt: string
  updatedAt?: string
  topics: Localised[]
  readingMinutes: number
  featured: boolean
  status: 'draft' | 'published'
}

export type TeamMember = {
  id: string
  name: string
  role: Localised
  focus: Localised
  /** Initials are rendered when no portrait has been supplied. */
  initials: string
  email?: string
}
