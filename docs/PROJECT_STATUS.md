# Project Status

This document summarizes the current state of `ricardozulkiewicz.com`.

## Current status

The codebase is ready for production deployment, but the site is not production-complete until the Vercel project, production environment variables, domain, Resend and Google service account are configured and validated.

## Completed in code

- Next.js site structure.
- English home page.
- Portuguese home page at `/pt`.
- Controlled CV access page at `/cv`.
- CV request API at `/api/cv/request-access`.
- E-mail confirmation API at `/api/cv/confirm-email`.
- Temporary CV access page at `/cv/access`.
- Protected CV download API at `/api/cv/download`.
- Protected diagnostics API at `/api/cv/diagnostics`.
- Public health check at `/api/health`.
- Rate limiting for CV access requests.
- Honeypot spam check for CV access requests.
- Private Google Drive CV file delivery support.
- Optional Google Sheets lead/event persistence support.
- Resend transactional e-mail support.
- Premium 404 page.
- Privacy page at `/privacidade`.
- Terms page at `/termos`.
- `/privacy` redirect to `/privacidade`.
- `/lgpd` redirect to `/privacidade`.
- `/terms` redirect to `/termos`.
- Legacy/intuitive CV redirects:
  - `/resume`
  - `/curriculo`
  - `/download-cv`
  - `/baixar-curriculo`
  - `/pt/cv`
- Known direct CV PDF redirects through Next config.
- Robots configuration blocking sensitive CV routes.
- Sitemap including `/`, `/pt`, `/cv`, `/privacidade` and `/termos`.
- Global Vercel security headers.
- Vercel no-cache/noindex headers for sensitive CV routes.
- Dynamic Open Graph image route.
- Twitter/X social share image route.
- Explicit Open Graph and Twitter image metadata.
- GitHub Actions build workflow.
- Dependabot configuration.
- Node 20 runtime standardization.
- `.nvmrc`.
- Secret generation script.
- Production smoke test script with legal-route and redirect coverage.

## Completed documentation

- `README.md`
- `SECURITY.md`
- `docs/README.md`
- `docs/DEPLOYMENT.md`
- `docs/PRODUCTION_ENVIRONMENT.md`
- `docs/GOOGLE_SERVICE_ACCOUNT.md`
- `docs/RESEND_EMAIL_SETUP.md`
- `docs/LAUNCH_CHECKLIST.md`
- `docs/SMOKE_TESTS.md`
- `docs/PROJECT_STATUS.md`

## External dependencies still required

These cannot be completed in code alone and must be configured in external services.

### Vercel

- Import the GitHub repository.
- Configure the project as a Next.js app.
- Add production environment variables.
- Configure custom domain `ricardozulkiewicz.com`.
- Deploy latest `main`.

### Resend

- Verify sender/domain.
- Create production API key.
- Configure `RESEND_API_KEY` and `CV_EMAIL_FROM` in Vercel.

### Google Cloud / Google Drive

- Create or select service account.
- Enable required APIs.
- Configure service account credentials in Vercel.
- Share PT and EN CV files with the service account as Viewer.
- Configure `CV_PT_GOOGLE_DRIVE_FILE_ID` and `CV_EN_GOOGLE_DRIVE_FILE_ID`.

### Google Sheets, optional

- Create or select lead tracking spreadsheet.
- Share it with the service account as Editor.
- Configure spreadsheet environment variables in Vercel.

## Production-ready definition

The project is production-ready when all of the following are true:

1. `https://ricardozulkiewicz.com` resolves correctly.
2. `/`, `/pt`, `/cv`, `/privacidade` and `/termos` are live.
3. `/api/health` returns `ok: true`.
4. Smoke tests pass with `scripts/production-smoke-test.mjs`.
5. `/api/cv/diagnostics` returns `status: ready` with the production admin token.
6. A real `/cv` request sends the confirmation e-mail.
7. The confirmation link sends the temporary CV access e-mail.
8. `/cv/access?token=...` opens correctly.
9. `/api/cv/download` serves the selected PDF as a backend attachment.
10. No private Google Drive URL or source file URL is exposed to visitors.
11. Owner notifications are received for request and download events.
12. LinkedIn, WhatsApp and X/Twitter previews show the final social share image.

## Immediate next action

Import `ricardozulkiewicz/ricardozulkiewicz.com` into Vercel and configure the production environment variables listed in `docs/PRODUCTION_ENVIRONMENT.md`.
