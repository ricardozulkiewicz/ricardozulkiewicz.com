# Resend Setup

This guide explains the email setup for the controlled CV access flow.

## Goal

Enable transactional emails for:

- Request confirmation
- Temporary access link delivery
- Owner notifications
- Access notifications

## Recommended sender

Use a professional sender under the production domain:

```text
Ricardo Zulkiewicz <cv@ricardozulkiewicz.com>
```

## Setup steps

1. Create or open the Resend account.
2. Add the domain `ricardozulkiewicz.com`.
3. Configure the DNS records requested by Resend.
4. Wait until the domain is verified.
5. Create an API key.
6. Add the API key to Vercel as `RESEND_API_KEY`.
7. Add the verified sender to Vercel as `CV_EMAIL_FROM`.
8. Add the owner email to Vercel as `CV_OWNER_EMAIL`.
9. Redeploy the project after adding variables.

## Required variables

```bash
RESEND_API_KEY=<resend-api-key>
CV_EMAIL_FROM="Ricardo Zulkiewicz <cv@ricardozulkiewicz.com>"
CV_OWNER_EMAIL=ricardomachado.zulk@gmail.com
```

## Validation

After deployment:

1. Submit a request on `/cv` using a real test email.
2. Confirm the request confirmation email arrives.
3. Open the confirmation link.
4. Confirm the temporary access email arrives.
5. Confirm the owner notification arrives.

## Common issues

### Email does not arrive

Check:

- Domain verification status in Resend.
- Sender address matches the verified domain.
- `RESEND_API_KEY` is configured in Vercel production environment.
- `CV_EMAIL_FROM` is configured exactly as a verified sender.
- The site was redeployed after variables were added.

### Emails go to spam

Check:

- SPF/DKIM/DMARC records.
- Sender domain reputation.
- Whether the content contains broken links or unverified URLs.

## Production standard

Do not use a personal Gmail address as the sender in production. Use the professional domain sender whenever possible.
