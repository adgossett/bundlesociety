import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  texture: string;
  imageKey: string;
  length: number;
  quantity: number;
  priceCents: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (line: CartLine) => void;
  updateQuantity: (productId: string, length: number, quantity: number) => void;
  remove: (productId: string, length: number) => void;
  clear: () => void;
};

const STORAGE_KEY = "tbs-cart-v1";
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore malformed cart */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const add = useCallback((line: CartLine) => {
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.productId === line.productId && l.length === line.length);
      const existing = prev[idx];
      if (idx === -1 || !existing) return [...prev, line];
      const next = [...prev];
      next[idx] = { ...existing, quantity: Math.min(20, existing.quantity + line.quantity) };
      return next;

    });
  }, []);

  const updateQuantity = useCallback((productId: string, length: number, quantity: number) => {
    setLines((prev) =>
      prev
        .map((l) =>
          l.productId === productId && l.length === length
            ? { ...l, quantity: Math.max(0, Math.min(20, quantity)) }
            : l,
        )
        .filter((l) => l.quantity > 0),
    );
  }, []);

  const remove = useCallback((productId: string, length: number) => {
    setLines((prev) => prev.filter((l) => !(l.productId === productId && l.length === length)));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: lines.reduce((n, l) => n + l.quantity * l.priceCents, 0),
      add,
      updateQuantity,
      remove,
      clear,
    }),
    [lines, add, updateQuantity, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
