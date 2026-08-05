'use client'

import { useId, useRef, useState } from 'react'
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react'
import {
  BUDGETS,
  TOPICS,
  contactSchema,
  toFieldErrors,
  type ContactFieldErrors,
  type ContactResponse,
  type ValidationKey,
} from '@/lib/contact/schema'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'submitting' | 'success' | 'error'

/**
 * Contact form.
 *
 * Validation runs against the same Zod schema the server uses, so the two can
 * never disagree. Errors are returned as message *keys* and rendered from the
 * dictionary here, which is how the form stays bilingual without the server
 * needing to know the visitor's language.
 *
 * Accessibility: each field owns a stable id, errors are wired with
 * `aria-describedby` and `aria-invalid`, the error region is a live region, and
 * focus moves to the first invalid field on a failed submit.
 */
export function ContactForm({ dict }: { dict: Dictionary }) {
  const t = dict.contact.form
  const v = dict.validation
  const baseId = useId()

  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<ContactFieldErrors>({})
  const [formError, setFormError] = useState<ValidationKey | null>(null)

  const fieldId = (name: string) => `${baseId}-${name}`
  const errorId = (name: string) => `${baseId}-${name}-error`

  function focusFirstError(fieldErrors: ContactFieldErrors) {
    const first = Object.keys(fieldErrors)[0]
    if (!first) return
    const element = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)
    element?.focus()
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const formData = new FormData(event.currentTarget)
    const raw = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      company: String(formData.get('company') ?? ''),
      topic: String(formData.get('topic') ?? 'project'),
      budget: String(formData.get('budget') ?? 'undecided'),
      message: String(formData.get('message') ?? ''),
      consent: formData.get('consent') === 'on',
      website: String(formData.get('website') ?? ''),
    }

    const parsed = contactSchema.safeParse(raw)
    if (!parsed.success) {
      const fieldErrors = toFieldErrors(parsed.error)
      setErrors(fieldErrors)
      setStatus('idle')
      focusFirstError(fieldErrors)
      return
    }

    setErrors({})
    setStatus('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })
      const result = (await response.json()) as ContactResponse

      if (result.ok) {
        setStatus('success')
        formRef.current?.reset()
        return
      }

      if (result.errors) {
        setErrors(result.errors)
        focusFirstError(result.errors)
      }
      setFormError(result.formError ?? null)
      setStatus('error')
    } catch {
      setFormError('serverError')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="glass rounded-2xl p-10 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 aria-hidden="true" className="mx-auto h-9 w-9 text-accent" />
        <h2 className="mt-6 font-display text-2xl">{t.successTitle}</h2>
        <p className="mx-auto mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-muted">
          {t.successBody}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-8 text-sm font-medium text-accent-strong underline-offset-4 hover:underline"
        >
          {t.successAgain}
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="glass rounded-2xl p-8 sm:p-10">
      <h2 className="font-display text-2xl">{t.title}</h2>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{t.lead}</p>

      <div className="mt-8 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            id={fieldId('name')}
            errorId={errorId('name')}
            label={t.name}
            error={errors.name ? v[errors.name] : undefined}
          >
            <input
              id={fieldId('name')}
              name="name"
              type="text"
              autoComplete="name"
              placeholder={t.namePlaceholder}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? errorId('name') : undefined}
              className={inputClass(Boolean(errors.name))}
            />
          </Field>

          <Field
            id={fieldId('email')}
            errorId={errorId('email')}
            label={t.email}
            error={errors.email ? v[errors.email] : undefined}
          >
            <input
              id={fieldId('email')}
              name="email"
              type="email"
              autoComplete="email"
              placeholder={t.emailPlaceholder}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? errorId('email') : undefined}
              className={inputClass(Boolean(errors.email))}
            />
          </Field>
        </div>

        <Field id={fieldId('company')} label={t.company} hint={t.companyOptional}>
          <input
            id={fieldId('company')}
            name="company"
            type="text"
            autoComplete="organization"
            placeholder={t.companyPlaceholder}
            className={inputClass(false)}
          />
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field id={fieldId('topic')} label={t.topic}>
            <select id={fieldId('topic')} name="topic" defaultValue="project" className={inputClass(false)}>
              {TOPICS.map((topic) => (
                <option key={topic} value={topic}>
                  {t.topicOptions[topic]}
                </option>
              ))}
            </select>
          </Field>

          <Field id={fieldId('budget')} label={t.budget} hint={t.budgetOptional}>
            <select
              id={fieldId('budget')}
              name="budget"
              defaultValue="undecided"
              className={inputClass(false)}
            >
              {BUDGETS.map((budget) => (
                <option key={budget} value={budget}>
                  {t.budgetOptions[budget]}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field
          id={fieldId('message')}
          errorId={errorId('message')}
          label={t.message}
          error={errors.message ? v[errors.message] : undefined}
        >
          <textarea
            id={fieldId('message')}
            name="message"
            rows={6}
            placeholder={t.messagePlaceholder}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? errorId('message') : undefined}
            className={cn(inputClass(Boolean(errors.message)), 'h-auto resize-y py-3.5')}
          />
        </Field>

        {/* Honeypot. Hidden from sight and from assistive technology, and
            excluded from the tab order — only a bot will ever fill it. */}
        <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
          <label htmlFor={fieldId('website')}>Website</label>
          <input id={fieldId('website')} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              name="consent"
              type="checkbox"
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? errorId('consent') : undefined}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-[var(--accent)]"
            />
            <span className="text-sm leading-relaxed text-muted">{t.consent}</span>
          </label>
          {errors.consent ? (
            <p id={errorId('consent')} className="mt-2 text-sm text-red-600 dark:text-red-400">
              {v[errors.consent]}
            </p>
          ) : null}
        </div>
      </div>

      {/* Form-level errors (rate limit, server failure). */}
      <div aria-live="assertive" className="empty:hidden">
        {formError ? (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/5 p-4">
            <p className="text-sm font-medium text-foreground">{t.errorTitle}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {formError === 'rateLimited' ? v.rateLimited : t.errorBody}
            </p>
          </div>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className={cn(
          'group mt-8 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full px-8',
          'bg-foreground text-base font-medium text-background',
          'transition-[background-color,color,transform] duration-500',
          '[transition-timing-function:var(--ease-out-expo)]',
          'hover:bg-accent-strong hover:text-accent-contrast active:translate-y-px',
          'disabled:pointer-events-none disabled:opacity-60',
        )}
      >
        {status === 'submitting' ? (
          <>
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
            {t.submitting}
          </>
        ) : (
          <>
            {t.submit}
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </>
        )}
      </button>
    </form>
  )
}

/* -------------------------------------------------------------------------- */

function inputClass(invalid: boolean) {
  return cn(
    'h-12 w-full rounded-xl border bg-background px-4 text-[0.9375rem] text-foreground',
    'placeholder:text-muted/70',
    'transition-[border-color,box-shadow] duration-300',
    'focus:outline-none focus-visible:border-accent',
    invalid ? 'border-red-500/60' : 'border-border hover:border-accent/40',
  )
}

function Field({
  id,
  errorId,
  label,
  hint,
  error,
  children,
}: {
  id: string
  errorId?: string
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {hint ? <span className="text-xs text-muted">{hint}</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {error && errorId ? (
        <p id={errorId} className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  )
}
