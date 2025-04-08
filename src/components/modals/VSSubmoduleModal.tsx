import React, { useState } from 'react';
import { VSModal } from '../ui/vs-modal';
import { Play, CheckCircle, Lock } from 'lucide-react';

interface VSSubmoduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleId: string;
  moduleTitle: string;
  submodules: Submodule[];
  thumbnailUrl: string;
}

interface Submodule {
  id: string;
  title: string;
  duration: string;
  isCompleted?: boolean;
  isLocked?: boolean;
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

  const handlePlayModule = (submoduleId: string) => {
    // Check if submodule is locked
    const submodule = submodules.find(s => s.id === submoduleId);
    if (submodule?.isLocked) return;
    
    // Set as selected
    setSelectedSubmoduleId(submoduleId);
    
    // Implementation for actually playing the module would go here
    console.log(`Playing submodule: ${submoduleId}`);
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

            {/* Video thumbnail/player */}
            <img
              src={thumbnailUrl}
              alt={moduleTitle}
              className="w-full h-full object-cover"
            />
            
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

            <h3 className="text-[var(--theme-text-primary)] dark:text-white text-xl font-semibold mb-3">About This Module</h3>
            <p className="text-[var(--theme-text-primary)]/80 dark:text-white/70">

              This module covers essential techniques to create engaging content for your audience. You'll learn proven methods to increase retention and gain more followers through strategic content planning.
            </p>
            
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Module stats */}

              <div className="bg-theme-custom/50 /5 rounded-[--border-radius-md] p-4 flex flex-col items-center text-center">
                <div className="text-[var(--theme-primary)]  text-2xl font-bold mb-1">
                  {submodules.length}
                </div>
                <div className="text-[var(--theme-text-primary)]/70 dark:text-white/60 text-sm">

                  Lessons
                </div>
              </div>
              

              <div className="bg-theme-custom/50 /5 rounded-[--border-radius-md] p-4 flex flex-col items-center text-center">
                <div className="text-[var(--theme-primary)]  text-2xl font-bold mb-1">
                  {submodules.filter(s => s.isCompleted).length} / {submodules.length}
                </div>
                <div className="text-[var(--theme-text-primary)]/70 dark:text-white/60 text-sm">

                  Completed
                </div>
              </div>
              

              <div className="bg-theme-custom/50 /5 rounded-[--border-radius-md] p-4 flex flex-col items-center text-center">
                <div className="text-[var(--theme-primary)]  text-2xl font-bold mb-1">
                  1h 24m
                </div>
                <div className="text-[var(--theme-text-primary)]/70 dark:text-white/60 text-sm">

                  Total Duration
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right panel - Submodule list */}
        <div className="w-full md:w-1/3">

          <div className="bg-white/50 dark:bg-[var(--theme-bg-primary)]/50 rounded-[--border-radius-lg] overflow-hidden border border-[var(--theme-bg-secondary)]/30 dark:border-white/5">
            <div className="p-4 border-b border-[var(--theme-bg-secondary)]/30 dark:border-white/5">
              <h3 className="text-[var(--theme-text-primary)] dark:text-white font-semibold">Module Content</h3>
            </div>
            
            <div className="max-h-[500px] overflow-y-auto">
              <ul className="divide-y divide-[--bg-cream-darker]/30 dark:divide-white/5">

                {submodules.map((submodule, index) => (
                  <li
                    key={submodule.id}
                    className={`p-4 flex items-center hover:bg-[var(--theme-bg-primary)]/30 dark:hover:bg-white/5 cursor-pointer transition-colors ${selectedSubmoduleId === submodule.id ? 'bg-[var(--theme-bg-primary)]/50 dark:bg-white/10' : ''}`}
                    onClick={() => handlePlayModule(submodule.id)}
                  >

                    <div className="flex-shrink-0 mr-3 text-[var(--theme-primary)] ">

                      {submodule.isLocked ? (
                        <Lock className="h-5 w-5" />
                      ) : submodule.isCompleted ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (

                        <div className="w-5 h-5 rounded-full border-2 border-[var(--theme-primary)]  flex items-center justify-center">

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

                          <span className="ml-2 text-xs px-2 py-0.5 bg-[var(--theme-bg-secondary)]/30 dark:bg-white/10 rounded-full text-[var(--theme-text-primary)]/60 dark:text-white/60">

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

              className="vs-btn-primary-gradient
                       dark:bg-gradient-to-r dark:from-[var(--theme-primary)] dark:to-[var(--theme-primary-hover)]
                       text-white px-4 py-2 rounded-[--border-radius-md] 
                       shadow-[1px_1px_4px_rgba(0,0,0,0.1)]
                       dark:shadow-[0_0_8px_rgba(254,163,93,0.2)]
                       transition-all duration-[--transition-bounce]
                       hover:translate-y-[-3px] hover:scale-[1.03] 
                       hover:shadow-[1px_1px_8px_rgba(0,0,0,0.15)]
                       dark:hover:shadow-[0_0_15px_rgba(254,163,93,0.3)]

                       w-full flex items-center justify-center gap-2"
            >
              <Play className="h-4 w-4" />
              Continue Learning
            </button>
            
            <button

              className="border border-[var(--theme-accent-secondary)] text-[var(--theme-accent-secondary)]
                       dark:border-white/20 dark:text-white
                       px-4 py-2 rounded-[--border-radius-md] 
                       hover:bg-[var(--theme-accent-secondary)]/5 dark:hover:bg-white/5
                       transition-all duration-[--transition-bounce]
                       hover:translate-y-[-2px] hover:scale-[1.02] 

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