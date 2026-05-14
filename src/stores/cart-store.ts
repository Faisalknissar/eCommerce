import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItemData {
  variantId: string;
  productId: string;
  productName: string;
  variantName: string;
  price: number;
  comparePrice?: number;
  quantity: number;
  imageUrl: string;
  productType: string;
  maxStock: number;
}

interface CartState {
  items: CartItemData[];
  couponCode: string | null;
  couponDiscount: number;
  addItem: (item: CartItemData) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  getSubtotal: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      couponDiscount: 0,

      addItem: (item) =>
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.variantId === item.variantId
          );
          if (existingIndex > -1) {
            const newItems = [...state.items];
            const existing = newItems[existingIndex];
            newItems[existingIndex] = {
              ...existing,
              quantity: Math.min(
                existing.quantity + item.quantity,
                item.maxStock
              ),
            };
            return { items: newItems };
          }
          return { items: [...state.items, item] };
        }),

      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        })),

      updateQuantity: (variantId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.variantId === variantId
              ? { ...i, quantity: Math.max(1, Math.min(quantity, i.maxStock)) }
              : i
          ),
        })),

      clearCart: () => set({ items: [], couponCode: null, couponDiscount: 0 }),

      applyCoupon: (code, discount) =>
        set({ couponCode: code, couponDiscount: discount }),

      removeCoupon: () => set({ couponCode: null, couponDiscount: 0 }),

      getSubtotal: () =>
        get().items.reduce((total, item) => total + item.price * item.quantity, 0),

      getTotal: () => {
        const subtotal = get().getSubtotal();
        return Math.max(0, subtotal - get().couponDiscount);
      },

      getItemCount: () =>
        get().items.reduce((count, item) => count + item.quantity, 0),
    }),
    {
      name: "nexstore-cart",
    }
  )
);
