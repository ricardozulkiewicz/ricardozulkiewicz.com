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

1. Upload the project files to this GitHub repository.
2. Import the repository into Vercel.
3. Deploy.
4. Add the custom domain `ricardozulkiewicz.com` in Vercel.
5. Configure the DNS records in Cloudflare as instructed by Vercel.

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
8. `GET /api/cv/download` validates the download token, persists `download_accessed` when Google Sheets is configured, records the access by e-mail notification, and redirects to the configured private CV file URL.

### Required production environment variables

Copy `.env.example` and configure the variables in the production deployment provider.

```bash
NEXT_PUBLIC_SITE_URL=https://ricardozulkiewicz.com
CV_ACCESS_SECRET=replace-with-a-long-random-secret
CV_ADMIN_TOKEN=replace-with-a-different-long-random-secret
RESEND_API_KEY=replace-with-resend-api-key
CV_EMAIL_FROM="Ricardo Zulk <cv@ricardozulkiewicz.com>"
CV_OWNER_EMAIL=ricardomachado.zulk@gmail.com
CV_PT_DOWNLOAD_URL=https://example.com/private/ricardo-zulkiewicz-cv-pt.pdf
CV_EN_DOWNLOAD_URL=https://example.com/private/ricardo-zulkiewicz-cv-en.pdf
```

### Optional Google Sheets lead persistence

A Google Sheet has been created for lead/event persistence:

- Spreadsheet: `CV Leads - Ricardo Zulkiewicz`
- Spreadsheet ID: `1EPxPFHsoC5ErEFbYrv6zjYuFFa5GxnYW5FQINdNA_3A`
- Sheet tab: `CV Leads`
- Columns: `event_timestamp`, `status`, `lead_id`, `requested_at`, `full_name`, `professional_email`, `whatsapp`, `company`, `role`, `linkedin`, `cv_version`, `file`, `reason`, `message`, `user_agent`, `referer`, `forwarded_for`, `notes`

Configure these variables to enable persistence:

```bash
GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL=cv-leads-service-account@project-id.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nreplace-with-service-account-private-key\n-----END PRIVATE KEY-----\n"
CV_LEADS_SPREADSHEET_ID=1EPxPFHsoC5ErEFbYrv6zjYuFFa5GxnYW5FQINdNA_3A
CV_LEADS_SHEET_NAME="CV Leads"
```

The target spreadsheet must be shared with the service account e-mail as Editor. If these variables are not configured, the CV flow still works through e-mail, but lead/event rows are not appended to Google Sheets.

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

If the endpoint returns `status: "incomplete"`, configure the missing environment variables listed in `missingRequired`. The response also includes `persistence.googleSheets.configured`, which indicates whether Google Sheets persistence is enabled.

### Google Sheets smoke test

After Google Sheets variables are configured and the spreadsheet has been shared with the service account as Editor, run:

```bash
curl -X POST -H "Authorization: Bearer $CV_ADMIN_TOKEN" \
  https://ricardozulkiewicz.com/api/cv/diagnostics/google-sheets-test
```

Expected success response:

```json
{
  "ok": true,
  "status": "google_sheets_append_ok"
}
```

This creates a test row with `status=request_submitted` and `full_name=CV Access Smoke Test`. The row can be deleted after validation.

### Production validation checklist

1. Deploy the latest `main` branch.
2. Configure all required CV environment variables.
3. Configure Resend domain/sender and confirm `CV_EMAIL_FROM` is verified.
4. Upload the PT and EN CV PDFs to controlled/private storage.
5. Configure `CV_PT_DOWNLOAD_URL` and `CV_EN_DOWNLOAD_URL`.
6. Configure Google Sheets service account variables.
7. Share the `CV Leads - Ricardo Zulkiewicz` spreadsheet with the service account as Editor.
8. Run `/api/cv/diagnostics`.
9. Run `/api/cv/diagnostics/google-sheets-test`.
10. Submit a real `/cv` request using a controlled test e-mail.
11. Confirm the e-mail.
12. Open the temporary `/cv/access` link.
13. Download the permitted CV file.
14. Confirm that the sheet has `request_submitted`, `email_confirmed`, and `download_accessed` rows for the same `lead_id`.
15. Delete any smoke-test rows if desired.

### Security notes

- `CV_ACCESS_SECRET` is required in production and is used to encrypt temporary tokens.
- `CV_ADMIN_TOKEN` protects the diagnostics endpoint and must be different from `CV_ACCESS_SECRET`.
- `/cv/access` is configured as `noindex, nofollow`.
- Legacy direct CV URLs redirect back to `/cv`.
- `CV_PT_DOWNLOAD_URL` and `CV_EN_DOWNLOAD_URL` should point to private or controlled storage URLs, not obvious public file paths.
- Google Sheets persistence is optional and should use a dedicated service account with access only to the CV leads spreadsheet.

## Notes

The LinkedIn URL in `app/page.tsx` should be replaced with the final public LinkedIn profile URL.
