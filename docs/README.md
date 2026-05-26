# Documentation Index

This directory centralizes operational documentation for `ricardozulkiewicz.com`.

## Start here

- [`VALIDATION_STATUS.md`](./VALIDATION_STATUS.md)
- [`PROJECT_STATUS.md`](./PROJECT_STATUS.md)
- [`ROADMAP.md`](./ROADMAP.md)
- [`LAUNCH_RUNBOOK.md`](./LAUNCH_RUNBOOK.md)
- [`LAUNCH_CHECKLIST.md`](./LAUNCH_CHECKLIST.md)

Use these files to understand the current state of the project, what is already implemented, what still needs production validation and the order of execution for launch.

## Architecture and routes

- [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- [`ROUTES_MATRIX.md`](./ROUTES_MATRIX.md)

Use these files to understand the page structure, redirects, API routes, protected routes and expected public/private behavior.

## Production setup

- [`VERCEL_SETUP.md`](./VERCEL_SETUP.md)
- [`DOMAIN_DNS_SETUP.md`](./DOMAIN_DNS_SETUP.md)
- [`ENVIRONMENT.md`](./ENVIRONMENT.md)
- [`PRODUCTION_ENVIRONMENT.md`](./PRODUCTION_ENVIRONMENT.md)
- [`DEPLOYMENT.md`](./DEPLOYMENT.md)

Use these files to configure Vercel, domain/DNS, production variables and deployment behavior.

## Controlled CV access flow

- [`PRIVATE_CV_FILES.md`](./PRIVATE_CV_FILES.md)
- [`GOOGLE_SERVICE_ACCOUNT.md`](./GOOGLE_SERVICE_ACCOUNT.md)
- [`GOOGLE_SHEETS_LEADS.md`](./GOOGLE_SHEETS_LEADS.md)
- [`SPAM_PROTECTION.md`](./SPAM_PROTECTION.md)

Use these files to configure private CV files, Google service account access, optional lead persistence and abuse protection.

## E-mail setup

- [`RESEND_SETUP.md`](./RESEND_SETUP.md)
- [`RESEND_EMAIL_SETUP.md`](./RESEND_EMAIL_SETUP.md)

Use these files to configure transactional email delivery for the CV request, confirmation and temporary access flow.

## QA and validation

- [`SMOKE_TESTS.md`](./SMOKE_TESTS.md)
- [`VISUAL_QA_CHECKLIST.md`](./VISUAL_QA_CHECKLIST.md)

Use these files after deployment to validate routes, redirects, diagnostics, visual quality, responsive behavior and final launch readiness.

## Recommended production order

1. Read `VALIDATION_STATUS.md`.
2. Review `PROJECT_STATUS.md` and `ROADMAP.md`.
3. Review `ARCHITECTURE.md` and `ROUTES_MATRIX.md`.
4. Configure Vercel using `VERCEL_SETUP.md`.
5. Configure domain/DNS using `DOMAIN_DNS_SETUP.md`.
6. Configure variables using `ENVIRONMENT.md` and `PRODUCTION_ENVIRONMENT.md`.
7. Configure Resend using `RESEND_SETUP.md`.
8. Configure private CV file delivery using `PRIVATE_CV_FILES.md`.
9. Configure Google Sheets lead persistence if desired using `GOOGLE_SHEETS_LEADS.md`.
10. Deploy production.
11. Validate `/api/health`.
12. Run the GitHub Actions production smoke test or run the local script documented in `SMOKE_TESTS.md`.
13. Run `/api/cv/diagnostics` with the admin token.
14. Complete `VISUAL_QA_CHECKLIST.md`.
15. Complete `LAUNCH_CHECKLIST.md`.
16. Test the complete `/cv` request, confirmation and protected download flow.

## Launch principle

The site should be considered production-ready only when the public site, controlled CV access flow, email delivery, private CV delivery, diagnostics, redirects, SEO/privacy controls and visual QA all pass.
