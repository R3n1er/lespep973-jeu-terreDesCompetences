import type { Config } from "tailwindcss";

const config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--pep-blue)",
          secondary: "var(--pep-green)",
          accent: "var(--pep-pink)",
        },
        neutral: {
          0: "var(--neutral-0)",
          50: "var(--neutral-50)",
          100: "var(--neutral-100)",
          700: "var(--neutral-700)",
          900: "var(--neutral-900)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          soft: "var(--ink-soft)",
          muted: "var(--ink-muted)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          soft: "var(--accent-soft)",
        },
        glass: {
          DEFAULT: "var(--glass)",
          border: "var(--glass-border)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        glass: "var(--shadow-1)",
        glow: "var(--shadow-glow)",
        hud: "var(--shadow-hud)",
        intense: "var(--shadow-intense)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
        display: "var(--font-display)",
        numeric: "var(--font-numeric)",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
