"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
  const { items, removeItem, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile-ish or to close on outside click if needed, 
              but usually for dropdowns we just use the relative parent */}
          <div className="fixed inset-0 z-40" onClick={onClose} />
          
          <motion.div
            className="glass-strong absolute right-0 top-full mt-4 z-50 w-[380px] overflow-hidden rounded-2xl shadow-2xl"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
              <span className="text-sm font-bold uppercase tracking-wider opacity-60">Shopping Bag</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/5">{items.length} Items</span>
            </div>

            {/* Items */}
            <div className="max-h-[350px] overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                    <ShoppingBag className="h-8 w-8 opacity-20" />
                  </div>
                  <p className="text-sm font-medium" style={{ color: "var(--theme-text-muted)" }}>
                    Your bag is empty
                  </p>
                  <Link
                    href="/products"
                    onClick={onClose}
                    className="mt-4 inline-block text-xs font-bold uppercase tracking-widest hover:underline"
                    style={{ color: "var(--theme-accent-primary)" }}
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-5">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.variantId}`} className="group flex gap-4">
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white/5 flex items-center justify-center text-xl">
                        {item.productType === "digital" ? "💾" : "📦"}
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <div className="flex justify-between gap-2">
                          <h4 className="text-sm font-semibold line-clamp-1">{item.productName}</h4>
                          <button
                            onClick={() => removeItem(item.productId, item.variantId)}
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-red-400/70 hover:text-red-400" />
                          </button>
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>
                            {item.quantity} × {formatPrice(item.price)}
                          </p>
                          <p className="text-xs font-bold">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/5 bg-white/[0.02] px-5 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider opacity-60">Subtotal</span>
                  <span className="text-lg font-black gradient-text">{formatPrice(subtotal)}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/cart"
                    onClick={onClose}
                    className="btn-ghost py-2.5 text-xs font-bold uppercase tracking-widest text-center"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    Bag
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="btn-primary py-2.5 text-xs font-bold uppercase tracking-widest text-center"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
