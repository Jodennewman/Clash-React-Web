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
        {/* Title header - longer, left-aligned, with no truncation */}
        <div className="mb-2">
          <h4 className="text-theme-primary text-[25px] font-medium leading-tight break-normal">{title}</h4>
        </div>
        
        {/* Main content area with hover effect */}
        <div className="bg-theme-gradient/5 hover:bg-theme-gradient/10 hover:border-theme-primary/20 
                      transition-all duration-300 rounded-lg p-5 border border-theme-border-light cursor-pointer">
          <div className="flex items-center mb-3">
            <h4 className="text-[25px] font-medium text-theme-primary break-normal">{subTitle}</h4>
            {note && <span className="text-sm text-theme-tertiary ml-2">{note}</span>}
          </div>
          
          {/* Options with consistent styling */}
          <div className="flex flex-col gap-3">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => onSelect(option.value)}
                data-value={option.value}
                className={`flex items-start p-4 rounded-lg border transition-all duration-300
                          ${selectedValue === option.value
                            ? 'border-theme-primary bg-theme-primary/10' 
                            : 'border-theme-border-light bg-theme-bg-surface hover:border-theme-primary/30 hover:bg-theme-primary/5'
                          }
                          min-h-[100px]`}
                aria-selected={selectedValue === option.value}
              >
                <div className="flex-grow text-left">
                  <h3 className="text-theme-primary font-medium text-[25px] leading-tight break-normal">{option.label}</h3>
                  <p className="text-theme-secondary text-base mt-1">{option.description}</p>
                </div>
                {selectedValue === option.value && (
                  <CheckCircle className="h-6 w-6 text-theme-primary ml-3 flex-shrink-0 self-center" />
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Supporting text - 25px size, with tracking and no truncation */}
        <div className="p-2">
          <p className="text-theme-primary text-center text-[25px] font-medium tracking-wide leading-tight break-normal">
            {supportingText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TiaQuestionStage;