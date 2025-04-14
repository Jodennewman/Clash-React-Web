import React from 'react';
import { Button } from "../../components/ui/button";
import { ChevronRight } from 'lucide-react';

interface ModalFooterProps {
  stage: string;
  canProceed: boolean;
  handleClose: () => void;
  goToPreviousStage: () => void;
  goToNextStage: () => void;
  isFirstStage?: boolean;
  isLastStage?: boolean;
  nextButtonText?: string;
  backButtonText?: string;
  closeButtonText?: string;
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  stage,
  canProceed,
  handleClose,
  goToPreviousStage,
  goToNextStage,
  isFirstStage = false,
  isLastStage = false,
  nextButtonText = "Continue",
  backButtonText = "Back",
  closeButtonText = "Close"
}) => {
  return (
    <div className="border-t border-[var(--theme-border-light)] p-4 md:p-5">
      <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3">
        {/* Back button - only show if not on first or last stage */}
        {!isFirstStage && !isLastStage && (
          <Button
            onClick={goToPreviousStage}
            variant="outline"
            size="lg"
            className="min-h-[44px] w-full sm:w-auto"
          >
            {backButtonText}
          </Button>
        )}
        
        {/* Cancel button - only on first stage or last stage */}
        {(isFirstStage || isLastStage) && (
          <Button
            onClick={handleClose}
            variant="ghost"
            size="lg"
            className="min-h-[44px] w-full sm:w-auto"
          >
            {closeButtonText}
          </Button>
        )}
        
        {/* Continue button - don't show on analysis stages */}
        {stage !== 'analysis' && stage !== 'breakdown' && (
          <Button
            onClick={goToNextStage}
            disabled={!canProceed}
            variant={canProceed ? "default" : "subtle"}
            size="lg"
            className="flex items-center gap-1 min-h-[44px] px-5 w-full sm:w-auto"
          >
            {nextButtonText}
            {!isLastStage && <ChevronRight className="h-4 w-4" />}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ModalFooter;