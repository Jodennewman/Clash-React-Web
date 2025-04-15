import React from 'react';
import { CheckCircle } from 'lucide-react';

interface QuestionOption {
  id: string;
  label: string;
  description: string;
  value: string;
}

interface QuestionStageProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradientClass: string;
  options: QuestionOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  isAnimating: boolean;
  selectedChoice: string | null;
}

const QuestionStage: React.FC<QuestionStageProps> = ({
  title,
  description,
  icon,
  gradientClass,
  options,
  selectedValue,
  onSelect,
  isAnimating,
  selectedChoice
}) => {
  return (
    <div className="p-5 md:p-6 space-y-6">
      {/* Stage illustration */}
      <div className="flex justify-center mb-2">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-theme-gradient/10 flex items-center justify-center">
          {icon}
        </div>
      </div>
      
      {/* Question header */}
      <div className={`${gradientClass} rounded-lg p-4 mb-2 text-white shadow-theme-md`}>
        <h4 className="font-semibold text-center mb-2 text-lg">{title}</h4>
        <p className="text-white/90 text-center text-base">
          {description}
        </p>
      </div>
      
      {/* Options list */}
      <div className="flex flex-col gap-4 max-w-lg mx-auto">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => !isAnimating && onSelect(option.value)}
            data-value={option.value}
            className={`flex items-center p-4 rounded-lg border transition-all duration-200
                      ${selectedValue === option.value || selectedChoice === option.value
                        ? 'border-theme-primary bg-theme-primary/10 shadow-theme-md' 
                        : 'border-theme-border-light bg-theme-bg-surface hover:border-theme-primary/50 hover:bg-theme-primary/5'
                      } ${isAnimating && selectedChoice !== option.value ? 'pointer-events-none' : ''}
                      min-h-[76px] md:min-h-[88px]`}
            aria-selected={selectedValue === option.value}
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-theme-primary/10 flex items-center justify-center mr-4">
              {React.cloneElement(icon as React.ReactElement, { size: 24, className: "text-theme-primary" })}
            </div>
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
  );
};

export default QuestionStage