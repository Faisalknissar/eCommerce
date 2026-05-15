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
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[95vh] overflow-hidden flex items-center justify-center py-24">
      {/* Immersive Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10" 
             style={{ background: "radial-gradient(circle at 15% 25%, var(--theme-accent-primary), transparent 45%), radial-gradient(circle at 85% 75%, var(--theme-accent-secondary), transparent 45%)" }} />
        <motion.div 
          className="absolute -top-[20%] -left-[10%] h-[70%] w-[70%] rounded-full opacity-[0.08] blur-[140px]"
          style={{ background: "var(--theme-accent-primary)" }}
          animate={{ x: [0, 70, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute -bottom-[20%] -right-[10%] h-[70%] w-[70%] rounded-full opacity-[0.08] blur-[140px]"
          style={{ background: "var(--theme-accent-secondary)" }}
          animate={{ x: [0, -70, 0], y: [0, -40, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
      </div>

      <motion.div
        className="container-page relative z-10"
        style={{ y, opacity }}
      >
        <div className="mx-auto max-w-6xl text-center">
          {/* Enhanced Badge */}
          <motion.div
            className="mb-10 inline-flex items-center gap-3 rounded-full px-6 py-2.5 bg-surface-elevated/40 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex h-2 w-2 rounded-full bg-accent-primary animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
              The Collection — 2026 Edition
            </span>
          </motion.div>

          {/* Cinematic Title */}
          <motion.h1
            className="mb-10 text-7xl font-black leading-[0.9] sm:text-[10rem] tracking-tighter text-white"
            style={{ fontFamily: "var(--theme-font-heading)" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Design the <br />
            <span className="gradient-text italic">Extraordinary</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mx-auto mb-14 max-w-3xl text-xl sm:text-2xl font-medium leading-relaxed text-white/50"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Elevate your existence with curated masterpieces. We combine high-performance 
            technology with timeless aesthetics for the modern visionary.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col items-center justify-center gap-8 sm:flex-row"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Link href="/products">
              <motion.div
                className="btn-primary h-18 px-12 text-sm font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(var(--theme-accent-primary-rgb),0.3)]"
                whileHover={{ scale: 1.05, boxShadow: "0 30px 60px rgba(var(--theme-accent-primary-rgb),0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                Start Exploring
                <ArrowRight className="ml-4 h-5 w-5" />
              </motion.div>
            </Link>
            <Link href="/products?featured=true">
              <motion.div
                className="h-18 px-12 flex items-center justify-center text-sm font-black uppercase tracking-[0.2em] text-white border border-white/10 rounded-full bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Lookbook
              </motion.div>
            </Link>
          </motion.div>

          {/* Floating Glass Stats */}
          <motion.div
            className="mt-32 grid grid-cols-1 sm:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            {[
              { value: "50K+", label: "Elite Members" },
              { value: "10K+", label: "Masterpieces" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                className="glass-card group p-10 bg-white/[0.01] border-white/5 hover:bg-white/[0.03] transition-all"
                whileHover={{ y: -15, scale: 1.02 }}
              >
                <p className="text-5xl font-black gradient-text mb-3">{stat.value}</p>
                <p className="text-xs font-black uppercase tracking-[0.3em] opacity-40 text-white">
                  {stat.label}
                </p>
                <div className="mx-auto mt-6 h-1 w-0 bg-accent-primary transition-all duration-700 group-hover:w-16" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator (Kept as requested) */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="h-12 w-7 rounded-full border-2 flex items-start justify-center pt-2.5 border-white/10 backdrop-blur-md">
          <motion.div 
            className="h-2.5 w-1.5 rounded-full bg-accent-primary"
            animate={{ y: [0, 15, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
      description: "Optimized for speed",
      color: "var(--theme-accent-secondary)",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Stripe & Razorpay",
      color: "var(--theme-accent-primary)",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders above ₹999",
      color: "var(--color-success)",
    },
    {
      icon: Star,
      title: "Premium Quality",
      description: "Handpicked products",
      color: "var(--theme-accent-tertiary)",
    },
  ];

  return (
    <section className="relative z-20 w-full min-h-[12vh] border-y border-white/5 bg-surface-elevated/90 backdrop-blur-3xl flex items-center">
      <div className="mx-auto w-full max-w-[1920px]">
        <motion.div
          className="flex flex-col divide-y divide-white/5 sm:flex-row sm:divide-x sm:divide-y-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="group relative flex flex-1 items-center justify-center gap-6 py-12 px-8 transition-all duration-500 hover:bg-white/[0.04]"
            >
              {/* Subtle Ambient Glow */}
              <div 
                className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-10 pointer-events-none"
                style={{ 
                  background: `radial-gradient(circle at center, ${feature.color}, transparent 70%)` 
                }}
              />

              <div
                className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 shadow-2xl"
                style={{ 
                  background: `linear-gradient(135deg, color-mix(in srgb, ${feature.color} 30%, transparent), color-mix(in srgb, ${feature.color} 10%, transparent))`,
                  boxShadow: `0 8px 30px -8px ${feature.color}66`,
                  border: `1px solid color-mix(in srgb, ${feature.color} 30%, transparent)`
                }}
              >
                <feature.icon className="h-7 w-7 filter drop-shadow-lg" style={{ color: feature.color }} />
              </div>
              <div className="relative">
                <h3 className="text-base font-black tracking-tight mb-1 uppercase italic">{feature.title}</h3>
                <p className="text-[10px] font-semibold leading-tight tracking-wide opacity-50 uppercase" style={{ color: "var(--theme-text-secondary)" }}>
                  {feature.description}
                </p>
              </div>

              {/* Decorative Corner Accent */}
              <div 
                className="absolute top-0 right-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                style={{ background: `linear-gradient(to right, transparent, ${feature.color}44)` }}
              />
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
    {
      name: "Electronics",
      slug: "electronics",
      count: "2.4K+",
      image: "/images/categories/electronics.png",
      span: "lg:col-span-2 lg:row-span-2",
      color: "from-blue-600/20 to-cyan-600/20",
    },
    {
      name: "Fashion",
      slug: "fashion",
      count: "1.8K+",
      image: "/images/categories/fashion.png",
      span: "lg:col-span-1 lg:row-span-2",
      color: "from-purple-600/20 to-pink-600/20",
    },
    {
      name: "Home & Living",
      slug: "home-living",
      count: "950+",
      image: "/images/categories/home.png",
      span: "lg:col-span-1 lg:row-span-1",
      color: "from-orange-600/20 to-yellow-600/20",
    },
    {
      name: "Sports & Fitness",
      slug: "sports-fitness",
      count: "780+",
      image: "/images/categories/sports.png",
      span: "lg:col-span-1 lg:row-span-1",
      color: "from-green-600/20 to-emerald-600/20",
    },
    {
      name: "Digital Products",
      slug: "digital-products",
      count: "540+",
      image: "/images/categories/digital.png",
      span: "lg:col-span-1 lg:row-span-1",
      color: "from-indigo-600/20 to-violet-600/20",
    },
    {
      name: "Services",
      slug: "services",
      count: "320+",
      image: "/images/categories/services.png",
      span: "lg:col-span-1 lg:row-span-1",
      color: "from-rose-600/20 to-red-600/20",
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-black/50">
      <div className="container-page relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="mb-4 inline-block text-xs font-black uppercase tracking-[0.3em] text-accent-primary"
            initial={{ letterSpacing: "0.1em" }}
            whileInView={{ letterSpacing: "0.3em" }}
            transition={{ duration: 1 }}
          >
            Explore Collections
          </motion.span>
          <h2 className="mb-6 text-5xl font-black sm:text-7xl" style={{ fontFamily: "var(--theme-font-heading)" }}>
            Shop by <span className="gradient-text italic">Category</span>
          </h2>
          <div className="mx-auto h-1 w-20 bg-gradient-to-r from-accent-primary to-accent-secondary" />
        </motion.div>

        {/* Modern Bento Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 lg:gap-6 h-auto lg:h-[900px]">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              className={`group relative overflow-hidden rounded-[2.5rem] bg-surface-elevated transition-all duration-700 ${cat.span}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={`/products?category=${cat.slug}`} className="block h-full w-full">
                {/* Background Image with Zoom Effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Modern Overlays */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-90 bg-gradient-to-br ${cat.color}`} />
                </div>

                {/* Content Overlay */}
                <div className="relative z-20 flex h-full flex-col justify-end p-8 sm:p-10">
                  <motion.div
                    className="translate-y-4 transition-transform duration-500 group-hover:translate-y-0"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="h-[1px] w-8 bg-accent-primary transition-all duration-500 group-hover:w-12" />
                      <span className="text-xs font-black uppercase tracking-widest text-accent-primary">
                        {cat.count} Products
                      </span>
                    </div>
                    <h3 className="text-3xl font-black text-white sm:text-4xl tracking-tighter transition-all duration-500 group-hover:tracking-normal group-hover:scale-105 origin-left">
                      {cat.name}
                    </h3>
                  </motion.div>

                  {/* Glass Action Button */}
                  <div className="mt-6 flex items-center gap-4 opacity-0 transition-all duration-500 group-hover:mt-8 group-hover:opacity-100">
                    <span className="text-sm font-bold uppercase tracking-widest text-white">View Collection</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-transform hover:scale-110">
                      <ChevronRight className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Animated Inner Glow */}
                <div className="absolute inset-0 border-[1px] border-white/0 transition-all duration-700 group-hover:border-white/10 rounded-[2.5rem] pointer-events-none" />
              </Link>
            </motion.div>
          ))}
        </div>
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
      image: "/images/products/featured_headphone.png",
      color: "from-blue-600/20 to-purple-600/20",
    },
    {
      name: "NeoVibe Smart Watch",
      price: "₹24,999",
      comparePrice: "₹34,999",
      slug: "neovibe-smart-watch-ultra",
      tag: "New Arrival",
      image: "/images/categories/electronics.png",
      color: "from-cyan-600/20 to-teal-600/20",
    },
    {
      name: "Aether Leather Jacket",
      price: "₹15,999",
      comparePrice: "₹22,999",
      slug: "aether-premium-leather-jacket",
      tag: "Trending",
      image: "/images/categories/fashion.png",
      color: "from-pink-600/20 to-rose-600/20",
    },
    {
      name: "Full-Stack Masterclass",
      price: "₹4,999",
      comparePrice: "₹12,999",
      slug: "full-stack-development-masterclass",
      tag: "Save 62%",
      image: "/images/categories/digital.png",
      color: "from-indigo-600/20 to-violet-600/20",
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-surface-elevated/50">
      <div className="container-page">
        {/* Section Header */}
        <motion.div
          className="mb-20 flex flex-col items-end justify-between gap-8 sm:flex-row"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="max-w-xl">
            <motion.div
              className="mb-4 inline-block rounded-full bg-accent-primary/10 px-4 py-1 text-xs font-black uppercase tracking-widest text-accent-primary"
            >
              Top Picks
            </motion.div>
            <h2 className="mb-4 text-5xl font-black sm:text-6xl" style={{ fontFamily: "var(--theme-font-heading)" }}>
              Featured <span className="gradient-text">Products</span>
            </h2>
            <p className="text-lg" style={{ color: "var(--theme-text-secondary)" }}>
              Experience the pinnacle of design and performance with our handpicked collection.
            </p>
          </div>
          <Link href="/products">
            <motion.div
              className="btn-primary group h-14 px-8 text-sm font-black uppercase tracking-widest"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Collection
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
            </motion.div>
          </Link>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={`/products/${product.slug}`} className="group block">
                <div className="relative mb-6 overflow-hidden rounded-[2rem] bg-surface-elevated aspect-[4/5] shadow-xl transition-all duration-700 group-hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] group-hover:-translate-y-2">
                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-30 transition-opacity duration-700 group-hover:opacity-50`} />
                  
                  {/* Product Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Badges */}
                  <div className="absolute left-6 top-6">
                    <div className="rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white border border-white/20">
                      {product.tag}
                    </div>
                  </div>

                  {/* Quick View Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="h-16 w-16 flex items-center justify-center rounded-full bg-white text-black shadow-2xl transition-transform hover:scale-110">
                      <ShoppingBag className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                {/* Product Meta */}
                <div className="px-2">
                  <h3 className="mb-2 text-xl font-black tracking-tight group-hover:text-accent-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black gradient-text">{product.price}</span>
                      {product.comparePrice && (
                        <span className="text-sm font-medium line-through opacity-40">
                          {product.comparePrice}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-bold opacity-60">4.9</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- CTA Banner ----
function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Hyper-Glow Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-0 left-0 h-full w-full opacity-20"
             style={{ background: "radial-gradient(circle at 20% 50%, var(--theme-accent-primary), transparent 50%), radial-gradient(circle at 80% 50%, var(--theme-accent-secondary), transparent 50%)" }} />
      </div>

      <div className="container-page relative z-10">
        <motion.div
          className="relative overflow-hidden rounded-[3rem] p-12 sm:p-20 border border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-surface-elevated/40 backdrop-blur-3xl" />
          
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <motion.div
              className="mb-8 inline-flex items-center gap-2 rounded-full px-6 py-2 bg-white/5 border border-white/10 backdrop-blur-md"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="h-4 w-4 text-accent-primary" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white">Unleash the Potential</span>
            </motion.div>

            <h2 className="mb-8 text-5xl font-black sm:text-7xl leading-none text-white tracking-tighter" style={{ fontFamily: "var(--theme-font-heading)" }}>
              Get <span className="gradient-text italic">10% OFF</span> Your<br className="hidden sm:block" /> First Masterpiece
            </h2>
            
            <p className="mb-12 text-lg sm:text-xl font-medium text-white/60 mx-auto max-w-2xl">
              Join the future of luxury shopping. Use code <span className="text-white font-black">WELCOME10</span> at checkout to unlock your exclusive advantage.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/products">
                <motion.div
                  className="btn-primary h-16 px-10 text-sm font-black uppercase tracking-widest"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Shopping
                  <ArrowRight className="ml-3 h-5 w-5" />
                </motion.div>
              </Link>
              <button className="h-16 px-10 text-sm font-black uppercase tracking-widest text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { HeroBannerSlider } from "@/components/storefront/hero-banner-slider";

// ---- Main Home Page ----
export default function HomePage() {
  return (
    <div className="relative">
      <HeroBannerSlider />
      <FeaturesSection />
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <CTASection />
    </div>
  );
}
