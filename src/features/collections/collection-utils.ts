import type { Collection, Product } from "@/types/commerce";

export function getCollectionProductCount(
  collection: Collection,
  products: Product[],
) {
  return products.filter((product) =>
    product.collections.some((item) => item.handle === collection.handle),
  ).length;
}
