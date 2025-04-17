import React from 'react';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface TiaContactStageProps {
  title: string;
  formTitle: string;
  supportingText: string;
  answers: {
    name: string;
    email: string;
    company: string;
    position: string;
  };
  errors: {
    name: string;
    email: string;
    company: string;
  };
  mailingList: boolean;
  onMailingListChange: (checked: boolean) => void;
  onChange: (field: string, value: string) => void;
  onBack?: () => void; // Optional back handler
  onSubmit?: () => void; // Optional submit handler to replace the footer
}

const TiaContactStage: React.FC<TiaContactStageProps> = ({
  title,
  formTitle,
  supportingText,
  answers,
  errors,
  mailingList,
  onMailingListChange,
  onChange,
  onBack,
  onSubmit
}) => {
  return (
    <div className="p-5 md:p-6">
      <div className="flex flex-col space-y-4">
        {/* Title header - empty but keeping the space for layout consistency */}
        <div className="mb-2 flex justify-between items-center">
          <h4 className="text-theme-primary text-base font-medium"></h4>
        </div>
        
        {/* Header without box */}
        <div>
          <div className="flex items-center mb-4">
            <h5 className="text-theme-primary font-medium text-[25px] leading-tight break-normal">{formTitle}</h5>
          </div>
          
          {/* Form fields in consistent grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-theme-primary mb-1">
                Your Name*
              </label>
              <input
                id="name"
                type="text"
                value={answers.name}
                onChange={(e) => onChange('name', e.target.value)}
                className={`w-full rounded-lg border ${errors.name ? 'border-red-500 dark:border-red-400' : 'border-theme-border-light'} 
                           bg-theme-bg-surface px-4 py-3 text-theme-primary text-base
                           focus:outline-none focus:ring-2 focus:ring-theme-primary/50 focus:border-transparent`}
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="mt-1 text-red-500 dark:text-red-400 text-sm">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-theme-primary mb-1">
                Your Email*
              </label>
              <input
                id="email"
                type="email"
                value={answers.email}
                onChange={(e) => onChange('email', e.target.value)}
                className={`w-full rounded-lg border ${errors.email ? 'border-red-500 dark:border-red-400' : 'border-theme-border-light'} 
                           bg-theme-bg-surface px-4 py-3 text-theme-primary text-base
                           focus:outline-none focus:ring-2 focus:ring-theme-primary/50 focus:border-transparent`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-red-500 dark:text-red-400 text-sm">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-theme-primary mb-1">
                Company/Brand Name*
              </label>
              <input
                id="company"
                type="text"
                value={answers.company}
                onChange={(e) => onChange('company', e.target.value)}
                className={`w-full rounded-lg border ${errors.company ? 'border-red-500 dark:border-red-400' : 'border-theme-border-light'} 
                           bg-theme-bg-surface px-4 py-3 text-theme-primary text-base
                           focus:outline-none focus:ring-2 focus:ring-theme-primary/50 focus:border-transparent`}
                placeholder="Your company or brand name"
              />
              {errors.company && (
                <p className="mt-1 text-red-500 dark:text-red-400 text-sm">{errors.company}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-theme-primary mb-1">
                Your Position <span className="text-theme-tertiary">(optional)</span>
              </label>
              <input
                id="position"
                type="text"
                value={answers.position}
                onChange={(e) => onChange('position', e.target.value)}
                className="w-full rounded-lg border border-theme-border-light 
                          bg-theme-bg-surface px-4 py-3 text-theme-primary text-base
                          focus:outline-none focus:ring-2 focus:ring-theme-primary/50 focus:border-transparent"
                placeholder="Your role in the organization"
              />
            </div>
          </div>
          
          {/* Mailing list checkbox */}
          <div className="flex items-center mb-3">
            <input 
              type="checkbox" 
              id="mailing-list"
              checked={mailingList}
              onChange={(e) => onMailingListChange(e.target.checked)}
              className="w-4 h-4 text-theme-primary border-theme-border rounded mr-2" 
            />
            <label htmlFor="mailing-list" className="text-sm text-theme-secondary">Sign up to our mailing list for content tips</label>
          </div>
          
          {/* Security text */}
          <div className="flex items-center mb-4">
            <CheckCircle className="h-4 w-4 text-theme-primary flex-shrink-0 mr-2" />
            <p className="text-xs text-theme-tertiary">
              Your information is secure and never shared with third parties
            </p>
          </div>
          {/* Submit and back buttons */}
          <div className="mt-6 flex justify-between items-center">
            {onBack && (
              <button 
                onClick={onBack}
                className="flex items-center text-theme-primary hover:text-theme-primary-hover transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </button>
            )}
            
            {onSubmit && (
              <button
                onClick={onSubmit}
                className="w-auto py-2 px-4 bg-orange-500/80 hover:bg-orange-500/90 
                         dark:bg-amber-400/90 dark:hover:bg-amber-400 text-white text-sm
                         rounded-lg font-medium shadow-theme-sm hover:shadow-theme-md transition-all 
                         flex items-center justify-center gap-1 duration-300"
              >
                Show my recommendation <ArrowRight className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
        
        {/* Support text with tracking */}
        <div className="p-2">
          <p className="text-theme-primary text-center text-[25px] font-medium tracking-wide leading-tight break-normal">
            {supportingText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TiaContactStage;