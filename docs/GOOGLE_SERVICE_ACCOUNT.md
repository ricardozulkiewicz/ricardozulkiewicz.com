# Google Service Account Setup

This guide explains how to configure Google Drive private CV delivery and optional Google Sheets lead persistence for the controlled CV access flow.

## Purpose

The site uses a Google service account for two possible backend-only operations:

1. Fetch private CV PDF files from Google Drive.
2. Append CV access events to a Google Sheets lead log.

Visitors must never receive direct Google Drive URLs or file IDs. The public download entry point must remain:

```text
/api/cv/download
```

## Required Google APIs

Enable these APIs in the Google Cloud project used by the service account:

- Google Drive API — required for private CV file delivery.
- Google Sheets API — required only if lead/event persistence is enabled.

## Service account credentials

Create a service account and generate a JSON key.

From that JSON key, the app needs only these values in production environment variables:

```bash
GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL=<service-account-email>
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=<private-key-with-escaped-newlines>
```

Important:

- Do not commit the JSON key to the repository.
- Do not commit the private key to any `.env` file.
- Store the values only in Vercel environment variables or another deployment secret manager.
- Preserve escaped newlines in the private key when copying it into Vercel.

## Private CV files in Google Drive

Official production files should be stored as private Google Drive files.

Expected files:

```text
Ricardo_Zulkiewicz_CV_PT.pdf
Ricardo_Zulkiewicz_CV_EN.pdf
```

For each file:

1. Keep the file private.
2. Open Share settings.
3. Add the service account e-mail as Viewer.
4. Copy only the Google Drive file ID.
5. Add the file ID to Vercel as an environment variable.

Environment variables:

```bash
CV_PT_GOOGLE_DRIVE_FILE_ID=<portuguese-cv-file-id>
CV_EN_GOOGLE_DRIVE_FILE_ID=<english-cv-file-id>
```

Do not render those values in client-side code.

## Optional Google Sheets persistence

If CV access events should be logged, create a spreadsheet with a tab named `CV Leads`.

Recommended columns:

```text
event_timestamp, status, lead_id, requested_at, full_name, professional_email, whatsapp, company, role, linkedin, cv_version, file, reason, message, user_agent, referer, forwarded_for, notes
```

Then:

1. Share the spreadsheet with the service account as Editor.
2. Copy the spreadsheet ID.
3. Configure the variables below in Vercel.

```bash
CV_LEADS_SPREADSHEET_ID=<spreadsheet-id>
CV_LEADS_SHEET_NAME="CV Leads"
```

If these variables are not configured, the main CV access flow can still work through e-mail, but events will not be written to Google Sheets.

## Permission model

Use the minimum necessary access:

- CV PDFs: service account as Viewer.
- Lead spreadsheet: service account as Editor.
- Do not give the service account broad Drive access.
- Do not share the whole Drive folder unless necessary.

## Production validation

After deployment, validate configuration through the diagnostics endpoint:

```bash
curl -H "Authorization: Bearer $CV_ADMIN_TOKEN" \
  https://ricardozulkiewicz.com/api/cv/diagnostics
```

Expected final response:

```json
{
  "ok": true,
  "status": "ready"
}
```

If `privateCvDelivery.configured` is false, check:

- CV file IDs are configured in Vercel.
- CV files are shared with the service account as Viewer.
- `GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL` is correct.
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` is present and correctly escaped.

If `persistence.googleSheets.configured` is false, check:

- `CV_LEADS_SPREADSHEET_ID` is configured.
- `CV_LEADS_SHEET_NAME` matches the spreadsheet tab.
- The spreadsheet is shared with the service account as Editor.

## Common mistakes

- Pasting the entire Google service account JSON into `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` instead of only the private key value.
- Losing newline escaping in the private key.
- Sharing the CV file with a personal Gmail address instead of the service account e-mail.
- Configuring the full Google Drive URL instead of only the file ID.
- Making the CV file public instead of keeping it private and backend-served.
- Forgetting to redeploy after adding Vercel environment variables.
