"use client";
import * as React from "react";

export interface CartLine {
  key: string;
  slug: string;
  name: string;
  variant?: string;
  unit_price: number;
  quantity: number;
  hue: number;
}

interface StoreCtx {
  lines: CartLine[];
  wishlist: string[];
  count: number;
  subtotal: number;
  ready: boolean;
  cartOpen: boolean;
  setCartOpen: (o: boolean) => void;
  addLine: (line: Omit<CartLine, "key" | "quantity">, quantity?: number) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeLine: (key: string) => void;
  clear: () => void;
  toggleWishlist: (slug: string) => void;
}

const Ctx = React.createContext<StoreCtx | null>(null);
const CART_KEY = "deshio.cart.v1";
const WISH_KEY = "deshio.wishlist.v1";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode): cart still works for the session */
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = React.useState<CartLine[]>([]);
  const [wishlist, setWishlist] = React.useState<string[]>([]);
  const [ready, setReady] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);

  React.useEffect(() => {
    setLines(read<CartLine[]>(CART_KEY, []));
    setWishlist(read<string[]>(WISH_KEY, []));
    setReady(true);
  }, []);
  React.useEffect(() => { if (ready) write(CART_KEY, lines); }, [lines, ready]);
  React.useEffect(() => { if (ready) write(WISH_KEY, wishlist); }, [wishlist, ready]);

  const value = React.useMemo<StoreCtx>(() => ({
    lines,
    wishlist,
    ready,
    cartOpen,
    setCartOpen,
    count: lines.reduce((n, l) => n + l.quantity, 0),
    subtotal: lines.reduce((n, l) => n + l.quantity * l.unit_price, 0),
    addLine: (line, quantity = 1) => {
      const key = `${line.slug}::${line.variant ?? ""}`;
      setLines((prev) => {
        const existing = prev.find((l) => l.key === key);
        if (existing) return prev.map((l) => (l.key === key ? { ...l, quantity: Math.min(l.quantity + quantity, 10) } : l));
        return [...prev, { ...line, key, quantity }];
      });
    },
    setQuantity: (key, quantity) =>
      setLines((prev) => (quantity <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, quantity: Math.min(quantity, 10) } : l)))),
    removeLine: (key) => setLines((prev) => prev.filter((l) => l.key !== key)),
    clear: () => setLines([]),
    toggleWishlist: (slug) => setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug])),
  }), [lines, wishlist, ready, cartOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside <CartProvider>");
  return ctx;
}
