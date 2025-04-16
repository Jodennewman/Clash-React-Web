import React from 'react';
import { CheckCircle } from 'lucide-react';

interface QuestionOption {
  id: string;
  label: string;
  description: string;
  value: string;
}

interface TiaQuestionStageProps {
  title: string;
  subTitle: string;
  note?: string;
  supportingText: string;
  options: QuestionOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  isAnimating: boolean;
  selectedChoice: string | null;
}

const TiaQuestionStage: React.FC<TiaQuestionStageProps> = ({
  title,
  subTitle,
  note,
  supportingText,
  options,
  selectedValue,
  onSelect,
  isAnimating,
  selectedChoice
}) => {
  return (
    <div className="p-5 md:p-6">
      <div className="flex flex-col space-y-4">
        {/* Title header - simple, left-aligned */}
        <div className="mb-2">
          <h4 className="text-theme-primary text-base font-medium">{title}</h4>
        </div>
        
        {/* Main content area with hover effect */}
        <div className="bg-theme-gradient/5 hover:bg-theme-gradient/10 hover:border-theme-primary/20 
                      transition-all duration-300 rounded-lg p-5 border border-theme-border-light cursor-pointer">
          <div className="flex items-center mb-3">
            <h4 className="text-base md:text-lg font-medium text-theme-primary">{subTitle}</h4>
            {note && <span className="text-sm text-theme-tertiary ml-2">{note}</span>}
          </div>
          
          {/* Options with consistent styling */}
          <div className="flex flex-col gap-3">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => onSelect(option.value)}
                data-value={option.value}
                className={`flex items-center p-4 rounded-lg border transition-all duration-300
                          ${selectedValue === option.value
                            ? 'border-theme-primary bg-theme-primary/10' 
                            : 'border-theme-border-light bg-theme-bg-surface hover:border-theme-primary/30 hover:bg-theme-primary/5'
                          }
                          min-h-[72px]`}
                aria-selected={selectedValue === option.value}
              >
                <div className="flex-grow text-left">
                  <h3 className="text-theme-primary font-medium text-base">{option.label}</h3>
                  <p className="text-theme-secondary text-sm">{option.description}</p>
                </div>
                {selectedValue === option.value && (
                  <CheckCircle className="h-5 w-5 text-theme-primary ml-3 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Supporting text - larger, with tracking */}
        <div className="p-2">
          <p className="text-theme-primary text-center text-xl md:text-2xl font-medium tracking-wide">
            {supportingText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TiaQuestionStage;