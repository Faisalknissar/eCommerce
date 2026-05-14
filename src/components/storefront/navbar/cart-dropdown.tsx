"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
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
          <div className="fixed inset-0 z-40" onClick={onClose} />

          <motion.div
            className="absolute right-0 top-full z-50 mt-4 w-[400px] overflow-hidden rounded-lg border border-white/10 bg-[var(--theme-bg-secondary)] shadow-2xl"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-5 py-4">
              <span className="text-sm font-bold uppercase tracking-wider text-white/60">
                Shopping Bag
              </span>
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs font-medium">
                {items.length} Items
              </span>
            </div>

            <div className="max-h-[350px] overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                    <ShoppingBag className="h-8 w-8 text-white/25" />
                  </div>
                  <p className="text-sm font-medium text-white/50">
                    Your bag is empty
                  </p>
                  <Link
                    href="/products"
                    onClick={onClose}
                    className="mt-4 inline-block text-xs font-bold uppercase tracking-widest text-[var(--theme-accent-primary)] hover:underline"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-5">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.variantId}`}
                      className="group flex gap-4"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white/5">
                        <Image
                          src={item.imageUrl}
                          alt={item.productName}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <div className="flex justify-between gap-2">
                          <h4 className="text-sm font-semibold line-clamp-1">
                            {item.productName}
                          </h4>
                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                            aria-label={`Remove ${item.productName}`}
                          >
                            <Trash2 className="h-3.5 w-3.5 text-red-400/70 hover:text-red-400" />
                          </button>
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          <p className="text-xs text-white/45">
                            {item.quantity} x {formatPrice(item.price)}
                          </p>
                          <p className="text-xs font-bold">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="space-y-4 border-t border-white/10 bg-white/[0.02] px-5 py-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-white/60">
                    Subtotal
                  </span>
                  <span className="text-lg font-black gradient-text">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/cart"
                    onClick={onClose}
                    className="btn-secondary py-2.5 text-center text-xs font-bold uppercase tracking-widest"
                  >
                    Bag
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="btn-primary py-2.5 text-center text-xs font-bold uppercase tracking-widest"
                  >
                    <span className="relative z-10 inline-flex items-center gap-1.5">
                      Checkout <ArrowRight className="h-3.5 w-3.5" />
                    </span>
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
