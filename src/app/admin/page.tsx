"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Eye,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

// ---- Mock Data ----
const revenueData = [
  { month: "Jan", revenue: 42000, orders: 85 },
  { month: "Feb", revenue: 55000, orders: 110 },
  { month: "Mar", revenue: 48000, orders: 96 },
  { month: "Apr", revenue: 71000, orders: 142 },
  { month: "May", revenue: 63000, orders: 126 },
  { month: "Jun", revenue: 89000, orders: 178 },
  { month: "Jul", revenue: 95000, orders: 190 },
  { month: "Aug", revenue: 87000, orders: 174 },
  { month: "Sep", revenue: 102000, orders: 204 },
  { month: "Oct", revenue: 118000, orders: 236 },
  { month: "Nov", revenue: 135000, orders: 270 },
  { month: "Dec", revenue: 145000, orders: 290 },
];

const categoryData = [
  { name: "Electronics", sales: 4500 },
  { name: "Fashion", sales: 3200 },
  { name: "Home", sales: 2100 },
  { name: "Digital", sales: 1800 },
  { name: "Sports", sales: 1500 },
  { name: "Services", sales: 900 },
];

const recentOrders = [
  { id: "ORD-2026-001", customer: "Rahul Sharma", total: 12999, status: "delivered", date: "2026-05-12" },
  { id: "ORD-2026-002", customer: "Priya Patel", total: 24999, status: "shipped", date: "2026-05-12" },
  { id: "ORD-2026-003", customer: "Amit Kumar", total: 4999, status: "processing", date: "2026-05-11" },
  { id: "ORD-2026-004", customer: "Sneha Reddy", total: 15999, status: "pending", date: "2026-05-11" },
  { id: "ORD-2026-005", customer: "Vikram Singh", total: 8999, status: "confirmed", date: "2026-05-10" },
];

const statusColors: Record<string, string> = {
  pending: "var(--color-warning)",
  confirmed: "var(--color-info)",
  processing: "var(--theme-accent-primary)",
  shipped: "var(--theme-accent-secondary)",
  delivered: "var(--color-success)",
  cancelled: "var(--color-danger)",
};

// ---- Stat Card ----
function StatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color,
  delay,
}: {
  title: string;
  value: string;
  change: string;
  changeType: "up" | "down";
  icon: React.ComponentType<{ className?: string, style?: React.CSSProperties }>;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      className="glass-card p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--theme-text-muted)" }}>
            {title}
          </p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
          <div className="mt-1 flex items-center gap-1">
            {changeType === "up" ? (
              <TrendingUp className="h-3 w-3" style={{ color: "var(--color-success)" }} />
            ) : (
              <TrendingDown className="h-3 w-3" style={{ color: "var(--color-danger)" }} />
            )}
            <span
              className="text-xs font-medium"
              style={{ color: changeType === "up" ? "var(--color-success)" : "var(--color-danger)" }}
            >
              {change}
            </span>
            <span className="text-xs" style={{ color: "var(--theme-text-muted)" }}>vs last month</span>
          </div>
        </div>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: `color-mix(in srgb, ${color} 15%, transparent)` }}
        >
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
      </div>
    </motion.div>
  );
}

// ---- Custom Tooltip ----
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload) return null;
  return (
    <div className="glass-strong rounded-lg p-3 text-sm">
      <p className="font-semibold">{label}</p>
      <p style={{ color: "var(--theme-accent-primary)" }}>
        Revenue: {formatPrice(payload[0]?.value ?? 0)}
      </p>
      {payload[1] && (
        <p style={{ color: "var(--theme-accent-secondary)" }}>
          Orders: {payload[1].value}
        </p>
      )}
    </div>
  );
}

// ---- Main Dashboard ----
export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold sm:text-3xl" style={{ fontFamily: "var(--theme-font-heading)" }}>
          Dashboard
        </h1>
        <p className="mt-1" style={{ color: "var(--theme-text-secondary)" }}>
          Welcome back! Here&apos;s your store overview.
        </p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatPrice(1050000)}
          change="+23.5%"
          changeType="up"
          icon={DollarSign}
          color="var(--theme-accent-primary)"
          delay={0.1}
        />
        <StatCard
          title="Total Orders"
          value="2,890"
          change="+18.2%"
          changeType="up"
          icon={ShoppingCart}
          color="var(--theme-accent-secondary)"
          delay={0.15}
        />
        <StatCard
          title="Active Customers"
          value="12,540"
          change="+12.8%"
          changeType="up"
          icon={Users}
          color="var(--color-success)"
          delay={0.2}
        />
        <StatCard
          title="Total Products"
          value="1,856"
          change="+4.1%"
          changeType="up"
          icon={Package}
          color="var(--theme-accent-tertiary)"
          delay={0.25}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Revenue Chart */}
        <motion.div
          className="glass-card p-5 xl:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Revenue Overview</h3>
              <p className="text-sm" style={{ color: "var(--theme-text-muted)" }}>Monthly revenue for 2026</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full" style={{ background: "var(--theme-accent-primary)" }} />
                Revenue
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full" style={{ background: "var(--theme-accent-secondary)" }} />
                Orders
              </div>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(262, 100%, 65%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(262, 100%, 65%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(262, 100%, 65%)" fill="url(#colorRevenue)" strokeWidth={2} />
                <Area type="monotone" dataKey="orders" stroke="hsl(180, 100%, 50%)" fill="transparent" strokeWidth={1.5} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Category Sales Chart */}
        <motion.div
          className="glass-card p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h3 className="mb-4 text-lg font-bold">Sales by Category</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={11} width={70} />
                <Bar dataKey="sales" fill="hsl(262, 100%, 65%)" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        className="glass-card p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">Recent Orders</h3>
          <Link href="/admin/orders" className="btn-ghost text-sm gap-1" style={{ color: "var(--theme-accent-primary)" }}>
            View All <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <th className="pb-3 text-left font-medium" style={{ color: "var(--theme-text-muted)" }}>Order ID</th>
                <th className="pb-3 text-left font-medium" style={{ color: "var(--theme-text-muted)" }}>Customer</th>
                <th className="pb-3 text-left font-medium" style={{ color: "var(--theme-text-muted)" }}>Amount</th>
                <th className="pb-3 text-left font-medium" style={{ color: "var(--theme-text-muted)" }}>Status</th>
                <th className="pb-3 text-left font-medium" style={{ color: "var(--theme-text-muted)" }}>Date</th>
                <th className="pb-3 text-right font-medium" style={{ color: "var(--theme-text-muted)" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b transition-colors hover:bg-white/[0.02]" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                  <td className="py-3 font-medium font-mono text-xs">{order.id}</td>
                  <td className="py-3">{order.customer}</td>
                  <td className="py-3 font-medium">{formatPrice(order.total)}</td>
                  <td className="py-3">
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
                  <td className="py-3 text-sm" style={{ color: "var(--theme-text-muted)" }}>{order.date}</td>
                  <td className="py-3 text-right">
                    <button className="btn-ghost p-1.5">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
