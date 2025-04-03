import React, { useState } from 'react';
import { ArrowRightCircle, BookOpen, CheckCircle, Star, AlertCircle } from 'lucide-react';
import { sections, tracks, getModulesForSection, getSectionDescription } from '../../lib/course-utils';

const ModuleBreakdown = () => {
  const [activeSection, setActiveSection] = useState('theory_basics');
  
  // Map Lucide icons to section IDs
  const getSectionIcon = (sectionId: string) => {
    switch(sectionId) {
      case 'theory_basics':
      case 'theory_advanced':
        return BookOpen;
      case 'research':
        return CheckCircle;
      case 'repurposing':
        return ArrowRightCircle;
      case 'shooting':
        return AlertCircle;
      case 'editing':
        return Star;
      default:
        return BookOpen;
    }
  };
  
  // Get modules for the active section from course-utils
  const activeModules = getModulesForSection(activeSection) || [];
  // Find the active section data from course-utils
  const activeSection_data = sections.find(s => s.id === activeSection) || { id: "", name: "", modules: 0, color: "#888" };
  // Get the section description from course-utils
  const sectionDescription = getSectionDescription(activeSection);
  
  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-lg max-w-5xl mx-auto overflow-hidden">
      {/* Section navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sections.map((section) => {
          const Icon = getSectionIcon(section.id);
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
                {section.modules || 0}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Section header */}
      <div className="mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold" style={{ color: activeSection_data?.color || '#888' }}>
          {activeSection_data?.name || 'Section'}
        </h2>
        <p className="text-gray-600">
          {sectionDescription || 'Explore this section of the course'}
        </p>
      </div>
      
      {/* Module cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {activeModules.map((module, idx) => (
          <div 
            key={module.id || idx}
            className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-800">{module.title}</h3>
              <div className="text-sm bg-gray-100 rounded-full px-2 py-0.5">
                {module.duration || 0} min
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-3">{module.subtitle || ''}</p>
            <div className="flex flex-wrap gap-2">
              {(module.tracks || []).map((trackName, i) => {
                const trackData = tracks.find(t => t.name === trackName);
                return (
                  <span 
                    key={i} 
                    className="text-xs py-1 px-2 rounded-full text-white"
                    style={{ backgroundColor: trackData?.color || '#888' }}
                  >
                    {trackName}
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
          {tracks.map((track, idx) => (
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
