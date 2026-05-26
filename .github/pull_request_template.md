# Pull Request

## Summary

Describe what changed and why.

## Type of change

- [ ] Content / copy update
- [ ] UI / visual update
- [ ] SEO / metadata update
- [ ] CV access flow update
- [ ] API / backend update
- [ ] Security / privacy update
- [ ] Deployment / infrastructure update
- [ ] Documentation update

## Site routes affected

- [ ] `/`
- [ ] `/pt`
- [ ] `/cv`
- [ ] `/cv/access`
- [ ] `/privacidade`
- [ ] `/termos`
- [ ] API routes
- [ ] Redirect routes
- [ ] Not applicable

## CV access flow checklist

Required if this PR touches `/cv`, `/api/cv/*`, token logic, e-mail logic, private CV files, Google Drive, Resend or Google Sheets.

- [ ] The CV is still accessed through the controlled flow, not a direct public file link.
- [ ] No Google Drive source URL is exposed client-side.
- [ ] No Google Drive file ID is exposed client-side unless intentionally public and reviewed.
- [ ] No service account credential or secret is committed.
- [ ] Confirmation token expiration remains intentional.
- [ ] Temporary download token expiration remains intentional.
- [ ] `/api/cv/download` still validates token and permitted file.
- [ ] `/cv/access` remains noindex/no-cache.
- [ ] `/api/cv/download` remains noindex/no-cache.
- [ ] Owner notifications still work or were intentionally changed.
- [ ] Visitor transactional e-mails still work or were intentionally changed.

## Privacy and legal checklist

- [ ] No new personal data is collected without updating `/privacidade`.
- [ ] No marketing/newsletter use was added to the CV form without explicit consent copy.
- [ ] `/privacidade` remains accessible.
- [ ] `/termos` remains accessible.
- [ ] The change is consistent with the controlled CV access positioning.

## Security checklist

- [ ] No real `.env` file was added.
- [ ] No secret, token, private key or API key was committed.
- [ ] Security headers in `vercel.json` remain intact.
- [ ] Sensitive CV routes remain excluded from indexing.
- [ ] Rate limiting / spam protection was not weakened unintentionally.
- [ ] Diagnostics endpoint remains protected by `CV_ADMIN_TOKEN`.

## Validation

- [ ] `npm run build` passes locally or in CI.
- [ ] Public route smoke test passes when relevant.
- [ ] `/api/health` returns `ok: true` in the target environment when relevant.
- [ ] `/api/cv/diagnostics` returns expected status when relevant.
- [ ] Full `/cv` flow was manually tested when relevant.

## Deployment notes

Mention any required Vercel environment variable, Resend, Google Drive, Google Sheets or DNS change.

## Screenshots

Add screenshots for visual changes when applicable.
