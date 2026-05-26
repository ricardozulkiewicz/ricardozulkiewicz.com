# Environment Setup

This document explains the production settings needed for the site.

## Required for base site

`NEXT_PUBLIC_SITE_URL`

Use the production domain.

## Required for controlled CV access

`CV_ACCESS_SECRET`

Used to encrypt temporary access tokens. Use a long random value.

`CV_ADMIN_TOKEN`

Used to protect the private diagnostics endpoint. Use a different long random value.

`CV_OWNER_EMAIL`

Receives internal notifications about CV access requests.

## Required for transactional email

`RESEND_API_KEY`

API key from the transactional email provider.

`CV_EMAIL_FROM`

Verified sender identity used for CV access emails.

## Private CV file delivery

Preferred mode: private Google Drive file IDs.

`CV_PT_GOOGLE_DRIVE_FILE_ID`

Private Portuguese CV file.

`CV_EN_GOOGLE_DRIVE_FILE_ID`

Private English CV file.

Fallback mode: backend-only source URLs.

`CV_PT_DOWNLOAD_URL`

Portuguese CV source URL fetched by the backend.

`CV_EN_DOWNLOAD_URL`

English CV source URL fetched by the backend.

`CV_FILE_SOURCE_AUTH_HEADER`

Optional authorization header for protected source URLs.

## Optional lead persistence

`GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL`

Service account email.

`GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`

Service account private key with escaped newlines.

`CV_LEADS_SPREADSHEET_ID`

Spreadsheet used to log CV events.

`CV_LEADS_SHEET_NAME`

Tab name used for CV events.

## Validation order

1. Deploy the app.
2. Open `/api/health`.
3. Confirm the base site loads.
4. Configure email.
5. Configure private CV file delivery.
6. Configure optional persistence.
7. Run protected diagnostics.
8. Submit a real CV request.
9. Confirm email.
10. Download the permitted CV file.
