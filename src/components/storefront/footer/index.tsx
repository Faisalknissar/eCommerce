"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowUpRight, Heart } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/products" },
    { label: "New Arrivals", href: "/products?sort=newest" },
    { label: "Best Sellers", href: "/products?sort=popular" },
    { label: "Offers & Deals", href: "/products?sale=true" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faq" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns & Refunds", href: "/returns" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden">
      {/* Gradient top border */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, var(--theme-accent-primary), var(--theme-accent-secondary), transparent)" }} />

      <div
        className="relative"
        style={{ background: "var(--theme-bg-secondary)" }}
      >
        {/* Background grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        <div className="container-page relative py-24">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand Column */}
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-2">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, var(--theme-accent-primary), var(--theme-accent-secondary))",
                  }}
                >
                  <span className="text-xl font-black text-white">N</span>
                </div>
                <span className="text-xl font-bold" style={{ fontFamily: "var(--theme-font-heading)" }}>
                  {APP_NAME}
                </span>
              </Link>
              <p className="text-sm leading-relaxed" style={{ color: "var(--theme-text-secondary)" }}>
                Premium e-commerce platform delivering exceptional products and experiences. Built for the future.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm" style={{ color: "var(--theme-text-muted)" }}>
                  <Mail className="h-4 w-4 shrink-0" style={{ color: "var(--theme-accent-primary)" }} />
                  hello@nexstore.com
                </div>
                <div className="flex items-center gap-3 text-sm" style={{ color: "var(--theme-text-muted)" }}>
                  <Phone className="h-4 w-4 shrink-0" style={{ color: "var(--theme-accent-primary)" }} />
                  +91 9876 543 210
                </div>
                <div className="flex items-center gap-3 text-sm" style={{ color: "var(--theme-text-muted)" }}>
                  <MapPin className="h-4 w-4 shrink-0" style={{ color: "var(--theme-accent-primary)" }} />
                  Mumbai, India
                </div>
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--theme-text-secondary)" }}>
                Shop
              </h3>
              <ul className="flex flex-col gap-4">
                {footerLinks.shop.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-sm transition-colors hover:text-white"
                      style={{ color: "var(--theme-text-muted)" }}
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--theme-text-secondary)" }}>
                Support
              </h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-sm transition-colors hover:text-white"
                      style={{ color: "var(--theme-text-muted)" }}
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--theme-text-secondary)" }}>
                Stay Updated
              </h3>
              <p className="mb-4 text-sm" style={{ color: "var(--theme-text-muted)" }}>
                Subscribe to get notified about new products and exclusive offers.
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="input-field flex-1"
                  aria-label="Email for newsletter"
                />
                <motion.button
                  type="submit"
                  className="btn-primary shrink-0 px-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Subscribe</span>
                </motion.button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className="mt-24 flex flex-col items-center justify-between gap-6 border-t pt-16 sm:flex-row"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>
              © {currentYear} {APP_NAME}. All rights reserved.
            </p>
            <p className="flex items-center gap-1 text-xs" style={{ color: "var(--theme-text-muted)" }}>
              Made with <Heart className="h-3 w-3" style={{ color: "var(--theme-accent-tertiary)" }} /> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
