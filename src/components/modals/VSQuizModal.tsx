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
            <div className="text-theme-secondary/70">
              Question {currentStep + 1} of {totalSteps}
            </div>
            <div className="flex gap-2">
              {Array(totalSteps).fill(0).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                    idx <= currentStep
                      ? 'bg-theme-primary'
                      : 'bg-theme-bg-secondary/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6 text-theme-primary">
              {currentQuestion.question}
            </h3>

            {/* Answer options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-[--border-radius-md] border cursor-pointer transition-all ${
                    answers[currentQuestion.id] === option.value
                      ? 'border-theme-primary bg-theme-primary/10'
                      : 'border-theme-border-light hover:border-theme-border-medium'
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border ${
                      answers[currentQuestion.id] === option.value
                        ? 'border-theme-primary bg-theme-primary'
                        : 'border-theme-border-medium'
                      } flex-shrink-0 mr-3 flex items-center justify-center`}>
                      {answers[currentQuestion.id] === option.value && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-theme-on-primary">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                    <span className="text-theme-secondary/80">{option.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Explanation (if available) */}
            {currentQuestion.explanation && answers[currentQuestion.id] && (
              <div className="mt-6 p-4 bg-theme-bg-light rounded-[--border-radius-md] border border-theme-border-light">
                <h4 className="text-theme-primary text-sm font-medium mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2 text-theme-primary">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  Explanation
                </h4>
                <p className="text-theme-secondary/70 text-sm">
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
              className={`px-4 py-2 rounded-[--border-radius-md] border ${
                currentStep === 0
                  ? 'border-theme-border-light text-theme-secondary/30 cursor-not-allowed'
                  : 'border-theme-accent-secondary text-theme-accent-secondary hover:bg-theme-accent-secondary/5 hover-bubbly-sm'
              }`}
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!answers[currentQuestion.id]}
              className={`px-6 py-2 rounded-[--border-radius-md] ${
                !answers[currentQuestion.id]
                  ? 'bg-theme-primary/30 cursor-not-allowed text-white'
                  : 'bg-theme-gradient-primary text-white shadow-theme-sm hover-bubbly'
              } transition-all duration-[var(--theme-transition-bounce)]`}
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
                stroke="var(--theme-bg-secondary)"
                strokeWidth="2"
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
                className="text-theme-primary"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-theme-primary">{score}%</span>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-3 text-theme-primary">
            {score >= 80 ? 'Great job!' : score >= 50 ? 'Good effort!' : 'Keep practicing!'}
          </h3>
          
          <p className="text-theme-secondary/70 mb-8 max-w-md mx-auto">
            {score >= 80
              ? 'Excellent work! You have a strong understanding of this topic.'
              : score >= 50
                ? 'You\'re making good progress. Keep learning to improve your knowledge.'
                : 'Don\'t worry! This is a learning opportunity. Review the material and try again.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-2 border border-theme-accent-secondary text-theme-accent-secondary rounded-[--border-radius-md] hover:bg-theme-accent-secondary/5 transition-all duration-[var(--theme-transition-bounce)] hover-bubbly-sm"
            >
              Retake Quiz
            </button>
            
            <button
              onClick={handleComplete}
              className="px-6 py-2 bg-theme-gradient-primary text-theme-on-primary-[--border-radius-md] shadow-theme-sm transition-all duration-[var(--theme-transition-bounce)] hover-bubbly"
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