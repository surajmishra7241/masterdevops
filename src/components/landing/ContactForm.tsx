"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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

  // CAPTCHA state
  const [captcha, setCaptcha] = useState<{
    captchaId: string;
    captchaArt: string; // use captchaArt from backend
  } | null>(null);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);

  // Check if mandatory fields are filled
  const mandatoryFieldsFilled = () =>
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.message.trim() !== "";

  // Fetch CAPTCHA when mandatory fields are filled
  useEffect(() => {
    if (mandatoryFieldsFilled() && !showCaptcha) {
      fetchCaptcha();
      setShowCaptcha(true);
    }
    if (!mandatoryFieldsFilled() && showCaptcha) {
      // Reset captcha if mandatory fields cleared
      setCaptcha(null);
      setCaptchaInput("");
      setCaptchaVerified(false);
      setShowCaptcha(false);
    }
  }, [formData.name, formData.email, formData.message]);

  // Fetch CAPTCHA from backend
  const fetchCaptcha = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.masterdevops.in";
      const response = await fetch(`${apiUrl}/api/captcha`);
      const data = await response.json();
      if (data.success) {
        setCaptcha({ captchaId: data.captchaId, captchaArt: data.captchaArt });
      }
    } catch (error) {
      console.error("Failed to fetch CAPTCHA", error);
    }
  };

  // Verify CAPTCHA before sending form
  const verifyCaptcha = async () => {
    if (!captcha) return false;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.masterdevops.in";
      const response = await fetch(`${apiUrl}/api/captcha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ captchaId: captcha.captchaId, userInput: captchaInput }),
      });
      const data = await response.json();
      return data.success;
    } catch {
      return false;
    }
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    setIsSubmitting(true);

    if (!captchaVerified) {
      const validCaptcha = await verifyCaptcha();
      if (!validCaptcha) {
        setStatus("Incorrect CAPTCHA, please try again.");
        setIsSubmitting(false);
        fetchCaptcha(); // refresh captcha
        setCaptchaInput("");
        return;
      } else {
        setCaptchaVerified(true);
      }
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.masterdevops.in";
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus("Message sent successfully! Expect a response within 24 hours.");
        setFormData({ name: "", email: "", message: "", service: "AWS", timeline: "" });
        setCaptcha(null);
        setCaptchaInput("");
        setCaptchaVerified(false);
        setShowCaptcha(false);
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      setStatus("Error sending message. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 px-6 bg-gradient-to-b from-cyber-darker via-cyber-dark to-cyber-darker overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cyber-grid opacity-60 mix-blend-screen"
        aria-hidden="true"
      />
      <div className="relative container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-neon-cyan drop-shadow-[0_0_10px_rgba(0,255,255,0.9)]">
            Launch Your DevOps Platform
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
            Share your stack, cloud provider, and timelines. Receive a tailored blueprint for CICD,
            Kubernetes, observability, and security automation.
          </p>
        </motion.div>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative glass-card border border-neon-purple40 shadow-neon-lg px-6 py-6 md:px-8 md:py-8"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-neon-cyan mb-2 text-sm font-semibold">Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-cyber-darker80 border border-neon-blue40 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan40 placeholder-gray-500"
                placeholder="Your name"
                disabled={isSubmitting}
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-neon-cyan mb-2 text-sm font-semibold">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-cyber-darker80 border border-neon-blue40 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan40 placeholder-gray-500"
                placeholder="you@example.com"
                disabled={isSubmitting}
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-neon-cyan mb-2 text-sm font-semibold">Service Interest</label>
              <select
                className="w-full px-4 py-3 bg-cyber-darker80 border border-neon-blue40 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan40"
                value={formData.service}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, service: e.target.value }))
                }
                disabled={isSubmitting}
              >
                <option value="AWS">AWS Infra Setup</option>
                <option value="GCP">GCP Infra Setup</option>
                <option value="Azure">Azure Infra Setup</option>
                <option value="On-Prem">On-Prem Hybrid</option>
                <option value="Full Setup">Greenfield Full Setup</option>
                <option value="Maintenance">DevOps Retainer / SRE</option>
                <option value="Cost Optimization">Cost Optimization</option>
                <option value="Migration">Lift & Shift & Refactor</option>
              </select>
            </div>
            <div>
              <label className="block text-neon-cyan mb-2 text-sm font-semibold">Expected Timeline</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-cyber-darker80 border border-neon-blue40 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan40 placeholder-gray-500"
                placeholder="e.g. 24 weeks, ASAP, Q1 2026"
                disabled={isSubmitting}
                value={formData.timeline}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, timeline: e.target.value }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-neon-cyan mb-2 text-sm font-semibold">Project Details</label>
              <textarea
                required
                rows={5}
                className="w-full px-4 py-3 bg-cyber-darker80 border border-neon-blue40 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan40 resize-none placeholder-gray-500"
                placeholder="Current stack, environments dev/stage/prod, cloud provider, traffic scale, main pain points..."
                disabled={isSubmitting}
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
              />
            </div>
          </div>

          {/* CAPTCHA Section */}
          {showCaptcha && captcha && (
            <div className="mt-8 p-4 border border-neon-cyan rounded-lg bg-cyber-dark flex flex-col items-start gap-2">
              <label className="text-neon-cyan font-semibold mb-2 block">
                Please enter the CAPTCHA shown below:
              </label>
              <div className="flex items-center gap-4 mb-2">
                <pre
                  className="select-none px-4 py-2 rounded bg-cyber-darker border border-neon-purple text-neon-purple font-mono text-xl tracking-widest whitespace-pre-wrap"
                  aria-label="CAPTCHA art"
                >
                  {captcha.captchaArt}
                </pre>
                <button
                  type="button"
                  onClick={() => fetchCaptcha()}
                  className="text-neon-pink underline text-sm hover:text-neon-purple transition"
                >
                  Refresh
                </button>
              </div>
              <input
                type="text"
                required
                placeholder="Enter CAPTCHA"
                className="w-48 px-4 py-2 bg-cyber-darker border border-neon-blue40 rounded text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan40 font-mono tracking-widest"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                disabled={isSubmitting}
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          )}

          <div className="relative mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <motion.button
              type="submit"
              disabled={isSubmitting || (showCaptcha && !captchaVerified && !captchaInput)}
              whileHover={!isSubmitting ? { scale: 1.02, y: -1 } : undefined}
              whileTap={!isSubmitting ? { scale: 0.96 } : undefined}
              className="w-full md:w-auto px-10 py-3.5 rounded-xl bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan font-semibold text-white shadow-neon-lg hover:shadow-neon-lg/80 transition-shadow disabled:opacity-50 cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Request"}
            </motion.button>
            {status && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-sm ${
                  status.toLowerCase().includes("error") || status.toLowerCase().includes("incorrect")
                    ? "text-red-400"
                    : "text-emerald-400"
                } text-neon-cyan-80`}
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
