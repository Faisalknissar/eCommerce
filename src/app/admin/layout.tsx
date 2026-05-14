"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FolderTree,
  Ticket,
  Star,
  Palette,
  Bell,
  ScrollText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Search,
  LogOut,
  Home,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useUIStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FolderTree,
  Ticket,
  Star,
  Palette,
  Bell,
  ScrollText,
  Settings,
};

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/admin/products", label: "Products", icon: "Package" },
  { href: "/admin/orders", label: "Orders", icon: "ShoppingCart" },
  { href: "/admin/users", label: "Users", icon: "Users" },
  { href: "/admin/categories", label: "Categories", icon: "FolderTree" },
  { href: "/admin/coupons", label: "Coupons", icon: "Ticket" },
  { href: "/admin/reviews", label: "Reviews", icon: "Star" },
  { href: "/admin/themes", label: "Themes", icon: "Palette" },
  { href: "/admin/notifications", label: "Notifications", icon: "Bell" },
  { href: "/admin/audit-logs", label: "Audit Logs", icon: "ScrollText" },
  { href: "/admin/settings", label: "Settings", icon: "Settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    const timeout = window.setTimeout(() => setMobileOpen(false), 0);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <motion.aside
        className={cn(
          "fixed left-0 top-0 z-30 hidden h-screen flex-col border-r lg:flex",
          "transition-all duration-300"
        )}
        style={{
          background: "var(--theme-bg-secondary)",
          borderColor: "rgba(255,255,255,0.06)",
          width: sidebarOpen ? "260px" : "72px",
        }}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-4">
          <AnimatePresence mode="wait">
            {sidebarOpen && (
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{
                    background: "linear-gradient(135deg, var(--theme-accent-primary), var(--theme-accent-secondary))",
                  }}
                >
                  <span className="text-sm font-black text-white">N</span>
                </div>
                <span className="font-bold text-sm" style={{ fontFamily: "var(--theme-font-heading)" }}>
                  {APP_NAME} <span className="text-[10px] font-normal badge-accent ml-1 px-1.5 py-0.5 rounded">Admin</span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="btn-ghost p-1.5 rounded-lg"
          >
            {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive ? "text-white" : ""
                  )}
                  style={{
                    background: isActive ? "rgba(139, 92, 246, 0.15)" : "transparent",
                    color: isActive ? "var(--theme-accent-primary)" : "var(--theme-text-secondary)",
                  }}
                  whileHover={{
                    backgroundColor: isActive ? "rgba(139, 92, 246, 0.15)" : "rgba(255,255,255,0.04)",
                  }}
                >
                  <Icon className={cn("h-4.5 w-4.5 shrink-0", !sidebarOpen && "mx-auto")} />
                  {sidebarOpen && <span>{item.label}</span>}
                  {isActive && (
                    <motion.div
                      className="absolute left-0 h-6 w-[3px] rounded-r"
                      style={{ background: "var(--theme-accent-primary)" }}
                      layoutId="admin-nav-indicator"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t px-2 py-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <Link href="/">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5" style={{ color: "var(--theme-text-secondary)" }}>
              <Home className="h-4 w-4 shrink-0" />
              {sidebarOpen && <span>Back to Store</span>}
            </div>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5"
            style={{ color: "var(--color-danger)" }}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 z-50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute left-0 top-0 h-full w-72 p-4"
              style={{ background: "var(--theme-bg-secondary)" }}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-bold" style={{ fontFamily: "var(--theme-font-heading)" }}>{APP_NAME} Admin</span>
                <button onClick={() => setMobileOpen(false)}><X className="h-5 w-5" /></button>
              </div>
              <nav className="space-y-0.5">
                {navItems.map((item) => {
                  const Icon = iconMap[item.icon] || LayoutDashboard;
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href}>
                      <div
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                        style={{
                          background: isActive ? "rgba(139, 92, 246, 0.15)" : "transparent",
                          color: isActive ? "var(--theme-accent-primary)" : "var(--theme-text-secondary)",
                        }}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 transition-all duration-300",
          "lg:ml-[72px]",
          sidebarOpen && "lg:ml-[260px]"
        )}
      >
        {/* Top Bar */}
        <header
          className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b px-4 sm:px-6"
          style={{
            background: "rgba(10, 10, 20, 0.8)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          {/* Mobile menu toggle */}
          <button className="lg:hidden btn-ghost p-2" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>

          {/* Search */}
          <div className="relative hidden flex-1 sm:block max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--theme-text-muted)" }} />
            <input
              type="text"
              placeholder="Search anything... (Ctrl+K)"
              className="input-field pl-10 py-2 text-sm"
            />
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Notifications */}
            <button className="btn-ghost relative p-2">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full" style={{ background: "var(--theme-accent-tertiary)" }} />
            </button>

            {/* User */}
            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg, var(--theme-accent-primary), var(--theme-accent-tertiary))" }}
              >
                {session?.user?.name?.[0]?.toUpperCase() || "A"}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">{session?.user?.name || "Admin"}</p>
                <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
