# Launch Runbook

This runbook is the execution checklist for publishing ricardozulkiewicz.com with the least possible back-and-forth.

## Goal

Launch the site as a premium professional website for Ricardo Zulkiewicz with a controlled CV access flow.

## Current state

The codebase already includes:

- Public home page
- Portuguese home page
- Controlled CV request page
- Temporary access flow
- Protected download route
- Privacy page
- Terms page
- Not found page
- Health endpoint
- Sitemap
- Robots configuration
- Security headers

## Phase 1 — Vercel project

1. Import or connect the GitHub repository `ricardozulkiewicz/ricardozulkiewicz.com` in Vercel.
2. Use the default branch `main`.
3. Framework preset: Next.js.
4. Node version: 20.x.
5. Build command: `npm run build`.
6. Output directory: leave default.

## Phase 2 — Environment settings

Configure production environment variables in Vercel.

Required public/site variable:

```bash
NEXT_PUBLIC_SITE_URL=https://ricardozulkiewicz.com
```

Required secure variables:

```bash
CV_ACCESS_SECRET=<long-random-secret>
CV_ADMIN_TOKEN=<different-long-random-secret>
RESEND_API_KEY=<resend-api-key>
CV_EMAIL_FROM="Ricardo Zulkiewicz <cv@ricardozulkiewicz.com>"
CV_OWNER_EMAIL=ricardomachado.zulk@gmail.com
```

CV file delivery variables. Preferred mode:

```bash
CV_PT_GOOGLE_DRIVE_FILE_ID=<private-portuguese-cv-file-id>
CV_EN_GOOGLE_DRIVE_FILE_ID=<private-english-cv-file-id>
```

Fallback mode:

```bash
CV_PT_DOWNLOAD_URL=<private-source-url>
CV_EN_DOWNLOAD_URL=<private-source-url>
CV_FILE_SOURCE_AUTH_HEADER=<optional-auth-header>
```

Optional lead persistence:

```bash
GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL=<service-account-email>
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=<service-account-private-key-with-escaped-newlines>
CV_LEADS_SPREADSHEET_ID=<spreadsheet-id>
CV_LEADS_SHEET_NAME="CV Leads"
```

## Phase 3 — Private files

1. Upload the official Portuguese CV PDF.
2. Upload the official English CV PDF.
3. Keep both files private.
4. If using Google Drive, share both files with the service account as Viewer.
5. Never place either file in a public `/public` folder.
6. Never expose direct file URLs in client-side code.

## Phase 4 — Email sender

1. Configure Resend.
2. Verify sender/domain.
3. Use `cv@ricardozulkiewicz.com` as the preferred sender when the domain is ready.
4. Confirm that the sender used in `CV_EMAIL_FROM` is verified.

## Phase 5 — Diagnostics

After deploy, test:

```bash
GET /api/health
```

Expected:

```json
{
  "ok": true,
  "status": "healthy"
}
```

Then test the protected diagnostics endpoint:

```bash
GET /api/cv/diagnostics
Authorization: Bearer <CV_ADMIN_TOKEN>
```

Expected when ready:

```json
{
  "ok": true,
  "status": "ready"
}
```

## Phase 6 — End-to-end validation

1. Open `/cv`.
2. Submit a request using a test email.
3. Confirm the email.
4. Open the temporary access link.
5. Download the permitted CV file.
6. Confirm the browser downloads from `/api/cv/download`, not from a public file URL.
7. Confirm the source URL or file ID is never visible to the visitor.
8. Confirm owner notification email arrives.
9. If persistence is enabled, confirm rows are added to the lead sheet.

## Phase 7 — Final review

Review:

- Desktop home page
- Mobile home page
- `/pt`
- `/cv`
- `/cv/access`
- `/privacidade`
- `/termos`
- 404 page
- LinkedIn preview
- WhatsApp preview
- Sitemap
- Robots

## Launch decision

The site can be considered production-ready when:

- Vercel deploy succeeds.
- `/api/health` returns healthy.
- CV diagnostics return ready.
- A full CV request works end-to-end.
- The CV is not exposed through a public direct link.
- Mobile review passes.
