# Private CV Files

This guide explains how the official CV PDFs should be stored and delivered.

## Principle

The CV must not be exposed through a direct public link.

The visitor should always go through:

1. `/cv` request form
2. Email confirmation
3. Temporary access link
4. Backend download route

## Official files

Use two official PDFs:

```text
Ricardo_Zulkiewicz_CV_PT.pdf
Ricardo_Zulkiewicz_CV_EN.pdf
```

## Preferred mode: private Google Drive files

1. Upload the Portuguese CV PDF to Google Drive.
2. Upload the English CV PDF to Google Drive.
3. Keep both files private.
4. Create or use a Google Service Account.
5. Share each private file with the service account email as Viewer.
6. Copy each file ID.
7. Add the file IDs to Vercel.

```bash
CV_PT_GOOGLE_DRIVE_FILE_ID=<portuguese-file-id>
CV_EN_GOOGLE_DRIVE_FILE_ID=<english-file-id>
```

The service account also needs credentials in production:

```bash
GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL=<service-account-email>
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=<service-account-private-key-with-escaped-newlines>
```

## Fallback mode: backend-only source URL

Use this mode only if Google Drive service account delivery is not ready.

```bash
CV_PT_DOWNLOAD_URL=<private-source-url>
CV_EN_DOWNLOAD_URL=<private-source-url>
CV_FILE_SOURCE_AUTH_HEADER=<optional-auth-header>
```

The source URLs must not be rendered in client-side code.

## Validation

After production deploy:

1. Request the CV via `/cv`.
2. Confirm the email.
3. Open the temporary access link.
4. Download the permitted file.
5. Confirm the browser downloads from `/api/cv/download`.
6. Confirm the original file URL or Google Drive file ID is not visible to the visitor.

## Security rules

- Do not place CV PDFs inside `/public`.
- Do not commit CV PDFs to the repository.
- Do not use public Google Drive sharing links as final visitor-facing links.
- Do not expose source URLs in React components.
- Do not commit service account credentials.
- Do not reuse `CV_ACCESS_SECRET` as `CV_ADMIN_TOKEN`.

## Recommended launch sequence

1. Upload private CV PDFs.
2. Configure file IDs or backend source URLs.
3. Deploy production.
4. Run diagnostics.
5. Test the full flow with a real email.
6. Only then treat the CV flow as production-ready.
