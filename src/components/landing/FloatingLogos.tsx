'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function FloatingLogos() {
  const logos = [
    { name: 'Docker', position: { x: -200, y: -100 }, delay: 0 },
    { name: 'Kubernetes', position: { x: 200, y: -80 }, delay: 0.5 },
    { name: 'Terraform', position: { x: -180, y: 100 }, delay: 1 },
    { name: 'AWS', position: { x: 180, y: 120 }, delay: 1.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {logos.map((logo) => (
        <motion.div
          key={logo.name}
          className="absolute top-1/2 left-1/2 w-24 h-24 opacity-20"
          style={{
            x: logo.position.x,
            y: logo.position.y,
          }}
          animate={{
            y: [logo.position.y, logo.position.y - 30, logo.position.y],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: logo.delay,
            ease: 'easeInOut',
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-neon-blue/30 to-neon-purple/30 rounded-2xl backdrop-blur-sm border border-neon-cyan/20 shadow-lg shadow-neon-blue/30 flex items-center justify-center">
            <span className="text-4xl">{logo.name[0]}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
