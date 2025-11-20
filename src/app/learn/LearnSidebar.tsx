// src/app/learn/LearnSidebar.tsx

'use client';

import { useState } from 'react';

interface LearnSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  isMobileOpen: boolean;
  onClose: () => void;
}

const categories = [
  { id: 'all', name: 'All Technologies', icon: '🚀', count: 28 },
  { id: 'fundamentals', name: 'Fundamentals', icon: '📚', count: 5 },
  { id: 'containers', name: 'Containers', icon: '🐳', count: 4 },
  { id: 'orchestration', name: 'Orchestration', icon: '⚙️', count: 3 },
  { id: 'cloud', name: 'Cloud Platforms', icon: '☁️', count: 4 },
  { id: 'iac', name: 'Infrastructure as Code', icon: '🏗️', count: 4 },
  { id: 'cicd', name: 'CI/CD', icon: '🔄', count: 4 },
  { id: 'monitoring', name: 'Monitoring', icon: '📊', count: 4 },
];

const learningPaths = [
  { id: 'beginner', name: 'Beginner Path', duration: '3 months', level: 'Easy' },
  { id: 'intermediate', name: 'Intermediate Path', duration: '6 months', level: 'Medium' },
  { id: 'advanced', name: 'Advanced Path', duration: '9 months', level: 'Hard' },
  { id: 'expert', name: 'Expert Path', duration: '12+ months', level: 'Expert' },
];

export default function LearnSidebar({ 
  selectedCategory, 
  onCategoryChange, 
  isMobileOpen, 
  onClose 
}: LearnSidebarProps) {
  const [activePath, setActivePath] = useState<string | null>(null);

  const handlePathSelect = (pathId: string) => {
    setActivePath(pathId);
    onCategoryChange(`path-${pathId}`);
    onClose();
  };

  const handleCategorySelect = (categoryId: string) => {
    setActivePath(null);
    onCategoryChange(categoryId);
    onClose();
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-900/80 backdrop-blur-xl border-r border-cyan-500/20 pt-20 lg:pt-0">
      {/* Header */}
      <div className="p-6 border-b border-cyan-500/20">
        <div className="flex items-center justify-between lg:justify-start">
          <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            DevOps Learning
          </h2>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg bg-cyan-900/30 border border-cyan-500/50 hover:bg-cyan-800/40 transition-all duration-300"
          >
            <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-2">Master modern DevOps technologies</p>
      </div>

      {/* Categories Section */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-3 flex items-center">
          <span className="mr-2">📁</span>
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`w-full text-left p-3 rounded-xl transition-all duration-300 border ${
                selectedCategory === category.id && !activePath
                  ? 'bg-cyan-900/30 border-cyan-400/60 shadow-lg shadow-cyan-500/20'
                  : 'bg-gray-800/50 border-gray-600/30 hover:bg-gray-700/50 hover:border-cyan-400/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{category.icon}</span>
                  <span className="font-medium text-white">{category.name}</span>
                </div>
                <span className="text-xs bg-gray-700/50 px-2 py-1 rounded-full text-gray-300">
                  {category.count}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Learning Paths Section */}
      <div className="p-4 border-t border-cyan-500/20">
        <h3 className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-3 flex items-center">
          <span className="mr-2">🎯</span>
          Learning Paths
        </h3>
        <div className="space-y-3">
          {learningPaths.map((path) => (
            <button
              key={path.id}
              onClick={() => handlePathSelect(path.id)}
              className={`w-full text-left p-3 rounded-xl transition-all duration-300 border ${
                activePath === path.id
                  ? 'bg-purple-900/30 border-purple-400/60 shadow-lg shadow-purple-500/20'
                  : 'bg-gray-800/50 border-gray-600/30 hover:bg-gray-700/50 hover:border-purple-400/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white text-sm">{path.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  path.level === 'Easy' ? 'bg-green-500/20 text-green-300' :
                  path.level === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                  path.level === 'Hard' ? 'bg-orange-500/20 text-orange-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {path.level}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>⏱️ {path.duration}</span>
                <span>📚 15+ courses</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Progress Section */}
      <div className="p-4 border-t border-cyan-500/20">
        <h3 className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-3 flex items-center">
          <span className="mr-2">📈</span>
          Your Progress
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-300 mb-1">
              <span>Course Completion</span>
              <span>0%</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: '0%' }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm text-gray-300 mb-1">
              <span>Skills Mastered</span>
              <span>0/28</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                style={{ width: '0%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-cyan-500/20">
        <h3 className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          <button className="p-2 bg-cyan-900/30 border border-cyan-500/30 rounded-lg hover:bg-cyan-800/40 transition-colors text-xs text-cyan-300">
            📖 Start Learning
          </button>
          <button className="p-2 bg-purple-900/30 border border-purple-500/30 rounded-lg hover:bg-purple-800/40 transition-colors text-xs text-purple-300">
            🎯 Set Goals
          </button>
          <button className="p-2 bg-green-900/30 border border-green-500/30 rounded-lg hover:bg-green-800/40 transition-colors text-xs text-green-300">
            📚 Resources
          </button>
          <button className="p-2 bg-orange-900/30 border border-orange-500/30 rounded-lg hover:bg-orange-800/40 transition-colors text-xs text-orange-300">
            🏆 Track Progress
          </button>
        </div>
      </div>
    </div>
  );
}