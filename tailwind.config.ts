import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, rgb(var(--base-content) / 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--base-content) / 0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid-pattern': '4rem 4rem',
      },
      animation: {
        'fade-in': 'fade-in 1s ease-in-out',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#be3a3a",
          "primary-content": "#ffffff",
          "secondary": "#f87171",
          "accent": "#fca5a5",
          "neutral": "#2b3440",
          "base-100": "#ffffff",
          "base-200": "#f8f9fa",
          "base-300": "#f1f2f3",
          "base-content": "#1f2937",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272"
        },
        dark: {
          "primary": "#be3a3a",
          "primary-content": "#ffffff",
          "secondary": "#f87171",
          "accent": "#fca5a5",
          "neutral": "#151616",
          "base-100": "#151616",
          "base-200": "#1c1d1d",
          "base-300": "#242525",
          "base-content": "#e2e4e7",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272"
        }
      }
    ],
  },
  plugins: [daisyui],
} satisfies Config;
