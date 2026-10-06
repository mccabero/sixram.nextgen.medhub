import Link from "next/link";
import { CheckCircle2, Headset, HeartPulse } from "lucide-react";

import { CollectionCard } from "@/components/commerce/collection-card";
import { ProductGrid } from "@/components/commerce/product-grid";
import { HeroBanner } from "@/components/sections/hero-banner";
import { SectionTitle } from "@/components/sections/section-title";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/features/products/catalog";
import { getHomepageData } from "@/lib/shopify";

const serviceHighlights = [
  {
    title: "Medical-supplies-only catalog",
    description:
      "The MVP is intentionally focused on equipment, consumables, and home care items only.",
    icon: CheckCircle2,
  },
  {
    title: "Healthcare-grade presentation",
    description:
      "Clear product discovery, calm color language, and professional content hierarchy build trust fast.",
    icon: HeartPulse,
  },
  {
    title: "Support-ready customer journey",
    description:
      "Contact and cart flows are designed for both direct checkout and high-consideration procurement conversations.",
    icon: Headset,
  },
];

const brandPlaceholders = [
  "CarePulse",
  "ThermaSure",
  "AeroVital",
  "MoveEase",
  "SafeStart",
  "SteriFlex",
];

export default async function HomePage() {
  const { collections, products } = await getHomepageData();
  const featuredProducts = getFeaturedProducts(products, 6);
  const featuredCollections = collections.slice(0, 4);

  return (
    <div className="page-shell section-stack py-8 sm:py-10 lg:py-12">
      <HeroBanner />

      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div className="space-y-5">
          <SectionTitle
            eyebrow="Search products"
            title="Start with fast, clear product discovery."
            description="Search by equipment type, everyday consumables, or home care category and move straight into browsing."
          />
          <div className="flex flex-wrap gap-3">
            {collections.slice(0, 5).map((collection) => (
              <Link
                key={collection.handle}
                href={`/products?collection=${collection.handle}`}
                className="rounded-full border border-[color:var(--border)] bg-white px-4 py-3 text-sm font-semibold text-[color:var(--ink)] transition hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
              >
                {collection.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Collections", value: `${collections.length}+` },
            { label: "Featured products", value: `${featuredProducts.length}` },
            { label: "Shopify-ready checkout", value: "1-click" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[2rem] border border-[color:var(--border)] bg-white p-6 shadow-sm"
            >
              <p className="text-3xl font-semibold text-[color:var(--ink)]">
                {item.value}
              </p>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted-ink)]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionTitle
          eyebrow="Featured categories"
          title="Curated collections for everyday healthcare needs."
          description="Browse the core categories planned for the MVP launch experience."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredCollections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            eyebrow="Featured products"
            title="High-demand essentials ready for the first storefront release."
            description="Product cards are wired for Shopify line-item creation and graceful mock-data fallback during setup."
          />
          <Button asChild variant="secondary">
            <Link href="/products">View all products</Link>
          </Button>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      <section className="space-y-8 rounded-[2.5rem] border border-[color:var(--border)] bg-white px-6 py-8 shadow-sm sm:px-8 sm:py-10">
        <SectionTitle
          eyebrow="Why choose MedHub"
          title="Built for trust, clarity, and healthcare-specific buying needs."
          description="The MVP avoids pharmacy workflows and keeps the experience focused on medical supplies, mobility aids, diagnostic tools, and home care products."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {serviceHighlights.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-6"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[color:var(--primary)] shadow-sm">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[color:var(--ink)]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted-ink)]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionTitle
          eyebrow="Brands placeholder"
          title="Reserved space for supplier, OEM, and partner visibility."
          description="Phase 1 includes a presentational brand strip that can be replaced with live Shopify content or approved partner logos later."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {brandPlaceholders.map((brand) => (
            <div
              key={brand}
              className="grid h-24 place-items-center rounded-[1.75rem] border border-dashed border-[color:var(--border-strong)] bg-white text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted-ink)]"
            >
              {brand}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-[linear-gradient(135deg,#0b63ce_0%,#08498f_46%,#0d2a52_100%)] px-6 py-10 text-white shadow-[0_50px_100px_-70px_rgba(6,47,91,0.9)] sm:px-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white/75">
              Call to action
            </p>
            <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
              Launch the MedHub catalog with a storefront that already supports
              search, cart, checkout, and healthcare-first merchandising.
            </h2>
            <p className="max-w-2xl text-sm leading-8 text-white/80 sm:text-base">
              Once Shopify credentials are configured, the same UI shifts from mock
              content to live Storefront API data with no structural changes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Talk to sales</Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-[color:var(--primary-strong)] hover:bg-white/90">
              <Link href="/products">Browse the catalog</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
