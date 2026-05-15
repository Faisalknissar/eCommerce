"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";
import { useUIStore } from "@/stores/ui-store";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { cartDrawerOpen, setCartDrawerOpen } = useUIStore();
  const { items, removeItem, updateQuantity, getSubtotal, getItemCount } =
    useCartStore();

  const subtotal = getSubtotal();
  const itemCount = getItemCount();
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const progress = Math.min(100, (subtotal / 999) * 100);
  const freeShippingRemaining = Math.max(0, 999 - subtotal);
  const closeAfterNavigation = () => {
    window.setTimeout(() => setCartDrawerOpen(false), 80);
  };

  return (
    <AnimatePresence>
      {cartDrawerOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartDrawerOpen(false)}
          />

          <motion.aside
            className="fixed bottom-0 right-0 top-0 z-[201] flex w-full max-w-[460px] flex-col overflow-hidden border-l border-border bg-[var(--theme-bg-secondary)] shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            aria-label="Cart preview"
          >
            <div className="border-b border-border bg-surface-elevated p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--theme-accent-primary)]/15 text-[var(--theme-accent-primary)]">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary">Cart Preview</h2>
                    <p className="text-xs text-secondary">
                      Review items before checkout
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="rounded-full p-2 transition-colors hover:bg-surface"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {items.length > 0 && (
                <div className="mt-5 rounded-lg border border-border bg-surface p-4">
                  <div className="mb-3 flex items-center justify-between gap-3 text-xs">
                    <span className="flex items-center gap-2 font-medium text-secondary">
                      <Truck className="h-4 w-4 text-[var(--color-success)]" />
                      {shipping === 0
                        ? "Free shipping unlocked"
                        : `${formatPrice(
                            freeShippingRemaining
                          )} away from free shipping`}
                    </span>
                    <span className="font-bold text-primary">
                      {itemCount} item{itemCount === 1 ? "" : "s"}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface-elevated">
                    <motion.div
                      className="h-full rounded-full bg-[var(--color-success)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <motion.div
                className="border-b border-border bg-[var(--color-success)]/10 px-5 py-3 text-sm text-[var(--color-success)] sm:px-6"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="h-4 w-4" />
                  Added to cart. You can proceed whenever you are ready.
                </span>
              </motion.div>
            )}

            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-surface">
                    <ShoppingBag className="h-10 w-10 text-text-muted/40" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary">Your cart is empty</h3>
                  <p className="mt-2 max-w-xs text-sm text-secondary">
                    Add something special and it will appear here with a fast
                    checkout path.
                  </p>
                  <Link
                    href="/products"
                    onClick={closeAfterNavigation}
                    className="btn-primary mt-8 px-8 py-3"
                  >
                    <span className="relative z-10">Start Shopping</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.productId}-${item.variantId}`}
                      className="group rounded-lg border border-border bg-surface p-3"
                      layout
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 24 }}
                    >
                      <div className="flex gap-4">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-elevated">
                          <Image
                            src={item.imageUrl}
                            alt={item.productName}
                            fill
                            sizes="80px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <div className="flex justify-between gap-2">
                              <h4 className="text-sm font-semibold line-clamp-1">
                                {item.productName}
                              </h4>
                              <p className="shrink-0 text-sm font-bold">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>
                            <p className="mt-0.5 text-xs text-muted">
                              {item.variantName}
                            </p>
                          </div>

                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-1 rounded-full border border-border bg-surface-elevated p-1">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.variantId,
                                    item.quantity - 1
                                  )
                                }
                                className="rounded-full p-1.5 hover:bg-surface disabled:opacity-30"
                                disabled={item.quantity <= 1}
                                aria-label={`Decrease ${item.productName} quantity`}
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-7 text-center text-xs font-bold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.variantId,
                                    item.quantity + 1
                                  )
                                }
                                className="rounded-full p-1.5 hover:bg-surface disabled:opacity-30"
                                disabled={item.quantity >= item.maxStock}
                                aria-label={`Increase ${item.productName} quantity`}
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.variantId)}
                              className="flex items-center gap-1 text-xs text-muted transition-colors hover:text-red-400"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border bg-surface-elevated p-5 sm:p-6">
                <div className="space-y-3 rounded-lg border border-border bg-surface p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary">Subtotal</span>
                    <span className="font-bold text-primary">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary">Estimated shipping</span>
                    <span
                      className={
                        shipping === 0
                          ? "font-bold text-[var(--color-success)]"
                          : "font-bold"
                      }
                    >
                      {shipping === 0 ? "FREE" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <span className="font-semibold text-primary">Payable now</span>
                    <span className="text-2xl font-black gradient-text">
                      {formatPrice(subtotal + shipping)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-center gap-4 text-[11px] font-semibold uppercase tracking-wider text-muted">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" /> Secure
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" /> Fast checkout
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3">
                  <Link
                    href="/checkout"
                    onClick={closeAfterNavigation}
                    className="btn-primary w-full py-4 text-base"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Proceed to Buy
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeAfterNavigation}
                    className="btn-secondary w-full py-3 text-center text-sm"
                  >
                    View Shopping Cart
                  </Link>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
