import type { Cart, CartLine, CartProductSnapshot } from "@/types/commerce";

const STORAGE_KEY = "medhub.cart";

function money(amount: number, currencyCode = "USD") {
  return {
    amount: amount.toFixed(2),
    currencyCode,
  };
}

export function createEmptyCart(): Cart {
  return {
    id: "local-cart",
    checkoutUrl: "/contact?reason=checkout-assistance",
    totalQuantity: 0,
    subtotalAmount: money(0),
    totalAmount: money(0),
    lines: [],
  };
}

export function readStoredCart() {
  if (typeof window === "undefined") {
    return createEmptyCart();
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY);

  if (!storedValue) {
    return createEmptyCart();
  }

  try {
    return JSON.parse(storedValue) as Cart;
  } catch {
    return createEmptyCart();
  }
}

export function writeStoredCart(cart: Cart) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function buildLine(product: CartProductSnapshot, quantity: number): CartLine {
  return {
    id: product.merchandiseId,
    quantity,
    merchandiseId: product.merchandiseId,
    title: product.title,
    variantTitle: product.variantTitle,
    handle: product.handle,
    image: product.image,
    price: product.price,
    lineTotal: money(Number.parseFloat(product.price.amount) * quantity),
  };
}

function recalculate(cart: Cart): Cart {
  const totalQuantity = cart.lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cart.lines.reduce(
    (sum, line) => sum + Number.parseFloat(line.lineTotal.amount),
    0,
  );

  return {
    ...cart,
    totalQuantity,
    subtotalAmount: money(subtotal),
    totalAmount: money(subtotal),
  };
}

export function addLocalCartItem(
  currentCart: Cart,
  product: CartProductSnapshot,
  quantity: number,
) {
  const existingLine = currentCart.lines.find(
    (line) => line.merchandiseId === product.merchandiseId,
  );

  const lines = existingLine
    ? currentCart.lines.map((line) =>
        line.merchandiseId === product.merchandiseId
          ? buildLine(product, line.quantity + quantity)
          : line,
      )
    : [...currentCart.lines, buildLine(product, quantity)];

  return recalculate({ ...currentCart, lines });
}

export function updateLocalCartLine(
  currentCart: Cart,
  merchandiseId: string,
  quantity: number,
) {
  const lines = currentCart.lines
    .map((line) =>
      line.merchandiseId === merchandiseId
        ? {
            ...line,
            quantity,
            lineTotal: money(Number.parseFloat(line.price.amount) * quantity),
          }
        : line,
    )
    .filter((line) => line.quantity > 0);

  return recalculate({ ...currentCart, lines });
}

export function removeLocalCartLine(currentCart: Cart, merchandiseId: string) {
  const lines = currentCart.lines.filter(
    (line) => line.merchandiseId !== merchandiseId,
  );

  return recalculate({ ...currentCart, lines });
}
