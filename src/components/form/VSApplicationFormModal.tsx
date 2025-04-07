import React from 'react';
import { VSModal } from '../ui/vs-modal';
import VerticalShortcutApplicationForm from './form-shadcn-claude';

interface VSApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Enhanced Application Form Modal
 * 
 * Uses the VS styling system with proper animations and escape functionality
 */
const VSApplicationFormModal: React.FC<VSApplicationFormModalProps> = ({
  isOpen,
  onClose
}) => {
  return (
    <VSModal
      isOpen={isOpen}
      onClose={onClose}
      width="full"
      showCloseButton={true}
      closeOnOverlayClick={true}
      closeOnEsc={true}
      title="Vertical Shortcut: Transform Your Content into a Revenue Machine"
      description="Complete this application to join our exclusive program and start your journey to content mastery."
    >
      <div className="bg-theme-surface rounded-lg overflow-hidden shadow-theme-sm transition-all transition-theme-normal">
        <VerticalShortcutApplicationForm onClose={onClose} />
      </div>
    </VSModal>
  );
};

export default VSApplicationFormModal;