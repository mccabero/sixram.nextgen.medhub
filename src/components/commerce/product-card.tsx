"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingCart } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/types/commerce";
import { formatCurrency } from "@/utils/format";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, isPending } = useCart();
  const [added, setAdded] = useState(false);

  const firstVariant = product.variants[0];
  const collectionLabel = product.collections[0]?.title ?? product.productType;

  async function handleAddToCart() {
    if (!firstVariant) {
      return;
    }

    await addItem(
      {
        handle: product.handle,
        title: product.title,
        variantTitle: firstVariant.title,
        merchandiseId: firstVariant.id,
        image: product.featuredImage,
        price: firstVariant.price,
      },
      1,
    );
    setAdded(true);

    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_-42px_rgba(7,64,122,0.45)]">
      <Link
        href={`/products/${product.handle}`}
        className="relative block aspect-[4/3] overflow-hidden bg-[color:var(--surface-subtle)]"
      >
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--primary-strong)]">
          {collectionLabel}
        </p>
        <Link href={`/products/${product.handle}`} className="mt-3">
          <h3 className="line-clamp-2 text-lg font-semibold text-[color:var(--ink)] transition group-hover:text-[color:var(--primary)]">
            {product.title}
          </h3>
        </Link>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[color:var(--muted-ink)]">
          {product.description}
        </p>
        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold text-[color:var(--ink)]">
              {formatCurrency(product.price)}
            </p>
            {product.compareAtPrice ? (
              <p className="text-sm text-[color:var(--muted-ink)] line-through">
                {formatCurrency(product.compareAtPrice)}
              </p>
            ) : null}
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              product.availableForSale
                ? "bg-[color:var(--success-soft)] text-[color:var(--success-ink)]"
                : "bg-[color:var(--surface-subtle)] text-[color:var(--muted-ink)]"
            }`}
          >
            {product.availableForSale ? "Ready to ship" : "Sold out"}
          </span>
        </div>
        <Button
          type="button"
          onClick={() => void handleAddToCart()}
          disabled={!product.availableForSale || !firstVariant || isPending}
          className="mt-6 w-full"
        >
          {added ? (
            <>
              <Check className="h-4 w-4" />
              Added
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              Add to cart
            </>
          )}
        </Button>
      </div>
    </article>
  );
}
