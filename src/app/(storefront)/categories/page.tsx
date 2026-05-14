"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const categories = [
  { name: "Electronics", count: 42, icon: "🔌", gradient: "from-blue-600/20 to-purple-600/20" },
  { name: "Fashion", count: 28, icon: "👕", gradient: "from-pink-600/20 to-rose-600/20" },
  { name: "Home & Living", count: 15, icon: "🏠", gradient: "from-amber-600/20 to-orange-600/20" },
  { name: "Digital Products", count: 12, icon: "💾", gradient: "from-emerald-600/20 to-teal-600/20" },
  { name: "Services", count: 8, icon: "🎯", gradient: "from-violet-600/20 to-purple-600/20" },
  { name: "Sports & Fitness", count: 10, icon: "🏃", gradient: "from-red-600/20 to-orange-600/20" },
];

export default function CategoriesPage() {
  return (
    <div className="py-16">
      <div className="container-page">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold" style={{ fontFamily: "var(--theme-font-heading)" }}>
            Browse <span className="gradient-text">Categories</span>
          </h1>
          <p className="mt-2" style={{ color: "var(--theme-text-secondary)" }}>
            Explore our curated collections across all departments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/products?category=${encodeURIComponent(cat.name)}`}>
                <motion.div
                  className={`glass-card group overflow-hidden bg-gradient-to-br ${cat.gradient} p-8`}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-4xl">{cat.icon}</span>
                      <h3 className="mt-4 text-xl font-bold">{cat.name}</h3>
                      <p className="mt-1 text-sm text-white/60">{cat.count} Products</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-white/10">
                      <ChevronRight className="h-6 w-6" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
