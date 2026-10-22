'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Silent, looping ambient video.
 *
 * It is built to cost nothing until it matters:
 *   • `preload="none"` with a poster: no video bytes load before the clip is near the viewport
 *   • plays only while on screen and pauses when scrolled away (IntersectionObserver)
 *   • never plays under `prefers-reduced-motion` or Data Saver. The poster stays.
 *   • WebM (VP9) first, MP4 (H.264) as the fallback. Both are about 1 MB or less.
 *
 * The video is decorative, so `alt` describes it for screen readers through
 * aria-label on the wrapper, and the <video> itself is hidden from assistive tech.
 */
export function AmbientVideo({
  mp4,
  webm,
  poster,
  alt,
  className,
  videoClassName,
  children,
}: {
  mp4: string
  webm?: string
  poster: string
  alt: string
  className?: string
  videoClassName?: string
  children?: React.ReactNode
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video || reduced) return
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (conn?.saveData) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.preload !== 'auto') {
            video.preload = 'auto'
            video.load()
          }
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [reduced])

  return (
    <div role="img" aria-label={alt} className={cn('relative isolate overflow-hidden bg-ink-950', className)}>
      {/* Poster painted underneath, so there is never a blank frame. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${poster})` }}
      />
      <video
        ref={ref}
        aria-hidden="true"
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        onPlaying={() => setReady(true)}
        className={cn(
          'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000',
          ready ? 'opacity-100' : 'opacity-0',
          videoClassName,
        )}
      >
        {webm ? <source src={webm} type="video/webm" /> : null}
        <source src={mp4} type="video/mp4" />
      </video>
      {children}
    </div>
  )
}
