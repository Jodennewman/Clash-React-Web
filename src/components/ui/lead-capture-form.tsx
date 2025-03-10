import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Checkbox } from './checkbox';
import { Alert, AlertDescription } from './alert';

interface LeadCaptureFormProps {
  onSubmit?: (data: LeadFormData) => void;
  className?: string;
}

interface LeadFormData {
  name: string;
  email: string;
  phone?: string;
  interests: string[];
  consent: boolean;
}

export default function LeadCaptureForm({ onSubmit, className }: LeadCaptureFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    interests: [],
    consent: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const interestOptions = [
    { id: 'content-creation', label: 'Content Creation' },
    { id: 'monetization', label: 'Monetization Strategies' },
    { id: 'personal-brand', label: 'Personal Brand Building' },
    { id: 'business-growth', label: 'Business Growth' }
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleInterestChange = (id: string) => {
    setFormData(prev => {
      const interests = prev.interests.includes(id)
        ? prev.interests.filter(i => i !== id)
        : [...prev.interests, id];
      
      return { ...prev, interests };
    });
    
    // Clear interests error if any are selected
    if (errors.interests && formData.interests.length > 0) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.interests;
        return newErrors;
      });
    }
  };
  
  const handleConsentChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, consent: checked }));
    
    if (errors.consent && checked) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.consent;
        return newErrors;
      });
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one area of interest';
    }
    
    if (!formData.consent) {
      newErrors.consent = 'You must agree to receive communications';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the data to your API
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSubmit) {
        onSubmit(formData);
      }
      
      setIsSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        interests: [],
        consent: false
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({
        submit: 'There was an error submitting your information. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className={`bg-[#09232F]/70 backdrop-blur-sm border border-white/10 rounded-xl p-6 ${className}`}>
      {isSuccess ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-[#FEA35D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FEA35D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
          <p className="text-white/70 mb-6">
            We've received your information and will be in touch soon about the next steps.
          </p>
          <Button 
            onClick={() => setIsSuccess(false)} 
            variant="outline"
            className="border-[#FEA35D]/30 text-[#FEA35D] hover:bg-[#FEA35D]/10"
          >
            Submit Another Response
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-bold text-white mb-6">Get Started Today</h3>
          
          {errors.submit && (
            <Alert className="mb-4 bg-red-900/20 border-red-500">
              <AlertDescription className="text-red-300">
                {errors.submit}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4 mb-6">
            <div>
              <Label htmlFor="name" className="text-white mb-1 block">
                Full Name <span className="text-[#FEA35D]">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`bg-[#08141B] border-white/20 text-white ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="email" className="text-white mb-1 block">
                Email <span className="text-[#FEA35D]">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`bg-[#08141B] border-white/20 text-white ${errors.email ? 'border-red-500' : ''}`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-white mb-1 block">
                Phone (Optional)
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="bg-[#08141B] border-white/20 text-white"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            
            <div>
              <Label className="text-white mb-2 block">
                Areas of Interest <span className="text-[#FEA35D]">*</span>
              </Label>
              <div className="space-y-2">
                {interestOptions.map(option => (
                  <div key={option.id} className="flex items-center">
                    <Checkbox
                      id={option.id}
                      checked={formData.interests.includes(option.id)}
                      onCheckedChange={() => handleInterestChange(option.id)}
                      className="border-white/30 data-[state=checked]:bg-[#FEA35D] data-[state=checked]:border-[#FEA35D]"
                    />
                    <label
                      htmlFor={option.id}
                      className="ml-2 text-sm font-medium text-white/80"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              {errors.interests && (
                <p className="text-red-500 text-sm mt-1">{errors.interests}</p>
              )}
            </div>
            
            <div>
              <div className="flex items-start">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={handleConsentChange}
                  className="border-white/30 data-[state=checked]:bg-[#FEA35D] data-[state=checked]:border-[#FEA35D] mt-1"
                />
                <label
                  htmlFor="consent"
                  className={`ml-2 text-sm text-white/70 ${errors.consent ? 'text-red-400' : ''}`}
                >
                  I agree to receive communications about Vertical Shortcut. You can unsubscribe at any time. <span className="text-[#FEA35D]">*</span>
                </label>
              </div>
              {errors.consent && (
                <p className="text-red-500 text-sm mt-1">{errors.consent}</p>
              )}
            </div>
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#B92234] hover:bg-[#DE6B59] text-white font-semibold py-3"
          >
            {isSubmitting ? 'Submitting...' : 'Apply Now'}
          </Button>
          
          <p className="text-white/50 text-xs mt-4 text-center">
            By submitting this form, you agree to our <a href="#" className="text-[#FEA35D] hover:underline">Terms of Service</a> and <a href="#" className="text-[#FEA35D] hover:underline">Privacy Policy</a>.
          </p>
        </form>
      )}
    </div>
  );
} 