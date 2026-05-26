# CV Form Spam Protection

This document explains the lightweight anti-spam protections used by the controlled CV access request endpoint.

## Protected endpoint

```text
POST /api/cv/request-access
```

This endpoint receives the public `/cv` form submission and can trigger transactional e-mails, so it requires basic abuse protection.

## Current protections

### 1. IP-based rate limiting

The endpoint applies a lightweight in-memory rate limit by client IP.

Current rule:

```text
5 requests per hour per client IP
```

If the limit is exceeded, the endpoint returns:

```text
HTTP 429 Too Many Requests
```

With headers:

```text
Retry-After
X-RateLimit-Limit
X-RateLimit-Remaining
X-RateLimit-Reset
```

### 2. Honeypot fields

The backend checks common hidden-field names that real users should not fill.

Current honeypot keys:

```text
website
companyWebsite
url
homepage
```

If any of these fields are submitted with a non-empty value, the request is treated as likely automated spam.

The endpoint returns a neutral success-style response:

```json
{
  "ok": true,
  "status": "received"
}
```

With status:

```text
202 Accepted
```

The request is not processed as a valid lead, and no CV confirmation e-mail should be sent.

## Why return a neutral response for honeypot submissions

Returning a neutral response avoids giving simple bots a clear signal that a spam filter was triggered.

This reduces feedback loops where bots adapt to visible validation errors.

## Limitations

The current rate limiter is intentionally lightweight and in-memory.

That means:

- It is useful as a basic protection layer.
- It has no external dependency.
- It may reset across serverless cold starts.
- It may not be globally consistent across multiple serverless instances.
- It should not be treated as enterprise-grade abuse prevention.

## Recommended future upgrade

For stronger production protection, consider one of the following:

- Vercel Firewall / Bot protection.
- Upstash Redis based rate limiting.
- Turnstile or another privacy-conscious challenge mechanism.
- A durable abuse log for repeated offenders.

## When to adjust limits

Adjust the rate limit if:

- Legitimate users report being blocked.
- Spam volume increases.
- Resend usage becomes noisy.
- The form starts receiving automated abuse.

Suggested stricter rule for higher abuse environments:

```text
3 requests per hour per client IP
```

Suggested more permissive rule for low-risk testing:

```text
10 requests per hour per client IP
```

## Operational notes

- Keep the honeypot fields absent from visible UI.
- If adding a hidden honeypot field to the frontend, avoid labels that screen readers may interpret as visible required fields.
- Do not rely on honeypot alone.
- Do not rely on in-memory rate limit alone for high-traffic production abuse.
- Keep owner notifications monitored after launch to detect spam patterns.

## Completion criteria

The spam protection layer is considered active when:

1. Valid form submissions still work.
2. Excessive repeated submissions return `429`.
3. Honeypot-filled submissions return `202` and do not trigger CV e-mails.
4. Resend does not receive noisy automated traffic from the CV form.
