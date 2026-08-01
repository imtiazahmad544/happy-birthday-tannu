import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        royal: { DEFAULT: "#1E3A8A", light: "#3B5BDB", dark: "#0F1F4D" },
        gold: { DEFAULT: "#D4AF37", light: "#F1D97A", dark: "#9C7A1E" },
        amber: { DEFAULT: "#F59E0B" },
        blush: { DEFAULT: "#EC4899" },
        violet: { DEFAULT: "#7C3AED" },
        ink: { DEFAULT: "#05060A", navy: "#0A0E23" },
        "deep-navy": "#0A0E23",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "aurora-radial":
          "radial-gradient(60% 60% at 50% 0%, rgba(124,58,237,0.25) 0%, rgba(5,6,10,0) 70%)",
        "gold-shimmer":
          "linear-gradient(110deg, #D4AF37 0%, #F1D97A 40%, #D4AF37 60%, #F1D97A 100%)",
      },
      keyframes: {
        shimmer: { "0%": { backgroundPosition: "0% 0%" }, "100%": { backgroundPosition: "200% 0%" } },
        float: { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-14px)" } },
        "pulse-glow": {
          "0%,100%": { opacity: "0.6", filter: "blur(20px)" },
          "50%": { opacity: "1", filter: "blur(30px)" },
        },
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
