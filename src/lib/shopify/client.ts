const storeDomain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();
const apiVersion = process.env.SHOPIFY_API_VERSION?.trim() ?? "2025-01";

type StorefrontFetchOptions = {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  revalidate?: number;
};

type StorefrontResponse<T> = {
  data?: T;
  errors?: Array<{
    message: string;
  }>;
};

export function isShopifyConfigured() {
  return Boolean(storeDomain && storefrontToken);
}

export function getShopifyConfig() {
  return {
    storeDomain,
    apiVersion,
    configured: isShopifyConfigured(),
  };
}

export async function storefrontFetch<T>({
  query,
  variables,
  cache = "force-cache",
  revalidate = 300,
}: StorefrontFetchOptions) {
  if (!storeDomain || !storefrontToken) {
    throw new Error(
      "Shopify Storefront API credentials are missing. Add SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN.",
    );
  }

  const response = await fetch(
    `https://${storeDomain}/api/${apiVersion}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontToken,
      },
      body: JSON.stringify({ query, variables }),
      cache,
      next: { revalidate },
    },
  );

  const json = (await response.json()) as StorefrontResponse<T>;

  if (!response.ok || !json.data || (json.errors && json.errors.length > 0)) {
    const message =
      json.errors?.map((error) => error.message).join(", ") ??
      "Unknown Shopify Storefront API error.";
    throw new Error(message);
  }

  return json.data;
}
