import React, { useState, useEffect } from 'react';
import { ArrowRightCircle, BookOpen, CheckCircle, Star, ChevronLeft, ChevronRight, Camera, Scissors, Briefcase, Rocket, Clock, Award } from 'lucide-react';
import { sections, tracks, getSectionDescription, getModulesForSection, Module, courseStats } from '../../lib/course-utils';
import { Section } from '../../components/ui/section';
import { Badge } from '../../components/ui/badge';

// Extend the Module type to include the properties we need
interface ExtendedModule extends Module {
  points?: string[];
}

const ModuleBreakdown = () => {
  // Initialize with the first section (with null check)
  const initialSectionId = sections && sections.length > 0 ? sections[0].id : '';
  const [activeSection, setActiveSection] = useState(initialSectionId);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const modulesPerPage = 4; // Show 4 modules per page
  
  // Get active modules for the selected section with null check
  const activeModules: ExtendedModule[] = getModulesForSection(activeSection) || [];
  
  // Calculate total pages with null check
  const totalPages = Math.ceil((activeModules?.length || 0) / modulesPerPage);
  
  // Get current page modules with null check
  const currentModules = activeModules ? activeModules.slice(
    currentPage * modulesPerPage, 
    (currentPage + 1) * modulesPerPage
  ) : [];
  
  // Reset page when section changes
  useEffect(() => {
    setCurrentPage(0);
  }, [activeSection]);
  
  // Helper function to get an appropriate icon for each section
  function getSectionIcon(sectionName: string) {
    switch(sectionName?.toLowerCase()) {
      case 'theory basics':
        return BookOpen;
      case 'theory advanced':
        return Star;
      case 'research':
      case 'research & writing':
        return CheckCircle;
      case 'repurposing':
        return ArrowRightCircle;
      case 'shooting':
        return Camera;
      case 'editing':
        return Scissors;
      case 'monetisation':
        return Award;
      case 'conversions':
        return Rocket;
      case 'delegation':
        return Briefcase;
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

  // Get active section data with null check
  const activeSectionData = sections?.find(s => s.id === activeSection) || null;
  
  // Total modules count with null check
  const totalModuleCount = courseStats?.totalModules || 0;

  return (
    <Section className="py-24 bg-[#08141B]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="bg-white/5 text-[#FEA35D] border-[#FEA35D]/30 mb-4 py-2 px-4">
            Inside The Program
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Curriculum Preview
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Explore the key modules that will transform your content strategy and production capabilities.
          </p>
        </div>

        {/* Section navigation - horizontal scrolling tabs */}
        <div className="flex overflow-x-auto pb-4 mb-8 hide-scrollbar justify-center">
          <div className="flex gap-2 min-w-max">
            {(sections || []).map((section) => {
              const Icon = getSectionIcon(section.name || '');
              return (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`px-4 py-3 rounded-lg flex items-center gap-2 transition-all whitespace-nowrap ${
                    activeSection === section.id 
                      ? 'bg-[#154D59] text-white shadow-md scale-105' 
                      : 'bg-[#09232F] text-gray-300 hover:bg-[#0F1A22]'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{section.name || 'Section'}</span>
                  <span className="ml-1 bg-[#0F1A22] text-gray-300 rounded-full px-2 py-0.5 text-xs font-medium">
                    {section.modules || 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Section header */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-2" style={{ 
            color: activeSectionData?.color || '#FEA35D'
          }}>
            {activeSectionData?.name || 'Section'}
          </h3>
          <p className="text-gray-400">
            {getSectionDescription(activeSection) || 'Explore the content in this section.'}
          </p>
        </div>
        
        {/* Learning tracks */}
        <div className="mb-8 bg-[#0F1A22] p-4 rounded-lg border border-[#154D59]/30">
          <h4 className="font-semibold mb-3 text-white">Learning Tracks</h4>
          <div className="flex flex-wrap gap-4">
            {(tracks || []).map((track, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: track.color || '#888' }}
                ></div>
                <span className="text-sm text-gray-300">{track.name || ''}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Module cards with pagination */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {currentModules.map((module, idx) => (
              <div 
                key={idx}
                className="bg-[#0F1A22] p-5 rounded-lg border border-[#154D59]/30 hover:border-[#154D59] transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-white text-lg">{module.title || 'Module'}</h3>
                  <div className="flex items-center gap-1 text-sm bg-[#154D59]/50 text-white rounded-full px-2 py-1">
                    <Clock size={14} />
                    <span>{module.duration || 0} min</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">{module.subtitle || ''}</p>
                
                {/* Module points/highlights */}
                {module.points && module.points.length > 0 && (
                  <div className="mb-4">
                    <ul className="space-y-1">
                      {module.points.slice(0, 2).map((point: string, i: number) => (
                        <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                          <CheckCircle size={12} className="text-[#FEA35D] mt-0.5 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {(module.tracks || []).map((track, i) => {
                    const trackData = tracks?.find(t => t.name === track);
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
                
                {/* Submodules count */}
                {module.submodules && module.submodules.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[#154D59]/30 text-xs text-gray-400">
                    {module.submodules.length} lessons included
                  </div>
                )}
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
        
        {/* Preview notice */}
        <div className="bg-[#0F1A22] border border-[#FEA35D]/30 rounded-lg p-6 mb-8 text-center">
          <h3 className="text-[#FEA35D] text-xl font-bold mb-2">This is just a preview!</h3>
          <p className="text-white/70">
            The full Vertical Shortcut program contains over {totalModuleCount} modules across 10 categories, with new content added monthly.
          </p>
        </div>
        
        {/* CTA Button */}
        <div className="text-center">
          <button 
            className="bg-gradient-to-r from-[#FEA35D] to-[#F89A67] text-[#08141B] font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity"
            onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Full Curriculum
          </button>
        </div>
      </div>
    </Section>
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
