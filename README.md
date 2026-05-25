# ricardozulkiewicz.com

Personal website and professional portfolio of Ricardo Zulkiewicz.

## Tech stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy

Recommended deploy flow:

1. Import this GitHub repository into Vercel.
2. Configure the production environment variables listed in `.env.example`.
3. Deploy the latest `main` branch.
4. Add the custom domain `ricardozulkiewicz.com` in Vercel.
5. Configure the DNS records as instructed by Vercel.
6. Run the production diagnostics endpoint after deployment.

## Controlled CV access flow

The `/cv` page uses a controlled access flow instead of exposing direct public CV download links.

### Flow

1. Visitor opens `/cv`.
2. Visitor submits the access form.
3. `POST /api/cv/request-access` validates the request, persists `request_submitted` when Google Sheets is configured, and generates an encrypted e-mail confirmation token.
4. Visitor receives a confirmation e-mail.
5. `GET /api/cv/confirm-email` validates the confirmation token, persists `email_confirmed` when Google Sheets is configured, and sends a temporary CV access link.
6. Visitor opens `/cv/access?token=...`.
7. Visitor clicks the permitted CV file.
8. `GET /api/cv/download` validates the download token, fetches the private PDF server-side, persists `download_accessed` when Google Sheets is configured, records the access by e-mail notification, and returns the PDF as an attachment.

### Link expiration

- E-mail confirmation token: 24 hours.
- Temporary CV access token: 24 hours.
- Download route: no browser or CDN caching.

### Official CV files

Current official CV source files selected for the controlled access flow:

- PT: `Ricardo_Zulkiewicz_CV_PT.pdf`
- EN: `Ricardo_Zulkiewicz_CV_EN.pdf`

The Google Drive file IDs must be configured only as production environment variables, never in client-side code. The visitor must never receive the Google Drive URL or file ID directly.

### Required production environment variables

Copy `.env.example` and configure the variables in the production deployment provider.

```bash
NEXT_PUBLIC_SITE_URL=https://ricardozulkiewicz.com
CV_ACCESS_SECRET=replace-with-long-random-secret
CV_ADMIN_TOKEN=replace-with-different-long-random-secret
RESEND_API_KEY=replace-with-resend-api-key
CV_EMAIL_FROM="Ricardo Zulk <cv@ricardozulkiewicz.com>"
CV_OWNER_EMAIL=ricardomachado.zulk@gmail.com
```

### Private CV file delivery

Preferred mode: upload or keep the PT and EN PDFs in Google Drive as private files and share each file with the same Google Service Account used by the app as Viewer. Then configure these variables in Vercel:

```bash
CV_PT_GOOGLE_DRIVE_FILE_ID=replace-with-portuguese-cv-google-drive-file-id
CV_EN_GOOGLE_DRIVE_FILE_ID=replace-with-english-cv-google-drive-file-id
```

Fallback mode: configure source URLs that are fetched only by the backend. Visitors never see these URLs because `/api/cv/download` returns the file directly as an attachment.

```bash
CV_PT_DOWNLOAD_URL=https://example.com/private/ricardo-zulkiewicz-cv-pt.pdf
CV_EN_DOWNLOAD_URL=https://example.com/private/ricardo-zulkiewicz-cv-en.pdf
CV_FILE_SOURCE_AUTH_HEADER=optional-authorization-header-for-private-source
```

The download route sets `Cache-Control: no-store` and `X-Robots-Tag: noindex, nofollow, noarchive`.

### Optional Google Sheets lead persistence

A Google Sheet can be used for lead/event persistence.

Recommended columns:

```text
event_timestamp, status, lead_id, requested_at, full_name, professional_email, whatsapp, company, role, linkedin, cv_version, file, reason, message, user_agent, referer, forwarded_for, notes
```

Configure these variables to enable persistence:

```bash
GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL=service-account-email-from-google-cloud
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=service-account-private-key-with-escaped-newlines
CV_LEADS_SPREADSHEET_ID=replace-with-google-sheets-spreadsheet-id
CV_LEADS_SHEET_NAME="CV Leads"
```

The target spreadsheet must be shared with the service account e-mail as Editor. Private CV files stored in Google Drive must be shared with the same service account as Viewer. If Google Sheets variables are not configured, the CV flow still works through e-mail, but lead/event rows are not appended to Google Sheets.

### Production diagnostics

After deployment, validate production configuration with the protected diagnostics endpoint:

```bash
curl -H "Authorization: Bearer $CV_ADMIN_TOKEN" \
  https://ricardozulkiewicz.com/api/cv/diagnostics
```

Expected result when production is ready:

```json
{
  "ok": true,
  "status": "ready"
}
```

If the endpoint returns `status: "incomplete"`, configure the missing environment variables listed in `missingRequired`. The response also includes `privateCvDelivery` and `persistence.googleSheets.configured`.

### Production validation checklist

1. Deploy the latest `main` branch.
2. Configure all required CV environment variables.
3. Configure Resend domain/sender and confirm `CV_EMAIL_FROM` is verified.
4. Configure the official PT and EN CV file IDs as production environment variables.
5. Share the private Google Drive files with the service account as Viewer, or configure private source URLs with `CV_FILE_SOURCE_AUTH_HEADER` if needed.
6. Configure Google Sheets service account variables if lead persistence is required.
7. Share the lead spreadsheet with the service account as Editor if persistence is enabled.
8. Run `/api/cv/diagnostics`.
9. Submit a real `/cv` request using a controlled test e-mail.
10. Confirm the e-mail.
11. Open the temporary `/cv/access` link.
12. Download the permitted CV file.
13. Confirm that the browser downloads a PDF from `/api/cv/download`, not from a public source URL.
14. Confirm that the sheet has `request_submitted`, `email_confirmed`, and `download_accessed` rows for the same `lead_id` if persistence is enabled.
15. Delete any smoke-test rows if desired.

### Security notes

- `CV_ACCESS_SECRET` is required in production and is used to encrypt temporary tokens.
- `CV_ADMIN_TOKEN` protects the diagnostics endpoint and must be different from `CV_ACCESS_SECRET`.
- `/cv/access` is configured as `noindex, nofollow`.
- Legacy direct CV URLs should redirect back to `/cv`.
- The visitor never receives the configured source URL for the PDF; the file is fetched server-side and returned as an attachment.
- Google Sheets persistence is optional and should use a dedicated service account with access only to the CV leads spreadsheet and private CV files.

## Notes

The LinkedIn URL in the app should be kept aligned with the final public LinkedIn profile URL.
