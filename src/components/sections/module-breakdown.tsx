import React, { useState } from 'react';
import { ArrowRightCircle, BookOpen, CheckCircle, Star, AlertCircle } from 'lucide-react';

const ModuleBreakdown = () => {
  const [activeSection, setActiveSection] = useState('theory_basics');
  
  // Section data with counts derived from the course information
  const sections = [
    { id: 'theory_basics', name: 'Theory Basics', modules: 6, color: '#4A90E2', icon: BookOpen },
    { id: 'theory_advanced', name: 'Theory Advanced', modules: 11, color: '#FEA35D', icon: Star },
    { id: 'research', name: 'Research & Writing', modules: 3, color: '#34C759', icon: CheckCircle },
    { id: 'repurposing', name: 'Repurposing', modules: 3, color: '#30D158', icon: ArrowRightCircle },
    { id: 'shooting', name: 'Shooting', modules: 5, color: '#5856D6', icon: AlertCircle },
    { id: 'editing', name: 'Editing', modules: 4, color: '#FF9500', icon: Star },
  ];
  
  // Track module information for the active section
  const trackInfo = [
    { name: 'Content Creator Growth', color: '#4A90E2', description: 'The fastest path to growing your audience from zero to millions of views' },
    { name: 'Founders', color: '#FF3B30', description: 'Essential strategies for entrepreneurs and business leaders to build personal brands' },
    { name: 'Technical Skills', color: '#8E8E93', description: 'Practical tools and techniques for production and optimization' }
  ];
  
  // Module data for the active section
  const getModulesForSection = (sectionId) => {
    switch(sectionId) {
      case 'theory_basics':
        return [
          { title: 'The Big Picture on Short Form', description: 'Why short form is the highest-leverage marketing investment of 2025', duration: 25, tracks: ['Content Creator Growth', 'Founders'] },
          { title: 'The 3 Cardinal Sins and Cardinal Virtues', description: 'The critical mistakes killing your videos and their powerful antidotes', duration: 30, tracks: ['Content Creator Growth', 'Founders'] },
          { title: 'Algorithmic Reality', description: 'Demystifying the "black box" that determines which videos go viral', duration: 25, tracks: ['Content Creator Growth'] },
          { title: 'Strategy: Pillars, Topics, Buckets', description: 'Build a framework that generates unlimited viral-worthy content ideas', duration: 35, tracks: ['Content Creator Growth', 'Founders'] },
          { title: 'Hooking Fundamentals', description: 'Master the art of the first 3 seconds that determine your video\'s success', duration: 30, tracks: ['Content Creator Growth'] },
        ]
      case 'theory_advanced':
        return [
          { title: 'Nuanced Hook: Morally Dubious', description: 'Advanced hook strategies that generate massive engagement', duration: 35, tracks: ['Content Creator Growth'] },
          { title: 'Advanced Emotional Positioning', description: 'Harness powerful emotions to create content that resonates and drives action', duration: 30, tracks: ['Content Creator Growth', 'Founders'] },
          { title: 'Script Mastery: Optimising for Engagement', description: 'Advanced scripting techniques that maximize retention', duration: 35, tracks: ['Content Creator Growth', 'Founders'] },
          { title: 'The Founders Paradox', description: 'Create authentic content without sacrificing professionalism', duration: 35, tracks: ['Founders'] },
        ]
      case 'research':
        return [
          { title: 'Research Basics', description: 'Find and adapt viral-worthy content without starting from scratch', duration: 30, tracks: ['Content Creator Growth'] },
          { title: 'Research Advanced Tasks', description: 'Transform raw research into focused, actionable content ideas', duration: 25, tracks: ['Content Creator Growth'] },
        ]
      case 'repurposing':
        return [
          { title: 'Repurposing Normal', description: 'Transform existing content into platform-optimized short form videos', duration: 30, tracks: ['Content Creator Growth'] },
          { title: 'Repurposing from LinkedIn: Worked Examples', description: 'Transform professional content into platform-native short form videos', duration: 35, tracks: ['Founders', 'Content Creator Growth'] },
          { title: 'Serialisation', description: 'Create consistent series that build audience anticipation and loyalty', duration: 25, tracks: ['Content Creator Growth'] },
        ]
      case 'shooting':
        return [
          { title: 'Solo Phone Shooter', description: 'Create professional-quality content with just your smartphone', duration: 25, tracks: ['Content Creator Growth', 'Technical Skills'] },
          { title: 'Setting up a Studio Space', description: 'Create a professional recording environment', duration: 30, tracks: ['Technical Skills'] },
          { title: 'Camera Confidence', description: 'Develop natural, engaging presentation skills', duration: 25, tracks: ['Content Creator Growth', 'Founders'] },
          { title: 'Videography Pro', description: 'Advanced filming techniques that elevate your visual quality', duration: 35, tracks: ['Technical Skills'] },
          { title: 'Producing a Podcast for Clips', description: 'Design podcast content for short-form repurposing', duration: 30, tracks: ['Content Creator Growth', 'Founders'] },
        ]
      case 'editing':
        return [
          { title: 'Editing Basics', description: 'Learn fundamental techniques for creating engaging short-form videos', duration: 25, tracks: ['Content Creator Growth', 'Technical Skills'] },
          { title: 'Editing Advanced', description: 'Professional techniques that elevate your content to the next level', duration: 35, tracks: ['Technical Skills'] },
          { title: 'Editing Team', description: 'Build and manage a team of editors for consistent, high-volume content', duration: 30, tracks: ['Founders'] },
          { title: 'Podcast Clipping', description: 'Transform long-form podcasts into viral short-form clips', duration: 25, tracks: ['Content Creator Growth'] },
        ]
      default:
        return [];
    }
  };
  
  const activeModules = getModulesForSection(activeSection);
  const activeSection_data = sections.find(s => s.id === activeSection);
  
  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-lg max-w-5xl mx-auto overflow-hidden">
      {/* Section navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all ${
                activeSection === section.id 
                  ? 'bg-gray-800 text-white shadow-md scale-105' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              style={{
                borderLeft: activeSection === section.id ? `4px solid ${section.color}` : ''
              }}
            >
              <Icon size={16} />
              <span>{section.name}</span>
              <span className="ml-1 bg-gray-200 text-gray-800 rounded-full px-2 py-0.5 text-xs font-medium">
                {section.modules}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Section header */}
      <div className="mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold" style={{ color: activeSection_data?.color }}>
          {activeSection_data?.name}
        </h2>
        <p className="text-gray-600">
          {activeSection === 'theory_basics' && 'Foundational concepts to understand short-form content strategy'}
          {activeSection === 'theory_advanced' && 'Advanced techniques for maximum engagement and growth'}
          {activeSection === 'research' && 'Discover and adapt top-performing content ideas'}
          {activeSection === 'repurposing' && 'Transform existing content into viral short-form videos'}
          {activeSection === 'shooting' && 'Camera work, setup, and filming techniques'}
          {activeSection === 'editing' && 'Post-production methods to enhance your content'}
        </p>
      </div>
      
      {/* Module cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {activeModules.map((module, idx) => (
          <div 
            key={idx}
            className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-800">{module.title}</h3>
              <div className="text-sm bg-gray-100 rounded-full px-2 py-0.5">
                {module.duration} min
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-3">{module.description}</p>
            <div className="flex flex-wrap gap-2">
              {module.tracks.map((track, i) => {
                const trackData = trackInfo.find(t => t.name === track);
                return (
                  <span 
                    key={i} 
                    className="text-xs py-1 px-2 rounded-full text-white"
                    style={{ backgroundColor: trackData?.color || '#888' }}
                  >
                    {track}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {/* Tracks legend */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-2 text-gray-700">Learning Tracks</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {trackInfo.map((track, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: track.color }}
              ></div>
              <span className="text-sm text-gray-700">{track.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModuleBreakdown;
