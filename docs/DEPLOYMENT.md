# Production Deployment Guide

This guide explains how to publish `ricardozulkiewicz.com` and activate the controlled CV access flow in production.

## 1. Deployment target

Recommended platform: Vercel.

Repository:

```text
ricardozulkiewicz/ricardozulkiewicz.com
```

Framework:

```text
Next.js
```

Build command:

```bash
npm run build
```

Install command:

```bash
npm install
```

Node version:

```text
20
```

## 2. Recommended Vercel setup

1. Open Vercel.
2. Select the team/account that will own the project.
3. Choose `New Project`.
4. Import the GitHub repository `ricardozulkiewicz/ricardozulkiewicz.com`.
5. Keep framework preset as `Next.js`.
6. Use the default root directory.
7. Add all production environment variables before first production deploy.
8. Deploy the `main` branch.
9. Add the custom domain `ricardozulkiewicz.com`.
10. Configure DNS according to Vercel instructions.

## 3. Required production environment variables

Add these variables in Vercel under the production environment.

```bash
NEXT_PUBLIC_SITE_URL=https://ricardozulkiewicz.com
CV_ACCESS_SECRET=<generated-long-random-secret>
CV_ADMIN_TOKEN=<generated-long-random-token>
RESEND_API_KEY=<resend-api-key>
CV_EMAIL_FROM="Ricardo Zulk <cv@ricardozulkiewicz.com>"
CV_OWNER_EMAIL=ricardomachado.zulk@gmail.com
CV_PT_GOOGLE_DRIVE_FILE_ID=<official-portuguese-cv-google-drive-file-id>
CV_EN_GOOGLE_DRIVE_FILE_ID=<official-english-cv-google-drive-file-id>
GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL=<google-service-account-email>
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=<google-service-account-private-key-with-escaped-newlines>
```

Optional, only if Google Sheets persistence is enabled:

```bash
CV_LEADS_SPREADSHEET_ID=<lead-tracking-spreadsheet-id>
CV_LEADS_SHEET_NAME="CV Leads"
```

## 4. Generate token secrets

Run locally:

```bash
node scripts/generate-cv-secrets.mjs
```

Copy the generated values into Vercel:

```text
CV_ACCESS_SECRET=<generated-value>
CV_ADMIN_TOKEN=<generated-value>
```

Do not commit generated values to the repository.

## 5. Resend setup

1. Create or open the Resend account.
2. Verify the sender domain used by `cv@ricardozulkiewicz.com`.
3. Create an API key.
4. Add the API key to Vercel as `RESEND_API_KEY`.
5. Ensure `CV_EMAIL_FROM` uses a verified sender.

The CV flow uses transactional e-mails only:

- E-mail confirmation.
- Temporary CV access link.
- Owner notification for new requests.
- Owner notification when a CV is accessed.

## 6. Google service account setup

1. Create or select a Google Cloud service account.
2. Enable Google Drive API for private CV delivery.
3. Enable Google Sheets API if lead persistence is required.
4. Add the service account e-mail to Vercel as `GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL`.
5. Add the private key to Vercel as `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`.
6. Preserve escaped newlines in the private key when adding it as an environment variable.

## 7. Private CV files

Official CV files for production:

```text
Ricardo_Zulkiewicz_CV_PT.pdf
Ricardo_Zulkiewicz_CV_EN.pdf
```

Production requirements:

1. Keep both files private in Google Drive.
2. Share each file with the Google service account as Viewer.
3. Configure the file IDs in Vercel:

```bash
CV_PT_GOOGLE_DRIVE_FILE_ID=<pt-file-id>
CV_EN_GOOGLE_DRIVE_FILE_ID=<en-file-id>
```

Visitors must never receive the Google Drive URLs directly. The only public download route should be:

```text
/api/cv/download
```

## 8. Google Sheets persistence, optional

If lead/event persistence is enabled, create a sheet with these columns:

```text
event_timestamp, status, lead_id, requested_at, full_name, professional_email, whatsapp, company, role, linkedin, cv_version, file, reason, message, user_agent, referer, forwarded_for, notes
```

Then:

1. Share the spreadsheet with the service account as Editor.
2. Add `CV_LEADS_SPREADSHEET_ID` in Vercel.
3. Set `CV_LEADS_SHEET_NAME` to the tab name, usually `CV Leads`.

## 9. Production diagnostics

After deploy, run:

```bash
curl -H "Authorization: Bearer $CV_ADMIN_TOKEN" \
  https://ricardozulkiewicz.com/api/cv/diagnostics
```

Expected response:

```json
{
  "ok": true,
  "status": "ready"
}
```

If the response is incomplete, check:

- Missing required environment variables.
- Google Drive private file configuration.
- Resend configuration.
- Service account credentials.

## 10. End-to-end validation

Run this checklist after production deploy:

- [ ] Open `https://ricardozulkiewicz.com`.
- [ ] Open `https://ricardozulkiewicz.com/pt`.
- [ ] Open `https://ricardozulkiewicz.com/cv`.
- [ ] Submit a CV access request using a controlled test e-mail.
- [ ] Confirm that the first e-mail arrives.
- [ ] Click the confirmation link.
- [ ] Confirm that the second e-mail with temporary access link arrives.
- [ ] Open `/cv/access?token=...`.
- [ ] Download the permitted CV file.
- [ ] Confirm that the PDF is served from `/api/cv/download`.
- [ ] Confirm that direct known PDF URLs redirect to `/cv`.
- [ ] Confirm `/resume`, `/curriculo`, `/download-cv`, `/baixar-curriculo` and `/pt/cv` redirect to `/cv`.
- [ ] Confirm `/privacidade` opens correctly.
- [ ] Confirm `/privacy` redirects to `/privacidade`.
- [ ] Confirm a nonexistent URL opens the premium 404 page.

## 11. Security validation

Check these requirements before considering production complete:

- [ ] No real `.env` files are committed.
- [ ] `CV_ACCESS_SECRET` and `CV_ADMIN_TOKEN` are different.
- [ ] Both values are long and random.
- [ ] `/cv/access` is not indexable.
- [ ] `/api/cv/download` is no-cache and noindex.
- [ ] Google Drive source URLs or file IDs are not rendered client-side.
- [ ] Resend sender is verified.
- [ ] Service account has only the minimum required access.

## 12. Production completion definition

The site is production-complete when:

1. The custom domain resolves correctly.
2. The main site and `/pt` are live.
3. `/cv` is live.
4. The CV request flow sends real e-mails.
5. The confirmation token works.
6. The temporary access token works.
7. The PDF downloads through the backend.
8. Diagnostics returns `ready`.
9. No private CV source URL is exposed to visitors.
