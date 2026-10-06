# MedHub Phase 1 (MVP)

MedHub is a healthcare ecommerce storefront built with Next.js 15, TypeScript, Tailwind CSS, and the Shopify Storefront API. The MVP is intentionally focused on medical supplies and healthcare equipment only.

## Scope

- Medical supplies only
- No medicines
- No pharmacy workflows
- No prescription uploads
- No doctor approvals
- No healthcare records

## Tech Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style component primitives
- Shopify Storefront API
- Vercel deployment target

## Features Delivered

- Healthcare-themed homepage with hero, search, categories, featured products, value props, brands placeholder, and CTA
- Product listing page with search, sort, category filter, and pagination
- Product detail pages with gallery, pricing, availability, quantity selector, add-to-cart, and related products
- Collections landing page and collection detail pages
- Dedicated search experience with empty state handling
- Cart drawer and cart page with quantity updates, item removal, summary, and checkout redirect
- About and Contact pages
- Contact form validation and API route
- SEO metadata, Open Graph, Twitter cards, `robots.ts`, and `sitemap.ts`
- Reusable Shopify integration layer under `src/lib/shopify`
- Mock catalog fallback so the app runs before live Shopify credentials are configured

## Project Structure

```text
src/
├── app/
├── components/
├── features/
│   ├── cart/
│   ├── collections/
│   ├── products/
│   └── search/
├── hooks/
├── lib/
│   └── shopify/
├── services/
├── types/
└── utils/
```

## Local Setup

1. Copy `.env.example` to `.env.local`.
2. Add your Shopify Storefront credentials.
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000).

## Verification Commands

```bash
npm run lint
npm run typecheck
npm run build
```

## Shopify Setup

See [docs/shopify-setup.md](docs/shopify-setup.md) for the complete Storefront API configuration guide.

## Vercel Deployment

See [docs/vercel-deployment.md](docs/vercel-deployment.md) for the deployment checklist and environment setup.

## Notes

- Without Shopify credentials, the storefront uses a mock healthcare catalog so the UI can be reviewed immediately.
- Once credentials are added, product browsing and cart mutations use the live Shopify Storefront API.
