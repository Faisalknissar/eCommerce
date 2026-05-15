"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("h-10 w-10 rounded-lg bg-surface animate-pulse", className)} />
    );
  }

  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-surface active:scale-95",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <div className="relative h-5 w-5 overflow-hidden">
        <motion.div
          animate={{
            y: theme === "dark" ? 0 : 30,
            opacity: theme === "dark" ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "anticipate" }}
          className="absolute inset-0 flex items-center justify-center text-blue-400"
        >
          <Moon className="h-5 w-5 fill-blue-400/20" />
        </motion.div>
        <motion.div
          animate={{
            y: theme === "light" ? 0 : -30,
            opacity: theme === "light" ? 1 : 0,
          }}
          initial={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.3, ease: "anticipate" }}
          className="absolute inset-0 flex items-center justify-center text-amber-500"
        >
          <Sun className="h-5 w-5 fill-amber-500/20" />
        </motion.div>
      </div>
    </motion.button>
  );
}
