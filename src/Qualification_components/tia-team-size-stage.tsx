import React from 'react';
import { CheckCircle, Users } from 'lucide-react';

interface QuestionOption {
  id: string;
  label: string;
  description: string;
  value: string;
}

interface TiaTeamSizeStageProps {
  options: QuestionOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  isAnimating: boolean;
  selectedChoice: string | null;
}

const TiaTeamSizeStage: React.FC<TiaTeamSizeStageProps> = ({
  options,
  selectedValue,
  onSelect,
  isAnimating,
  selectedChoice
}) => {
  return (
    <div className="p-5 md:p-6">
      <div className="flex flex-col space-y-4">
        {/* Title header - empty but keeping the space for layout consistency */}
        <div className="mb-2">
          <h4 className="text-theme-primary text-base font-medium"></h4>
        </div>
        
        {/* Header without box */}
        <div>
          <div className="flex items-center mb-4">
            <h5 className="text-theme-primary font-medium">Select your team size</h5>
          </div>
          
          {/* Options without containing box */}
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
                          min-h-[70px]`}
                aria-selected={selectedValue === option.value}
              >
                <div className="flex-grow text-left">
                  <h5 className="text-theme-primary font-medium">{option.label}</h5>
                  <p className="text-theme-secondary text-xs">{option.description}</p>
                </div>
                {selectedValue === option.value && (
                  <CheckCircle className="h-5 w-5 text-theme-primary ml-3 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tailoring message below process section - matching intro page */}
        <div className="p-2">
          <p className="text-theme-primary text-center text-xl md:text-2xl font-medium tracking-wide">
            We'll tailor our system to match your team's specific structure and size
          </p>
        </div>
      </div>
    </div>
  );
};

export default TiaTeamSizeStage;