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
        <Button className="px-5 py-2 bg-[#0F1A22] border border-[#FEA35D]/30 text-white hover:bg-[#154D59]/30 gap-2">
          <HelpCircle className="h-4 w-4" />
          Not sure which plan is right? Take the Quiz
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#09232F] border-[#154D59] w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Find Your Perfect Plan</DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-white/60">
              Step {currentStep + 1} of {quizSteps.length}
            </div>
            <div className="flex gap-2">
              {Array(quizSteps.length).fill(0).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 w-6 rounded-full ${
                    idx <= currentStep ? 'bg-[#FEA35D]' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>

          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  answers[currentQuestion.key] === option.value
                    ? 'border-[#FEA35D] bg-[#FEA35D]/10'
                    : 'border-white/10 hover:border-white/30'
                }`}
                onClick={() => handleSelect(option.value)}
              >
                <span className="text-white/80">{option.label}</span>
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