# Vercel Setup

This guide explains how to publish `ricardozulkiewicz.com` on Vercel.

## Goal

Deploy the GitHub repository as a production Next.js website and connect the custom domain.

## Project import

1. Open Vercel.
2. Import the GitHub repository `ricardozulkiewicz/ricardozulkiewicz.com`.
3. Select the default branch `main`.
4. Use the Next.js framework preset.
5. Use Node.js 20.x.
6. Keep the default build output settings.

## Build settings

```text
Framework Preset: Next.js
Build Command: npm run build
Install Command: npm install
Output Directory: default
Node.js Version: 20.x
```

## Production environment variables

Configure the variables documented in `docs/ENVIRONMENT.md`.

Minimum required for production readiness:

```bash
NEXT_PUBLIC_SITE_URL=https://ricardozulkiewicz.com
CV_ACCESS_SECRET=<long-random-secret>
CV_ADMIN_TOKEN=<different-long-random-secret>
RESEND_API_KEY=<resend-api-key>
CV_EMAIL_FROM="Ricardo Zulkiewicz <cv@ricardozulkiewicz.com>"
CV_OWNER_EMAIL=ricardomachado.zulk@gmail.com
```

Also configure private CV file delivery using either Google Drive file IDs or backend-only source URLs.

## Domain setup

1. Add `ricardozulkiewicz.com` as a custom domain in Vercel.
2. Add `www.ricardozulkiewicz.com` if desired.
3. Follow the DNS instructions from Vercel.
4. Confirm SSL is active.
5. Confirm the production URL uses HTTPS.

## Deployment validation

After deployment, open:

```text
https://ricardozulkiewicz.com/api/health
```

Expected:

```json
{
  "ok": true,
  "service": "ricardozulkiewicz.com",
  "status": "healthy"
}
```

Then validate the protected diagnostics endpoint with the admin token.

## Common issues

### Project does not deploy

Check:

- Node.js version is 20.x.
- Environment variables are not malformed.
- The build command is `npm run build`.
- GitHub repository is connected to the correct Vercel project.

### Custom domain does not resolve

Check:

- DNS records were added exactly as Vercel instructed.
- DNS propagation may take time.
- Domain is assigned to the correct Vercel project.

### Emails do not send after deploy

Check:

- Resend variables are configured in Production.
- Sender domain is verified.
- Project was redeployed after adding variables.

## Launch rule

Do not treat the site as launched until:

- The production domain loads.
- `/api/health` works.
- CV diagnostics are ready.
- The full CV request flow works end-to-end.
