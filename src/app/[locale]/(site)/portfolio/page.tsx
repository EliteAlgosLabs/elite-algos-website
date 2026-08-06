import { notFound } from 'next/navigation'

// Hidden from the live site (2026-08-06). Direct visits 404.
// Full implementation preserved in git history (commit before this change);
// restore that version to bring the page back.
export default async function PortfolioPage() {
  notFound()
}
