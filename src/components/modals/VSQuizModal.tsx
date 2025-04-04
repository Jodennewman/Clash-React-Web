import React, { useState } from 'react';
import { VSModal } from '../ui/vs-modal';

interface VSQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (score: number, answers: Record<string, string>) => void;
  questions: QuizQuestion[];
  title?: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: { value: string; label: string }[];
  explanation?: string;
}

/**
 * VSQuizModal - Quiz modal component with progress tracking
 * 
 * Features:
 * - Multi-step quiz workflow
 * - Progress indicator
 * - VS-styled design elements
 * - Result calculation and display
 */
const VSQuizModal: React.FC<VSQuizModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  questions,
  title = 'Knowledge Check'
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const totalSteps = questions.length;
  const currentQuestion = questions[currentStep];

  // Handle answer selection
  const handleSelect = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    });
  };

  // Handle next step
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step => calculate score
      const calculatedScore = calculateScore();
      setScore(calculatedScore);
      setShowResults(true);
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Calculate quiz score
  const calculateScore = () => {
    // This is a placeholder - in a real implementation,
    // you would compare against correct answers
    return Math.floor(Math.random() * 101); // Returns 0-100
  };

  // Handle quiz completion
  const handleComplete = () => {
    onComplete(score, answers);
    onClose();
  };

  // Reset the quiz
  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  return (
    <VSModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      width="lg"
    >
      {!showResults ? (
        <>
          {/* Progress indicator */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-[var(--theme-text-primary)]/70 dark:text-white/60">
              Question {currentStep + 1} of {totalSteps}
            </div>
            <div className="flex gap-2">
              {Array(totalSteps).fill(0).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 w-6 rounded-full transition-all duration-300 ${idx <= currentStep
                    ? 'bg-[var(--theme-primary)] dark:bg-[var(--theme-primary)]'
                    : 'bg-[var(--theme-bg-secondary)]/30 dark:bg-white/10'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6 text-[var(--theme-text-primary)] dark:text-white">
              {currentQuestion.question}
            </h3>

            {/* Answer options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-[--border-radius-md] border cursor-pointer transition-all ${answers[currentQuestion.id] === option.value
                    ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 dark:border-[var(--theme-primary)] dark:bg-[var(--theme-primary)]/10'
                    : 'border-[var(--theme-bg-secondary)]/30 dark:border-white/10 hover:border-[var(--theme-bg-secondary)] dark:hover:border-white/30'
                    }`}
                  onClick={() => handleSelect(option.value)}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border ${answers[currentQuestion.id] === option.value
                      ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)] dark:border-[var(--theme-primary)] dark:bg-[var(--theme-primary)]'
                      : 'border-[var(--theme-text-primary)]/30 dark:border-white/30'
                      } flex-shrink-0 mr-3 flex items-center justify-center`}>
                      {answers[currentQuestion.id] === option.value && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                    <span className="text-[var(--theme-text-primary)]/80 dark:text-white/80">{option.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Explanation (if available) */}
            {currentQuestion.explanation && answers[currentQuestion.id] && (
              <div className="mt-6 p-4 bg-[var(--theme-bg-primary)]/30 dark:bg-white/5 rounded-[--border-radius-md] border border-[var(--theme-bg-secondary)]/20 dark:border-white/5">
                <h4 className="text-[var(--theme-text-primary)] dark:text-white text-sm font-medium mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2 text-[var(--theme-primary)] ">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  Explanation
                </h4>
                <p className="text-[var(--theme-text-primary)]/70 dark:text-white/60 text-sm">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded-[--border-radius-md] border ${currentStep === 0
                ? 'border-[var(--theme-bg-secondary)]/30 text-[var(--theme-text-primary)]/30 dark:border-white/5 dark:text-white/30 cursor-not-allowed'
                : 'border-[var(--theme-accent-secondary)] text-[var(--theme-accent-secondary)] dark:border-white/20 dark:text-white hover:bg-[var(--theme-accent-secondary)]/5 dark:hover:bg-white/5 hover-bubbly-sm'
                }`}
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!answers[currentQuestion.id]}
              className={`px-6 py-2 rounded-[--border-radius-md] ${!answers[currentQuestion.id]
                ? 'bg-[var(--theme-primary)]/30 cursor-not-allowed text-white'
                : 'vs-btn-primary-gradient dark:from-[var(--theme-primary)] dark:to-[var(--theme-primary-hover)] text-white shadow-[1px_1px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_0_8px_rgba(254,163,93,0.2)] hover:translate-y-[-3px] hover:scale-[1.03] hover:shadow-[1px_1px_8px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_0_15px_rgba(254,163,93,0.3)]'
                } transition-all duration-[--transition-bounce]`}
            >
              {currentStep === totalSteps - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        </>
      ) : (
        /* Results screen */
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <svg viewBox="0 0 36 36" className="w-full h-full transform rotate-[-90deg]">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#F3F4F6"
                strokeWidth="2"
                className="dark:stroke-white/10"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${2 * Math.PI * 16}`}
                strokeDashoffset={`${2 * Math.PI * 16 * (1 - score / 100)}`}
                strokeLinecap="round"
                className="text-[var(--theme-primary)] "
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-[var(--theme-text-primary)] dark:text-white">{score}%</span>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-3 text-[var(--theme-text-primary)] dark:text-white">
            {score >= 80 ? 'Great job!' : score >= 50 ? 'Good effort!' : 'Keep practicing!'}
          </h3>
          
          <p className="text-[var(--theme-text-primary)]/70 dark:text-white/70 mb-8 max-w-md mx-auto">
            {score >= 80
              ? 'Excellent work! You have a strong understanding of this topic.'
              : score >= 50
                ? 'You\'re making good progress. Keep learning to improve your knowledge.'
                : 'Don\'t worry! This is a learning opportunity. Review the material and try again.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-2 border border-[var(--theme-accent-secondary)] text-[var(--theme-accent-secondary)] dark:border-white/20 dark:text-white rounded-[--border-radius-md] hover:bg-[var(--theme-accent-secondary)]/5 dark:hover:bg-white/5 transition-all duration-[--transition-bounce] hover:translate-y-[-2px] hover:scale-[1.02]"
            >
              Retake Quiz
            </button>
            
            <button
              onClick={handleComplete}
              className="px-6 py-2 vs-btn-primary-gradient dark:from-[var(--theme-primary)] dark:to-[var(--theme-primary-hover)] text-white rounded-[--border-radius-md] shadow-[1px_1px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_0_8px_rgba(254,163,93,0.2)] transition-all duration-[--transition-bounce] hover:translate-y-[-3px] hover:scale-[1.03] hover:shadow-[1px_1px_8px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_0_15px_rgba(254,163,93,0.3)]"
            >
              Continue Learning
            </button>
          </div>
        </div>
      )}
    </VSModal>
  );
};

export { VSQuizModal };