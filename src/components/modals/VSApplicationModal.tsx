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
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-[var(--theme-text-primary)]/70 dark:text-white/60">
            Step {step} of {totalSteps}
          </div>
          <div className="flex gap-2">
            {Array(totalSteps).fill(0).map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 w-8 rounded-full transition-all duration-300 ${idx < step
                  ? 'bg-[var(--theme-primary)] dark:bg-[var(--theme-primary)]'
                  : 'bg-[var(--theme-bg-secondary)] dark:bg-white/10'
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
              <label htmlFor="fullName" className="block text-[var(--theme-text-primary)] dark:text-white text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-white dark:bg-[var(--theme-bg-primary)]/50 border ${errors.fullName
                  ? 'border-[var(--theme-accent-quaternary)] dark:border-[var(--theme-accent-quaternary)]'
                  : 'border-[var(--theme-bg-secondary)]/50 dark:border-white/10'
                  } rounded-[--border-radius-md] focus:outline-none focus:ring-2 focus:ring-[--primary-orange]/30 dark:focus:ring-[--primary-orange]/30 text-[var(--theme-text-primary)] dark:text-white`}
                placeholder="Your full name"
              />
              {errors.fullName && (
                <p className="mt-1 text-[var(--theme-accent-quaternary)] text-sm">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-[var(--theme-text-primary)] dark:text-white text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-white dark:bg-[var(--theme-bg-primary)]/50 border ${errors.email
                  ? 'border-[var(--theme-accent-quaternary)] dark:border-[var(--theme-accent-quaternary)]'
                  : 'border-[var(--theme-bg-secondary)]/50 dark:border-white/10'
                  } rounded-[--border-radius-md] focus:outline-none focus:ring-2 focus:ring-[--primary-orange]/30 dark:focus:ring-[--primary-orange]/30 text-[var(--theme-text-primary)] dark:text-white`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-[var(--theme-accent-quaternary)] text-sm">{errors.email}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Experience */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="experience" className="block text-[var(--theme-text-primary)] dark:text-white text-sm font-medium mb-2">
                Content Creation Experience
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-white dark:bg-[var(--theme-bg-primary)]/50 border ${errors.experience
                  ? 'border-[var(--theme-accent-quaternary)] dark:border-[var(--theme-accent-quaternary)]'
                  : 'border-[var(--theme-bg-secondary)]/50 dark:border-white/10'
                  } rounded-[--border-radius-md] focus:outline-none focus:ring-2 focus:ring-[--primary-orange]/30 dark:focus:ring-[--primary-orange]/30 text-[var(--theme-text-primary)] dark:text-white`}
              >
                <option value="">Select your experience level</option>
                <option value="beginner">Beginner (0-6 months)</option>
                <option value="intermediate">Intermediate (6 months - 2 years)</option>
                <option value="advanced">Advanced (2+ years)</option>
                <option value="professional">Professional Creator</option>
              </select>
              {errors.experience && (
                <p className="mt-1 text-[var(--theme-accent-quaternary)] text-sm">{errors.experience}</p>
              )}
            </div>

            <div className="bg-[var(--theme-bg-primary)]/30 dark:bg-white/5 p-4 rounded-[--border-radius-md]">
              <h4 className="text-[var(--theme-text-primary)] dark:text-white text-sm font-medium mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2 text-[var(--theme-primary)] ">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                Why We're Asking
              </h4>
              <p className="text-[var(--theme-text-primary)]/70 dark:text-white/60 text-sm">
                This helps us customize your learning experience and suggest the most relevant modules for your skill level.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Goals */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="goals" className="block text-[var(--theme-text-primary)] dark:text-white text-sm font-medium mb-2">
                What do you hope to achieve?
              </label>
              <textarea
                id="goals"
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-2 bg-white dark:bg-[var(--theme-bg-primary)]/50 border ${errors.goals
                  ? 'border-[var(--theme-accent-quaternary)] dark:border-[var(--theme-accent-quaternary)]'
                  : 'border-[var(--theme-bg-secondary)]/50 dark:border-white/10'
                  } rounded-[--border-radius-md] focus:outline-none focus:ring-2 focus:ring-[--primary-orange]/30 dark:focus:ring-[--primary-orange]/30 text-[var(--theme-text-primary)] dark:text-white`}
                placeholder="Share your content creation goals and what you hope to achieve..."
              />
              {errors.goals && (
                <p className="mt-1 text-[var(--theme-accent-quaternary)] text-sm">{errors.goals}</p>
              )}
            </div>

            <div className="bg-[var(--theme-bg-primary)]/30 dark:bg-white/5 p-4 rounded-[--border-radius-md]">
              <h4 className="text-[var(--theme-text-primary)] dark:text-white text-sm font-medium mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2 text-[var(--theme-primary)] ">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                Final Step
              </h4>
              <p className="text-[var(--theme-text-primary)]/70 dark:text-white/60 text-sm">
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
            className={`px-4 py-2 rounded-[--border-radius-md] border ${step === 1
              ? 'border-[var(--theme-bg-secondary)]/30 text-[var(--theme-text-primary)]/30 dark:border-white/5 dark:text-white/30 cursor-not-allowed'
              : 'border-[var(--theme-accent-secondary)] text-[var(--theme-accent-secondary)] dark:border-white/20 dark:text-white hover:bg-[var(--theme-accent-secondary)]/5 dark:hover:bg-white/5 hover-bubbly-sm'
              }`}
          >
            Back
          </button>

          <button
            type="submit"
            className="vs-btn-primary-gradient
                     dark:bg-gradient-to-r dark:from-[var(--theme-primary)] dark:to-[var(--theme-primary-hover)]
                     text-white px-6 py-2 rounded-[--border-radius-md] 
                     shadow-[1px_1px_4px_rgba(0,0,0,0.1)]
                     dark:shadow-[0_0_8px_rgba(254,163,93,0.2)]
                     transition-all duration-[--transition-bounce]
                     hover:translate-y-[-3px] hover:scale-[1.03] 
                     hover:shadow-[1px_1px_8px_rgba(0,0,0,0.15)]
                     dark:hover:shadow-[0_0_15px_rgba(254,163,93,0.3)]"
          >
            {step === totalSteps ? 'Submit Application' : 'Continue'}
          </button>
        </div>
      </form>
    </VSModal>
  );
};

export { VSApplicationModal };