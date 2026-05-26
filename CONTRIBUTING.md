# Contributing Guide

This repository powers `ricardozulkiewicz.com`, including the controlled CV access flow.

## Development principles

- Keep the site premium, minimal, executive and consistent with the existing visual identity.
- Keep the CV access flow controlled, token-based and backend-served.
- Do not expose private CV file URLs, Google Drive source URLs or service account credentials.
- Prefer small, focused changes with clear validation notes.
- Update documentation when changing architecture, deployment, environment variables, privacy, security or the CV flow.

## Local development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Build locally:

```bash
npm run build
```

## Node version

Use Node 20.

```bash
nvm use
```

The repository includes:

```text
.nvmrc
package.json engines
```

## Branch and pull request workflow

Recommended flow:

1. Create a focused branch.
2. Make the change.
3. Run build validation.
4. Open a pull request using the PR template.
5. Complete the relevant CV/security/privacy checklists.
6. Merge only after validation is complete.

## Required checks before merging

For general changes:

- [ ] `npm run build` passes.
- [ ] Affected routes were manually reviewed.
- [ ] No `.env` or secret file was committed.
- [ ] Documentation was updated if needed.

For `/cv` or API changes:

- [ ] `/cv` still renders correctly.
- [ ] `/api/cv/request-access` still validates input.
- [ ] Rate limiting and honeypot behavior were not weakened unintentionally.
- [ ] Confirmation token behavior remains intentional.
- [ ] Temporary download token behavior remains intentional.
- [ ] `/api/cv/download` still validates token and permitted file.
- [ ] No private Google Drive URL is exposed client-side.
- [ ] No service account credential or secret is committed.

For production/deploy changes:

- [ ] `docs/DEPLOYMENT.md` is still accurate.
- [ ] `docs/PRODUCTION_ENVIRONMENT.md` is still accurate.
- [ ] `docs/LAUNCH_CHECKLIST.md` is still accurate.
- [ ] Smoke test instructions remain valid.

## Environment variables

Never commit real environment values.

Allowed:

```text
.env.example
```

Not allowed:

```text
.env
.env.local
.env.production
.env.* with real secrets
```

Generate local candidate values for production secrets with:

```bash
node scripts/generate-cv-secrets.mjs
```

Copy generated values only into the production secret manager, such as Vercel environment variables.

## Controlled CV access rules

The CV must remain accessible only through the controlled flow:

```text
/cv
↓
E-mail confirmation
↓
Temporary access link
↓
Backend-served download through /api/cv/download
```

Do not replace this with:

- Public Google Drive links.
- Public static PDF paths.
- Direct download buttons.
- Client-side file IDs or source URLs.

## Documentation map

Before changing the flow, review:

- `docs/PROJECT_STATUS.md`
- `docs/ARCHITECTURE.md`
- `docs/DEPLOYMENT.md`
- `docs/PRODUCTION_ENVIRONMENT.md`
- `docs/GOOGLE_SERVICE_ACCOUNT.md`
- `docs/RESEND_EMAIL_SETUP.md`
- `docs/SPAM_PROTECTION.md`
- `docs/LAUNCH_CHECKLIST.md`
- `docs/SMOKE_TESTS.md`
- `SECURITY.md`

## Production validation

After deploy, run:

```bash
node scripts/production-smoke-test.mjs https://ricardozulkiewicz.com
```

With diagnostics:

```bash
CV_ADMIN_TOKEN=<token> node scripts/production-smoke-test.mjs https://ricardozulkiewicz.com
```

Then manually validate the full CV request, confirmation and download flow.
