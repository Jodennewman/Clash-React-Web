import React from 'react';
import { Section } from "../ui/section";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { featuredModules, tracks, getTrackIcon } from "../../lib/course-utils";
import { ArrowRightCircle, Clock, Users } from "lucide-react";

// Extend the Module interface to include difficulty property
interface Module {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  difficulty?: string;
  tracks: string[];
  duration: number;
  founderMustWatch: boolean;
  submodules: { title: string }[];
}

const FeaturedModules = () => {
  // Get the featured modules from our data with proper null check
  const modules: Module[] = featuredModules || [];

  return (
    <Section className="py-24 bg-[#08141B]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="section" size="xl" className="mb-4">
            Curriculum Highlights
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Featured Modules</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Take a closer look at some of the transformative modules you'll experience in the Vertical Shortcut program.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {modules.map((module, index) => (
            <div 
              key={index}
              className="bg-[#09232F]/50 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-[#FEA35D]/30 transition-all duration-300 group"
            >
              {/* Module header with color strip based on module color */}
              <div className="h-2" style={{ backgroundColor: module.color || '#FEA35D' }}></div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#FEA35D] transition-colors duration-300">
                    {module.title || 'Module'}
                  </h3>
                  <div className="flex items-center text-sm text-white/70 bg-white/5 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4 mr-1" />
                    {module.duration || 0} min
                  </div>
                </div>
                
                <p className="text-white/70 mb-6">
                  {module.subtitle || 'Learn more about this module'}
                </p>
                
                {/* Tracks badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(module.tracks || []).map((trackName, i) => {
                    const track = tracks?.find(t => t.name === trackName);
                    // Use getTrackIcon safely with fallback
                    const TrackIcon = track?.icon ? getTrackIcon(track.icon) : Users;
                    
                    return track ? (
                      <Badge 
                        key={i}
                        variant="subtle"
                        size="sm"
                        className="flex items-center"
                        style={{ 
                          backgroundColor: `${track.color || '#888'}20`,
                          color: track.color || 'white',
                          borderColor: `${track.color || '#888'}30` 
                        }}
                      >
                        <TrackIcon className="w-3 h-3 mr-1.5" />
                        <span>{track.name || 'Track'}</span>
                      </Badge>
                    ) : null;
                  })}
                </div>
                
                {/* Submodules preview with null check */}
                {module.submodules && module.submodules.length > 0 && (
                  <div className="bg-black/20 rounded-lg p-4 mb-4">
                    <div className="text-sm font-medium text-white/80 mb-3">Module Includes:</div>
                    <ul className="space-y-2">
                      {module.submodules.slice(0, 3).map((submodule, idx) => (
                        <li key={idx} className="flex text-sm">
                          <span className="text-[#FEA35D] mr-2">•</span>
                          <span className="text-white/70">{submodule.title || 'Submodule'}</span>
                        </li>
                      ))}
                      {module.submodules.length > 3 && (
                        <li className="flex text-sm">
                          <span className="text-[#FEA35D] mr-2">•</span>
                          <span className="text-white/70">+{module.submodules.length - 3} more sections</span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                
                {/* Footer with "Founder must-watch" badge if applicable */}
                <div className="flex items-center justify-between">
                  {module.founderMustWatch && (
                    <Badge variant="destructive" size="sm" className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      Founder Must-Watch
                    </Badge>
                  )}
                  
                  {/* Learn More button */}
                  <div className="mt-3 pt-3 border-t border-[#154D59]/30">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-[--primary-orange] dark:text-[--primary-orange-light]">
                        {module.difficulty || 'Intermediate'}
                      </div>
                      <Button 
                        variant="ghost" 
                        className="text-[--primary-orange] hover:text-[--primary-orange-hover] hover:bg-[--primary-orange]/10 dark:hover:bg-[--primary-orange]/20 p-0 h-auto ml-auto"
                        onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
                      >
                        <span className="mr-1">Learn More</span>
                        <ArrowRightCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="destructive"
            className="px-8 py-6 text-lg font-semibold"
            onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Full Curriculum
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default FeaturedModules;
