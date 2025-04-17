import React, { useState } from 'react';
import { VSModal } from '../ui/vs-modal';
import { Play, CheckCircle, Lock } from 'lucide-react';
import courseUtils, { Submodule as CourseSubmodule } from '../../lib/course-utils';

interface VSSubmoduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleId: string;
  moduleTitle: string;
  submodules: Array<{
    id: string;
    title: string;
    duration: string;
    subtitle?: string;
    thumbnailUrl: string;
    isCompleted?: boolean;
    isLocked?: boolean;
    instructor?: string;
    week?: number;
    difficulty: string;
    resources?: unknown[];
  }>;
  thumbnailUrl: string;
}

/**
 * VSSubmoduleModal - Modal component for viewing course modules and submodules
 * 
 * Features:
 * - Video thumbnail preview
 * - List of submodules with completion status
 * - Module navigation
 * - VS-styled design elements
 */
const VSSubmoduleModal: React.FC<VSSubmoduleModalProps> = ({
  isOpen,
  onClose,
  moduleId,
  moduleTitle,
  submodules,
  thumbnailUrl
}) => {
  const [selectedSubmoduleId, setSelectedSubmoduleId] = useState<string | null>(null);
  
  // Ensure the modal is positioned correctly with proper z-index
  React.useEffect(() => {
    if (isOpen) {
      // Ensure modal appears above everything else
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      
      // Reset when modal closes
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  const handlePlayModule = (submoduleId: string) => {
    // Check if submodule is locked
    const submodule = submodules.find(s => s.id === submoduleId);
    if (submodule?.isLocked) return;
    
    // Set as selected
    setSelectedSubmoduleId(submoduleId);
    
    // Implementation for actually playing the module would go here
    console.log(`Playing submodule: ${submoduleId}`);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = courseUtils.getThumbnailPath('default');
    
    // Also update background image if it exists
    const parentDiv = target.closest('.modal-content');
    if (parentDiv instanceof HTMLElement) {
      parentDiv.style.backgroundImage = `url(${courseUtils.getThumbnailPath('default')})`;
    }
  };

  return (
    <VSModal
      isOpen={isOpen}
      onClose={onClose}
      title={moduleTitle}
      width="full"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left panel - Video player area */}
        <div className="w-full md:w-2/3">


          <div className="aspect-video relative rounded-[--border-radius-lg] overflow-hidden shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]">
            {/* Theme-aware floating element for visual interest */}
            <div className="absolute -z-10 top-10 right-10 w-20 h-20 rounded-[40%] rotate-12 
                          opacity-[var(--theme-float-opacity)]
                          bg-[var(--theme-float-bg-primary)]
                          animate-float-slow"></div>

            {/* Video thumbnail/player with defensive error handling */}
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${thumbnailUrl})`,
                backgroundColor: 'rgba(0,0,0,0.2)', // Fallback background color
              }}
            >
              {/* Hidden img element for better error handling */}
              <img
                src={thumbnailUrl}
                alt={moduleTitle}
                className="hidden" // Hide actual img element
                onError={handleImageError}
              />
            </div>
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer group">
              <div className="bg-white dark:bg-[var(--theme-primary)] rounded-full w-16 h-16 flex items-center justify-center shadow-md transform transition-transform group-hover:scale-110">
                <Play className="h-8 w-8 text-[var(--theme-primary)] dark:text-white fill-current ml-1" />
              </div>
            </div>
            
            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
              <h3 className="text-lg md:text-xl font-semibold">
                {selectedSubmoduleId
                  ? submodules.find(s => s.id === selectedSubmoduleId)?.title
                  : 'Select a submodule to begin'}
              </h3>
            </div>
          </div>
          
          {/* Module description */}
          <div className="mt-6">


            <h3 className="text-theme-primary text-xl font-semibold mb-3 transition-colors transition-theme-normal">About This Module</h3>
            <p className="text-theme-secondary transition-colors transition-theme-normal">


              This module covers essential techniques to create engaging content for your audience. You'll learn proven methods to increase retention and gain more followers through strategic content planning.
            </p>
            
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Module stats */}

              <div className="bg-theme-surface/50 rounded-md p-4 flex flex-col items-center text-center border border-theme-border shadow-theme-sm transition-all transition-theme-normal">
                <div className="text-theme-primary text-2xl font-bold mb-1 transition-colors transition-theme-normal">
                  {submodules.length}
                </div>
                <div className="text-theme-secondary text-sm transition-colors transition-theme-normal">


                  Lessons
                </div>
              </div>
              


              <div className="bg-theme-surface/50 rounded-md p-4 flex flex-col items-center text-center border border-theme-border shadow-theme-sm transition-all transition-theme-normal">
                <div className="text-theme-primary text-2xl font-bold mb-1 transition-colors transition-theme-normal">
                  {submodules.filter(s => s.isCompleted).length} / {submodules.length}
                </div>
                <div className="text-theme-secondary text-sm transition-colors transition-theme-normal">


                  Completed
                </div>
              </div>
              


              <div className="bg-theme-surface/50 rounded-md p-4 flex flex-col items-center text-center border border-theme-border shadow-theme-sm transition-all transition-theme-normal">
                <div className="text-theme-primary text-2xl font-bold mb-1 transition-colors transition-theme-normal">
                  1h 24m
                </div>
                <div className="text-theme-secondary text-sm transition-colors transition-theme-normal">


                  Total Duration
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right panel - Submodule list */}
        <div className="w-full md:w-1/3">


          <div className="bg-theme-surface/80 rounded-lg overflow-hidden border border-theme-border shadow-theme-sm transition-all transition-theme-normal">
            <div className="p-4 border-b border-theme-border transition-colors transition-theme-normal">
              <h3 className="text-theme-primary font-semibold transition-colors transition-theme-normal">Module Content</h3>
            </div>
            
            <div className="max-h-[500px] overflow-y-auto">
              <ul className="divide-y divide-theme-border/50 transition-colors transition-theme-normal">


                {submodules.map((submodule, index) => (
                  <li
                    key={submodule.id}
                    className={`p-4 flex items-center hover:bg-[var(--theme-bg-primary)]/30 dark:hover:bg-white/5 cursor-pointer transition-colors ${selectedSubmoduleId === submodule.id ? 'bg-[var(--theme-bg-primary)]/50 dark:bg-white/10' : ''}`}
                    onClick={() => handlePlayModule(submodule.id)}
                  >


                    <div className="flex-shrink-0 mr-3 text-theme-primary transition-colors transition-theme-normal">


                      {submodule.isLocked ? (
                        <Lock className="h-5 w-5" />
                      ) : submodule.isCompleted ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (


                        <div className="w-5 h-5 rounded-full border-2 border-theme-primary flex items-center justify-center transition-colors transition-theme-normal">

                          <span className="text-xs font-semibold">{index + 1}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <h4 className={`text-sm font-medium ${submodule.isLocked ? 'text-[var(--theme-text-primary)]/50 dark:text-white/40' : 'text-[var(--theme-text-primary)] dark:text-white'}`}>
                        {submodule.title}
                      </h4>
                      <div className="flex items-center mt-1">
                        <span className={`text-xs ${submodule.isLocked ? 'text-[var(--theme-text-primary)]/40 dark:text-white/30' : 'text-[var(--theme-text-primary)]/60 dark:text-white/50'}`}>
                          {submodule.duration}
                        </span>
                        {submodule.isLocked && (


                          <span className="ml-2 text-xs px-2 py-0.5 bg-theme-accent/10 rounded-full text-theme-secondary transition-colors transition-theme-normal">


                            Premium
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3">
            <button
              className="bg-theme-gradient-primary
                       text-theme-on-primary-4 py-2 rounded-md 
                       shadow-theme-btn
                       transition-all transition-theme-bounce
                       hover:translate-y-[var(--theme-anim-distance)] hover:scale-[var(--theme-anim-scale)] 
                       hover:shadow-theme-md


                       w-full flex items-center justify-center gap-2"
            >
              <Play className="h-4 w-4" />
              Continue Learning
            </button>
            
            <button


              className="border border-theme-accent-secondary text-theme-accent-secondary
                       px-4 py-2 rounded-md 
                       hover:bg-theme-accent-secondary/5
                       transition-all transition-theme-bounce
                       hover:translate-y-[var(--theme-anim-distance-sm)] hover:scale-[var(--theme-anim-scale-sm)] 


                       w-full"
            >
              View Resources
            </button>
          </div>
        </div>
      </div>
    </VSModal>
  );
};

export { VSSubmoduleModal };