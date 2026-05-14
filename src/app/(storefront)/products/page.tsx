"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  LayoutList,
  Star,
  ShoppingBag,
  Heart,
  X,
  ChevronDown,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { useUIStore } from "@/stores/ui-store";
import { toast } from "sonner";

// Mock products for initial display
const mockProducts = [
  {
    id: "1",
    name: "Quantum Pro Wireless Headphones",
    slug: "quantum-pro-wireless-headphones",
    price: 12999,
    comparePrice: 18999,
    category: "Electronics",
    rating: 4.5,
    reviewCount: 128,
    productType: "physical",
    tag: "Best Seller",
    gradient: "from-purple-900/30 to-blue-900/30",
    imageUrl: "/images/products/quantum-pro-wireless-headphones.png",
  },
  {
    id: "2",
    name: "NeoVibe Smart Watch Ultra",
    slug: "neovibe-smart-watch-ultra",
    price: 24999,
    comparePrice: 34999,
    category: "Electronics",
    rating: 4.8,
    reviewCount: 95,
    productType: "physical",
    tag: "New",
    gradient: "from-cyan-900/30 to-teal-900/30",
    imageUrl: "/images/products/neovibe-smart-watch-ultra.png",
  },
  {
    id: "3",
    name: "Aether Premium Leather Jacket",
    slug: "aether-premium-leather-jacket",
    price: 15999,
    comparePrice: 22999,
    category: "Fashion",
    rating: 4.3,
    reviewCount: 67,
    productType: "physical",
    tag: "Trending",
    gradient: "from-pink-900/30 to-rose-900/30",
    imageUrl: "/images/products/aether-premium-leather-jacket.png",
  },
  {
    id: "4",
    name: "Full-Stack Development Masterclass",
    slug: "full-stack-development-masterclass",
    price: 4999,
    comparePrice: 12999,
    category: "Digital Products",
    rating: 4.9,
    reviewCount: 312,
    productType: "digital",
    tag: "62% Off",
    gradient: "from-amber-900/30 to-orange-900/30",
    imageUrl: "/images/products/full-stack-development-masterclass.png",
  },
  {
    id: "5",
    name: "Lumina Smart Home Hub Pro",
    slug: "lumina-smart-home-hub-pro",
    price: 8999,
    comparePrice: 12999,
    category: "Electronics",
    rating: 4.2,
    reviewCount: 43,
    productType: "physical",
    tag: "Sale",
    gradient: "from-green-900/30 to-emerald-900/30",
    imageUrl: "/images/products/lumina-smart-home-hub-pro.png",
  },
  {
    id: "6",
    name: "UI/UX Design Consultation",
    slug: "ui-ux-design-consultation",
    price: 2999,
    comparePrice: undefined,
    category: "Services",
    rating: 5.0,
    reviewCount: 28,
    productType: "service",
    tag: "Expert",
    gradient: "from-violet-900/30 to-purple-900/30",
    imageUrl: "/images/products/ui-ux-design-consultation.png",
  },
  {
    id: "7",
    name: "Zen Minimalist Desk Lamp",
    slug: "zen-minimalist-desk-lamp",
    price: 3499,
    comparePrice: 4999,
    category: "Home & Living",
    rating: 4.6,
    reviewCount: 82,
    productType: "physical",
    tag: null,
    gradient: "from-slate-900/30 to-gray-900/30",
    imageUrl: "/images/products/zen-minimalist-desk-lamp.png",
  },
  {
    id: "8",
    name: "ProFlex Yoga Mat Premium",
    slug: "proflex-yoga-mat-premium",
    price: 2499,
    comparePrice: 3499,
    category: "Sports & Fitness",
    rating: 4.4,
    reviewCount: 156,
    productType: "physical",
    tag: null,
    gradient: "from-red-900/30 to-orange-900/30",
    imageUrl: "/images/products/proflex-yoga-mat-premium.png",
  },
];

