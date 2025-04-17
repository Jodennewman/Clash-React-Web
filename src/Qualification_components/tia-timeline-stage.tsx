import React from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';

interface QuestionOption {
  id: string;
  label: string;
  description: string;
  value: string;
}

interface TiaTimelineStageProps {
  options: QuestionOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  isAnimating: boolean;
  selectedChoice: string | null;
  onBack?: () => void; // Optional back handler
}

const TiaTimelineStage: React.FC<TiaTimelineStageProps> = ({
  options,
  selectedValue,
  onSelect,
  isAnimating,
  selectedChoice,
  onBack
}) => {
  return (
    <div className="p-4">
      <div className="flex flex-col space-y-3">
        {/* Header without box - more compact */}
        <div className="pb-1">
          <p className="text-theme-primary text-left text-lg md:text-xl font-medium tracking-wide">
            We'll adjust the implementation plan to align with your goals
          </p>
        </div>
          
        {/* Options without containing box - more compact */}
        <div className="flex flex-col gap-2">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelect(option.value)}
              data-value={option.value}
              className={`flex items-center p-3 rounded-lg border transition-all duration-300
                        ${selectedValue === option.value
                          ? 'border-theme-primary bg-orange-500/30 dark:bg-amber-400/40' 
                          : 'border-theme-border-light bg-transparent hover:border-theme-primary/30 hover:bg-theme-primary/5'
                        }
                        min-h-[60px]`}
              aria-selected={selectedValue === option.value}
            >
              <div className="flex-grow text-left">
                <h5 className="text-theme-primary font-medium">{option.label}</h5>
                <p className="text-theme-secondary text-xs leading-tight">{option.description}</p>
              </div>
              {selectedValue === option.value && (
                <CheckCircle className="h-5 w-5 text-theme-primary ml-3 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
        
        {/* Back button at the bottom left */}
        {onBack && (
          <div className="mt-4">
            <button 
              onClick={onBack}
              className="flex items-center text-theme-primary hover:text-theme-primary-hover transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TiaTimelineStage;