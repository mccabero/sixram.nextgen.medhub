import type { MetadataRoute } from "next";

import { getCollections, getProducts } from "@/lib/shopify";
import { absoluteUrl } from "@/services/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, collections] = await Promise.all([getProducts(), getCollections()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/products",
    "/collections",
    "/about",
    "/contact",
    "/cart",
  ].map((path) => ({
    url: absoluteUrl(path || "/"),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const productRoutes = products.map((product) => ({
    url: absoluteUrl(`/products/${product.handle}`),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const collectionRoutes = collections.map((collection) => ({
    url: absoluteUrl(`/collections/${collection.handle}`),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...collectionRoutes];
}
