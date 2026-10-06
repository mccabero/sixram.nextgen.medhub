# Vercel Deployment Guide

## Deployment Checklist

- Confirm Shopify Storefront credentials are available
- Set `NEXT_PUBLIC_SITE_URL` to the final production domain
- Run `npm run lint`
- Run `npm run typecheck`
- Run `npm run build`

## Vercel Project Setup

1. Import the repository into Vercel
2. Keep the default framework preset as `Next.js`
3. Add the environment variables below to the Vercel project

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
SHOPIFY_API_VERSION=2025-01
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

## Build Settings

- Install command: `npm install`
- Build command: `npm run build`
- Output: default Next.js output

## Post-Deployment Validation

- Verify the homepage loads with live product content
- Verify `/products`, `/collections`, and `/search` return catalog results
- Verify a product detail page loads by handle
- Verify add-to-cart, quantity updates, and item removal
- Verify checkout redirects to Shopify
- Verify `sitemap.xml` and `robots.txt`
- Verify contact form submission response

## Rollback Checklist

- Revert the Vercel deployment to the last healthy production build
- Reconfirm environment variable values
- Validate Shopify Storefront token permissions
- Check recent changes to collection handles or product handles
