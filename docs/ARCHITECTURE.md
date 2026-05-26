# Project Architecture

This document maps the main routes, API endpoints, internal modules and operational responsibilities of `ricardozulkiewicz.com`.

## Framework

The project is a Next.js App Router application.

Core stack:

```text
Next.js
React
TypeScript
Tailwind CSS
Framer Motion
Lucide React
```

## Public routes

| Route | Purpose |
|---|---|
| `/` | English homepage and primary personal site entry point. |
| `/pt` | Portuguese homepage. |
| `/cv` | Controlled CV access request page. |
| `/privacidade` | Privacy/LGPD-oriented privacy page. |
| `/termos` | Terms of use page. |
| `not-found.tsx` | Premium 404 page for unknown routes. |

## Redirect routes

| Route | Destination | Purpose |
|---|---|---|
| `/resume` | `/cv` | Intuitive English CV route. |
| `/curriculo` | `/cv` | Intuitive Portuguese CV route. |
| `/download-cv` | `/cv` | Direct download-style CV route. |
| `/baixar-curriculo` | `/cv` | Portuguese download-style CV route. |
| `/pt/cv` | `/cv` | Portuguese localized CV path. |
| `/privacy` | `/privacidade` | English privacy route. |
| `/lgpd` | `/privacidade` | LGPD-style privacy route. |
| `/terms` | `/termos` | English terms route. |

Known direct CV PDF URLs are also redirected to `/cv` through `next.config.mjs`.

## API routes

| Route | Purpose | Public? | Sensitive? |
|---|---|---:|---:|
| `/api/health` | Basic public health check. | Yes | No |
| `/api/cv/request-access` | Receives `/cv` form submissions. | Yes | Yes |
| `/api/cv/confirm-email` | Confirms visitor e-mail and sends temporary CV access link. | Token-based | Yes |
| `/api/cv/download` | Serves selected CV PDF as backend attachment. | Token-based | Yes |
| `/api/cv/diagnostics` | Protected production configuration diagnostics. | Admin-token only | Yes |

## Controlled CV access flow

```text
Visitor opens /cv
↓
Visitor submits request form
↓
POST /api/cv/request-access
↓
Backend validates input, rate limit and honeypot
↓
Backend creates email_confirmation token
↓
Visitor receives confirmation e-mail
↓
GET /api/cv/confirm-email?token=...
↓
Backend validates token
↓
Backend creates download_access token
↓
Visitor receives temporary access link
↓
Visitor opens /cv/access?token=...
↓
Visitor chooses permitted CV file
↓
GET /api/cv/download?token=...&file=pt|en
↓
Backend fetches private file and returns PDF attachment
```

## Internal modules

| Module | Responsibility |
|---|---|
| `app/lib/cv-access.ts` | CV lead validation, token creation/verification, e-mail rendering and e-mail sending. |
| `app/lib/private-cv-files.ts` | Private Google Drive or backend source URL CV file retrieval. |
| `app/lib/google-sheets.ts` | Optional lead/event persistence in Google Sheets. |
| `app/lib/rate-limit.ts` | Lightweight in-memory rate limiting utilities. |

## CV token model

Two token types are used:

```text
email_confirmation
```

Used to confirm ownership of the visitor e-mail address.

```text
download_access
```

Used to access `/cv/access` and download the permitted CV version.

Both are encrypted and validated server-side.

Current expiration policy:

```text
24 hours for e-mail confirmation token
24 hours for temporary download access token
```

## CV file delivery model

Preferred production mode:

```text
Private Google Drive file
↓
Shared with Google service account as Viewer
↓
Backend fetches file via Google Drive API
↓
Backend returns PDF attachment through /api/cv/download
```

Fallback mode:

```text
Private source URL
↓
Backend fetches URL with optional auth header
↓
Backend returns PDF attachment through /api/cv/download
```

The visitor should never see:

- Google Drive source URL.
- Google Drive file ID.
- Private source URL.
- Service account credentials.

## E-mail model

Transactional e-mails are sent through Resend.

E-mail types:

- Visitor confirmation e-mail.
- Visitor temporary CV access e-mail.
- Owner notification for new request.
- Owner notification for CV access/download.

The CV access flow is not a newsletter or marketing automation flow.

## Persistence model

Google Sheets persistence is optional.

When configured, events are appended for:

```text
request_submitted
email_confirmed
download_accessed
```

If Google Sheets is not configured, the main CV flow can still work through e-mail and backend file delivery.

## Abuse protection

Current lightweight protections:

- IP-based in-memory rate limiting on `/api/cv/request-access`.
- Honeypot checks for likely automated submissions.
- Neutral response for honeypot-triggered submissions.

Future hardening options:

- Vercel Firewall.
- Upstash Redis rate limiting.
- Turnstile or another privacy-conscious challenge.

## SEO and indexing

Public indexable pages:

- `/`
- `/pt`
- `/cv`
- `/privacidade`
- `/termos`

Sensitive routes are blocked or marked noindex:

- `/cv/access`
- `/api/cv/`
- `/api/cv/download`
- `/api/cv/diagnostics`

## Deployment model

Production deployment target: Vercel.

Deployment requires:

- GitHub repository imported into Vercel.
- Production environment variables configured.
- Domain `ricardozulkiewicz.com` configured.
- Resend sender/domain verified.
- Google service account configured.
- Private CV files shared with service account.

## Operational validation

Recommended validation order:

1. Deploy latest `main`.
2. Open `/api/health`.
3. Run `scripts/production-smoke-test.mjs`.
4. Run `/api/cv/diagnostics` with admin token.
5. Submit a real `/cv` test request.
6. Confirm e-mails.
7. Download selected CV through `/api/cv/download`.
8. Confirm no private source URLs are exposed.
