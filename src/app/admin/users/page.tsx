"use client";

import { motion } from "framer-motion";
import { Search, MoreHorizontal, Shield, UserCheck, UserX } from "lucide-react";

const mockUsers = [
  { id: "1", name: "NexStore Admin", email: "admin@nexstore.com", role: "admin", status: "active", orders: 0, joined: "2026-01-01" },
  { id: "2", name: "Demo Customer", email: "customer@demo.com", role: "customer", status: "active", orders: 5, joined: "2026-01-15" },
  { id: "3", name: "Rahul Sharma", email: "rahul@email.com", role: "customer", status: "active", orders: 12, joined: "2026-02-10" },
  { id: "4", name: "Priya Patel", email: "priya@email.com", role: "customer", status: "active", orders: 8, joined: "2026-03-01" },
  { id: "5", name: "Manager User", email: "manager@nexstore.com", role: "manager", status: "active", orders: 0, joined: "2026-01-05" },
];

const roleColors: Record<string, string> = {
  admin: "var(--theme-accent-tertiary)",
  manager: "var(--theme-accent-primary)",
  customer: "var(--theme-accent-secondary)",
};

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--theme-font-heading)" }}>Users</h1>
        <p className="text-sm" style={{ color: "var(--theme-text-secondary)" }}>{mockUsers.length} registered users</p>
      </motion.div>

      <motion.div className="glass-card flex flex-wrap gap-3 p-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--theme-text-muted)" }} />
          <input type="text" placeholder="Search users..." className="input-field pl-10 py-2" />
        </div>
        <select className="input-field py-2 w-auto"><option>All Roles</option><option>Admin</option><option>Manager</option><option>Customer</option></select>
      </motion.div>

      <motion.div className="glass-card overflow-hidden p-0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <th className="px-4 py-3 text-left font-medium" style={{ color: "var(--theme-text-muted)" }}>User</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: "var(--theme-text-muted)" }}>Role</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: "var(--theme-text-muted)" }}>Status</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: "var(--theme-text-muted)" }}>Orders</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: "var(--theme-text-muted)" }}>Joined</th>
                <th className="px-4 py-3 text-right font-medium" style={{ color: "var(--theme-text-muted)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user, i) => (
                <motion.tr key={user.id} className="border-b hover:bg-white/[0.02] transition-colors" style={{ borderColor: "rgba(255,255,255,0.04)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 * i }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: `linear-gradient(135deg, ${roleColors[user.role]}, var(--theme-accent-primary))` }}>
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: `color-mix(in srgb, ${roleColors[user.role]} 15%, transparent)`, color: roleColors[user.role] }}>
                      <Shield className="h-3 w-3" />
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="badge badge-success text-[10px]">{user.status}</span>
                  </td>
                  <td className="px-4 py-3">{user.orders}</td>
                  <td className="px-4 py-3" style={{ color: "var(--theme-text-muted)" }}>{user.joined}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="btn-ghost p-1.5"><MoreHorizontal className="h-4 w-4" /></button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
