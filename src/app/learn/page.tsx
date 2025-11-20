// src/app/learn/page.tsx

'use client';

import { useState, useEffect } from 'react';
import SeoMaster from '../../components/SEO/SeoMaster';
import LearnSidebar from './LearnSidebar';
import LearnContent from './LearnContent';
import TechnologyDrawer from './TechnologyDrawer';

export default function LearnPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTechnology, setSelectedTechnology] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTechnologyClick = (technology: any) => {
    setSelectedTechnology(technology);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTechnology(null);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (!mounted) {
    return (
      <>
        <SeoMaster
          title="Learn DevOps - MasterDevOps"
          description="Comprehensive DevOps learning platform with Docker, Kubernetes, AWS, CI/CD, Terraform, and more. Start your DevOps journey today."
          keywords={['learn devops', 'devops course', 'devops tutorial', 'devops learning path']}
        />
        <div className="min-h-screen bg-transparent flex items-center justify-center pt-20">
          <div className="glass-card p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-cyan-300">Loading Learning Platform...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SeoMaster
        title="Learn DevOps - MasterDevOps"
        description="Comprehensive DevOps learning platform with Docker, Kubernetes, AWS, CI/CD, Terraform, and more. Start your DevOps journey today."
        keywords={['learn devops', 'devops course', 'devops tutorial', 'devops learning path']}
      />
      
      {/* Main content with proper spacing below header */}
      <div className="min-h-screen bg-transparent pt-20">
        {/* Mobile Header */}
        <div className="lg:hidden glass-subtle m-4 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg bg-cyan-900/30 border border-cyan-500/50 hover:bg-cyan-800/40 transition-all duration-300"
            >
              <svg className="w-6 h-6 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-bold neon-text">Learn DevOps</h1>
            <div className="w-10"></div> {/* Spacer for balance */}
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className={`
            fixed lg:static inset-y-0 left-0 z-40
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            w-80 lg:w-64 xl:w-80
          `}>
            <LearnSidebar 
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              isMobileOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
          </div>

          {/* Overlay for mobile */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <LearnContent 
              selectedCategory={selectedCategory}
              onTechnologyClick={handleTechnologyClick}
            />
          </div>
        </div>

        {/* Technology Detail Drawer */}
        <TechnologyDrawer
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          technology={selectedTechnology}
        />
      </div>
    </>
  );
}