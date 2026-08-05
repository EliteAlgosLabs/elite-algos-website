/**
 * Role-based access control.
 *
 * The matrix below is the single definition of who can do what. The dashboard's
 * "Roles & permissions" screen is *generated* from this object rather than
 * maintained alongside it, so the documentation cannot drift from the
 * enforcement — a class of bug that is invisible until it is a breach.
 *
 * Enforcement happens on the server (`requirePermission`). Client-side checks
 * exist only to avoid rendering controls a user cannot use; they are never the
 * security boundary.
 */

export const ROLES = [
  'founder',
  'administrator',
  'developer',
  'marketing',
  'editor',
  'readonly',
] as const

export type Role = (typeof ROLES)[number]

export const PERMISSIONS = [
  'viewDashboard',
  'viewAnalytics',
  'manageInbox',
  'manageContent',
  'publishContent',
  'managePortfolio',
  'manageTeam',
  'manageRoles',
  'viewAgents',
  'manageAgents',
  'viewRepos',
  'manageSettings',
] as const

export type Permission = (typeof PERMISSIONS)[number]

/**
 * `Record<Role, ...>` and an exhaustive permission list per role: adding a role
 * or a permission without deciding its grants is a compile error, not a silent
 * `false` that someone discovers later.
 */
export const ROLE_PERMISSIONS: Record<Role, ReadonlySet<Permission>> = {
  founder: new Set(PERMISSIONS),

  administrator: new Set<Permission>([
    'viewDashboard',
    'viewAnalytics',
    'manageInbox',
    'manageContent',
    'publishContent',
    'managePortfolio',
    'manageTeam',
    'manageRoles',
    'viewAgents',
    'manageAgents',
    'viewRepos',
  ]),

  developer: new Set<Permission>([
    'viewDashboard',
    'viewAnalytics',
    'viewAgents',
    'manageAgents',
    'viewRepos',
    'manageSettings',
  ]),

  marketing: new Set<Permission>([
    'viewDashboard',
    'viewAnalytics',
    'manageInbox',
    'manageContent',
    'publishContent',
    'managePortfolio',
  ]),

  // Can write, cannot publish. The separation is the point of the role.
  editor: new Set<Permission>(['viewDashboard', 'manageContent', 'managePortfolio']),

  readonly: new Set<Permission>(['viewDashboard', 'viewAnalytics']),
}

export function can(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].has(permission)
}

export function isRole(value: string): value is Role {
  return (ROLES as readonly string[]).includes(value)
}

/** Ordered most- to least-privileged, for display in the roles matrix. */
export const ROLE_ORDER: Role[] = [
  'founder',
  'administrator',
  'developer',
  'marketing',
  'editor',
  'readonly',
]
