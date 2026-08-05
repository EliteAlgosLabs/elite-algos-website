'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'
import { signIn, type SignInState } from '@/lib/auth/actions'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import { cn } from '@/lib/utils'

/**
 * Sign-in form.
 *
 * Uses `useActionState` so the form posts to a Server Action and works even
 * before hydration — a progressive-enhancement property worth keeping on the
 * one screen that must never be broken by a bundle failing to load.
 */
export function SignInForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.admin.signIn
  const [state, formAction] = useActionState<SignInState, FormData>(signIn, { error: null })

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="locale" value={locale} />

      <div>
        <label htmlFor="admin-email" className="text-sm font-medium text-foreground">
          {t.email}
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          required
          autoComplete="username"
          autoFocus
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="admin-password" className="text-sm font-medium text-foreground">
          {t.password}
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={fieldClass}
        />
      </div>

      {/* One generic message for every failure. Distinguishing "no such account"
          from "wrong password" would confirm which addresses are operators. */}
      <div aria-live="assertive" className="empty:hidden">
        {state.error ? (
          <p className="rounded-lg border border-red-500/30 bg-red-500/5 px-3.5 py-2.5 text-sm text-foreground">
            {state.error === 'locked' ? t.locked : t.error}
          </p>
        ) : null}
      </div>

      <SubmitButton label={t.submit} pendingLabel={t.submitting} />
    </form>
  )
}

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  // `useFormStatus` must be called from a child of the <form>, not the form
  // component itself — hence the separate component.
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        'inline-flex h-11 w-full items-center justify-center gap-2 rounded-full',
        'bg-foreground text-[0.9375rem] font-medium text-background',
        'transition-[background-color,color] duration-500',
        'hover:bg-accent-strong hover:text-accent-contrast',
        'disabled:pointer-events-none disabled:opacity-60',
      )}
    >
      {pending ? (
        <>
          <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
          {pendingLabel}
        </>
      ) : (
        label
      )}
    </button>
  )
}

const fieldClass = cn(
  'mt-2 h-11 w-full rounded-xl border border-border bg-background px-4',
  'text-[0.9375rem] text-foreground',
  'transition-colors duration-300 hover:border-accent/40',
  'focus:outline-none focus-visible:border-accent',
)
