"use client";

import { motion } from "framer-motion";
import { Star, ShoppingBag, Heart, ChevronRight, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { toast } from "sonner";

// Mock product detail
const product = {
  id: "1",
  name: "Quantum Pro Wireless Headphones",
  slug: "quantum-pro-wireless-headphones",
  description: "Experience immersive audio with our flagship noise-cancelling wireless headphones. Featuring 40mm custom drivers, adaptive ANC, and 30-hour battery life. Designed for audiophiles who demand the best in comfort and sound quality.",
  shortDescription: "Premium noise-cancelling wireless headphones with 30-hour battery life",
  basePrice: 12999,
  comparePrice: 18999,
  category: "Electronics",
  productType: "physical",
  rating: 4.5,
  reviewCount: 128,
  sku: "QP-WH-001",
  tags: ["headphones", "wireless", "noise-cancelling", "bluetooth"],
  features: [
    "40mm Custom Dynamic Drivers",
    "Adaptive Active Noise Cancellation",
    "30-Hour Battery Life",
    "Bluetooth 5.3 with LDAC & aptX HD",
    "Multi-point Connection",
    "Hi-Res Audio Certified",
    "Foldable Design with Premium Carrying Case",
    "Touch Controls & Voice Assistant Support",
  ],
  variants: [
    { id: "v1", name: "Midnight Black", price: 12999, stock: 45, color: "#1a1a1a" },
    { id: "v2", name: "Arctic White", price: 12999, stock: 32, color: "#f0f0f0" },
    { id: "v3", name: "Cosmic Purple", price: 13999, stock: 18, color: "#7c3aed" },
  ],
};

export default function ProductDetailPage() {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((s) => s.addItem);
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({
      variantId: selectedVariant.id,
      productId: product.id,
      productName: product.name,
      variantName: selectedVariant.name,
      price: selectedVariant.price,
      comparePrice: product.comparePrice,
      quantity,
      imageUrl: `/images/products/${product.slug}.webp`,
      productType: product.productType,
      maxStock: selectedVariant.stock,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.info("Removed from wishlist");
    } else {
      addToWishlist({
        productId: product.id,
        productName: product.name,
        price: product.basePrice,
        comparePrice: product.comparePrice,
        imageUrl: `/images/products/${product.slug}.webp`,
        slug: product.slug,
      });
      toast.success("Added to wishlist!");
    }
  };

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - selectedVariant.price) / product.comparePrice) * 100)
    : 0;

  return (
    <div className="py-16">
      <div className="container-page">
        {/* Breadcrumbs */}
        <motion.div
          className="mb-10 flex items-center gap-2 text-sm"
          style={{ color: "var(--theme-text-muted)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/products" className="hover:text-white transition-colors">Products</Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: "var(--theme-text-secondary)" }}>{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900/30 to-blue-900/30">
              <div className="text-8xl opacity-40">🎧</div>
            </div>
            {/* Thumbnail strip */}
            <div className="mt-4 flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="glass-card flex h-20 w-20 cursor-pointer items-center justify-center text-2xl opacity-60 hover:opacity-100 transition-opacity"
                >
                  🎧
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category & Tags */}
            <div className="flex items-center gap-2">
              <span className="badge badge-accent">{product.category}</span>
              {discount > 0 && <span className="badge badge-success">{discount}% OFF</span>}
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl" style={{ fontFamily: "var(--theme-font-heading)" }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4"
                    fill={i < Math.floor(product.rating) ? "var(--color-warning)" : "transparent"}
                    style={{ color: i < Math.floor(product.rating) ? "var(--color-warning)" : "var(--theme-text-muted)" }}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm" style={{ color: "var(--theme-text-muted)" }}>({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold gradient-text">{formatPrice(selectedVariant.price)}</span>
              {product.comparePrice && (
                <span className="text-lg line-through" style={{ color: "var(--theme-text-muted)" }}>
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="leading-relaxed" style={{ color: "var(--theme-text-secondary)" }}>
              {product.description}
            </p>

            {/* Color Variants */}
            <div>
              <p className="mb-2 text-sm font-medium">Color: <span style={{ color: "var(--theme-accent-primary)" }}>{selectedVariant.name}</span></p>
              <div className="flex gap-3">
                {product.variants.map((variant) => (
                  <motion.button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className="relative h-10 w-10 rounded-full border-2 transition-all"
                    style={{
                      backgroundColor: variant.color,
                      borderColor: selectedVariant.id === variant.id ? "var(--theme-accent-primary)" : "rgba(255,255,255,0.1)",
                      boxShadow: selectedVariant.id === variant.id ? "0 0 10px rgba(139, 92, 246, 0.4)" : "none",
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={variant.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="mb-2 text-sm font-medium">Quantity</p>
              <div className="flex items-center gap-3">
                <div className="glass flex items-center rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="btn-ghost p-2.5"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedVariant.stock, quantity + 1))}
                    className="btn-ghost p-2.5"
                    disabled={quantity >= selectedVariant.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-xs" style={{ color: "var(--theme-text-muted)" }}>
                  {selectedVariant.stock} in stock
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <motion.button
                onClick={handleAddToCart}
                className="btn-primary flex-1 py-3.5 text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart
                </span>
              </motion.button>
              <motion.button
                onClick={handleWishlist}
                className="btn-secondary p-3.5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart
                  className="h-5 w-5"
                  fill={isWishlisted ? "var(--theme-accent-tertiary)" : "transparent"}
                  style={{ color: isWishlisted ? "var(--theme-accent-tertiary)" : "currentColor" }}
                />
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {[
                { icon: Truck, label: "Free Shipping", sub: "Above ₹999" },
                { icon: Shield, label: "Secure Payment", sub: "100% protected" },
                { icon: RotateCcw, label: "Easy Returns", sub: "7-day policy" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center gap-1 text-center">
                  <Icon className="h-5 w-5" style={{ color: "var(--theme-accent-primary)" }} />
                  <p className="text-xs font-medium">{label}</p>
                  <p className="text-[10px]" style={{ color: "var(--theme-text-muted)" }}>{sub}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="mb-3 text-lg font-bold">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "var(--theme-text-secondary)" }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "var(--theme-accent-primary)" }} />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
