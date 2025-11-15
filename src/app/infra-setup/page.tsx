'use client';
import { motion } from 'framer-motion';
import GlassCard from '@/src/components/ui/GlassCard';
import NeonButton from '@/src/components/ui/NeonButton';

export default function InfraSetupPage() {
  const packages = [
    {
      name: 'Starter',
      price: '$2,999',
      features: [
        'Single Cloud Platform (AWS/GCP/Azure)',
        'Basic CI/CD Pipeline',
        'Docker & Kubernetes Setup',
        'Monitoring Dashboard',
        '30 Days Support',
      ],
      recommended: false,
    },
    {
      name: 'Professional',
      price: '$6,999',
      features: [
        'Multi-Cloud Setup',
        'Advanced CI/CD with GitOps',
        'Full K8s Cluster Management',
        'Complete Monitoring & Logging',
        'Security & Compliance',
        '90 Days Support',
      ],
      recommended: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Everything in Professional',
        'Dedicated DevOps Team',
        'Custom Infrastructure Design',
        'High Availability Setup',
        'Disaster Recovery',
        'Ongoing Maintenance',
      ],
      recommended: false,
    },
  ];

  return (
    <div className="min-h-screen pt-24 px-6 bg-gradient-to-br from-cyber-darker to-cyber-dark">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan bg-clip-text text-transparent">
            Infrastructure Setup Packages
          </h1>
          <p className="text-xl text-center text-gray-400 mb-12">
            Choose the perfect package for your infrastructure needs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                {pkg.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-4 py-1 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full text-sm font-bold">
                      Recommended
                    </span>
                  </div>
                )}
                
                <GlassCard className={`h-full ${pkg.recommended ? 'border-neon-purple' : ''}`}>
                  <div className="text-center mb-6">
                    <h3 className="text-3xl font-bold text-neon-cyan mb-2">{pkg.name}</h3>
                    <p className="text-4xl font-bold text-white">{pkg.price}</p>
                    {pkg.price !== 'Custom' && <p className="text-gray-400 text-sm">one-time setup</p>}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start text-gray-300">
                        <span className="text-neon-pink mr-3 mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <NeonButton
                    variant={pkg.recommended ? 'primary' : 'outline'}
                    className="w-full"
                  >
                    {pkg.price === 'Custom' ? 'Contact Us' : 'Get Started'}
                  </NeonButton>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <GlassCard className="inline-block">
              <p className="text-lg text-gray-300 mb-4">
                Need a custom solution? Let&apos;s discuss your requirements.
              </p>
              <NeonButton variant="secondary">Schedule Consultation</NeonButton>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
