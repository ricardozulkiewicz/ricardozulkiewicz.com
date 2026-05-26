# Production Launch Checklist

Use this checklist when launching `ricardozulkiewicz.com` in production.

## 1. Repository readiness

- [ ] Latest changes are merged into `main`.
- [ ] GitHub Actions build validation exists.
- [ ] Manual production smoke test workflow exists.
- [ ] Dependabot is configured.
- [ ] No real `.env` files are committed.
- [ ] `.env.example` contains only placeholder values.
- [ ] `.gitignore` protects local and secret files.
- [ ] `.vercelignore` excludes repository-only documentation and development artifacts from deploy.
- [ ] `README.md` and `docs/` are up to date.
- [ ] Issue and pull request templates exist.

## 2. Vercel project

- [ ] Repository `ricardozulkiewicz/ricardozulkiewicz.com` is imported into Vercel.
- [ ] Framework preset is `Next.js`.
- [ ] Install command is `npm install`.
- [ ] Build command is `npm run build`.
- [ ] Node runtime is compatible with Node 20.
- [ ] Production deploy uses the `main` branch.

## 3. Domain

- [ ] `ricardozulkiewicz.com` is added to the Vercel project.
- [ ] DNS records are configured according to Vercel.
- [ ] HTTPS certificate is active.
- [ ] Apex/root domain resolves correctly.
- [ ] `www` behavior is configured intentionally, either redirecting or serving the same project.

## 4. Environment variables

- [ ] `NEXT_PUBLIC_SITE_URL` is set to `https://ricardozulkiewicz.com`.
- [ ] `CV_ACCESS_SECRET` is configured and strong.
- [ ] `CV_ADMIN_TOKEN` is configured and different from `CV_ACCESS_SECRET`.
- [ ] `RESEND_API_KEY` is configured.
- [ ] `CV_EMAIL_FROM` uses a verified sender.
- [ ] `CV_OWNER_EMAIL` is configured.
- [ ] `GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL` is configured if using Google Drive or Google Sheets.
- [ ] `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` is configured with escaped newlines if using Google Drive or Google Sheets.
- [ ] `CV_PT_GOOGLE_DRIVE_FILE_ID` or `CV_PT_DOWNLOAD_URL` is configured.
- [ ] `CV_EN_GOOGLE_DRIVE_FILE_ID` or `CV_EN_DOWNLOAD_URL` is configured.
- [ ] Optional Google Sheets variables are configured if lead persistence is required.

## 5. CV files

- [ ] Portuguese CV file is the official selected version.
- [ ] English CV file is the official selected version.
- [ ] Both files are private in Google Drive or another backend-only private source.
- [ ] If using Google Drive, both files are shared with the Google service account as Viewer.
- [ ] No direct public CV download URL is exposed in the site.
- [ ] CV files are not committed to the repository.
- [ ] CV files are not placed in `/public`.

## 6. Resend e-mail

- [ ] Sender/domain is verified in Resend.
- [ ] Test visitor receives confirmation e-mail.
- [ ] Test visitor receives temporary CV access e-mail after confirmation.
- [ ] Owner receives new-request notification.
- [ ] Owner receives CV-accessed notification.
- [ ] E-mails do not expose Google Drive source URLs or backend-only source URLs.

## 7. Google Sheets, optional

- [ ] Spreadsheet exists if persistence is enabled.
- [ ] Sheet tab name matches `CV_LEADS_SHEET_NAME`.
- [ ] Service account has Editor access to the spreadsheet.
- [ ] Events are appended for `request_submitted`, `email_confirmed` and `download_accessed`.

## 8. Public pages

- [ ] `/` loads correctly.
- [ ] `/pt` loads correctly.
- [ ] `/cv` loads correctly.
- [ ] `/privacidade` loads correctly.
- [ ] `/termos` loads correctly.
- [ ] `/humans.txt` loads correctly.
- [ ] `/.well-known/security.txt` loads correctly.
- [ ] Unknown routes show the premium 404 page.

## 9. Friendly redirects

- [ ] `/contact` redirects to `/#contact`.
- [ ] `/contato` redirects to `/pt#contact`.
- [ ] `/about` redirects to `/#about`.
- [ ] `/sobre` redirects to `/pt#about`.
- [ ] `/portfolio` redirects to `/#work`.
- [ ] `/projetos` redirects to `/pt#work`.
- [ ] `/resume` redirects to `/cv`.
- [ ] `/curriculo` redirects to `/cv`.
- [ ] `/currículo` redirects to `/cv`.
- [ ] `/download-cv` redirects to `/cv`.
- [ ] `/baixar-curriculo` redirects to `/cv`.
- [ ] `/baixar-currículo` redirects to `/cv`.
- [ ] `/privacy` redirects to `/privacidade`.
- [ ] `/privacy-policy` redirects to `/privacidade`.
- [ ] `/politica-de-privacidade` redirects to `/privacidade`.
- [ ] `/política-de-privacidade` redirects to `/privacidade`.
- [ ] `/lgpd` redirects to `/privacidade`.
- [ ] `/terms` redirects to `/termos`.
- [ ] `/terms-of-use` redirects to `/termos`.
- [ ] `/termos-de-uso` redirects to `/termos`.
- [ ] `/pt/cv` redirects to `/cv`.
- [ ] Known direct PDF routes redirect to `/cv`.

## 10. Diagnostics and health

- [ ] `/api/health` returns `ok: true`.
- [ ] `/api/cv/diagnostics` works with `CV_ADMIN_TOKEN`.
- [ ] `/api/cv/diagnostics` returns `status: ready`.
- [ ] Invalid diagnostics requests do not expose sensitive data.
- [ ] Manual GitHub Actions smoke test workflow passes against production URL.

## 11. SEO and privacy

- [ ] Sitemap includes `/`, `/pt`, `/cv`, `/privacidade` and `/termos`.
- [ ] Robots allows public pages.
- [ ] Robots disallows `/cv/access`.
- [ ] Robots disallows `/api/`.
- [ ] `/cv/access` is noindex.
- [ ] `/api/cv/*` is noindex.
- [ ] `/api/cv/download` is no-cache.
- [ ] JSON-LD structured data is present in the root layout.
- [ ] Privacy page is accessible from relevant user flows.

## 12. Visual QA

- [ ] Desktop home page reviewed.
- [ ] Mobile home page reviewed.
- [ ] `/pt` reviewed.
- [ ] `/cv` reviewed.
- [ ] `/privacidade` reviewed.
- [ ] `/termos` reviewed.
- [ ] 404 page reviewed.
- [ ] Loading state reviewed when possible.
- [ ] Error state reviewed when possible.
- [ ] LinkedIn preview reviewed.
- [ ] WhatsApp preview reviewed.

## 13. Final end-to-end test

- [ ] Submit `/cv` form with a controlled test e-mail.
- [ ] Confirm first e-mail.
- [ ] Receive temporary access link.
- [ ] Open `/cv/access?token=...`.
- [ ] Download Portuguese CV if requested.
- [ ] Download English CV if requested.
- [ ] Confirm access notification arrives.
- [ ] Confirm no private source URL appears in browser, e-mail or page HTML.

## Launch complete

The site can be considered launched when:

- Custom domain is live.
- Main website is accessible.
- `/cv` flow works end-to-end.
- Diagnostics returns `ready`.
- CV PDFs are delivered only through backend-controlled access.
- Privacy and security documentation are published.
- Smoke tests and visual QA pass.
