import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, Check, Info, Calendar, CheckCircle, Moon, Sun } from 'lucide-react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
  // Define the sequence of stages
  const stageSequence = ['intro', 'teamSize', 'implementationSupport', 'timeline', 'contentVolume', 'contact', 'recommendation'];
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
  
  // Stage transition animation refs
  const contentRef = useRef<HTMLDivElement>(null);
  const lastStageRef = useRef<string>(stage);

  // Handle animation with GSAP
  useGSAP(() => {
    if (!isOpen || !modalRef.current || !overlayRef.current) return;

    // Get computed theme variables for animation
    const styles = getComputedStyle(document.documentElement);
    const animDistance = parseFloat(styles.getPropertyValue('--theme-anim-distance') || '-4px');
    const animDuration = parseFloat(styles.getPropertyValue('--theme-anim-duration') || '0.35');

    const ctx = gsap.context(() => {
      // Initial modal animation
      if (!modalRef.current.style.opacity || modalRef.current.style.opacity === '0') {
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
      }

      // Floating elements animation
      gsap.to(".modal-floating-element", {
        y: animDistance * 2.5,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true, 
        stagger: 0.4
      });

      // Stage transition animation
      if (lastStageRef.current !== stage && contentRef.current) {
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 15 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.45, 
            ease: "power3.out",
            clearProps: "all" 
          }
        );

        // Add particle effect animation to signify processing
        const createProcessingEffect = () => {
          // Only create the effect for question stages
          if (['teamSize', 'implementationSupport', 'timeline', 'contentVolume'].includes(stage)) {
            // Get the container dimensions
            const container = contentRef.current;
            if (!container) return;
            
            const rect = container.getBoundingClientRect();
            
            // Create and animate 12-15 particles
            const particleCount = gsap.utils.random(12, 15, 1);
            
            for (let i = 0; i < particleCount; i++) {
              // Create a particle
              const particle = document.createElement('div');
              particle.className = 'absolute rounded-full bg-theme-primary/40 z-10';
              particle.style.width = `${gsap.utils.random(3, 8)}px`;
              particle.style.height = particle.style.width;
              
              // Position it randomly within the container
              particle.style.left = `${gsap.utils.random(10, rect.width - 20)}px`;
              particle.style.top = `${gsap.utils.random(10, rect.height - 20)}px`;
              
              container.appendChild(particle);
              
              // Animate the particle
              gsap.to(particle, {
                y: gsap.utils.random(-40, -100),
                x: gsap.utils.random(-50, 50),
                opacity: 0,
                scale: gsap.utils.random(0.2, 0.8),
                duration: gsap.utils.random(0.8, 1.5),
                ease: "power2.out",
                onComplete: () => {
                  if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                  }
                }
              });
            }
          }
        };
        
        createProcessingEffect();
      }

      // Update last stage
      lastStageRef.current = stage;
    }, containerRef);

    return () => ctx.revert();
  }, [isOpen, stage]);
  
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

  // Handle user answers with validation and auto-advance
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
    
    // Auto-advance for multiple-choice questions
    if (['teamSize', 'implementationSupport', 'timeline', 'contentVolume'].includes(stage)) {
      // Track the stage completion event
      trackEvent('qualification_step_completed', {
        stage: stage,
        timeSpent: engagement.timeSpent,
        interactionCount: engagement.questionInteractions
      });
      
      // Get the next stage in the sequence
      const currentIndex = stageSequence.indexOf(stage);
      if (currentIndex >= 0 && currentIndex < stageSequence.length - 1) {
        setStage(stageSequence[currentIndex + 1]);
      }
    }
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
  
  // Process CRM integration for lead data
  const processCrmIntegration = () => {
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
    trackEvent('calendly_viewed', {
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
        setStage('teamSize');
        trackEvent('qualification_started');
        break;
      case 'contact':
        processAnswers(); // Calculate recommendation and go to recommendation stage
        break;
      case 'contentVolume':
        setStage('contact');
        break;
      default:
        // Use the stage sequence for the default case
        const currentIndex = stageSequence.indexOf(stage);
        if (currentIndex >= 0 && currentIndex < stageSequence.length - 1) {
          setStage(stageSequence[currentIndex + 1]);
        }
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
    
    // Use the stage sequence
    const currentIndex = stageSequence.indexOf(stage);
    if (currentIndex > 0) {
      setStage(stageSequence[currentIndex - 1]);
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
        <div className="p-6" ref={contentRef}>
          {/* Introduction Stage */}
          {stage === 'intro' && (
            <div className="space-y-6">
              <div className="bg-theme-primary/5 p-5 rounded-lg">
                <h3 className="text-xl font-medium text-theme-primary mb-3">
                  Personalize Your Experience
                </h3>
                <p className="text-theme-secondary">
                  Tell us about your goals to get a tailored solution that perfectly matches your situation. Content production isn't one-size-fits-all, and neither are our recommendations.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-theme-bg-primary rounded-lg p-4 border border-[var(--theme-border-light)]">
                  <h3 className="text-lg font-medium text-theme-primary mb-2">
                    You'll receive:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                      <span className="text-theme-secondary">Custom-fit solution based on your unique needs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                      <span className="text-theme-secondary">Tailored approach to match your team structure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                      <span className="text-theme-secondary">Personalized implementation timeline</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-theme-bg-primary rounded-lg p-4 border border-[var(--theme-border-light)]">
                  <h3 className="text-lg font-medium text-theme-primary mb-2">
                    How it works:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="flex items-center justify-center h-5 w-5 rounded-full bg-theme-primary text-white text-xs shrink-0 mt-0.5">1</div>
                      <span className="text-theme-secondary">Answer a few quick questions about your needs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex items-center justify-center h-5 w-5 rounded-full bg-theme-primary text-white text-xs shrink-0 mt-0.5">2</div>
                      <span className="text-theme-secondary">Get your personalized solution recommendation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex items-center justify-center h-5 w-5 rounded-full bg-theme-primary text-white text-xs shrink-0 mt-0.5">3</div>
                      <span className="text-theme-secondary">Schedule a tailored strategy session if desired</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-theme-tertiary text-sm text-center mt-2">
                Takes less than a minute to complete. No obligation.
              </p>
            </div>
          )}
          
          {/* Contact Information Stage */}
          {stage === 'contact' && (
            <div className="space-y-4">
              <div className="bg-theme-primary/5 p-4 rounded-lg mb-6">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-theme-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-theme-primary mb-1">Let's connect the dots...</h3>
                    <p className="text-theme-secondary text-sm">
                      Your personalized solution is ready! Just tell us where to send it.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {/* Left Column - About You */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-theme-primary border-b border-[var(--theme-border-light)] pb-1">About You</h3>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-theme-primary mb-1">
                      Name*
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={answers.name}
                      onChange={(e) => handleAnswerChange('name', e.target.value)}
                      className={`w-full rounded-lg border ${errors.name ? 'border-red-500 dark:border-red-400' : 'border-[var(--theme-border-light)]'} bg-theme-bg-surface px-3 py-2 text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-red-500 dark:text-red-400 text-sm">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-theme-primary mb-1">
                      Email*
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={answers.email}
                      onChange={(e) => handleAnswerChange('email', e.target.value)}
                      className={`w-full rounded-lg border ${errors.email ? 'border-red-500 dark:border-red-400' : 'border-[var(--theme-border-light)]'} bg-theme-bg-surface px-3 py-2 text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-red-500 dark:text-red-400 text-sm">{errors.email}</p>
                    )}
                  </div>
                </div>
                
                {/* Right Column - About the Brand */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-theme-primary border-b border-[var(--theme-border-light)] pb-1">About the Brand</h3>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-theme-primary mb-1">
                      Brand/Company Name*
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={answers.company}
                      onChange={(e) => handleAnswerChange('company', e.target.value)}
                      className={`w-full rounded-lg border ${errors.company ? 'border-red-500 dark:border-red-400' : 'border-[var(--theme-border-light)]'} bg-theme-bg-surface px-3 py-2 text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent`}
                      placeholder="Brand or company name"
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
                      onChange={(e) => handleAnswerChange('position', e.target.value)}
                      className="w-full rounded-lg border border-[var(--theme-border-light)] bg-theme-bg-surface px-3 py-2 text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent"
                      placeholder="Your role in the organization"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-4">
                <CheckCircle className="h-4 w-4 text-theme-primary" />
                <p className="text-theme-tertiary text-sm">
                  Your information is secure and never shared with third parties
                </p>
              </div>
            </div>
          )}
          
          {/* Team Size Stage */}
          {stage === 'teamSize' && (
            <div className="space-y-4">
              <p className="text-theme-secondary mb-6">
                What's your team structure like? This helps us personalize your experience.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleAnswerChange('teamSize', '1')}
                  className={`flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.teamSize === '1' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Solo Creator</h3>
                    {answers.teamSize === '1' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">You create content yourself or with 1-2 freelancers</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('teamSize', '5')}
                  className={`flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.teamSize === '5' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Small Team</h3>
                    {answers.teamSize === '5' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">You have a small team (2-9 people)</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('teamSize', '15')}
                  className={`flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.teamSize === '15' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Mid-Size Team</h3>
                    {answers.teamSize === '15' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">Your team consists of 10-19 people</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('teamSize', '25')}
                  className={`flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.teamSize === '25' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Large Organization</h3>
                    {answers.teamSize === '25' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">20+ people across multiple teams</p>
                </button>
              </div>
            </div>
          )}
          
          {/* Implementation Support Stage */}
          {stage === 'implementationSupport' && (
            <div className="space-y-4">
              <p className="text-theme-secondary mb-6">
                How do you prefer to approach new tools and systems?
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleAnswerChange('implementationSupport', 'self_directed')}
                  className={`flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.implementationSupport === 'self_directed' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Self-Directed</h3>
                    {answers.implementationSupport === 'self_directed' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">I like exploring and implementing systems independently</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('implementationSupport', 'guided')}
                  className={`flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.implementationSupport === 'guided' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Guided Approach</h3>
                    {answers.implementationSupport === 'guided' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">I value coaching and guided implementation</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('implementationSupport', 'full_service')}
                  className={`flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.implementationSupport === 'full_service' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Done-For-You</h3>
                    {answers.implementationSupport === 'full_service' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">I prefer hands-on assistance and full implementation support</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('implementationSupport', 'undecided')}
                  className={`flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.implementationSupport === 'undecided' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Not Sure Yet</h3>
                    {answers.implementationSupport === 'undecided' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">I'd like to discuss options based on my specific needs</p>
                </button>
              </div>
            </div>
          )}
          
          {/* Timeline Stage */}
          {stage === 'timeline' && (
            <div className="space-y-4">
              <p className="text-theme-secondary mb-6">
                What's your ideal timeframe for starting a new project?
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleAnswerChange('timeline', 'immediate')}
                  className={`flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.timeline === 'immediate' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">ASAP</h3>
                    {answers.timeline === 'immediate' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">I'm ready to start right away (0-4 weeks)</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('timeline', 'next_quarter')}
                  className={`flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.timeline === 'next_quarter' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Next Quarter</h3>
                    {answers.timeline === 'next_quarter' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">I'm planning for the near future (1-3 months)</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('timeline', 'exploratory')}
                  className={`flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.timeline === 'exploratory' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Future Planning</h3>
                    {answers.timeline === 'exploratory' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">I'm exploring options for later implementation (3+ months)</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('timeline', 'flexible')}
                  className={`flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.timeline === 'flexible' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Flexible</h3>
                    {answers.timeline === 'flexible' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">I'm open to recommendations based on what works best</p>
                </button>
              </div>
            </div>
          )}
          
          {/* Content Volume Stage */}
          {stage === 'contentVolume' && (
            <div className="space-y-4">
              <p className="text-theme-secondary mb-6">
                What are your content creation ambitions?
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleAnswerChange('contentVolume', 'low')}
                  className={`flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.contentVolume === 'low' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Quality Focus</h3>
                    {answers.contentVolume === 'low' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">A few high-impact pieces each month (1-9 pieces)</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('contentVolume', 'medium')}
                  className={`flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.contentVolume === 'medium' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Balanced Approach</h3>
                    {answers.contentVolume === 'medium' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">Consistent content across channels (10-49 pieces)</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('contentVolume', 'high')}
                  className={`flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.contentVolume === 'high' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">High Volume</h3>
                    {answers.contentVolume === 'high' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">Scaling content production across platforms (50+ pieces)</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('contentVolume', 'undecided')}
                  className={`flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.contentVolume === 'undecided' 
                      ? 'border-theme-primary bg-theme-primary/10' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Still Deciding</h3>
                    {answers.contentVolume === 'undecided' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">I'd like advice on the right content volume for my goals</p>
                </button>
              </div>
            </div>
          )}
          
          {/* Recommendation Stage */}
          {stage === 'recommendation' && recommendation && (
            <div className="space-y-0">
              {/* Process CRM integration first */}
              {useEffect(() => {
                if (stage === 'recommendation') {
                  processCrmIntegration();
                }
              }, [stage])}
              
              {/* Recommendation Header - Visual Badge with minimal explanation */}
              <div className="bg-theme-gradient-start to-theme-gradient-end p-4 rounded-t-lg border border-[var(--theme-border-light)] border-b-0 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`
                    p-2.5 rounded-full
                    ${recommendation.type === 'executive' ? 'bg-[#B92234]/10 text-[#B92234] dark:bg-[#B92234]/20 dark:text-[#D72D41]' : 
                      recommendation.type === 'comprehensive' ? 'bg-[#FEA35D]/10 text-[#FEA35D] dark:bg-[#FEA35D]/20 dark:text-[#FEB77D]' : 
                      'bg-[#357380]/10 text-[#357380] dark:bg-[#357380]/20 dark:text-[#4789A0]'}
                  `}>
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-theme-primary text-lg leading-tight">
                      {recommendation.type === 'executive' ? 'Executive Partnership' : 
                      recommendation.type === 'comprehensive' ? 'Comprehensive Implementation' : 
                      'Foundation Program'}
                    </h3>
                    <p className="text-theme-secondary text-sm">Perfect match for your needs</p>
                  </div>
                </div>
                
                <div className="text-xl font-bold text-theme-primary">
                  {recommendation.pricing}
                </div>
              </div>
              
              {/* Key Features - Top 3 only to reduce text */}
              <div className="bg-theme-bg-surface p-4 border-x border-[var(--theme-border-light)]">
                <h4 className="text-sm uppercase text-theme-tertiary tracking-wide mb-3">Key Features</h4>
                <div className="space-y-2">
                  {recommendation.type === 'executive' ? (
                    <>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-0.5" />
                        <p className="text-theme-secondary text-sm">Dedicated implementation manager & personalized support</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-0.5" />
                        <p className="text-theme-secondary text-sm">Customized implementation plan for your team</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-0.5" />
                        <p className="text-theme-secondary text-sm">6 months of implementation support & optimization</p>
                      </div>
                    </>
                  ) : recommendation.type === 'comprehensive' ? (
                    <>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-0.5" />
                        <p className="text-theme-secondary text-sm">Weekly group coaching sessions with experts</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-0.5" />
                        <p className="text-theme-secondary text-sm">Complete system implementation with all templates</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-0.5" />
                        <p className="text-theme-secondary text-sm">3 months of implementation support & private community</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-0.5" />
                        <p className="text-theme-secondary text-sm">Self-paced implementation with comprehensive guides</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-0.5" />
                        <p className="text-theme-secondary text-sm">Core system templates and production workflows</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-0.5" />
                        <p className="text-theme-secondary text-sm">Monthly Q&A sessions and community access</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {/* Embedded Calendly Widget */}
              <div className="border-x border-b border-[var(--theme-border-light)] rounded-b-lg">
                <div className="pt-3 px-4 pb-0">
                  <h3 className="text-center text-theme-primary font-medium text-lg mb-1">
                    Schedule Your Strategy Session
                  </h3>
                  <p className="text-center text-theme-secondary text-sm mb-2">
                    Choose a time to discuss your personalized {recommendation.type} solution
                  </p>
                </div>
                
                {/* Calendly Widget - directly embedded */}
                <div 
                  className="calendly-inline-widget w-full rounded-b-lg overflow-hidden" 
                  data-url={`https://calendly.com/jodenclashnewman/vertical-shortcut-discovery-call?hide_gdpr_banner=1&primary_color=FEA35D${
                    recommendation.type === 'executive' ? '&name=Executive_Partnership' : 
                    recommendation.type === 'comprehensive' ? '&name=Comprehensive_Implementation' : 
                    '&name=Foundation_Program'
                  }`}
                  style={{ height: "400px", minWidth: "320px" }}
                />
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
                {stage === 'intro' ? 'Maybe later' : 'Close'}
              </button>
            )}
            
            {/* Next or Finish button for intro and contact stages */}
            {['intro', 'contact'].includes(stage) && (
              <button
                onClick={goToNextStage}
                disabled={stage === 'contact' && !canProceed()}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors hover-bubbly-sm ${
                  stage === 'contact' && !canProceed()
                    ? 'bg-theme-bg-secondary text-theme-tertiary cursor-not-allowed'
                    : 'bg-theme-primary hover:bg-theme-primary-hover text-white'
                }`}
              >
                {stage === 'intro' ? 'Start Personalization' : 'Show My Recommendation'}
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Calendly Script Loading */}
      {useEffect(() => {
        // Load Calendly script when needed
        if (stage === 'recommendation') {
          const script = document.createElement('script');
          script.src = 'https://assets.calendly.com/assets/external/widget.js';
          script.async = true;
          script.id = 'calendly-script';
          document.head.appendChild(script);
          
          return () => {
            // Clean up script when component unmounts
            const existingScript = document.getElementById('calendly-script');
            if (existingScript) {
              existingScript.remove();
            }
          };
        }
      }, [stage])}
    </div>
  );
};

export default VSQualificationModal;