'use client';
import { motion } from 'framer-motion';
import GlassCard from '@/src/components/ui/GlassCard';

export default function ServicesSection() {
  const services = [
    {
      icon: '☁️',
      title: 'Cloud Infrastructure',
      description: 'AWS, GCP, Azure - Complete cloud setup and migration services.',
      features: ['Infrastructure as Code', 'Auto-scaling', 'Cost Optimization'],
    },
    {
      icon: '🔄',
      title: 'CI/CD Pipeline',
      description: 'Automated deployment pipelines for faster, reliable releases.',
      features: ['GitHub Actions', 'Jenkins', 'ArgoCD'],
    },
    {
      icon: '🐳',
      title: 'Container Orchestration',
      description: 'Docker and Kubernetes deployment and management.',
      features: ['K8s Clusters', 'Helm Charts', 'Service Mesh'],
    },
    {
      icon: '📊',
      title: 'Monitoring & Logging',
      description: 'Complete observability with advanced monitoring solutions.',
      features: ['Prometheus', 'Grafana', 'ELK Stack'],
    },
    {
      icon: '🔐',
      title: 'Security & Compliance',
      description: 'Enterprise-grade security and compliance automation.',
      features: ['IAM Policies', 'Secret Management', 'Compliance Scanning'],
    },
    {
      icon: '⚡',
      title: 'Performance Optimization',
      description: 'Optimize infrastructure for speed, reliability, and cost.',
      features: ['Load Balancing', 'Caching', 'CDN Integration'],
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-cyber-dark to-cyber-darker">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-xl text-gray-400">
            End-to-end DevOps solutions for modern infrastructure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard>
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-neon-cyan mb-3">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-400">
                      <span className="text-neon-pink mr-2">▸</span>
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
