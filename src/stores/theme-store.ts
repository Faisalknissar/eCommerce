import { create } from "zustand";

interface ThemeColors {
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  accentPrimary: string;
  accentSecondary: string;
  accentTertiary: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  success: string;
  warning: string;
  danger: string;
}

interface ThemeFonts {
  heading: string;
  body: string;
  mono: string;
}

interface ThemeData {
  id: string;
  name: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
  borderRadius: string;
  buttonStyle: string;
  layoutStyle: string;
  darkMode: boolean;
}

interface ThemeState {
  theme: ThemeData | null;
  isLoading: boolean;
  setTheme: (theme: ThemeData) => void;
  applyTheme: (theme: ThemeData) => void;
  setLoading: (loading: boolean) => void;
}

const defaultColors: ThemeColors = {
  bgPrimary: "hsl(222, 47%, 5%)",
  bgSecondary: "hsl(222, 40%, 8%)",
  bgTertiary: "hsl(222, 35%, 12%)",
  accentPrimary: "hsl(262, 100%, 65%)",
  accentSecondary: "hsl(180, 100%, 50%)",
  accentTertiary: "hsl(330, 100%, 60%)",
  textPrimary: "hsl(0, 0%, 95%)",
  textSecondary: "hsl(0, 0%, 70%)",
  textMuted: "hsl(0, 0%, 45%)",
  success: "hsl(142, 76%, 45%)",
  warning: "hsl(38, 92%, 50%)",
  danger: "hsl(0, 84%, 60%)",
};

const defaultFonts: ThemeFonts = {
  heading: "Outfit",
  body: "Inter",
  mono: "JetBrains Mono",
};

function applyThemeToDOM(theme: ThemeData): void {
  const root = document.documentElement;
  root.style.setProperty("--theme-bg-primary", theme.colors.bgPrimary);
  root.style.setProperty("--theme-bg-secondary", theme.colors.bgSecondary);
  root.style.setProperty("--theme-bg-tertiary", theme.colors.bgTertiary);
  root.style.setProperty("--theme-accent-primary", theme.colors.accentPrimary);
  root.style.setProperty("--theme-accent-secondary", theme.colors.accentSecondary);
  root.style.setProperty("--theme-accent-tertiary", theme.colors.accentTertiary);
  root.style.setProperty("--theme-text-primary", theme.colors.textPrimary);
  root.style.setProperty("--theme-text-secondary", theme.colors.textSecondary);
  root.style.setProperty("--theme-text-muted", theme.colors.textMuted);
  root.style.setProperty("--theme-font-heading", `"${theme.fonts.heading}", system-ui, sans-serif`);
  root.style.setProperty("--theme-font-body", `"${theme.fonts.body}", system-ui, sans-serif`);
  root.style.setProperty("--theme-radius", theme.borderRadius);
  root.style.setProperty("--theme-radius-button", theme.borderRadius);
  root.style.setProperty("--theme-button-style", theme.buttonStyle);
  root.style.setProperty("--theme-layout-style", theme.layoutStyle);

  if (theme.darkMode) {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  } else {
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  }
}

export const useThemeStore = create<ThemeState>()((set) => ({
  theme: null,
  isLoading: true,

  setTheme: (theme) => set({ theme }),

  applyTheme: (theme) => {
    applyThemeToDOM(theme);
    set({ theme, isLoading: false });
  },

  setLoading: (loading) => set({ isLoading: loading }),
}));

export { defaultColors, defaultFonts };
export type { ThemeColors, ThemeFonts, ThemeData };
