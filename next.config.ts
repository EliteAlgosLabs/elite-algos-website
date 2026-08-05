import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /**
   * Emits `.next/standalone` — a self-contained server with only the modules it
   * actually uses. This is what lets the production Docker image ship without
   * `node_modules`, taking the final image from ~1.2 GB to well under 200 MB.
   * Required by the Oracle deployment; see `docs/deployment.md`.
   */
  output: 'standalone',

  // Fail the production build on type errors rather than shipping them.
  typescript: { ignoreBuildErrors: false },

  images: {
    // AVIF first, WebP as the fallback; the browser picks what it supports.
    formats: ['image/avif', 'image/webp'],
    // Next 16 defaults to `[75]` only. We allow one higher tier for hero and
    // case-study imagery where compression artefacts would be visible.
    qualities: [75, 90],
    // Four hours (the Next 16 default) is right for self-hosting: it keeps the
    // optimiser's CPU cost down without pinning stale assets for a full day.
    minimumCacheTTL: 14_400,
  },

  // Removes the framework fingerprint from every response.
  poweredByHeader: false,

  // Emits a trailing-slash-free canonical form, matching the URLs in the
  // sitemap and the `hreflang` alternates.
  trailingSlash: false,

  /**
   * Compression is handled by nginx in front of the container, which does it
   * better and can serve pre-compressed static assets. Doing it in both places
   * wastes CPU on every request.
   */
  compress: false,
}

export default nextConfig
