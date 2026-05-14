"use client";

import { motion } from "framer-motion";
import {
  ChevronRight,
  CreditCard,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Shield,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { useUIStore } from "@/stores/ui-store";
import { useWishlistStore } from "@/stores/wishlist-store";

const product = {
  id: "1",
  name: "Quantum Pro Wireless Headphones",
  slug: "quantum-pro-wireless-headphones",
  description:
    "Experience immersive audio with flagship noise-cancelling wireless headphones, custom 40mm drivers, adaptive ANC, and 30-hour battery life.",
  basePrice: 12999,
  comparePrice: 18999,
  category: "Electronics",
  productType: "physical",
  rating: 4.5,
  reviewCount: 128,
  sku: "QP-WH-001",
  features: [
    "40mm custom dynamic drivers",
    "Adaptive active noise cancellation",
    "30-hour battery life",
    "Bluetooth 5.3 with LDAC and aptX HD",
    "Premium carry case included",
  ],
  variants: [
    { id: "v1", name: "Midnight Black", price: 12999, stock: 45, color: "#1a1a1a" },
    { id: "v2", name: "Arctic White", price: 12999, stock: 32, color: "#f0f0f0" },
    { id: "v3", name: "Cosmic Purple", price: 13999, stock: 18, color: "#7c3aed" },
  ],
};

export default function ProductDetailPage() {
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((s) => s.addItem);
  const setCartDrawerOpen = useUIStore((s) => s.setCartDrawerOpen);
  const {
    addItem: addToWishlist,
    isInWishlist,
    removeItem: removeFromWishlist,
  } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const imageUrl = `/images/products/${product.slug}.png`;
  const discount = Math.round(
    ((product.comparePrice - selectedVariant.price) / product.comparePrice) * 100
  );

  const handleAddToCart = () => {
    addToCart({
      variantId: selectedVariant.id,
      productId: product.id,
      productName: product.name,
      variantName: selectedVariant.name,
      price: selectedVariant.price,
      comparePrice: product.comparePrice,
      quantity,
      imageUrl,
      productType: product.productType,
      maxStock: selectedVariant.stock,
    });
    setCartDrawerOpen(true);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    addToCart({
      variantId: selectedVariant.id,
      productId: product.id,
      productName: product.name,
      variantName: selectedVariant.name,
      price: selectedVariant.price,
      comparePrice: product.comparePrice,
      quantity,
      imageUrl,
      productType: product.productType,
      maxStock: selectedVariant.stock,
    });
    router.push("/checkout");
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.info("Removed from wishlist");
      return;
    }

    addToWishlist({
      productId: product.id,
      productName: product.name,
      price: product.basePrice,
      comparePrice: product.comparePrice,
      imageUrl,
      slug: product.slug,
    });
    toast.success("Added to wishlist");
  };

  return (
    <div className="py-10 lg:py-16">
      <div className="container-page">
        <motion.div
          className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/45"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/products" className="transition-colors hover:text-white">
            Products
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white/70">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card relative aspect-square overflow-hidden p-0">
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                Premium pick
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="glass-card relative aspect-square cursor-pointer overflow-hidden p-0 opacity-70 transition-opacity hover:opacity-100"
                >
                  <Image
                    src={imageUrl}
                    alt={`${product.name} view ${item}`}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge badge-accent">{product.category}</span>
              <span className="badge badge-success">{discount}% off</span>
              <span className="badge badge-info">In stock</span>
            </div>

            <div>
              <h1 className="max-w-2xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                {product.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-white/65">
                {product.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4"
                    fill={
                      i < Math.floor(product.rating)
                        ? "var(--color-warning)"
                        : "transparent"
                    }
                    style={{
                      color:
                        i < Math.floor(product.rating)
                          ? "var(--color-warning)"
                          : "var(--theme-text-muted)",
                    }}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold">{product.rating}</span>
              <span className="text-sm text-white/45">
                {product.reviewCount} reviews
              </span>
              <span className="text-sm text-white/30">SKU {product.sku}</span>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-wrap items-end gap-3">
                <span className="text-4xl font-black gradient-text">
                  {formatPrice(selectedVariant.price)}
                </span>
                <span className="pb-1 text-lg text-white/35 line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              </div>
              <p className="mt-2 text-sm text-white/45">
                Inclusive of taxes. Free delivery on eligible orders.
              </p>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium">
                Color:{" "}
                <span className="text-[var(--theme-accent-primary)]">
                  {selectedVariant.name}
                </span>
              </p>
              <div className="flex gap-3">
                {product.variants.map((variant) => (
                  <motion.button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className="relative h-11 w-11 rounded-full border-2 transition-all"
                    style={{
                      backgroundColor: variant.color,
                      borderColor:
                        selectedVariant.id === variant.id
                          ? "var(--theme-accent-primary)"
                          : "rgba(255,255,255,0.16)",
                      boxShadow:
                        selectedVariant.id === variant.id
                          ? "0 0 0 4px rgba(139, 92, 246, 0.16)"
                          : "none",
                    }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={variant.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium">Quantity</p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center rounded-full border border-white/10 bg-black/20 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="btn-ghost rounded-full p-2.5"
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(selectedVariant.stock, quantity + 1))
                    }
                    className="btn-ghost rounded-full p-2.5"
                    disabled={quantity >= selectedVariant.stock}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-xs text-white/45">
                  {selectedVariant.stock} units available
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_auto]">
              <motion.button
                onClick={handleAddToCart}
                className="btn-primary py-4 text-base"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart
                </span>
              </motion.button>
              <motion.button
                onClick={handleBuyNow}
                className="btn-secondary h-full px-6 py-4 text-base"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
              >
                <CreditCard className="h-5 w-5" />
                Buy Now
              </motion.button>
              <motion.button
                onClick={handleWishlist}
                className="btn-secondary px-5 py-4"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                aria-label="Toggle wishlist"
              >
                <Heart
                  className="h-5 w-5"
                  fill={
                    isWishlisted
                      ? "var(--theme-accent-tertiary)"
                      : "transparent"
                  }
                  style={{
                    color: isWishlisted
                      ? "var(--theme-accent-tertiary)"
                      : "currentColor",
                  }}
                />
              </motion.button>
            </div>

            <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
              {[
                { icon: Truck, label: "Free Shipping", sub: "Above INR 999" },
                { icon: Shield, label: "Secure Pay", sub: "Protected" },
                { icon: RotateCcw, label: "Easy Returns", sub: "7-day policy" },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-center"
                >
                  <Icon className="mx-auto h-5 w-5 text-[var(--theme-accent-primary)]" />
                  <p className="mt-2 text-xs font-bold">{label}</p>
                  <p className="text-[10px] text-white/40">{sub}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-5">
              <h3 className="mb-3 text-lg font-bold">Key Features</h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-white/65"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--theme-accent-primary)]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