const categories = ["All", "Electronics", "Fashion", "Home & Living", "Digital Products", "Services", "Sports & Fitness"];
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const addToCart = useCartStore((s) => s.addItem);
  const setCartDrawerOpen = useUIStore((s) => s.setCartDrawerOpen);

  const handleQuickAdd = (product: (typeof mockProducts)[number]) => {
    addToCart({
      variantId: `${product.id}-default`,
      productId: product.id,
      productName: product.name,
      variantName: "Standard",
      price: product.price,
      comparePrice: product.comparePrice,
      quantity: 1,
      imageUrl: product.imageUrl,
      productType: product.productType,
      maxStock: 99,
    });
    setCartDrawerOpen(true);
    toast.success(`${product.name} added to cart`);
  };

  const filteredProducts = mockProducts
    .filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "rating": return b.rating - a.rating;
        case "newest": return 0;
        default: return 0;
      }
    });

  return (
    <div className="py-12">
      <div className="container-page">
        {/* Page Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--theme-font-heading)" }}>
            All <span className="gradient-text">Products</span>
          </h1>
          <p className="mt-2" style={{ color: "var(--theme-text-secondary)" }}>
            {filteredProducts.length} products found
          </p>
        </motion.div>

        {/* Toolbar */}
        <motion.div
          className="glass-card mb-12 flex flex-wrap items-center gap-4 p-4 sm:p-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--theme-text-muted)" }} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 py-2"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field appearance-none pr-8 py-2 min-w-[160px]"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none" style={{ color: "var(--theme-text-muted)" }} />
          </div>

          {/* View Toggle */}
          <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 transition-colors ${viewMode === "grid" ? "bg-white/10" : ""}`}
              aria-label="Grid view"
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 transition-colors ${viewMode === "list" ? "bg-white/10" : ""}`}
              aria-label="List view"
            >
              <LayoutList className="h-4 w-4" />
            </button>
          </div>

          {/* Filter Toggle (Mobile) */}
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-ghost p-2 sm:hidden"
            whileTap={{ scale: 0.9 }}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </motion.button>
        </motion.div>

        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Sidebar Filters (Desktop) */}
          <motion.aside
            className="hidden w-56 shrink-0 lg:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="glass-card p-6">
              <h3 className="mb-6 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--theme-text-secondary)" }}>
                Categories
              </h3>
              <div className="flex flex-col gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      selectedCategory === cat
                        ? "font-semibold"
                        : ""
                    }`}
                    style={{
                      background: selectedCategory === cat ? "rgba(139, 92, 246, 0.1)" : "transparent",
                      color: selectedCategory === cat ? "var(--theme-accent-primary)" : "var(--theme-text-secondary)",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>

          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                className="fixed inset-0 z-50 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="absolute inset-0 bg-black/60" onClick={() => setShowFilters(false)} />
                <motion.div
                  className="glass-strong absolute bottom-0 left-0 right-0 max-h-[60vh] rounded-t-2xl p-6"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 25 }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold">Filters</h3>
                    <button onClick={() => setShowFilters(false)}><X className="h-5 w-5" /></button>
                  </div>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => { setSelectedCategory(cat); setShowFilters(false); }}
                        className={`w-full rounded-lg px-4 py-3 text-left text-sm transition-colors ${
                          selectedCategory === cat ? "font-semibold" : ""
                        }`}
                        style={{
                          background: selectedCategory === cat ? "rgba(139, 92, 246, 0.1)" : "transparent",
                          color: selectedCategory === cat ? "var(--theme-accent-primary)" : "var(--theme-text-secondary)",
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-1">
            <motion.div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
                  : "flex flex-col gap-4"
              }
              layout
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link href={`/products/${product.slug}`}>
                      <motion.div
                        className={`glass-card group overflow-hidden p-0 ${
                          viewMode === "list" ? "flex flex-row" : ""
                        }`}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Image */}
                        <div
                          className={`relative overflow-hidden bg-gradient-to-br ${product.gradient} ${
                            viewMode === "list" ? "h-36 w-36 shrink-0 sm:h-40 sm:w-40" : "h-52"
                          }`}
                        >
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            sizes={viewMode === "list" ? "160px" : "(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                          <div className="hidden">
                            {product.productType === "digital" ? "💾" : product.productType === "service" ? "🎯" : "📦"}
                          </div>

                          {product.tag && (
                            <span
                              className="absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase text-white"
                              style={{
                                background: "linear-gradient(135deg, var(--theme-accent-primary), var(--theme-accent-tertiary))",
                              }}
                            >
                              {product.tag}
                            </span>
                          )}

                          {/* Quick Actions */}
                          <div className="absolute bottom-3 right-3 flex gap-1.5 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                            <motion.button
                              className="glass flex h-8 w-8 items-center justify-center rounded-full"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.preventDefault();
                                handleQuickAdd(product);
                              }}
                              aria-label={`Add ${product.name} to cart`}
                            >
                              <Heart className="h-3.5 w-3.5" />
                            </motion.button>
                            <motion.button
                              className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                              style={{ background: "var(--theme-accent-primary)" }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => e.preventDefault()}
                            >
                              <ShoppingBag className="h-3.5 w-3.5" />
                            </motion.button>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex flex-1 flex-col justify-between p-4">
                          <div>
                            <p className="mb-1 text-xs font-medium" style={{ color: "var(--theme-accent-primary)" }}>
                              {product.category}
                            </p>
                            <h3 className="text-sm font-semibold line-clamp-2 mb-2">
                              {product.name}
                            </h3>
                          </div>

                          <div>
                            {/* Rating */}
                            <div className="mb-2 flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, j) => (
                                <Star
                                  key={j}
                                  className="h-3 w-3"
                                  fill={j < Math.floor(product.rating) ? "var(--color-warning)" : "transparent"}
                                  style={{
                                    color: j < Math.floor(product.rating) ? "var(--color-warning)" : "var(--theme-text-muted)",
                                  }}
                                />
                              ))}
                              <span className="ml-1 text-xs" style={{ color: "var(--theme-text-muted)" }}>
                                ({product.reviewCount})
                              </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold gradient-text">
                                {formatPrice(product.price)}
                              </span>
                              {product.comparePrice && (
                                <span className="text-xs line-through" style={{ color: "var(--theme-text-muted)" }}>
                                  {formatPrice(product.comparePrice)}
                                </span>
                              )}
                              {product.comparePrice && (
                                <span className="badge badge-success text-[10px] py-0 px-1.5">
                                  {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% off
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <motion.div
                className="glass-card flex flex-col items-center justify-center py-16 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Search className="mb-4 h-12 w-12" style={{ color: "var(--theme-text-muted)" }} />
                <h3 className="text-lg font-semibold">No products found</h3>
                <p className="mt-1 text-sm" style={{ color: "var(--theme-text-muted)" }}>
                  Try adjusting your search or filters
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
