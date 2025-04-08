import React, { useState } from 'react';
import { VSModal } from '../ui/vs-modal';

interface VSApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ApplicationFormData) => void;
}

interface ApplicationFormData {
  fullName: string;
  email: string;
  experience: string;
  goals: string;
}

/**
 * VSApplicationModal - Application form modal component
 * 
 * Features:
 * - Multi-step application process
 * - Form validation
 * - VS-styled form elements
 * - Progress indicator
 */
const VSApplicationModal: React.FC<VSApplicationModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    experience: '',
    goals: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 3;

  // Update form data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate current step
  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    // Validate step 1
    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Validate step 2
    if (step === 2) {
      if (!formData.experience) {
        newErrors.experience = 'Please select your experience level';
      }
    }

    // Validate step 3
    if (step === 3) {
      if (!formData.goals.trim()) {
        newErrors.goals = 'Please share your goals';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep()) {
      if (step < totalSteps) {
        setStep(step + 1);
      } else {
        // Submit the form on the last step
        handleSubmit();
      }
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateStep()) {
      onSubmit(formData);
    }
  };

  return (
    <VSModal
      isOpen={isOpen}
      onClose={onClose}
      title="Application Form"
      description="Tell us about yourself and your goals"
      width="lg"
    >
      {/* Theme-aware floating elements for visual interest */}
      <div className="absolute -z-10 top-10 right-10 w-16 h-16 rounded-[40%] rotate-12 
                   opacity-[var(--theme-float-opacity)]
                   bg-[var(--theme-float-bg-primary)]
                   animate-float-slow"></div>
      <div className="absolute -z-10 bottom-20 left-10 w-24 h-24 rounded-[35%] -rotate-6 
                   opacity-[var(--theme-float-opacity-secondary)]
                   bg-[var(--theme-float-bg-secondary)]
                   animate-float-medium"></div>
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-theme-secondary transition-colors transition-theme-normal">
            Step {step} of {totalSteps}
          </div>
          <div className="flex gap-2">
            {Array(totalSteps).fill(0).map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 w-8 rounded-full transition-all duration-[var(--theme-transition-normal)] ${idx < step
                  ? 'bg-theme-primary'
                  : 'bg-theme-border'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Form steps */}
      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-theme-primary text-sm font-medium mb-2 transition-colors transition-theme-normal">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-theme-surface border ${errors.fullName
                  ? 'border-theme-error'
                  : 'border-theme-border'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-opacity-[0.3] text-theme-primary transition-all duration-[var(--theme-transition-normal)] shadow-theme-sm`}
                placeholder="Your full name"
              />
              {errors.fullName && (
                <p className="mt-1 text-theme-error text-sm">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-theme-primary text-sm font-medium mb-2 transition-colors transition-theme-normal">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-theme-surface border ${errors.email
                  ? 'border-theme-error'
                  : 'border-theme-border'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-opacity-[0.3] text-theme-primary transition-all duration-[var(--theme-transition-normal)] shadow-theme-sm`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-theme-error text-sm">{errors.email}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Experience */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="experience" className="block text-theme-primary text-sm font-medium mb-2 transition-colors transition-theme-normal">
                Content Creation Experience
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-theme-surface border ${errors.experience
                  ? 'border-theme-error'
                  : 'border-theme-border'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-opacity-[0.3] text-theme-primary transition-all duration-[var(--theme-transition-normal)] shadow-theme-sm`}
              >
                <option value="">Select your experience level</option>
                <option value="beginner">Beginner (0-6 months)</option>
                <option value="intermediate">Intermediate (6 months - 2 years)</option>
                <option value="advanced">Advanced (2+ years)</option>
                <option value="professional">Professional Creator</option>
              </select>
              {errors.experience && (
                <p className="mt-1 text-theme-error text-sm">{errors.experience}</p>
              )}
            </div>

            <div className="bg-theme-surface/20 p-4 rounded-md border border-theme-border">
              <h4 className="text-theme-primary text-sm font-medium mb-2 flex items-center transition-colors transition-theme-normal">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2 text-theme-primary">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                Why We're Asking
              </h4>
              <p className="text-theme-secondary text-sm transition-colors transition-theme-normal">
                This helps us customize your learning experience and suggest the most relevant modules for your skill level.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Goals */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="goals" className="block text-theme-primary text-sm font-medium mb-2 transition-colors transition-theme-normal">
                What do you hope to achieve?
              </label>
              <textarea
                id="goals"
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-2 bg-theme-surface border ${errors.goals
                  ? 'border-theme-error'
                  : 'border-theme-border'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-opacity-[0.3] text-theme-primary transition-all duration-[var(--theme-transition-normal)] shadow-theme-sm`}
                placeholder="Share your content creation goals and what you hope to achieve..."
              />
              {errors.goals && (
                <p className="mt-1 text-theme-error text-sm">{errors.goals}</p>
              )}
            </div>

            <div className="bg-theme-surface/20 p-4 rounded-md border border-theme-border">
              <h4 className="text-theme-primary text-sm font-medium mb-2 flex items-center transition-colors transition-theme-normal">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2 text-theme-primary">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                Final Step
              </h4>
              <p className="text-theme-secondary text-sm transition-colors transition-theme-normal">
                Your goals help us provide personalized guidance and track your progress throughout the program.
              </p>
            </div>
          </div>
        )}

        {/* Form actions */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={step === 1}
            className={`px-4 py-2 rounded-md border transition-all duration-[var(--theme-transition-normal)] ${step === 1
              ? 'border-theme-border/30 text-theme-secondary/30 cursor-not-allowed'
              : 'border-theme-accent-secondary text-theme-accent-secondary hover:bg-theme-accent-secondary/5 hover-bubbly-sm'
              }`}
          >
            Back
          </button>

          <button
            type="submit"
            className="bg-theme-gradient-primary
                     text-theme-on-primary px-6 py-2 rounded-md 
                     shadow-theme-btn
                     transition-all transition-theme-bounce
                     hover:translate-y-[var(--theme-anim-distance)] hover:scale-[var(--theme-anim-scale)] 
                     hover:shadow-theme-md"
          >
            {step === totalSteps ? 'Submit Application' : 'Continue'}
          </button>
        </div>
      </form>
    </VSModal>
  );
};

export { VSApplicationModal };