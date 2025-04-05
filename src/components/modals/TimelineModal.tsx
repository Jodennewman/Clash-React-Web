import React, { useState } from 'react';
import { VSModal } from '../ui/vs-modal';
import { PlayCircle, CheckCircle, Star, Clock, Award, ExternalLink } from 'lucide-react';
import courseUtils, { Module, Submodule } from '../../lib/course-utils';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface ModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleId: string;
}

/**
 * ModuleModal - Modal component for displaying module content according to MODULE-HUD.md specs
 * 
 * Features:
 * - Module thumbnail at the top
 * - Module title overlaying the base of the thumbnail
 * - Brief description
 * - Three bullet points on what's inside
 * - List of the module's component submodules with small icons
 * - Visual indicators for "must-watch" or "founder essential" content
 */
const ModuleModal: React.FC<ModuleModalProps> = ({
  isOpen,
  onClose,
  moduleId
}) => {
  const [selectedSubmoduleIndex, setSelectedSubmoduleIndex] = useState<number>(-1);
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Get module data
  const module = courseUtils.getModuleById(moduleId);
  const submodules = moduleId ? courseUtils.getSubmodulesForModule(moduleId) : [];
  
  // GSAP animations
  useGSAP(() => {
    if (!isOpen || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate points and submodules with stagger
      gsap.from(".module-point", {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3
      });
      
      gsap.from(".submodule-item", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.05,
        ease: "back.out(1.2)",
        delay: 0.4
      });

      // Subtle hover animation for submodules
      document.querySelectorAll(".submodule-item").forEach(el => {
        el.addEventListener("mouseenter", () => {
          gsap.to(el, {
            backgroundColor: "var(--theme-bg-hover)",
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        el.addEventListener("mouseleave", () => {
          gsap.to(el, {
            backgroundColor: "transparent",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [isOpen, moduleId]);
  
  // Handle submodule selection for tooltip/details
  const handleSubmoduleClick = (index: number) => {
    setSelectedSubmoduleIndex(index === selectedSubmoduleIndex ? -1 : index);
  };
  
  if (!module) return null;

  return (
    <VSModal
      isOpen={isOpen}
      onClose={onClose}
      width="lg"
    >
      <div ref={containerRef} className="relative">
        {/* Thumbnail section with title overlay */}
        <div className="rounded-[--border-radius-lg] overflow-hidden aspect-video relative mb-6 shadow-theme-md">
          <img 
            src={courseUtils.getThumbnailPath(module.thumbnail || '')} 
            alt={module.title}
            className="w-full h-full object-cover" 
          />
          
          {/* Title overlay at the base of thumbnail as per MODULE-HUD.md */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
            <h2 className="text-xl md:text-2xl font-bold">{module.title}</h2>
            {module.founderMustWatch && (
              <div className="flex items-center mt-1 text-[--hud-accent-red]">
                <Star className="h-4 w-4 mr-1 fill-current" />
                <span className="text-sm font-medium">Founder Essential</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Main content section */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column: Description and bullet points */}
          <div className="w-full md:w-3/5">
            {/* Brief description as per MODULE-HUD.md */}
            <p className="text-theme-secondary text-base mb-6">
              {module.subtitle}
            </p>
            
            {/* Three bullet points on what's inside as per MODULE-HUD.md */}
            <h3 className="text-theme-primary font-semibold mb-3">What's Inside</h3>
            <ul className="space-y-3 mb-6">
              {module.points?.slice(0, 3).map((point, index) => (
                <li key={index} className="module-point flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1 w-5 h-5 rounded-full bg-theme-accent-secondary/20 flex items-center justify-center">
                    <span className="text-xs font-semibold text-theme-accent-secondary">{index + 1}</span>
                  </div>
                  <span className="text-theme-secondary">{point}</span>
                </li>
              ))}
            </ul>
            
            {/* Module metadata */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-theme-secondary">
                <Clock className="h-4 w-4 mr-2 text-theme-accent" />
                <span className="text-sm">{module.duration} minutes</span>
              </div>
              
              {module.tracks?.length > 0 && (
                <div className="flex items-center text-theme-secondary">
                  <Award className="h-4 w-4 mr-2 text-theme-accent" />
                  <span className="text-sm">{module.tracks.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Right column: Submodules list with indicators as per MODULE-HUD.md */}
          <div className="w-full md:w-2/5">
            <div className="bg-theme-gradient-subtle rounded-[--border-radius-lg] p-5 shadow-theme-sm">
              <h3 className="text-theme-primary font-semibold mb-4 flex items-center">
                <PlayCircle className="h-5 w-5 mr-2" />
                Submodules ({submodules.length})
              </h3>
              
              {/* List of submodules with indicators */}
              <ul className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {submodules.map((submodule, index) => (
                  <li 
                    key={submodule.id} 
                    className="submodule-item p-3 rounded-[--border-radius-md] cursor-pointer relative"
                    onClick={() => handleSubmoduleClick(index)}
                  >
                    <div className="flex items-start">
                      {/* Icon based on submodule type */}
                      <div className="flex-shrink-0 mr-3 text-theme-accent">
                        {submodule.highValue ? (
                          <Star className="h-5 w-5" />
                        ) : (
                          <PlayCircle className="h-5 w-5" />
                        )}
                      </div>
                      
                      <div className="flex-grow">
                        <h4 className="text-theme-primary text-sm font-medium">
                          {submodule.title}
                        </h4>
                        <div className="flex items-center mt-1">
                          <span className="text-theme-secondary text-xs">
                            {submodule.duration} min
                          </span>
                          
                          {/* Visual indicators for special content */}
                          {submodule.highValue && (
                            <span className="ml-2 text-xs px-2 py-0.5 bg-[--hud-accent-red]/10 text-[--hud-accent-red] rounded-full">
                              Must Watch
                            </span>
                          )}
                          
                          {submodule.difficulty > 2 && (
                            <span className="ml-2 text-xs px-2 py-0.5 bg-theme-accent-secondary/10 text-theme-accent-secondary rounded-full">
                              Advanced
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Submodule details/tooltip as per MODULE-HUD.md options */}
                    {selectedSubmoduleIndex === index && (
                      <div className="mt-3 p-3 bg-theme-bg-secondary/20 rounded-[--border-radius-sm] text-xs text-theme-secondary">
                        {submodule.subtitle}
                        
                        {submodule.resources?.length > 0 && (
                          <div className="mt-2">
                            <div className="font-medium text-theme-primary mb-1">Resources:</div>
                            <ul className="space-y-1">
                              {submodule.resources.map((resource, idx) => (
                                <li key={idx} className="flex items-center">
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  <span>{resource}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              
              {/* Call to action button */}
              <button className="mt-4 w-full bg-theme-gradient-primary text-white py-2 px-4 rounded-[--border-radius-md] shadow-theme-sm hover-bubbly flex items-center justify-center">
                <PlayCircle className="h-5 w-5 mr-2" />
                Start Learning
              </button>
            </div>
          </div>
        </div>
      </div>
    </VSModal>
  );
};

export { ModuleModal };