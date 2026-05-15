"use client";

import { motion } from "framer-motion";
import { Star, Camera, Send } from "lucide-react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// Mock product data (matching the main page for consistency)
const product = {
  name: "Quantum Pro Wireless Headphones",
  slug: "quantum-pro-wireless-headphones",
};

export default function ReviewPage() {
  const router = useRouter();
  const params = useParams();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Review submitted successfully!");
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  const imageUrl = `/images/products/${product.slug}.png`;

  return (
    <div className="min-h-screen bg-bg-primary py-10">
      <div className="container-page max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card overflow-hidden p-0"
        >
          {/* Centered Title Row */}
          <div className="border-b border-border bg-surface-elevated/20 py-5 text-center">
            <h1 className="text-xl font-bold tracking-widest text-text-primary uppercase">Create Review</h1>
          </div>

          <div className="border-b border-border p-6 bg-surface-muted/50">
            <div className="flex items-center gap-6">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-white p-1">
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-text-muted mb-1">How was the item?</p>
                <h2 className="text-lg font-bold text-text-primary line-clamp-2">{product.name}</h2>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-16">
            {/* Star Rating */}
            <div>
              <h3 className="mb-4 text-lg font-bold">Overall rating</h3>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    key={i}
                    type="button"
                    className="transition-transform hover:scale-110 active:scale-95"
                    onMouseEnter={() => setHoverRating(i)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(i)}
                  >
                    <Star
                      className="h-10 w-10"
                      fill={(hoverRating || rating) >= i ? "#ffa41c" : "transparent"}
                      style={{ 
                        color: (hoverRating || rating) >= i ? "#ffa41c" : "var(--theme-text-muted)",
                        opacity: hoverRating && hoverRating < i ? 0.5 : 1
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Content */}
            <div className="space-y-14">
              <div className="pt-4">
                <label className="mb-2 block text-sm font-bold text-text-primary">
                  Write a review
                </label>
                <textarea
                  required
                  placeholder="What should other customers know?"
                  className="input-field min-h-[100px] resize-none py-4"
                />
              </div>

              <div className="pt-8">
                <label className="mb-4 block text-sm font-bold text-text-primary">
                  Share a video or photo
                </label>
                <div className="group relative flex h-32 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface-elevated/30 transition-colors hover:border-[var(--theme-accent-primary)] hover:bg-surface-elevated/50">
                  <div className="flex flex-col items-center gap-2 text-text-muted group-hover:text-[var(--theme-accent-primary)]">
                    <div className="rounded-full bg-surface-elevated p-3 shadow-sm">
                      <Camera className="h-6 w-6" />
                    </div>
                    <p className="text-xs font-medium">Your video could be the first. Imagine that...</p>
                  </div>
                  <input type="file" className="absolute inset-0 cursor-pointer opacity-0" accept="image/*,video/*" />
                </div>
              </div>

              <div className="pt-8">
                <label className="mb-4 block text-sm font-bold text-text-primary">
                  Title your review <span className="text-xs font-normal text-text-muted">(required)</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="What's most important to know?"
                  className="input-field"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 border-t border-border pt-8">
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary px-8"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary px-10 py-3"
              >
                <Send className="h-4 w-4" />
                Submit
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
