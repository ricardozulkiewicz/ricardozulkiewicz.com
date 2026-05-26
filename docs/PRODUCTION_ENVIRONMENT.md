# Production Environment Variables Matrix

This document lists every environment variable used by the production site and the controlled CV access flow.

Do not commit real values to the repository. Configure production values only in Vercel or another deployment secret manager.

## Required variables

| Variable | Secret | Required | Used by | Purpose |
|---|---:|---:|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Yes | App/API | Builds absolute URLs for confirmation, access and canonical links. |
| `CV_ACCESS_SECRET` | Yes | Yes | CV tokens | Encrypts and validates e-mail confirmation and temporary access tokens. |
| `CV_ADMIN_TOKEN` | Yes | Yes | Diagnostics | Protects the production diagnostics endpoint. |
| `RESEND_API_KEY` | Yes | Yes | E-mail | Sends transactional e-mails through Resend. |
| `CV_EMAIL_FROM` | No | Yes | E-mail | Verified sender used for CV flow e-mails. |
| `CV_OWNER_EMAIL` | No | Yes | E-mail | Receives owner notifications for requests and CV access. |

## Private CV delivery variables

Preferred production mode is private Google Drive delivery through a service account.

| Variable | Secret | Required | Used by | Purpose |
|---|---:|---:|---|---|
| `GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL` | No | Yes for Google Drive mode | Google auth | Service account identity used to access private CV files. |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | Yes | Yes for Google Drive mode | Google auth | Private key used to sign Google API JWT requests. |
| `CV_PT_GOOGLE_DRIVE_FILE_ID` | No | Yes for PT CV | CV download | Private Google Drive file ID for the Portuguese CV. |
| `CV_EN_GOOGLE_DRIVE_FILE_ID` | No | Yes for EN CV | CV download | Private Google Drive file ID for the English CV. |

## Optional fallback CV delivery variables

Use these only if not using Google Drive service account delivery.

| Variable | Secret | Required | Used by | Purpose |
|---|---:|---:|---|---|
| `CV_PT_DOWNLOAD_URL` | Usually yes | Optional fallback | CV download | Backend-only source URL for the Portuguese CV. |
| `CV_EN_DOWNLOAD_URL` | Usually yes | Optional fallback | CV download | Backend-only source URL for the English CV. |
| `CV_FILE_SOURCE_AUTH_HEADER` | Yes | Optional fallback | CV download | Authorization header used when fetching protected source URLs. |

Visitors must never see fallback URLs. `/api/cv/download` must fetch and return the file server-side.

## Optional Google Sheets persistence variables

Use these only if CV access events should be logged to Google Sheets.

| Variable | Secret | Required | Used by | Purpose |
|---|---:|---:|---|---|
| `CV_LEADS_SPREADSHEET_ID` | No | Optional | Google Sheets | Spreadsheet used to persist CV request/access events. |
| `CV_LEADS_SHEET_NAME` | No | Optional | Google Sheets | Sheet tab name. Defaults conceptually to `CV Leads`. |

Google Sheets persistence also depends on:

```text
GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
```

The spreadsheet must be shared with the service account as Editor.

## Recommended production values

```bash
NEXT_PUBLIC_SITE_URL=https://ricardozulkiewicz.com
CV_EMAIL_FROM="Ricardo Zulk <cv@ricardozulkiewicz.com>"
CV_OWNER_EMAIL=ricardomachado.zulk@gmail.com
CV_LEADS_SHEET_NAME="CV Leads"
```

Generate secrets locally:

```bash
node scripts/generate-cv-secrets.mjs
```

Then copy the generated values to Vercel:

```bash
CV_ACCESS_SECRET=<generated-value>
CV_ADMIN_TOKEN=<generated-value>
```

## Environment target recommendation

Configure all required variables for:

- Production
- Preview, only if testing the full CV flow before production

For Preview environments, use non-production test values where possible.

## Validation

After variables are configured and the project is deployed, run:

```bash
curl -H "Authorization: Bearer $CV_ADMIN_TOKEN" \
  https://ricardozulkiewicz.com/api/cv/diagnostics
```

Expected production-ready result:

```json
{
  "ok": true,
  "status": "ready"
}
```

## Common configuration errors

- `CV_ACCESS_SECRET` missing in production.
- `CV_ADMIN_TOKEN` equal to `CV_ACCESS_SECRET`.
- Resend sender not verified.
- Google private key pasted without escaped newlines.
- Full Google Drive URL used where only the file ID is expected.
- CV files not shared with the service account.
- Environment variables added after deploy but production not redeployed.
- Variables added only to Preview while testing Production.

## Completion criteria

Environment configuration is complete when:

1. Diagnostics returns `ready`.
2. A real test request receives the confirmation e-mail.
3. Confirmation generates the temporary access e-mail.
4. The protected download route returns the selected PDF.
5. No client-side page exposes private source URLs, tokens or credentials.
