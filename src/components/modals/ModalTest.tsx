import React, { useState } from 'react';
import { VSModal } from '../ui/vs-modal';
import { VSApplicationModal } from './VSApplicationModal';
import { VSSubmoduleModal } from './VSSubmoduleModal';
import { VSQuizModal } from './VSQuizModal';

/**
 * ModalTest - A simple component to test each modal individually
 */
const ModalTest: React.FC = () => {
  const [showBasicModal, setShowBasicModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showSubmoduleModal, setShowSubmoduleModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  // Sample submodules data
  const submodules = [
    {
      id: 'sub-1',
      title: 'Getting Started with VS',
      duration: '5:24',
      isCompleted: true
    },
    {
      id: 'sub-2',
      title: 'Creating Your First Project',
      duration: '8:15',
      isCompleted: false
    }
  ];

  // Sample quiz questions
  const questions = [
    {
      id: 'q1',
      question: 'What does VS stand for?',
      options: [
        { value: 'a', label: 'Visual Studio' },
        { value: 'b', label: 'Vertical Shortcut' },
        { value: 'c', label: 'Video System' },
        { value: 'd', label: 'Virtual Space' }
      ]
    },
    {
      id: 'q2',
      question: 'Which of these is NOT a VS feature?',
      options: [
        { value: 'a', label: 'Dark Mode' },
        { value: 'b', label: 'Floating Elements' },
        { value: 'c', label: 'Database Management' },
        { value: 'd', label: 'Gradient Backgrounds' }
      ]
    }
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[--text-navy] dark:text-white">Modal Test Panel</h2>
        <p className="text-[--text-navy]/70 dark:text-white/70">
          Click the buttons below to test each modal type.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => setShowBasicModal(true)}
          className="p-4 bg-gradient-to-br from-white to-[--bg-cream]/80 dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker] rounded-[--border-radius-md] shadow-md hover-bubbly"
        >
          <span className="text-[--text-navy] dark:text-white">Basic Modal</span>
        </button>

        <button
          onClick={() => setShowApplicationModal(true)}
          className="p-4 bg-gradient-to-br from-white to-[--bg-cream]/80 dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker] rounded-[--border-radius-md] shadow-md hover-bubbly"
        >
          <span className="text-[--text-navy] dark:text-white">Application Modal</span>
        </button>

        <button
          onClick={() => setShowSubmoduleModal(true)}
          className="p-4 bg-gradient-to-br from-white to-[--bg-cream]/80 dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker] rounded-[--border-radius-md] shadow-md hover-bubbly"
        >
          <span className="text-[--text-navy] dark:text-white">Submodule Modal</span>
        </button>

        <button
          onClick={() => setShowQuizModal(true)}
          className="p-4 bg-gradient-to-br from-white to-[--bg-cream]/80 dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker] rounded-[--border-radius-md] shadow-md hover-bubbly"
        >
          <span className="text-[--text-navy] dark:text-white">Quiz Modal</span>
        </button>
      </div>

      {/* Basic Modal */}
      <VSModal
        isOpen={showBasicModal}
        onClose={() => setShowBasicModal(false)}
        title="Basic Modal"
      >
        <div>
          <p className="text-[--text-navy] dark:text-white">
            This is a simple basic modal with minimal content.
          </p>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setShowBasicModal(false)}
              className="bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover] dark:from-[--primary-orange] dark:to-[--primary-orange-hover] text-white px-4 py-2 rounded-[--border-radius-md] shadow-md hover-bubbly"
            >
              Close
            </button>
          </div>
        </div>
      </VSModal>

      {/* Application Modal */}
      <VSApplicationModal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        onSubmit={(data) => {
          console.log('Form submitted:', data);
          setShowApplicationModal(false);
          alert('Application submitted!');
        }}
      />

      {/* Submodule Modal */}
      <VSSubmoduleModal
        isOpen={showSubmoduleModal}
        onClose={() => setShowSubmoduleModal(false)}
        moduleId="module-test"
        moduleTitle="Test Module"
        submodules={submodules}
        thumbnailUrl="/assets/main/DataBaseThumbnails/AlexExplainsmore0.webp"
      />

      {/* Quiz Modal */}
      <VSQuizModal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        questions={questions}
        title="Test Quiz"
        onComplete={(score, answers) => {
          console.log('Quiz completed:', score, answers);
          alert(`Quiz completed with score: ${score}%`);
        }}
      />
    </div>
  );
};

export default ModalTest;