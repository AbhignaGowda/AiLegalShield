// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F0F1A",
        "background-secondary": "#1A1B2E",
        "text-primary": "#FFFFFF",
        "text-secondary": "#8B8FA3",
        "text-muted": "#6B7280",
        primary: {
          DEFAULT: "#6C47FF",
          dark: "#5A3BD1",
          light: "#8B6BFF",
        },
        accent: {
          purple: "#9D4EDD",
          blue: "#4285F4",
          green: "#10B981",
          orange: "#F59E0B",
        },
        glass: {
          light: "rgba(255, 255, 255, 0.05)",
          medium: "rgba(255, 255, 255, 0.1)",
          dark: "rgba(0, 0, 0, 0.2)",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(108, 71, 255, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(108, 71, 255, 0.8)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;