import { ProductCard } from "@/components/commerce/product-card";
import { EmptyState } from "@/components/sections/empty-state";
import type { Product } from "@/types/commerce";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        description="Try a different keyword, change the category filter, or browse our featured collections for popular essentials."
        actionLabel="Browse collections"
        actionHref="/collections"
      />
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
