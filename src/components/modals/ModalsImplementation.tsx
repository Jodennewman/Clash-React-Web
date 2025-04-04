import React, { useState, useEffect } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Import all modals
import { VSModal } from '../ui/vs-modal';
import { VSApplicationModal } from './VSApplicationModal';
import { VSSubmoduleModal } from './VSSubmoduleModal';
import { VSQuizModal } from './VSQuizModal';
import ModalTest from './ModalTest';

const ModalsImplementation: React.FC = () => {
  // State for controlling modal visibility
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showSubmoduleModal, setShowSubmoduleModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  // Refs for animation
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Sample data for submodule modal
  const sampleSubmodules = [
    {
      id: 'submodule-1',
      title: 'Introduction to Content Creation',
      duration: '10:24',
      isCompleted: true,
      isLocked: false
    },
    {
      id: 'submodule-2',
      title: 'Understanding Your Audience',
      duration: '15:36',
      isCompleted: true,
      isLocked: false
    },
    {
      id: 'submodule-3',
      title: 'Creating Engaging Hooks',
      duration: '12:58',
      isCompleted: false,
      isLocked: false
    },
    {
      id: 'submodule-4',
      title: 'Advanced Content Strategies',
      duration: '20:12',
      isCompleted: false,
      isLocked: true
    },
    {
      id: 'submodule-5',
      title: 'Analytics & Optimization',
      duration: '18:45',
      isCompleted: false,
      isLocked: true
    }
  ];
  
  // Sample data for quiz modal
  const sampleQuizQuestions = [
    {
      id: 'q1',
      question: 'What is the most important factor for content engagement?',
      options: [
        { value: 'a', label: 'High production quality' },
        { value: 'b', label: 'Effective hooks in the first 3 seconds' },
        { value: 'c', label: 'Video length' },
        { value: 'd', label: 'Background music' }
      ],
      explanation: 'Research shows that the first 3 seconds of your content determine whether viewers will continue watching or scroll past.'
    },
    {
      id: 'q2',
      question: 'Which content format typically performs best for educational topics?',
      options: [
        { value: 'a', label: 'Long-form tutorials' },
        { value: 'b', label: 'Quick tips and actionable advice' },
        { value: 'c', label: 'Interview style' },
        { value: 'd', label: 'Slideshow presentations' }
      ]
    },
    {
      id: 'q3',
      question: 'What is the recommended frequency for posting content?',
      options: [
        { value: 'a', label: 'Daily' },
        { value: 'b', label: 'Consistent schedule based on your capacity' },
        { value: 'c', label: 'Only when inspiration strikes' },
        { value: 'd', label: 'Weekdays only' }
      ],
      explanation: 'Consistency matters more than frequency. Determine a schedule you can maintain and stick to it.'
    }
  ];

  // GSAP animations for cards and elements
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animate the cards on load
      gsap.fromTo('.modal-card', 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "back.out(1.2)"
        }
      );

      // Floating elements animation
      gsap.to(".floating-element", {
        y: -10,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.4
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  // Handlers for application modal
  const handleApplicationSubmit = (data: any) => {
    console.log('Application submitted:', data);
    setShowApplicationModal(false);
    // Here you would typically send the data to your backend
    alert('Application submitted successfully!');
  };
  
  // Handlers for quiz modal
  const handleQuizComplete = (score: number, answers: Record<string, string>) => {
    console.log('Quiz completed with score:', score, 'Answers:', answers);
    // Show a success message or navigate to next step
    alert(`Quiz completed with score: ${score}%`);
  };

  return (
    <div ref={containerRef} className="py-12 relative overflow-hidden">
      {/* Background floating elements - light mode */}
      <div className="floating-element absolute top-40 left-[10%] w-32 h-32 rounded-[40%] rotate-12 opacity-5 bg-[var(--theme-primary)] hidden dark:hidden"></div>
      <div className="floating-element absolute bottom-60 right-[10%] w-48 h-48 rounded-[30%] -rotate-6 opacity-8 bg-[var(--theme-primary-hover)] hidden dark:hidden"></div>
      
      {/* Background floating elements - dark mode */}
      <div className="floating-element absolute top-40 left-[10%] w-32 h-32 rounded-[40%] rotate-12 opacity-10 vs-btn-primary-gradient hidden dark:block"></div>
      <div className="floating-element absolute bottom-60 right-[10%] w-48 h-48 rounded-[30%] -rotate-6 opacity-15 vs-btn-secondary-gradient hidden dark:block"></div>
      
      {/* Simple test panel for quick modal testing */}
      <div className="container mx-auto px-4 mb-16">
        <div className="bg-theme-gradient dark:from-[var(--theme-bg-primary)]  rounded-[--border-radius-lg] p-6 shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(53,115,128,0.15)]">
          <h2 className="text-xl font-bold text-[var(--theme-text-primary)] dark:text-white mb-4 border-b border-[var(--theme-bg-secondary)]/20 dark:border-white/10 pb-2">Quick Test Panel</h2>
          <ModalTest />
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[var(--theme-text-primary)] dark:text-white mb-4">VS Modal System</h2>
          <p className="text-[var(--theme-text-primary)]/70 dark:text-white/70 max-w-2xl mx-auto">
            Integrated modal components for the Vertical Shortcut website that follow VS styling guidelines.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Application Modal Card */}
          <div className="modal-card bg-theme-gradient dark:from-[var(--theme-bg-primary)]  rounded-[--border-radius-lg] p-6 shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(53,115,128,0.15)] transition-all duration-[--transition-bounce] hover:translate-y-[-4px] hover:scale-[1.02] hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_20px_rgba(53,115,128,0.2)]">
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-[var(--theme-text-primary)] dark:text-white mb-4">Application Form</h3>
              <p className="text-[var(--theme-text-primary)]/70 dark:text-white/70 mb-6">
                Multi-step application form with validation and progress indicator.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-[var(--theme-primary)]  flex items-center justify-center text-white text-sm mr-3">1</div>
                  <span className="text-[var(--theme-text-primary)]/80 dark:text-white/80">Personal Details</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-[var(--theme-bg-secondary)]/50 dark:bg-white/20 flex items-center justify-center text-[var(--theme-text-primary)]/50 dark:text-white/50 text-sm mr-3">2</div>
                  <span className="text-[var(--theme-text-primary)]/60 dark:text-white/60">Experience Level</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-[var(--theme-bg-secondary)]/50 dark:bg-white/20 flex items-center justify-center text-[var(--theme-text-primary)]/50 dark:text-white/50 text-sm mr-3">3</div>
                  <span className="text-[var(--theme-text-primary)]/60 dark:text-white/60">Goals & Objectives</span>
                </div>
              </div>
              
              <button
                onClick={() => setShowApplicationModal(true)}
                className="vs-btn-primary-gradient dark:from-[var(--theme-primary)] dark:to-[var(--theme-primary-hover)] text-white px-4 py-2 rounded-full shadow-[1px_1px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_0_8px_rgba(254,163,93,0.2)] transition-all duration-[--transition-bounce] hover:translate-y-[-3px] hover:scale-[1.03] hover:shadow-[1px_1px_8px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_0_15px_rgba(254,163,93,0.3)] w-full"
              >
                Open Application Form
              </button>
            </div>
          </div>
          
          {/* Course Viewer Modal Card */}
          <div className="modal-card bg-theme-gradient dark:from-[var(--theme-bg-primary)]  rounded-[--border-radius-lg] p-6 shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(53,115,128,0.15)] transition-all duration-[--transition-bounce] hover:translate-y-[-4px] hover:scale-[1.02] hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_20px_rgba(53,115,128,0.2)]">
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-[var(--theme-text-primary)] dark:text-white mb-4">Course Module Viewer</h3>
              <p className="text-[var(--theme-text-primary)]/70 dark:text-white/70 mb-6">
                Interactive course module viewer with video player and navigation.
              </p>
              
              <div className="aspect-video rounded-lg overflow-hidden mb-6 bg-[var(--theme-bg-secondary)]/20 dark:bg-white/5 relative">
                <img 
                  src="/assets/main/DataBaseThumbnails/AlexExplainsmore0.webp"
                  alt="Course thumbnail"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 dark:bg-[var(--theme-primary)] flex items-center justify-center shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[var(--theme-primary)] dark:text-white ml-1">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowSubmoduleModal(true)}
                className="bg-[var(--theme-accent-secondary)]  text-white px-4 py-2 rounded-full shadow-[1px_1px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_0_8px_rgba(53,115,128,0.15)] transition-all duration-[--transition-bounce] hover:translate-y-[-3px] hover:scale-[1.03] hover:shadow-[1px_1px_8px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_0_15px_rgba(53,115,128,0.2)] w-full"
              >
                View Module Content
              </button>
            </div>
          </div>
          
          {/* Quiz Modal Card */}
          <div className="modal-card bg-theme-gradient dark:from-[var(--theme-bg-primary)]  rounded-[--border-radius-lg] p-6 shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(53,115,128,0.15)] transition-all duration-[--transition-bounce] hover:translate-y-[-4px] hover:scale-[1.02] hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_20px_rgba(53,115,128,0.2)]">
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-[var(--theme-text-primary)] dark:text-white mb-4">Knowledge Quiz</h3>
              <p className="text-[var(--theme-text-primary)]/70 dark:text-white/70 mb-6">
                Interactive quiz with progress tracking and results.
              </p>
              
              <div className="p-4 bg-[var(--theme-bg-primary)]/30 dark:bg-white/5 rounded-[--border-radius-md] mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-[var(--theme-text-primary)]/70 dark:text-white/60">Question 1 of 3</div>
                  <div className="flex gap-1">
                    <div className="h-1.5 w-6 rounded-full bg-[var(--theme-primary)] "></div>
                    <div className="h-1.5 w-6 rounded-full bg-[var(--theme-bg-secondary)]/30 dark:bg-white/10"></div>
                    <div className="h-1.5 w-6 rounded-full bg-[var(--theme-bg-secondary)]/30 dark:bg-white/10"></div>
                  </div>
                </div>
                
                <p className="text-[var(--theme-text-primary)] dark:text-white text-sm mb-2 font-medium">Sample Question:</p>
                <p className="text-[var(--theme-text-primary)]/80 dark:text-white/80 mb-2">What is the most important factor for content engagement?</p>
              </div>
              
              <button
                onClick={() => setShowQuizModal(true)}
                className="vs-gradient-coral-diagonal dark:from-[var(--theme-accent-tertiary)] dark:to-[var(--theme-accent-quaternary)] text-white px-4 py-2 rounded-full shadow-[1px_1px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_0_8px_rgba(222,107,89,0.2)] transition-all duration-[--transition-bounce] hover:translate-y-[-3px] hover:scale-[1.03] hover:shadow-[1px_1px_8px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_0_15px_rgba(222,107,89,0.3)] w-full"
              >
                Take Knowledge Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Render all the actual modals */}
      
      {/* Application Modal */}
      <VSApplicationModal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        onSubmit={handleApplicationSubmit}
      />
      
      {/* Submodule Modal */}
      <VSSubmoduleModal
        isOpen={showSubmoduleModal}
        onClose={() => setShowSubmoduleModal(false)}
        moduleId="module-1"
        moduleTitle="Content Creation Fundamentals"
        submodules={sampleSubmodules}
        thumbnailUrl="/assets/main/DataBaseThumbnails/AlexExplainsmore0.webp"
      />
      
      {/* Quiz Modal */}
      <VSQuizModal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        onComplete={handleQuizComplete}
        questions={sampleQuizQuestions}
        title="Content Creation Quiz"
      />
    </div>
  );
};

export default ModalsImplementation;