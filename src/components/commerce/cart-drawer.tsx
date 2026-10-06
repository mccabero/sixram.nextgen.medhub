"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { EmptyState } from "@/components/sections/empty-state";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/utils/format";

import { CartSummary } from "./cart-summary";

export function CartDrawer() {
  const {
    cart,
    checkout,
    error,
    isOpen,
    isPending,
    setIsOpen,
    updateItem,
    removeItem,
  } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping cart</SheetTitle>
          <SheetDescription>
            Review your medical supplies and continue to secure Shopify checkout.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {cart.lines.length === 0 ? (
              <EmptyState
                title="Your cart is empty"
                description="Add products from the catalog and they will appear here instantly."
                actionLabel="Browse products"
                actionHref="/products"
              />
            ) : (
              cart.lines.map((line) => (
                <div
                  key={line.id}
                  className="rounded-[1.5rem] border border-[color:var(--border)] bg-white p-4"
                >
                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 overflow-hidden rounded-[1.25rem] bg-[color:var(--surface-subtle)]">
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
                      <Link
                        href={`/products/${line.handle}`}
                        className="text-base font-semibold text-[color:var(--ink)]"
                        onClick={() => setIsOpen(false)}
                      >
                        {line.title}
                      </Link>
                      <p className="mt-1 text-sm text-[color:var(--muted-ink)]">
                        {line.variantTitle}
                      </p>
                      <div className="mt-auto flex items-center justify-between gap-3">
                        <div className="flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-1">
                          <button
                            type="button"
                            onClick={() => void updateItem(line.id, line.quantity - 1)}
                            className="rounded-full p-2 text-[color:var(--ink)] transition hover:bg-white"
                            aria-label={`Decrease quantity for ${line.title}`}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-8 text-center text-sm font-semibold text-[color:var(--ink)]">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => void updateItem(line.id, line.quantity + 1)}
                            className="rounded-full p-2 text-[color:var(--ink)] transition hover:bg-white"
                            aria-label={`Increase quantity for ${line.title}`}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-sm font-semibold text-[color:var(--ink)]">
                            {formatCurrency(line.lineTotal)}
                          </p>
                          <button
                            type="button"
                            onClick={() => void removeItem(line.id)}
                            className="rounded-full p-2 text-[color:var(--muted-ink)] transition hover:bg-[color:var(--surface-subtle)] hover:text-[color:var(--danger-ink)]"
                            aria-label={`Remove ${line.title} from cart`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            {error ? (
              <p className="rounded-2xl bg-[color:var(--danger-soft)] px-4 py-3 text-sm text-[color:var(--danger-ink)]">
                {error}
              </p>
            ) : null}
          </div>
          <div className="space-y-4 border-t border-[color:var(--border)] p-6">
            <CartSummary cart={cart} compact />
            <div className="grid gap-3 sm:grid-cols-2">
              <Button asChild variant="secondary">
                <Link href="/cart" onClick={() => setIsOpen(false)}>
                  <ShoppingBag className="h-4 w-4" />
                  View cart
                </Link>
              </Button>
              <Button
                type="button"
                disabled={cart.lines.length === 0 || isPending}
                onClick={checkout}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
