"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Save, UploadCloud, Plus, X, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productType, setProductType] = useState("physical");

  // Basic Form State (Mocked for UI purposes)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    comparePrice: "",
    sku: "",
    stock: "",
    category: "all",
    status: "draft",
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Product created successfully!");
      router.push("/admin/products");
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
              href="/admin/products"
              className="flex items-center gap-1 text-sm text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
          </div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--theme-font-heading)" }}>
            Add New Product
          </h1>
        </motion.div>
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button className="btn-secondary" onClick={() => router.push("/admin/products")}>
            Cancel
          </button>
          <button
            className="btn-primary"
            onClick={handleSave}
            disabled={isSubmitting}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Save className="h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Product"}
            </span>
          </button>
        </motion.div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* General Information */}
          <motion.div
            className="glass-card p-6 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-lg font-bold">General Information</h2>
            
            <div>
              <label className="mb-1.5 block text-sm font-medium">Product Name</label>
              <input
                type="text"
                required
                className="input-field"
                placeholder="e.g., Wireless Noise-Cancelling Headphones"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div>
              <label className="mb-1.5 block text-sm font-medium">Description</label>
              <textarea
                rows={5}
                className="input-field resize-y"
                placeholder="Describe the product details, features, and specifications..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>
          </motion.div>

          {/* Media */}
          <motion.div
            className="glass-card p-6 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h2 className="text-lg font-bold">Media</h2>
            <div
              className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition-colors"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                style={{ background: "rgba(139, 92, 246, 0.1)" }}
              >
                <UploadCloud className="h-8 w-8" style={{ color: "var(--theme-accent-primary)" }} />
              </div>
              <p className="mb-1 font-medium">Click to upload or drag and drop</p>
              <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>
                SVG, PNG, JPG or GIF (max. 5MB)
              </p>
              <button type="button" className="btn-secondary mt-4 py-1.5 text-xs">
                Browse Files
              </button>
            </div>
          </motion.div>

          {/* Pricing & Inventory */}
          <motion.div
            className="glass-card p-6 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-bold">Pricing & Inventory</h2>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Price (₹)</label>
                <input
                  type="number"
                  required
                  className="input-field"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Compare-at Price (₹)</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="0.00"
                  value={formData.comparePrice}
                  onChange={(e) => setFormData({ ...formData, comparePrice: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">SKU</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g., WH-001"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Stock Quantity</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Organization */}
          <motion.div
            className="glass-card p-6 space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-lg font-bold">Organization</h2>
            
            <div>
              <label className="mb-1.5 block text-sm font-medium">Status</label>
              <select
                className="input-field"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Product Type</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "physical", label: "Physical", icon: "📦" },
                  { id: "digital", label: "Digital", icon: "💾" },
                  { id: "service", label: "Service", icon: "🎯" },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setProductType(type.id)}
                    className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-3 transition-colors"
                    style={{
                      borderColor: productType === type.id ? "var(--theme-accent-primary)" : "rgba(255,255,255,0.06)",
                      background: productType === type.id ? "rgba(139, 92, 246, 0.1)" : "rgba(255,255,255,0.02)",
                    }}
                  >
                    <span className="text-xl">{type.icon}</span>
                    <span className="text-[10px] font-medium uppercase tracking-wider">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Category</label>
              <select
                className="input-field"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="all">Uncategorized</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home & Living</option>
                <option value="digital">Digital Products</option>
                <option value="services">Services</option>
              </select>
            </div>
            
            <div>
              <label className="mb-1.5 block text-sm font-medium">Tags</label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g., Summer, Sale, New"
              />
            </div>
          </motion.div>

          {/* Variants Summary */}
          <motion.div
            className="glass-card p-6 space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Variants</h2>
              <button type="button" className="btn-ghost p-1">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm" style={{ color: "var(--theme-text-muted)" }}>
              Add variations of this product like size or color.
            </p>
            <button type="button" className="w-full rounded-lg border border-dashed p-3 text-sm font-medium transition-colors hover:bg-white/5" style={{ borderColor: "rgba(255,255,255,0.2)", color: "var(--theme-text-secondary)" }}>
              + Add options like size or color
            </button>
          </motion.div>
        </div>
      </form>
    </div>
  );
}
