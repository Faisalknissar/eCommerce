"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useUIStore } from "@/stores/ui-store";

const trendingSearches = [
  "Wireless headphones",
  "Smart watch",
  "Leather jacket",
  "Yoga mat",
  "Development course",
];

const quickResults = [
  { name: "Quantum Pro Headphones", slug: "quantum-pro-wireless-headphones", price: "₹12,999", category: "Electronics" },
  { name: "NeoVibe Smart Watch", slug: "neovibe-smart-watch-ultra", price: "₹24,999", category: "Electronics" },
  { name: "Aether Leather Jacket", slug: "aether-premium-leather-jacket", price: "₹15,999", category: "Fashion" },
  { name: "Full-Stack Masterclass", slug: "full-stack-development-masterclass", price: "₹4,999", category: "Digital" },
];

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useUIStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!searchOpen) {
      const timeout = window.setTimeout(() => setQuery(""), 0);
      return () => window.clearTimeout(timeout);
    }
  }, [searchOpen]);

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      }
      if (e.key === "Escape" && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [searchOpen, setSearchOpen]);

  const filtered = query
    ? quickResults.filter((r) =>
        r.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-[200]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />

          {/* Search Panel */}
          <motion.div
            className="relative mx-auto mt-20 max-w-2xl px-4"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="glass-strong overflow-hidden rounded-2xl">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-surface-elevated">
                <Search className="h-5 w-5 shrink-0" style={{ color: "var(--theme-accent-primary)" }} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, categories..."
                  className="flex-1 bg-transparent text-base outline-none placeholder:text-[var(--theme-text-muted)]"
                />
                <kbd className="hidden rounded-md px-2 py-0.5 text-xs font-mono sm:block bg-surface border border-border" style={{ color: "var(--theme-text-muted)" }}>
                  ESC
                </kbd>
                <button onClick={() => setSearchOpen(false)}>
                  <X className="h-5 w-5" style={{ color: "var(--theme-text-muted)" }} />
                </button>
              </div>

              <div className="max-h-[400px] overflow-y-auto p-3">
                {query ? (
                  <>
                    {filtered.length > 0 ? (
                      <div className="space-y-1">
                        {filtered.map((item) => (
                          <Link
                            key={item.slug}
                            href={`/products/${item.slug}`}
                            onClick={() => setSearchOpen(false)}
                          >
                            <div className="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-secondary">
                              <div>
                                <p className="text-sm font-medium">{item.name}</p>
                                <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>
                                  {item.category}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold gradient-text">{item.price}</span>
                                <ArrowRight className="h-3.5 w-3.5" style={{ color: "var(--theme-text-muted)" }} />
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <Search className="mx-auto mb-2 h-8 w-8" style={{ color: "var(--theme-text-muted)" }} />
                        <p className="text-sm" style={{ color: "var(--theme-text-muted)" }}>
                          No results for &ldquo;{query}&rdquo;
                        </p>
                      </div>
                    )}
                    <Link
                      href={`/products?q=${encodeURIComponent(query)}`}
                      onClick={() => setSearchOpen(false)}
                      className="mt-2 flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
                      style={{ color: "var(--theme-accent-primary)" }}
                    >
                      View all results for &ldquo;{query}&rdquo;
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </>
                ) : (
                  <>
                    {/* Trending */}
                    <div className="mb-4">
                      <p className="mb-2 flex items-center gap-1.5 px-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--theme-text-muted)" }}>
                        <TrendingUp className="h-3 w-3" />
                        Trending Searches
                      </p>
                      <div className="space-y-0.5">
                        {trendingSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary"
                          >
                            <Clock className="h-3.5 w-3.5" style={{ color: "var(--theme-text-muted)" }} />
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
