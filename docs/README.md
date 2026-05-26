# Documentation Index

This directory centralizes operational documentation for `ricardozulkiewicz.com`.

## Project status

- [`PROJECT_STATUS.md`](./PROJECT_STATUS.md)

Current status of the project, including what is complete in code, what is complete in documentation and what still depends on external infrastructure.

## Production deployment

- [`DEPLOYMENT.md`](./DEPLOYMENT.md)

End-to-end Vercel deployment guide covering project import, environment variables, domain setup, diagnostics and final validation.

## Launch checklist

- [`LAUNCH_CHECKLIST.md`](./LAUNCH_CHECKLIST.md)

Single go-live checklist covering repository readiness, Vercel, domain, environment variables, CV files, Resend, Google Sheets, public pages, diagnostics, SEO and final end-to-end testing.

## Smoke tests

- [`SMOKE_TESTS.md`](./SMOKE_TESTS.md)

Guide for running `scripts/production-smoke-test.mjs` after deploy to validate public routes, redirects, health check and optional diagnostics.

## Environment variables

- [`PRODUCTION_ENVIRONMENT.md`](./PRODUCTION_ENVIRONMENT.md)

Matrix of required and optional production environment variables, including which values are secrets, what service uses each variable and how to validate configuration.

## Google service account

- [`GOOGLE_SERVICE_ACCOUNT.md`](./GOOGLE_SERVICE_ACCOUNT.md)

Guide for configuring Google Drive private CV delivery and optional Google Sheets persistence using a Google service account.

## Resend e-mail setup

- [`RESEND_EMAIL_SETUP.md`](./RESEND_EMAIL_SETUP.md)

Guide for configuring Resend transactional e-mails used by the controlled CV access flow.

## Recommended production order

1. Read `PROJECT_STATUS.md` to confirm what is already complete.
2. Read `DEPLOYMENT.md`.
3. Configure Vercel project and domain.
4. Generate token secrets with `node scripts/generate-cv-secrets.mjs`.
5. Configure variables from `PRODUCTION_ENVIRONMENT.md`.
6. Configure Resend using `RESEND_EMAIL_SETUP.md`.
7. Configure Google service account using `GOOGLE_SERVICE_ACCOUNT.md`.
8. Deploy production.
9. Test `/api/health`.
10. Run the smoke tests from `SMOKE_TESTS.md`.
11. Run `/api/cv/diagnostics`.
12. Complete `LAUNCH_CHECKLIST.md`.
13. Test the complete `/cv` request, confirmation and download flow.
