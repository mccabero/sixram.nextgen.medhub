import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductGrid } from "@/components/commerce/product-grid";
import { ProductPurchasePanel } from "@/components/commerce/product-purchase-panel";
import { SectionTitle } from "@/components/sections/section-title";
import { getRelatedProducts } from "@/features/products/catalog";
import { getProductByHandle, getProducts } from "@/lib/shopify";
import { absoluteUrl } from "@/services/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      url: absoluteUrl(`/products/${product.handle}`),
      images: product.featuredImage
        ? [
            {
              url: product.featuredImage.url,
              alt: product.featuredImage.altText,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: product.featuredImage ? [product.featuredImage.url] : undefined,
    },
  };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const [product, products] = await Promise.all([
    getProductByHandle(handle),
    getProducts(),
  ]);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(products, product);

  return (
    <div className="page-shell space-y-14 py-10 sm:py-12">
      <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] border border-[color:var(--border)] bg-white shadow-sm">
            {product.featuredImage ? (
              <Image
                src={product.featuredImage.url}
                alt={product.featuredImage.altText}
                fill
                className="object-cover"
              />
            ) : null}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {product.images.slice(1, 3).map((image) => (
              <div
                key={image.url}
                className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-white shadow-sm"
              >
                <Image src={image.url} alt={image.altText} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <ProductPurchasePanel product={product} />

          <div className="rounded-[2rem] border border-[color:var(--border)] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[color:var(--ink)]">
              Product details
            </h2>
            <div
              className="rich-copy mt-4 text-sm leading-8 text-[color:var(--muted-ink)]"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
            <div className="mt-6 flex flex-wrap gap-3">
              {product.collections.map((collection) => (
                <Link
                  key={collection.handle}
                  href={`/collections/${collection.handle}`}
                  className="rounded-full bg-[color:var(--surface-subtle)] px-4 py-2 text-sm font-semibold text-[color:var(--primary-strong)]"
                >
                  {collection.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionTitle
          eyebrow="Related products"
          title="More essentials from nearby categories."
          description="Suggested products are grouped from overlapping collections to keep discovery relevant."
        />
        <ProductGrid products={relatedProducts} />
      </section>
    </div>
  );
}
