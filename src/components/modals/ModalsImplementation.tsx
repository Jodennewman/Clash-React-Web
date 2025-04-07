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
      {/* Theme-aware floating elements */}
      <div className="floating-element absolute top-40 left-[10%] w-32 h-32 rounded-[40%] rotate-12 opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-primary)]"></div>
      <div className="floating-element absolute bottom-60 right-[10%] w-48 h-48 rounded-[30%] -rotate-6 opacity-[var(--theme-float-opacity-secondary)] bg-[var(--theme-float-bg-secondary)]"></div>
      
      {/* Simple test panel for quick modal testing */}
      <div className="container mx-auto px-4 mb-16">
        <div className="bg-theme-gradient rounded-lg p-6 shadow-theme-md border border-theme-border">
          <h2 className="text-xl font-bold text-theme-primary mb-4 border-b border-theme-border pb-2">Quick Test Panel</h2>
          <ModalTest />
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-theme-primary mb-4 transition-colors transition-theme-normal">VS Modal System</h2>
          <p className="text-theme-secondary max-w-2xl mx-auto transition-colors transition-theme-normal">
            Integrated modal components for the Vertical Shortcut website that follow VS styling guidelines.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Application Modal Card */}
          <div className="modal-card bg-theme-gradient rounded-lg p-6 shadow-theme-md border border-theme-border transition-all transition-theme-bounce hover:translate-y-[var(--theme-anim-distance)] hover:scale-[var(--theme-anim-scale)] hover:shadow-theme-lg hover:border-theme-accent/20">
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-theme-primary mb-4 transition-colors transition-theme-normal">Application Form</h3>
              <p className="text-theme-secondary mb-6 transition-colors transition-theme-normal">
                Multi-step application form with validation and progress indicator.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-theme-primary flex items-center justify-center text-theme-on-primary-sm mr-3">1</div>
                  <span className="text-theme-primary">Personal Details</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-theme-border flex items-center justify-center text-theme-secondary text-sm mr-3">2</div>
                  <span className="text-theme-secondary">Experience Level</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-theme-border flex items-center justify-center text-theme-secondary text-sm mr-3">3</div>
                  <span className="text-theme-secondary">Goals & Objectives</span>
                </div>
              </div>
              
              <button
                onClick={() => setShowApplicationModal(true)}
                className="bg-theme-gradient-primary text-theme-on-primary-4 py-2 rounded-full shadow-theme-btn transition-all transition-theme-bounce hover:translate-y-[var(--theme-anim-distance)] hover:scale-[var(--theme-anim-scale)] hover:shadow-theme-md w-full"
              >
                Open Application Form
              </button>
            </div>
          </div>
          
          {/* Course Viewer Modal Card */}
          <div className="modal-card bg-theme-gradient rounded-lg p-6 shadow-theme-md border border-theme-border transition-all transition-theme-bounce hover:translate-y-[var(--theme-anim-distance)] hover:scale-[var(--theme-anim-scale)] hover:shadow-theme-lg hover:border-theme-accent/20">
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-theme-primary mb-4 transition-colors transition-theme-normal">Course Module Viewer</h3>
              <p className="text-theme-secondary mb-6 transition-colors transition-theme-normal">
                Interactive course module viewer with video player and navigation.
              </p>
              
              <div className="aspect-video rounded-lg overflow-hidden mb-6 bg-theme-border/20 relative">
                <img 
                  src="/assets/main/DataBaseThumbnails/AlexExplainsmore0.webp"
                  alt="Course thumbnail"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-theme-primary flex items-center justify-center shadow-theme-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-theme-on-primary-1">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowSubmoduleModal(true)}
                className="bg-theme-gradient-secondary text-theme-on-primary-4 py-2 rounded-full shadow-theme-btn transition-all transition-theme-bounce hover:translate-y-[var(--theme-anim-distance)] hover:scale-[var(--theme-anim-scale)] hover:shadow-theme-md w-full"
              >
                View Module Content
              </button>
            </div>
          </div>
          
          {/* Quiz Modal Card */}
          <div className="modal-card bg-theme-gradient rounded-lg p-6 shadow-theme-md border border-theme-border transition-all transition-theme-bounce hover:translate-y-[var(--theme-anim-distance)] hover:scale-[var(--theme-anim-scale)] hover:shadow-theme-lg hover:border-theme-accent/20">
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-theme-primary mb-4 transition-colors transition-theme-normal">Knowledge Quiz</h3>
              <p className="text-theme-secondary mb-6 transition-colors transition-theme-normal">
                Interactive quiz with progress tracking and results.
              </p>
              
              <div className="p-4 bg-theme-surface/20 rounded-md mb-6 border border-theme-border">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-theme-secondary">Question 1 of 3</div>
                  <div className="flex gap-1">
                    <div className="h-1.5 w-6 rounded-full bg-theme-primary"></div>
                    <div className="h-1.5 w-6 rounded-full bg-theme-border"></div>
                    <div className="h-1.5 w-6 rounded-full bg-theme-border"></div>
                  </div>
                </div>
                
                <p className="text-theme-primary text-sm mb-2 font-medium">Sample Question:</p>
                <p className="text-theme-secondary mb-2">What is the most important factor for content engagement?</p>
              </div>
              
              <button
                onClick={() => setShowQuizModal(true)}
                className="bg-theme-gradient-accent text-theme-on-primary-4 py-2 rounded-full shadow-theme-btn transition-all transition-theme-bounce hover:translate-y-[var(--theme-anim-distance)] hover:scale-[var(--theme-anim-scale)] hover:shadow-theme-md w-full"
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