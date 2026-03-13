# Website (Next.js Marketing Site)

## OVERVIEW

Next.js 15 standalone with i18n (next-intl), MDX content, and SEO optimization.

## STRUCTURE

```
website/
├── src/
│   ├── app/              # App router pages
│   ├── components/       # React components
│   ├── lib/
│   │   ├── config.ts     # Centralized URLs and site config
│   │   ├── seo/          # Metadata, JSON-LD utilities
│   │   ├── i18n/         # Internationalization config
│   │   └── mdx/          # Content loading utilities
│   └── content/          # MDX blog posts and docs
└── public/               # Static assets
```

## URL CONFIGURATION

**All URLs must come from `lib/config.ts`:**

```typescript
import { SITE_URL, APP_URL, SITE_CONFIG } from '@/lib/config';
```

- `SITE_URL` — Marketing website URL (sitemap, canonical, JSON-LD)
- `APP_URL` — Product app URL (CTA buttons)
- `SITE_CONFIG.github` — GitHub repo URL

**Environment overrides:**
- `NEXT_PUBLIC_SITE_URL` — Override default site URL
- `NEXT_PUBLIC_APP_URL` — Override default app URL

## SEO ARCHITECTURE

| File | Purpose |
|------|---------|
| `lib/seo/metadata.ts` | `createMetadata()` for Open Graph, Twitter, hreflang |
| `lib/seo/jsonld.ts` | Structured data schemas (Website, Organization, BlogPost, Software) |
| `app/sitemap.xml/route.ts` | Dynamic XML sitemap |
| `app/robots.ts` | Robots.txt with sitemap reference |
| `app/api/og/route.tsx` | Dynamic OG image generation |

## CONTENT MANAGEMENT

- Blog: `src/content/blog/{en,zh}/*.mdx`
- Docs: `src/content/docs/{en,zh}/*.mdx`
- Frontmatter parsed by `gray-matter`
- Slugs auto-generated from filenames

## DUAL SITEMAP SYNC

Two sitemaps exist and must stay synchronized on domain changes:

1. `website/src/app/sitemap.xml/route.ts` — Dynamic (uses `config.ts`)
2. `frontend/public/sitemap.xml` — Static SPA sitemap (manual update)

## DOCKER IMAGE NAMING

Docker images reference GitHub username in docs:
- `alloyapple/beautifuldiagram-website:latest`
- `alloyapple/beautifuldiagram-frontend:latest`
- `alloyapple/beautifuldiagram-backend:latest`

Update `DEPLOYMENT.md` and `src/content/docs/*/deployment.mdx` when changing username.

## ANTI-PATTERNS

- **NEVER** hardcode URLs in components — import from `lib/config.ts`
- **NEVER** skip `SITE_CONFIG.github` for GitHub links — centralizes repo ownership
- **AVOID** duplicate metadata definitions — use `createMetadata()` utility
