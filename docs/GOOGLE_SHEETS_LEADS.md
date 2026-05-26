# Google Sheets Lead Persistence

This guide explains the optional Google Sheets setup for storing CV access events.

## Goal

Persist events from the controlled CV flow in a spreadsheet.

Possible events:

- Request submitted
- Email confirmed
- CV downloaded

## Recommended spreadsheet

Create a spreadsheet with a tab named:

```text
CV Leads
```

Recommended columns:

```text
event_timestamp
status
lead_id
requested_at
full_name
professional_email
whatsapp
company
role
linkedin
cv_version
file
reason
message
user_agent
referer
forwarded_for
notes
```

## Service account

1. Create a Google Cloud project.
2. Enable the Google Sheets API.
3. Create a Service Account.
4. Generate a private key.
5. Copy the service account email.
6. Share the spreadsheet with the service account as Editor.

## Vercel variables

```bash
GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL=<service-account-email>
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=<service-account-private-key-with-escaped-newlines>
CV_LEADS_SPREADSHEET_ID=<spreadsheet-id>
CV_LEADS_SHEET_NAME="CV Leads"
```

## Important private key format

The private key must preserve escaped newlines.

Use this format in Vercel:

```text
-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
```

Do not commit this value to the repository.

## Validation

After production deploy:

1. Submit the `/cv` form.
2. Confirm the email.
3. Download the CV.
4. Open the spreadsheet.
5. Confirm rows were added for each event.

Expected statuses:

```text
request_submitted
email_confirmed
download_accessed
```

## If persistence is not configured

The CV flow can still work through email and temporary access links. Google Sheets is optional.

## Recommended operating practice

Use the sheet as a lightweight lead log:

- Review requests weekly.
- Keep relevant professional contacts.
- Remove smoke-test rows after validation.
- Do not use the sheet as the only source of truth for sensitive data.
