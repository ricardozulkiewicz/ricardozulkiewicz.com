# Domain and DNS Setup

This guide explains the production domain setup for `ricardozulkiewicz.com`.

## Goal

Connect the custom domain to the Vercel project and serve the site securely over HTTPS.

## Recommended domain setup

Primary domain:

```text
ricardozulkiewicz.com
```

Optional secondary domain:

```text
www.ricardozulkiewicz.com
```

## Vercel steps

1. Open the Vercel project.
2. Go to Settings.
3. Open Domains.
4. Add `ricardozulkiewicz.com`.
5. Add `www.ricardozulkiewicz.com` if desired.
6. Follow the exact DNS records shown by Vercel.
7. Wait for Vercel to verify the domain.
8. Confirm SSL is active.

## DNS checklist

- [ ] Apex/root domain points to Vercel.
- [ ] `www` domain is configured if used.
- [ ] No conflicting A, AAAA or CNAME records remain.
- [ ] HTTPS certificate is issued.
- [ ] `https://ricardozulkiewicz.com` loads correctly.
- [ ] `http://ricardozulkiewicz.com` redirects to HTTPS.
- [ ] `www` behavior is intentional.

## Preferred behavior

Use the apex/root domain as the canonical site:

```text
https://ricardozulkiewicz.com
```

If `www.ricardozulkiewicz.com` is enabled, it should redirect to the apex domain unless there is a strategic reason to keep both.

## After DNS is live

Validate:

```text
/api/health
/robots.txt
/sitemap.xml
/cv
/privacidade
/termos
```

Then run the full smoke tests documented in:

```text
docs/SMOKE_TESTS.md
```

## Common issues

### Domain stuck as pending

Check that the DNS records match exactly what Vercel requested.

### HTTPS not active

Wait for certificate provisioning and confirm no conflicting DNS records exist.

### Wrong project responds

Confirm the domain is assigned to the correct Vercel project.

### Old version appears

Confirm the latest `main` branch was deployed and that Vercel is not showing an older deployment.
