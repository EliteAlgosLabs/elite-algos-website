import { z } from 'zod'

/**
 * Contact form contract.
 *
 * Defined once and imported by BOTH the client form and the route handler, so
 * the two can never disagree about what is valid. Client-side validation is a
 * convenience; the server re-validates the same schema because anything from a
 * browser is untrusted input.
 *
 * Error messages are message *keys*, not sentences: the server has no reliable
 * way to know the visitor's language, so it returns keys and the client renders
 * them from the dictionary. That keeps validation bilingual without duplicating
 * the schema per language.
 */

export const TOPICS = ['project', 'consulting', 'partnership', 'careers', 'other'] as const
export const BUDGETS = ['undecided', 'under25', 'from25', 'from100', 'over500'] as const

export type Topic = (typeof TOPICS)[number]
export type Budget = (typeof BUDGETS)[number]

/** Keys into `dict.validation`. */
export type ValidationKey =
  | 'required'
  | 'nameTooShort'
  | 'emailInvalid'
  | 'messageTooShort'
  | 'messageTooLong'
  | 'consentRequired'
  | 'rateLimited'
  | 'serverError'

export const contactSchema = z.object({
  name: z.string().trim().min(2, { message: 'nameTooShort' }).max(120, { message: 'required' }),
  email: z.email({ message: 'emailInvalid' }).max(200, { message: 'emailInvalid' }),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  topic: z.enum(TOPICS),
  budget: z.enum(BUDGETS).optional(),
  message: z
    .string()
    .trim()
    .min(20, { message: 'messageTooShort' })
    .max(5000, { message: 'messageTooLong' }),
  consent: z.literal(true, { message: 'consentRequired' }),
  /**
   * Honeypot. Real visitors never see this field, so any value in it means a
   * bot filled the form. We accept the submission and silently discard it —
   * returning an error would tell the bot how to get past the check.
   */
  website: z.string().max(0).optional().or(z.literal('')),
})

export type ContactInput = z.infer<typeof contactSchema>

export type ContactFieldErrors = Partial<Record<keyof ContactInput, ValidationKey>>

export type ContactResponse =
  | { ok: true }
  | { ok: false; errors?: ContactFieldErrors; formError?: ValidationKey }

/** Flattens Zod issues into one message key per field. */
export function toFieldErrors(error: z.ZodError<ContactInput>): ContactFieldErrors {
  const result: ContactFieldErrors = {}
  for (const issue of error.issues) {
    const field = issue.path[0]
    if (typeof field === 'string' && !(field in result)) {
      result[field as keyof ContactInput] = issue.message as ValidationKey
    }
  }
  return result
}
