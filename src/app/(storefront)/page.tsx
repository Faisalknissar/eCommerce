"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Truck,
  Star,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";
import { useRef } from "react";

// ---- Hero Section ----
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 -left-32 h-96 w-96 rounded-full opacity-20 blur-[120px]"
          style={{ background: "var(--theme-accent-primary)" }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 h-80 w-80 rounded-full opacity-15 blur-[100px]"
          style={{ background: "var(--theme-accent-secondary)" }}
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full opacity-10 blur-[80px]"
          style={{ background: "var(--theme-accent-tertiary)" }}
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern" />

        {/* Radial fade */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 0%, var(--theme-bg-primary) 80%)`,
          }}
        />
      </div>

      <motion.div className="container-page relative z-10 flex flex-col items-center" style={{ y, opacity }}>
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: "rgba(139, 92, 246, 0.1)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--theme-accent-primary)" }} />
            <span className="text-xs font-semibold" style={{ color: "var(--theme-accent-primary)" }}>
              NEW COLLECTION 2026
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="mb-6 text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--theme-font-heading)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover the{" "}
            <span className="gradient-text">Future</span>
            <br />
            of Shopping
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mx-auto mb-8 max-w-2xl text-base sm:text-lg"
            style={{ color: "var(--theme-text-secondary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Premium products, seamless experience. From cutting-edge electronics to handcrafted fashion —
            curated for those who demand excellence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link href="/products">
              <motion.div
                className="btn-primary group px-8 py-3.5 text-base"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Explore Products
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.div>
            </Link>
            <Link href="/products?featured=true">
              <motion.div
                className="btn-secondary px-8 py-3.5 text-base"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Collections
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {[
              { value: "50K+", label: "Happy Customers" },
              { value: "10K+", label: "Products" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold sm:text-3xl gradient-text">{stat.value}</p>
                <p className="mt-1 text-xs sm:text-sm" style={{ color: "var(--theme-text-muted)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div
          className="h-10 w-6 rounded-full border-2 flex items-start justify-center pt-2 border-border"
        >
          <motion.div
            className="h-2 w-1 rounded-full"
            style={{ background: "var(--theme-accent-primary)" }}
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

// ---- Features Section ----
function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed with edge caching and instant page loads.",
      color: "var(--theme-accent-secondary)",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Enterprise-grade security with Stripe, Razorpay, and UPI support.",
      color: "var(--theme-accent-primary)",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Complimentary delivery on orders above ₹999. Track in real-time.",
      color: "var(--color-success)",
    },
    {
      icon: Star,
      title: "Premium Quality",
      description: "Every product is handpicked and quality-verified by our experts.",
      color: "var(--theme-accent-tertiary)",
    },
  ];

  return (
    <section className="py-24">
      <div className="container-page">
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="glass-card group p-6"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                style={{ background: `color-mix(in srgb, ${feature.color} 15%, transparent)` }}
              >
                <feature.icon className="h-6 w-6" style={{ color: feature.color }} />
              </div>
              <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--theme-text-secondary)" }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---- Categories Bento Grid ----
function CategoriesSection() {
  const categories = [
    { name: "Electronics", slug: "electronics", emoji: "⚡", gradient: "from-purple-600/20 to-blue-600/20", count: "2.4K+" },
    { name: "Fashion", slug: "fashion", emoji: "👗", gradient: "from-pink-600/20 to-rose-600/20", count: "1.8K+" },
    { name: "Home & Living", slug: "home-living", emoji: "🏡", gradient: "from-green-600/20 to-emerald-600/20", count: "950+" },
    { name: "Digital Products", slug: "digital-products", emoji: "💾", gradient: "from-cyan-600/20 to-teal-600/20", count: "540+" },
    { name: "Services", slug: "services", emoji: "🎯", gradient: "from-amber-600/20 to-orange-600/20", count: "320+" },
    { name: "Sports & Fitness", slug: "sports-fitness", emoji: "🏋️", gradient: "from-red-600/20 to-orange-600/20", count: "780+" },
  ];

  return (
    <section className="py-24">
      <div className="container-page">
        {/* Section Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-3 text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--theme-font-heading)" }}>
            Shop by <span className="gradient-text">Category</span>
          </h2>
          <p className="text-base" style={{ color: "var(--theme-text-secondary)" }}>
            Browse our curated collections across every category
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.4 }}
              className={i === 0 || i === 5 ? "sm:col-span-1 lg:col-span-1" : ""}
            >
              <Link href={`/products?category=${cat.slug}`}>
                <motion.div
                  className={`glass-card group relative flex h-40 flex-col justify-between overflow-hidden p-5 sm:h-48 bg-gradient-to-br ${cat.gradient}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div>
                    <span className="text-3xl sm:text-4xl">{cat.emoji}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold sm:text-lg">{cat.name}</h3>
                    <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>
                      {cat.count} products
                    </p>
                  </div>
                  <motion.div
                    className="absolute right-4 top-4 rounded-full p-2 opacity-0 transition-opacity group-hover:opacity-100 bg-surface-elevated"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---- Featured Products ----
function FeaturedProductsSection() {
  const products = [
    {
      name: "Quantum Pro Headphones",
      price: "₹12,999",
      comparePrice: "₹18,999",
      slug: "quantum-pro-wireless-headphones",
      tag: "Best Seller",
      gradient: "from-purple-900/30 to-blue-900/30",
    },
    {
      name: "NeoVibe Smart Watch",
      price: "₹24,999",
      comparePrice: "₹34,999",
      slug: "neovibe-smart-watch-ultra",
      tag: "New",
      gradient: "from-cyan-900/30 to-teal-900/30",
    },
    {
      name: "Aether Leather Jacket",
      price: "₹15,999",
      comparePrice: "₹22,999",
      slug: "aether-premium-leather-jacket",
      tag: "Trending",
      gradient: "from-pink-900/30 to-rose-900/30",
    },
    {
      name: "Full-Stack Masterclass",
      price: "₹4,999",
      comparePrice: "₹12,999",
      slug: "full-stack-development-masterclass",
      tag: "62% Off",
      gradient: "from-amber-900/30 to-orange-900/30",
    },
  ];

  return (
    <section className="py-24" style={{ background: "var(--theme-bg-secondary)" }}>
      <div className="container-page">
        {/* Section Header */}
        <motion.div
          className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="mb-2 text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--theme-font-heading)" }}>
              Featured <span className="gradient-text">Products</span>
            </h2>
            <p style={{ color: "var(--theme-text-secondary)" }}>
              Handpicked products for you
            </p>
          </div>
          <Link href="/products?featured=true">
            <motion.div
              className="btn-secondary group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View All
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.div>
          </Link>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {products.map((product) => (
            <motion.div
              key={product.slug}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <Link href={`/products/${product.slug}`}>
                <motion.div
                  className="glass-card group overflow-hidden p-0"
                  whileHover={{ y: -5 }}
                >
                  {/* Product Image Placeholder */}
                  <div
                    className={`relative flex h-56 items-center justify-center bg-gradient-to-br ${product.gradient}`}
                  >
                    <div className="text-6xl opacity-30">📦</div>

                    {/* Tag */}
                    <div
                      className="absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
                      style={{
                        background: "linear-gradient(135deg, var(--theme-accent-primary), var(--theme-accent-tertiary))",
                      }}
                    >
                      {product.tag}
                    </div>

                    {/* Quick Actions */}
                    <motion.div
                      className="absolute bottom-3 right-3 flex gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                    >
                      <motion.button
                        className="glass flex h-9 w-9 items-center justify-center rounded-full"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ShoppingBag className="h-4 w-4" />
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="mb-1 text-sm font-semibold line-clamp-1 transition-colors group-hover:text-text-primary">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold gradient-text">
                        {product.price}
                      </span>
                      {product.comparePrice && (
                        <span
                          className="text-sm line-through"
                          style={{ color: "var(--theme-text-muted)" }}
                        >
                          {product.comparePrice}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3"
                          fill={i < 4 ? "var(--color-warning)" : "transparent"}
                          style={{
                            color: i < 4 ? "var(--color-warning)" : "var(--theme-text-muted)",
                          }}
                        />
                      ))}
                      <span className="ml-1 text-xs" style={{ color: "var(--theme-text-muted)" }}>
                        (128)
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---- CTA Banner ----
function CTASection() {
  return (
    <section className="py-24">
      <div className="container-page">
        <motion.div
          className="glass-card relative overflow-hidden p-8 sm:p-12 md:p-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Background gradient */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: "linear-gradient(135deg, var(--theme-accent-primary), var(--theme-accent-secondary))",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at top right, transparent 30%, var(--theme-bg-primary) 80%)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <motion.div
              className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-surface-elevated border border-border"
            >
              <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--theme-accent-secondary)" }} />
              <span className="text-xs font-semibold">LIMITED TIME OFFER</span>
            </motion.div>

            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl" style={{ fontFamily: "var(--theme-font-heading)" }}>
              Get <span className="gradient-text">10% Off</span> Your First Order
            </h2>
            <p className="mb-8" style={{ color: "var(--theme-text-secondary)" }}>
              Use code <span className="font-mono font-bold" style={{ color: "var(--theme-accent-secondary)" }}>WELCOME10</span> at checkout.
              Valid for new customers only.
            </p>
            <Link href="/products">
              <motion.div
                className="btn-primary inline-flex px-8 py-3.5 text-base"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Shopping
                  <ArrowRight className="h-4 w-4" />
                </span>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---- Main Home Page ----
export default function HomePage() {
  return (
    <div className="relative">
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <CTASection />
    </div>
  );
}
