import { NextResponse } from "next/server";
import { z } from "zod";

import { createEmptyCart } from "@/features/cart/local-cart";
import {
  addToCart,
  createCart,
  getCart,
  removeCartItem,
  updateCartQuantity,
} from "@/lib/shopify";

const cartActionSchema = z.object({
  action: z.enum(["get", "add", "update", "remove"]),
  cartId: z.string().optional(),
  merchandiseId: z.string().optional(),
  lineId: z.string().optional(),
  quantity: z.number().int().min(0).optional(),
});

export async function POST(request: Request) {
  try {
    const json = (await request.json()) as unknown;
    const payload = cartActionSchema.parse(json);

    if (payload.action === "get") {
      if (!payload.cartId) {
        return NextResponse.json({ cart: createEmptyCart() });
      }

      const cart = await getCart(payload.cartId);
      return NextResponse.json({ cart: cart ?? createEmptyCart() });
    }

    if (payload.action === "add") {
      if (!payload.merchandiseId || payload.quantity === undefined || payload.quantity < 1) {
        return NextResponse.json(
          { message: "Missing merchandise ID or quantity." },
          { status: 400 },
        );
      }

      const lines = [
        {
          merchandiseId: payload.merchandiseId,
          quantity: payload.quantity,
        },
      ];
      const cart = payload.cartId ? await addToCart(payload.cartId, lines) : await createCart(lines);
      return NextResponse.json({ cart });
    }

    if (payload.action === "update") {
      if (
        !payload.cartId ||
        !payload.lineId ||
        payload.quantity === undefined
      ) {
        return NextResponse.json(
          { message: "Missing cart ID, line ID, or quantity." },
          { status: 400 },
        );
      }

      const cart =
        payload.quantity <= 0
          ? await removeCartItem(payload.cartId, payload.lineId)
          : await updateCartQuantity(payload.cartId, payload.lineId, payload.quantity);
      return NextResponse.json({ cart });
    }

    if (!payload.cartId || !payload.lineId) {
      return NextResponse.json(
        { message: "Missing cart ID or line ID." },
        { status: 400 },
      );
    }

    const cart = await removeCartItem(payload.cartId, payload.lineId);
    return NextResponse.json({ cart });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Unable to update your cart.",
      },
      { status: 500 },
    );
  }
}
