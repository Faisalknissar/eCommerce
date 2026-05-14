"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Package,
  Bell,
  Shield,
  Camera,
  Plus,
  Edit3,
  Trash2,
  Save,
  ChevronRight,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "orders", label: "Orders", icon: Package },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
] as const;

type TabId = (typeof tabs)[number]["id"];

const mockAddresses = [
  {
    id: "1",
    label: "Home",
    fullName: "Rahul Sharma",
    phone: "+91 9876543210",
    line1: "42, Sunflower Heights, 3rd Floor",
    line2: "Near City Mall, Andheri West",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400058",
    isDefault: true,
  },
  {
    id: "2",
    label: "Office",
    fullName: "Rahul Sharma",
    phone: "+91 9876543210",
    line1: "WeWork, 12th Floor, Tower B",
    line2: "BKC, Bandra Kurla Complex",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400051",
    isDefault: false,
  },
];

const mockOrders = [
  { id: "ORD-2026-A1B2C", date: "2026-05-10", total: 12999, status: "delivered", items: 1 },
  { id: "ORD-2026-D3E4F", date: "2026-05-08", total: 24999, status: "shipped", items: 2 },
  { id: "ORD-2026-G5H6I", date: "2026-05-01", total: 4999, status: "processing", items: 1 },
];

const statusColors: Record<string, string> = {
  pending: "var(--color-warning)",
  processing: "var(--color-info)",
  shipped: "var(--theme-accent-primary)",
  delivered: "var(--color-success)",
  cancelled: "var(--color-danger)",
};

