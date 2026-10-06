export type Money = {
  amount: string;
  currencyCode: string;
};

export type ProductImage = {
  url: string;
  altText: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
};

export type Collection = {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ProductImage | null;
  seoTitle?: string;
  seoDescription?: string;
};

export type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice: Money | null;
  productType: string;
  vendor: string;
  tags: string[];
  featuredImage: ProductImage | null;
  images: ProductImage[];
  collections: Collection[];
  variants: ProductVariant[];
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandiseId: string;
  title: string;
  variantTitle: string;
  handle: string;
  image: ProductImage | null;
  price: Money;
  lineTotal: Money;
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotalAmount: Money;
  totalAmount: Money;
  lines: CartLine[];
};

export type ProductSortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "title-asc"
  | "title-desc";

export type CatalogQuery = {
  page?: number;
  pageSize?: number;
  sort?: ProductSortOption;
  search?: string;
  collection?: string;
};

export type PaginationState = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type CatalogResult = {
  items: Product[];
  pagination: PaginationState;
};

export type CartProductSnapshot = {
  handle: string;
  title: string;
  variantTitle: string;
  merchandiseId: string;
  image: ProductImage | null;
  price: Money;
};
