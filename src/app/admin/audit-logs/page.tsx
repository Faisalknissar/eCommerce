"use client";
import { motion } from "framer-motion";
import { ScrollText } from "lucide-react";

export default function AdminAuditLogsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--theme-font-heading)" }}>Audit Logs</h1>
        <p className="text-sm" style={{ color: "var(--theme-text-secondary)" }}>System activity and security logs</p>
      </motion.div>
      <motion.div className="glass-card flex flex-col items-center justify-center py-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <ScrollText className="mb-4 h-12 w-12" style={{ color: "var(--theme-text-muted)" }} />
        <p className="text-lg font-semibold">Audit Trail</p>
        <p className="text-sm" style={{ color: "var(--theme-text-muted)" }}>Immutable log of all system actions</p>
      </motion.div>
    </div>
  );
}
