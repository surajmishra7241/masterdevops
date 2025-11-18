"use client";
import { motion } from "framer-motion";

export default function Footer() {
  const socialLinks = [
    {
      name: "Instagram",
      icon: "📸",
      href: "https://www.instagram.com/masterdevops/",
    },
    {
      name: "YouTube",
      icon: "▶️",
      href: "https://www.youtube.com/@MastersDevops",
    },
    {
      name: "Email",
      icon: "✉️",
      href: "mailto:mail@shubhsandes.com",
    },
  ];

  return (
    <footer className="bg-cyber-darker border-t border-neon-purple/20 py-12">
      <div className="container mx-auto px-6">
        {/* Connect Section */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-neon-cyan mb-6 animate-glow">
            Connect With Us
          </h3>
          <div className="flex justify-center gap-8 flex-wrap">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 backdrop-blur-lg border border-neon-cyan/30 rounded-xl flex items-center justify-center text-3xl hover:shadow-lg hover:shadow-neon-cyan/50 transition-all"
                title={link.name}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
        {/* Company Details */}
        <div className="text-center text-gray-400 space-y-2">
          <p className="text-lg font-semibold text-neon-purple">Master DevOps</p>
          <p>Cloud Infrastructure • DevOps Solutions • Automation</p>
          <p className="text-sm">© 2025 Master DevOps. All rights reserved.</p>
        </div>
        {/* Decorative Line */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
      </div>
    </footer>
  );
}
