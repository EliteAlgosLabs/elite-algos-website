import type { Author, TeamMember } from '../types'

/* ============================================================================
   TEAM
   ----------------------------------------------------------------------------
   Intentionally empty.

   Naming people on a public company website is a factual claim about who works
   here and what they are accountable for. Placeholder people would be a
   fabrication, and the About page is designed to read complete without a team
   grid — it falls back to the company's standards and registered facts.

   Add real members here and the grid appears automatically on /about and in the
   dashboard's Team module. No other change is required.
   ========================================================================== */

export const team: TeamMember[] = []

/**
 * Editorial bylines.
 *
 * Articles are published under the company's engineering byline rather than
 * invented individual authors. When named engineers join, add them here and set
 * `authorId` on the relevant posts.
 */
export const authors: Author[] = [
  {
    id: 'engineering',
    name: 'Elite Algos Labs Engineering',
    role: {
      en: 'Engineering team',
      fr: 'Équipe d’ingénierie',
    },
  },
]

export function findAuthor(id: string): Author | undefined {
  return authors.find((author) => author.id === id)
}
