import React from 'react';
import { Mail, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from "../../components/ui/button";

interface ContactStageProps {
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
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  canProceed: boolean;
}

const ContactStage: React.FC<ContactStageProps> = ({
  answers,
  errors,
  onChange,
  onNext,
  onBack,
  canProceed
}) => {
  return (
    <div className="p-5 md:p-6">
      <div className="space-y-6 max-w-3xl mx-auto">
        {/* Stage illustration */}
        <div className="flex justify-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-theme-gradient/10 flex items-center justify-center">
            <Mail size={32} className="text-theme-primary" />
          </div>
        </div>
        
        {/* Form header */}
        <div className="bg-theme-gradient-primary/5 rounded-lg p-4 border border-theme-primary/10">
          <h4 className="text-theme-primary font-semibold text-center mb-2 text-lg">Almost There</h4>
          <p className="text-theme-secondary text-center text-base">
            We'll create your personalized recommendation based on your answers
          </p>
        </div>
        
        {/* Form fields - responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {/* Left Column - About You */}
          <div className="space-y-4">
            <h3 className="text-base font-medium text-theme-primary border-b border-[var(--theme-border-light)] pb-1">
              About You
            </h3>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-theme-primary mb-1">
                Your Name*
              </label>
              <input
                id="name"
                type="text"
                value={answers.name}
                onChange={(e) => onChange('name', e.target.value)}
                className={`w-full rounded-lg border ${errors.name ? 'border-red-500 dark:border-red-400' : 'border-[var(--theme-border-light)]'} 
                           bg-theme-bg-surface px-4 py-3 text-theme-primary text-base
                           focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent shadow-theme-sm`}
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
                className={`w-full rounded-lg border ${errors.email ? 'border-red-500 dark:border-red-400' : 'border-[var(--theme-border-light)]'} 
                           bg-theme-bg-surface px-4 py-3 text-theme-primary text-base
                           focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent shadow-theme-sm`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-red-500 dark:text-red-400 text-sm">{errors.email}</p>
              )}
            </div>
          </div>
          
          {/* Right Column - About the Brand */}
          <div className="space-y-4">
            <h3 className="text-base font-medium text-theme-primary border-b border-[var(--theme-border-light)] pb-1">
              About Your Brand
            </h3>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-theme-primary mb-1">
                Company/Brand Name*
              </label>
              <input
                id="company"
                type="text"
                value={answers.company}
                onChange={(e) => onChange('company', e.target.value)}
                className={`w-full rounded-lg border ${errors.company ? 'border-red-500 dark:border-red-400' : 'border-[var(--theme-border-light)]'} 
                           bg-theme-bg-surface px-4 py-3 text-theme-primary text-base
                           focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent shadow-theme-sm`}
                placeholder="Your company name"
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
                className="w-full rounded-lg border border-[var(--theme-border-light)] 
                          bg-theme-bg-surface px-4 py-3 text-theme-primary text-base
                          focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent shadow-theme-sm"
                placeholder="Your role in the organization"
              />
            </div>
          </div>
        </div>
        
        {/* Security message and buttons */}
        <div className="pt-2 space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-theme-primary flex-shrink-0" />
            <p className="text-theme-tertiary text-sm">
              Your information is secure and never shared with third parties
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <Button
              onClick={onBack}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-h-[44px]"
            >
              Back
            </Button>
            
            <Button
              onClick={onNext}
              disabled={!canProceed}
              variant={canProceed ? "default" : "subtle"}
              size="lg"
              className="flex items-center gap-1 w-full sm:w-auto min-h-[44px]"
            >
              See My Recommendation
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactStage;