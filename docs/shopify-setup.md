# Shopify Configuration Guide

This storefront expects a Shopify store configured for medical supplies and healthcare equipment.

## 1. Create or prepare the Shopify store

- Add your medical supply products
- Create collections such as `PPE`, `Diagnostic Equipment`, `Mobility Aids`, `First Aid`, `Home Care Supplies`, `Medical Consumables`, and `Wellness Devices`
- Upload product images and write clear product descriptions

## 2. Enable Storefront API access

In Shopify Admin:

1. Go to `Settings > Apps and sales channels`
2. Open `Develop apps`
3. Create or open a custom app
4. Enable Storefront API access
5. Generate a Storefront access token

## 3. Required environment variables

Add these values to `.env.local`:

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
SHOPIFY_API_VERSION=2025-01
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

## 4. Store domain notes

- Use the full Shopify domain without `https://`
- Example: `your-store.myshopify.com`

## 5. Supported storefront capabilities in this MVP

- Get products
- Get product by handle
- Get collections
- Get collection products
- Search products
- Create cart
- Add to cart
- Update cart quantity
- Remove cart item
- Generate checkout URL

## 6. Product data recommendations

- Assign each product to at least one collection
- Make sure products have at least one sellable variant
- Provide a featured image for every product
- Use consistent product types and vendor labels for better search results

## 7. Checkout behavior

- Cart interactions are routed through Shopify when credentials are present
- The cart page and cart drawer redirect buyers to Shopify checkout using the cart checkout URL

## 8. Troubleshooting

- If catalog pages still show placeholder content, confirm the three Shopify variables are set correctly
- If cart actions fail, verify the Storefront token has cart permissions enabled
- If images do not render, confirm product images are published and accessible from the storefront
