import type {
  CatalogResult,
  Collection,
  PaginationState,
  Product,
  ProductSortOption,
} from "@/types/commerce";

const DEFAULT_PAGE_SIZE = 12;

export function sortProducts(
  products: Product[],
  sort: ProductSortOption = "featured",
) {
  const cloned = [...products];

  switch (sort) {
    case "price-asc":
      return cloned.sort(
        (left, right) =>
          Number.parseFloat(left.price.amount) -
          Number.parseFloat(right.price.amount),
      );
    case "price-desc":
      return cloned.sort(
        (left, right) =>
          Number.parseFloat(right.price.amount) -
          Number.parseFloat(left.price.amount),
      );
    case "title-asc":
      return cloned.sort((left, right) => left.title.localeCompare(right.title));
    case "title-desc":
      return cloned.sort((left, right) => right.title.localeCompare(left.title));
    case "featured":
    default:
      return cloned;
  }
}

export function filterProducts(
  products: Product[],
  search = "",
  collectionHandle?: string,
) {
  const query = search.trim().toLowerCase();

  return products.filter((product) => {
    const matchesQuery =
      query.length === 0 ||
      [
        product.title,
        product.description,
        product.vendor,
        product.productType,
        product.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);

    const matchesCollection =
      !collectionHandle ||
      product.collections.some((collection) => collection.handle === collectionHandle);

    return matchesQuery && matchesCollection;
  });
}

export function paginateProducts(
  products: Product[],
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
): CatalogResult {
  const totalItems = products.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * pageSize;
  const items = products.slice(start, start + pageSize);

  const pagination: PaginationState = {
    currentPage,
    pageSize,
    totalItems,
    totalPages,
  };

  return { items, pagination };
}

export function getCatalogResult({
  products,
  page,
  pageSize,
  sort,
  search,
  collection,
}: {
  products: Product[];
  page?: number;
  pageSize?: number;
  sort?: ProductSortOption;
  search?: string;
  collection?: string;
}) {
  const filtered = filterProducts(products, search, collection);
  const sorted = sortProducts(filtered, sort);

  return paginateProducts(sorted, page, pageSize);
}

export function getFeaturedProducts(products: Product[], limit = 4) {
  return products.filter((product) => product.availableForSale).slice(0, limit);
}

export function getRelatedProducts(
  products: Product[],
  currentProduct: Product,
  limit = 4,
) {
  return products
    .filter(
      (product) =>
        product.id !== currentProduct.id &&
        product.collections.some((collection) =>
          currentProduct.collections.some(
            (currentCollection) => currentCollection.handle === collection.handle,
          ),
        ),
    )
    .slice(0, limit);
}

export function getCategoryOptions(collections: Collection[]) {
  return collections.map((collection) => ({
    label: collection.title,
    value: collection.handle,
  }));
}
