// src/components/pricing-quiz-modal.tsx
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { HelpCircle } from 'lucide-react';
import { quizSteps } from '../../data/pricing';
import { AnimatedButton } from "../marble-buttons/AnimatedButton";

interface PricingQuizProps {
  onComplete: (recommendedPlan: number) => void;
}

export const PricingQuizModal = ({ onComplete }: PricingQuizProps) => {
  const [open, setOpen] = useState(false);
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
      setOpen(false);
      onComplete(recommendation);

      // Reset for the next user session
      setTimeout(() => {
        setCurrentStep(0);
        setAnswers({});
      }, 500);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-5 py-2 bg-[--bg-navy]/75 backdrop-blur-sm border border-[--primary-orange]/30 dark:border-[--primary-orange-light]/30 text-white dark:text-white hover:bg-[--secondary-teal]/30 dark:hover:bg-[--secondary-teal]/30 gap-2 hover-bubbly-sm vs-card-shadow">
          <HelpCircle className="h-4 w-4" />
          Not sure which plan is right? Take the Quiz
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-[--bg-navy] to-[--bg-navy-darker]/80 
                          dark:bg-gradient-to-br dark:from-[--bg-navy] dark:to-[--bg-navy-darker]/80 
                          border border-white/10 dark:border-white/10 
                          shadow-[2px_2px_8px_rgba(0,0,0,0.1)] 
                          dark:shadow-[0_0_15px_rgba(53,115,128,0.15)] 
                          w-full max-w-md relative overflow-hidden">
        {/* Floating elements for visual interest */}
        <div className="absolute -z-10 top-10 right-10 w-16 h-16 rounded-[40%] rotate-12 opacity-5 
                     bg-[--primary-orange] animate-float-slow hidden dark:hidden"></div>
        <div className="absolute -z-10 bottom-10 left-10 w-20 h-20 rounded-[30%] -rotate-6 opacity-5
                     bg-[--accent-coral] animate-float-medium hidden dark:hidden"></div>
                    
        {/* Dark mode floating elements */}
        <div className="absolute -z-10 top-10 right-10 w-16 h-16 rounded-[40%] rotate-12 opacity-10 
                     bg-gradient-to-r from-[--primary-orange] to-[--primary-orange-hover] 
                     animate-float-slow hidden dark:block"></div>
        <div className="absolute -z-10 bottom-10 left-10 w-20 h-20 rounded-[30%] -rotate-6 opacity-10
                     bg-gradient-to-r from-[--secondary-teal] to-[--secondary-teal-hover] 
                     animate-float-medium hidden dark:block"></div>
                     
        <DialogHeader>
          <DialogTitle className="text-2xl text-white dark:text-white">Find Your Perfect Plan</DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-white/60 dark:text-white/60">
              Step {currentStep + 1} of {quizSteps.length}
            </div>
            <div className="flex gap-2">
              {Array(quizSteps.length).fill(0).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 w-6 rounded-full ${
                    idx <= currentStep ? 'bg-[--primary-orange] dark:bg-[--primary-orange-light]' : 'bg-white/20 dark:bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-6 text-white dark:text-white">{currentQuestion.question}</h3>

          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  answers[currentQuestion.key] === option.value
                    ? 'border-[--primary-orange] dark:border-[--primary-orange-light] bg-[--primary-orange]/10 dark:bg-[--primary-orange]/10'
                    : 'border-white/10 dark:border-white/10 hover:border-white/30 dark:hover:border-white/30'
                } hover-bubbly-sm`}
                onClick={() => handleSelect(option.value)}
              >
                <span className="text-white/80 dark:text-white/80">{option.label}</span>
              </div>
            ))}
          </div>

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
        </div>
      </DialogContent>
    </Dialog>
  );
};