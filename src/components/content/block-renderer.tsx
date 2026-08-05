import { Info, TriangleAlert } from 'lucide-react'
import type { Block } from '@/lib/content/types'
import type { Locale } from '@/lib/i18n/config'
import { cn } from '@/lib/utils'

/**
 * Renders an article body.
 *
 * Every block type maps to a typed React element — there is no
 * `dangerouslySetInnerHTML` anywhere in this file, which means article content
 * cannot inject markup or script no matter where it eventually comes from.
 * That property is what makes a future CMS safe to plug into this renderer.
 */
export function BlockRenderer({ blocks, locale }: { blocks: Block[]; locale: Locale }) {
  return (
    <div className="space-y-7">
      {blocks.map((block, index) => (
        <BlockView key={index} block={block} locale={locale} />
      ))}
    </div>
  )
}

function BlockView({ block, locale }: { block: Block; locale: Locale }) {
  switch (block.type) {
    case 'paragraph':
      return <p className="text-lg leading-relaxed text-muted">{block.text[locale]}</p>

    case 'heading':
      return (
        <h2 id={block.id} className="scroll-mt-28 pt-6 text-3xl leading-snug">
          {block.text[locale]}
        </h2>
      )

    case 'list': {
      const List = block.ordered ? 'ol' : 'ul'
      return (
        <List className="space-y-3 pl-1">
          {block.items[locale].map((item, index) => (
            <li key={item} className="flex gap-3.5 text-lg leading-relaxed text-muted">
              <span
                aria-hidden="true"
                className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent"
              >
                {block.ordered ? null : null}
              </span>
              <span>
                {block.ordered ? (
                  <span className="mr-2 font-mono text-sm text-accent-strong">{index + 1}.</span>
                ) : null}
                {item}
              </span>
            </li>
          ))}
        </List>
      )
    }

    case 'quote':
      return (
        <blockquote className="border-l-2 border-accent py-1 pl-6">
          <p className="font-display text-2xl italic leading-snug text-foreground">
            {block.text[locale]}
          </p>
          {block.attribution ? (
            <footer className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-muted">
              {block.attribution[locale]}
            </footer>
          ) : null}
        </blockquote>
      )

    case 'code':
      return (
        <figure>
          <pre
            className={cn(
              'overflow-x-auto rounded-xl border border-border bg-surface p-5',
              'font-mono text-[0.8125rem] leading-relaxed text-foreground',
            )}
          >
            <code>{block.code}</code>
          </pre>
          {block.caption ? (
            <figcaption className="mt-3 text-sm leading-relaxed text-muted">
              {block.caption[locale]}
            </figcaption>
          ) : null}
        </figure>
      )

    case 'callout': {
      const warning = block.tone === 'warning'
      const CalloutIcon = warning ? TriangleAlert : Info
      return (
        <aside
          className={cn(
            'flex gap-4 rounded-xl border p-5',
            warning
              ? 'border-amber-500/30 bg-amber-500/5'
              : 'border-accent/25 bg-accent/[0.06]',
          )}
        >
          <CalloutIcon
            aria-hidden="true"
            className={cn(
              'mt-0.5 h-4.5 w-4.5 shrink-0',
              warning ? 'text-amber-600 dark:text-amber-400' : 'text-accent',
            )}
          />
          <p className="text-[0.9375rem] leading-relaxed text-foreground">{block.text[locale]}</p>
        </aside>
      )
    }
  }
}
