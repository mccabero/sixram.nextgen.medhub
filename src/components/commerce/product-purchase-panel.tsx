"use client";

import { Minus, Plus, ShieldCheck, ShoppingCart } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/types/commerce";
import { formatCurrency } from "@/utils/format";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, isPending } = useCart();

  const primaryVariant = product.variants[0];

  async function handleAddToCart() {
    if (!primaryVariant) {
      return;
    }

    await addItem(
      {
        handle: product.handle,
        title: product.title,
        variantTitle: primaryVariant.title,
        merchandiseId: primaryVariant.id,
        image: product.featuredImage,
        price: primaryVariant.price,
      },
      quantity,
    );

    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="rounded-[2rem] border border-[color:var(--border)] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--primary-strong)]">
            {product.productType}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[color:var(--ink)]">
            {product.title}
          </h2>
          <p className="mt-2 text-sm text-[color:var(--muted-ink)]">
            By {product.vendor}
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-semibold text-[color:var(--ink)]">
            {formatCurrency(product.price)}
          </p>
          {product.compareAtPrice ? (
            <p className="mt-1 text-sm text-[color:var(--muted-ink)] line-through">
              {formatCurrency(product.compareAtPrice)}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 rounded-[1.5rem] bg-[color:var(--surface-subtle)] p-4 text-sm leading-7 text-[color:var(--muted-ink)]">
        <div className="flex items-center gap-2 font-semibold text-[color:var(--success-ink)]">
          <ShieldCheck className="h-4 w-4" />
          {product.availableForSale ? "In stock and ready to ship" : "Currently unavailable"}
        </div>
        <p className="mt-2">
          Secure Shopify checkout, responsive support, and medical-supplies-only
          catalog curation for a cleaner buying experience.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-sm font-semibold text-[color:var(--ink)]">Selected option</p>
          <p className="mt-2 text-sm text-[color:var(--muted-ink)]">
            {primaryVariant?.title ?? "Default"}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-[color:var(--ink)]">Quantity</p>
          <div className="mt-3 inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-1">
            <button
              type="button"
              className="rounded-full p-2 transition hover:bg-white"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-12 text-center text-base font-semibold text-[color:var(--ink)]">
              {quantity}
            </span>
            <button
              type="button"
              className="rounded-full p-2 transition hover:bg-white"
              onClick={() => setQuantity((current) => current + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <Button
          type="button"
          className="w-full"
          size="lg"
          disabled={!product.availableForSale || !primaryVariant || isPending}
          onClick={() => void handleAddToCart()}
        >
          <ShoppingCart className="h-4 w-4" />
          {added ? "Added to cart" : "Add to cart"}
        </Button>
      </div>
    </div>
  );
}
