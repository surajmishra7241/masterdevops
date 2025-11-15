"use client";

import { motion } from "framer-motion";
import HologramCluster from "./HologramCluster";
import CodeTerminalCluster from "./CodeTerminalCluster";

const particles = new Array(26).fill(0).map((_, i) => i);

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyber-darker via-cyber-dark to-cyber-darker"
    >
      {/* Subtle cyber grid */}
      <div className="absolute inset-0 opacity-35 mix-blend-screen">
        <div className="w-full h-full bg-[linear-gradient(to_right,rgba(15,23,42,0.8)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.8)_1px,transparent_1px)] bg-[length:4rem_4rem]" />
      </div>

      {/* Holographic cloud-like particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <motion.div
            key={p}
            className="absolute rounded-full bg-gradient-to-br from-neon-blue/10 via-neon-purple/8 to-neon-cyan/10 blur-3xl"
            style={{
              width: `${80 + (p % 5) * 18}px`,
              height: `${80 + ((p + 2) % 5) * 20}px`,
              left: `${(p * 13) % 100}%`,
              top: `${(p * 23) % 100}%`,
            }}
            animate={{ opacity: [0.18, 0.4, 0.18] }}
            transition={{
              duration: 12 + (p % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: p * 0.3,
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="relative z-10 w-full section-container pt-28 pb-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1.1fr)] items-center">
          {/* Left: Core hero content */}
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Small floating badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/40 bg-cyber-dark/60 px-4 py-1.5 text-xs text-neon-cyan shadow-neon-sm backdrop-blur-xl mb-6"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Production-Grade DevOps & Cloud Infrastructure</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              // className="  font-extrabold tracking-tight bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan bg-clip-text text-transparent animate-glow"
               className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-neon-cyan drop-shadow-[0_0_8px_rgba(0,255,255,0.9)]"
            >
              Master DevOps
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-4 text-lg md:text-xl text-gray-300 max-w-xl"
            >
              Design, build, and operate cloud-native platforms with opinionated,
              battle-tested DevOps stacks for AWS, GCP, Azure, and on‑prem.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="mt-3 text-sm md:text-base text-neon-cyan/80 max-w-lg"
            >
              From zero‑to‑production EKS clusters to end‑to‑end CI/CD, observability,
              and security automation — delivered as reusable infrastructure blueprints.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan font-semibold text-white shadow-neon-lg hover:shadow-neon-lg/80 transition-shadow"
              >
                Request Infra Setup
              </motion.a>

              <motion.a
                href="#services"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-neon-cyan/70 text-neon-cyan font-semibold bg-cyber-dark/40 hover:bg-neon-cyan/5 shadow-neon-sm transition-colors"
              >
                Explore DevOps Services
              </motion.a>
            </motion.div>

            {/* Small quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="mt-10 grid grid-cols-3 gap-4 max-w-md text-xs md:text-sm text-gray-300"
            >
              <div>
                <p className="text-neon-cyan font-semibold">99.9%+</p>
                <p className="text-gray-400">Uptime SLO Friendly Architectures</p>
              </div>
              <div>
                <p className="text-neon-purple font-semibold">Minutes</p>
                <p className="text-gray-400">To roll out production‑ready pipelines</p>
              </div>
              <div>
                <p className="text-neon-pink font-semibold">Cloud‑Native</p>
                <p className="text-gray-400">Docker, K8s, GitOps, IaC by design</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Holograms + 3D‑style terminals */}
          <motion.div
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="relative"
          >
            <div className="relative glass-card border-neon-blue/40 shadow-neon-lg px-6 py-6 md:px-8 md:py-8 overflow-hidden">
              {/* Soft halo background */}
              <div className="pointer-events-none absolute -inset-24 bg-cyber-grid opacity-60 mix-blend-screen" />
              <div className="scanline-overlay" />

              {/* Top label */}
              <div className="relative flex items-center justify-between mb-4">
                <p className="text-xs uppercase tracking-[0.32em] text-gray-400">
                  DevOps Control Surface
                </p>
                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live environments</span>
                </div>
              </div>

              {/* Core hologram cluster (Docker / K8s / etc.) */}
              <HologramCluster />

              {/* Transparent terminals below */}
              <CodeTerminalCluster />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
