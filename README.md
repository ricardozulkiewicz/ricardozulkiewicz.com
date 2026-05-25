# ricardozulkiewicz.com

Personal website and professional portfolio of Ricardo Zulkiewicz.

## Tech stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy

Recommended deploy flow:

1. Upload the project files to this GitHub repository.
2. Import the repository into Vercel.
3. Deploy.
4. Add the custom domain `ricardozulkiewicz.com` in Vercel.
5. Configure the DNS records in Cloudflare as instructed by Vercel.

## Controlled CV access flow

The `/cv` page uses a controlled access flow instead of exposing direct public CV download links.

### Flow

1. Visitor opens `/cv`.
2. Visitor submits the access form.
3. `POST /api/cv/request-access` validates the request and generates an encrypted e-mail confirmation token.
4. Visitor receives a confirmation e-mail.
5. `GET /api/cv/confirm-email` validates the confirmation token and sends a temporary CV access link.
6. Visitor opens `/cv/access?token=...`.
7. Visitor clicks the permitted CV file.
8. `GET /api/cv/download` validates the download token, records the access by e-mail notification, and redirects to the configured private CV file URL.

### Required production environment variables

Copy `.env.example` and configure the variables in the production deployment provider.

```bash
NEXT_PUBLIC_SITE_URL=https://ricardozulkiewicz.com
CV_ACCESS_SECRET=replace-with-a-long-random-secret
CV_ADMIN_TOKEN=replace-with-a-different-long-random-secret
RESEND_API_KEY=replace-with-resend-api-key
CV_EMAIL_FROM="Ricardo Zulk <cv@ricardozulkiewicz.com>"
CV_OWNER_EMAIL=ricardomachado.zulk@gmail.com
CV_PT_DOWNLOAD_URL=https://example.com/private/ricardo-zulkiewicz-cv-pt.pdf
CV_EN_DOWNLOAD_URL=https://example.com/private/ricardo-zulkiewicz-cv-en.pdf
```

### Production diagnostics

After deployment, validate production configuration with the protected diagnostics endpoint:

```bash
curl -H "Authorization: Bearer $CV_ADMIN_TOKEN" \
  https://ricardozulkiewicz.com/api/cv/diagnostics
```

Expected result when production is ready:

```json
{
  "ok": true,
  "status": "ready"
}
```

If the endpoint returns `status: "incomplete"`, configure the missing environment variables listed in `missingRequired`.

### Security notes

- `CV_ACCESS_SECRET` is required in production and is used to encrypt temporary tokens.
- `CV_ADMIN_TOKEN` protects the diagnostics endpoint and must be different from `CV_ACCESS_SECRET`.
- `/cv/access` is configured as `noindex, nofollow`.
- Legacy direct CV URLs redirect back to `/cv`.
- `CV_PT_DOWNLOAD_URL` and `CV_EN_DOWNLOAD_URL` should point to private or controlled storage URLs, not obvious public file paths.
- Lead persistence beyond e-mail notification is not implemented yet. A future phase can add database, CRM, or Google Sheets/Pipedrive logging.

## Notes

The LinkedIn URL in `app/page.tsx` should be replaced with the final public LinkedIn profile URL.
