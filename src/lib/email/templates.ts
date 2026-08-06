import 'server-only'

import { COMPANY, PALETTE } from '@/lib/brand'
import type { Budget, Topic } from '@/lib/contact/schema'

/**
 * Transactional e-mail templates.
 *
 * Two audiences, two templates:
 *   • operatorNotification — the internal copy delivered to the contact inbox
 *     when an enquiry arrives. Optimised for triage: who, what, how much, and
 *     a one-click reply (the visitor's address is set as Reply-To upstream).
 *   • visitorAcknowledgement — the courteous auto-reply to the visitor, so they
 *     know the message landed and roughly when to expect a human.
 *
 * Rendered as inline-styled HTML with a plain-text alternative. E-mail clients
 * do not support external stylesheets or most modern CSS; inline styles on a
 * table-free, single-column layout are the only thing that renders consistently
 * across Gmail, Outlook and Apple Mail. Kept deliberately restrained — the
 * brand gold as a single accent, system fonts, no images to be blocked.
 */

const GOLD = PALETTE.gold[600] // '#A9853F' — legible on white, our accent
const INK = '#1A1815'
const MUTED = '#6B6459'
const BORDER = '#E4DDD0'

type EnquiryFields = {
  name: string
  email: string
  company?: string
  topic: Topic
  budget?: Budget
  message: string
  receivedAt: string
}

const TOPIC_LABELS: Record<Topic, string> = {
  project: 'A new project',
  consulting: 'AI consulting or assessment',
  partnership: 'Partnership',
  careers: 'Careers',
  other: 'Something else',
}

const BUDGET_LABELS: Record<Budget, string> = {
  undecided: 'Not yet determined',
  under25: 'Under $25,000',
  from25: '$25,000 – $100,000',
  from100: '$100,000 – $500,000',
  over500: 'Over $500,000',
}

/** Escapes user-supplied text for safe interpolation into HTML. */
function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Converts newlines to <br> after escaping, for multi-line message bodies. */
function escMultiline(value: string): string {
  return esc(value).replace(/\r?\n/g, '<br>')
}

function shell(bodyHtml: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#FBF9F5;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${INK};">
    <div style="border-bottom:2px solid ${GOLD};padding-bottom:16px;margin-bottom:24px;">
      <span style="font-size:15px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:${INK};">${esc(COMPANY.shortName)}</span>
    </div>
    ${bodyHtml}
    <div style="margin-top:32px;padding-top:16px;border-top:1px solid ${BORDER};font-size:12px;color:${MUTED};">
      ${esc(COMPANY.legalName)} · <a href="${COMPANY.url}" style="color:${GOLD};text-decoration:none;">${esc(COMPANY.domain)}</a>
    </div>
  </div>
</body>
</html>`
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;font-size:13px;color:${MUTED};width:140px;vertical-align:top;">${esc(label)}</td>
    <td style="padding:8px 0;font-size:14px;color:${INK};vertical-align:top;">${value}</td>
  </tr>`
}

/** Internal notification sent to the contact inbox. */
export function operatorNotification(fields: EnquiryFields): {
  subject: string
  html: string
  text: string
} {
  const topicLabel = TOPIC_LABELS[fields.topic] ?? fields.topic
  const budgetLabel = fields.budget ? BUDGET_LABELS[fields.budget] ?? fields.budget : '—'
  const received = new Date(fields.receivedAt).toUTCString()

  const subject = `New enquiry — ${fields.name}${fields.company ? ` (${fields.company})` : ''}`

  const html = shell(`
    <h1 style="margin:0 0 4px;font-size:20px;font-weight:600;">New contact enquiry</h1>
    <p style="margin:0 0 24px;font-size:14px;color:${MUTED};">Submitted via the website contact form.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
      ${row('From', `<strong>${esc(fields.name)}</strong>`)}
      ${row('Email', `<a href="mailto:${esc(fields.email)}" style="color:${GOLD};text-decoration:none;">${esc(fields.email)}</a>`)}
      ${fields.company ? row('Organisation', esc(fields.company)) : ''}
      ${row('Topic', esc(topicLabel))}
      ${row('Budget', esc(budgetLabel))}
      ${row('Received', esc(received))}
    </table>
    <div style="margin-top:24px;padding:16px 20px;background:#F4F0E8;border-radius:8px;">
      <p style="margin:0 0 8px;font-size:13px;color:${MUTED};text-transform:uppercase;letter-spacing:0.08em;">Message</p>
      <p style="margin:0;font-size:15px;line-height:1.6;color:${INK};">${escMultiline(fields.message)}</p>
    </div>
    <p style="margin:24px 0 0;font-size:13px;color:${MUTED};">Reply directly to this email to respond to ${esc(fields.name)}.</p>
  `)

  const text = [
    'New contact enquiry',
    'Submitted via the website contact form.',
    '',
    `From:         ${fields.name}`,
    `Email:        ${fields.email}`,
    fields.company ? `Organisation: ${fields.company}` : null,
    `Topic:        ${topicLabel}`,
    `Budget:       ${budgetLabel}`,
    `Received:     ${received}`,
    '',
    'Message:',
    fields.message,
    '',
    `Reply directly to this email to respond to ${fields.name}.`,
  ]
    .filter((line) => line !== null)
    .join('\n')

  return { subject, html, text }
}

/** Courteous acknowledgement sent back to the visitor. */
export function visitorAcknowledgement(fields: Pick<EnquiryFields, 'name'>): {
  subject: string
  html: string
  text: string
} {
  const subject = `We've received your message — ${COMPANY.shortName}`

  const firstName = fields.name.trim().split(/\s+/)[0] || fields.name

  const html = shell(`
    <h1 style="margin:0 0 16px;font-size:20px;font-weight:600;">Thank you, ${esc(firstName)}.</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${INK};">
      Your message has reached us. We read every enquiry ourselves — there is no auto-triage queue —
      and you can expect a reply from a person within two business days.
    </p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${INK};">
      If your matter is urgent, you can reach us directly at
      <a href="mailto:${COMPANY.email.business}" style="color:${GOLD};text-decoration:none;">${esc(COMPANY.email.business)}</a>.
    </p>
    <p style="margin:24px 0 0;font-size:15px;line-height:1.6;color:${INK};">
      — The team at ${esc(COMPANY.shortName)}
    </p>
  `)

  const text = [
    `Thank you, ${firstName}.`,
    '',
    'Your message has reached us. We read every enquiry ourselves — there is no',
    'auto-triage queue — and you can expect a reply from a person within two',
    'business days.',
    '',
    `If your matter is urgent, you can reach us directly at ${COMPANY.email.business}.`,
    '',
    `— The team at ${COMPANY.shortName}`,
  ].join('\n')

  return { subject, html, text }
}
