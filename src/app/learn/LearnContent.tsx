// src/app/learn/LearnContent.tsx

'use client';

import { useState, useMemo } from 'react';

interface LearnContentProps {
  selectedCategory: string;
  onTechnologyClick: (technology: any) => void;
}

interface Technology {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

const technologies: Technology[] = [
  // Fundamentals
  { id: 'linux', name: 'Linux', category: 'fundamentals', description: 'Master Linux administration and shell scripting', icon: '🐧', difficulty: 'Beginner', progress: 0 },
  { id: 'git', name: 'Git & GitHub', category: 'fundamentals', description: 'Version control and collaboration workflows', icon: '📚', difficulty: 'Beginner', progress: 0 },
  { id: 'networking', name: 'Networking', category: 'fundamentals', description: 'TCP/IP, DNS, Load Balancers, and more', icon: '🌐', difficulty: 'Intermediate', progress: 0 },
  { id: 'scripting', name: 'Scripting', category: 'fundamentals', description: 'Bash, Python, and automation scripts', icon: '💻', difficulty: 'Beginner', progress: 0 },
  { id: 'security', name: 'Security Basics', category: 'fundamentals', description: 'DevSecOps and security practices', icon: '🔒', difficulty: 'Intermediate', progress: 0 },

  // Containers
  { id: 'docker', name: 'Docker', category: 'containers', description: 'Containerization and image management', icon: '🐳', difficulty: 'Beginner', progress: 0, isFeatured: true },
  { id: 'docker-compose', name: 'Docker Compose', category: 'containers', description: 'Multi-container applications', icon: '📦', difficulty: 'Beginner', progress: 0 },
  { id: 'podman', name: 'Podman', category: 'containers', description: 'Daemonless container engine', icon: '🛸', difficulty: 'Intermediate', progress: 0, isNew: true },
  { id: 'containerd', name: 'containerd', category: 'containers', description: 'Industry-standard container runtime', icon: '⚙️', difficulty: 'Advanced', progress: 0 },

  // Orchestration
  { id: 'kubernetes', name: 'Kubernetes', category: 'orchestration', description: 'Container orchestration at scale', icon: '☸️', difficulty: 'Intermediate', progress: 0, isFeatured: true },
  { id: 'helm', name: 'Helm', category: 'orchestration', description: 'Kubernetes package manager', icon: '🎯', difficulty: 'Intermediate', progress: 0 },
  { id: 'openshift', name: 'OpenShift', category: 'orchestration', description: 'Enterprise Kubernetes platform', icon: '🔴', difficulty: 'Advanced', progress: 0 },

  // Cloud Platforms
  { id: 'aws', name: 'AWS', category: 'cloud', description: 'Amazon Web Services cloud platform', icon: '☁️', difficulty: 'Intermediate', progress: 0, isFeatured: true },
  { id: 'azure', name: 'Azure', category: 'cloud', description: 'Microsoft cloud services', icon: '🔷', difficulty: 'Intermediate', progress: 0 },
  { id: 'gcp', name: 'Google Cloud', category: 'cloud', description: 'Google Cloud Platform', icon: '🔶', difficulty: 'Intermediate', progress: 0 },
  { id: 'digitalocean', name: 'DigitalOcean', category: 'cloud', description: 'Developer-friendly cloud platform', icon: '🌊', difficulty: 'Beginner', progress: 0 },

  // Infrastructure as Code
  { id: 'terraform', name: 'Terraform', category: 'iac', description: 'Infrastructure as Code tool', icon: '🏗️', difficulty: 'Intermediate', progress: 0, isFeatured: true },
  { id: 'ansible', name: 'Ansible', category: 'iac', description: 'Configuration management and automation', icon: '⚡', difficulty: 'Intermediate', progress: 0 },
  { id: 'pulumi', name: 'Pulumi', category: 'iac', description: 'Infrastructure as Code using real languages', icon: '🚀', difficulty: 'Advanced', progress: 0, isNew: true },
  { id: 'cloudformation', name: 'CloudFormation', category: 'iac', description: 'AWS infrastructure as code', icon: '📄', difficulty: 'Intermediate', progress: 0 },

  // CI/CD
  { id: 'jenkins', name: 'Jenkins', category: 'cicd', description: 'Automation server for CI/CD', icon: '🤖', difficulty: 'Intermediate', progress: 0 },
  { id: 'github-actions', name: 'GitHub Actions', category: 'cicd', description: 'CI/CD built into GitHub', icon: '⚙️', difficulty: 'Beginner', progress: 0, isFeatured: true },
  { id: 'gitlab-ci', name: 'GitLab CI/CD', category: 'cicd', description: 'Integrated CI/CD in GitLab', icon: '🦊', difficulty: 'Intermediate', progress: 0 },
  { id: 'argo-cd', name: 'Argo CD', category: 'cicd', description: 'Declarative GitOps continuous delivery', icon: '🎯', difficulty: 'Advanced', progress: 0, isNew: true },

  // Monitoring
  { id: 'prometheus', name: 'Prometheus', category: 'monitoring', description: 'Systems monitoring and alerting', icon: '📊', difficulty: 'Intermediate', progress: 0 },
  { id: 'grafana', name: 'Grafana', category: 'monitoring', description: 'Observability and dashboards', icon: '📈', difficulty: 'Beginner', progress: 0 },
  { id: 'elk', name: 'ELK Stack', category: 'monitoring', description: 'Log analysis and visualization', icon: '🔍', difficulty: 'Intermediate', progress: 0 },
  { id: 'datadog', name: 'Datadog', category: 'monitoring', description: 'Cloud-scale monitoring', icon: '🐶', difficulty: 'Intermediate', progress: 0 },
];

const learningSequence = [
  { step: 1, technology: 'Linux & Git', duration: '2 weeks', importance: 'Foundation' },
  { step: 2, technology: 'Networking Basics', duration: '1 week', importance: 'Core' },
  { step: 3, technology: 'Docker & Containers', duration: '3 weeks', importance: 'Essential' },
  { step: 4, technology: 'AWS Fundamentals', duration: '3 weeks', importance: 'Core' },
  { step: 5, technology: 'Terraform (IaC)', duration: '2 weeks', importance: 'Essential' },
  { step: 6, technology: 'Kubernetes', duration: '4 weeks', importance: 'Advanced' },
  { step: 7, technology: 'CI/CD Pipelines', duration: '2 weeks', importance: 'Essential' },
  { step: 8, technology: 'Monitoring & Logging', duration: '2 weeks', importance: 'Core' },
  { step: 9, technology: 'Security (DevSecOps)', duration: '2 weeks', importance: 'Advanced' },
  { step: 10, technology: 'Advanced Cloud & Automation', duration: '3 weeks', importance: 'Expert' },
];

// Learning path technology mappings
const learningPathTechnologies: { [key: string]: string[] } = {
  'path-beginner': ['linux', 'git', 'docker', 'github-actions', 'grafana'],
  'path-intermediate': ['kubernetes', 'aws', 'terraform', 'ansible', 'prometheus'],
  'path-advanced': ['helm', 'argo-cd', 'jenkins', 'security', 'networking'],
  'path-expert': ['openshift', 'pulumi', 'scripting', 'containerd']
};

export default function LearnContent({ selectedCategory, onTechnologyClick }: LearnContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredTechnologies = useMemo(() => {
    let filtered = technologies.filter(tech => {
      if (selectedCategory.startsWith('path-')) {
        const pathId = selectedCategory.replace('path-', '');
        return learningPathTechnologies[pathId]?.includes(tech.id) || false;
      }
      return (selectedCategory === 'all' || tech.category === selectedCategory) &&
        tech.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Sort the filtered technologies
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'difficulty':
          const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'progress':
          return b.progress - a.progress;
        default:
          return 0;
      }
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-900/30 border-green-500/50';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/50';
      case 'Advanced': return 'text-red-400 bg-red-900/30 border-red-500/50';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-500/50';
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2 neon-text animate-glow">
          DevOps Learning Path
        </h1>
        <p className="text-gray-300 text-lg">
          Master the complete DevOps ecosystem with hands-on projects and real-world scenarios
        </p>
      </div>

      {/* Controls */}
      <div className="glass-subtle p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-cyan-500/30 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-gray-900/50 border border-cyan-500/30 rounded-xl text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
          >
            <option value="name">Sort by Name</option>
            <option value="difficulty">Sort by Difficulty</option>
            <option value="progress">Sort by Progress</option>
          </select>
        </div>
      </div>

      {/* Technologies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {filteredTechnologies.map((tech) => (
          <div
            key={tech.id}
            className="hologram-card p-5 lg:p-6 group cursor-pointer transform transition-all duration-500 hover:scale-105"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl lg:text-3xl">{tech.icon}</div>
                <div>
                  <h3 className="font-bold text-white text-lg lg:text-xl group-hover:text-cyan-300 transition-colors">
                    {tech.name}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(tech.difficulty)}`}>
                    {tech.difficulty}
                  </span>
                </div>
              </div>
              <div className="flex space-x-1">
                {tech.isNew && (
                  <span className="hologram-badge text-xs px-2 py-1 rounded-full">NEW</span>
                )}
                {tech.isFeatured && (
                  <span className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-1 rounded-full border border-yellow-500/30">
                    FEATURED
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm lg:text-base mb-4 leading-relaxed">
              {tech.description}
            </p>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Progress</span>
                <span>{tech.progress}%</span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${tech.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Action Button */}
            <button 
              onClick={() => onTechnologyClick(tech)}
              className="w-full mt-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Start Learning
            </button>
          </div>
        ))}
      </div>

      {filteredTechnologies.length === 0 && (
        <div className="glass-card p-8 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-300 mb-2">No technologies found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Recommended Learning Sequence */}
      <div className="glass-card p-6 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            🎯 Recommended Learning Sequence
          </h2>
          <span className="text-xs bg-cyan-900/30 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30">
            Optimized Path
          </span>
        </div>

        <p className="text-gray-300 mb-6 text-sm lg:text-base leading-relaxed">
          Follow this carefully curated learning sequence to build your DevOps skills systematically. 
          Each step builds upon the previous one for maximum learning efficiency.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {learningSequence.map((item) => (
            <div
              key={item.step}
              className="group relative p-4 rounded-xl border border-cyan-500/20 bg-gradient-to-br from-gray-900/50 to-gray-800/30 hover:from-cyan-900/20 hover:to-purple-900/20 transition-all duration-500 hover:scale-105 hover:border-cyan-400/40"
            >
              {/* Step Number */}
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">
                {item.step}
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="font-semibold text-white text-xs lg:text-sm leading-tight group-hover:text-cyan-300 transition-colors">
                  {item.technology}
                </h3>
                <div className="space-y-1">
                  <div className="flex items-center text-xs text-cyan-400">
                    <span className="mr-1">⏱️</span>
                    <span>{item.duration}</span>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full border ${
                    item.importance === 'Foundation' ? 'bg-blue-900/30 text-blue-300 border-blue-500/30' :
                    item.importance === 'Core' ? 'bg-green-900/30 text-green-300 border-green-500/30' :
                    item.importance === 'Essential' ? 'bg-purple-900/30 text-purple-300 border-purple-500/30' :
                    item.importance === 'Advanced' ? 'bg-orange-900/30 text-orange-300 border-orange-500/30' :
                    'bg-red-900/30 text-red-300 border-red-500/30'
                  }`}>
                    {item.importance}
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Learning Tips */}
        <div className="mt-6 p-4 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 rounded-xl border border-cyan-500/20">
          <h4 className="font-semibold text-cyan-300 mb-2 text-sm">💡 Pro Tips</h4>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• Spend at least 2-3 hours daily for consistent progress</li>
            <li>• Practice with real projects and labs</li>
            <li>• Join DevOps communities for support</li>
            <li>• Build a portfolio of your work</li>
            <li>• Prepare for certifications along the way</li>
          </ul>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-subtle p-4 text-center">
          <div className="text-2xl lg:text-3xl font-bold text-cyan-400 mb-1">28</div>
          <div className="text-xs lg:text-sm text-gray-400">Technologies</div>
        </div>
        <div className="glass-subtle p-4 text-center">
          <div className="text-2xl lg:text-3xl font-bold text-green-400 mb-1">156</div>
          <div className="text-xs lg:text-sm text-gray-400">Lessons</div>
        </div>
        <div className="glass-subtle p-4 text-center">
          <div className="text-2xl lg:text-3xl font-bold text-purple-400 mb-1">42</div>
          <div className="text-xs lg:text-sm text-gray-400">Hands-on Labs</div>
        </div>
        <div className="glass-subtle p-4 text-center">
          <div className="text-2xl lg:text-3xl font-bold text-yellow-400 mb-1">8</div>
          <div className="text-xs lg:text-sm text-gray-400">Certifications</div>
        </div>
      </div>
    </div>
  );
}