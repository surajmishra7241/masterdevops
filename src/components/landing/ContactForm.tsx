'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    service: 'AWS',
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully! 🚀');
        setFormData({ name: '', email: '', message: '', service: 'AWS' });
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('Error sending message.');
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-cyber-darker to-cyber-dark">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent">
            Get In Touch
          </h2>

          <form
            onSubmit={handleSubmit}
            className="bg-cyber-dark/40 backdrop-blur-xl border border-neon-purple/30 rounded-2xl p-8 shadow-2xl shadow-neon-purple/20"
          >
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-neon-cyan mb-2 font-semibold">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-cyber-darker/80 border border-neon-blue/30 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/50 transition-all"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-neon-cyan mb-2 font-semibold">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-cyber-darker/80 border border-neon-blue/30 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/50 transition-all"
                  placeholder="your@email.com"
                />
              </div>

              {/* Service Dropdown */}
              <div>
                <label className="block text-neon-cyan mb-2 font-semibold">Service Interest</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 bg-cyber-darker/80 border border-neon-blue/30 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/50 transition-all"
                >
                  <option value="AWS">AWS</option>
                  <option value="GCP">GCP</option>
                  <option value="Azure">Azure</option>
                  <option value="On-Prem">On-Prem</option>
                  <option value="Full Setup">Full Setup</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Cost Optimization">Cost Optimization</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-neon-cyan mb-2 font-semibold">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-cyber-darker/80 border border-neon-blue/30 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/50 transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan rounded-lg font-bold text-white shadow-lg shadow-neon-purple/50 hover:shadow-neon-cyan/70 transition-all"
              >
                Send Message
              </motion.button>

              {status && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-neon-cyan mt-4"
                >
                  {status}
                </motion.p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
