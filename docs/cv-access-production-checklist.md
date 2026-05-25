# CV Access Production Checklist

This checklist prepares the controlled CV access flow for production on `ricardozulkiewicz.com`.

## 1. Deploy target

- Repository: `ricardozulkiewicz/ricardozulkiewicz.com`
- Framework: Next.js 14
- Main public route: `/cv`
- Controlled access route: `/cv/access?token=...`
- Request API: `/api/cv/request-access`
- E-mail confirmation API: `/api/cv/confirm-email`
- Protected download API: `/api/cv/download`
- Diagnostics API: `/api/cv/diagnostics`

## 2. Official CV files

Current official CV files:

| Version | File name | Production env var |
|---|---|---|
| Portuguese | `Ricardo_Zulkiewicz_CV_PT.pdf` | `CV_PT_GOOGLE_DRIVE_FILE_ID` |
| English | `Ricardo_Zulkiewicz_CV_EN.pdf` | `CV_EN_GOOGLE_DRIVE_FILE_ID` |

The file IDs must be configured as server-side environment variables only. Do not expose Google Drive links or file IDs in client-side code.

## 3. Required Vercel environment variables

Configure these for Production, Preview and Development if needed.

```bash
NEXT_PUBLIC_SITE_URL=https://ricardozulkiewicz.com
CV_ACCESS_SECRET=<long-random-secret>
CV_ADMIN_TOKEN=<different-long-random-secret>
RESEND_API_KEY=<resend-api-key>
CV_EMAIL_FROM="Ricardo Zulk <cv@ricardozulkiewicz.com>"
CV_OWNER_EMAIL=ricardomachado.zulk@gmail.com
CV_PT_GOOGLE_DRIVE_FILE_ID=<portuguese-drive-file-id>
CV_EN_GOOGLE_DRIVE_FILE_ID=<english-drive-file-id>
GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL=<service-account-email>
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=<service-account-private-key-with-escaped-newlines>
```

Optional Google Sheets persistence:

```bash
CV_LEADS_SPREADSHEET_ID=<spreadsheet-id>
CV_LEADS_SHEET_NAME="CV Leads"
```

## 4. Google Drive setup

1. Keep both CV PDFs private.
2. Share each PDF with the Google service account e-mail as Viewer.
3. Confirm both files can be read by the service account.
4. Configure their file IDs in Vercel.
5. Do not use public sharing as the primary production delivery mode.

## 5. Resend setup

1. Verify the sending domain in Resend.
2. Confirm `cv@ricardozulkiewicz.com` is an allowed sender.
3. Configure `RESEND_API_KEY` in Vercel.
4. Configure `CV_EMAIL_FROM="Ricardo Zulk <cv@ricardozulkiewicz.com>"`.
5. Send a real test request through `/cv`.

## 6. Google Sheets persistence setup, optional

1. Create a spreadsheet for CV lead events.
2. Create a tab named `CV Leads`.
3. Add these columns:

```text
event_timestamp, status, lead_id, requested_at, full_name, professional_email, whatsapp, company, role, linkedin, cv_version, file, reason, message, user_agent, referer, forwarded_for, notes
```

4. Share the spreadsheet with the Google service account as Editor.
5. Configure `CV_LEADS_SPREADSHEET_ID` and `CV_LEADS_SHEET_NAME`.

## 7. Expected production flow

1. Visitor opens `/cv`.
2. Visitor submits the form.
3. Visitor receives confirmation e-mail.
4. Visitor confirms e-mail within 24 hours.
5. Visitor receives temporary CV access link.
6. Visitor opens `/cv/access?token=...`.
7. Visitor downloads the permitted CV version.
8. Download is served by `/api/cv/download`, not by a public Google Drive URL.
9. Owner receives notifications for request and access events.
10. Google Sheets receives events if persistence is configured.

## 8. Diagnostics

Run after production deploy:

```bash
curl -H "Authorization: Bearer $CV_ADMIN_TOKEN" \
  https://ricardozulkiewicz.com/api/cv/diagnostics
```

Production is ready when the response includes:

```json
{
  "ok": true,
  "status": "ready"
}
```

If `status` is `incomplete`, fix the missing variables before testing with real visitors.

## 9. Security validation

- `/cv/access` must be `noindex`.
- `/api/cv/download` must return `Cache-Control: no-store`.
- `/api/cv/download` must return `X-Robots-Tag: noindex, nofollow, noarchive`.
- Direct PDF URLs should not be linked from the frontend.
- Known legacy direct PDF paths should redirect to `/cv`.
- `/resume` and `/curriculo` should redirect to `/cv`.
- Tokens must expire after 24 hours.
- `CV_ACCESS_SECRET` and `CV_ADMIN_TOKEN` must be different.

## 10. Final smoke test

Use a controlled e-mail address and complete the entire flow:

1. Open `https://ricardozulkiewicz.com/cv`.
2. Submit the form requesting the Portuguese CV.
3. Confirm the e-mail.
4. Open the temporary access link.
5. Download the Portuguese CV.
6. Repeat requesting the English CV.
7. Repeat requesting both versions.
8. Confirm that no Google Drive URL appears to the visitor.
9. Confirm owner notifications arrive.
10. Confirm Google Sheets rows are appended if persistence is enabled.

## 11. Rollback plan

If production e-mail or private file delivery fails:

1. Keep `/cv` online.
2. Temporarily disable promotion of the CV route in external channels.
3. Fix environment variables.
4. Run diagnostics again.
5. Re-test before sharing publicly.
