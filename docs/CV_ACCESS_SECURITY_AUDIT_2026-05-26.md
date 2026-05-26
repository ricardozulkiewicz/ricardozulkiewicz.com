# CV Access Security Audit — 2026-05-26

## Context

This audit records the current state of the controlled CV access flow for `ricardozulkiewicz.com` and the remaining production hardening steps.

## Confirmed implementation in repository

The current `main` branch implements the controlled CV access flow:

1. `/cv` renders the controlled CV access request page.
2. `POST /api/cv/request-access` validates requests, applies rate limiting and honeypot spam protection, logs the lead event when Google Sheets is configured, and sends the confirmation e-mail when Resend is configured.
3. `GET /api/cv/confirm-email` validates the confirmation token and sends the temporary `/cv/access?token=...` link.
4. `/cv/access` validates the temporary token and displays only the allowed CV file options.
5. `GET /api/cv/download` validates token and file authorization, fetches the private PDF server-side, logs the access, notifies the owner, and returns the PDF as an attachment.
6. Sensitive routes include noindex/noarchive headers and no-store cache headers where appropriate.

## Confirmed Google Drive assets

Official CV files currently identified:

- Portuguese CV file ID: `1IRQxxwRwL__x_biAQKOWHJK_IGRLJ3lZ`
- English CV file ID: `1oSjQ7tQrIGa8-VfkLVwPohiH84lr4Not`
- Leads spreadsheet ID: `1EPxPFHsoC5ErEFbYrv6zjYuFFa5GxnYW5FQINdNA_3A`

## Security finding

Both official Google Drive PDF files are currently shared with `anyone` as `reader` and `allowFileDiscovery=false`.

This means the files are not publicly searchable, but anyone with the raw Drive link can read them. This must be changed before final launch.

Required final state:

- Remove `anyone with the link` access from both PDFs.
- Share both PDFs only with the Google Service Account used by the app as Viewer.
- Keep the owner account as owner.
- Do not expose Google Drive URLs or file IDs in client-side code.

## Required Vercel production environment variables

Required:

```bash
NEXT_PUBLIC_SITE_URL=https://ricardozulkiewicz.com
CV_ACCESS_SECRET=<long-random-secret>
CV_ADMIN_TOKEN=<different-long-random-secret>
RESEND_API_KEY=<resend-api-key>
CV_EMAIL_FROM="Ricardo Zulk <cv@ricardozulkiewicz.com>"
CV_OWNER_EMAIL=ricardomachado.zulk@gmail.com
```

Preferred private CV delivery:

```bash
GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL=<service-account-email>
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=<service-account-private-key-with-escaped-newlines>
CV_PT_GOOGLE_DRIVE_FILE_ID=1IRQxxwRwL__x_biAQKOWHJK_IGRLJ3lZ
CV_EN_GOOGLE_DRIVE_FILE_ID=1oSjQ7tQrIGa8-VfkLVwPohiH84lr4Not
```

Optional lead persistence:

```bash
CV_LEADS_SPREADSHEET_ID=1EPxPFHsoC5ErEFbYrv6zjYuFFa5GxnYW5FQINdNA_3A
CV_LEADS_SHEET_NAME="CV Leads"
```

## Validation sequence

After Vercel variables are configured and the PDFs are private:

1. Open `/api/cv/diagnostics` with `Authorization: Bearer $CV_ADMIN_TOKEN`.
2. Confirm `status: ready`.
3. Submit a real `/cv` request.
4. Confirm the e-mail.
5. Open `/cv/access?token=...`.
6. Download the allowed CV file.
7. Confirm the browser downloads from `/api/cv/download`, not from a raw Drive or legacy CV URL.
8. Confirm `request_submitted`, `email_confirmed`, and `download_accessed` rows in the leads sheet if Google Sheets persistence is enabled.

## Current launch status

The site is not considered fully production-hardened until:

- Vercel environment variables are configured.
- Resend sender/domain is verified.
- Google Service Account is configured.
- Google Drive PDFs are no longer link-public.
- Diagnostics returns ready.
- A full end-to-end CV request succeeds.
