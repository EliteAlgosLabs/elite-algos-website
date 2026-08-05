import { PageHeader, Panel, PlaceholderNotice, StatTile } from './primitives'

/**
 * Shared shell for a module whose data source is not yet connected.
 *
 * Every scaffolded screen renders the real layout — headers, panels, tile
 * grid — with empty values and an explicit notice saying what would populate
 * it. Two rules are non-negotiable here:
 *
 *   1. Never fabricate numbers. An invented "12,480 visitors" gets screenshotted
 *      into a deck and becomes a claim the company has to defend.
 *   2. Always say what connects it. A placeholder without a next step is
 *      indistinguishable from an unfinished feature nobody owns.
 */
export function ModuleScaffold({
  title,
  subtitle,
  notice,
  detail,
  tiles = [],
  panels = [],
}: {
  title: string
  subtitle: string
  notice: string
  detail: string
  /** Rendered with an em dash for every value. */
  tiles?: string[]
  panels?: { title: string; empty: string }[]
}) {
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />

      <div className="mb-6">
        <PlaceholderNotice message={notice} detail={detail} />
      </div>

      {tiles.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((label) => (
            <StatTile key={label} label={label} value="—" />
          ))}
        </div>
      ) : null}

      {panels.length > 0 ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {panels.map((panel) => (
            <Panel key={panel.title} title={panel.title}>
              <div className="py-10 text-center">
                <p className="text-sm text-muted">{panel.empty}</p>
              </div>
            </Panel>
          ))}
        </div>
      ) : null}
    </>
  )
}
