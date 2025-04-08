import React, { useState } from 'react';
import { VSModal, VSApplicationModal, VSSubmoduleModal, VSQuizModal } from './index';

/**
 * VSModalExamples - Example component demonstrating all VS modal types
 * 
 * This component shows how to use all the VS modal components with sample data
 * and proper integration with the theme-aware VS styling system.
 */
const VSModalExamples: React.FC = () => {
  // State for modal visibility
  const [showBasicModal, setShowBasicModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showSubmoduleModal, setShowSubmoduleModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  
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
  
  // Handlers for application modal
  const handleApplicationSubmit = (data: any) => {
    console.log('Application submitted:', data);
    setShowApplicationModal(false);
  };
  
  // Handlers for quiz modal
  const handleQuizComplete = (score: number, answers: Record<string, string>) => {
    console.log('Quiz completed with score:', score, 'Answers:', answers);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-theme-primary mb-4">VS Modal Components</h2>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            A collection of modal components designed to match the VS style system with theme-aware styling.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Basic Modal Example */}
          <div className="bg-theme-gradient rounded-[var(--theme-border-radius-lg)] p-6 shadow-theme-md hover-bubbly">
            <h3 className="text-xl font-medium text-theme-primary mb-4">Basic Modal</h3>
            <p className="text-theme-secondary mb-6">A simple customizable modal with VS styling.</p>
            <button
              onClick={() => setShowBasicModal(true)}
              className="bg-theme-gradient-primary text-theme-on-primary-4 py-2 rounded-full shadow-theme-sm hover-bubbly-sm w-full"
            >
              Open Basic Modal
            </button>
          </div>
          
          {/* Application Modal Example */}
          <div className="bg-theme-gradient rounded-[var(--theme-border-radius-lg)] p-6 shadow-theme-md hover-bubbly">
            <h3 className="text-xl font-medium text-theme-primary mb-4">Application Form</h3>
            <p className="text-theme-secondary mb-6">Multi-step application form with validation.</p>
            <button
              onClick={() => setShowApplicationModal(true)}
              className="bg-theme-gradient-secondary text-theme-on-primary-4 py-2 rounded-full shadow-theme-sm hover-bubbly-sm w-full"
            >
              Open Application Form
            </button>
          </div>
          
          {/* Submodule Modal Example */}
          <div className="bg-theme-gradient rounded-[var(--theme-border-radius-lg)] p-6 shadow-theme-md hover-bubbly">
            <h3 className="text-xl font-medium text-theme-primary mb-4">Module Viewer</h3>
            <p className="text-theme-secondary mb-6">Course module viewer with video player and navigation.</p>
            <button
              onClick={() => setShowSubmoduleModal(true)}
              className="border border-theme-primary text-theme-primary hover:bg-[var(--theme-primary)]/10 px-4 py-2 rounded-full hover-bubbly-sm w-full"
            >
              View Module
            </button>
          </div>
          
          {/* Quiz Modal Example */}
          <div className="bg-theme-gradient rounded-[var(--theme-border-radius-lg)] p-6 shadow-theme-md hover-bubbly">
            <h3 className="text-xl font-medium text-theme-primary mb-4">Knowledge Quiz</h3>
            <p className="text-theme-secondary mb-6">Interactive quiz with progress tracking and results.</p>
            <button
              onClick={() => setShowQuizModal(true)}
              className="bg-theme-gradient-accent text-theme-on-primary-4 py-2 rounded-full shadow-theme-sm hover-bubbly-sm w-full"
            >
              Take Quiz
            </button>
          </div>
        </div>
        
        {/* Modal Components */}
        
        {/* Basic Modal */}
        <VSModal
          isOpen={showBasicModal}
          onClose={() => setShowBasicModal(false)}
          title="Welcome to Vertical Shortcut"
          description="Learn how to create engaging content"
          width="md"
        >
          <div className="space-y-4">
            <p className="text-theme-primary">
              This is a basic modal component styled according to the VS design system. It supports both light and dark modes with theme-aware styling.
            </p>
            
            <p className="text-theme-secondary">
              You can customize the width, add a title and description, and control whether the close button is shown. The modal also includes subtle floating elements and proper animations.
            </p>
            
            <div className="bg-theme-accent/10 p-4 rounded-[var(--theme-border-radius-md)] mt-4">
              <h4 className="text-theme-primary text-sm font-medium mb-2">Pro Tip</h4>
              <p className="text-theme-secondary text-sm">
                Use this modal as a base for building more complex modal components that need to follow the VS styling guidelines.
              </p>
            </div>
            
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setShowBasicModal(false)}
                className="bg-theme-gradient-primary text-theme-on-primary-6 py-2 rounded-[var(--theme-border-radius-md)] shadow-theme-sm hover-bubbly-sm"
              >
                Got it
              </button>
            </div>
          </div>
        </VSModal>
        
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
    </div>
  );
};

export { VSModalExamples };