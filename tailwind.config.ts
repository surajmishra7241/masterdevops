import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-darker': '#0a0a0f',
        'cyber-dark': '#111118',
        'neon-blue': '#00d4ff',
        'neon-purple': '#b537ff',
        'neon-pink': '#ff006e',
        'neon-cyan': '#00ffff',
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 20px #00d4ff' },
          '100%': { textShadow: '0 0 40px #b537ff' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
