"use client";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--theme-font-heading)" }}>Settings</h1>
        <p className="text-sm" style={{ color: "var(--theme-text-secondary)" }}>Store configuration and preferences</p>
      </motion.div>
      <motion.div className="glass-card flex flex-col items-center justify-center py-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Settings className="mb-4 h-12 w-12" style={{ color: "var(--theme-text-muted)" }} />
        <p className="text-lg font-semibold">Store Settings</p>
        <p className="text-sm" style={{ color: "var(--theme-text-muted)" }}>General, payment, email, and shipping configuration</p>
      </motion.div>
    </div>
  );
}
