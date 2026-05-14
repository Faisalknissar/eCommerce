"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <motion.div
        className={cn(
          "rounded-full border-2 border-transparent",
          sizeClasses[size]
        )}
        style={{
          borderTopColor: "var(--theme-accent-primary)",
          borderRightColor: "var(--theme-accent-secondary)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="relative h-16 w-16"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: "var(--theme-accent-primary)",
              borderRightColor: "transparent",
            }}
          />
          <div
            className="absolute inset-1 rounded-full border-2 border-transparent"
            style={{
              borderBottomColor: "var(--theme-accent-secondary)",
              borderLeftColor: "transparent",
            }}
          />
          <div
            className="absolute inset-2 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: "var(--theme-accent-tertiary)",
              borderRightColor: "transparent",
            }}
          />
        </motion.div>
        <motion.p
          className="text-sm"
          style={{ color: "var(--theme-text-muted)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="glass-card overflow-hidden p-0">
      <div className="skeleton h-48 w-full rounded-none" />
      <div className="space-y-3 p-4">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-1/2" />
        <div className="flex items-center justify-between pt-2">
          <div className="skeleton h-5 w-20" />
          <div className="skeleton h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="space-y-3">
      <div className="skeleton h-10 w-full" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="skeleton h-12 w-full" />
      ))}
    </div>
  );
}
