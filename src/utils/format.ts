import type { Cart, Money, Product } from "@/types/commerce";

export function formatCurrency(
  money: Pick<Money, "amount" | "currencyCode"> | number,
  currencyCode = "USD",
) {
  const amount =
    typeof money === "number" ? money : Number.parseFloat(money.amount);
  const code = typeof money === "number" ? currencyCode : money.currencyCode;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function getProductPriceLabel(product: Product) {
  if (!product.compareAtPrice) {
    return formatCurrency(product.price);
  }

  return `${formatCurrency(product.price)} / was ${formatCurrency(
    product.compareAtPrice,
  )}`;
}

export function getCartSubtotal(cart: Cart | null) {
  return cart ? formatCurrency(cart.subtotalAmount) : formatCurrency(0);
}
