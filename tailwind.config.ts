import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./types/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: "#f3faf2",
          100: "#ddf0dc",
          300: "#92c888",
          500: "#3c8f55",
          700: "#245d37"
        },
        berry: {
          100: "#f7d8df",
          400: "#c95f76",
          700: "#763a4a"
        },
        skysoft: {
          100: "#d8edf4",
          300: "#84bfd4",
          600: "#2f7388"
        },
        sun: {
          100: "#fff0b8",
          300: "#f7cb58",
          600: "#b37516"
        },
        ink: "#263238",
        paper: "#fffdf7"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(38, 50, 56, 0.08)"
      },
      fontFamily: {
        sans: [
          "ui-rounded",
          "system-ui",
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};

export default config;
