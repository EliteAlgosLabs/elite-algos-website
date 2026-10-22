/**
 * Site photography and footage, kept in one registry so swapping a file means
 * changing one line.
 *
 * Every file lives in `public/images/` or `public/video/` and is hosted here,
 * not hot-linked. All of it is free for commercial use. Sources, authors and
 * licences are listed in `public/images/CREDITS.md`. Update that file whenever
 * you add an asset.
 *
 * House style: places, architecture, light and hardware. No posed people and
 * no hands.
 */

export const IMAGES = {
  home: {
    /** Hero sequence, crossfaded. Put the first frame first: it is preloaded. */
    heroSlides: [
      '/images/hero-lightfield.jpg',
      '/images/hero-towers.jpg',
      '/images/kigali-convention-night.jpg',
      '/images/hero-waves.jpg',
    ] as const,
    mission: '/images/mission-circuit.jpg',
    whyVideo: { mp4: '/video/dusk-city.mp4', webm: '/video/dusk-city.webm', poster: '/images/dusk-city-poster.jpg' },
    whySecondary: '/images/why-desk.jpg',
    band: '/images/kigali-green.jpg',
    cta: '/images/cta-laptop.jpg',
  },
  pages: {
    services: '/images/hero-services.jpg',
    solutions: '/images/hero-solutions.jpg',
    about: '/images/kigali-convention-aerial.jpg',
    contact: '/images/hero-contact.jpg',
  },
  /** Keyed by content slug. A slug with no entry renders no photo. */
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
    'web-platforms': '/images/sol-network-cubes.jpg',
  } as Record<string, string>,
} as const
