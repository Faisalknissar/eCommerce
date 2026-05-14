"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Package, Home, ShoppingBag, Heart, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function CheckoutSuccessPage() {
  const [orderNumber] = useState(
    () => `NX-${Math.floor(100000 + Math.random() * 900000)}`
  );

  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: ReturnType<typeof setInterval> = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20">
      <div className="container-page max-w-3xl">
        <motion.div
          className="glass-card relative overflow-hidden p-12 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background Glow */}
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[var(--theme-accent-primary)] opacity-10 blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[var(--theme-accent-secondary)] opacity-10 blur-[100px]" />

          {/* Success Icon */}
          <motion.div
            className="relative mx-auto mb-10 flex h-32 w-32 items-center justify-center rounded-full bg-[var(--color-success)]/10 text-[var(--color-success)]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
          >
            <div className="absolute inset-0 animate-ping rounded-full bg-[var(--color-success)] opacity-20" />
            <CheckCircle2 className="relative h-16 w-16" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-5xl font-black tracking-tight mb-4" style={{ fontFamily: "var(--theme-font-heading)" }}>
              Order <span className="gradient-text">Confirmed!</span>
            </h1>
            <p className="text-xl opacity-60 mb-8">
              Thank you for choosing NexStore. Your premium tech is on its way.
            </p>

            {/* Order Details Card */}
            <div className="mx-auto max-w-md rounded-2xl bg-white/5 border border-white/5 p-6 mb-12">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest opacity-40">Order Number</span>
                <span className="font-mono text-lg font-bold text-[var(--theme-accent-primary)]">{orderNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest opacity-40">Status</span>
                <div className="flex items-center gap-2 text-[var(--color-success)]">
                  <div className="h-2 w-2 rounded-full bg-[var(--color-success)] animate-pulse" />
                  <span className="text-sm font-bold uppercase tracking-tight">Processing</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
                  <Package className="h-5 w-5 opacity-40" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Fast Delivery</h4>
                  <p className="text-xs opacity-50 mt-1">Expected within 3-5 business days.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
                  <Heart className="h-5 w-5 opacity-40" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Tracking Sent</h4>
                  <p className="text-xs opacity-50 mt-1">Check your email for live updates.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
                  <ShieldCheck className="h-5 w-5 opacity-40" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Secure Support</h4>
                  <p className="text-xs opacity-50 mt-1">Our team is here 24/7 if you need us.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/products" className="w-full sm:w-auto">
                <motion.button
                  className="btn-primary w-full px-8 py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Continue Shopping
                    <ShoppingBag className="h-5 w-5" />
                  </span>
                </motion.button>
              </Link>
              <Link href="/" className="w-full sm:w-auto">
                <motion.button
                  className="btn-secondary w-full px-8 py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Home className="h-5 w-5" />
                    Back Home
                  </span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
