// src/app/learn/TechnologyDrawer.tsx

'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface TechnologyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  technology: any;
}

// Technology details with comprehensive educational content
const technologyDetails: { [key: string]: any } = {
  docker: {
    name: 'Docker',
    icon: '🐳',
    description: 'Containerization platform for building, shipping, and running applications',
    whyNeeded: 'Docker solves the "it works on my machine" problem by containerizing applications with all their dependencies, ensuring consistent environments across development, testing, and production.',
    problemsSolved: [
      'Environment inconsistency across different stages',
      'Dependency conflicts and version mismatches',
      'Difficult application deployment and scaling',
      'Resource inefficiency compared to virtual machines'
    ],
    alternatives: ['Podman', 'LXC/LXD', 'rkt', 'Containerd'],
    keyConcepts: [
      'Containers vs Virtual Machines',
      'Docker Images and Layers',
      'Dockerfile Best Practices',
      'Container Registry (Docker Hub)',
      'Docker Compose for multi-container apps',
      'Docker Networking and Storage'
    ],
    bestPractices: [
      'Use multi-stage builds to reduce image size',
      'Run containers as non-root user',
      'Use .dockerignore files',
      'Keep containers ephemeral',
      'Scan images for vulnerabilities',
      'Use specific version tags, not "latest"'
    ],
    commonChallenges: [
      'Container security and privilege escalation',
      'Persistent data management',
      'Networking between containers',
      'Image size optimization',
      'Orchestration at scale'
    ],
    useCases: [
      'Microservices architecture deployment',
      'CI/CD pipeline building blocks',
      'Development environment standardization',
      'Application isolation and security',
      'Hybrid cloud deployments'
    ],
    resources: [
      { name: 'Official Docker Documentation', url: 'https://docs.docker.com/', type: '📚' },
      { name: 'Docker Get Started Tutorial', url: 'https://docs.docker.com/get-started/', type: '🎓' },
      { name: 'Dockerfile Best Practices', url: 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/', type: '💡' },
      { name: 'TechWorld with Nana - Docker Tutorial', url: 'https://youtube.com/playlist?list=PLy7NrYWoggjziYQIDorlXjTvvwwe-TO', type: '🎥' },
      { name: 'Docker Cheat Sheet', url: 'https://dockerlabs.collabnix.com/docker/cheatsheet/', type: '📋' }
    ]
  },
  kubernetes: {
    name: 'Kubernetes',
    icon: '☸️',
    description: 'Container orchestration platform for automating deployment, scaling, and management',
    whyNeeded: 'As organizations move from single containers to containerized applications at scale, Kubernetes provides the necessary orchestration to manage complex deployments, ensure high availability, and enable efficient resource utilization.',
    problemsSolved: [
      'Manual container deployment and scaling',
      'Service discovery and load balancing',
      'Storage orchestration across containers',
      'Automated rollouts and rollbacks',
      'Self-healing and automatic bin packing'
    ],
    alternatives: ['Docker Swarm', 'Nomad', 'Apache Mesos', 'OpenShift'],
    keyConcepts: [
      'Pods, Services, Deployments',
      'ReplicaSets and StatefulSets',
      'ConfigMaps and Secrets',
      'Persistent Volumes',
      'Ingress Controllers',
      'Helm Charts for packaging',
      'Custom Resource Definitions (CRDs)'
    ],
    bestPractices: [
      'Use namespaces for environment separation',
      'Implement resource requests and limits',
      'Use readiness and liveness probes',
      'Secure with RBAC and network policies',
      'Monitor with Prometheus and Grafana',
      'Backup etcd regularly'
    ],
    commonChallenges: [
      'Steep learning curve',
      'Complex networking setup',
      'Storage management complexity',
      'Security configuration',
      'Cluster maintenance and upgrades'
    ],
    useCases: [
      'Large-scale microservices deployment',
      'Hybrid and multi-cloud applications',
      'Machine learning workflow orchestration',
      'High-availability web applications',
      'Batch processing and data pipelines'
    ],
    resources: [
      { name: 'Kubernetes Official Docs', url: 'https://kubernetes.io/docs/', type: '📚' },
      { name: 'Kubernetes Tutorials', url: 'https://kubernetes.io/docs/tutorials/', type: '🎓' },
      { name: 'Kubernetes The Hard Way', url: 'https://github.com/kelseyhightower/kubernetes-the-hard-way', type: '💪' },
      { name: 'TechWorld with Nana - Kubernetes', url: 'https://youtube.com/playlist?list=PLy7NrYWoggjwyn48CO__1FqB6W0uZ4c', type: '🎥' },
      { name: 'Kubernetes Cheat Sheet', url: 'https://kubernetes.io/docs/reference/kubectl/cheatsheet/', type: '📋' }
    ]
  },
  terraform: {
    name: 'Terraform',
    icon: '🏗️',
    description: 'Infrastructure as Code tool for building, changing, and versioning infrastructure',
    whyNeeded: 'Terraform enables teams to define and provision infrastructure using declarative configuration files, bringing version control, collaboration, and reproducibility to infrastructure management.',
    problemsSolved: [
      'Manual infrastructure provisioning',
      'Environment drift and inconsistency',
      'Lack of infrastructure documentation',
      'Difficult disaster recovery',
      'No version control for infrastructure'
    ],
    alternatives: ['Pulumi', 'AWS CloudFormation', 'Ansible', 'Crossplane'],
    keyConcepts: [
      'HCL (HashiCorp Configuration Language)',
      'Providers and Resources',
      'State Management',
      'Modules and Workspaces',
      'Plan and Apply workflow',
      'Data Sources',
      'Backends for state storage'
    ],
    bestPractices: [
      'Use remote state storage with locking',
      'Modularize configurations',
      'Implement policy as code with Sentinel',
      'Use workspaces for environment separation',
      'Version and tag all infrastructure',
      'Secure sensitive values with Vault'
    ],
    commonChallenges: [
      'State file management and conflicts',
      'Provider version compatibility',
      'Complex dependency management',
      'Debugging failed applies',
      'Cost estimation and control'
    ],
    useCases: [
      'Multi-cloud infrastructure provisioning',
      'Kubernetes cluster deployment',
      'Database and storage setup',
      'Network infrastructure automation',
      'Disaster recovery automation'
    ],
    resources: [
      { name: 'Terraform Documentation', url: 'https://www.terraform.io/docs', type: '📚' },
      { name: 'Terraform Learn', url: 'https://learn.hashicorp.com/terraform', type: '🎓' },
      { name: 'Terraform Best Practices', url: 'https://www.terraform-best-practices.com/', type: '💡' },
      { name: 'HashiCorp YouTube Channel', url: 'https://www.youtube.com/c/HashiCorp', type: '🎥' },
      { name: 'Terraform Registry', url: 'https://registry.terraform.io/', type: '📦' }
    ]
  },
  // Default content for other technologies
  default: {
    name: 'Technology',
    icon: '🔧',
    description: 'Learn this essential DevOps technology',
    whyNeeded: 'This technology addresses critical challenges in modern software development and operations.',
    problemsSolved: [
      'Infrastructure management complexity',
      'Deployment consistency issues',
      'Scalability challenges',
      'Monitoring and observability gaps'
    ],
    alternatives: ['Alternative tools and platforms'],
    keyConcepts: [
      'Fundamental concepts and principles',
      'Core components and architecture',
      'Integration patterns',
      'Best practices and workflows'
    ],
    bestPractices: [
      'Follow security best practices',
      'Implement proper monitoring',
      'Use version control',
      'Document your configurations'
    ],
    commonChallenges: [
      'Learning curve',
      'Integration complexity',
      'Performance optimization',
      'Security configuration'
    ],
    useCases: [
      'Enterprise application deployment',
      'Cloud infrastructure management',
      'CI/CD pipeline implementation',
      'Monitoring and observability'
    ],
    resources: [
      { name: 'Official Documentation', url: '#', type: '📚' },
      { name: 'Getting Started Guide', url: '#', type: '🎓' },
      { name: 'Best Practices', url: '#', type: '💡' },
      { name: 'Community Tutorials', url: '#', type: '🎥' }
    ]
  }
};

export default function TechnologyDrawer({ isOpen, onClose, technology }: TechnologyDrawerProps) {
  const details = technology ? (technologyDetails[technology.id] || technologyDetails.default) : null;

  if (!details) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-2xl bg-gray-900/95 backdrop-blur-xl border-l border-cyan-500/30 shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gray-900/95 backdrop-blur-lg border-b border-cyan-500/20 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{technology?.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{technology?.name}</h2>
                    <p className="text-cyan-300">{technology?.description}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-cyan-900/30 border border-cyan-500/50 hover:bg-cyan-800/40 transition-all duration-300"
                >
                  <svg className="w-6 h-6 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Why Needed */}
              <section>
                <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center">
                  <span className="mr-2">❓</span>
                  Why Learn {technology?.name}?
                </h3>
                <p className="text-gray-300 leading-relaxed">{details.whyNeeded}</p>
              </section>

              {/* Problems Solved */}
              <section>
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center">
                  <span className="mr-2">🎯</span>
                  Problems It Solves
                </h3>
                <ul className="space-y-2">
                  {details.problemsSolved.map((problem: string, index: number) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <span className="text-green-400 mr-2">•</span>
                      {problem}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Alternatives */}
              <section>
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
                  <span className="mr-2">🔄</span>
                  Alternatives
                </h3>
                <div className="flex flex-wrap gap-2">
                  {details.alternatives.map((alt: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-yellow-900/30 border border-yellow-500/30 rounded-full text-yellow-300 text-sm"
                    >
                      {alt}
                    </span>
                  ))}
                </div>
              </section>

              {/* Key Concepts */}
              <section>
                <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center">
                  <span className="mr-2">🧠</span>
                  Key Concepts to Master
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {details.keyConcepts.map((concept: string, index: number) => (
                    <div
                      key={index}
                      className="p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg text-purple-300 text-sm"
                    >
                      {concept}
                    </div>
                  ))}
                </div>
              </section>

              {/* Best Practices */}
              <section>
                <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center">
                  <span className="mr-2">⭐</span>
                  Best Practices
                </h3>
                <ul className="space-y-2">
                  {details.bestPractices.map((practice: string, index: number) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <span className="text-blue-400 mr-2">•</span>
                      {practice}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Common Challenges */}
              <section>
                <h3 className="text-xl font-bold text-orange-400 mb-4 flex items-center">
                  <span className="mr-2">⚠️</span>
                  Common Challenges
                </h3>
                <ul className="space-y-2">
                  {details.commonChallenges.map((challenge: string, index: number) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <span className="text-orange-400 mr-2">•</span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Use Cases */}
              <section>
                <h3 className="text-xl font-bold text-pink-400 mb-4 flex items-center">
                  <span className="mr-2">🚀</span>
                  Real-life Use Cases
                </h3>
                <ul className="space-y-2">
                  {details.useCases.map((useCase: string, index: number) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <span className="text-pink-400 mr-2">•</span>
                      {useCase}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Learning Resources */}
              <section>
                <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center">
                  <span className="mr-2">📚</span>
                  Learning Resources
                </h3>
                <div className="space-y-3">
                  {details.resources.map((resource: any, index: number) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg hover:bg-cyan-900/20 hover:border-cyan-400/50 transition-all duration-300 group"
                    >
                      <span className="text-lg mr-3">{resource.type}</span>
                      <span className="text-cyan-300 group-hover:text-cyan-200 flex-1">
                        {resource.name}
                      </span>
                      <span className="text-gray-400 group-hover:text-cyan-300">↗</span>
                    </a>
                  ))}
                </div>
              </section>
            </div>

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-lg border-t border-cyan-500/20 p-6 -mx-6 -mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Start Learning Path
                </button>
                <button 
                  onClick={onClose}
                  className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all duration-300 border border-gray-600"
                >
                  Save for Later
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}