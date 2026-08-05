<div align="center">

# Elite Algos Labs

**Building the foundations of global intelligence.**

The public website and internal command center for Elite Algos Labs LTD.

</div>

---

## Quick start

```bash
npm install
cp .env.example .env.local     # then fill in AUTH_SECRET
npm run dev
```

Open <http://localhost:3000>. You will be redirected to `/en` or `/fr` based on
your browser's `Accept-Language`.

To reach the command center at `/en/admin`, add an operator to `.env.local`:

```bash
 node scripts/hash-password.mjs 'a-long-passphrase'
```

```bash
AUTH_SECRET=<openssl rand -base64 48>
ADMIN_ACCOUNTS="you@elitealgoslabs.com|Your Name|founder|<the hash>"
```

No account ships with the application — an empty `ADMIN_ACCOUNTS` means nobody
can sign in, which is the intended default.

---

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 ·
Motion · Lucide · Node 24

> **Next.js 16 is not the Next.js you remember.** `middleware.ts` is now
> `proxy.ts`, `params` / `cookies()` / `headers()` are async, and Turbopack is
> the default. Version-matched docs ship inside the package at
> `node_modules/next/dist/docs/`. Summary of what differs:
> `company-brain/02-Engineering/SOPs/Nextjs-16-Reference.md`.

---

## Structure

```
src/
  app/[locale]/          ROOT layout lives here — enables per-language <html lang>
    (site)/              public site (header + footer chrome)
    admin/               command center (auth boundary in its layout)
  proxy.ts               locale negotiation + security headers
  components/
    brand/               mark & lockup — geometry measured from brand assets
    motion/              the site's motion language (reduced-motion safe)
    ui/ layout/ sections/ admin/ content/
  lib/
    brand.ts             palette + measured mark geometry
    i18n/                config, routes, dictionaries (en is the type source)
    content/             types, data, repository interface
    auth/                RBAC, session, users, guard
    contact/             shared Zod schema + submission store
```

## Commands

| Command | Does |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build — typechecks and fails on errors |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (`next lint` was removed in 16) |

---

## Three things worth knowing

**Language parity is a compile error.** `en.ts` is the type source (note the
deliberately absent `as const`); `fr.ts` is typed as `Dictionary`. A missing
translation fails the build — it does not silently ship as English.

**Storage sits behind interfaces.** `ContentRepository`, `SubmissionStore` and
`UserStore` each have one implementation and one swap point. Pages import the
interface, never the data module, so moving to a database touches one file.

**Nothing on the site is fabricated.** Sample case studies are flagged and
render visible warnings; unconnected dashboard modules show `—`, never a
plausible number. See
`company-brain/02-Engineering/Decisions/ADR-004-No-Fabricated-Content.md`.

---

## Before public launch

- [ ] Replace sample case studies in `src/lib/content/data/portfolio.ts` and
      delete each `sample: true` — every warning clears automatically
- [ ] Add an email adapter to `src/lib/contact/store.ts` — submissions are
      currently in memory and are lost on restart
- [ ] Add real team members, or leave the grid deliberately empty
- [ ] Connect an analytics provider, or remove those dashboard modules

---

## Deployment

Self-hosted Docker behind nginx on Oracle. Full runbook:
[`docs/deployment.md`](docs/deployment.md).

```bash
docker compose up -d --build
```

---

<div align="center">
<sub>Elite Algos Labs LTD · Incorporation no. 12997849 · Precision · Trust · Innovation</sub>
</div>
