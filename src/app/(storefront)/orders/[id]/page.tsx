"use client";

import { motion } from "framer-motion";
import {
  Package,
  CreditCard,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowLeft,
  Copy,
  Download,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

// Mock order data — in production this would come from server action
const mockOrder = {
  id: "ORD-2026-A1B2C",
  date: "2026-05-10T14:30:00",
  status: "shipped",
  items: [
    { name: "Quantum Pro Wireless Headphones", variant: "Midnight Black", qty: 1, price: 12999, type: "physical" },
  ],
  subtotal: 12999,
  shipping: 0,
  tax: 2340,
  discount: 0,
  total: 15339,
  payment: { method: "Credit Card", last4: "4242", status: "paid" },
  shipping_address: {
    name: "Rahul Sharma",
    phone: "+91 9876543210",
    line1: "42, Sunflower Heights, 3rd Floor",
    line2: "Near City Mall, Andheri West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400058",
  },
  tracking: {
    carrier: "BlueDart",
    number: "BD2026051012345",
    url: "#",
  },
  timeline: [
    { status: "placed", label: "Order Placed", date: "10 May 2026, 2:30 PM", done: true },
    { status: "confirmed", label: "Order Confirmed", date: "10 May 2026, 2:35 PM", done: true },
    { status: "processing", label: "Processing", date: "10 May 2026, 5:00 PM", done: true },
    { status: "shipped", label: "Shipped", date: "11 May 2026, 10:15 AM", done: true },
    { status: "out_for_delivery", label: "Out for Delivery", date: "Estimated: 13 May", done: false },
    { status: "delivered", label: "Delivered", date: "—", done: false },
  ],
};

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;

  const copyTrackingNumber = () => {
    navigator.clipboard.writeText(mockOrder.tracking.number);
    toast.success("Tracking number copied!");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container-page max-w-5xl">
        {/* Back */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link
            href="/account"
            className="mb-6 inline-flex items-center gap-1.5 text-sm transition-colors hover:text-white"
            style={{ color: "var(--theme-text-muted)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Account
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="mb-6 flex flex-wrap items-center justify-between gap-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--theme-font-heading)" }}>
              Order <span className="gradient-text">{orderId || mockOrder.id}</span>
            </h1>
            <p className="text-sm" style={{ color: "var(--theme-text-muted)" }}>
              Placed on {new Date(mockOrder.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary text-sm gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Invoice
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Timeline + Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Tracking Timeline */}
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="mb-5 text-lg font-bold">Order Timeline</h3>
              <div className="relative">
                {mockOrder.timeline.map((step, i) => {
                  const isLast = i === mockOrder.timeline.length - 1;
                  const iconMap: Record<string, React.ComponentType<{ className?: string, style?: React.CSSProperties }>> = {
                    placed: Clock,
                    confirmed: CheckCircle2,
                    processing: Package,
                    shipped: Truck,
                    out_for_delivery: Truck,
                    delivered: CheckCircle2,
                  };
                  const Icon = iconMap[step.status] || Clock;

                  return (
                    <motion.div
                      key={step.status}
                      className="relative flex gap-4 pb-6 last:pb-0"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                    >
                      {/* Vertical line */}
                      {!isLast && (
                        <div
                          className="absolute left-4 top-8 -ml-px h-full w-0.5"
                          style={{
                            background: step.done
                              ? "var(--theme-accent-primary)"
                              : "rgba(255,255,255,0.06)",
                          }}
                        />
                      )}
                      {/* Circle */}
                      <div
                        className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                        style={{
                          background: step.done
                            ? "var(--theme-accent-primary)"
                            : "rgba(255,255,255,0.06)",
                          boxShadow: step.done
                            ? "0 0 12px rgba(139, 92, 246, 0.4)"
                            : "none",
                        }}
                      >
                        <Icon
                          className="h-4 w-4"
                          style={{ color: step.done ? "white" : "var(--theme-text-muted)" }}
                        />
                      </div>
                      {/* Content */}
                      <div className="pt-1">
                        <p className="text-sm font-medium" style={{ color: step.done ? "var(--theme-text-primary)" : "var(--theme-text-muted)" }}>
                          {step.label}
                        </p>
                        <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>
                          {step.date}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Tracking Number */}
              {mockOrder.tracking.number && (
                <div
                  className="mt-4 flex items-center gap-3 rounded-lg p-3"
                  style={{ background: "rgba(139, 92, 246, 0.06)", border: "1px solid rgba(139, 92, 246, 0.1)" }}
                >
                  <Truck className="h-4 w-4 shrink-0" style={{ color: "var(--theme-accent-primary)" }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>
                      {mockOrder.tracking.carrier} Tracking
                    </p>
                    <p className="text-sm font-mono font-medium truncate">
                      {mockOrder.tracking.number}
                    </p>
                  </div>
                  <button onClick={copyTrackingNumber} className="btn-ghost p-1.5">
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </motion.div>

            {/* Order Items */}
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="mb-4 text-lg font-bold">Items</h3>
              <div className="space-y-3">
                {mockOrder.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-lg p-3"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg text-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                      {item.type === "digital" ? "💾" : item.type === "service" ? "🎯" : "📦"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>
                        {item.variant} · Qty: {item.qty}
                      </p>
                    </div>
                    <p className="text-sm font-bold">{formatPrice(item.price)}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Info */}
            <motion.div
              className="glass-card p-5 space-y-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h3 className="font-bold flex items-center gap-2">
                <CreditCard className="h-4 w-4" style={{ color: "var(--theme-accent-primary)" }} />
                Payment
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: "var(--theme-text-secondary)" }}>Subtotal</span>
                  <span>{formatPrice(mockOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--theme-text-secondary)" }}>Shipping</span>
                  <span style={{ color: mockOrder.shipping === 0 ? "var(--color-success)" : undefined }}>
                    {mockOrder.shipping === 0 ? "FREE" : formatPrice(mockOrder.shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--theme-text-secondary)" }}>GST</span>
                  <span>{formatPrice(mockOrder.tax)}</span>
                </div>
                {mockOrder.discount > 0 && (
                  <div className="flex justify-between" style={{ color: "var(--color-success)" }}>
                    <span>Discount</span>
                    <span>-{formatPrice(mockOrder.discount)}</span>
                  </div>
                )}
                <div className="border-t pt-2" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="gradient-text">{formatPrice(mockOrder.total)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1 text-xs" style={{ color: "var(--color-success)" }}>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Paid via {mockOrder.payment.method} (****{mockOrder.payment.last4})
                </div>
              </div>
            </motion.div>

            {/* Shipping Address */}
            <motion.div
              className="glass-card p-5 space-y-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-bold flex items-center gap-2">
                <MapPin className="h-4 w-4" style={{ color: "var(--theme-accent-primary)" }} />
                Shipping Address
              </h3>
              <div className="text-sm leading-relaxed" style={{ color: "var(--theme-text-secondary)" }}>
                <p className="font-medium" style={{ color: "var(--theme-text-primary)" }}>{mockOrder.shipping_address.name}</p>
                <p>{mockOrder.shipping_address.phone}</p>
                <p className="mt-1">
                  {mockOrder.shipping_address.line1}<br />
                  {mockOrder.shipping_address.line2}<br />
                  {mockOrder.shipping_address.city}, {mockOrder.shipping_address.state} — {mockOrder.shipping_address.pincode}
                </p>
              </div>
            </motion.div>

            {/* Need Help */}
            <motion.div
              className="glass-card p-5 text-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <p className="mb-2 text-sm font-medium">Need help with this order?</p>
              <button className="btn-secondary w-full text-sm">Contact Support</button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
