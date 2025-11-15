'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface NeonButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function NeonButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  type = 'button'
}: NeonButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-neon-pink to-neon-purple shadow-lg shadow-neon-pink/50 hover:shadow-neon-purple/70',
    secondary: 'bg-gradient-to-r from-neon-blue to-neon-cyan shadow-lg shadow-neon-blue/50 hover:shadow-neon-cyan/70',
    outline: 'bg-transparent border-2 border-neon-cyan hover:bg-neon-cyan/10',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-8 py-4 rounded-lg font-semibold text-white transition-all ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
