"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";
import { useUIStore } from "@/stores/ui-store";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { cartDrawerOpen, setCartDrawerOpen } = useUIStore();
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();

  const subtotal = getSubtotal();

  return (
    <AnimatePresence>
      {cartDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartDrawerOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            className="fixed bottom-0 right-0 top-0 z-[201] w-full max-w-md glass-strong shadow-2xl md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 p-6">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" style={{ color: "var(--theme-accent-primary)" }} />
                  <h2 className="text-xl font-bold">Your Cart</h2>
                  <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium">
                    {items.length}
                  </span>
                </div>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="rounded-full p-2 transition-colors hover:bg-white/10"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
                      <ShoppingBag className="h-10 w-10 opacity-20" />
                    </div>
                    <h3 className="text-lg font-semibold">Your cart is empty</h3>
                    <p className="mt-2 text-sm" style={{ color: "var(--theme-text-muted)" }}>
                      Looks like you haven&apos;t added anything to your cart yet.
                    </p>
                    <Link
                      href="/products"
                      onClick={() => setCartDrawerOpen(false)}
                      className="btn-primary mt-8 px-8"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={`${item.productId}-${item.variantId}`} className="flex gap-4">
                        {/* Product Image Placeholder */}
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white/5 flex items-center justify-center text-2xl">
                          {item.productType === "digital" ? "💾" : "📦"}
                        </div>

                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <div className="flex justify-between gap-2">
                              <h4 className="text-sm font-semibold line-clamp-1">{item.productName}</h4>
                              <p className="text-sm font-bold">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                            <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>
                              {item.variantName}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1 rounded-lg bg-white/5">
                              <button
                                onClick={() => updateQuantity(item.productId, item.variantId, Math.max(1, item.quantity - 1))}
                                className="p-1 hover:bg-white/10 rounded"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                                className="p-1 hover:bg-white/10 rounded"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.productId, item.variantId)}
                              className="text-xs flex items-center gap-1 transition-colors hover:text-red-400"
                              style={{ color: "var(--theme-text-muted)" }}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-white/10 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: "var(--theme-text-secondary)" }}>Subtotal</span>
                    <span className="text-xl font-bold gradient-text">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="text-[10px]" style={{ color: "var(--theme-text-muted)" }}>
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    <Link
                      href="/checkout"
                      onClick={() => setCartDrawerOpen(false)}
                      className="btn-primary w-full py-4 text-base"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Checkout Now
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                    <Link
                      href="/cart"
                      onClick={() => setCartDrawerOpen(false)}
                      className="btn-secondary w-full py-3 text-sm text-center"
                    >
                      View Shopping Cart
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
