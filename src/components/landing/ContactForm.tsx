"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    service: "AWS",
    timeline: "",
  });

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    setIsSubmitting(true);

    try {
      // Get API URL from environment variable
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.masterdevops.in";
      
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("✅ Message sent successfully! Expect a response within 24 hours.");
        setFormData({
          name: "",
          email: "",
          message: "",
          service: "AWS",
          timeline: "",
        });
        
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus(`❌ ${data.error || "Failed to send message. Please try again."}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("❌ Error sending message. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 px-6 bg-gradient-to-b from-cyber-darker via-cyber-dark to-cyber-darker overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-cyber-grid opacity-60 mix-blend-screen" />

      <div className="relative container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-neon-cyan drop-shadow-[0_0_10px_rgba(0,255,255,0.9)]">
            Launch Your DevOps Platform
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
            Share your stack, cloud provider, and timelines. Receive a tailored
            blueprint for CI/CD, Kubernetes, observability, and security automation.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative glass-card border-neon-purple/40 shadow-neon-lg px-6 py-6 md:px-8 md:py-8"
        >
          <div className="scanline-overlay" />
          <div className="pointer-events-none absolute -inset-24 bg-gradient-to-br from-neon-blue/10 via-neon-purple/10 to-neon-pink/10 opacity-60" />

          <div className="relative mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="text-left">
              <p className="text-xs uppercase tracking-[0.28em] text-neon-cyan/80">
                Contact Console
              </p>
              <p className="text-lg md:text-xl font-semibold text-gray-100 mt-1">
                Tell us about your infrastructure challenge.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-gray-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Encrypted channel via email</span>
            </div>
          </div>

          <div className="relative grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-neon-cyan mb-2 text-sm font-semibold">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-cyber-darker/80 border border-neon-blue/40 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/40 transition-all placeholder:text-gray-500"
                placeholder="Your name"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-neon-cyan mb-2 text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-cyber-darker/80 border border-neon-blue/40 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/40 transition-all placeholder:text-gray-500"
                placeholder="you@example.com"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-neon-cyan mb-2 text-sm font-semibold">
                Service Interest
              </label>
              <select
                value={formData.service}
                onChange={(e) =>
                  setFormData({ ...formData, service: e.target.value })
                }
                className="w-full px-4 py-3 bg-cyber-darker/80 border border-neon-blue/40 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/40 transition-all"
                disabled={isSubmitting}
              >
                <option value="AWS">AWS Infra Setup</option>
                <option value="GCP">GCP Infra Setup</option>
                <option value="Azure">Azure Infra Setup</option>
                <option value="On-Prem">On-Prem / Hybrid</option>
                <option value="Full Setup">Greenfield Full Setup</option>
                <option value="Maintenance">DevOps Retainer / SRE</option>
                <option value="Cost Optimization">Cost Optimization</option>
                <option value="Migration">Lift &amp; Shift / Refactor</option>
              </select>
            </div>

            <div>
              <label className="block text-neon-cyan mb-2 text-sm font-semibold">
                Expected Timeline
              </label>
              <input
                type="text"
                value={formData.timeline}
                onChange={(e) =>
                  setFormData({ ...formData, timeline: e.target.value })
                }
                placeholder="e.g. 2–4 weeks, ASAP, Q1 2026"
                className="w-full px-4 py-3 bg-cyber-darker/80 border border-neon-blue/40 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/40 transition-all placeholder:text-gray-500"
                disabled={isSubmitting}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-neon-cyan mb-2 text-sm font-semibold">
                Project Details
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 bg-cyber-darker/80 border border-neon-blue/40 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/40 transition-all resize-none placeholder:text-gray-500"
                placeholder="Current stack, environments (dev/stage/prod), cloud provider, traffic scale, main pain points..."
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="relative mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.02, y: -1 } : {}}
              whileTap={!isSubmitting ? { scale: 0.96 } : {}}
              className={`w-full md:w-auto px-10 py-3.5 rounded-xl bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan font-semibold text-white shadow-neon-lg hover:shadow-neon-lg/80 transition-shadow ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Request"}
            </motion.button>

            {status && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-sm ${
                  status.includes("✅") ? "text-emerald-400" : 
                  status.includes("❌") ? "text-red-400" : 
                  "text-neon-cyan/80"
                }`}
              >
                {status}
              </motion.p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
