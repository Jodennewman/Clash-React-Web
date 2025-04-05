import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, Check, Info, Calendar, CheckCircle, Moon, Sun } from 'lucide-react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CalendlyPopupWidget } from '../components/Calendly';

interface VSQualificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Optional testing mode flag that shows debug info, defaults to false */
  testMode?: boolean; 
}

/**
 * VSQualificationModal - A theme-aware qualification journey component
 * 
 * This component implements a multi-stage qualification process that:
 * 1. Collects user information through strategic questions
 * 2. Scores responses to determine the appropriate implementation approach
 * 3. Provides a personalized recommendation
 * 4. Enables direct Calendly booking
 *
 * The component uses theme-aware styling to ensure proper appearance in both
 * light and dark modes according to the VS design system.
 */
const VSQualificationModal: React.FC<VSQualificationModalProps> = ({ isOpen, onClose, testMode = false }) => {
  // Modal state management
  const [stage, setStage] = useState('intro');
  const [answers, setAnswers] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    teamSize: '',
    implementationSupport: '',
    timeline: '',
    contentVolume: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [recommendation, setRecommendation] = useState<{
    type: string;
    score: number;
    explanation: string;
    pricing: string;
  } | null>(null);
  const [showCalendly, setShowCalendly] = useState(false);
  
  // Refs for GSAP animations
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Tracking modal engagement for analytics and scoring
  const [engagement, setEngagement] = useState({
    timeSpent: 0,
    questionInteractions: 0,
    focusChanges: 0
  });
  
  // Handle animation with GSAP
  useGSAP(() => {
    if (!isOpen || !modalRef.current || !overlayRef.current) return;

    // Get computed theme variables for animation
    const styles = getComputedStyle(document.documentElement);
    const animDistance = parseFloat(styles.getPropertyValue('--theme-anim-distance') || '-4px');
    const animDuration = parseFloat(styles.getPropertyValue('--theme-anim-duration') || '0.35');

    const ctx = gsap.context(() => {
      // Animate overlay
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });

      // Animate modal
      gsap.fromTo(modalRef.current,
        { opacity: 0, y: -animDistance * 5, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: animDuration + 0.05, ease: "back.out(1.2)" }
      );

      // Floating elements animation
      gsap.to(".modal-floating-element", {
        y: animDistance * 2.5,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true, 
        stagger: 0.4
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isOpen]);
  
  // Timer for tracking time spent in qualification process
  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      setEngagement(prev => ({
        ...prev,
        timeSpent: prev.timeSpent + 1
      }));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isOpen]);
  
  // Track analytics events
  const trackEvent = (eventName: string, properties = {}) => {
    // In production, this would send to your analytics platform
    // Example: window.analytics.track(eventName, properties);
    
    // For development, log to console
    console.log(`[Analytics] ${eventName}`, {
      ...properties,
      timestamp: new Date().toISOString()
    });
  };

  // Handle user answers with validation
  const handleAnswerChange = (key: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Clear error for this field
    if (errors[key as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [key]: ''
      }));
    }
    
    // Track interaction for engagement metrics
    setEngagement(prev => ({
      ...prev,
      questionInteractions: prev.questionInteractions + 1
    }));
    
    // Track answer changed event
    trackEvent('qualification_answer_changed', {
      field: key,
      stage: stage,
      interactionCount: engagement.questionInteractions + 1
    });
  };
  
  // Validate form fields
  const validateFields = (): boolean => {
    let isValid = true;
    const newErrors = { name: '', email: '', company: '' };
    
    // Validate based on current stage
    if (stage === 'contact') {
      // Name validation
      if (!answers.name.trim()) {
        newErrors.name = 'Please enter your name';
        isValid = false;
      }
      
      // Email validation
      if (!answers.email.trim()) {
        newErrors.email = 'Please enter your email';
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(answers.email)) {
        newErrors.email = 'Please enter a valid email address';
        isValid = false;
      }
      
      // Company validation
      if (!answers.company.trim()) {
        newErrors.company = 'Please enter your company name';
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Save progress and implement abandoned journey recovery
  useEffect(() => {
    if (!isOpen) {
      // Keep data for 30 minutes in case user returns
      setTimeout(() => {
        setStage('intro');
        setAnswers({
          name: '',
          email: '',
          company: '',
          position: '',
          teamSize: '',
          implementationSupport: '',
          timeline: '',
          contentVolume: ''
        });
        setRecommendation(null);
        setShowCalendly(false);
        setEngagement({
          timeSpent: 0,
          questionInteractions: 0,
          focusChanges: 0
        });
      }, 1800000); // 30 minutes
    } else {
      // Save progress after each stage change for abandoned journey recovery
      const currentProgress = {
        stage,
        answers,
        engagement,
        lastActive: Date.now()
      };
      
      localStorage.setItem('qualificationProgress', JSON.stringify(currentProgress));
    }
  }, [isOpen, stage, answers, engagement]);
  
  // Check for abandoned journey on load
  useEffect(() => {
    if (!isOpen) return;
    
    // Check for abandoned journey
    const savedProgress = localStorage.getItem('qualificationProgress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        
        // If journey was abandoned recently (within 24 hours)
        if (Date.now() - progress.lastActive < 24 * 60 * 60 * 1000) {
          // Ask if user wants to continue
          const wantsToContinue = window.confirm(
            'Would you like to continue where you left off?'
          );
          
          if (wantsToContinue) {
            setStage(progress.stage);
            setAnswers(progress.answers);
            setEngagement(prev => ({
              ...prev,
              timeSpent: progress.engagement.timeSpent,
              questionInteractions: progress.engagement.questionInteractions
            }));
          } else {
            // Clear saved progress if user doesn't want to continue
            localStorage.removeItem('qualificationProgress');
          }
        } else {
          // Clear old progress
          localStorage.removeItem('qualificationProgress');
        }
      } catch (error) {
        console.error('Error parsing saved qualification progress:', error);
        localStorage.removeItem('qualificationProgress');
      }
    }
  }, [isOpen]);
  
  // Store first visit timestamp
  useEffect(() => {
    if (!sessionStorage.getItem('firstVisit')) {
      sessionStorage.setItem('firstVisit', Date.now().toString());
    }
    
    // Store UTM parameters if present
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_content: urlParams.get('utm_content') || '',
      utm_term: urlParams.get('utm_term') || ''
    };
    
    if (Object.values(utmParams).some(value => value !== '')) {
      sessionStorage.setItem('utmParams', JSON.stringify(utmParams));
    }
  }, []);
  
  // Calculate recommendation based on answers and engagement
  const processAnswers = () => {
    // Parse team size to number
    const teamSize = parseInt(answers.teamSize || '0');
    
    // Initialize score
    let score = 0;
    
    // 1. Team size factor (1-3 points)
    if (teamSize >= 20) score += 3;
    else if (teamSize >= 10) score += 2;
    else score += 1;
    
    // 2. Implementation support preference (1-3 points)
    if (answers.implementationSupport === 'full_service') score += 3;
    else if (answers.implementationSupport === 'guided') score += 2;
    else if (answers.implementationSupport === 'self_directed') score += 1;
    
    // 3. Timeline factor (0-2 points)
    if (answers.timeline === 'immediate') score += 2;
    else if (answers.timeline === 'next_quarter') score += 1;
    // 'exploratory' adds 0 points
    
    // 4. Content volume (0-2 points)
    if (answers.contentVolume === 'high') score += 2;
    else if (answers.contentVolume === 'medium') score += 1;
    // 'low' adds 0 points
    
    // 5. Engagement bonus (0-1 point)
    const isHighlyEngaged = engagement.timeSpent > 120 && engagement.questionInteractions > 10;
    if (isHighlyEngaged) score += 1;
    
    // Determine recommendation based on score (1-11 points possible)
    let recommendationType: 'executive' | 'comprehensive' | 'foundation';
    if (score >= 8) {
      recommendationType = 'executive';
    } else if (score >= 5) {
      recommendationType = 'comprehensive';
    } else {
      recommendationType = 'foundation';
    }
    
    // Generate personalized explanation based on needs
    let explanation = '';
    const specifics = [];
    
    // Check for specific needs to personalize the message
    if (teamSize >= 20) specifics.push('large team');
    if (answers.implementationSupport === 'full_service') specifics.push('full implementation support');
    if (answers.timeline === 'immediate') specifics.push('accelerated timeline');
    if (answers.contentVolume === 'high') specifics.push('high-volume content production');
    
    // Base explanations for each recommendation type
    const baseExplanations: Record<string, string> = {
      foundation: "Based on your team structure and implementation timeline, our Foundation approach provides the right balance of guidance and self-direction.",
      comprehensive: "Your team size and content goals align perfectly with our Comprehensive Implementation approach, which provides the structured support you need.",
      executive: "Given your accelerated timeline and full-service preferences, our Executive Partnership would provide the dedicated support necessary for rapid results."
    };
    
    // Start with the base explanation
    explanation = baseExplanations[recommendationType];
    
    // Add specifics for a more personalized touch
    if (specifics.length > 0) {
      explanation += ` We've tailored this recommendation specifically for your ${specifics.join(', ')}.`;
    }
    
    // Add recommendation-specific details
    if (recommendationType === 'executive') {
      explanation += " Our Executive Partnership includes dedicated support, customized implementation, and accelerated results.";
    } else if (recommendationType === 'comprehensive') {
      explanation += " The Comprehensive Implementation includes group coaching, full team training, and our complete system implementation.";
    } else {
      explanation += " Our Foundation program gives you the core materials and self-paced implementation guidance for your team.";
    }
    
    // Track the recommendation event with detailed data
    trackEvent('recommendation_generated', {
      recommendationType,
      score,
      specifics,
      timeSpent: engagement.timeSpent,
      totalInteractions: engagement.questionInteractions
    });
    
    // Set the recommendation with all details
    setRecommendation({
      type: recommendationType,
      score: score,
      explanation: explanation,
      pricing: recommendationType === 'executive' ? '£9,500' : 
               recommendationType === 'comprehensive' ? '£5,500' : 
               '£1,950'
    });
    
    // Move to recommendation stage
    setStage('recommendation');
  };
  
  // Open Calendly when booking a call
  const handleBookCall = () => {
    setShowCalendly(true);
    
    // Build comprehensive lead data for CRM integration
    const leadData = {
      contact: {
        name: answers.name,
        email: answers.email,
        company: answers.company,
        position: answers.position
      },
      qualification: {
        teamSize: parseInt(answers.teamSize || '0'),
        implementationSupport: answers.implementationSupport,
        timeline: answers.timeline,
        contentVolume: answers.contentVolume,
        recommendedApproach: recommendation?.type,
        score: recommendation?.score || 0
      },
      engagement: {
        timeSpent: engagement.timeSpent,
        questionInteractions: engagement.questionInteractions,
        focusChanges: engagement.focusChanges
      },
      funnel: {
        qualificationCompleted: true,
        recommendationViewed: true,
        calendlyScheduled: true,
        callCompleted: false,
        followupStatus: 'pending'
      },
      timestamps: {
        qualificationStarted: new Date(Date.now() - (engagement.timeSpent * 1000)),
        qualificationCompleted: new Date(),
        recommendationViewed: new Date(),
        calendlyScheduled: new Date(),
        firstVisit: new Date(sessionStorage.getItem('firstVisit') || Date.now())
      },
      source: {
        initialReferrer: document.referrer || 'direct',
        landingPage: window.location.href,
        utmSource: new URLSearchParams(window.location.search).get('utm_source') || '',
        utmMedium: new URLSearchParams(window.location.search).get('utm_medium') || '',
        utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign') || '',
        device: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(navigator.userAgent) ? 'mobile' : 'desktop',
        browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : 
                 navigator.userAgent.includes('Firefox') ? 'Firefox' : 
                 navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome') ? 'Safari' : 
                 navigator.userAgent.includes('Edge') ? 'Edge' : 'Other'
      }
    };
    
    // Store in session storage for CRM integration
    sessionStorage.setItem('qualificationData', JSON.stringify(leadData));
    
    // Track the booking event
    trackEvent('calendly_opened', {
      recommendation: recommendation?.type,
      score: recommendation?.score,
      journeyDuration: engagement.timeSpent,
      totalInteractions: engagement.questionInteractions
    });
    
    // In production, we would integrate with Kajabi and Kit here
    const integrateWithKajabi = async (data: any) => {
      try {
        // This would be implemented in production
        // const response = await fetch('/api/kajabi/contact', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data)
        // });
        // return await response.json();
        console.log('[Kajabi Integration]', data);
        return { success: true };
      } catch (error) {
        console.error('Error integrating with Kajabi:', error);
        return { success: false, error };
      }
    };
    
    const integrateWithKit = async (data: any) => {
      try {
        // This would be implemented in production
        // const response = await fetch('/api/kit/subscriber', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data)
        // });
        // return await response.json();
        console.log('[Kit Integration]', data);
        return { success: true };
      } catch (error) {
        console.error('Error integrating with Kit:', error);
        return { success: false, error };
      }
    };
    
    // For demonstration purposes - would be activated in production
    // integrateWithKajabi(leadData);
    // integrateWithKit(leadData);
  };
  
  // Close Calendly popup
  const handleCalendlyClose = () => {
    setShowCalendly(false);
  };
  
  // Proceed to next stage
  const goToNextStage = () => {
    // For contact form, validate fields before proceeding
    if (stage === 'contact' && !validateFields()) {
      // If validation fails, track the event and return
      trackEvent('qualification_validation_failed', {
        stage: 'contact',
        errors: errors
      });
      return;
    }
    
    // Track the stage completion event
    trackEvent('qualification_step_completed', {
      stage: stage,
      timeSpent: engagement.timeSpent,
      interactionCount: engagement.questionInteractions
    });
    
    // Proceed to next stage based on current stage
    switch (stage) {
      case 'intro':
        setStage('contact');
        trackEvent('qualification_started');
        break;
      case 'contact':
        setStage('teamSize');
        break;
      case 'teamSize':
        setStage('implementationSupport');
        break;
      case 'implementationSupport':
        setStage('timeline');
        break;
      case 'timeline':
        setStage('contentVolume');
        break;
      case 'contentVolume':
        processAnswers(); // Calculate recommendation and go to recommendation stage
        break;
      default:
        break;
    }
  };
  
  // Go back to previous stage
  const goToPreviousStage = () => {
    // Track the navigation event
    trackEvent('qualification_navigate_back', {
      from: stage,
      timeSpent: engagement.timeSpent
    });
    
    switch (stage) {
      case 'contact':
        setStage('intro');
        break;
      case 'teamSize':
        setStage('contact');
        break;
      case 'implementationSupport':
        setStage('teamSize');
        break;
      case 'timeline':
        setStage('implementationSupport');
        break;
      case 'contentVolume':
        setStage('timeline');
        break;
      case 'recommendation':
        setStage('contentVolume');
        break;
      default:
        break;
    }
  };

  // Handle modal close animation
  const handleClose = () => {
    // Track modal close event with journey data
    trackEvent('qualification_abandoned', {
      stage: stage,
      timeSpent: engagement.timeSpent,
      progress: getProgress(),
      hasContactInfo: Boolean(answers.email)
    });

    if (!modalRef.current || !overlayRef.current) {
      onClose();
      return;
    }

    // Animate overlay
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    });

    // Animate modal
    gsap.to(modalRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.3,
      ease: "power3.in",
      onComplete: onClose
    });
  };
  
  // Validate if current stage can proceed
  const canProceed = () => {
    switch (stage) {
      case 'intro':
        return true;
      case 'contact':
        return answers.name && answers.email && answers.company;
      case 'teamSize':
        return answers.teamSize !== '';
      case 'implementationSupport':
        return answers.implementationSupport !== '';
      case 'timeline':
        return answers.timeline !== '';
      case 'contentVolume':
        return answers.contentVolume !== '';
      default:
        return true;
    }
  };
  
  // Determine current progress percentage
  const getProgress = () => {
    const stages = ['intro', 'contact', 'teamSize', 'implementationSupport', 'timeline', 'contentVolume', 'recommendation'];
    const currentIndex = stages.indexOf(stage);
    return Math.round((currentIndex / (stages.length - 1)) * 100);
  };
  
  // If modal is not open, don't render anything
  if (!isOpen) return null;
  
  // Function to toggle theme for testing
  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
    } else {
      html.classList.add('dark');
    }
  };
  
  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
      {/* Test mode controls */}
      {testMode && (
        <div className="fixed top-4 right-4 z-[60] flex items-center gap-2 bg-white dark:bg-[#0a0a0a] p-2 rounded-md shadow-md">
          <span className="text-xs font-medium">Test Controls:</span>
          <button 
            onClick={toggleTheme}
            className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-md"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 hidden dark:inline-block" />
            <Moon className="h-4 w-4 inline-block dark:hidden" />
          </button>
          <span className="text-xs">{stage}</span>
        </div>
      )}
      
      {/* Overlay backdrop */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 transition-opacity" 
        onClick={handleClose}
      />
      
      {/* Modal content */}
      <div 
        ref={modalRef}
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-theme-gradient rounded-2xl shadow-theme-md opacity-0"
      >
        {/* Floating elements for visual interest */}
        <div className="modal-floating-element absolute top-10 right-10 -z-10 w-20 h-20 rounded-[40%] rotate-12 opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-primary)]"></div>
        <div className="modal-floating-element absolute bottom-10 left-10 -z-10 w-24 h-24 rounded-[30%] -rotate-6 opacity-[var(--theme-float-opacity-secondary)] bg-[var(--theme-float-bg-secondary)]"></div>
        
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-[var(--theme-border-light)] p-6">
          <h2 className="text-xl font-medium text-theme-primary">
            {stage === 'intro' && 'Find Your Implementation Strategy'}
            {stage === 'contact' && 'Your Information'}
            {stage === 'teamSize' && 'Team Structure'}
            {stage === 'implementationSupport' && 'Implementation Support'}
            {stage === 'timeline' && 'Implementation Timeline'}
            {stage === 'contentVolume' && 'Content Production Goals'}
            {stage === 'recommendation' && 'Your Personalized Recommendation'}
          </h2>
          
          <button 
            onClick={handleClose}
            className="rounded-full p-2 text-theme-tertiary hover:text-theme-primary hover-bubbly-sm transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Progress bar - only show during questions */}
        {stage !== 'intro' && stage !== 'recommendation' && (
          <div className="w-full h-1 bg-theme-bg-secondary">
            <div 
              className="h-full bg-theme-primary"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        )}
        
        {/* Modal content - changes based on current stage */}
        <div className="p-6">
          {/* Introduction Stage */}
          {stage === 'intro' && (
            <div className="space-y-4">
              <p className="text-theme-primary">
                Answer a few questions to receive a personalized implementation strategy for your content production needs. This helps us understand your specific situation and recommend the right approach.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-theme-bg-primary rounded-lg p-4 border border-[var(--theme-border-light)]">
                  <h3 className="text-lg font-medium text-theme-primary mb-2">
                    You'll discover:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                      <span className="text-theme-secondary">Your ideal implementation approach</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                      <span className="text-theme-secondary">Personalized strategy recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                      <span className="text-theme-secondary">Support level that matches your needs</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-theme-bg-primary rounded-lg p-4 border border-[var(--theme-border-light)]">
                  <h3 className="text-lg font-medium text-theme-primary mb-2">
                    Quick process:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex items-center justify-center h-5 w-5 rounded-full bg-theme-primary text-white text-xs shrink-0 mt-0.5">1</div>
                      <span className="text-theme-secondary">Answer a few strategic questions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex items-center justify-center h-5 w-5 rounded-full bg-theme-primary text-white text-xs shrink-0 mt-0.5">2</div>
                      <span className="text-theme-secondary">Get your personalized recommendation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex items-center justify-center h-5 w-5 rounded-full bg-theme-primary text-white text-xs shrink-0 mt-0.5">3</div>
                      <span className="text-theme-secondary">Book a call with the right specialist</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Contact Information Stage */}
          {stage === 'contact' && (
            <div className="space-y-4">
              <p className="text-theme-secondary mb-4">
                Let's start with some basic information about you and your company.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-theme-primary mb-1">
                    Your Name*
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={answers.name}
                    onChange={(e) => handleAnswerChange('name', e.target.value)}
                    className={`w-full rounded-lg border ${errors.name ? 'border-red-500 dark:border-red-400' : 'border-[var(--theme-border-light)]'} bg-theme-bg-surface px-3 py-2 text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent`}
                    placeholder="Full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-500 dark:text-red-400 text-sm">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-theme-primary mb-1">
                    Email Address*
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={answers.email}
                    onChange={(e) => handleAnswerChange('email', e.target.value)}
                    className={`w-full rounded-lg border ${errors.email ? 'border-red-500 dark:border-red-400' : 'border-[var(--theme-border-light)]'} bg-theme-bg-surface px-3 py-2 text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent`}
                    placeholder="you@company.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 dark:text-red-400 text-sm">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-theme-primary mb-1">
                    Company Name*
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={answers.company}
                    onChange={(e) => handleAnswerChange('company', e.target.value)}
                    className={`w-full rounded-lg border ${errors.company ? 'border-red-500 dark:border-red-400' : 'border-[var(--theme-border-light)]'} bg-theme-bg-surface px-3 py-2 text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent`}
                    placeholder="Company name"
                  />
                  {errors.company && (
                    <p className="mt-1 text-red-500 dark:text-red-400 text-sm">{errors.company}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-theme-primary mb-1">
                    Your Position
                  </label>
                  <input
                    id="position"
                    type="text"
                    value={answers.position}
                    onChange={(e) => handleAnswerChange('position', e.target.value)}
                    className="w-full rounded-lg border border-[var(--theme-border-light)] bg-theme-bg-surface px-3 py-2 text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent"
                    placeholder="Job title"
                  />
                </div>
              </div>
              
              <p className="text-theme-tertiary text-sm mt-4">
                *Required fields
              </p>
            </div>
          )}
          
          {/* Team Size Stage */}
          {stage === 'teamSize' && (
            <div className="space-y-4">
              <p className="text-theme-secondary mb-6">
                How would you describe your content team structure?
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleAnswerChange('teamSize', '1')}
                  className={`w-full flex items-center p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.teamSize === '1' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-theme-primary font-medium">Solo Creator or Founder</h3>
                    <p className="text-theme-secondary text-sm">You handle most content creation yourself or with 1-2 freelancers</p>
                  </div>
                  {answers.teamSize === '1' && (
                    <CheckCircle className="h-5 w-5 text-theme-primary" />
                  )}
                </button>
                
                <button
                  onClick={() => handleAnswerChange('teamSize', '5')}
                  className={`w-full flex items-center p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.teamSize === '5' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-theme-primary font-medium">Small Team</h3>
                    <p className="text-theme-secondary text-sm">You have a small in-house team (2-9 people) producing content</p>
                  </div>
                  {answers.teamSize === '5' && (
                    <CheckCircle className="h-5 w-5 text-theme-primary" />
                  )}
                </button>
                
                <button
                  onClick={() => handleAnswerChange('teamSize', '15')}
                  className={`w-full flex items-center p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.teamSize === '15' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-theme-primary font-medium">Mid-Size Team</h3>
                    <p className="text-theme-secondary text-sm">Your content team consists of 10-19 people across various roles</p>
                  </div>
                  {answers.teamSize === '15' && (
                    <CheckCircle className="h-5 w-5 text-theme-primary" />
                  )}
                </button>
                
                <button
                  onClick={() => handleAnswerChange('teamSize', '25')}
                  className={`w-full flex items-center p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.teamSize === '25' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-theme-primary font-medium">Large Organization</h3>
                    <p className="text-theme-secondary text-sm">You have 20+ people involved in content production or multiple teams</p>
                  </div>
                  {answers.teamSize === '25' && (
                    <CheckCircle className="h-5 w-5 text-theme-primary" />
                  )}
                </button>
              </div>
            </div>
          )}
          
          {/* Implementation Support Stage */}
          {stage === 'implementationSupport' && (
            <div className="space-y-4">
              <p className="text-theme-secondary mb-6">
                What level of implementation support would best serve your team?
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleAnswerChange('implementationSupport', 'self_directed')}
                  className={`w-full flex items-center p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.implementationSupport === 'self_directed' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-theme-primary font-medium">Self-Directed Implementation</h3>
                    <p className="text-theme-secondary text-sm">You prefer to implement systems yourself with documentation and resources</p>
                  </div>
                  {answers.implementationSupport === 'self_directed' && (
                    <CheckCircle className="h-5 w-5 text-theme-primary" />
                  )}
                </button>
                
                <button
                  onClick={() => handleAnswerChange('implementationSupport', 'guided')}
                  className={`w-full flex items-center p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.implementationSupport === 'guided' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-theme-primary font-medium">Guided Implementation</h3>
                    <p className="text-theme-secondary text-sm">You want regular coaching and guidance while your team implements</p>
                  </div>
                  {answers.implementationSupport === 'guided' && (
                    <CheckCircle className="h-5 w-5 text-theme-primary" />
                  )}
                </button>
                
                <button
                  onClick={() => handleAnswerChange('implementationSupport', 'full_service')}
                  className={`w-full flex items-center p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.implementationSupport === 'full_service' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-theme-primary font-medium">Full-Service Implementation</h3>
                    <p className="text-theme-secondary text-sm">You want dedicated support and done-for-you implementation assistance</p>
                  </div>
                  {answers.implementationSupport === 'full_service' && (
                    <CheckCircle className="h-5 w-5 text-theme-primary" />
                  )}
                </button>
              </div>
            </div>
          )}
          
          {/* Timeline Stage */}
          {stage === 'timeline' && (
            <div className="space-y-4">
              <p className="text-theme-secondary mb-6">
                When are you looking to implement these new content systems?
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleAnswerChange('timeline', 'immediate')}
                  className={`w-full flex items-center p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.timeline === 'immediate' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-theme-primary font-medium">Immediate (0-4 weeks)</h3>
                    <p className="text-theme-secondary text-sm">You're ready to begin implementation immediately</p>
                  </div>
                  {answers.timeline === 'immediate' && (
                    <CheckCircle className="h-5 w-5 text-theme-primary" />
                  )}
                </button>
                
                <button
                  onClick={() => handleAnswerChange('timeline', 'next_quarter')}
                  className={`w-full flex items-center p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.timeline === 'next_quarter' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-theme-primary font-medium">Next Quarter (1-3 months)</h3>
                    <p className="text-theme-secondary text-sm">You're planning implementation in the next quarter</p>
                  </div>
                  {answers.timeline === 'next_quarter' && (
                    <CheckCircle className="h-5 w-5 text-theme-primary" />
                  )}
                </button>
                
                <button
                  onClick={() => handleAnswerChange('timeline', 'exploratory')}
                  className={`w-full flex items-center p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.timeline === 'exploratory' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-theme-primary font-medium">Exploratory (3+ months)</h3>
                    <p className="text-theme-secondary text-sm">You're researching options for future implementation</p>
                  </div>
                  {answers.timeline === 'exploratory' && (
                    <CheckCircle className="h-5 w-5 text-theme-primary" />
                  )}
                </button>
              </div>
            </div>
          )}
          
          {/* Content Volume Stage */}
          {stage === 'contentVolume' && (
            <div className="space-y-4">
              <p className="text-theme-secondary mb-6">
                What are your monthly content production goals?
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleAnswerChange('contentVolume', 'low')}
                  className={`w-full flex items-center p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.contentVolume === 'low' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-theme-primary font-medium">Focused Output (1-9 pieces/month)</h3>
                    <p className="text-theme-secondary text-sm">You create a few high-impact pieces of content monthly</p>
                  </div>
                  {answers.contentVolume === 'low' && (
                    <CheckCircle className="h-5 w-5 text-theme-primary" />
                  )}
                </button>
                
                <button
                  onClick={() => handleAnswerChange('contentVolume', 'medium')}
                  className={`w-full flex items-center p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.contentVolume === 'medium' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-theme-primary font-medium">Moderate Volume (10-49 pieces/month)</h3>
                    <p className="text-theme-secondary text-sm">You maintain consistent content across multiple channels</p>
                  </div>
                  {answers.contentVolume === 'medium' && (
                    <CheckCircle className="h-5 w-5 text-theme-primary" />
                  )}
                </button>
                
                <button
                  onClick={() => handleAnswerChange('contentVolume', 'high')}
                  className={`w-full flex items-center p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.contentVolume === 'high' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-theme-primary font-medium">High Volume (50+ pieces/month)</h3>
                    <p className="text-theme-secondary text-sm">You need systems for large-scale content production</p>
                  </div>
                  {answers.contentVolume === 'high' && (
                    <CheckCircle className="h-5 w-5 text-theme-primary" />
                  )}
                </button>
              </div>
            </div>
          )}
          
          {/* Recommendation Stage */}
          {stage === 'recommendation' && recommendation && (
            <div className="space-y-6">
              {/* Personalized header based on recommendation */}
              <div className="bg-theme-gradient-start to-theme-gradient-end p-6 rounded-lg border border-[var(--theme-border-light)]">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${recommendation.type === 'executive' ? 'bg-[#B92234]/10 text-[#B92234] dark:bg-[#B92234]/20 dark:text-[#D72D41]' : 
                      recommendation.type === 'comprehensive' ? 'bg-[#FEA35D]/10 text-[#FEA35D] dark:bg-[#FEA35D]/20 dark:text-[#FEB77D]' : 
                      'bg-[#357380]/10 text-[#357380] dark:bg-[#357380]/20 dark:text-[#4789A0]'}
                  `}>
                    {recommendation.type === 'executive' ? 'Executive Partnership' : 
                     recommendation.type === 'comprehensive' ? 'Comprehensive Implementation' : 
                     'Foundation Program'}
                  </div>
                </div>
                
                <h3 className="text-xl font-medium text-theme-primary mb-2">
                  {recommendation.type === 'executive' ? 'Executive Partnership' : 
                   recommendation.type === 'comprehensive' ? 'Comprehensive Implementation' : 
                   'Foundation Program'}
                </h3>
                
                <p className="text-theme-secondary">
                  {recommendation.explanation}
                </p>
              </div>
              
              {/* Implementation Details */}
              <div className="border border-[var(--theme-border-light)] rounded-lg overflow-hidden">
                <div className="bg-theme-bg-primary p-4 border-b border-[var(--theme-border-light)]">
                  <h3 className="text-lg font-medium text-theme-primary">Implementation Includes:</h3>
                </div>
                
                <div className="p-4 space-y-3">
                  {/* Executive Partnership Features */}
                  {recommendation.type === 'executive' && (
                    <>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-theme-primary font-medium">Dedicated Implementation Manager</h4>
                          <p className="text-theme-secondary text-sm">Work directly with a senior strategist to customize your implementation</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-theme-primary font-medium">Customized Implementation Plan</h4>
                          <p className="text-theme-secondary text-sm">Tailored strategy specifically for your team's structure and goals</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-theme-primary font-medium">Comprehensive Team Training</h4>
                          <p className="text-theme-secondary text-sm">Complete training program for your entire content team</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-theme-primary font-medium">Done-For-You System Setup</h4>
                          <p className="text-theme-secondary text-sm">We set up your content production systems for you</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-theme-primary font-medium">Extended Support Period</h4>
                          <p className="text-theme-secondary text-sm">6 months of implementation support and optimization</p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {/* Comprehensive Implementation Features */}
                  {recommendation.type === 'comprehensive' && (
                    <>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-theme-primary font-medium">Group Implementation Coaching</h4>
                          <p className="text-theme-secondary text-sm">Weekly group coaching sessions to guide your implementation</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-theme-primary font-medium">Complete System Implementation</h4>
                          <p className="text-theme-secondary text-sm">All templates, workflows, and processes for full implementation</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-theme-primary font-medium">Team Training Program</h4>
                          <p className="text-theme-secondary text-sm">Training modules for your content production team</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-theme-primary font-medium">Implementation Support</h4>
                          <p className="text-theme-secondary text-sm">3 months of implementation support and troubleshooting</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-theme-primary font-medium">Private Community Access</h4>
                          <p className="text-theme-secondary text-sm">Network with other teams implementing the same systems</p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {/* Foundation Program Features */}
                  {recommendation.type === 'foundation' && (
                    <>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-theme-primary font-medium">Self-Paced Implementation</h4>
                          <p className="text-theme-secondary text-sm">Comprehensive documentation and video tutorials</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-theme-primary font-medium">Core System Templates</h4>
                          <p className="text-theme-secondary text-sm">Essential templates and workflows for content production</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-theme-primary font-medium">Monthly Q&A Sessions</h4>
                          <p className="text-theme-secondary text-sm">Group sessions to answer implementation questions</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-theme-primary font-medium">Email Support</h4>
                          <p className="text-theme-secondary text-sm">Get answers to implementation questions via email</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-theme-primary font-medium">Community Access</h4>
                          <p className="text-theme-secondary text-sm">Connect with others implementing the same systems</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {/* Investment & Next Steps */}
              <div className="bg-theme-bg-primary p-6 rounded-lg border border-[var(--theme-border-light)]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-theme-primary">Investment:</h3>
                  <div className="text-xl font-bold text-theme-primary">
                    {recommendation.pricing}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-theme-secondary">
                    {recommendation.type === 'executive' ? 
                      'The Executive Partnership is our premium implementation approach with the highest level of customization and support.' : 
                     recommendation.type === 'comprehensive' ? 
                      'The Comprehensive Implementation provides the perfect balance of guidance and hands-on support for most teams.' : 
                      'The Foundation Program gives you the essential tools and guidance to implement at your own pace.'}
                  </p>
                  
                  <div className="flex items-start gap-2 bg-theme-primary/5 p-3 rounded-lg">
                    <Info className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                    <p className="text-theme-secondary text-sm">
                      Book a call to discuss your custom implementation strategy with a specialist. There's no obligation, and you'll receive a detailed implementation plan.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Booking Info */}
              <div className="p-6 rounded-lg border border-theme-primary bg-theme-primary/5">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-6 w-6 text-theme-primary" />
                  <h3 className="text-lg font-medium text-theme-primary">
                    Schedule Your Strategy Session
                  </h3>
                </div>
                
                <p className="text-theme-secondary mb-6">
                  Based on your needs, we've prepared a personalized discussion about 
                  our {recommendation.type === 'executive' ? 'Executive Partnership' : 
                     recommendation.type === 'comprehensive' ? 'Comprehensive Implementation' : 
                     'Foundation Program'} approach.
                </p>
                
                <button
                  onClick={handleBookCall}
                  className="w-full bg-theme-gradient-primary text-white font-medium py-3 px-4 rounded-lg hover-bubbly flex items-center justify-center gap-2"
                >
                  <Calendar className="h-5 w-5" />
                  Book Your Strategy Call
                </button>
                
                <p className="text-theme-tertiary text-sm text-center mt-4">
                  30-minute call with a {recommendation.type === 'executive' ? 'senior implementation consultant' : 
                                       recommendation.type === 'comprehensive' ? 'implementation specialist' : 
                                       'product specialist'}
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Modal footer with navigation buttons */}
        <div className="border-t border-[var(--theme-border-light)] p-6">
          <div className="flex justify-between">
            {/* Back button - only show if not on first or last stage */}
            {stage !== 'intro' && stage !== 'recommendation' && (
              <button
                onClick={goToPreviousStage}
                className="text-theme-secondary hover:text-theme-primary px-4 py-2 rounded-lg transition-colors hover-bubbly-sm"
              >
                Back
              </button>
            )}
            
            {/* Cancel button - only on first stage or recommendation */}
            {(stage === 'intro' || stage === 'recommendation') && (
              <button
                onClick={handleClose}
                className="text-theme-secondary hover:text-theme-primary px-4 py-2 rounded-lg transition-colors hover-bubbly-sm"
              >
                {stage === 'intro' ? 'Not now' : 'Close'}
              </button>
            )}
            
            {/* Next or Finish button - not on recommendation stage */}
            {stage !== 'recommendation' && (
              <button
                onClick={goToNextStage}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors hover-bubbly-sm ${
                  canProceed()
                    ? 'bg-theme-primary hover:bg-theme-primary-hover text-white'
                    : 'bg-theme-bg-secondary text-theme-tertiary cursor-not-allowed'
                }`}
              >
                {stage === 'contentVolume' ? 'Get Recommendation' : 'Continue'}
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Calendly Integration */}
      {showCalendly && (
        <CalendlyPopupWidget
          url="https://calendly.com/jodenclashnewman/vertical-shortcut-discovery-call"
          text="Schedule a Call"
          color="#FEA35D"
          textColor="#FFFFFF"
          primaryColor="FEA35D"
          hideGdprBanner={true}
          position="center"
          className="hidden" // Hide the widget button
        >
          <></>
        </CalendlyPopupWidget>
      )}
    </div>
  );
};

export default VSQualificationModal;