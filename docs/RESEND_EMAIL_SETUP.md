# Resend Transactional E-mail Setup

This guide explains how to configure transactional e-mail delivery for the controlled CV access flow.

## Purpose

The `/cv` flow depends on transactional e-mails for:

1. Sending the visitor an e-mail confirmation link.
2. Sending the visitor a temporary CV access link after confirmation.
3. Notifying the site owner when a new CV request is submitted.
4. Notifying the site owner when a CV file is accessed.

The flow should not be treated as a newsletter or marketing automation flow.

## Required environment variables

Configure these variables in the production deployment provider, such as Vercel:

```bash
RESEND_API_KEY=<resend-api-key>
CV_EMAIL_FROM="Ricardo Zulk <cv@ricardozulkiewicz.com>"
CV_OWNER_EMAIL=ricardomachado.zulk@gmail.com
```

## Sender requirements

The sender configured in `CV_EMAIL_FROM` must be verified in Resend.

Recommended sender:

```text
Ricardo Zulk <cv@ricardozulkiewicz.com>
```

Production requirements:

- The sender domain should be verified before production launch.
- The sender should look professional and be aligned with the site domain.
- Avoid using a generic free mailbox as the production sender.
- Keep `CV_OWNER_EMAIL` as the personal/professional inbox that receives lead notifications.

## E-mail types sent by the app

### 1. Confirmation e-mail

Sent after a visitor submits the `/cv` form.

Purpose:

- Confirm that the visitor owns the e-mail address.
- Prevent immediate CV delivery to invalid or mistyped e-mails.
- Start the controlled access flow.

Token validity:

```text
24 hours
```

### 2. Temporary CV access e-mail

Sent after the visitor confirms the e-mail address.

Purpose:

- Deliver a temporary access link to `/cv/access?token=...`.
- Allow only the selected CV version.
- Avoid exposing Google Drive or source file URLs.

Token validity:

```text
24 hours
```

### 3. Owner notification — new request

Sent to `CV_OWNER_EMAIL` after a new valid request is submitted.

Purpose:

- Notify Ricardo that someone requested access.
- Include the lead context: name, e-mail, WhatsApp, company, role, LinkedIn, CV version, reason and message.

### 4. Owner notification — CV accessed

Sent to `CV_OWNER_EMAIL` when the visitor downloads a permitted CV file.

Purpose:

- Register that the CV was accessed.
- Identify which file was downloaded.
- Provide context for follow-up.

## Production validation checklist

After configuring Resend and deploying production:

- [ ] Submit a test request on `/cv`.
- [ ] Confirm the visitor receives the confirmation e-mail.
- [ ] Confirm the confirmation link opens successfully.
- [ ] Confirm the visitor receives the temporary CV access e-mail.
- [ ] Confirm the temporary link opens `/cv/access`.
- [ ] Confirm the owner receives the new-request notification.
- [ ] Confirm the owner receives the CV-accessed notification after download.
- [ ] Confirm e-mails are not going to spam in a controlled test.
- [ ] Confirm the sender appears as `Ricardo Zulk` or the configured professional sender name.

## Failure modes

If no e-mail is sent, check:

- `RESEND_API_KEY` is configured in production.
- `CV_EMAIL_FROM` is configured and verified.
- `CV_OWNER_EMAIL` is configured.
- The deployment was redeployed after adding environment variables.
- The `/api/cv/request-access` route is returning success.
- The production diagnostics endpoint reports the required variables as configured.

If only owner notifications fail, check:

- `CV_OWNER_EMAIL` is valid.
- Resend is not rejecting the recipient.
- The domain/sender remains verified.

If only visitor e-mails fail, check:

- The form e-mail field is valid.
- The recipient domain is not blocking transactional e-mails.
- The e-mail is not in spam, promotions or quarantine.

## Security and privacy notes

- Do not include Google Drive source URLs in e-mails.
- Do not include service account credentials in e-mails.
- Do not include raw environment variable values in e-mails.
- Do not use the CV access request as an implicit marketing opt-in.
- Keep e-mail content transactional and directly related to the visitor's request.

## Completion criteria

Resend setup is complete when:

1. Sender/domain is verified.
2. Production variables are configured.
3. Confirmation e-mail is delivered.
4. Temporary CV access e-mail is delivered.
5. Owner receives request/access notifications.
6. The visitor can complete the full CV access flow without manual intervention.
