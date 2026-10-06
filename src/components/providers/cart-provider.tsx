"use client";

import {
  createContext,
  startTransition,
  useState,
  useTransition,
} from "react";

import {
  addLocalCartItem,
  createEmptyCart,
  readStoredCart,
  removeLocalCartLine,
  updateLocalCartLine,
  writeStoredCart,
} from "@/features/cart/local-cart";
import type { Cart, CartProductSnapshot } from "@/types/commerce";

type CartContextValue = {
  cart: Cart;
  cartCount: number;
  isPending: boolean;
  error: string | null;
  isOpen: boolean;
  shopifyConfigured: boolean;
  setIsOpen: (nextState: boolean) => void;
  addItem: (product: CartProductSnapshot, quantity: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  checkout: () => void;
};

const STORAGE_KEY = "medhub.shopify.cart";

export const CartContext = createContext<CartContextValue | null>(null);

async function postCartAction<T>(payload: Record<string, unknown>) {
  const response = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = (await response.json()) as
    | { cart?: Cart; message?: string }
    | { message?: string };

  if (!response.ok || !("cart" in json) || !json.cart) {
    throw new Error(json.message ?? "Unable to update cart.");
  }

  return json.cart as T;
}

function readStoredRemoteCart() {
  if (typeof window === "undefined") {
    return createEmptyCart();
  }

  const value = window.localStorage.getItem(STORAGE_KEY);

  if (!value) {
    return createEmptyCart();
  }

  try {
    return JSON.parse(value) as Cart;
  } catch {
    return createEmptyCart();
  }
}

function writeStoredRemoteCart(cart: Cart) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function CartProvider({
  children,
  shopifyConfigured,
}: {
  children: React.ReactNode;
  shopifyConfigured: boolean;
}) {
  const [cart, setCart] = useState<Cart>(() =>
    shopifyConfigured ? readStoredRemoteCart() : readStoredCart(),
  );
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startAsyncTransition] = useTransition();

  const addItem = async (product: CartProductSnapshot, quantity: number) => {
    setError(null);

    if (!shopifyConfigured) {
      startTransition(() => {
        setCart((currentCart) => {
          const nextCart = addLocalCartItem(currentCart, product, quantity);
          writeStoredCart(nextCart);
          return nextCart;
        });
        setIsOpen(true);
      });
      return;
    }

    return new Promise<void>((resolve, reject) => {
      startAsyncTransition(() => {
        void (async () => {
          try {
            const nextCart = await postCartAction<Cart>({
              action: "add",
              cartId: cart.id !== "local-cart" ? cart.id : undefined,
              merchandiseId: product.merchandiseId,
              quantity,
            });
            setCart(nextCart);
            writeStoredRemoteCart(nextCart);
            setIsOpen(true);
            resolve();
          } catch (nextError) {
            const message =
              nextError instanceof Error
                ? nextError.message
                : "Unable to add this item to cart.";
            setError(message);
            reject(nextError);
          }
        })();
      });
    });
  };

  const updateItem = async (lineId: string, quantity: number) => {
    setError(null);

    if (!shopifyConfigured) {
      startTransition(() => {
        setCart((currentCart) => {
          const nextCart = updateLocalCartLine(currentCart, lineId, quantity);
          writeStoredCart(nextCart);
          return nextCart;
        });
      });
      return;
    }

    return new Promise<void>((resolve, reject) => {
      startAsyncTransition(() => {
        void (async () => {
          try {
            const nextCart = await postCartAction<Cart>({
              action: "update",
              cartId: cart.id,
              lineId,
              quantity,
            });
            setCart(nextCart);
            writeStoredRemoteCart(nextCart);
            resolve();
          } catch (nextError) {
            const message =
              nextError instanceof Error
                ? nextError.message
                : "Unable to update this line item.";
            setError(message);
            reject(nextError);
          }
        })();
      });
    });
  };

  const removeItem = async (lineId: string) => {
    setError(null);

    if (!shopifyConfigured) {
      startTransition(() => {
        setCart((currentCart) => {
          const nextCart = removeLocalCartLine(currentCart, lineId);
          writeStoredCart(nextCart);
          return nextCart;
        });
      });
      return;
    }

    return new Promise<void>((resolve, reject) => {
      startAsyncTransition(() => {
        void (async () => {
          try {
            const nextCart = await postCartAction<Cart>({
              action: "remove",
              cartId: cart.id,
              lineId,
            });
            setCart(nextCart);
            writeStoredRemoteCart(nextCart);
            resolve();
          } catch (nextError) {
            const message =
              nextError instanceof Error
                ? nextError.message
                : "Unable to remove this line item.";
            setError(message);
            reject(nextError);
          }
        })();
      });
    });
  };

  const value: CartContextValue = {
    cart,
    cartCount: cart.totalQuantity,
    isPending,
    error,
    isOpen,
    shopifyConfigured,
    setIsOpen,
    addItem,
    updateItem,
    removeItem,
    checkout: () => {
      if (typeof window === "undefined") {
        return;
      }

      window.location.href = cart.checkoutUrl;
    },
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
