import React, { useState } from 'react';
import { ArrowRightCircle, BookOpen, CheckCircle, Star, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import courseUtils from '../../lib/course-utils';

const ModuleBreakdown = () => {
  // Initialize with the first section
  const [activeSection, setActiveSection] = useState(courseUtils.sections[0].id);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const modulesPerPage = 4; // Show 4 modules per page
  
  // Get active modules for the selected section
  const activeModules = courseUtils.getModulesForSection(activeSection);
  
  // Calculate total pages
  const totalPages = Math.ceil(activeModules.length / modulesPerPage);
  
  // Get current page modules
  const currentModules = activeModules.slice(
    currentPage * modulesPerPage, 
    (currentPage + 1) * modulesPerPage
  );
  
  // Track information for the legend
  const trackInfo = courseUtils.tracks.slice(0, 3); // Limit to 3 for space
  
  // Helper function to get an appropriate icon for each section
  function getSectionIcon(sectionName: string) {
    switch(sectionName.toLowerCase()) {
      case 'theory basics':
      case 'theory advanced':
        return BookOpen;
      case 'research':
      case 'research & writing':
        return CheckCircle;
      case 'repurposing':
        return ArrowRightCircle;
      case 'shooting':
      case 'editing':
        return AlertCircle;
      case 'monetisation':
      case 'conversions':
      case 'delegation':
        return Star;
      default:
        return BookOpen;
    }
  }
  
  // Handle page navigation
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Handle section change
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    setCurrentPage(0); // Reset to first page when changing sections
  };

  return (
    <div className="bg-[#08141B] p-6 rounded-xl shadow-lg max-w-5xl mx-auto overflow-hidden">
      {/* Section navigation - horizontal scrolling tabs */}
      <div className="flex overflow-x-auto pb-2 mb-6 hide-scrollbar">
        <div className="flex gap-2 min-w-max">
          {courseUtils.sections.map((section) => {
            const Icon = getSectionIcon(section.name);
            return (
              <button
                key={section.id}
                onClick={() => handleSectionChange(section.id)}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeSection === section.id 
                    ? 'bg-[#154D59] text-white shadow-md scale-105' 
                    : 'bg-[#09232F] text-gray-300 hover:bg-[#0F1A22]'
                }`}
                style={{
                  borderLeft: activeSection === section.id ? `4px solid ${section.color || '#FEA35D'}` : ''
                }}
              >
                <Icon size={16} />
                <span>{section.name}</span>
                <span className="ml-1 bg-[#0F1A22] text-gray-300 rounded-full px-2 py-0.5 text-xs font-medium">
                  {section.modules}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Section header */}
      <div className="mb-6 border-b border-[#154D59]/30 pb-4">
        <h2 className="text-2xl font-bold" style={{ 
          color: courseUtils.sections.find(s => s.id === activeSection)?.color || '#FEA35D'
        }}>
          {courseUtils.sections.find(s => s.id === activeSection)?.name}
        </h2>
        <p className="text-gray-400">
          {courseUtils.getSectionDescription(activeSection)}
        </p>
      </div>
      
      {/* Module cards with pagination */}
      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {currentModules.map((module, idx) => (
            <div 
              key={idx}
              className="bg-[#0F1A22] p-4 rounded-lg border border-[#154D59]/30 hover:border-[#154D59] transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-white">{module.title}</h3>
                <div className="text-sm bg-[#154D59]/50 text-white rounded-full px-2 py-0.5">
                  {module.duration} min
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-3">{module.subtitle}</p>
              <div className="flex flex-wrap gap-2">
                {module.tracks.map((track, i) => {
                  const trackData = courseUtils.tracks.find(t => t.name === track);
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
        
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center">
            <button 
              onClick={prevPage} 
              disabled={currentPage === 0}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
                currentPage === 0 
                  ? 'text-gray-500 cursor-not-allowed' 
                  : 'text-white hover:bg-[#154D59]/30'
              }`}
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>
            
            <div className="text-gray-400 text-sm">
              Page {currentPage + 1} of {totalPages}
            </div>
            
            <button 
              onClick={nextPage} 
              disabled={currentPage >= totalPages - 1}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
                currentPage >= totalPages - 1 
                  ? 'text-gray-500 cursor-not-allowed' 
                  : 'text-white hover:bg-[#154D59]/30'
              }`}
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
      
      {/* Tracks legend */}
      <div className="bg-[#0F1A22] p-4 rounded-lg border border-[#154D59]/30">
        <h3 className="font-semibold mb-2 text-white">Learning Tracks</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {trackInfo.map((track, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: track.color }}
              ></div>
              <span className="text-sm text-gray-300">{track.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModuleBreakdown;

// Add this CSS to your global styles or as a style tag
// .hide-scrollbar::-webkit-scrollbar {
//   display: none;
// }
// .hide-scrollbar {
//   -ms-overflow-style: none;
//   scrollbar-width: none;
// }
