import type { Metadata } from "next";

import { ProductGrid } from "@/components/commerce/product-grid";
import { SearchBar } from "@/components/commerce/search-bar";
import { SectionTitle } from "@/components/sections/section-title";
import { getStringParam } from "@/features/search/query";
import { searchProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the MedHub product catalog.",
  robots: {
    index: false,
    follow: true,
  },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = searchParams ? await searchParams : {};
  const query = getStringParam(params.q);
  const results = query ? await searchProducts(query) : [];

  return (
    <div className="page-shell space-y-10 py-10 sm:py-12">
      <SectionTitle
        eyebrow="Search"
        title="Find equipment and supplies fast."
        description="Search product names, descriptions, equipment types, and vendor references across the MedHub catalog."
      />
      <SearchBar defaultValue={query} />

      <section className="space-y-6">
        <p className="text-sm leading-7 text-[color:var(--muted-ink)]">
          {query
            ? `${results.length} result${results.length === 1 ? "" : "s"} for "${query}".`
            : "Enter a keyword to start browsing the catalog."}
        </p>
        <ProductGrid products={results} />
      </section>
    </div>
  );
}
