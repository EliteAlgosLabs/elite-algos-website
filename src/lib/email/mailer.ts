import 'server-only'

import nodemailer, { type Transporter } from 'nodemailer'

/**
 * SMTP mailer.
 *
 * A single, lazily-created transport shared across the process. Configuration
 * comes entirely from the environment so the same image runs in any environment
 * without a rebuild, and so no credential is ever committed.
 *
 * Design decisions:
 *   • Lazy singleton — the transport (and its connection pool) is created on
 *     first use, not at import time, so a missing config never breaks the build
 *     or the boot of unrelated routes.
 *   • Graceful degradation — if SMTP is not configured, `isMailConfigured()`
 *     returns false and callers skip delivery rather than throwing. The contact
 *     form still validates, rate-limits and stores; it simply does not email.
 *   • Pooled — reuses TCP/TLS connections across submissions, which matters the
 *     moment more than one enquiry arrives close together.
 *
 * Environment:
 *   SMTP_HOST      e.g. mailserver.purelymail.com
 *   SMTP_PORT      465 (implicit TLS) or 587 (STARTTLS). Default 465.
 *   SMTP_USER      full mailbox address used to authenticate
 *   SMTP_PASSWORD  mailbox password / app password
 *   SMTP_SECURE    'true' | 'false'. Optional; inferred from the port when unset
 *                  (465 -> secure, otherwise STARTTLS).
 *   SMTP_FROM      envelope + header From. Optional; defaults to SMTP_USER.
 *   CONTACT_INBOX  where enquiries are delivered. Optional; defaults to
 *                  hello@elitealgoslabs.com.
 */

export type SmtpConfig = {
  host: string
  port: number
  secure: boolean
  user: string
  password: string
  from: string
  inbox: string
}

const DEFAULT_INBOX = 'hello@elitealgoslabs.com'

/** Reads and validates SMTP configuration from the environment. */
export function readSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim()
  const user = process.env.SMTP_USER?.trim()
  const password = process.env.SMTP_PASSWORD

  // These three are the irreducible minimum. Without any one of them there is
  // no meaningful transport to build.
  if (!host || !user || !password) return null

  const port = Number(process.env.SMTP_PORT ?? 465)
  if (!Number.isInteger(port) || port <= 0 || port > 65535) return null

  const secure =
    process.env.SMTP_SECURE != null
      ? process.env.SMTP_SECURE.trim().toLowerCase() === 'true'
      : port === 465

  return {
    host,
    port,
    secure,
    user,
    password,
    from: process.env.SMTP_FROM?.trim() || user,
    inbox: process.env.CONTACT_INBOX?.trim() || DEFAULT_INBOX,
  }
}

/** True when the environment carries a usable SMTP configuration. */
export function isMailConfigured(): boolean {
  return readSmtpConfig() !== null
}

let cached: { transporter: Transporter; config: SmtpConfig } | null = null

/**
 * Returns the shared transport, or null when SMTP is not configured.
 *
 * The transport is cached with the config that built it, so a config change at
 * runtime (rare, but possible via a restart with new env) is picked up on the
 * next process rather than being silently stale.
 */
function getTransport(): { transporter: Transporter; config: SmtpConfig } | null {
  const config = readSmtpConfig()
  if (!config) return null

  if (cached && sameConfig(cached.config, config)) return cached

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.password },
    pool: true,
    maxConnections: 3,
    // Fail fast rather than hanging a request behind a dead SMTP server.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  })

  cached = { transporter, config }
  return cached
}

function sameConfig(a: SmtpConfig, b: SmtpConfig): boolean {
  return (
    a.host === b.host &&
    a.port === b.port &&
    a.secure === b.secure &&
    a.user === b.user &&
    a.password === b.password &&
    a.from === b.from &&
    a.inbox === b.inbox
  )
}

export type SendResult =
  | { ok: true; messageId: string; skipped?: false }
  | { ok: false; skipped: true } // SMTP not configured — not an error
  | { ok: false; skipped?: false; error: string }

export type SendArgs = {
  to: string
  subject: string
  html: string
  text: string
  replyTo?: string
}

/**
 * Sends one message. Never throws: delivery failure is a returned result the
 * caller decides how to treat, because a failed notification must not be able
 * to turn a successfully-received enquiry into a 500 for the visitor.
 */
export async function sendMail(args: SendArgs): Promise<SendResult> {
  const transport = getTransport()
  if (!transport) return { ok: false, skipped: true }

  try {
    const info = await transport.transporter.sendMail({
      from: transport.config.from,
      to: args.to,
      subject: args.subject,
      text: args.text,
      html: args.html,
      replyTo: args.replyTo,
    })
    return { ok: true, messageId: info.messageId }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return { ok: false, error: message }
  }
}

/**
 * Verifies the SMTP connection and credentials without sending mail. Used by
 * the admin "SMTP status" module so operators can see, at a glance, whether the
 * transport is actually usable — not merely configured.
 */
export async function verifyMail(): Promise<
  | { configured: false }
  | { configured: true; ok: true; host: string; port: number }
  | { configured: true; ok: false; host: string; port: number; error: string }
> {
  const transport = getTransport()
  if (!transport) return { configured: false }

  const { host, port } = transport.config
  try {
    await transport.transporter.verify()
    return { configured: true, ok: true, host, port }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return { configured: true, ok: false, host, port, error: message }
  }
}
