import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/utils";
// Cart store
export type CartItem = Product & {
  size: string;
  color: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (
    product: Product,
    selectedSize: string,
    selectedColor: string,
    quantity?: number
  ) => void;
  removeItem: (id: string, size: string, color: string) => void;
  updateQuantity: (
    id: string,
    size: string,
    color: string,
    newQty: number
  ) => void;
  clearCart: () => void;
  totalCost: () => string;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // ✅ Add to cart
      addItem: (product, selectedSize, selectedColor, quantity = 1) => {
        const existing = get().items.find(
          (item) =>
            item.id === product.id &&
            item.size === selectedSize &&
            item.color === selectedColor
        );

        if (existing) {
          // If same product + size + color already exists → increase quantity
          set({
            items: get().items.map((item) =>
              item.id === product.id &&
              item.size === selectedSize &&
              item.color === selectedColor
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          // Add new item to cart
          set({
            items: [
              ...get().items,
              {
                ...product,
                size: selectedSize,
                color: selectedColor,
                quantity,
              },
            ],
          });
        }
      },

      // ✅ Remove from cart
      removeItem: (id, size, color) =>
        set({
          items: get().items.filter(
            (item) =>
              !(item.id === id && item.size === size && item.color === color)
          ),
        }),

      // ✅ Update quantity
      updateQuantity: (id, size, color, newQty) =>
        set({
          items: get().items.map((item) =>
            item.id === id && item.size === size && item.color === color
              ? { ...item, quantity: newQty }
              : item
          ),
        }),

      // ✅ Clear cart
      clearCart: () => set({ items: [] }),
      // total cost of items
      totalCost: () =>
        get()
          .items.reduce((sum, item) => sum + item.price * item.quantity, 0)
          .toFixed(2),
    }),
    {
      name: "cart-storage", // localStorage key
    }
  )
);
