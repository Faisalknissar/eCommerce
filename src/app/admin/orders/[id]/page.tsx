"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Truck, User, CreditCard, Package, Clock, CheckCircle2, X } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";

const mockOrder = {
  id: "ORD-2026-A1B2C",
  date: "2026-05-10T14:30:00",
  status: "pending",
  items: [
    { name: "Quantum Pro Wireless Headphones", variant: "Midnight Black", sku: "QP-WH-001", qty: 1, price: 12999 },
    { name: "NeoVibe Smart Watch Ultra", variant: "Silver", sku: "NV-SW-002", qty: 2, price: 24999 },
  ],
  subtotal: 62997,
  shipping: 0,
  tax: 11339,
  discount: 2000,
  total: 72336,
  payment: { method: "Credit Card", last4: "4242", status: "paid", providerId: "pi_3MtwBwLkdIwHu7ix28a3tq" },
  customer: {
    id: "user_123",
    name: "Rahul Sharma",
    email: "rahul@email.com",
    phone: "+91 9876543210",
  },
  shippingAddress: {
    line1: "42, Sunflower Heights, 3rd Floor",
    line2: "Near City Mall, Andheri West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400058",
    country: "India",
  },
  tracking: {
    carrier: "",
    number: "",
  }
};

const statuses = [
  { id: "pending", label: "Pending" },
  { id: "confirmed", label: "Confirmed" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
];

export default function AdminOrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;
  
  const [status, setStatus] = useState(mockOrder.status);
  const [trackingNumber, setTrackingNumber] = useState(mockOrder.tracking.number);
  const [carrier, setCarrier] = useState(mockOrder.tracking.carrier);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Order updated successfully!");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-2 flex items-center gap-2">
            <Link
              href="/admin/orders"
              className="flex items-center gap-1 text-sm text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Orders
            </Link>
          </div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--theme-font-heading)" }}>
            Order {orderId}
          </h1>
          <p className="text-sm" style={{ color: "var(--theme-text-muted)" }}>
            Placed on {new Date(mockOrder.date).toLocaleString()}
          </p>
        </motion.div>
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button className="btn-secondary" onClick={() => router.push("/admin/orders")}>
            Discard
          </button>
          <button
            className="btn-primary"
            onClick={handleSave}
            disabled={isSubmitting}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Save className="h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </span>
          </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Details */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="mb-4 text-lg font-bold flex items-center gap-2">
              <Package className="h-5 w-5" style={{ color: "var(--theme-accent-primary)" }} />
              Order Items
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <th className="pb-3 font-medium" style={{ color: "var(--theme-text-muted)" }}>Product</th>
                    <th className="pb-3 font-medium" style={{ color: "var(--theme-text-muted)" }}>Price</th>
                    <th className="pb-3 font-medium text-center" style={{ color: "var(--theme-text-muted)" }}>Qty</th>
                    <th className="pb-3 font-medium text-right" style={{ color: "var(--theme-text-muted)" }}>Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                  {mockOrder.items.map((item, i) => (
                    <tr key={i}>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-900/20 to-blue-900/20 text-xl">
                            📦
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>
                              {item.variant} • SKU: {item.sku}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">{formatPrice(item.price)}</td>
                      <td className="py-4 text-center">{item.qty}</td>
                      <td className="py-4 text-right font-medium">{formatPrice(item.price * item.qty)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <div className="w-full sm:w-1/2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: "var(--theme-text-muted)" }}>Subtotal</span>
                  <span>{formatPrice(mockOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--theme-text-muted)" }}>Discount</span>
                  <span style={{ color: "var(--color-success)" }}>-{formatPrice(mockOrder.discount)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--theme-text-muted)" }}>Tax</span>
                  <span>{formatPrice(mockOrder.tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--theme-text-muted)" }}>Shipping</span>
                  <span>{mockOrder.shipping === 0 ? "Free" : formatPrice(mockOrder.shipping)}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <span>Total</span>
                  <span className="gradient-text">{formatPrice(mockOrder.total)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Info */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h2 className="mb-4 text-lg font-bold flex items-center gap-2">
              <CreditCard className="h-5 w-5" style={{ color: "var(--theme-accent-primary)" }} />
              Payment Information
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p style={{ color: "var(--theme-text-muted)" }}>Payment Method</p>
                <p className="font-medium mt-1">{mockOrder.payment.method} ending in {mockOrder.payment.last4}</p>
              </div>
              <div>
                <p style={{ color: "var(--theme-text-muted)" }}>Transaction ID</p>
                <p className="font-medium mt-1 font-mono text-xs">{mockOrder.payment.providerId}</p>
              </div>
              <div>
                <p style={{ color: "var(--theme-text-muted)" }}>Payment Status</p>
                <p className="mt-1">
                  <span className="badge badge-success text-[10px] uppercase">
                    {mockOrder.payment.status}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          {/* Status Workflow */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="mb-4 text-lg font-bold flex items-center gap-2">
              <Clock className="h-5 w-5" style={{ color: "var(--theme-accent-primary)" }} />
              Order Status
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Update Status</label>
                <select
                  className="input-field"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {statuses.map(s => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <p className="text-sm font-medium mb-3">Workflow</p>
                <div className="space-y-3">
                  {statuses.slice(0, 5).map((s, i) => {
                    const currentIndex = statuses.findIndex(x => x.id === status);
                    const isCompleted = i <= currentIndex && status !== "cancelled";
                    
                    return (
                      <div key={s.id} className="flex items-center gap-3">
                        <div 
                          className="flex h-6 w-6 items-center justify-center rounded-full"
                          style={{ 
                            background: isCompleted ? "var(--theme-accent-primary)" : "rgba(255,255,255,0.06)",
                          }}
                        >
                          {isCompleted && <CheckCircle2 className="h-4 w-4 text-white" />}
                        </div>
                        <span className="text-sm" style={{ color: isCompleted ? "var(--theme-text-primary)" : "var(--theme-text-muted)" }}>
                          {s.label}
                        </span>
                      </div>
                    )
                  })}
                  {status === "cancelled" && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: "var(--color-danger)" }}>
                        <X className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm" style={{ color: "var(--color-danger)" }}>Cancelled</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Customer Info */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h2 className="mb-4 text-lg font-bold flex items-center gap-2">
              <User className="h-5 w-5" style={{ color: "var(--theme-accent-primary)" }} />
              Customer
            </h2>
            <div className="space-y-3 text-sm">
              <p className="font-medium">{mockOrder.customer.name}</p>
              <p style={{ color: "var(--theme-text-muted)" }}>{mockOrder.customer.email}</p>
              <p style={{ color: "var(--theme-text-muted)" }}>{mockOrder.customer.phone}</p>
            </div>

            <h3 className="mt-6 mb-3 text-sm font-bold flex items-center gap-2">
              <Truck className="h-4 w-4" style={{ color: "var(--theme-accent-primary)" }} />
              Shipping Address
            </h3>
            <div className="text-sm" style={{ color: "var(--theme-text-muted)" }}>
              <p>{mockOrder.shippingAddress.line1}</p>
              <p>{mockOrder.shippingAddress.line2}</p>
              <p>{mockOrder.shippingAddress.city}, {mockOrder.shippingAddress.state} {mockOrder.shippingAddress.pincode}</p>
              <p>{mockOrder.shippingAddress.country}</p>
            </div>
          </motion.div>

          {/* Tracking Details */}
          {(status === "shipped" || status === "delivered") && (
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="mb-4 text-lg font-bold">Tracking Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Carrier</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g., FedEx, BlueDart"
                    value={carrier}
                    onChange={(e) => setCarrier(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Tracking Number</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g., 1Z9999999999999999"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
