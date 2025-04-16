import React from 'react';
import { Compass, ChevronRight } from 'lucide-react';
import { Button } from "../components/ui/button";

interface TiaIntroStageProps {
  onNext: () => void;
  onClose: () => void;
  headline: string;
  subheading: string;
  processLabel: string;
  processNote: string;
  processSteps: string[];
  customFeature: string;
  disclaimerText: string;
  primaryButtonText: string;
  secondaryButtonText: string;
}

const TiaIntroStage: React.FC<TiaIntroStageProps> = ({ 
  onNext, 
  onClose,
  headline,
  subheading,
  processLabel,
  processNote,
  processSteps,
  customFeature,
  disclaimerText,
  primaryButtonText,
  secondaryButtonText
}) => {
  return (
    <div className="p-5 md:p-6">
      <div className="flex flex-col space-y-4">
        {/* Title header */}
        <div className="mb-2">
          <h4 className="text-theme-primary text-base font-medium">Build your Perfect Content System</h4>
        </div>
        
        {/* Process steps - improved size and balance with hover effect */}
        <div className="bg-theme-gradient/5 hover:bg-theme-gradient/10 hover:border-theme-primary/20 transition-all duration-300 rounded-lg p-5 border border-theme-border-light cursor-pointer">
          <div className="flex items-center mb-2">
            <h4 className="text-base md:text-lg font-medium text-theme-primary">{processLabel}</h4>
            <span className="text-sm text-theme-tertiary ml-2">{processNote}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6">
            {processSteps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div className={`h-16 w-16 rounded-full ${
                    index === 0 ? 'bg-theme-accent-secondary-light' : 
                    index === 1 ? 'bg-theme-gradient-secondary' : 
                    'bg-theme-gradient-accent'
                  } text-white font-bold text-lg flex items-center justify-center mb-3 shadow-theme-sm`}>
                    {index + 1}
                  </div>
                  <span className="text-theme-secondary text-base font-medium text-center">{step}</span>
                </div>
                
                {index < processSteps.length - 1 && (
                  <>
                    <div className="hidden sm:block text-theme-primary text-2xl">→</div>
                    <div className="block sm:hidden text-theme-primary text-2xl rotate-90 my-2">↓</div>
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Tailoring message below process section */}
        <div className="p-2">
          <p className="text-theme-primary text-center text-xl md:text-2xl font-medium tracking-wide">
            We'll tailor our 1 Billion view system to match your team size, implementation preference, vision and growth timeline
          </p>
        </div>
      </div>
    </div>
  );
};

export default TiaIntroStage;