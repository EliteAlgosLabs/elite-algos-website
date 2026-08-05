import 'server-only'

import type { CaseStudy, Discipline, Post, Service, Solution, TeamMember } from './types'
import { services } from './data/services'
import { solutions } from './data/solutions'
import { caseStudies, SAMPLE_CONTENT_PRESENT } from './data/portfolio'
import { posts } from './data/insights'
import { team, authors, findAuthor } from './data/team'

/* ============================================================================
   CONTENT REPOSITORY
   ----------------------------------------------------------------------------
   Every page reads content through this interface — never by importing a data
   file directly. That single rule is what makes the storage decision reversible.

   Today the implementation is `inMemoryRepository`, backed by typed modules in
   `./data`. Content lives in Git: versioned, reviewable in pull requests, and
   deployed atomically with the code that renders it. For a site of this size
   that is strictly better than a database — there is no infrastructure to run,
   no migration to write, and no cold-start latency.

   When the volume justifies a database, write a `PostgresContentRepository`
   satisfying this same interface and change the export at the bottom of this
   file. No page, component or route handler changes. That is the entire point.

   Note the async signatures. Nothing here needs to be async today, but a
   database implementation will, and a synchronous interface would force every
   caller to change at exactly the moment we least want churn.
   ========================================================================== */

export interface ContentRepository {
  listServices(): Promise<Service[]>
  getService(slug: string): Promise<Service | null>

  listSolutions(options?: { featuredOnly?: boolean }): Promise<Solution[]>
  getSolution(slug: string): Promise<Solution | null>

  listCaseStudies(options?: {
    featuredOnly?: boolean
    discipline?: Discipline
    limit?: number
  }): Promise<CaseStudy[]>
  getCaseStudy(slug: string): Promise<CaseStudy | null>
  /** Disciplines that actually have published work, for the filter bar. */
  listDisciplines(): Promise<Discipline[]>
  /** The next case study in display order, for end-of-article navigation. */
  getAdjacentCaseStudy(slug: string): Promise<CaseStudy | null>

  listPosts(options?: { featuredOnly?: boolean; limit?: number }): Promise<Post[]>
  getPost(slug: string): Promise<Post | null>
  getRelatedPosts(slug: string, limit?: number): Promise<Post[]>

  listTeam(): Promise<TeamMember[]>

  /** Surfaced in the dashboard so sample content cannot be forgotten. */
  hasSampleContent(): Promise<boolean>
}

/** Published-only, newest first. Draft posts never leave the repository. */
function publishedPosts(): Post[] {
  return posts
    .filter((post) => post.status === 'published')
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
}

/** Featured first, then newest. Stable, so build output is deterministic. */
function orderedCaseStudies(): CaseStudy[] {
  return [...caseStudies].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    return b.year - a.year
  })
}

const inMemoryRepository: ContentRepository = {
  async listServices() {
    return services
  },

  async getService(slug) {
    return services.find((service) => service.slug === slug) ?? null
  },

  async listSolutions({ featuredOnly } = {}) {
    return featuredOnly ? solutions.filter((solution) => solution.featured) : solutions
  },

  async getSolution(slug) {
    return solutions.find((solution) => solution.slug === slug) ?? null
  },

  async listCaseStudies({ featuredOnly, discipline, limit } = {}) {
    let result = orderedCaseStudies()
    if (featuredOnly) result = result.filter((study) => study.featured)
    if (discipline) result = result.filter((study) => study.discipline === discipline)
    return typeof limit === 'number' ? result.slice(0, limit) : result
  },

  async getCaseStudy(slug) {
    return caseStudies.find((study) => study.slug === slug) ?? null
  },

  async listDisciplines() {
    // Set preserves insertion order, so the filter bar follows display order
    // rather than an arbitrary alphabetical one.
    return [...new Set(orderedCaseStudies().map((study) => study.discipline))]
  },

  async getAdjacentCaseStudy(slug) {
    const ordered = orderedCaseStudies()
    const index = ordered.findIndex((study) => study.slug === slug)
    if (index === -1 || ordered.length < 2) return null
    return ordered[(index + 1) % ordered.length]
  },

  async listPosts({ featuredOnly, limit } = {}) {
    let result = publishedPosts()
    if (featuredOnly) result = result.filter((post) => post.featured)
    return typeof limit === 'number' ? result.slice(0, limit) : result
  },

  async getPost(slug) {
    return publishedPosts().find((post) => post.slug === slug) ?? null
  },

  async getRelatedPosts(slug, limit = 2) {
    const current = publishedPosts().find((post) => post.slug === slug)
    if (!current) return []

    const currentTopics = new Set(current.topics.map((topic) => topic.en))

    // Rank by shared topics, fall back to recency. Deterministic either way.
    return publishedPosts()
      .filter((post) => post.slug !== slug)
      .map((post) => ({
        post,
        overlap: post.topics.filter((topic) => currentTopics.has(topic.en)).length,
      }))
      .sort((a, b) => b.overlap - a.overlap)
      .slice(0, limit)
      .map((entry) => entry.post)
  },

  async listTeam() {
    return team
  },

  async hasSampleContent() {
    return SAMPLE_CONTENT_PRESENT
  },
}

/**
 * The active repository.
 *
 * Swap this one binding to change where all content comes from.
 */
export const content: ContentRepository = inMemoryRepository

export { authors, findAuthor }
