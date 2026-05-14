"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Package,
  LayoutDashboard,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useUIStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";
import { APP_NAME, NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  const { data: session } = useSession();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { mobileMenuOpen, setMobileMenuOpen, setSearchOpen, setCartDrawerOpen } = useUIStore();
  const cartItemCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const userRole = (session?.user as Record<string, unknown>)?.role as string | undefined;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
          scrolled || mobileMenuOpen
            ? "glass-strong shadow-lg"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-page">
          <nav className="flex h-16 items-center justify-between gap-4 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <motion.div
                className="relative flex items-center justify-center h-9 w-9 rounded-lg"
                style={{
                  background: "linear-gradient(135deg, var(--theme-accent-primary), var(--theme-accent-secondary))",
                }}
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg font-black text-white">N</span>
              </motion.div>
              <span className="hidden text-xl font-bold sm:block" style={{ fontFamily: "var(--theme-font-heading)" }}>
                {APP_NAME}
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="btn-ghost relative px-4 py-2 text-sm font-medium"
                >
                  <motion.span whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                    {link.label}
                  </motion.span>
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Search */}
              <motion.button
                onClick={() => setSearchOpen(true)}
                className="btn-ghost relative p-2.5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Search products"
              >
                <Search className="h-5 w-5" />
              </motion.button>

              {/* Wishlist */}
              <Link href="/wishlist">
                <motion.div
                  className="btn-ghost relative p-2.5"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="h-5 w-5" />
                  {mounted && wishlistCount > 0 && (
                    <motion.span
                      className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{ background: "var(--theme-accent-tertiary)" }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </motion.div>
              </Link>

              <div className="relative">
                <motion.button
                  onClick={() => setCartDrawerOpen(true)}
                  className="btn-ghost relative p-2.5"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Open cart"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {mounted && cartItemCount > 0 && (
                    <motion.span
                      className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{ background: "var(--theme-accent-primary)" }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      {cartItemCount}
                    </motion.span>
                  )}
                </motion.button>
              </div>

              {/* User Menu */}
              {session?.user ? (
                <div className="relative">
                  <motion.button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="btn-ghost flex items-center gap-2 p-2.5"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ background: "linear-gradient(135deg, var(--theme-accent-primary), var(--theme-accent-tertiary))" }}
                    >
                      {session.user.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <ChevronDown className="hidden h-3.5 w-3.5 sm:block" />
                  </motion.button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setUserMenuOpen(false)}
                        />
                        <motion.div
                          className="glass-strong absolute right-0 top-full mt-2 z-50 w-56 overflow-hidden rounded-xl p-1"
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="border-b border-white/5 px-3 py-2 mb-1">
                            <p className="text-sm font-semibold truncate">{session.user.name}</p>
                            <p className="text-xs truncate" style={{ color: "var(--theme-text-muted)" }}>
                              {session.user.email}
                            </p>
                          </div>

                          {(userRole === "admin" || userRole === "manager") && (
                            <Link
                              href="/admin"
                              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-white/5 transition-colors"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <LayoutDashboard className="h-4 w-4" style={{ color: "var(--theme-accent-primary)" }} />
                              Admin Dashboard
                            </Link>
                          )}

                          <Link
                            href="/account"
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-white/5 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <User className="h-4 w-4" />
                            My Account
                          </Link>

                          <Link
                            href="/orders"
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-white/5 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <Package className="h-4 w-4" />
                            My Orders
                          </Link>

                          <div className="border-t border-white/5 mt-1 pt-1">
                            <button
                              onClick={() => {
                                setUserMenuOpen(false);
                                signOut();
                              }}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-white/5 transition-colors"
                              style={{ color: "var(--color-danger)" }}
                            >
                              <LogOut className="h-4 w-4" />
                              Sign Out
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/login">
                  <motion.div
                    className="btn-primary px-4 py-2 text-sm whitespace-nowrap"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Sign In</span>
                  </motion.div>
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <motion.button
                className="btn-ghost p-2.5 md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </motion.button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-x-0 top-16 bottom-0 z-[99] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="glass-strong relative mx-4 mt-2 rounded-tl-none rounded-tr-none rounded-bl-2xl rounded-br-2xl p-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="block rounded-lg px-4 py-3 text-base font-medium hover:bg-white/5 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
