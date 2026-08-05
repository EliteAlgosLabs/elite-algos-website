'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/* ============================================================================
   LATTICE FIELD
   ----------------------------------------------------------------------------
   The hero's living background: a sparse constellation of nodes joined by
   hairlines that brighten as they approach the cursor. It is meant to read as
   a computed structure — a graph, a mesh, an index — not as "sci-fi AI".

   This is the single heaviest piece of client work on the site, so it is
   engineered defensively:

     • Pauses entirely when scrolled out of view (IntersectionObserver)
     • Pauses when the tab is hidden (visibilitychange)
     • Renders one static frame and stops under prefers-reduced-motion
     • Node count scales with viewport area and hard-caps at 90
     • Neighbour search is O(n^2) over <=90 nodes -> ~4k cheap comparisons/frame
     • Device pixel ratio capped at 2; beyond that the cost is invisible
     • Reads its colours from CSS custom properties, so it follows the theme

   If this ever shows up in a performance trace, lower MAX_NODES first.
   ========================================================================== */

const MAX_NODES = 90
const AREA_PER_NODE = 22_000 // px^2 of viewport per node
const LINK_DISTANCE = 148 // px within which two nodes are joined
const CURSOR_RADIUS = 220 // px of cursor influence
const MAX_DPR = 2

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export function LatticeField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = 1
    let nodes: Node[] = []
    let frame = 0
    let visible = true
    let running = false

    // Cursor lives in CSS pixels; starts off-canvas so nothing is highlighted
    // until the visitor actually moves the pointer.
    const cursor = { x: -9999, y: -9999 }

    /** Resolve theme colours once per resize rather than per frame. */
    let nodeColor = '198, 166, 100'
    let linkColor = '198, 166, 100'

    function readThemeColors() {
      const isDark = document.documentElement.dataset.theme === 'dark'
      // Champagne on graphite, brushed gold on ivory.
      nodeColor = isDark ? '227, 206, 159' : '169, 133, 63'
      linkColor = isDark ? '198, 166, 100' : '138, 106, 47'
    }

    function seed() {
      const target = Math.min(MAX_NODES, Math.round((width * height) / AREA_PER_NODE))
      nodes = Array.from({ length: Math.max(18, target) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        // Deliberately slow: this should feel like drift, never like motion.
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        radius: Math.random() * 1.1 + 0.7,
      }))
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      canvas!.width = Math.floor(width * dpr)
      canvas!.height = Math.floor(height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      readThemeColors()
      seed()
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)

      for (const node of nodes) {
        if (!reduced) {
          node.x += node.vx
          node.y += node.vy
          // Wrap rather than bounce — bouncing creates visible "walls".
          if (node.x < -20) node.x = width + 20
          if (node.x > width + 20) node.x = -20
          if (node.y < -20) node.y = height + 20
          if (node.y > height + 20) node.y = -20
        }
      }

      // Links first, so nodes sit on top of them.
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distanceSq = dx * dx + dy * dy
          if (distanceSq > LINK_DISTANCE * LINK_DISTANCE) continue

          const distance = Math.sqrt(distanceSq)
          const proximity = 1 - distance / LINK_DISTANCE

          // Brighten links near the cursor: the midpoint's distance to the
          // pointer drives an extra term, so the mesh "lights up" locally.
          const mx = (a.x + b.x) / 2 - cursor.x
          const my = (a.y + b.y) / 2 - cursor.y
          const cursorDistance = Math.sqrt(mx * mx + my * my)
          const boost =
            cursorDistance < CURSOR_RADIUS ? (1 - cursorDistance / CURSOR_RADIUS) * 0.55 : 0

          ctx!.strokeStyle = `rgba(${linkColor}, ${(proximity * 0.16 + boost * proximity).toFixed(3)})`
          ctx!.lineWidth = 0.6
          ctx!.beginPath()
          ctx!.moveTo(a.x, a.y)
          ctx!.lineTo(b.x, b.y)
          ctx!.stroke()
        }
      }

      for (const node of nodes) {
        const dx = node.x - cursor.x
        const dy = node.y - cursor.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const boost = distance < CURSOR_RADIUS ? (1 - distance / CURSOR_RADIUS) * 0.5 : 0

        ctx!.fillStyle = `rgba(${nodeColor}, ${(0.3 + boost).toFixed(3)})`
        ctx!.beginPath()
        ctx!.arc(node.x, node.y, node.radius + boost * 0.9, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    function loop() {
      draw()
      frame = requestAnimationFrame(loop)
    }

    function start() {
      if (running || reduced) return
      running = true
      frame = requestAnimationFrame(loop)
    }

    function stop() {
      if (!running) return
      running = false
      cancelAnimationFrame(frame)
    }

    function onPointerMove(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      cursor.x = event.clientX - rect.left
      cursor.y = event.clientY - rect.top
    }

    function onPointerLeave() {
      cursor.x = -9999
      cursor.y = -9999
    }

    function onVisibility() {
      if (document.hidden) stop()
      else if (visible) start()
    }

    resize()
    draw() // paint one frame immediately, including under reduced motion

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !document.hidden) start()
        else stop()
      },
      { threshold: 0 },
    )
    observer.observe(canvas)

    const resizeObserver = new ResizeObserver(() => {
      resize()
      draw()
    })
    resizeObserver.observe(canvas)

    // Re-read colours when the theme flips.
    const themeObserver = new MutationObserver(() => {
      readThemeColors()
      draw()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    // Pointer events go on the window: the canvas itself is `pointer-events-none`
    // so it never intercepts clicks meant for the hero's buttons.
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      observer.disconnect()
      resizeObserver.disconnect()
      themeObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    />
  )
}
