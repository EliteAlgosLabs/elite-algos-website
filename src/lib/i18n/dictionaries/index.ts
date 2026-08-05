import type { Locale } from '../config'
import type { Dictionary } from './en'

/**
 * Dictionaries are loaded through dynamic `import()` so each language is its own
 * chunk. A French visitor never downloads the English strings.
 *
 * Registering a new language is one line here.
 */
const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./en').then((m) => m.en),
  fr: () => import('./fr').then((m) => m.fr),
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]()
}

/**
 * The slice of the dictionary handed to Client Components.
 *
 * Kept deliberately narrow: everything here is serialised into the RSC payload
 * on every page. Server Components should call `getDictionary` instead of
 * reaching for the context.
 */
export type ClientDictionary = Pick<Dictionary, 'common' | 'nav'>

export function toClientDictionary(dict: Dictionary): ClientDictionary {
  return { common: dict.common, nav: dict.nav }
}

export type { Dictionary }
