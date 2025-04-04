import React, { useState } from 'react';
import { VSModal } from '../ui/vs-modal';
import { Button } from '../ui/button';
import { HelpCircle, XCircle } from 'lucide-react';
import { quizSteps } from '../../data/pricing';
import { AnimatedButton } from "../marble-buttons/AnimatedButton";

interface PricingQuizProps {
  onComplete: (recommendedPlan: number) => void;
}

export const VSPricingQuizModal = ({ onComplete }: PricingQuizProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = (value: string) => {
    const currentQuestion = quizSteps[currentStep];
    setAnswers({
      ...answers,
      [currentQuestion.key]: value
    });
  };

  const handleNext = () => {
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step => calculate recommendation
      const recommendation = calculateRecommendation();
      handleClose();
      onComplete(recommendation);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    
    // Reset for the next user session after animation completes
    setTimeout(() => {
      setCurrentStep(0);
      setAnswers({});
    }, 500);
  };

  const calculateRecommendation = () => {
    // Default to Blueprint
    let recommendation = 0;

    // Rule 1: If involvement is "none" OR speed is "fast" => Growth Engine
    if (answers.involvement === 'none' || answers.speed === 'fast') {
      recommendation = 2; // Viral Growth
    }
    // Rule 2: beginner/started + hands-on + slow => Blueprint
    else if (
      (answers.journey === 'beginner' || answers.journey === 'started') &&
      answers.involvement === 'hands-on' &&
      answers.speed === 'slow'
    ) {
      recommendation = 0; // Brand Blueprint
    }
    // Rule 3: All else => Authority Automator
    else {
      recommendation = 1; // Authority Automator
    }

    return recommendation;
  };

  const currentQuestion = quizSteps[currentStep];
  const isOptionSelected = currentQuestion && answers[currentQuestion.key];

  return (
    <>
      {/* Trigger Button */}
      <Button 
        onClick={handleOpen}
        className="px-5 py-2 bg-[var(--theme-bg-primary)] border border-[var(--theme-primary)]/30 text-white hover:bg-[var(--theme-accent-secondary)]/30 gap-2 hover-bubbly-sm"
      >
        <HelpCircle className="h-4 w-4" />
        Not sure which plan is right? Take the Quiz
      </Button>
      
      {/* Enhanced VS Modal */}
      <VSModal
        isOpen={isOpen}
        onClose={handleClose}
        closeOnOverlayClick={true}
        closeOnEsc={true}
        width="md"
        title="Find Your Perfect Plan"
      >
        <div className="p-6 bg-[var(--theme-bg-primary)] text-white rounded-lg">
          {/* Progress Indicator */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-white/60">
              Step {currentStep + 1} of {quizSteps.length}
            </div>
            <div className="flex gap-2">
              {Array(quizSteps.length).fill(0).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                    idx <= currentStep ? 'bg-[var(--theme-primary)]' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question */}
          <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>

          {/* Answer Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  answers[currentQuestion.key] === option.value
                    ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 hover:bg-[var(--theme-primary)]/15'
                    : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                }`}
                onClick={() => handleSelect(option.value)}
              >
                <span className="text-white/80">{option.label}</span>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <AnimatedButton
              text="Back"
              variant="docs"
              saturation="low"
              size="sm"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="w-auto"
            />
            <AnimatedButton
              text={currentStep === quizSteps.length - 1 ? "See My Result" : "Next"}
              variant="pro"
              saturation={currentStep === quizSteps.length - 1 ? "high" : "normal"}
              size="sm"
              onClick={handleNext}
              disabled={!isOptionSelected}
              className="w-auto"
            />
          </div>
          
          {/* Escape instruction */}
          <div className="text-center mt-6 text-sm text-white/50 flex justify-center items-center gap-1">
            <XCircle className="h-3 w-3" /> Press ESC or click outside to close quiz
          </div>
        </div>
      </VSModal>
    </>
  );
};