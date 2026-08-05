'use client'

import { useSyncExternalStore } from 'react'

/**
 * True once the page has scrolled past `threshold` pixels.
 *
 * Scroll position is an external store, so it is read through
 * `useSyncExternalStore` rather than mirrored into state inside an effect. That
 * avoids the extra render an effect would cause on every mount, and gives a
 * correct value on the very first client render — including when the browser
 * restores a scroll position on reload, which a scroll *listener* alone would
 * miss until the visitor moved.
 */
export function useScrolled(threshold = 24): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    // The server has no scroll position; the header starts transparent.
    () => false,
  )
}

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener('scroll', onStoreChange, { passive: true })
  // A resize can change document height and therefore the scroll position.
  window.addEventListener('resize', onStoreChange, { passive: true })
  return () => {
    window.removeEventListener('scroll', onStoreChange)
    window.removeEventListener('resize', onStoreChange)
  }
}