export default function AccountPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: session?.user?.name || "Demo Customer",
    email: session?.user?.email || "customer@demo.com",
    phone: "+91 9876543210",
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container-page">
        <motion.h1
          className="mb-8 text-3xl font-bold"
          style={{ fontFamily: "var(--theme-font-heading)" }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My <span className="gradient-text">Account</span>
        </motion.h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <motion.div
            className="glass-card h-fit p-2 lg:p-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* User card */}
            <div className="mb-3 flex items-center gap-3 rounded-lg p-3" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white"
                style={{ background: "linear-gradient(135deg, var(--theme-accent-primary), var(--theme-accent-tertiary))" }}
              >
                {profile.name[0]?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{profile.name}</p>
                <p className="text-xs truncate" style={{ color: "var(--theme-text-muted)" }}>{profile.email}</p>
              </div>
            </div>

            <nav className="space-y-0.5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all"
                  style={{
                    background: activeTab === tab.id ? "rgba(139, 92, 246, 0.12)" : "transparent",
                    color: activeTab === tab.id ? "var(--theme-accent-primary)" : "var(--theme-text-secondary)",
                  }}
                >
                  <tab.icon className="h-4 w-4 shrink-0" />
                  {tab.label}
                  <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-40" />
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Content */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="glass-card p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Personal Information</h2>
                  <motion.button
                    className={isEditing ? "btn-primary" : "btn-secondary"}
                    onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isEditing ? (
                      <span className="relative z-10 flex items-center gap-2"><Save className="h-4 w-4" />Save Changes</span>
                    ) : (
                      <><Edit3 className="h-4 w-4" />Edit Profile</>
                    )}
                  </motion.button>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div
                      className="flex h-20 w-20 items-center justify-center rounded-2xl text-3xl font-bold text-white"
                      style={{ background: "linear-gradient(135deg, var(--theme-accent-primary), var(--theme-accent-secondary))" }}
                    >
                      {profile.name[0]?.toUpperCase()}
                    </div>
                    {isEditing && (
                      <button
                        className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full text-white"
                        style={{ background: "var(--theme-accent-primary)" }}
                      >
                        <Camera className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{profile.name}</p>
                    <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>
                      Member since January 2026
                    </p>
                  </div>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Full Name</label>
                    <input
                      type="text"
                      className="input-field"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Email</label>
                    <input type="email" className="input-field" value={profile.email} disabled />
                    <p className="mt-1 text-[10px]" style={{ color: "var(--theme-text-muted)" }}>
                      Email cannot be changed
                    </p>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Phone Number</label>
                    <input
                      type="tel"
                      className="input-field"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Saved Addresses</h2>
                  <motion.button className="btn-primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <span className="relative z-10 flex items-center gap-2"><Plus className="h-4 w-4" />Add Address</span>
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {mockAddresses.map((addr, i) => (
                    <motion.div
                      key={addr.id}
                      className="glass-card p-5 space-y-3"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="badge badge-accent text-[10px]">{addr.label}</span>
                          {addr.isDefault && (
                            <span className="badge badge-success text-[10px]">Default</span>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <button className="btn-ghost p-1.5"><Edit3 className="h-3.5 w-3.5" /></button>
                          <button className="btn-ghost p-1.5" style={{ color: "var(--color-danger)" }}><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{addr.fullName}</p>
                        <p className="text-xs" style={{ color: "var(--theme-text-secondary)" }}>{addr.phone}</p>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--theme-text-secondary)" }}>
                        {addr.line1}
                        {addr.line2 && <>, {addr.line2}</>}
                        <br />
                        {addr.city}, {addr.state} — {addr.postalCode}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Order History</h2>
                {mockOrders.map((order, i) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link href={`/orders/${order.id}`}>
                      <div className="glass-card flex items-center justify-between p-5 cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg text-lg" style={{ background: "rgba(139, 92, 246, 0.1)" }}>
                            📦
                          </div>
                          <div>
                            <p className="font-medium text-sm">{order.id}</p>
                            <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>
                              {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {order.items} item{order.items > 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-bold">₹{order.total.toLocaleString("en-IN")}</p>
                            <span
                              className="inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase"
                              style={{
                                color: statusColors[order.status],
                                background: `color-mix(in srgb, ${statusColors[order.status]} 12%, transparent)`,
                              }}
                            >
                              {order.status}
                            </span>
                          </div>
                          <ChevronRight className="h-4 w-4" style={{ color: "var(--theme-text-muted)" }} />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="glass-card p-6 space-y-6">
                <h2 className="text-xl font-bold">Security Settings</h2>

                <div className="space-y-4">
                  <div className="rounded-lg p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Change Password</p>
                        <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>Last changed 30 days ago</p>
                      </div>
                      <button className="btn-secondary text-sm">Update</button>
                    </div>
                  </div>
                  <div className="rounded-lg p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Two-Factor Authentication</p>
                        <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>Add an extra layer of security</p>
                      </div>
                      <button className="btn-secondary text-sm">Enable</button>
                    </div>
                  </div>
                  <div className="rounded-lg p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Active Sessions</p>
                        <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>1 active session on this device</p>
                      </div>
                      <button className="btn-ghost text-sm" style={{ color: "var(--color-danger)" }}>Revoke All</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="glass-card p-6 space-y-6">
                <h2 className="text-xl font-bold">Notification Preferences</h2>
                <div className="space-y-3">
                  {[
                    { label: "Order updates", desc: "Shipping, delivery, and return updates", enabled: true },
                    { label: "Promotions & sales", desc: "Discounts, coupons, and flash sales", enabled: true },
                    { label: "Product recommendations", desc: "Based on your shopping history", enabled: false },
                    { label: "Review reminders", desc: "Remind me to review purchased items", enabled: true },
                    { label: "Newsletter", desc: "Weekly curated product highlights", enabled: false },
                  ].map((pref) => (
                    <div
                      key={pref.label}
                      className="flex items-center justify-between rounded-lg p-4"
                      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                    >
                      <div>
                        <p className="text-sm font-medium">{pref.label}</p>
                        <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>{pref.desc}</p>
                      </div>
                      <button
                        className="relative h-6 w-11 rounded-full transition-colors"
                        style={{ background: pref.enabled ? "var(--theme-accent-primary)" : "rgba(255,255,255,0.12)" }}
                      >
                        <span
                          className="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform"
                          style={{ left: pref.enabled ? "calc(100% - 1.375rem)" : "0.125rem" }}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
