import type { Metadata } from "next";

import { CartPage } from "@/features/cart/cart-page";
import { SectionTitle } from "@/components/sections/section-title";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your MedHub cart and continue to secure Shopify checkout.",
};

export default function CartRoute() {
  return (
    <div className="page-shell space-y-10 py-10 sm:py-12">
      <SectionTitle
        eyebrow="Cart"
        title="Review your selected medical supplies."
        description="Update quantities, remove line items, or continue to secure checkout when you're ready."
      />
      <CartPage />
    </div>
  );
}
