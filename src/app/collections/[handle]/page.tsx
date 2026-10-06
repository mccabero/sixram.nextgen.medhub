import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Pagination } from "@/components/commerce/pagination";
import { ProductGrid } from "@/components/commerce/product-grid";
import { SectionTitle } from "@/components/sections/section-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCatalogResult } from "@/features/products/catalog";
import { getNumberParam, getStringParam } from "@/features/search/query";
import { getCollectionProducts } from "@/lib/shopify";
import type { ProductSortOption } from "@/types/commerce";

const sortOptions: Array<{ label: string; value: ProductSortOption }> = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to high", value: "price-asc" },
  { label: "Price: High to low", value: "price-desc" },
  { label: "Name: A-Z", value: "title-asc" },
  { label: "Name: Z-A", value: "title-desc" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const data = await getCollectionProducts(handle);

  return {
    title: data.collection?.title ?? "Collection",
    description:
      data.collection?.description ??
      "Browse products in this MedHub healthcare supplies collection.",
  };
}

export default async function CollectionDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { handle } = await params;
  const queryParams = searchParams ? await searchParams : {};
  const query = getStringParam(queryParams.q);
  const sort = (getStringParam(queryParams.sort) || "featured") as ProductSortOption;
  const page = getNumberParam(queryParams.page, 1);

  const { collection, products } = await getCollectionProducts(handle);

  if (!collection) {
    notFound();
  }

  const catalog = getCatalogResult({
    products,
    page,
    sort,
    search: query,
  });

  return (
    <div className="page-shell space-y-10 py-10 sm:py-12">
      <section className="rounded-[2.5rem] border border-[color:var(--border)] bg-white px-6 py-8 shadow-sm sm:px-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[color:var(--primary-strong)]">
            Collection
          </p>
          <h1 className="font-serif text-4xl font-semibold text-[color:var(--ink)] sm:text-5xl">
            {collection.title}
          </h1>
          <p className="max-w-3xl text-base leading-8 text-[color:var(--muted-ink)]">
            {collection.description}
          </p>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            eyebrow="Collection products"
            title={`Shop everything in ${collection.title}.`}
            description="Filter by search term or sorting preference without leaving the current collection context."
          />
          <Button asChild variant="secondary">
            <Link href="/collections">All collections</Link>
          </Button>
        </div>

        <form className="grid gap-3 rounded-[2rem] border border-[color:var(--border)] bg-white p-4 shadow-sm md:grid-cols-[1.2fr_0.8fr_auto]">
          <Input name="q" defaultValue={query} placeholder="Search this collection" />
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
          <Button type="submit">Apply</Button>
        </form>
      </section>

      <section className="space-y-8">
        <ProductGrid products={catalog.items} />
        <Pagination
          pathname={`/collections/${collection.handle}`}
          pagination={catalog.pagination}
          searchParams={{
            q: query || undefined,
            sort,
          }}
        />
      </section>
    </div>
  );
}
