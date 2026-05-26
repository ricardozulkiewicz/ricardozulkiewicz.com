# Production Smoke Tests

This guide explains how to run quick production checks after deploying `ricardozulkiewicz.com`.

## Purpose

Smoke tests validate that the deployed site is alive and that the most important public routes, redirects, trust files and diagnostics are working.

They do not replace the full manual CV flow test, but they are useful immediately after deploy.

## Script

The smoke test script is located at:

```text
scripts/production-smoke-test.mjs
```

## Basic usage

After production deploy, run:

```bash
node scripts/production-smoke-test.mjs https://ricardozulkiewicz.com
```

If no URL is passed, the script falls back to:

```text
NEXT_PUBLIC_SITE_URL
```

or:

```text
https://ricardozulkiewicz.com
```

## GitHub Actions usage

A manual GitHub Actions workflow is available:

```text
.github/workflows/production-smoke-test.yml
```

Use it from the GitHub Actions tab and provide the production or preview URL as `base_url`.

## Diagnostics-enabled usage

To include the protected CV diagnostics endpoint, provide `CV_ADMIN_TOKEN` in the local shell:

```bash
CV_ADMIN_TOKEN=<production-admin-token> node scripts/production-smoke-test.mjs https://ricardozulkiewicz.com
```

For the GitHub Actions workflow, configure `CV_ADMIN_TOKEN` as a repository secret.

## Routes checked

The script checks public pages:

```text
/
/pt
/cv
/privacidade
/termos
```

It checks public trust and indexing files:

```text
/humans.txt
/.well-known/security.txt
/robots.txt
/sitemap.xml
/api/health
```

It checks friendly redirects:

```text
/contact -> /
/contato -> /pt
/about -> /
/sobre -> /pt
/portfolio -> /
/projetos -> /pt
/resume -> /cv
/curriculo -> /cv
/download-cv -> /cv
/baixar-curriculo -> /cv
/privacy -> /privacidade
/privacy-policy -> /privacidade
/politica-de-privacidade -> /privacidade
/lgpd -> /privacidade
/terms -> /termos
/terms-of-use -> /termos
/termos-de-uso -> /termos
```

If `CV_ADMIN_TOKEN` is set, it also checks:

```text
/api/cv/diagnostics
```

## Expected successful result

The script prints a JSON report.

A successful result has:

```json
{
  "ok": true
}
```

## Expected diagnostics result

When diagnostics are enabled, the expected diagnostics status is:

```json
{
  "diagnosticsStatus": "ready"
}
```

If diagnostics are skipped, the script will report that `CV_ADMIN_TOKEN` is not set in the local environment.

## Failure interpretation

### Public route fails

If `/`, `/pt`, `/cv`, `/privacidade` or `/termos` fails:

- Check Vercel deployment status.
- Check that the latest `main` branch is deployed.
- Check build logs.
- Check custom domain DNS and HTTPS status.

### Redirect route fails

If a redirect does not land on the expected path:

- Check `next.config.mjs`.
- Confirm the latest deployment includes the redirect configuration.
- Confirm Vercel is not serving an older cached deployment.

### Trust or indexing file fails

If `/humans.txt`, `/.well-known/security.txt`, `/robots.txt` or `/sitemap.xml` fails:

- Check the corresponding file or route.
- Confirm the file is included in the deployed build.
- Confirm `.vercelignore` is not excluding it.

### Health check fails

If `/api/health` fails:

- Check whether API routes are deploying correctly.
- Check Vercel function logs.
- Confirm the project is deployed as a Next.js app.

### Diagnostics fails

If `/api/cv/diagnostics` fails or does not return `ready`:

- Confirm `CV_ADMIN_TOKEN` is correct.
- Check missing variables returned by diagnostics.
- Confirm private CV file delivery is configured.
- Confirm Resend variables are configured.
- Confirm production was redeployed after adding variables.

## When to run

Run smoke tests:

- After the first production deploy.
- After changing Vercel environment variables.
- After changing CV access APIs.
- After changing redirects.
- After changing domain/DNS settings.
- Before considering the site production-ready.

## Smoke test does not validate

The smoke test does not fully validate:

- Real e-mail delivery.
- Real confirmation link click.
- Real CV PDF download.
- Google Sheets row persistence.
- Spam folder behavior.
- Full visual QA.

Those require the full launch checklist in:

```text
docs/LAUNCH_CHECKLIST.md
```
