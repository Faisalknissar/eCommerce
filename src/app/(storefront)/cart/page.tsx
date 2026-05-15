"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Trash2, Minus, Plus, ArrowRight, Tag, ShoppingCart, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getTotal, couponCode, couponDiscount, applyCoupon, removeCoupon } = useCartStore();
  const [promoCode, setPromoCode] = useState("");

  const subtotal = getSubtotal();
  const total = getTotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const grandTotal = total + shipping + tax;
  const handleApplyCoupon = () => {
    if (promoCode.trim().toUpperCase() !== "WELCOME10") {
      toast.error("Coupon code is not valid");
      return;
    }

    applyCoupon("WELCOME10", Math.round(subtotal * 0.1));
    toast.success("WELCOME10 applied");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-20">
        <div className="container-page">
          <motion.div
            className="glass-card flex flex-col items-center justify-center py-32 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 animate-pulse blur-3xl" style={{ background: "var(--theme-accent-primary)", opacity: 0.2 }} />
              <ShoppingCart className="relative h-24 w-24 opacity-20" />
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--theme-font-heading)" }}>
              Your bag is currently empty
            </h2>
            <p className="max-w-md mx-auto mb-10 text-lg opacity-60">
              Discover our latest collection and start building your tech ecosystem today.
            </p>
            <Link href="/products">
              <motion.button 
                className="btn-primary px-10 py-4 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <ShoppingBag className="h-5 w-5" />
                  Explore Products
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container-page">
        {/* Header Section */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <motion.div {...fadeIn}>
            <h1 className="text-5xl font-black tracking-tight" style={{ fontFamily: "var(--theme-font-heading)" }}>
              Your <span className="gradient-text">Shopping Bag</span>
            </h1>
            <p className="mt-4 flex items-center gap-2 text-lg font-medium opacity-60">
              <ShieldCheck className="h-5 w-5 text-[var(--color-success)]" />
              Secure Checkout & Free Returns
            </p>
          </motion.div>
          
          <motion.div 
            className="text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest opacity-40">Cart Status</span>
            <div className="mt-1 text-2xl font-bold">
              {items.length} {items.length === 1 ? "Item" : "Items"}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Cart Items Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="hidden grid-cols-12 gap-4 px-6 py-2 text-xs font-bold uppercase tracking-widest opacity-40 md:grid">
              <div className="col-span-6">Product Details</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Subtotal</div>
            </div>

            <div className="space-y-6">
              {items.map((item, i) => (
                <motion.div
                  key={item.variantId}
                  className="glass-card group relative grid grid-cols-1 items-center gap-6 p-6 transition-all hover:bg-surface md:grid-cols-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  layout
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-6 md:col-span-6">
                    <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-surface to-surface-muted">
                      <Image
                        src={item.imageUrl}
                        alt={item.productName}
                        fill
                        sizes="112px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="hidden">
                        {item.productType === "digital" ? "💾" : item.productType === "service" ? "🎯" : "📦"}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-bold transition-colors group-hover:text-[var(--theme-accent-primary)] line-clamp-1">
                        {item.productName}
                      </h3>
                      <p className="mt-1 text-sm font-medium opacity-50">{item.variantName}</p>
                      <div className="mt-3 flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-1 text-[var(--color-success)]">
                          <Truck className="h-3 w-3" /> In Stock
                        </span>
                        <button
                          onClick={() => { removeItem(item.variantId); toast.info("Item removed"); }}
                          className="flex items-center gap-1 text-red-400/60 transition-colors hover:text-red-400"
                        >
                          <Trash2 className="h-3 w-3" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Control */}
                  <div className="flex items-center justify-center md:col-span-3">
                    <div className="flex items-center gap-4 rounded-full bg-surface-elevated p-1.5 px-4" style={{ border: "1px solid var(--theme-border)" }}>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="rounded-full p-1 transition-colors hover:bg-surface disabled:opacity-20"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-[1.5rem] text-center text-lg font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="rounded-full p-1 transition-colors hover:bg-surface disabled:opacity-20"
                        disabled={item.quantity >= item.maxStock}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex flex-col items-end md:col-span-3">
                    <span className="text-2xl font-black tracking-tight">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <span className="text-xs font-medium opacity-40">
                      {formatPrice(item.price)} each
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar / Summary Column */}
          <div className="lg:col-span-4">
            <motion.div
              className="sticky top-32 space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="glass-card overflow-hidden">
                <div className="bg-surface-elevated p-8">
                  <h2 className="text-2xl font-bold mb-6">Summary</h2>
                  <div className="space-y-5">
                    <div className="flex justify-between text-base">
                      <span className="opacity-50">Subtotal</span>
                      <span className="font-bold">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="opacity-50">Estimated Shipping</span>
                      <span className={shipping === 0 ? "text-[var(--color-success)] font-bold" : "font-bold"}>
                        {shipping === 0 ? "FREE" : formatPrice(shipping)}
                      </span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="opacity-50">Applied GST (18%)</span>
                      <span className="font-bold">{formatPrice(tax)}</span>
                    </div>

                    {couponDiscount > 0 && (
                      <motion.div 
                        className="flex justify-between rounded-lg bg-[var(--color-success)]/10 p-3 text-[var(--color-success)]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <span className="text-sm font-bold flex items-center gap-2">
                          <Tag className="h-4 w-4" /> {couponCode}
                        </span>
                        <span className="font-bold">-{formatPrice(couponDiscount)}</span>
                        <button onClick={removeCoupon} className="ml-2 text-xs opacity-60 hover:opacity-100 underline">Remove</button>
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-4xl font-black gradient-text tracking-tighter">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>

                  {/* Promo Input */}
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 opacity-30" />
                      <input
                        type="text"
                        placeholder="Coupon code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full rounded-xl bg-surface border border-border py-3 pl-11 text-sm font-medium focus:border-[var(--theme-accent-primary)] focus:outline-none transition-all"
                      />
                    </div>
                    <button
                      className="btn-secondary px-6 rounded-xl text-sm font-bold uppercase tracking-widest"
                      onClick={handleApplyCoupon}
                    >
                      Apply
                    </button>
                  </div>

                  <Link href="/checkout" className="block">
                    <motion.button
                      className="btn-primary group w-full py-5 text-lg font-bold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        Secure Checkout
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </motion.button>
                  </Link>
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card flex flex-col items-center p-6 text-center">
                  <RefreshCw className="mb-3 h-6 w-6 text-[var(--theme-accent-primary)]" />
                  <span className="text-xs font-bold uppercase tracking-tighter">30-Day Returns</span>
                </div>
                <div className="glass-card flex flex-col items-center p-6 text-center">
                  <ShieldCheck className="mb-3 h-6 w-6 text-[var(--theme-accent-secondary)]" />
                  <span className="text-xs font-bold uppercase tracking-tighter">Secure Payment</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
