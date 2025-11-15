'use client';
import { motion } from 'framer-motion';
import GlassCard from '@/src/components/ui/GlassCard';

export default function DocsPage() {
  const docCategories = [
    {
      title: 'Getting Started',
      icon: '🚀',
      docs: ['Quick Start Guide', 'Installation', 'Configuration', 'First Deployment'],
    },
    {
      title: 'Infrastructure',
      icon: '🏗️',
      docs: ['AWS Setup', 'GCP Configuration', 'Azure Deployment', 'Multi-Cloud'],
    },
    {
      title: 'CI/CD',
      icon: '🔄',
      docs: ['Pipeline Setup', 'GitHub Actions', 'Jenkins Integration', 'ArgoCD'],
    },
    {
      title: 'Monitoring',
      icon: '📊',
      docs: ['Prometheus Setup', 'Grafana Dashboards', 'Alert Configuration', 'Log Analysis'],
    },
  ];

  return (
    <div className="min-h-screen pt-24 px-6 bg-gradient-to-br from-cyber-darker to-cyber-dark">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
            Documentation
          </h1>
          <p className="text-xl text-center text-gray-400 mb-12">
            Comprehensive guides and references for all your DevOps needs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {docCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard>
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-4">{category.icon}</span>
                    <h3 className="text-2xl font-bold text-neon-cyan">{category.title}</h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {category.docs.map((doc) => (
                      <li key={doc}>
                        <a
                          href="#"
                          className="flex items-center text-gray-300 hover:text-neon-cyan transition-colors group"
                        >
                          <span className="text-neon-pink mr-2 group-hover:mr-3 transition-all">▸</span>
                          {doc}
                        </a>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <GlassCard className="inline-block">
              <p className="text-lg text-gray-300">
                Can&apos;t find what you&apos;re looking for?{' '}
                <a href="#" className="text-neon-cyan hover:underline">
                  Search documentation
                </a>
              </p>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
