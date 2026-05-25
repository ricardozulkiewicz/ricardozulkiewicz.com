# Controlled CV Access

This feature replaces the previous public CV download page with a controlled access flow.

## Visitor flow

1. Visitor opens `/cv`.
2. Visitor submits the CV request form.
3. The site sends a confirmation email.
4. Visitor confirms the email through `/cv/confirmar?token=...`.
5. The site sends a second email with an individual temporary download link.
6. Visitor opens `/download/cv?token=...`.
7. Visitor downloads the CV through `/api/cv/download?token=...`.

## Routes

- `/cv` — controlled request form.
- `/api/cv/request` — validates the form and sends the confirmation email.
- `/cv/confirmar?token=...` — confirms the visitor email and sends the CV link.
- `/cv/confirmado` — confirmation success page.
- `/download/cv?token=...` — authorized download landing page.
- `/api/cv/download?token=...` — validates the download token and redirects to the configured PDF URL.
- `/cv/link-expirado` — invalid or expired token page.

## Legacy public routes

These old routes now redirect to `/cv` to avoid bypassing the controlled flow:

- `/cv/pt-final`
- `/cv/ricardo-zulkiewicz-cv-en`

## Required environment variables

Set these in Vercel before deploying to production:

```bash
CV_ACCESS_SECRET="generate-a-long-random-secret"
RESEND_API_KEY="re_..."
EMAIL_FROM="Ricardo Zulk <cv@ricardozulkiewicz.com>"
NEXT_PUBLIC_SITE_URL="https://ricardozulkiewicz.com"
CV_PT_URL="https://.../Ricardo_Zulkiewicz_CV_PT_PREMIUM_SITE.pdf"
CV_EN_URL="https://.../Ricardo_Zulkiewicz_CV_EN_PREMIUM_SITE.pdf"
CV_NOTIFICATION_EMAIL="ricardomachado.zulk@gmail.com"
```

Optional:

```bash
LEADS_WEBHOOK_URL="https://..."
```

## Notes

- Confirmation tokens expire after 24 hours.
- Download tokens expire after 48 hours.
- Tokens are encrypted with `aes-256-gcm` using `CV_ACCESS_SECRET`.
- If `RESEND_API_KEY` is missing, the request endpoint will not send real emails and will log the skipped email in the server logs.
- If `LEADS_WEBHOOK_URL` is configured, CV lead lifecycle events are posted to that endpoint.

## Current limitation

This implementation is stateless. Lead data is encoded in encrypted tokens and optional webhook events. For a full CRM-like lead database, add a persistent store such as Vercel Postgres, Supabase, Airtable, Notion, or Google Sheets integration.
