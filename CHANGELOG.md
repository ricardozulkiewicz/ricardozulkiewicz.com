# Changelog

All notable changes to `ricardozulkiewicz.com` are documented here.

## 2026-05-25 — Production readiness and controlled CV access foundation

### Added

- Next.js personal website structure.
- English homepage at `/`.
- Portuguese homepage at `/pt`.
- Controlled CV access request page at `/cv`.
- Temporary CV access page at `/cv/access`.
- Public health check endpoint at `/api/health`.
- Protected diagnostics endpoint for CV configuration at `/api/cv/diagnostics`.
- CV request API at `/api/cv/request-access`.
- CV e-mail confirmation API at `/api/cv/confirm-email`.
- Protected CV download API at `/api/cv/download`.
- Private CV delivery support through Google Drive service account.
- Fallback private source URL delivery support for CV files.
- Optional Google Sheets persistence for CV lead/event tracking.
- Resend transactional e-mail support.
- Rate limiting for CV access requests.
- Honeypot spam check for CV access requests.
- Premium 404 page.
- Privacy page at `/privacidade`.
- Terms of use page at `/termos`.
- Redirect routes:
  - `/resume` to `/cv`
  - `/curriculo` to `/cv`
  - `/download-cv` to `/cv`
  - `/baixar-curriculo` to `/cv`
  - `/pt/cv` to `/cv`
  - `/privacy` to `/privacidade`
  - `/lgpd` to `/privacidade`
  - `/terms` to `/termos`
- Sitemap entries for `/`, `/pt`, `/cv`, `/privacidade` and `/termos`.
- Robots rules blocking `/cv/access` and `/api/cv/`.
- Vercel configuration with global security headers.
- Vercel no-cache/noindex headers for sensitive CV routes.
- GitHub Actions build validation workflow.
- Dependabot configuration for npm and GitHub Actions.
- Node 20 runtime configuration through `package.json` and `.nvmrc`.
- Secret generation script for CV token/admin secrets.
- Production smoke test script.
- GitHub issue templates for CV access and production deployment tasks.
- GitHub pull request template with CV/security/privacy checklists.
- CODEOWNERS governance file.
- Security policy.
- Contributing guide.

### Documentation added

- `README.md` with production CV access flow overview.
- `SECURITY.md`.
- `CONTRIBUTING.md`.
- `docs/README.md`.
- `docs/PROJECT_STATUS.md`.
- `docs/ARCHITECTURE.md`.
- `docs/DEPLOYMENT.md`.
- `docs/PRODUCTION_ENVIRONMENT.md`.
- `docs/GOOGLE_SERVICE_ACCOUNT.md`.
- `docs/RESEND_EMAIL_SETUP.md`.
- `docs/SPAM_PROTECTION.md`.
- `docs/SMOKE_TESTS.md`.
- `docs/LAUNCH_CHECKLIST.md`.

### Security and privacy

- CV files are designed to be delivered through backend-controlled access, not public direct links.
- E-mail confirmation token expiration aligned to 24 hours.
- Temporary CV access token expiration aligned to 24 hours.
- Sensitive routes are configured as noindex/no-cache.
- Environment files are ignored except `.env.example`.
- Pull request and issue templates include checks for secrets, private URLs and CV flow integrity.

### External setup still required

The codebase is prepared for production, but production is not complete until external infrastructure is configured:

- Vercel project import and deployment.
- Custom domain `ricardozulkiewicz.com`.
- Production environment variables.
- Resend sender/domain verification and API key.
- Google service account credentials.
- Private Google Drive CV file sharing with the service account.
- Optional Google Sheets lead/event persistence.
- End-to-end production validation.
