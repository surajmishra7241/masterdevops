"use client";

import { motion } from "framer-motion";

const holograms = [
  {
    label: "Docker",
    color: "from-neon-blue/80 to-neon-cyan/70",
    ring: "border-neon-blue/70",
    x: "-18%",
    y: "-12%",
    delay: 0,
  },
  {
    label: "Kubernetes",
    color: "from-neon-purple/80 to-neon-blue/70",
    ring: "border-neon-purple/70",
    x: "20%",
    y: "-10%",
    delay: 0.3,
  },
  {
    label: "Terraform",
    color: "from-neon-pink/80 to-neon-purple/70",
    ring: "border-neon-pink/70",
    x: "-22%",
    y: "22%",
    delay: 0.6,
  },
  {
    label: "GitHub Actions",
    color: "from-neon-cyan/80 to-neon-blue/70",
    ring: "border-neon-cyan/70",
    x: "22%",
    y: "18%",
    delay: 0.9,
  },
];

const orbitPanels = [
  "CI/CD-as-Code",
  "EKS Production Clusters",
  "Multi-Cloud Blueprints",
  "SRE & Reliability",
];

export default function HologramCluster() {
  return (
    <div className="relative w-full max-w-xl mx-auto mt-12 md:mt-0">
      {/* Central glass orb */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
        className="relative mx-auto h-52 w-52 md:h-64 md:w-64 rounded-full bg-gradient-to-br from-cyber-dark/90 via-panel-dark/90 to-cyber-darker/90 border border-neon-cyan/40 shadow-neon-lg backdrop-blur-2xl flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-cyber-grid opacity-70 mix-blend-screen" />
        <div className="scanline-overlay" />

        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 text-center px-4"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-neon-cyan/80 mb-2">
            DevOps Hologram
          </p>
          <p className="text-lg md:text-xl font-semibold text-gray-100">
            Cloud Native Delivery Grid
          </p>
          <p className="mt-2 text-[11px] md:text-xs text-gray-400">
            Docker • Kubernetes • Terraform • GitHub Actions • Argo CD •
            Observability
          </p>
        </motion.div>

        {/* Soft inner glow ring */}
        <div className="absolute inset-4 rounded-full border border-neon-blue/20" />
        <div className="absolute inset-10 rounded-full border border-neon-purple/30 blur-sm" />
      </motion.div>

      {/* Hologram labels around the orb */}
      {holograms.map((h) => (
        <motion.div
          key={h.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: h.delay }}
          className="absolute"
          style={{ left: h.x, top: h.y }}
        >
          <div
            className={`relative px-4 py-2 rounded-2xl bg-gradient-to-r ${h.color} border ${h.ring} shadow-neon-sm backdrop-blur-xl flex items-center gap-2`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-white whitespace-nowrap">
              {h.label}
            </span>
          </div>
        </motion.div>
      ))}

      {/* Orbiting translucent panels */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative h-64 w-64 md:h-80 md:w-80">
          {orbitPanels.map((label, index) => (
            <motion.div
              key={label}
              className="absolute inset-0 flex items-center justify-center orbit-slow"
              style={{
                animationDelay: `${index * 2.5}s`,
              }}
            >
              <div className="h-10 w-40 md:h-11 md:w-48 rounded-xl bg-cyber-dark/60 border border-neon-blue/40 shadow-neon-sm backdrop-blur-xl flex items-center justify-center">
                <span className="text-[11px] md:text-xs text-gray-200 tracking-wide">
                  {label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
