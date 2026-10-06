import { createEmptyCart } from "@/features/cart/local-cart";
import type { Cart, Collection, Product, ProductSortOption } from "@/types/commerce";

import { getShopifyConfig, isShopifyConfigured, storefrontFetch } from "./client";
import { mapCart, mapCollection, mapProduct } from "./mappers";
import { mockCollections, mockProducts } from "./mock-data";
import {
  ADD_TO_CART_MUTATION,
  CREATE_CART_MUTATION,
  GET_CART_QUERY,
  GET_COLLECTION_PRODUCTS_QUERY,
  GET_COLLECTIONS_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
  GET_PRODUCTS_QUERY,
  REMOVE_CART_LINE_MUTATION,
  UPDATE_CART_MUTATION,
} from "./queries";

type ShopifyProductsResponse = {
  products: {
    edges: Array<{
      node: unknown;
    }>;
  };
};

type ShopifyProductResponse = {
  product: unknown | null;
};

type ShopifyCollectionsResponse = {
  collections: {
    edges: Array<{
      node: unknown;
    }>;
  };
};

type ShopifyCollectionProductsResponse = {
  collection:
    | {
        id: string;
        title: string;
        handle: string;
        description?: string | null;
        image?: {
          url: string;
          altText?: string | null;
        } | null;
        seo?: {
          title?: string | null;
          description?: string | null;
        } | null;
        products: {
          edges: Array<{
            node: unknown;
          }>;
        };
      }
    | null;
};

type ShopifyCartPayload = {
  cart: unknown | null;
  userErrors: Array<{
    field?: string[] | null;
    message: string;
  }>;
};

type ShopifyCartResponse = {
  cart: unknown | null;
};

type ShopifyMutationResponse = {
  cartCreate?: ShopifyCartPayload;
  cartLinesAdd?: ShopifyCartPayload;
  cartLinesUpdate?: ShopifyCartPayload;
  cartLinesRemove?: ShopifyCartPayload;
};

function getMockProducts() {
  return mockProducts;
}

function getMockCollections() {
  return mockCollections;
}

function getSortVariables(sort: ProductSortOption = "featured") {
  switch (sort) {
    case "price-asc":
      return { sortKey: "PRICE", reverse: false };
    case "price-desc":
      return { sortKey: "PRICE", reverse: true };
    case "title-desc":
      return { sortKey: "TITLE", reverse: true };
    case "title-asc":
      return { sortKey: "TITLE", reverse: false };
    case "featured":
    default:
      return { sortKey: "BEST_SELLING", reverse: false };
  }
}

function matchesSearch(product: Product, search?: string) {
  if (!search) {
    return true;
  }

  const query = search.toLowerCase();
  return [product.title, product.description, product.productType, product.vendor]
    .join(" ")
    .toLowerCase()
    .includes(query);
}

function assertMutationCart(payload?: ShopifyCartPayload) {
  if (!payload) {
    throw new Error("Shopify cart mutation did not return a payload.");
  }

  if (payload.userErrors.length > 0) {
    throw new Error(payload.userErrors.map((error) => error.message).join(", "));
  }

  if (!payload.cart) {
    throw new Error("Shopify cart mutation did not return a cart.");
  }

  return mapCart(payload.cart as never);
}

export async function getProducts(options?: {
  search?: string;
  sort?: ProductSortOption;
}) {
  if (!isShopifyConfigured()) {
    return getMockProducts().filter((product) => matchesSearch(product, options?.search));
  }

  try {
    const data = await storefrontFetch<ShopifyProductsResponse>({
      query: GET_PRODUCTS_QUERY,
      variables: {
        query: options?.search?.trim() || undefined,
        ...getSortVariables(options?.sort),
      },
      revalidate: 300,
    });

    return data.products.edges.map(({ node }) => mapProduct(node as never));
  } catch (error) {
    console.warn("Falling back to mock products:", error);
    return getMockProducts().filter((product) => matchesSearch(product, options?.search));
  }
}

export async function getProductByHandle(handle: string) {
  if (!isShopifyConfigured()) {
    return getMockProducts().find((product) => product.handle === handle) ?? null;
  }

  try {
    const data = await storefrontFetch<ShopifyProductResponse>({
      query: GET_PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
      revalidate: 300,
    });

    return data.product ? mapProduct(data.product as never) : null;
  } catch (error) {
    console.warn("Falling back to mock product:", error);
    return getMockProducts().find((product) => product.handle === handle) ?? null;
  }
}

