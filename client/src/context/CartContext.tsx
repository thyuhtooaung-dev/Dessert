import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import type { CartContextType, CartItem } from "@/types";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  const updateQuantity = (name: string, delta: number, price?: number) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.name === name);

      if (!existingItem) {
        if (delta > 0 && price !== undefined) {
          return [...prev, { name, price, quantity: delta }];
        }
        return prev;
      }

      return prev
        .map((item) =>
          item.name === name
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const removeFromCart = (name: string) => {
    setItems((prev) => prev.filter((item) => item.name !== name));
  };

  const clearCart = () => setItems([]);

  const value = useMemo(
    () => ({
      items,
      totalItems,
      totalPrice,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [items, totalItems, totalPrice],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
