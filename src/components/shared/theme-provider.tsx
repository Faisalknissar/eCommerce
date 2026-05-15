"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useThemeStore, type ThemeData } from "@/stores/theme-store";

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: ThemeData | null;
}

export function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
  const { applyTheme, setLoading } = useThemeStore();

  useEffect(() => {
    if (initialTheme) {
      applyTheme(initialTheme);
    } else {
      // Load default theme if none provided
      setLoading(false);
    }
  }, [initialTheme, applyTheme, setLoading]);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
