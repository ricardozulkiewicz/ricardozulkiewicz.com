# Documentation Index

This directory centralizes operational documentation for `ricardozulkiewicz.com`.

## Project status

- [`PROJECT_STATUS.md`](./PROJECT_STATUS.md)

Current status of the project, including what is complete in code, what is complete in documentation and what still depends on external infrastructure.

## Architecture

- [`ARCHITECTURE.md`](./ARCHITECTURE.md)

Technical map of public routes, redirects, API endpoints, internal modules, token model, CV file delivery model, e-mail model, persistence, abuse protection, SEO and operational validation.

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

## Spam protection

- [`SPAM_PROTECTION.md`](./SPAM_PROTECTION.md)

Guide for the CV form abuse-protection layer, including rate limiting, honeypot behavior, limitations and future hardening options.

## Recommended production order

1. Read `PROJECT_STATUS.md` to confirm what is already complete.
2. Read `ARCHITECTURE.md` to understand the route/API/module structure.
3. Read `DEPLOYMENT.md`.
4. Configure Vercel project and domain.
5. Generate token secrets with `node scripts/generate-cv-secrets.mjs`.
6. Configure variables from `PRODUCTION_ENVIRONMENT.md`.
7. Configure Resend using `RESEND_EMAIL_SETUP.md`.
8. Configure Google service account using `GOOGLE_SERVICE_ACCOUNT.md`.
9. Review CV form abuse protection in `SPAM_PROTECTION.md`.
10. Deploy production.
11. Test `/api/health`.
12. Run the smoke tests from `SMOKE_TESTS.md`.
13. Run `/api/cv/diagnostics`.
14. Complete `LAUNCH_CHECKLIST.md`.
15. Test the complete `/cv` request, confirmation and download flow.
