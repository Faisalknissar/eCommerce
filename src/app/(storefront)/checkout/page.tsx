"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Truck,
  MapPin,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  Lock,
  Wallet,
  Coins,
  PackageCheck
} from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type CheckoutStep = "shipping" | "payment" | "review";

const steps: { id: CheckoutStep; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "shipping", label: "Shipping", icon: MapPin },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "review", label: "Review", icon: ShieldCheck },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const { items, getSubtotal, getTotal, couponDiscount, clearCart } = useCartStore();
  const router = useRouter();

  const subtotal = getSubtotal();
  const total = getTotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const grandTotal = total + shipping + tax;

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const handlePlaceOrder = () => {
    // Show a premium loading state / success toast
    toast.success("Transaction Secure. Order Processing... 🎉");
    setTimeout(() => {
      clearCart();
      router.push("/checkout/success");
    }, 1500);
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container-page max-w-6xl">
        {/* Header with Security Badge */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link href="/cart" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity mb-2">
              <ArrowLeft className="h-4 w-4" /> Back to Bag
            </Link>
            <h1 className="text-4xl font-black tracking-tight" style={{ fontFamily: "var(--theme-font-heading)" }}>
              Secure <span className="gradient-text">Checkout</span>
            </h1>
          </motion.div>

          <motion.div 
            className="flex items-center gap-3 rounded-full bg-[var(--color-success)]/10 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[var(--color-success)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Lock className="h-4 w-4" />
            End-to-End Encrypted
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Checkout Steps Main Area */}
          <div className="lg:col-span-8 space-y-10">
            {/* Step Indicator */}
            <div className="flex items-center justify-between px-4">
              {steps.map((step, i) => {
                const isActive = step.id === currentStep;
                const isCompleted = i < currentStepIndex;
                const StepIcon = step.icon;
                
                return (
                  <div key={step.id} className="flex flex-1 items-center last:flex-none">
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                          isActive 
                            ? "border-[var(--theme-accent-primary)] bg-[var(--theme-accent-primary)] text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]" 
                            : isCompleted 
                            ? "border-[var(--color-success)] bg-[var(--color-success)] text-white" 
                            : "border-border bg-surface text-text-muted/30"
                        }`}
                      >
                        {isCompleted ? <Check className="h-6 w-6" /> : <StepIcon className="h-5 w-5" />}
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? "text-white" : "opacity-40"}`}>
                        {step.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="mx-4 h-[2px] flex-1 bg-border overflow-hidden">
                        <motion.div 
                          className="h-full bg-[var(--color-success)]"
                          initial={{ width: "0%" }}
                          animate={{ width: isCompleted ? "100%" : "0%" }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Form Area */}
            <AnimatePresence mode="wait">
              {currentStep === "shipping" && (
                <motion.div
                  key="shipping"
                  className="glass-card p-10 space-y-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--theme-accent-primary)]/10 text-[var(--theme-accent-primary)]">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Shipping Information</h2>
                      <p className="text-sm opacity-50">Where should we send your order?</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest opacity-40">Recipient Name</label>
                      <input
                        type="text"
                        className="w-full rounded-xl bg-surface border border-border px-4 py-3.5 text-sm focus:border-[var(--theme-accent-primary)] transition-all outline-none"
                        value={shippingInfo.fullName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                        placeholder="e.g. Faisal Khan"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest opacity-40">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full rounded-xl bg-surface border border-border px-4 py-3.5 text-sm focus:border-[var(--theme-accent-primary)] transition-all outline-none"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        placeholder="+91 00000 00000"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest opacity-40">Street Address</label>
                      <input
                        type="text"
                        className="w-full rounded-xl bg-surface border border-border px-4 py-3.5 text-sm focus:border-[var(--theme-accent-primary)] transition-all outline-none"
                        value={shippingInfo.addressLine1}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, addressLine1: e.target.value })}
                        placeholder="Apartment, suite, unit, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest opacity-40">City</label>
                      <input
                        type="text"
                        className="w-full rounded-xl bg-surface border border-border px-4 py-3.5 text-sm focus:border-[var(--theme-accent-primary)] transition-all outline-none"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        placeholder="Mumbai"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest opacity-40">Pincode</label>
                      <input
                        type="text"
                        className="w-full rounded-xl bg-surface border border-border px-4 py-3.5 text-sm focus:border-[var(--theme-accent-primary)] transition-all outline-none"
                        value={shippingInfo.pincode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, pincode: e.target.value })}
                        placeholder="400001"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <motion.button
                      className="btn-primary group px-10 py-4"
                      onClick={() => setCurrentStep("payment")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        Continue to Payment
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {currentStep === "payment" && (
                <motion.div
                  key="payment"
                  className="glass-card p-10 space-y-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--theme-accent-secondary)]/10 text-[var(--theme-accent-secondary)]">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Payment Method</h2>
                      <p className="text-sm opacity-50">Select your preferred way to pay</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { id: "stripe", label: "Credit or Debit Card", sub: "Instant confirmation via Stripe", icon: Wallet, color: "var(--theme-accent-primary)" },
                      { id: "razorpay", label: "Razorpay (UPI / NetBanking)", sub: "Trusted Indian payment gateway", icon: Coins, color: "var(--theme-accent-tertiary)" },
                      { id: "cod", label: "Cash on Delivery", sub: "Standard delivery processing", icon: Truck, color: "var(--theme-text-muted)" },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`group relative flex cursor-pointer items-center gap-6 rounded-2xl border-2 p-6 transition-all duration-300 ${
                          paymentMethod === method.id 
                            ? "border-[var(--theme-accent-primary)] bg-[var(--theme-accent-primary)]/[0.03]" 
                            : "border-border-muted hover:border-border"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="sr-only"
                        />
                        <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-surface transition-colors group-hover:bg-surface-elevated ${paymentMethod === method.id ? "text-[var(--theme-accent-primary)]" : ""}`}>
                          <method.icon className="h-7 w-7" />
                        </div>
                        <div className="flex-1">
                          <p className="text-lg font-bold">{method.label}</p>
                          <p className="text-sm opacity-50">{method.sub}</p>
                        </div>
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                            paymentMethod === method.id ? "border-[var(--theme-accent-primary)] bg-[var(--theme-accent-primary)]" : "border-border"
                          }`}
                        >
                          {paymentMethod === method.id && <Check className="h-4 w-4 text-white" />}
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="flex justify-between pt-6">
                    <button onClick={() => setCurrentStep("shipping")} className="btn-secondary px-8">Back</button>
                    <motion.button
                      className="btn-primary px-10 py-4"
                      onClick={() => setCurrentStep("review")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        Review Order
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {currentStep === "review" && (
                <motion.div
                  key="review"
                  className="glass-card p-10 space-y-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-success)]/10 text-[var(--color-success)]">
                      <PackageCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Final Review</h2>
                      <p className="text-sm opacity-50">One last look before we process your order</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="rounded-2xl bg-surface p-6 border border-border">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3">Shipping To</p>
                        <p className="text-lg font-bold">{shippingInfo.fullName || "Faisal Khan"}</p>
                        <p className="text-sm opacity-60 mt-1 leading-relaxed">
                          {shippingInfo.addressLine1 || "No address provided"}<br />
                          {shippingInfo.city}, {shippingInfo.pincode}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-surface p-6 border border-border">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3">Payment Method</p>
                        <p className="text-lg font-bold">
                          {paymentMethod === "stripe" ? "Credit Card" : paymentMethod === "razorpay" ? "Razorpay" : "Cash on Delivery"}
                        </p>
                        <p className="text-sm opacity-60 mt-1">Transaction will be processed securely.</p>
                      </div>
                    </div>

                    {/* Compact Item List */}
                    <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Order Items</p>
                      <div className="max-h-48 overflow-y-auto pr-2 space-y-3">
                        {items.map((item) => (
                          <div key={item.variantId} className="flex items-center justify-between rounded-xl bg-surface-muted p-4">
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-surface text-xl">📦</div>
                              <div>
                                <p className="text-sm font-bold truncate max-w-[200px]">{item.productName}</p>
                                <p className="text-[10px] opacity-40 uppercase tracking-tighter">{item.quantity} × {item.variantName}</p>
                              </div>
                            </div>
                            <span className="font-bold text-sm">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-10 border-t border-border">
                    <button onClick={() => setCurrentStep("payment")} className="btn-secondary px-8">Back</button>
                    <motion.button
                      className="btn-primary group px-12 py-5 text-xl font-black"
                      onClick={handlePlaceOrder}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center gap-4">
                        <Lock className="h-6 w-6" />
                        Place My Order — {formatPrice(grandTotal)}
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mini Sidebar Summary */}
          <div className="lg:col-span-4">
            <motion.div
              className="sticky top-32 glass-card overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="p-8 space-y-6">
                <h3 className="text-lg font-bold opacity-40 uppercase tracking-widest">Bag Total</h3>
                
                <div className="space-y-4 border-b border-border pb-6">
                  <div className="flex justify-between text-base">
                    <span className="opacity-50">Subtotal</span>
                    <span className="font-bold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="opacity-50">Shipping</span>
                    <span className={shipping === 0 ? "text-[var(--color-success)] font-bold" : "font-bold"}>
                      {shipping === 0 ? "FREE" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="opacity-50">Tax (GST 18%)</span>
                    <span className="font-bold">{formatPrice(tax)}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-[var(--color-success)] font-bold">
                      <span>Discount</span>
                      <span>-{formatPrice(couponDiscount)}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-black">Total</span>
                  <span className="text-3xl font-black gradient-text tracking-tighter">
                    {formatPrice(grandTotal)}
                  </span>
                </div>

                <div className="rounded-2xl bg-[var(--theme-accent-primary)]/5 p-4 border border-[var(--theme-accent-primary)]/10">
                  <p className="text-[10px] text-center font-bold opacity-60 leading-relaxed">
                    By placing your order, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

