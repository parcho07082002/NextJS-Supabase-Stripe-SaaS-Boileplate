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
          "primary": "#10131a",
          "primary-content": "#eeeff0",
          "secondary": "#e05a6e",
          "accent": "#47a09d",
          "neutral": "#10131a",
          "base-100": "#ffffff",
          "base-200": "#eeeff0",
          "base-300": "#e6e7e8",
          "base-content": "#10131a",
          "info": "#3abff8",
          "success": "#47a09d",
          "warning": "#fbbd23",
          "error": "#e05a6e"
        },
        dark: {
          "primary": "#1d232f",
          "primary-content": "#eeeff0",
          "secondary": "#e05a6e",
          "accent": "#47a09d",
          "neutral": "#1d232f",
          "base-100": "#10131a",
          "base-200": "#14181f",
          "base-300": "#2a3240",
          "base-content": "#eeeff0",
          "info": "#3abff8",
          "success": "#47a09d",
          "warning": "#fbbd23",
          "error": "#e05a6e"
        }
      }
    ],
  },
  plugins: [daisyui],
} satisfies Config;
