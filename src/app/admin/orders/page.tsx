"use client";

import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { Eye, Search, Filter } from "lucide-react";
import Link from "next/link";

const mockOrders = [
  { id: "ORD-2026-001", customer: "Rahul Sharma", email: "rahul@email.com", total: 12999, status: "delivered", items: 1, date: "2026-05-12", payment: "Razorpay" },
  { id: "ORD-2026-002", customer: "Priya Patel", email: "priya@email.com", total: 24999, status: "shipped", items: 1, date: "2026-05-12", payment: "Stripe" },
  { id: "ORD-2026-003", customer: "Amit Kumar", email: "amit@email.com", total: 4999, status: "processing", items: 2, date: "2026-05-11", payment: "UPI" },
  { id: "ORD-2026-004", customer: "Sneha Reddy", email: "sneha@email.com", total: 15999, status: "pending", items: 1, date: "2026-05-11", payment: "Stripe" },
  { id: "ORD-2026-005", customer: "Vikram Singh", email: "vikram@email.com", total: 8999, status: "confirmed", items: 3, date: "2026-05-10", payment: "Razorpay" },
  { id: "ORD-2026-006", customer: "Anjali Gupta", email: "anjali@email.com", total: 2999, status: "delivered", items: 1, date: "2026-05-10", payment: "UPI" },
];

const statusColors: Record<string, string> = {
  pending: "var(--color-warning)",
  confirmed: "var(--color-info)",
  processing: "var(--theme-accent-primary)",
  shipped: "var(--theme-accent-secondary)",
  delivered: "var(--color-success)",
  cancelled: "var(--color-danger)",
};

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--theme-font-heading)" }}>Orders</h1>
        <p className="text-sm" style={{ color: "var(--theme-text-secondary)" }}>{mockOrders.length} orders total</p>
      </motion.div>

      {/* Filters */}
      <motion.div className="glass-card flex flex-wrap gap-3 p-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--theme-text-muted)" }} />
          <input type="text" placeholder="Search orders..." className="input-field pl-10 py-2" />
        </div>
        <select className="input-field py-2 w-auto">
          <option>All Status</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </motion.div>

      {/* Table */}
      <motion.div className="glass-card overflow-hidden p-0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <th className="px-4 py-3 text-left font-medium" style={{ color: "var(--theme-text-muted)" }}>Order ID</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: "var(--theme-text-muted)" }}>Customer</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: "var(--theme-text-muted)" }}>Items</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: "var(--theme-text-muted)" }}>Total</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: "var(--theme-text-muted)" }}>Payment</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: "var(--theme-text-muted)" }}>Status</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: "var(--theme-text-muted)" }}>Date</th>
                <th className="px-4 py-3 text-right font-medium" style={{ color: "var(--theme-text-muted)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order, i) => (
                <motion.tr
                  key={order.id}
                  className="border-b transition-colors hover:bg-white/[0.02]"
                  style={{ borderColor: "rgba(255,255,255,0.04)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <td className="px-4 py-3 font-mono text-xs font-medium">{order.id}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>{order.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">{order.items}</td>
                  <td className="px-4 py-3 font-medium">{formatPrice(order.total)}</td>
                  <td className="px-4 py-3"><span className="badge badge-accent text-[10px]">{order.payment}</span></td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                      style={{
                        background: `color-mix(in srgb, ${statusColors[order.status]} 15%, transparent)`,
                        color: statusColors[order.status],
                      }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: statusColors[order.status] }} />
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: "var(--theme-text-muted)" }}>{order.date}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/orders/${order.id}`}>
                      <button className="btn-ghost p-1.5"><Eye className="h-4 w-4" /></button>
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
