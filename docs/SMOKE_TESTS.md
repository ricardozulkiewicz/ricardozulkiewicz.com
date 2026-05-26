# Production Smoke Tests

This guide explains how to run quick production checks after deploying `ricardozulkiewicz.com`.

## Purpose

Smoke tests validate that the deployed site is alive and that the most important public routes, redirects and diagnostics are working.

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

## Diagnostics-enabled usage

To include the protected CV diagnostics endpoint, provide `CV_ADMIN_TOKEN` in the local shell:

```bash
CV_ADMIN_TOKEN=<production-admin-token> node scripts/production-smoke-test.mjs https://ricardozulkiewicz.com
```

The token is read locally and is not printed unless the shell itself exposes it.

## Routes checked

The script checks:

```text
/
/pt
/cv
/privacidade
/api/health
/resume -> /cv
/curriculo -> /cv
/download-cv -> /cv
/baixar-curriculo -> /cv
/privacy -> /privacidade
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

If `/`, `/pt`, `/cv` or `/privacidade` fails:

- Check Vercel deployment status.
- Check that the latest `main` branch is deployed.
- Check build logs.
- Check custom domain DNS and HTTPS status.

### Redirect route fails

If `/resume`, `/curriculo`, `/download-cv`, `/baixar-curriculo` or `/privacy` does not land on the expected path:

- Check the corresponding route file under `app/`.
- Confirm the latest deployment includes the redirect files.
- Confirm Vercel is not serving an older cached deployment.

### Health check fails

If `/api/health` fails:

- Check whether API routes are deploying correctly.
- Check Vercel function logs.
- Confirm the project is deployed as a Next.js app.

### Diagnostics fails

If `/api/cv/diagnostics` fails or does not return `ready`:

- Confirm `CV_ADMIN_TOKEN` is correct.
- Check missing variables returned by diagnostics.
- Confirm Google Drive private CV delivery is configured.
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

Those require the full launch checklist in:

```text
docs/LAUNCH_CHECKLIST.md
```
