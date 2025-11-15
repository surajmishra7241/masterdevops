"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: "Latest DevOps Jobs", href: "/jobs" },
    { name: "Learn DevOps", href: "/learn" },
    { name: "Docs", href: "/docs" },
    { name: "Infra Setup", href: "/infra-setup" },
  ];
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-cyber-darker/80 backdrop-blur-xl border-b border-neon-blue/20"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-extrabold text-neon-cyan drop-shadow-[0_0_8px_rgba(0,255,255,0.9)]"
            >
              Master DevOps
            </motion.div>
          </Link>
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <motion.div key={item.name} whileHover={{ scale: 1.05 }}>
                <Link href={item.href} className="relative text-gray-300 hover:text-neon-cyan transition-colors group">
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-pink to-neon-cyan group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>
          {/* Mobile */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-neon-cyan">
            {/* Hamburger Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 space-y-4 bg-cyber-dark/90 backdrop-blur-lg rounded-lg p-4 border border-neon-purple/30">
            {navItems.map(item => (
              <Link key={item.name} href={item.href} className="block text-gray-300 hover:text-neon-cyan transition-colors" onClick={() => setIsOpen(false)}>
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
