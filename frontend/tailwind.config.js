/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#080c16",
          darker: "#05070d",
          card: "rgba(15, 23, 42, 0.65)",
          cardHover: "rgba(30, 41, 59, 0.75)",
          border: "rgba(99, 102, 241, 0.2)",
          primary: "#6366f1",
          secondary: "#8b5cf6",
          accent: "#06b6d4",
          highlight: "#ec4899"
        }
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        },
        glow: {
          "0%": { boxShadow: "0 0 15px rgba(99, 102, 241, 0.3)" },
          "100%": { boxShadow: "0 0 30px rgba(139, 92, 246, 0.6)" }
        }
      }
    },
  },
  plugins: [],
}