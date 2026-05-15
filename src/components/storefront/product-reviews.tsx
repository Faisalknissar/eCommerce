"use client";

import { Star, ThumbsUp, MessageSquare, ShieldCheck, User, Camera } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  location: string;
}

const reviews: Review[] = [
  {
    id: "r1",
    user: "Manvi",
    rating: 5,
    date: "29 April 2026",
    title: "Good quality",
    comment: "Experience immersive audio with flagship noise-cancelling wireless headphones. Easy to plug and use.",
    verified: true,
    location: "India",
  },
  {
    id: "r2",
    user: "YOGESH KUMAR CHHOKER",
    rating: 4,
    date: "3 May 2026",
    title: "Ok",
    comment: "Good product. Decent battery life and comfortable for long hours.",
    verified: true,
    location: "India",
  },
  {
    id: "r3",
    user: "m",
    rating: 1,
    date: "10 May 2026",
    title: "USELESS. not as shown in image.",
    comment: "The build quality feels cheap and the connection drops frequently. Not worth the premium price.",
    verified: false,
    location: "Global",
  },
];

const ratingStats = [
  { stars: 5, percentage: 67 },
  { stars: 4, percentage: 28 },
  { stars: 3, percentage: 0 },
  { stars: 2, percentage: 0 },
  { stars: 1, percentage: 5 },
];

export function ProductReviews() {
  return (
    <section id="reviews" className="border-t border-border pt-16">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[320px_1fr]">
        {/* Left Column: Summary */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Customer reviews</h2>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="h-5 w-5"
                    fill={i <= 4 ? "#ffa41c" : "transparent"}
                    style={{ color: i <= 4 ? "#ffa41c" : "var(--theme-text-muted)" }}
                  />
                ))}
              </div>
              <span className="text-lg font-bold">4.5 out of 5</span>
            </div>
            <p className="mt-2 text-sm text-text-muted">12 global ratings</p>
          </div>

          <div className="space-y-3">
            {ratingStats.map((stat) => (
              <div key={stat.stars} className="group flex items-center gap-4 text-sm cursor-default">
                <span className="w-10 text-text-secondary hover:text-[var(--theme-accent-primary)] transition-colors">
                  {stat.stars} star
                </span>
                <div className="relative h-5 flex-1 overflow-hidden rounded-sm bg-surface-elevated">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stat.percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 bg-[#ffa41c]"
                  />
                </div>
                <span className="w-8 text-right text-text-muted">{stat.percentage}%</span>
              </div>
            ))}
          </div>

          <div className="pt-6">
            <h3 className="text-lg font-bold text-text-primary">Review this product</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Share your thoughts with other customers
            </p>
            <Link 
              href="#/review" 
              className="btn-secondary mt-4 w-full justify-center rounded-full py-3 bg-surface border-border-muted hover:border-[var(--theme-accent-primary)] hover:bg-surface-elevated shadow-sm"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = window.location.pathname + "/review";
              }}
            >
              Write a product review
            </Link>
          </div>
        </div>

        {/* Right Column: Reviews List */}
        <div className="space-y-10">
          <div>
            <h2 className="text-xl font-bold text-text-primary">Top reviews from India</h2>
          </div>

          <div className="divide-y divide-border">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="py-8 first:pt-0"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-elevated text-text-muted">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">{review.user}</span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="h-4 w-4"
                        fill={i <= review.rating ? "#ffa41c" : "transparent"}
                        style={{ color: i <= review.rating ? "#ffa41c" : "var(--theme-text-muted)" }}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-text-primary">{review.title}</span>
                </div>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-text-muted mb-4">
                  <span>Reviewed in {review.location} on {review.date}</span>
                  {review.verified && (
                    <>
                      <span className="h-3 w-px bg-border" />
                      <span className="font-bold text-[#c45500]">Verified Purchase</span>
                    </>
                  )}
                </div>

                <p className="text-sm leading-relaxed text-text-secondary mb-6">
                  {review.comment}
                </p>

                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-1.5 text-sm font-medium transition-colors hover:bg-surface-elevated">
                    Helpful
                  </button>
                  <span className="h-4 w-px bg-border" />
                  <button className="text-sm text-text-muted hover:text-text-primary transition-colors">
                    Report
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
