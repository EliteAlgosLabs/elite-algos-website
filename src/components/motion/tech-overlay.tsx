import { LatticeField } from '@/components/motion/lattice-field'

/**
 * Tech overlay for a landscape photograph.
 *
 * It turns a plain landscape into a technology image without leaving the photo.
 * Back to front:
 *   • a cool grade at the top so the HUD chips stay legible
 *   • the brand lattice (the same canvas as the home hero) blended over the scene
 *   • a slow horizontal scan line (transform-only, motion-safe)
 *   • four corner brackets, like a viewfinder
 *   • mono HUD chips (top: label + coordinates; bottom-right: what we do)
 *
 * The caption at bottom-left still belongs to the parent <Photo>.
 */
export function TechOverlay({
  label,
  coordinates,
  tags,
  caption,
}: {
  label: string
  coordinates: string
  tags: string[]
  caption?: string
}) {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/5 to-transparent"
      />

      <LatticeField onMedia className="z-[1] opacity-90" />

      {/* Scan line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] hidden overflow-hidden motion-safe:block"
      >
        <div className="absolute inset-x-0 top-0 h-full motion-safe:animate-[scan_7s_cubic-bezier(0.45,0,0.55,1)_infinite]">
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-gold-300/25" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gold-200/80 shadow-[0_0_14px_2px_rgb(227_206_159/0.6)]" />
        </div>
      </div>

      {/* Viewfinder corners */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-4 z-[3] sm:inset-5">
        <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-white/70" />
        <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-white/70" />
        <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-white/70" />
        <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-white/70" />
      </div>

      {/* HUD: top */}
      <div className="pointer-events-none absolute inset-x-7 top-7 z-[4] flex items-start justify-between gap-3 sm:inset-x-9 sm:top-9">
        <span className="glass-dark inline-flex items-center gap-2 rounded-full px-3 py-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-gold-300 opacity-70 motion-safe:animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-300" />
          </span>
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-white/90">{label}</span>
        </span>
        <span className="glass-dark hidden rounded-full px-3 py-1.5 font-mono text-[0.5625rem] tracking-[0.12em] text-white/80 sm:inline-flex">
          {coordinates}
        </span>
      </div>

      {/* Bottom gradient for the caption */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent"
      />

      {caption ? (
        <p className="absolute bottom-7 left-7 z-[4] font-display text-3xl font-light italic leading-none text-white sm:bottom-9 sm:left-9 sm:text-4xl">
          {caption}
        </p>
      ) : null}

      {/* HUD: bottom-right tags */}
      <div className="pointer-events-none absolute bottom-7 right-7 z-[4] hidden flex-col items-end gap-1.5 sm:bottom-9 sm:right-9 sm:flex">
        {tags.map((tag) => (
          <span
            key={tag}
            className="glass-dark rounded-full px-2.5 py-1 font-mono text-[0.5rem] uppercase tracking-[0.16em] text-white/85"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  )
}
