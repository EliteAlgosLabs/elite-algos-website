/**
 * Site photography: one registry so a swap is a one-line change.
 *
 * Every file lives in `public/images/`, is self-hosted (no hot-linking), and is
 * free for commercial use. Sources and licences are listed in
 * `public/images/CREDITS.md`. Keep that file in step when adding a photo.
 *
 * House style: places, desks, screens and hardware. No posed people. Hands at
 * work are fine.
 */

export const IMAGES = {
  home: {
    hero: '/images/hero-office.jpg',
    heroInset: '/images/hero-dashboard.jpg',
    mission: '/images/mission-circuit.jpg',
    whyPrimary: '/images/why-planning.jpg',
    whySecondary: '/images/why-desk.jpg',
    band: '/images/band-towers.jpg',
    cta: '/images/cta-laptop.jpg',
  },
  pages: {
    services: '/images/hero-services.jpg',
    solutions: '/images/hero-solutions.jpg',
    about: '/images/kigali-skyline.jpg',
    contact: '/images/hero-contact.jpg',
  },
  /** Keyed by content slug. A slug with no entry simply renders no photo. */
  services: {
    'ai-consulting': '/images/svc-consulting.jpg',
    'custom-platforms': '/images/svc-platforms.jpg',
    integration: '/images/svc-integration.jpg',
    'cloud-infrastructure': '/images/svc-cloud.jpg',
  } as Record<string, string>,
  solutions: {
    'autonomous-agents': '/images/sol-agents.jpg',
    'document-intelligence': '/images/sol-documents.jpg',
    'enterprise-automation': '/images/sol-automation.jpg',
    'private-deployments': '/images/sol-private.jpg',
    'data-intelligence': '/images/sol-data.jpg',
    'web-platforms': '/images/sol-web.jpg',
  } as Record<string, string>,
} as const
