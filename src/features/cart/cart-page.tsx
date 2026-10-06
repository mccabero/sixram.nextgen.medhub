"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { CartSummary } from "@/components/commerce/cart-summary";
import { EmptyState } from "@/components/sections/empty-state";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/utils/format";

export function CartPage() {
  const { cart, checkout, error, isPending, removeItem, updateItem } = useCart();

  if (cart.lines.length === 0) {
    return (
      <EmptyState
        title="Your cart is waiting"
        description="Start adding supplies from our product catalog and your selections will appear here."
        actionLabel="Shop products"
        actionHref="/products"
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="space-y-4">
        {cart.lines.map((line) => (
          <article
            key={line.id}
            className="rounded-[2rem] border border-[color:var(--border)] bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="relative h-32 w-full overflow-hidden rounded-[1.5rem] bg-[color:var(--surface-subtle)] sm:w-36">
                {line.image ? (
                  <Image
                    src={line.image.url}
                    alt={line.image.altText}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <Link
                      href={`/products/${line.handle}`}
                      className="text-xl font-semibold text-[color:var(--ink)]"
                    >
                      {line.title}
                    </Link>
                    <p className="mt-1 text-sm text-[color:var(--muted-ink)]">
                      {line.variantTitle}
                    </p>
                  </div>
                  <p className="text-xl font-semibold text-[color:var(--ink)]">
                    {formatCurrency(line.lineTotal)}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
                  <div className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-1">
                    <button
                      type="button"
                      onClick={() => void updateItem(line.id, line.quantity - 1)}
                      className="rounded-full p-2 transition hover:bg-white"
                      aria-label={`Decrease quantity for ${line.title}`}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-10 text-center text-sm font-semibold text-[color:var(--ink)]">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => void updateItem(line.id, line.quantity + 1)}
                      className="rounded-full p-2 transition hover:bg-white"
                      aria-label={`Increase quantity for ${line.title}`}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => void removeItem(line.id)}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[color:var(--danger-ink)] transition hover:bg-[color:var(--danger-soft)]"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
        {error ? (
          <p className="rounded-2xl bg-[color:var(--danger-soft)] px-4 py-3 text-sm text-[color:var(--danger-ink)]">
            {error}
          </p>
        ) : null}
      </div>

      <div className="space-y-4">
        <CartSummary cart={cart} />
        <Button
          type="button"
          className="w-full"
          size="lg"
          disabled={cart.lines.length === 0 || isPending}
          onClick={checkout}
        >
          Continue to checkout
        </Button>
      </div>
    </div>
  );
}