export async function getCollections() {
  if (!isShopifyConfigured()) {
    return getMockCollections();
  }

  try {
    const data = await storefrontFetch<ShopifyCollectionsResponse>({
      query: GET_COLLECTIONS_QUERY,
      revalidate: 300,
    });

    return data.collections.edges.map(({ node }) => mapCollection(node as never));
  } catch (error) {
    console.warn("Falling back to mock collections:", error);
    return getMockCollections();
  }
}

export async function getCollectionProducts(handle: string) {
  if (!isShopifyConfigured()) {
    const collection = getMockCollections().find((item) => item.handle === handle) ?? null;
    const products = getMockProducts().filter((product) =>
      product.collections.some((item) => item.handle === handle),
    );

    return { collection, products };
  }

  try {
    const data = await storefrontFetch<ShopifyCollectionProductsResponse>({
      query: GET_COLLECTION_PRODUCTS_QUERY,
      variables: { handle },
      revalidate: 300,
    });

    return {
      collection: data.collection
        ? mapCollection(data.collection as never)
        : null,
      products:
        data.collection?.products.edges.map(({ node }) => mapProduct(node as never)) ?? [],
    };
  } catch (error) {
    console.warn("Falling back to mock collection products:", error);
    const collection = getMockCollections().find((item) => item.handle === handle) ?? null;
    const products = getMockProducts().filter((product) =>
      product.collections.some((item) => item.handle === handle),
    );

    return { collection, products };
  }
}

export async function searchProducts(search: string, sort?: ProductSortOption) {
  return getProducts({ search, sort });
}

export async function createCart(lines?: Array<{ merchandiseId: string; quantity: number }>) {
  if (!isShopifyConfigured()) {
    return createEmptyCart();
  }

  const data = await storefrontFetch<ShopifyMutationResponse>({
    query: CREATE_CART_MUTATION,
    variables: { lines },
    cache: "no-store",
    revalidate: 0,
  });

  return assertMutationCart(data.cartCreate);
}

export async function addToCart(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>,
) {
  if (!isShopifyConfigured()) {
    return createEmptyCart();
  }

  const data = await storefrontFetch<ShopifyMutationResponse>({
    query: ADD_TO_CART_MUTATION,
    variables: { cartId, lines },
    cache: "no-store",
    revalidate: 0,
  });

  return assertMutationCart(data.cartLinesAdd);
}

export async function updateCartQuantity(
  cartId: string,
  lineId: string,
  quantity: number,
) {
  if (!isShopifyConfigured()) {
    return createEmptyCart();
  }

  const data = await storefrontFetch<ShopifyMutationResponse>({
    query: UPDATE_CART_MUTATION,
    variables: {
      cartId,
      lines: [{ id: lineId, quantity }],
    },
    cache: "no-store",
    revalidate: 0,
  });

  return assertMutationCart(data.cartLinesUpdate);
}

export async function removeCartItem(cartId: string, lineId: string) {
  if (!isShopifyConfigured()) {
    return createEmptyCart();
  }

  const data = await storefrontFetch<ShopifyMutationResponse>({
    query: REMOVE_CART_LINE_MUTATION,
    variables: {
      cartId,
      lineIds: [lineId],
    },
    cache: "no-store",
    revalidate: 0,
  });

  return assertMutationCart(data.cartLinesRemove);
}

export async function getCart(cartId: string) {
  if (!isShopifyConfigured()) {
    return createEmptyCart();
  }

  const data = await storefrontFetch<ShopifyCartResponse>({
    query: GET_CART_QUERY,
    variables: { cartId },
    cache: "no-store",
    revalidate: 0,
  });

  return data.cart ? mapCart(data.cart as never) : null;
}

export async function generateCheckoutUrl(cartId: string) {
  const cart = await getCart(cartId);
  return cart?.checkoutUrl ?? "/contact?reason=checkout-assistance";
}

export async function getCatalogSeedData() {
  const [products, collections] = await Promise.all([getProducts(), getCollections()]);
  return { products, collections };
}

export async function getHomepageData() {
  const [products, collections] = await Promise.all([getProducts(), getCollections()]);
  return {
    products,
    collections,
  };
}

export type { Cart, Collection, Product };
export { getShopifyConfig };
