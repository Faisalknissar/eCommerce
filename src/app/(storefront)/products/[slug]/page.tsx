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
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { useUIStore } from "@/stores/ui-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { ProductImageZoom } from "@/components/storefront/product-image-zoom";
import { ProductReviews } from "@/components/storefront/product-reviews";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
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

  const scrollToReviews = () => {
    const element = document.getElementById("reviews");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="py-6 lg:py-8 mb-24">
      <div className="container-page">
        <motion.div
          className="mb-5 flex flex-wrap items-center gap-2 text-sm text-text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Link href="/" className="transition-colors hover:text-text-primary">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/products" className="transition-colors hover:text-text-primary">
            Products
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-text-secondary">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card relative aspect-square overflow-hidden rounded-2xl border-none p-0 bg-transparent shadow-none">
              <ProductImageZoom src={imageUrl} alt={product.name} />
              <div className="absolute left-4 top-4 z-20 rounded-full bg-black/55 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md text-white">
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
            className="flex flex-col gap-3 lg:gap-4"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge badge-accent">{product.category}</span>
              <span className="badge badge-success">{discount}% off</span>
              <span className="badge badge-info">In stock</span>
            </div>

            <div className="space-y-2">
              <h1 className="max-w-2xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl text-text-primary">
                {product.name}
              </h1>
              <p className="text-base leading-relaxed text-text-secondary">
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
                        ? "#ffa41c"
                        : "transparent"
                    }
                    style={{
                      color:
                        i < Math.floor(product.rating)
                          ? "#ffa41c"
                          : "var(--theme-text-muted)",
                    }}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold">{product.rating}</span>
              <button 
                onClick={scrollToReviews}
                className="text-sm text-text-muted transition-colors hover:text-[var(--theme-accent-primary)] hover:underline"
              >
                {product.reviewCount} reviews
              </button>
              <span className="text-sm text-text-muted/60">SKU {product.sku}</span>
            </div>

            <div className="rounded-lg border border-border bg-surface p-4">
              <div className="flex flex-wrap items-end gap-3">
                <span className="text-4xl font-black gradient-text">
                  {formatPrice(selectedVariant.price)}
                </span>
                <span className="pb-1 text-lg text-text-muted/60 line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              </div>
              <p className="mt-2 text-sm text-text-muted">
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
                <div className="flex items-center rounded-full border border-border bg-surface-elevated p-1">
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
                <span className="text-xs text-text-muted">
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
                    mounted && isWishlisted
                      ? "var(--theme-accent-tertiary)"
                      : "transparent"
                  }
                  style={{
                    color: mounted && isWishlisted
                      ? "var(--theme-accent-tertiary)"
                      : "currentColor",
                  }}
                />
              </motion.button>
            </div>

            <div className="mt-12 border-t border-border" />
            <div className="grid grid-cols-3 gap-3 pt-12 pb-8">
              {[
                { icon: Truck, label: "Free Shipping", sub: "Above INR 999" },
                { icon: Shield, label: "Secure Pay", sub: "Protected" },
                { icon: RotateCcw, label: "Easy Returns", sub: "7-day policy" },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="rounded-lg border border-border bg-surface p-3 text-center"
                >
                  <Icon className="mx-auto h-5 w-5 text-[var(--theme-accent-primary)]" />
                  <p className="mt-2 text-xs font-bold text-text-primary">{label}</p>
                  <p className="text-[10px] text-text-muted">{sub}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 border-t border-border" />
            <div className="pt-12">
              <h3 className="mb-3 text-lg font-bold text-text-primary">Key Features</h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--theme-accent-primary)]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <ProductReviews />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
