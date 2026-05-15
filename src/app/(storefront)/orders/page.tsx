"use client";

import { motion } from "framer-motion";
import { ArrowRight, Package, Search, Truck } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

const orders = [
  {
    id: "ORD-2026-A1B2C",
    date: "2026-05-10",
    total: 12999,
    status: "Delivered",
    items: "Quantum Pro Wireless Headphones",
  },
  {
    id: "ORD-2026-D3E4F",
    date: "2026-05-08",
    total: 24999,
    status: "Shipped",
    items: "NeoVibe Smart Watch Ultra",
  },
  {
    id: "ORD-2026-G5H6I",
    date: "2026-05-01",
    total: 4999,
    status: "Processing",
    items: "Full-Stack Development Masterclass",
  },
];

export default function OrdersPage() {
  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="container-page">
        <motion.div
          className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              My <span className="gradient-text">Orders</span>
            </h1>
            <p className="mt-2 text-text-muted">
              Track purchases, invoices, delivery status, and support actions.
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
            <input
              className="input-field pl-11"
              placeholder="Search orders"
              aria-label="Search orders"
            />
          </div>
        </motion.div>

        <div className="space-y-4">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              className="glass-card overflow-hidden p-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={`/orders/${order.id}`}
                className="grid gap-5 p-5 transition-colors hover:bg-white/[0.03] md:grid-cols-[1fr_auto_auto]"
              >
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[var(--theme-accent-primary)]/12 text-[var(--theme-accent-primary)]">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white/45">
                      {order.id}
                    </p>
                    <h2 className="mt-1 text-lg font-bold">{order.items}</h2>
                    <p className="mt-1 text-sm text-white/45">
                      Placed on{" "}
                      {new Date(order.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:justify-end">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-success)]/20 bg-[var(--color-success)]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-success)]">
                    <Truck className="h-3.5 w-3.5" />
                    {order.status}
                  </span>
                  <span className="text-lg font-black">
                    {formatPrice(order.total)}
                  </span>
                </div>

                <div className="flex items-center text-sm font-bold text-[var(--theme-accent-primary)]">
                  View details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
