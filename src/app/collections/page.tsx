import type { Metadata } from "next";

import { CollectionCard } from "@/components/commerce/collection-card";
import { SectionTitle } from "@/components/sections/section-title";
import { getCollectionProductCount } from "@/features/collections/collection-utils";
import { getCollections, getProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore MedHub collections for PPE, diagnostic devices, home care supplies, mobility aids, and wellness essentials.",
};

export default async function CollectionsPage() {
  const [collections, products] = await Promise.all([getCollections(), getProducts()]);

  return (
    <div className="page-shell space-y-10 py-10 sm:py-12">
      <SectionTitle
        eyebrow="Collections"
        title="Navigate the catalog by healthcare category."
        description="Collections are designed to mirror how care teams and households browse equipment, PPE, and everyday support supplies."
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {collections.map((collection) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            productCount={getCollectionProductCount(collection, products)}
          />
        ))}
      </div>
    </div>
  );
}
