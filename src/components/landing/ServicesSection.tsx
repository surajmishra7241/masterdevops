"use client";

import { motion } from "framer-motion";
import GlassCard from "../../components/ui/GlassCard";

const services = [
  {
    icon: "⚙️",
    title: "Cloud Infrastructure",
    description: "AWS, GCP, Azure – complete cloud setup and migration.",
    features: ["Infrastructure as Code", "Auto-scaling", "Cost Optimization"],
  },
  {
    icon: "🚀",
    title: "CI/CD Pipelines",
    description: "Automated delivery pipelines for safe, frequent releases.",
    features: ["GitHub Actions", "Jenkins", "ArgoCD"],
  },
  {
    icon: "🐳",
    title: "Container Orchestration",
    description: "Kubernetes platforms tuned for production workloads.",
    features: ["Managed EKS/GKE/AKS", "Helm Charts", "Service Mesh"],
  },
  {
    icon: "📊",
    title: "Monitoring & Logging",
    description: "Full observability with metric, log, and trace pipelines.",
    features: ["Prometheus", "Grafana", "ELK / OpenSearch"],
  },
  {
    icon: "🛡️",
    title: "Security & Compliance",
    description: "Security baked into infra and pipelines by default.",
    features: ["IAM Hardening", "Secrets Management", "Policy as Code"],
  },
  {
    icon: "⚡",
    title: "Performance Optimization",
    description: "Improve latency, reliability, and cloud spend.",
    features: ["Load Balancing", "Caching", "CDN Integration"],
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="py-20 px-6 bg-gradient-to-b from-cyber-dark to-cyber-darker"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
            DevOps Services
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            End‑to‑end platform engineering: infra, delivery, security, and
            observability shipped as code.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <GlassCard>
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-neon-cyan mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <span className="text-neon-pink mr-2">▹</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
