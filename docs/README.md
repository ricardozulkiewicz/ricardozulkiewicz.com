# Documentation Index

This directory centralizes operational documentation for `ricardozulkiewicz.com`.

## Production deployment

- [`DEPLOYMENT.md`](./DEPLOYMENT.md)

End-to-end Vercel deployment guide covering project import, environment variables, domain setup, diagnostics and final validation.

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

1. Read `DEPLOYMENT.md`.
2. Configure Vercel project and domain.
3. Generate token secrets with `node scripts/generate-cv-secrets.mjs`.
4. Configure variables from `PRODUCTION_ENVIRONMENT.md`.
5. Configure Resend using `RESEND_EMAIL_SETUP.md`.
6. Configure Google service account using `GOOGLE_SERVICE_ACCOUNT.md`.
7. Deploy production.
8. Test `/api/health`.
9. Run `/api/cv/diagnostics`.
10. Test the complete `/cv` request, confirmation and download flow.
