'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function GlassCard({ children, className = '', hoverEffect = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? { scale: 1.03, y: -5 } : {}}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`bg-cyber-dark/40 backdrop-blur-xl border border-neon-blue/30 rounded-2xl p-6 shadow-xl shadow-neon-purple/20 ${className}`}
    >
      {children}
    </motion.div>
  );
}
