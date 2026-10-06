import type { Cart, Collection, Money, Product } from "@/types/commerce";

type ShopifyEdge<T> = {
  node: T;
};

type ShopifyImage = {
  url: string;
  altText?: string | null;
};

type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

type ShopifyCollection = {
  id: string;
  title: string;
  handle: string;
  description?: string | null;
  image?: ShopifyImage | null;
  seo?: {
    title?: string | null;
    description?: string | null;
  } | null;
};

type ShopifyProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
};

type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  productType?: string | null;
  vendor?: string | null;
  tags?: string[] | null;
  featuredImage?: ShopifyImage | null;
  images?: {
    edges: Array<ShopifyEdge<ShopifyImage>>;
  } | null;
  collections?: {
    edges: Array<ShopifyEdge<ShopifyCollection>>;
  } | null;
  priceRange: {
    minVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange?: {
    maxVariantPrice?: ShopifyMoney | null;
  } | null;
  variants: {
    edges: Array<ShopifyEdge<ShopifyProductVariant>>;
  };
};

type ShopifyCartLine = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: ShopifyMoney;
  };
  merchandise?: {
    id: string;
    title: string;
    price: ShopifyMoney;
    product: {
      handle: string;
      title: string;
      featuredImage?: ShopifyImage | null;
    };
  } | null;
};

type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
  };
  lines: {
    edges: Array<ShopifyEdge<ShopifyCartLine>>;
  };
};

function toMoney(money?: ShopifyMoney | null): Money {
  return {
    amount: money?.amount ?? "0.00",
    currencyCode: money?.currencyCode ?? "USD",
  };
}

export function mapCollection(collection: ShopifyCollection): Collection {
  return {
    id: collection.id,
    title: collection.title,
    handle: collection.handle,
    description: collection.description ?? "",
    image: collection.image
      ? {
          url: collection.image.url,
          altText: collection.image.altText ?? collection.title,
        }
      : null,
    seoTitle: collection.seo?.title ?? undefined,
    seoDescription: collection.seo?.description ?? undefined,
  };
}

export function mapProduct(product: ShopifyProduct): Product {
  const price = toMoney(product.priceRange.minVariantPrice);
  const compareAtPrice = toMoney(product.compareAtPriceRange?.maxVariantPrice);
  const hasCompareAt =
    Number.parseFloat(compareAtPrice.amount) >
    Number.parseFloat(price.amount);

  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description: product.description,
    descriptionHtml: product.descriptionHtml,
    availableForSale: product.availableForSale,
    price,
    compareAtPrice: hasCompareAt ? compareAtPrice : null,
    productType: product.productType ?? "Medical Supplies",
    vendor: product.vendor ?? "MedHub",
    tags: product.tags ?? [],
    featuredImage: product.featuredImage
      ? {
          url: product.featuredImage.url,
          altText: product.featuredImage.altText ?? product.title,
        }
      : null,
    images:
      product.images?.edges.map(({ node }) => ({
        url: node.url,
        altText: node.altText ?? product.title,
      })) ?? [],
    collections:
      product.collections?.edges.map(({ node }) => mapCollection(node)) ?? [],
    variants: product.variants.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      availableForSale: node.availableForSale,
      price: toMoney(node.price),
      selectedOptions: node.selectedOptions,
    })),
  };
}

export function mapCart(cart: ShopifyCart): Cart {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    subtotalAmount: toMoney(cart.cost.subtotalAmount),
    totalAmount: toMoney(cart.cost.totalAmount),
    lines: cart.lines.edges.map(({ node }) => ({
      id: node.id,
      quantity: node.quantity,
      merchandiseId: node.merchandise?.id ?? node.id,
      title: node.merchandise?.product.title ?? "Product",
      variantTitle: node.merchandise?.title ?? "Default",
      handle: node.merchandise?.product.handle ?? "#",
      image: node.merchandise?.product.featuredImage
        ? {
            url: node.merchandise.product.featuredImage.url,
            altText:
              node.merchandise.product.featuredImage.altText ??
              node.merchandise.product.title,
          }
        : null,
      price: toMoney(node.merchandise?.price),
      lineTotal: toMoney(node.cost.totalAmount),
    })),
  };
}
