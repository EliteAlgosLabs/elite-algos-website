import {
  Blocks,
  Bot,
  Cloud,
  Compass,
  Cpu,
  Database,
  GitBranch,
  Layers,
  LineChart,
  ScanText,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import type { IconName } from '@/lib/content/types'
import { cn } from '@/lib/utils'

/**
 * Content declares icons by name; this map is the only place those names are
 * resolved. Because `IconName` is a union, adding a name to the type without
 * adding it here is a compile error — the map can never be incomplete.
 */
const registry: Record<IconName, React.ComponentType<{ className?: string }>> = {
  Blocks,
  Bot,
  Cloud,
  Compass,
  Cpu,
  Database,
  GitBranch,
  Layers,
  LineChart,
  ScanText,
  ShieldCheck,
  Workflow,
}

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Component = registry[name]
  return <Component className={cn('h-5 w-5', className)} />
}

/**
 * Icon inside a glass tile — the standard treatment on service and solution
 * cards. Keeps the optical weight identical across every card.
 */
export function IconTile({ name, className }: { name: IconName; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
        'border border-border bg-surface text-accent',
        'transition-[border-color,color] duration-500 group-hover:border-accent/40',
        className,
      )}
    >
      <Icon name={name} className="h-[1.15rem] w-[1.15rem]" />
    </span>
  )
}
