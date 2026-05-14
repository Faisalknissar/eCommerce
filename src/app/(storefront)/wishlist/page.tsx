"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((s) => s.addItem);

  const handleMoveToCart = (item: (typeof items)[0]) => {
    addToCart({
      variantId: `${item.productId}-default`,
      productId: item.productId,
      productName: item.productName,
      variantName: "Default",
      price: item.price,
      comparePrice: item.comparePrice,
      quantity: 1,
      imageUrl: item.imageUrl,
      productType: "physical",
      maxStock: 99,
    });
    removeItem(item.productId);
    toast.success(`${item.productName} moved to cart!`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="container-page">
          <motion.div
            className="glass-card flex flex-col items-center justify-center py-24 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Heart className="mb-4 h-16 w-16" style={{ color: "var(--theme-text-muted)" }} />
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--theme-font-heading)" }}
            >
              Your wishlist is empty
            </h2>
            <p className="mt-2 mb-6" style={{ color: "var(--theme-text-secondary)" }}>
              Save items you love for later
            </p>
            <Link href="/products">
              <motion.div
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Products
                  <ArrowRight className="h-4 w-4" />
                </span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-page">
        <motion.div
          className="mb-8 flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1
              className="text-3xl font-bold"
              style={{ fontFamily: "var(--theme-font-heading)" }}
            >
              My <span className="gradient-text">Wishlist</span>
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--theme-text-muted)" }}>
              {items.length} saved {items.length === 1 ? "item" : "items"}
            </p>
          </div>
          <motion.button
            className="btn-ghost text-sm"
            style={{ color: "var(--color-danger)" }}
            onClick={() => {
              clearWishlist();
              toast.info("Wishlist cleared");
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Clear All
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.div
                key={item.productId}
                className="glass-card overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: i * 0.03 }}
                layout
              >
                {/* Image */}
                <Link href={`/products/${item.slug}`}>
                  <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                    <span className="text-5xl opacity-60">📦</span>
                    {item.comparePrice && item.comparePrice > item.price && (
                      <span className="badge badge-success absolute top-3 left-3 text-[10px]">
                        {Math.round(((item.comparePrice - item.price) / item.comparePrice) * 100)}% OFF
                      </span>
                    )}
                  </div>
                </Link>

                {/* Info */}
                <div className="p-4 space-y-3">
                  <Link href={`/products/${item.slug}`}>
                    <h3 className="text-sm font-semibold line-clamp-2 hover:text-[var(--theme-accent-primary)] transition-colors">
                      {item.productName}
                    </h3>
                  </Link>

                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold gradient-text">
                      {formatPrice(item.price)}
                    </span>
                    {item.comparePrice && item.comparePrice > item.price && (
                      <span
                        className="text-xs line-through"
                        style={{ color: "var(--theme-text-muted)" }}
                      >
                        {formatPrice(item.comparePrice)}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <motion.button
                      className="btn-primary flex-1 py-2 text-xs"
                      onClick={() => handleMoveToCart(item)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-1.5">
                        <ShoppingBag className="h-3.5 w-3.5" />
                        Move to Cart
                      </span>
                    </motion.button>
                    <motion.button
                      className="btn-ghost p-2"
                      style={{ color: "var(--color-danger)" }}
                      onClick={() => {
                        removeItem(item.productId);
                        toast.info("Removed from wishlist");
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
