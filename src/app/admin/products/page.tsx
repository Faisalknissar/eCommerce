"use client";

import { motion } from "framer-motion";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit2,
  Trash2,
  Eye,
  Package,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

const mockProducts = [
  { id: "1", name: "Quantum Pro Wireless Headphones", sku: "QP-WH-001", price: 12999, stock: 85, status: "published", category: "Electronics", type: "physical" },
  { id: "2", name: "NeoVibe Smart Watch Ultra", sku: "NV-SW-001", price: 24999, stock: 42, status: "published", category: "Electronics", type: "physical" },
  { id: "3", name: "Aether Premium Leather Jacket", sku: "AT-LJ-001", price: 15999, stock: 23, status: "published", category: "Fashion", type: "physical" },
  { id: "4", name: "Full-Stack Development Masterclass", sku: "FS-MC-001", price: 4999, stock: 999, status: "published", category: "Digital Products", type: "digital" },
  { id: "5", name: "Lumina Smart Home Hub Pro", sku: "LM-SH-001", price: 8999, stock: 56, status: "published", category: "Electronics", type: "physical" },
  { id: "6", name: "UI/UX Design Consultation", sku: "UX-CS-001", price: 2999, stock: 999, status: "published", category: "Services", type: "service" },
  { id: "7", name: "Zen Minimalist Desk Lamp", sku: "ZN-DL-001", price: 3499, stock: 67, status: "draft", category: "Home & Living", type: "physical" },
  { id: "8", name: "ProFlex Yoga Mat Premium", sku: "PF-YM-001", price: 2499, stock: 120, status: "published", category: "Sports & Fitness", type: "physical" },
];

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--theme-font-heading)" }}>Products</h1>
          <p className="text-sm" style={{ color: "var(--theme-text-secondary)" }}>{mockProducts.length} products total</p>
        </motion.div>
        <Link href="/admin/products/new">
          <motion.button
            className="btn-primary"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </span>
          </motion.button>
        </Link>
      </div>

      {/* Search & Filters */}
      <motion.div
        className="glass-card flex flex-wrap gap-3 p-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--theme-text-muted)" }} />
          <input type="text" placeholder="Search products..." className="input-field pl-10 py-2" />
        </div>
        <select className="input-field py-2 w-auto">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Home & Living</option>
        </select>
        <select className="input-field py-2 w-auto">
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
          <option>Archived</option>
        </select>
      </motion.div>

      {/* Table */}
      <motion.div
        className="glass-card overflow-hidden p-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <th className="px-4 py-3 text-left font-medium" style={{ color: "var(--theme-text-muted)" }}>Product</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: "var(--theme-text-muted)" }}>SKU</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: "var(--theme-text-muted)" }}>Price</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: "var(--theme-text-muted)" }}>Stock</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: "var(--theme-text-muted)" }}>Status</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: "var(--theme-text-muted)" }}>Type</th>
                <th className="px-4 py-3 text-right font-medium" style={{ color: "var(--theme-text-muted)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((product, i) => (
                <motion.tr
                  key={product.id}
                  className="border-b transition-colors hover:bg-white/[0.02]"
                  style={{ borderColor: "rgba(255,255,255,0.04)" }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-lg shrink-0"
                        style={{ background: "rgba(139, 92, 246, 0.1)" }}
                      >
                        {product.type === "digital" ? "💾" : product.type === "service" ? "🎯" : "📦"}
                      </div>
                      <div>
                        <p className="font-medium line-clamp-1">{product.name}</p>
                        <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--theme-text-secondary)" }}>{product.sku}</td>
                  <td className="px-4 py-3 font-medium">{formatPrice(product.price)}</td>
                  <td className="px-4 py-3">
                    <span style={{ color: product.stock < 30 ? "var(--color-warning)" : "var(--color-success)" }}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="badge text-[10px]"
                      style={{
                        background: product.status === "published" ? "rgba(34, 197, 94, 0.1)" : "rgba(245, 158, 11, 0.1)",
                        color: product.status === "published" ? "var(--color-success)" : "var(--color-warning)",
                        border: `1px solid ${product.status === "published" ? "rgba(34,197,94,0.2)" : "rgba(245,158,11,0.2)"}`,
                      }}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="badge badge-accent text-[10px]">{product.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="btn-ghost p-1.5 rounded-lg"><Eye className="h-3.5 w-3.5" /></button>
                      <button className="btn-ghost p-1.5 rounded-lg"><Edit2 className="h-3.5 w-3.5" /></button>
                      <button className="btn-ghost p-1.5 rounded-lg" style={{ color: "var(--color-danger)" }}><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>Showing 1-8 of 8 products</p>
          <div className="flex gap-1">
            <button className="btn-ghost px-3 py-1 text-xs rounded-lg" disabled>Previous</button>
            <button className="px-3 py-1 text-xs rounded-lg" style={{ background: "rgba(139, 92, 246, 0.15)", color: "var(--theme-accent-primary)" }}>1</button>
            <button className="btn-ghost px-3 py-1 text-xs rounded-lg" disabled>Next</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
