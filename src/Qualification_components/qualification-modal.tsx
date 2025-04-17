import React, { useState, useEffect } from 'react';
import {
  Users, Compass, Clock, BarChart4, Mail, Award, Briefcase, Sun, Moon
} from 'lucide-react';

import {
  ModalContainer,
  ModalFooter,
  StageIcon,
  IntroStage,
  QuestionStage,
  ContactStage,
  AnalysisAnimation,
  AnalysisBreakdown,
  FoundationRecommendation,
  PremiumRecommendation
} from './modal-components';

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
const VSQualificationModal: React.FC<VSQualificationModalProps> = ({ 
  isOpen, 
  onClose, 
  testMode = false 
}) => {
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
  const stageSequence = ['intro', 'teamSize', 'implementationSupport', 'timeline', 'contentVolume', 'contact', 'analysis', 'breakdown', 'recommendation'];
  
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
    showCalendly?: boolean;
    showDirectPurchase?: boolean;
    showUpgradeOption?: boolean;
  } | null>(null);
  
  // State for analysis data
  const [analysisData, setAnalysisData] = useState<{
    score: number;
    recommendationType: string;
    explanation: string;
    pricing: string;
    showCalendly: boolean;
    showDirectPurchase: boolean;
    showUpgradeOption: boolean;
  } | null>(null);
  
  const [showCalendly, setShowCalendly] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  // Animation state
  const [isAnimatingSelection, setIsAnimatingSelection] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  
  // Tracking modal engagement for analytics and scoring
  const [engagement, setEngagement] = useState({
    timeSpent: 0,
    questionInteractions: 0,
    focusChanges: 0
  });
  
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

  // Handle user answers with validation, animation, and auto-advance
  const handleAnswerChange = (key: string, value: string) => {
    // Special handling for form fields (name, email, company, position)
    const isFormField = ['name', 'email', 'company', 'position'].includes(key);
    
    // For form fields, we don't want animation or blocking during animation
    if (!isFormField && isAnimatingSelection) return;
    
    // Only set animation state for multiple choice options, not form fields
    if (!isFormField) {
      setSelectedChoice(value);
      setIsAnimatingSelection(true);
      
      // Simulate the animation completion for multiple-choice questions
      setTimeout(() => {
        // Get the next stage in the sequence
        const currentIndex = stageSequence.indexOf(stage);
        if (currentIndex >= 0 && currentIndex < stageSequence.length - 1) {
          setStage(stageSequence[currentIndex + 1]);
        }
        
        // Reset animation state
        setIsAnimatingSelection(false);
        setSelectedChoice(null);
      }, 1000);
    }
    
    // Update actual answer
    setAnswers(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Clear error for this field if it exists
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
  
  // Handle saved progress quietly without alert
  useEffect(() => {
    if (!isOpen) return;
    
    // Check for abandoned journey
    const savedProgress = localStorage.getItem('qualificationProgress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        
        // If journey was abandoned recently (within 24 hours)
        // and user is beyond intro stage, we might restore progress
        if (Date.now() - progress.lastActive < 24 * 60 * 60 * 1000 && 
            progress.stage !== 'intro' && progress.stage !== 'recommendation') {
            
          // For now, just always continue - no need to interrupt
          setStage(progress.stage);
          setAnswers(progress.answers);
          setEngagement(prev => ({
            ...prev,
            timeSpent: progress.engagement.timeSpent,
            questionInteractions: progress.engagement.questionInteractions
          }));
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
  
  // Calendly script loading
  useEffect(() => {
    // Load Calendly script when needed
    if (stage === 'recommendation' && recommendation?.showCalendly) {
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
  }, [stage, recommendation]);
  
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
    let showCalendly = true;
    let showDirectPurchase = false;
    let showUpgradeOption = false;
    
    if (score >= 8) {
      recommendationType = 'executive';
      showCalendly = true;
      showDirectPurchase = false; 
    } else if (score >= 5) {
      recommendationType = 'comprehensive';
      showCalendly = true;
      showDirectPurchase = false;
    } else {
      recommendationType = 'foundation';
      showCalendly = false; // No Calendly for Foundation tier
      showDirectPurchase = true;
      showUpgradeOption = true;
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
    
    // First show the analysis animation
    setStage('analysis');
    
    // Track the analysis event
    trackEvent('qualification_analysis_started', {
      score,
      timeSpent: engagement.timeSpent
    });
    
    // Store calculated data for later use
    setAnalysisData({
      score,
      recommendationType,
      explanation,
      pricing: recommendationType === 'executive' ? '£9,500' : 
              recommendationType === 'comprehensive' ? '£5,500' : 
              '£1,950',
      showCalendly,
      showDirectPurchase,
      showUpgradeOption
    });
  };
  
  // Handle analysis animation completion
  const handleAnalysisAnimationComplete = () => {
    // Show the analysis breakdown
    setStage('breakdown');
    
    // Track the breakdown event
    trackEvent('qualification_breakdown_shown', {
      score: analysisData?.score || 0,
      recommendationType: analysisData?.recommendationType || '',
      timeSpent: engagement.timeSpent
    });
  };
  
  // Handle breakdown completion
  const handleBreakdownComplete = () => {
    if (!analysisData) return;
    
    // Now set the recommendation with all details
    setRecommendation({
      type: analysisData.recommendationType,
      score: analysisData.score,
      explanation: analysisData.explanation,
      pricing: analysisData.pricing,
      showCalendly: analysisData.showCalendly,
      showDirectPurchase: analysisData.showDirectPurchase,
      showUpgradeOption: analysisData.showUpgradeOption
    });
    
    // Move to recommendation stage
    setStage('recommendation');
    
    // Update showCalendly state based on recommendation
    setShowCalendly(analysisData.showCalendly);
    
    // Track the recommendation event
    trackEvent('recommendation_generated', {
      recommendationType: analysisData.recommendationType,
      score: analysisData.score,
      timeSpent: engagement.timeSpent,
      totalInteractions: engagement.questionInteractions
    });
    
    // Process CRM integration
    processCrmIntegration();
  };
  
  // Process CRM integration for lead data
  const processCrmIntegration = async () => {
    if (!recommendation) return;
    
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
        recommendedApproach: recommendation.type,
        score: recommendation.score || 0
      },
      engagement: {
        timeSpent: engagement.timeSpent,
        questionInteractions: engagement.questionInteractions,
        focusChanges: engagement.focusChanges
      },
      timestamps: {
        qualificationStarted: new Date(Date.now() - (engagement.timeSpent * 1000)),
        qualificationCompleted: new Date(),
        recommendationViewed: new Date()
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
    trackEvent('qualification_data_saved', {
      recommendation: recommendation.type,
      score: recommendation.score,
      journeyDuration: engagement.timeSpent,
      totalInteractions: engagement.questionInteractions
    });
    
    // Send to backend API for Kajabi and Kit integration
    try {
      // Prepare data for Kajabi integration
      const kajabiData = {
        person: {
          name: leadData.contact.name,
          email: leadData.contact.email,
          custom_field_values: {
            qualification_score: leadData.qualification.score.toString(),
            recommended_approach: leadData.qualification.recommendedApproach,
            team_size: leadData.qualification.teamSize.toString(),
            implementation_support: leadData.qualification.implementationSupport,
            timeline: leadData.qualification.timeline,
            content_volume: leadData.qualification.contentVolume
          },
          tags: [
            `qualification_complete`,
            `recommended_${leadData.qualification.recommendedApproach.toLowerCase()}`,
            `timeline_${leadData.qualification.timeline}`
          ]
        }
      };
      
      // Prepare data for Kit integration
      const kitData = {
        email: leadData.contact.email,
        first_name: leadData.contact.name.split(' ')[0],
        fields: {
          last_name: leadData.contact.name.split(' ').slice(1).join(' '),
          company: leadData.contact.company,
          position: leadData.contact.position,
          qualification_score: leadData.qualification.score,
          recommended_approach: leadData.qualification.recommendedApproach,
          team_size: leadData.qualification.teamSize,
          implementation_support: leadData.qualification.implementationSupport,
          timeline: leadData.qualification.timeline,
          content_volume: leadData.qualification.contentVolume
        },
        tags: [
          `qualified_lead`,
          `recommendation_${leadData.qualification.recommendedApproach.toLowerCase()}`,
          `timeline_${leadData.qualification.timeline}`,
          `team_size_${leadData.qualification.teamSize < 5 ? 'small' : leadData.qualification.teamSize < 15 ? 'medium' : 'large'}`
        ]
      };
      
      // Send data to backend API for processing
      const response = await fetch('/api/crm-integration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leadData,
          kajabiData,
          kitData
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        console.log('[CRM Integration] Successfully sent data to Kajabi and Kit');
      } else {
        console.error('[CRM Integration] Failed to send data:', result.error);
      }
    } catch (error) {
      console.error('[CRM Integration] Error sending data:', error);
    }
    
    // Log the data for debugging
    console.log('[CRM Integration]', leadData);
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
        processAnswers(); // Calculate recommendation and go to analysis stage
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
  
  // Function to get the stage title
  const getStageTitle = () => {
    switch (stage) {
      case 'intro': return 'How can we help?';
      case 'teamSize': return 'About Your Team';
      case 'implementationSupport': return 'Your Implementation Style';
      case 'timeline': return 'Project Timeline';
      case 'contentVolume': return 'Content Vision';
      case 'contact': return 'Let\'s Personalize Your Plan';
      case 'analysis': return 'Crafting Your Solution';
      case 'breakdown': return 'Your Implementation Analysis';
      case 'recommendation': return 'Your Personalized Strategy';
      default: return 'Qualification Journey';
    }
  };

  // Validate if current stage can proceed
  const canProceed = () => {
    switch (stage) {
      case 'intro':
        return true;
      case 'contact': {
        // Need to wrap in a block when using variable declarations
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return (
            answers.name.trim() !== '' &&
            emailRegex.test(answers.email) &&
            answers.company.trim() !== ''
        );
      }
      case 'teamSize':
        return answers.teamSize !== '';
      case 'implementationSupport':
        return answers.implementationSupport !== '';
      case 'timeline':
        return answers.timeline !== '';
      case 'contentVolume':
        return answers.contentVolume !== '';
      case 'analysis':
        return true;
      case 'breakdown':
        return true;
      case 'recommendation':
        return recommendation !== null;
      default: {
        console.warn(`Unhandled stage in validation: ${stage}`);
        return false;
      }
    }
  };



  // Determine current progress percentage
  const getProgress = () => {
    // Only count the active question stages (team size to contact) for progress calculation
    const currentIndex = stageSequence.indexOf(stage);
    // For intro stage, show 0 progress
    if (stage === 'intro') return 0;
    // For recommendation stage, show 100% progress
    if (stage === 'recommendation') return 100;
    
    // Calculate how far along we are between first question and recommendation
    const firstQuestionIndex = stageSequence.indexOf('teamSize');
    const lastQuestionIndex = stageSequence.indexOf('contact');
    // If before questions, show 0
    if (currentIndex < firstQuestionIndex) return 0;
    
    // Calculate progress percentage through the question stages
    const progress = (currentIndex - firstQuestionIndex) / 
                    (lastQuestionIndex - firstQuestionIndex + 1);
    return Math.round(progress * 100);
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
  
  // Define question stage options
  const teamSizeOptions = [
    { 
      id: 'solo', 
      label: 'Solo Creator', 
      description: 'Just you, a dream (and occasional freelance help)',
      value: '1'
    },
    { 
      id: 'small', 
      label: 'Small Team', 
      description: 'You lead a tight-knit team of 1-4 creatives',
      value: '5'
    },
    { 
      id: 'growing', 
      label: 'Growing Team', 
      description: 'You\'ve got a dedicated team of 5+ content professionals',
      value: '15'
    }
  ];
  
  const implementationOptions = [
    { 
      id: 'self', 
      label: 'Self Driven', 
      description: 'I\'d prefer to take the course at my own pace.',
      value: 'self_directed'
    },
    { 
      id: 'guided', 
      label: 'Coaching & Support', 
      description: 'I\'d like guidance and coaching, but want to implement myself.',
      value: 'guided'
    },
    { 
      id: 'full', 
      label: 'Full Support', 
      description: 'I want dedicated experts to implement it all for me.',
      value: 'full_service'
    }
  ];
  
  const timelineOptions = [
    { 
      id: 'immediate', 
      label: 'ASAP Growth', 
      description: 'I\'m ready to implement now and want results immediately.',
      value: 'immediate'
    },
    { 
      id: 'next_quarter', 
      label: 'Next 90 Days', 
      description: 'I need some time to warm up, planning for the next 1-3 months.',
      value: 'next_quarter'
    },
    { 
      id: 'exploratory', 
      label: 'Strategic Planning', 
      description: 'I want a roadmap to help implement it some time this year.',
      value: 'exploratory'
    }
  ];
  
  const contentVolumeOptions = [
    { 
      id: 'low', 
      label: 'High Impact Focus', 
      description: 'I want a small-scale strategy to maximize ROI and conversions.',
      value: 'low'
    },
    { 
      id: 'medium', 
      label: 'Consistent Growth', 
      description: 'I want a content system putting out 10-30 pieces a month.',
      value: 'medium'
    },
    { 
      id: 'high', 
      label: 'Full Scale Engine', 
      description: 'I want a comprehensive efficient content system to scale across platforms.',
      value: 'high'
    }
  ];
  
  return (
    <>
      {/* Test mode controls */}
      {testMode && (
        <div className="fixed top-4 right-4 z-[60] flex items-center gap-2 bg-white dark:bg-[#0a0a0a] p-2 rounded-md shadow-md">
          <span className="text-xs font-medium">Test Controls:</span>
          <button
            onClick={toggleTheme}
            className="h-7 w-7 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center"
            aria-label="Toggle theme"
          >
            <Sun className="h-3.5 w-3.5 hidden dark:inline-block" />
            <Moon className="h-3.5 w-3.5 inline-block dark:hidden" />
          </button>
          <span className="text-xs">{stage}</span>
        </div>
      )}
      
      {/* Main Modal Component */}
      <ModalContainer
        isOpen={isOpen}
        onClose={onClose}
        stage={stage}
        showProgressBar={stage !== 'intro' && stage !== 'recommendation'}
        progress={getProgress()}
        stageIcon={<StageIcon stage={stage} size={20} />}
        stageTitle={getStageTitle()}
      >
        {/* Intro Stage */}
        {stage === 'intro' && (
          <IntroStage
            onNext={goToNextStage}
            onClose={onClose}
          />
        )}
        
        {/* Team Size Stage */}
        {stage === 'teamSize' && (
          <QuestionStage 
            title="Your Team Structure"
            description="We'll tailor our system to match your team's specific structure and size."
            icon={<Users size={32} className="text-theme-primary" />}
            gradientClass="bg-vs-gradient-primary-accent"
            options={teamSizeOptions}
            selectedValue={answers.teamSize}
            onSelect={(value) => handleAnswerChange('teamSize', value)}
            isAnimating={isAnimatingSelection}
            selectedChoice={selectedChoice}
          />
        )}
        
        {/* Implementation Support Stage */}
        {stage === 'implementationSupport' && (
          <QuestionStage 
            title="How do you best learn new systems?"
            description="We'll match you with the right level of support."
            icon={<Briefcase size={32} className="text-theme-primary" />}
            gradientClass="bg-vs-gradient-teal"
            options={implementationOptions}
            selectedValue={answers.implementationSupport}
            onSelect={(value) => handleAnswerChange('implementationSupport', value)}
            isAnimating={isAnimatingSelection}
            selectedChoice={selectedChoice}
          />
        )}
        
        {/* Timeline Stage */}
        {stage === 'timeline' && (
          <QuestionStage 
            title="When do you want to see results?"
            description="We'll adjust the timeline to match your goals."
            icon={<Clock size={32} className="text-theme-primary" />}
            gradientClass="bg-vs-gradient-coral-orange"
            options={timelineOptions}
            selectedValue={answers.timeline}
            onSelect={(value) => handleAnswerChange('timeline', value)}
            isAnimating={isAnimatingSelection}
            selectedChoice={selectedChoice}
          />
        )}
        
        {/* Content Volume Stage */}
        {stage === 'contentVolume' && (
          <QuestionStage 
            title="What's your content vision?"
            description="We'll adjust the framework to fit your content growth goals."
            icon={<BarChart4 size={32} className="text-theme-primary" />}
            gradientClass="bg-vs-gradient-orange"
            options={contentVolumeOptions}
            selectedValue={answers.contentVolume}
            onSelect={(value) => handleAnswerChange('contentVolume', value)}
            isAnimating={isAnimatingSelection}
            selectedChoice={selectedChoice}
          />
        )}
        
        {/* Contact Stage */}
        {stage === 'contact' && (
          <ContactStage
            answers={answers}
            errors={errors}
            onChange={handleAnswerChange}
            onNext={goToNextStage}
            onBack={goToPreviousStage}
            canProceed={canProceed()}
          />
        )}
        
        {/* Analysis Animation Stage */}
        {stage === 'analysis' && (
          <AnalysisAnimation 
            onComplete={handleAnalysisAnimationComplete} 
          />
        )}
        
        {/* Analysis Breakdown Stage */}
        {stage === 'breakdown' && analysisData && (
          <AnalysisBreakdown 
            answers={answers}
            score={analysisData.score}
            onContinue={handleBreakdownComplete}
          />
        )}
        
        {/* Recommendation Stage - Different layouts based on recommendation type */}
        {stage === 'recommendation' && recommendation && (
          recommendation.type === 'foundation' ? (
            <FoundationRecommendation
              recommendation={recommendation}
              onUpgradeSelect={() => window.open('https://your-sales-page.com/executive', '_blank')}
              onPurchase={() => alert('Starting Foundation Program checkout process')} // Would implement actual checkout in production
              answers={answers}
            />
          ) : (
            <PremiumRecommendation
              recommendation={recommendation}
              showCalendly={recommendation.showCalendly || false}
              onClose={onClose}
              answers={answers}
            />
          )
        )}
        
        {/* Modal Footer - Not shown during analysis stages */}
        {stage !== 'analysis' && stage !== 'breakdown' && stage !== 'recommendation' && (
          <ModalFooter
            stage={stage}
            canProceed={canProceed()}
            handleClose={onClose}
            goToPreviousStage={goToPreviousStage}
            goToNextStage={goToNextStage}
            isFirstStage={stage === 'intro'}
            isLastStage={stage === 'recommendation'}
            nextButtonText={stage === 'contact' ? 'Show My Recommendation' : 'Continue'}
            backButtonText="Back"
            closeButtonText={stage === 'intro' ? 'Maybe later' : 'Close'}
          />
        )}
      </ModalContainer>
    </>
  );
};

export default VSQualificationModal;