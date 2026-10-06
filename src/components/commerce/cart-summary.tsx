import type { Cart } from "@/types/commerce";
import { formatCurrency } from "@/utils/format";

export function CartSummary({
  cart,
  compact = false,
}: {
  cart: Cart;
  compact?: boolean;
}) {
  return (
    <div className="rounded-[2rem] border border-[color:var(--border)] bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-[color:var(--ink)]">Order summary</h3>
      <div className="mt-6 space-y-4 text-sm text-[color:var(--muted-ink)]">
        <div className="flex items-center justify-between">
          <span>Items</span>
          <span className="font-semibold text-[color:var(--ink)]">
            {cart.totalQuantity}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-[color:var(--ink)]">
            {formatCurrency(cart.subtotalAmount)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span className="font-semibold text-[color:var(--ink)]">
            Calculated at checkout
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-[color:var(--border)] pt-4 text-base">
          <span className="font-semibold text-[color:var(--ink)]">Estimated total</span>
          <span className="font-semibold text-[color:var(--ink)]">
            {formatCurrency(cart.totalAmount)}
          </span>
        </div>
      </div>
      {!compact ? (
        <p className="mt-5 text-sm leading-7 text-[color:var(--muted-ink)]">
          Checkout is handled securely by Shopify with shipping rates and taxes
          finalized on the hosted checkout page.
        </p>
      ) : null}
    </div>
  );
}
