/**
 * Elite Algos Labs — Brand constants.
 *
 * The geometry below is not decorative guesswork: it is a vector reconstruction
 * of the official mark, derived by measuring the master raster asset
 * (`Brand/photo_6`). Measurements taken from that file:
 *
 *   • Outer bounding box ... 758 x 345 px  (ratio 2.1971 -> normalised to 220x100)
 *   • Stroke weight ........ 50 px uniform (-> 14.5 units)
 *   • Diagonals ............ exactly 45 deg, crossing at the exact centre point
 *   • Vertex ............... both rings terminate at the centre (110, 50)
 *
 * The mark is therefore two congruent pentagonal rings, mirrored on the vertical
 * axis, each pointing inward, rendered as *stroked* paths with mitre joins. This
 * keeps the band weight perfectly uniform at any scale and means the whole
 * identity is a single pair of paths — no fills, no compound outlines, no
 * flattening artefacts.
 *
 * Do not "clean up" these numbers. They are measured, not chosen.
 */

export const MARK_GEOMETRY = {
  viewBox: '0 0 220 100',
  width: 220,
  height: 100,
  strokeWidth: 14.5,
  /** Left ring: pentagon pointing right, vertex at centre. */
  left: 'M 7.25 7.25 L 67.25 7.25 L 110 50 L 67.25 92.75 L 7.25 92.75 Z',
  /** Right ring: exact mirror of `left` across x = 110. */
  right: 'M 212.75 7.25 L 152.75 7.25 L 110 50 L 152.75 92.75 L 212.75 92.75 Z',
} as const

export const COMPANY = {
  legalName: 'Elite Algos Labs LTD',
  shortName: 'Elite Algos Labs',
  incorporationNumber: '12997849',
  domain: 'elitealgoslabs.com',
  url: 'https://elitealgoslabs.com',
  email: {
    founder: 'founder@elitealgoslabs.com',
    business: 'hello@elitealgoslabs.com',
    general: 'info@elitealgoslabs.com',
  },
  github: {
    org: 'EliteAlgosLabs',
    url: 'https://github.com/EliteAlgosLabs',
  },
} as const

/**
 * Canonical brand palette. Mirrors the `@theme` block in `globals.css`.
 * Exported for use in places CSS variables cannot reach: OG image generation,
 * canvas/WebGL, e-mail templates, and `theme-color` meta tags.
 */
export const PALETTE = {
  gold: {
    50: '#FBF6EA',
    100: '#F5EAD1',
    200: '#EBD9AE',
    300: '#DFC489',
    400: '#D2AF6D',
    /** The mark gold, sampled directly from the master asset. */
    500: '#C6A664',
    600: '#A9853F',
    700: '#8A6A2F',
    800: '#6B5124',
    900: '#4E3B1B',
    950: '#2E2210',
  },
  light: {
    background: '#FBF9F5',
    surface: '#F4F0E8',
    elevated: '#FFFFFF',
    text: '#1A1815',
    muted: '#6B6459',
    border: '#E4DDD0',
    accent: '#A9853F',
  },
  dark: {
    background: '#121110',
    surface: '#1A1917',
    elevated: '#232120',
    text: '#F5F2EC',
    muted: '#9A9287',
    border: '#2E2B27',
    accent: '#E3CE9F',
  },
} as const
