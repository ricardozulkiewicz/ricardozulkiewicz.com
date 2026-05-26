# Routes Matrix

This matrix defines how the main routes should behave in production.

## Public pages

| Route | Purpose | Indexable | Notes |
|---|---|---:|---|
| `/` | English home page | Yes | Main canonical home page. |
| `/pt` | Portuguese home page | Yes | Portuguese version. |
| `/cv` | Controlled CV access request | Yes | Public request page, not a direct download page. |
| `/privacidade` | Privacy page | Yes | Legal/trust page. |
| `/termos` | Terms page | Yes | Legal/trust page. |
| `/humans.txt` | Human-readable site info | Yes | Public auxiliary file. |
| `/.well-known/security.txt` | Security contact | Yes | Public security contact file. |
| `/api/health` | Health check | No search value | Used for deploy validation. |

## Protected or non-indexable routes

| Route | Purpose | Indexable | Notes |
|---|---|---:|---|
| `/cv/access` | Temporary CV access page | No | Requires temporary token. |
| `/api/` | API routes | No | Excluded from robots. |
| `/api/cv/*` | CV API flow | No | Protected/internal flow. |

## Friendly redirects

| Source | Destination | Reason |
|---|---|---|
| `/contact` | `/#contact` | Common English contact route. |
| `/contato` | `/pt#contact` | Common Portuguese contact route. |
| `/about` | `/#about` | Common English about route. |
| `/sobre` | `/pt#about` | Common Portuguese about route. |
| `/portfolio` | `/#work` | Common portfolio route. |
| `/projetos` | `/pt#work` | Common Portuguese projects route. |
| `/curriculo` | `/cv` | CV request flow. |
| `/currículo` | `/cv` | CV request flow. |
| `/resume` | `/cv` | CV request flow. |
| `/download-cv` | `/cv` | CV request flow. |
| `/baixar-curriculo` | `/cv` | CV request flow. |
| `/baixar-currículo` | `/cv` | CV request flow. |
| `/privacy` | `/privacidade` | Common English privacy route. |
| `/privacy-policy` | `/privacidade` | Common English privacy route. |
| `/politica-de-privacidade` | `/privacidade` | Common Portuguese privacy route. |
| `/política-de-privacidade` | `/privacidade` | Common Portuguese privacy route. |
| `/lgpd` | `/privacidade` | Brazilian privacy-related route. |
| `/terms` | `/termos` | Common English terms route. |
| `/terms-of-use` | `/termos` | Common English terms route. |
| `/termos-de-uso` | `/termos` | Common Portuguese terms route. |

## Legacy CV redirects

Direct-looking CV file URLs must redirect to `/cv` so visitors enter the controlled access flow instead of downloading a public file directly.

| Source | Destination |
|---|---|
| `/Ricardo_Zulkiewicz_CV_EN.pdf` | `/cv` |
| `/CV_Ricardo_Zulkiewicz_PT.pdf` | `/cv` |
| `/Ricardo_Zulkiewicz_CV_PT.pdf` | `/cv` |
| `/cv/pt-final` | `/cv` |
| `/cv/ricardo-zulkiewicz-cv-en` | `/cv` |
| `/cv/ricardo-zulkiewicz-cv-pt` | `/cv` |

## Launch expectation

The production site should expose the professional pages, legal pages and CV request page. It should not expose direct CV files or internal API routes to search engines.
