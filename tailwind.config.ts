import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core background tones
        "cyber-darker": "#050509",
        "cyber-dark": "#0b0b13",

        // Neon accents
        "neon-blue": "#00d4ff",
        "neon-purple": "#b537ff",
        "neon-pink": "#ff006e",
        "neon-cyan": "#00ffff",

        // Utility tints
        "panel-dark": "#141424",
      },

      backgroundImage: {
        // Global subtle grid / gradient
        "cyber-grid":
          "radial-gradient(circle at 0 0, rgba(0,212,255,0.12), transparent 55%), radial-gradient(circle at 100% 0, rgba(181,55,255,0.16), transparent 55%), radial-gradient(circle at 100% 100%, rgba(255,0,110,0.12), transparent 55%), radial-gradient(circle at 0 100%, rgba(0,255,255,0.18), transparent 55%)",
      },

      boxShadow: {
        // Neon shadows for cards and buttons
        "neon-sm": "0 0 8px rgba(0,212,255,0.45)",
        "neon-md": "0 0 16px rgba(0,212,255,0.55), 0 0 32px rgba(181,55,255,0.45)",
        "neon-lg":
          "0 0 20px rgba(0,255,255,0.6), 0 0 45px rgba(181,55,255,0.55), 0 0 65px rgba(255,0,110,0.35)",
      },

      borderRadius: {
        "glass-xl": "1.75rem",
      },

      animation: {
        glow: "glow 2.2s ease-in-out infinite alternate",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "orbit-slow": "orbit 18s linear infinite",
        "scanline": "scanline 4s linear infinite",
      },

      keyframes: {
        glow: {
          "0%": {
            textShadow:
              "0 0 10px rgba(0,255,255,0.75), 0 0 22px rgba(0,212,255,0.7)",
          },
          "100%": {
            textShadow:
              "0 0 18px rgba(181,55,255,0.95), 0 0 40px rgba(255,0,110,0.9)",
          },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        orbit: {
          "0%": {
            transform: "rotate(0deg) translateX(140px) rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg) translateX(140px) rotate(-360deg)",
          },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
