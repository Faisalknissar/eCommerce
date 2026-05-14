"use client";

import { motion } from "framer-motion";
import { Palette, Check, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useThemeStore, defaultColors, defaultFonts, type ThemeColors, type ThemeFonts } from "@/stores/theme-store";
import { toast } from "sonner";

export default function AdminThemesPage() {
  const { theme, applyTheme } = useThemeStore();
  const [colors, setColors] = useState<ThemeColors>(theme?.colors || defaultColors);
  const [fonts, setFonts] = useState<ThemeFonts>(theme?.fonts || defaultFonts);
  const [borderRadius, setBorderRadius] = useState(theme?.borderRadius || "0.625rem");
  const [buttonStyle, setButtonStyle] = useState(theme?.buttonStyle || "gradient");
  const [darkMode, setDarkMode] = useState(theme?.darkMode ?? true);

  const handleColorChange = (key: keyof ThemeColors, value: string) => {
    const newColors = { ...colors, [key]: value };
    setColors(newColors);
    // Apply immediately for live preview
    applyTheme({
      id: theme?.id || "preview",
      name: theme?.name || "Preview",
      colors: newColors,
      fonts,
      borderRadius,
      buttonStyle,
      layoutStyle: theme?.layoutStyle || "default",
      darkMode,
    });
  };

  const handleSave = () => {
    toast.success("Theme saved successfully!");
  };

  const handleReset = () => {
    setColors(defaultColors);
    setFonts(defaultFonts);
    setBorderRadius("0.625rem");
    setButtonStyle("gradient");
    setDarkMode(true);
    applyTheme({
      id: "default",
      name: "NexStore Dark",
      colors: defaultColors,
      fonts: defaultFonts,
      borderRadius: "0.625rem",
      buttonStyle: "gradient",
      layoutStyle: "default",
      darkMode: true,
    });
    toast.info("Theme reset to defaults");
  };

  const colorFields: Array<{ key: keyof ThemeColors; label: string }> = [
    { key: "bgPrimary", label: "Background Primary" },
    { key: "bgSecondary", label: "Background Secondary" },
    { key: "bgTertiary", label: "Background Tertiary" },
    { key: "accentPrimary", label: "Accent Primary" },
    { key: "accentSecondary", label: "Accent Secondary" },
    { key: "accentTertiary", label: "Accent Tertiary" },
    { key: "textPrimary", label: "Text Primary" },
    { key: "textSecondary", label: "Text Secondary" },
    { key: "success", label: "Success Color" },
    { key: "warning", label: "Warning Color" },
    { key: "danger", label: "Danger Color" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--theme-font-heading)" }}>
            <Palette className="mr-2 inline h-6 w-6" style={{ color: "var(--theme-accent-primary)" }} />
            Theme Editor
          </h1>
          <p className="text-sm" style={{ color: "var(--theme-text-secondary)" }}>
            Customize your store appearance in real-time
          </p>
        </motion.div>
        <div className="flex gap-2">
          <motion.button onClick={handleReset} className="btn-secondary gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <RefreshCw className="h-4 w-4" />
            Reset
          </motion.button>
          <motion.button onClick={handleSave} className="btn-primary gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <span className="relative z-10 flex items-center gap-2"><Check className="h-4 w-4" />Save Theme</span>
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Color Editor */}
        <motion.div className="glass-card p-6 space-y-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="text-lg font-bold">Colors</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {colorFields.map(({ key, label }) => (
              <div key={key} className="space-y-1.5">
                <label className="text-xs font-medium" style={{ color: "var(--theme-text-secondary)" }}>{label}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={colors[key]}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="input-field flex-1 py-1.5 text-xs font-mono"
                  />
                  <div
                    className="h-8 w-8 shrink-0 rounded-lg border"
                    style={{ background: colors[key], borderColor: "rgba(255,255,255,0.1)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Typography & Layout */}
        <div className="space-y-6">
          <motion.div className="glass-card p-6 space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <h3 className="text-lg font-bold">Typography</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium" style={{ color: "var(--theme-text-secondary)" }}>Heading Font</label>
                <select value={fonts.heading} onChange={(e) => setFonts({ ...fonts, heading: e.target.value })} className="input-field py-1.5">
                  <option value="Outfit">Outfit</option>
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Poppins">Poppins</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium" style={{ color: "var(--theme-text-secondary)" }}>Body Font</label>
                <select value={fonts.body} onChange={(e) => setFonts({ ...fonts, body: e.target.value })} className="input-field py-1.5">
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                </select>
              </div>
            </div>
          </motion.div>

          <motion.div className="glass-card p-6 space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="text-lg font-bold">Layout & Style</h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium" style={{ color: "var(--theme-text-secondary)" }}>Border Radius</label>
                <select value={borderRadius} onChange={(e) => setBorderRadius(e.target.value)} className="input-field py-1.5">
                  <option value="0">None (0)</option>
                  <option value="0.25rem">Subtle (0.25rem)</option>
                  <option value="0.375rem">Small (0.375rem)</option>
                  <option value="0.625rem">Medium (0.625rem)</option>
                  <option value="1rem">Large (1rem)</option>
                  <option value="1.5rem">Extra Large (1.5rem)</option>
                  <option value="9999px">Pill (Full)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium" style={{ color: "var(--theme-text-secondary)" }}>Button Style</label>
                <select value={buttonStyle} onChange={(e) => setButtonStyle(e.target.value)} className="input-field py-1.5">
                  <option value="solid">Solid</option>
                  <option value="gradient">Gradient</option>
                  <option value="outline">Outline</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Dark Mode</label>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="relative h-6 w-11 rounded-full transition-colors"
                  style={{ background: darkMode ? "var(--theme-accent-primary)" : "rgba(255,255,255,0.15)" }}
                >
                  <span
                    className="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform"
                    style={{ left: darkMode ? "calc(100% - 1.375rem)" : "0.125rem" }}
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Preview */}
          <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <h3 className="mb-4 text-lg font-bold">Preview</h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <button className="btn-primary"><span className="relative z-10">Primary Button</span></button>
                <button className="btn-secondary">Secondary</button>
                <button className="btn-ghost">Ghost</button>
              </div>
              <input type="text" placeholder="Sample input field..." className="input-field" />
              <div className="flex gap-2">
                <span className="badge badge-success">Success</span>
                <span className="badge badge-warning">Warning</span>
                <span className="badge badge-danger">Danger</span>
                <span className="badge badge-accent">Accent</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
