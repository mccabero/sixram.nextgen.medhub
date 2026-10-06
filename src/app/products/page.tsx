import type { Metadata } from "next";

import { Pagination } from "@/components/commerce/pagination";
import { ProductGrid } from "@/components/commerce/product-grid";
import { SectionTitle } from "@/components/sections/section-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCatalogResult, getCategoryOptions } from "@/features/products/catalog";
import { getNumberParam, getStringParam } from "@/features/search/query";
import { getCollections, getProducts } from "@/lib/shopify";
import type { ProductSortOption } from "@/types/commerce";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse MedHub diagnostic equipment, PPE, mobility aids, consumables, and home care essentials.",
};

const sortOptions: Array<{ label: string; value: ProductSortOption }> = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to high", value: "price-asc" },
  { label: "Price: High to low", value: "price-desc" },
  { label: "Name: A-Z", value: "title-asc" },
  { label: "Name: Z-A", value: "title-desc" },
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = searchParams ? await searchParams : {};
  const query = getStringParam(params.q);
  const sort = (getStringParam(params.sort) || "featured") as ProductSortOption;
  const collection = getStringParam(params.collection);
  const page = getNumberParam(params.page, 1);

  const [products, collections] = await Promise.all([
    getProducts({ search: query }),
    getCollections(),
  ]);

  const catalog = getCatalogResult({
    products,
    page,
    sort,
    collection: collection || undefined,
  });
  const categoryOptions = getCategoryOptions(collections);

  return (
    <div className="page-shell space-y-10 py-10 sm:py-12">
      <section className="space-y-5">
        <SectionTitle
          eyebrow="Products"
          title="Browse the full MedHub catalog."
          description="Search, sort, and filter medical supplies across diagnostic devices, PPE, home care products, mobility aids, and wellness essentials."
        />
        <form className="grid gap-3 rounded-[2rem] border border-[color:var(--border)] bg-white p-4 shadow-sm lg:grid-cols-[1.5fr_0.75fr_0.75fr_auto]">
          <Input
            name="q"
            defaultValue={query}
            placeholder="Search products"
          />
          <select
            name="collection"
            defaultValue={collection}
            className="h-12 rounded-2xl border border-[color:var(--border)] bg-white px-4 text-sm text-[color:var(--ink)] outline-none focus:border-[color:var(--primary)]"
          >
            <option value="">All categories</option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            name="sort"
            defaultValue={sort}
            className="h-12 rounded-2xl border border-[color:var(--border)] bg-white px-4 text-sm text-[color:var(--ink)] outline-none focus:border-[color:var(--primary)]"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Button type="submit">Apply filters</Button>
        </form>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-7 text-[color:var(--muted-ink)]">
            Showing {catalog.items.length} of {catalog.pagination.totalItems} products
            {collection ? " in this category" : ""}.
          </p>
        </div>

        <ProductGrid products={catalog.items} />
        <Pagination
          pathname="/products"
          pagination={catalog.pagination}
          searchParams={{
            q: query || undefined,
            sort,
            collection: collection || undefined,
          }}
        />
      </section>
    </div>
  );
}
