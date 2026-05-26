---
name: Production deployment task
about: Track Vercel, domain, environment variable or launch-readiness work
title: "[Production] "
labels: ["deployment", "production"]
assignees: []
---

## Objective

Describe the production/deployment task.

## Area affected

- [ ] Vercel project setup
- [ ] Custom domain / DNS
- [ ] Environment variables
- [ ] Resend
- [ ] Google service account
- [ ] Google Drive private CV files
- [ ] Google Sheets persistence
- [ ] Smoke tests
- [ ] Diagnostics
- [ ] Launch checklist
- [ ] Documentation

## Required configuration

List any required external configuration.

```text
Example:
CV_ACCESS_SECRET=
CV_ADMIN_TOKEN=
RESEND_API_KEY=
```

Do not paste real secret values into this issue.

## Acceptance criteria

- [ ] Latest `main` is deployed.
- [ ] `/api/health` returns `ok: true`.
- [ ] Smoke tests pass.
- [ ] `/api/cv/diagnostics` returns expected status when relevant.
- [ ] Full `/cv` flow is tested when relevant.
- [ ] No private source URL is exposed.
- [ ] Documentation is updated if needed.

## Validation evidence

Add command output, screenshots or links to deployment logs when relevant.

## Notes

Add any risk, rollback or follow-up notes.
