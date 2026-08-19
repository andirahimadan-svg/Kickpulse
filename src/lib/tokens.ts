// ─── HealthOS Design Tokens ─────────────────────────────────────────────────
// A calm, trustworthy, premium healthcare design system.

export const colors = {
  // Brand
  brand: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },

  // Neutral (slightly warm)
  neutral: {
    0: "#ffffff",
    25: "#fafafa",
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712",
  },

  // Semantic
  success: { light: "#dcfce7", DEFAULT: "#22c55e", dark: "#15803d" },
  warning: { light: "#fef9c3", DEFAULT: "#eab308", dark: "#a16207" },
  critical: { light: "#fee2e2", DEFAULT: "#ef4444", dark: "#b91c1c" },
  info: { light: "#dbeafe", DEFAULT: "#3b82f6", dark: "#1d4ed8" },
} as const;

export const radii = {
  none: "0",
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  "2xl": "16px",
  full: "9999px",
} as const;

export const shadows = {
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.03)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.04)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.06), 0 4px 6px -4px rgb(0 0 0 / 0.04)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.04)",
} as const;
