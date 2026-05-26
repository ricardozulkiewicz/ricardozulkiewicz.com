# Security Policy

This repository powers the personal website `ricardozulkiewicz.com` and its controlled CV access flow.

## Scope

Security-relevant areas include:

- The public website routes.
- The controlled CV access flow at `/cv`.
- The CV request, confirmation and download API routes.
- Temporary token generation and validation.
- Production environment variables.
- Private CV file delivery from Google Drive or another backend-only source.
- Transactional e-mail delivery through Resend.
- Optional Google Sheets persistence for CV access events.

## Sensitive routes

The following routes should be treated as sensitive and must not expose secrets, source file URLs or private file IDs to visitors:

- `/api/cv/request-access`
- `/api/cv/confirm-email`
- `/api/cv/download`
- `/api/cv/diagnostics`
- `/cv/access`

The visitor-facing CV flow must remain:

```text
/cv -> email confirmation -> temporary access link -> backend-served download
```

Direct public download links for CV files should not be used.

## Secrets and environment variables

Never commit real values for production secrets. Configure them only in the deployment provider, such as Vercel.

Required production secrets include:

```text
CV_ACCESS_SECRET
CV_ADMIN_TOKEN
RESEND_API_KEY
GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
```

Important rules:

- `CV_ACCESS_SECRET` and `CV_ADMIN_TOKEN` must be different values.
- Secrets must be long, random and unique to production.
- Do not store real secrets in `.env.example`.
- Do not commit `.env`, `.env.production`, `.env.local` or any local environment files.
- Use `node scripts/generate-cv-secrets.mjs` to generate strong local candidate values for `CV_ACCESS_SECRET` and `CV_ADMIN_TOKEN`.

## Private CV files

Preferred production delivery is via private Google Drive files accessed server-side through a Google service account.

Requirements:

- The PT and EN CV files must remain private.
- Each CV file should be shared with the service account as Viewer.
- Google Drive file IDs should be configured as environment variables only.
- Google Drive URLs or source file IDs must not be rendered in client-side code.
- `/api/cv/download` should remain the only public download entry point.

## E-mail flow

Resend is used for transactional e-mails.

Requirements:

- `CV_EMAIL_FROM` must use a verified sender/domain.
- Confirmation e-mails and temporary access e-mails must be treated as transactional messages.
- Do not use the CV access form as a newsletter opt-in without explicit consent and separate wording.

## Token behavior

- E-mail confirmation tokens expire after 24 hours.
- Temporary CV access tokens expire after 24 hours.
- Token payloads must remain encrypted and validated server-side.
- Expired or invalid tokens must redirect to a safe public page.

## Caching and indexing

Sensitive CV routes should remain non-cacheable and non-indexable.

Expected headers for protected access/download routes:

```text
Cache-Control: no-store, private, max-age=0
X-Robots-Tag: noindex, nofollow, noarchive
```

`robots.ts` should also disallow `/cv/access` and `/api/cv/`.

## Reporting a vulnerability

If you find a security issue, contact:

```text
ricardomachado.zulk@gmail.com
```

Please include:

- A concise description of the issue.
- Steps to reproduce.
- Potential impact.
- Any suggested mitigation.

Do not publicly disclose sensitive vulnerabilities before they are reviewed and addressed.
