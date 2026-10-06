"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

import { CartDrawer } from "@/components/commerce/cart-drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { siteConfig } from "@/services/site";
import { cn } from "@/utils/cn";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, setIsOpen } = useCart();

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-white/60 bg-[rgba(244,248,251,0.88)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[color:var(--primary)] text-sm font-black tracking-[0.16em] text-white shadow-[0_18px_40px_-24px_rgba(11,99,206,0.65)]">
              MH
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--primary-strong)]">
                {siteConfig.shortName}
              </p>
              <p className="text-sm text-[color:var(--muted-ink)]">
                Trusted healthcare essentials
              </p>
            </div>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[color:var(--ink)] transition hover:text-[color:var(--primary)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <form
              action="/search"
              className="flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-white px-4 py-2 shadow-sm"
            >
              <Search className="h-4 w-4 text-[color:var(--muted-ink)]" />
              <Input
                name="q"
                placeholder="Search products"
                className="h-auto w-48 border-0 px-0 py-0 text-sm shadow-none focus:ring-0"
              />
            </form>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label="Open shopping cart"
              className="relative"
              onClick={() => setIsOpen(true)}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[color:var(--primary)] text-[10px] font-bold text-white">
                {cartCount}
              </span>
            </Button>
          </div>

          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="ml-auto lg:hidden"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        <div
          className={cn(
            "border-t border-white/60 px-4 py-4 transition lg:hidden",
            menuOpen ? "block" : "hidden",
          )}
        >
          <div className="mx-auto max-w-7xl space-y-4">
            <form
              action="/search"
              className="flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-white px-4 py-2 shadow-sm"
            >
              <Search className="h-4 w-4 text-[color:var(--muted-ink)]" />
              <Input
                name="q"
                placeholder="Search products"
                className="h-auto border-0 px-0 py-0 text-sm shadow-none focus:ring-0"
              />
            </form>
            <nav className="grid gap-2">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-[color:var(--ink)] transition hover:bg-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(true);
                  setMenuOpen(false);
                }}
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium text-[color:var(--ink)] transition hover:bg-white"
              >
                <span>Cart</span>
                <span className="rounded-full bg-[color:var(--surface-subtle)] px-2 py-1 text-xs font-semibold">
                  {cartCount}
                </span>
              </button>
            </nav>
          </div>
        </div>
      </header>
      <CartDrawer />
    </>
  );
}
