'use client';
import { motion } from 'framer-motion';
import GlassCard from '@/src/components/ui/GlassCard';

export default function JobsPage() {
  const jobs = [
    {
      title: 'Senior DevOps Engineer',
      company: 'Tech Corp',
      location: 'Remote',
      type: 'Full-time',
      salary: '$120k - $180k',
      description: 'Looking for experienced DevOps engineer with AWS and Kubernetes expertise.',
    },
    {
      title: 'Cloud Infrastructure Engineer',
      company: 'StartUp Inc',
      location: 'Hybrid',
      type: 'Full-time',
      salary: '$100k - $150k',
      description: 'Build and maintain cloud infrastructure on GCP and Azure.',
    },
    {
      title: 'Site Reliability Engineer',
      company: 'Enterprise Solutions',
      location: 'On-site',
      type: 'Full-time',
      salary: '$130k - $200k',
      description: 'Ensure high availability and performance of production systems.',
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
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent">
            Latest DevOps Jobs
          </h1>
          <p className="text-xl text-center text-gray-400 mb-12">
            Find your next DevOps opportunity
          </p>

          <div className="space-y-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <GlassCard>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-neon-cyan mb-2">{job.title}</h3>
                      <p className="text-gray-400 mb-3">{job.description}</p>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="px-3 py-1 bg-neon-purple/20 border border-neon-purple/30 rounded-full text-neon-purple">
                          {job.company}
                        </span>
                        <span className="px-3 py-1 bg-neon-blue/20 border border-neon-blue/30 rounded-full text-neon-blue">
                          {job.location}
                        </span>
                        <span className="px-3 py-1 bg-neon-pink/20 border border-neon-pink/30 rounded-full text-neon-pink">
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-neon-cyan mb-2">{job.salary}</p>
                      <button className="px-6 py-2 bg-gradient-to-r from-neon-pink to-neon-purple rounded-lg font-semibold hover:scale-105 transition-transform">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
