'use client';
import { motion } from 'framer-motion';
import GlassCard from '@/src/components/ui/GlassCard';

export default function LearnPage() {
  const courses = [
    {
      title: 'Docker Fundamentals',
      level: 'Beginner',
      duration: '4 weeks',
      description: 'Learn containerization from scratch with hands-on projects.',
      topics: ['Container Basics', 'Dockerfile', 'Docker Compose', 'Networking'],
    },
    {
      title: 'Kubernetes Mastery',
      level: 'Intermediate',
      duration: '8 weeks',
      description: 'Master container orchestration and deployment strategies.',
      topics: ['Pods & Services', 'Deployments', 'Helm', 'Operators'],
    },
    {
      title: 'AWS Cloud Architecture',
      level: 'Advanced',
      duration: '12 weeks',
      description: 'Design and deploy scalable cloud infrastructure on AWS.',
      topics: ['EC2 & VPC', 'EKS', 'RDS', 'Lambda & Serverless'],
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
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            Learn DevOps
          </h1>
          <p className="text-xl text-center text-gray-400 mb-12">
            Master the skills needed to excel in modern DevOps
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <GlassCard className="h-full">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        course.level === 'Beginner' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {course.level}
                      </span>
                      <span className="text-neon-cyan text-sm">{course.duration}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-neon-cyan mb-3">{course.title}</h3>
                    <p className="text-gray-400 mb-4 flex-grow">{course.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      {course.topics.map((topic) => (
                        <div key={topic} className="flex items-center text-sm text-gray-300">
                          <span className="text-neon-pink mr-2">✓</span>
                          {topic}
                        </div>
                      ))}
                    </div>
                    
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-semibold hover:scale-105 transition-transform">
                      Start Learning
                    </button>
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
