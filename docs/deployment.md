# Deployment — elitealgoslabs.com

Target: **self-hosted Docker on the Oracle server**, nginx terminating TLS.

Written to be executed top to bottom by an operator (or Lexa) with SSH access
and no prior context on this repository.

---

## 1. Prerequisites

| Requirement | Notes |
|---|---|
| Docker Engine 24+ and the Compose plugin | `docker compose version` must work |
| Ports 80 and 443 open | Oracle Cloud blocks these by default — see §7 |
| DNS A/AAAA records | `elitealgoslabs.com` and `www` → the server's public IP |
| ≥ 2 GB RAM | The Next.js build peaks around 1.5 GB. See §8 if the build is killed. |

DNS must resolve **before** you request a certificate — Let's Encrypt validates
by fetching a file over HTTP from the domain.

---

## 2. Clone and configure

```bash
git clone https://github.com/EliteAlgosLabs/elite-algos-website.git
cd elite-algos-website
cp .env.example .env.production
```

Generate the session signing secret:

```bash
openssl rand -base64 48
```

Generate an operator password hash (the leading space keeps it out of shell history):

```bash
 node scripts/hash-password.mjs 'a-long-passphrase-you-will-remember'
```

Fill in `.env.production`:

```bash
NEXT_PUBLIC_SITE_URL=https://elitealgoslabs.com
AUTH_SECRET=<the openssl output>
ADMIN_ACCOUNTS="founder@elitealgoslabs.com|Your Name|founder|<the hash output>"
```

> **No account ships with the application.** If `ADMIN_ACCOUNTS` is empty, every
> sign-in fails. That is deliberate: an internal dashboard with a default
> credential is a breach with a countdown on it.

Lock the file down — it contains the key that mints admin sessions:

```bash
chmod 600 .env.production
```

---

## 3. First certificate

nginx will not start without a certificate, and certbot cannot validate without
nginx. Break the cycle by issuing the certificate in standalone mode first:

```bash
docker run --rm -p 80:80 \
  -v elite-algos-website_certbot-certs:/etc/letsencrypt \
  -v elite-algos-website_certbot-webroot:/var/www/certbot \
  certbot/certbot certonly --standalone \
  -d elitealgoslabs.com -d www.elitealgoslabs.com \
  --email founder@elitealgoslabs.com --agree-tos --no-eff-email
```

Nothing else may be bound to port 80 while this runs.

---

## 4. Build and start

```bash
docker compose up -d --build
```

`NEXT_PUBLIC_SITE_URL` is compiled into the client bundle, so Compose passes it
as a build argument. **Changing it later requires a rebuild, not a restart.**

Verify:

```bash
docker compose ps          # web must report (healthy)
curl -I https://elitealgoslabs.com
```

Expect `HTTP/2 307` at `/` (locale negotiation) and `200` at `/en`.

---

## 5. Verification checklist

- [ ] `https://elitealgoslabs.com` redirects to `/en` or `/fr` per `Accept-Language`
- [ ] `https://www.elitealgoslabs.com` 301s to the apex
- [ ] `http://` 301s to `https://`
- [ ] The language switcher swaps locale without a full page reload
- [ ] `/en/admin` redirects to `/en/admin/login`
- [ ] Signing in with the configured operator reaches the dashboard
- [ ] `/sitemap.xml` and `/robots.txt` return the production domain
- [ ] Dark mode survives a reload with no white flash

---

## 6. Updating

```bash
git pull
docker compose up -d --build
```

Compose replaces the container only after the new image builds, so a failed
build leaves the running site untouched.

Rollback:

```bash
git checkout <previous-good-sha>
docker compose up -d --build
```

---

## 7. Oracle Cloud firewall

Oracle blocks inbound traffic at two independent layers. **Both** must be opened
or the site is unreachable even though the container is healthy — this is the
single most common cause of a "working deploy" that nobody can visit.

1. **Security List / NSG** (in the Oracle console): add ingress rules for TCP
   80 and 443 from `0.0.0.0/0`.
2. **Host firewall** (on the instance):

```bash
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
sudo netfilter-persistent save
```

Ubuntu images on Oracle ship with a restrictive `iptables` chain that survives
`ufw` being disabled.

---

## 8. If the build is killed (exit 137)

The Next.js build ran out of memory. On a 1 GB instance, add swap:

```bash
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

Alternatively build the image elsewhere and push it to a registry, so the
server only ever pulls.

---

## 9. Scaling

Current shape: one container behind nginx. That comfortably serves a marketing
site with an internal dashboard, and is the right default.

**Before adding a second replica**, two pieces of in-process state must move —
both are marked in the code:

| State | File | Why it breaks |
|---|---|---|
| Contact rate limiting | `src/app/api/contact/route.ts` | Per-process counters; N replicas mean N× the allowance |
| Login throttling | `src/lib/auth/actions.ts` | Same; an attacker rotates across replicas |
| Contact submissions | `src/lib/contact/store.ts` | In-memory; already lost on restart |

Move the first two to Redis and the third to Postgres, then scale with
`docker compose up -d --scale web=3` and add `least_conn` to the nginx upstream.

Sessions are **not** in that list: the JWT is stateless and any replica holding
`AUTH_SECRET` can verify it.

---

## 10. Known gaps

Deliberate V1 boundaries, each with the code comment that marks it:

| Gap | Consequence | Fix |
|---|---|---|
| Contact submissions are in-memory | Enquiries lost on restart or deploy | Add an email adapter in `store.ts` — smallest change that makes loss harmless |
| No Content-Security-Policy | Weaker XSS defence in depth | Needs a per-request nonce threaded into Next's script tags; a static policy would need `unsafe-inline` and be worthless |
| No analytics provider | Dashboard analytics show `—` | Self-host Plausible or Umami on this server; cookie-free, so no consent banner needed |
| Agent heartbeats not wired | Lexa/Aelyn show *standby* | Have each agent POST to a heartbeat endpoint |
| No 2FA on the dashboard | Password-only admin access | Add TOTP to the sign-in action |

None of these block launch. All are visible in the dashboard rather than hidden.
