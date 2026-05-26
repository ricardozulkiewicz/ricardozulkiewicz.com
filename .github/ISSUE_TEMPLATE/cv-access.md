---
name: CV access flow issue
about: Report or plan changes related to the controlled CV access flow
title: "[CV Access] "
labels: ["cv-access"]
assignees: []
---

## Summary

Describe the issue or requested change.

## Area affected

- [ ] `/cv` request page
- [ ] `/cv/access` temporary access page
- [ ] `/api/cv/request-access`
- [ ] `/api/cv/confirm-email`
- [ ] `/api/cv/download`
- [ ] `/api/cv/diagnostics`
- [ ] Resend e-mails
- [ ] Google Drive private CV file delivery
- [ ] Google Sheets persistence
- [ ] Spam protection / rate limiting / honeypot
- [ ] Documentation

## Expected behavior

What should happen?

## Current behavior

What is happening now?

## Reproduction steps

1.
2.
3.

## Security/privacy considerations

- [ ] No private Google Drive URL should be exposed.
- [ ] No file ID should be exposed client-side unless intentionally reviewed.
- [ ] No secret should be committed.
- [ ] CV access should remain token-based.
- [ ] Sensitive routes should remain noindex/no-cache.

## Validation checklist

- [ ] `/api/health` works.
- [ ] `/api/cv/diagnostics` returns expected status.
- [ ] Valid `/cv` request still works.
- [ ] Confirmation e-mail still sends.
- [ ] Temporary access link still opens.
- [ ] Download still goes through `/api/cv/download`.
- [ ] Owner notification still works.

## Additional context

Add logs, screenshots, environment notes or links when relevant.
