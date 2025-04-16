import React, { useState, useEffect } from 'react';
import { 
  Users, Compass, Clock, BarChart4, Mail, Award, Briefcase, CheckCircle, ArrowRight, Check
} from 'lucide-react';

import {
  ModalFooter,
  StageIcon
} from './modal-components';
import TiaIntroStage from './tia-intro-stage';
import TiaQuestionStage from './tia-question-stage';
import TiaTeamSizeStage from './tia-team-size-stage';
import TiaLearningStyleStage from './tia-learning-style-stage';
import TiaTimelineStage from './tia-timeline-stage';
import TiaContentVisionStage from './tia-content-vision-stage';
import TiaContactStage from './tia-contact-stage';
import TiaLoadingAnimation from './tia-loading-animation';
import TiaRecommendationStage from './tia-recommendation-stage';
import TiaModalContainer from './tia-modal-container';

// This is a new structure for the recommendations based on the improvement plan
interface Recommendation {
  type: 'foundation' | 'comprehensive' | 'executive';
  title: string;
  tagline: string;
  pricing: string;
  description: string[];
  benefits: string[];
  optionalExtras: {
    name: string;
    price: string;
  }[];
  testimonial: string;
  ctaText: string;
  ctaAction: 'direct_purchase' | 'book_session';
}

interface SelectedExtras {
  [key: string]: boolean;
}

interface VSQualificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Optional testing mode flag that shows debug info, defaults to false */
  testMode?: boolean; 
}

/**
 * VSQualificationModal - A simplified, theme-aware qualification journey component
 * 
 * This component implements a streamlined qualification process that:
 * 1. Collects key information through strategic questions
 * 2. Maps responses to the appropriate implementation approach
 * 3. Provides a personalized recommendation with dynamic response inclusion
 * 4. Offers clear next steps via direct purchase or Calendly booking
 */
const TiaQualificationModal: React.FC<VSQualificationModalProps> = ({ 
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
    contentVolume: '',
    mailingList: false
  });
  
  // Define the sequence of stages - simplified flow with loading animation
  const stageSequence = ['intro', 'teamSize', 'implementationSupport', 'timeline', 'contentVolume', 'contact', 'loading', 'recommendation'];
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    company: ''
  });
  
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<SelectedExtras>({});
  
  // These were used for animation during auto-advance, now just for visual feedback
  // We keep them to maintain the hover state on selected choices
  const [isAnimatingSelection, setIsAnimatingSelection] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  
  // Tracking modal engagement for analytics and scoring
  const [engagement, setEngagement] = useState({
    timeSpent: 0,
    questionInteractions: 0
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

  // Handle user answers with validation only (removed auto-advance)
  const handleAnswerChange = (key: string, value: string | boolean) => {
    // For mailingList specifically handle boolean
    if (key === 'mailingList') {
      setAnswers(prev => ({
        ...prev,
        mailingList: value as boolean
      }));
      return;
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
  
  // Save progress and implement abandoned journey recovery (same as original)
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
          contentVolume: '',
          mailingList: false
        });
        setRecommendation(null);
        setSelectedExtras({});
        setEngagement({
          timeSpent: 0,
          questionInteractions: 0
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
  
  // Handle saved progress (same as original)
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
  
  // Calendly script loading (same as original)
  useEffect(() => {
    // Load Calendly script when needed
    if (stage === 'recommendation' && recommendation?.ctaAction === 'book_session') {
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
  
  // Get readable format of user's response for insertion into recommendation
  const getReadableResponse = (key: string, value: string): string => {
    switch (key) {
      case 'teamSize':
        if (value === '1') return "Solo Creator with occasional freelance help";
        if (value === '5') return "Small Team of 1-4 creatives";
        if (value === '15') return "Growing Team of 5+ content professionals";
        return "";
        
      case 'implementationSupport':
        if (value === 'self_directed') return "Self-paced learning approach";
        if (value === 'guided') return "Guided implementation with coaching";
        if (value === 'full_service') return "Full implementation support";
        return "";
        
      case 'timeline':
        if (value === 'immediate') return "Immediate implementation and results";
        if (value === 'next_quarter') return "Implementation within the next 90 days";
        if (value === 'exploratory') return "Strategic implementation planning";
        return "";
        
      case 'contentVolume':
        if (value === 'low') return "High-impact focused content strategy";
        if (value === 'medium') return "Consistent content production (10-30 pieces/month)";
        if (value === 'high') return "Full-scale content system across platforms";
        return "";
        
      default:
        return "";
    }
  };
  
  // Calculate recommendation based on answers and engagement - updated logic
  const processAnswers = () => {
    console.log("Processing answers to generate recommendation");
    
    // Parse team size to number
    const teamSize = parseInt(answers.teamSize || '0');
    
    // Initialize score
    let score = 0;
    
    // 1. Team size factor (1-3 points)
    if (teamSize >= 15) score += 3;
    else if (teamSize >= 5) score += 2;
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
    const isHighlyEngaged = engagement.timeSpent > 90 && engagement.questionInteractions > 8;
    if (isHighlyEngaged) score += 1;
    
    console.log(`Generated score: ${score}`);
    
    // Generate dynamic user responses for personalization
    const dynamicResponses = {
      teamSize: getReadableResponse('teamSize', answers.teamSize),
      implementationSupport: getReadableResponse('implementationSupport', answers.implementationSupport),
      timeline: getReadableResponse('timeline', answers.timeline),
      contentVolume: getReadableResponse('contentVolume', answers.contentVolume)
    };
    
    // Determine recommendation based on score (1-11 points possible)
    // Updated to match the three distinct recommendation tiers from the plan
    let recommendationData: Recommendation;
    
    if (score >= 8) {
      // Executive Partnership
      recommendationData = {
        type: 'executive',
        title: 'The Executive Partnership',
        tagline: 'Premium implementation. Full scale. No stress.',
        pricing: 'Starting from £9,500',
        description: [
          "You're not playing around. Your business is moving fast, your team needs results, and content is a growth lever — not a side project. You just don't have the time.",
          "This is where we step in and build it with you.",
          "Custom strategy. Full system setup. Ongoing support.",
          "Our experts will train up your team to make short-form your biggest growth channel."
        ],
        benefits: [
          "Everything included in the Comprehensive Course PLUS:",
          "A dedicated implementation manager",
          "Custom strategy development",
          "Done-with-you system install",
          "6 months of premium support",
          "Private team onboarding + training"
        ],
        optionalExtras: [
          {
            name: 'Extended Support (3 more months)',
            price: '£1,800'
          }
        ],
        testimonial: "We'll build it. You focus on growth.",
        ctaText: 'Book your executive strategy session',
        ctaAction: 'book_session'
      };
    } else if (score >= 5) {
      // Comprehensive Implementation
      recommendationData = {
        type: 'comprehensive',
        title: 'The Comprehensive Implementation',
        tagline: 'Complete support, zero guesswork',
        pricing: '£5,500 one time payment',
        description: [
          "You're growing fast — and it's time your content systems did too.",
          "This isn't another course or set of templates. It's live support, 1:1 strategy, and a full plug-and-play content engine that actually fits your business.",
          "We'll give you the frameworks, the guidance, and the knowledge to back it up.",
          "You bring the momentum. We'll build the machine."
        ],
        benefits: [
          "Two 1:1 strategy sessions",
          "Weekly Group coaching + support",
          "Full course, template + system access",
          "3-month implementation support",
          "Access to private founder community"
        ],
        optionalExtras: [
          {
            name: 'Additional coaching sessions',
            price: '£850'
          },
          {
            name: 'Content Audit + Strategy',
            price: '£950'
          },
          {
            name: 'Upgrade to Executive',
            price: '£4,000+'
          }
        ],
        testimonial: "Scaling without support = burnout. Don't do it to yourself.",
        ctaText: 'Book your first strategy session',
        ctaAction: 'book_session'
      };
    } else {
      // Foundation Implementation
      recommendationData = {
        type: 'foundation',
        title: 'The Foundation Implementation',
        tagline: 'Build your content foundation',
        pricing: '£1,950 one-time payment',
        description: [
          "You're not quite ready to start right away — but you're not messing around.",
          "The Foundation Implementation is a lean, self-paced option for solo founders or small teams who want clarity, templates, and a proper system to launch with confidence (not confusion).",
          "You don't need hand-holding. You need a jumpstart.",
          "The Foundation Implementation is exactly that."
        ],
        benefits: [
          "Lifetime access to our foundation tiers",
          "Our most essential content templates",
          "Credit towards upgrading later"
        ],
        optionalExtras: [
          {
            name: '1:1 Coaching Session',
            price: '£850'
          },
          {
            name: 'Content Audit + Strategy',
            price: '£950'
          },
          {
            name: 'Upgrade to Comprehensive',
            price: '£3,550'
          }
        ],
        testimonial: "Not quite sure? Most of our top clients started here. Then scaled like hell.",
        ctaText: 'Start Instantly',
        ctaAction: 'direct_purchase'
      };
    }
    
    console.log(`Generated recommendation type: ${recommendationData.type}`);
    
    // Track the recommendation event
    trackEvent('recommendation_generated', {
      recommendationType: recommendationData.type,
      score: score,
      timeSpent: engagement.timeSpent,
      totalInteractions: engagement.questionInteractions
    });
    
    // Set recommendation state
    setRecommendation(recommendationData);
    
    // Process CRM integration
    processCrmIntegration(recommendationData, score, dynamicResponses);
  };
  
  // Process CRM integration for lead data
  const processCrmIntegration = async (
    recommendation: Recommendation, 
    score: number,
    dynamicResponses: {
      teamSize: string;
      implementationSupport: string;
      timeline: string;
      contentVolume: string;
    }
  ) => {
    // Build comprehensive lead data for CRM integration
    const leadData = {
      contact: {
        name: answers.name,
        email: answers.email,
        company: answers.company,
        position: answers.position,
        mailingList: answers.mailingList
      },
      qualification: {
        teamSize: parseInt(answers.teamSize || '0'),
        implementationSupport: answers.implementationSupport,
        timeline: answers.timeline,
        contentVolume: answers.contentVolume,
        recommendedApproach: recommendation.type,
        score: score
      },
      engagement: {
        timeSpent: engagement.timeSpent,
        questionInteractions: engagement.questionInteractions
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
      },
      dynamicResponses
    };
    
    // Store in session storage for CRM integration
    sessionStorage.setItem('qualificationData', JSON.stringify(leadData));
    
    // Track the data storage event
    trackEvent('qualification_data_saved', {
      recommendation: recommendation.type,
      score: score,
      journeyDuration: engagement.timeSpent,
      totalInteractions: engagement.questionInteractions
    });
    
    // The actual API integration would be implemented here
    // For now, this is just a placeholder
    try {
      console.log('[CRM Integration] Data prepared for sending', leadData);
      // Actual API call would go here
    } catch (error) {
      console.error('[CRM Integration] Error preparing data:', error);
    }
  };
  
  // Toggle selection of optional extras
  const toggleExtraSelection = (extraName: string) => {
    setSelectedExtras(prev => ({
      ...prev,
      [extraName]: !prev[extraName]
    }));
  };
  
  // Handle CTA actions
  const handleCTAAction = () => {
    if (!recommendation) return;
    
    if (recommendation.ctaAction === 'direct_purchase') {
      // Direct purchase flow
      trackEvent('foundation_purchase_initiated', {
        recommendationType: recommendation.type,
        selectedExtras: Object.keys(selectedExtras).filter(key => selectedExtras[key])
      });
      
      // In production this would redirect to checkout
      alert('Starting checkout process for Foundation Implementation');
    } else {
      // Booking flow through Calendly
      trackEvent('strategy_session_booking_initiated', {
        recommendationType: recommendation.type,
        selectedExtras: Object.keys(selectedExtras).filter(key => selectedExtras[key])
      });
      
      // Calendly is loaded and handled through the UI directly
    }
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
        setStage('loading'); // Show loading animation first
        break;
      case 'loading':
        // This will be handled by the loading animation's onComplete
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
      case 'intro': return 'Billions of Views. Built for You.';
      case 'teamSize': return 'How Big is your Content Team?';
      case 'implementationSupport': return 'How do you prefer to learn new systems?';
      case 'timeline': return 'When do you want to see results?';
      case 'contentVolume': return 'What\'s your content growth goal?';
      case 'contact': return 'Tell us a bit about yourself';
      case 'loading': return 'Analyzing your responses';
      case 'recommendation': return 'Your Personalised Plan';
      default: return 'Find Your Perfect Path';
    }
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
      case 'loading':
        return false; // Loading stage has no manual proceed button
      default:
        return true;
    }
  };
  
  // Determine current progress percentage
  const getProgress = () => {
    // Only count the active question stages for progress calculation
    const currentIndex = stageSequence.indexOf(stage);
    // For intro stage, show 0 progress
    if (stage === 'intro') return 0;
    // For recommendation stage, show 100% progress
    if (stage === 'recommendation') return 100;
    // For loading stage, show 100% progress as we're going to recommendation
    if (stage === 'loading') return 100;
    
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
  
  // Define question stage options - updated with new copy
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
      description: 'You lead a tight-knit team of 1-4 creatives, maybe a writer, an editor and/or an all-rounder',
      value: '5'
    },
    { 
      id: 'growing', 
      label: 'Growing Team', 
      description: 'You\'ve got a dedicated team of 5+ researchers, writers, producers, editors, strategists, and videographers',
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
      description: 'I\'d like guidance and coaching, but want to take the lead on implementing it myself.',
      value: 'guided'
    },
    { 
      id: 'full', 
      label: 'Help', 
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
      description: 'I need some time to warm up, and would like to implement in the next 1-3 months.',
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
      description: 'I want a small-scale strategy to maximise ROI and conversions.',
      value: 'low'
    },
    { 
      id: 'medium', 
      label: 'Consistent Growth', 
      description: 'I want an content system putting out 10-30 pieces a month.',
      value: 'medium'
    },
    { 
      id: 'high', 
      label: 'Full Scale Engine', 
      description: 'I want a comprehensive efficient content system to scale across multiple platforms.',
      value: 'high'
    }
  ];

  // Removed custom recommendation component as we now use TiaRecommendationStage
  
  return (
    <>
      {/* Main Modal Component */}
      <TiaModalContainer
        isOpen={isOpen}
        onClose={onClose}
        stage={stage}
        showProgressBar={stage !== 'intro' && stage !== 'recommendation'}
        progress={getProgress()}
        stageIcon={<StageIcon stage={stage} size={20} />}
        stageTitle={getStageTitle()}
      >
        {/* Intro Stage - Updated with new copy */}
        {stage === 'intro' && (
          <TiaIntroStage
            onNext={goToNextStage}
            onClose={onClose}
            headline="Build your Perfect Content System"
            subheading=""
            processLabel="The Process"
            processNote="(don't worry it takes less than 60 seconds)"
            processSteps={["Quiz Assessment", "Your Personalised Solution", "Start Growing"]}
            customFeature="We'll tailor our 1 Billion view system to match your team size, implementation preference, vision and growth timeline"
            disclaimerText="No obligation | Personalised to your specific needs"
            primaryButtonText="Get my personalised plan"
            secondaryButtonText="Maybe later"
          />
        )}
        
        {/* Team Size Stage - Using specialized component that matches intro format */}
        {stage === 'teamSize' && (
          <TiaTeamSizeStage 
            options={teamSizeOptions}
            selectedValue={answers.teamSize}
            onSelect={(value) => handleAnswerChange('teamSize', value)}
            isAnimating={isAnimatingSelection}
            selectedChoice={selectedChoice}
          />
        )}
        
        {/* Implementation Support Stage - Using specialized component that matches team size format */}
        {stage === 'implementationSupport' && (
          <TiaLearningStyleStage 
            options={implementationOptions}
            selectedValue={answers.implementationSupport}
            onSelect={(value) => handleAnswerChange('implementationSupport', value)}
            isAnimating={isAnimatingSelection}
            selectedChoice={selectedChoice}
          />
        )}
        
        {/* Timeline Stage - Using specialized component that matches team size format */}
        {stage === 'timeline' && (
          <TiaTimelineStage 
            options={timelineOptions}
            selectedValue={answers.timeline}
            onSelect={(value) => handleAnswerChange('timeline', value)}
            isAnimating={isAnimatingSelection}
            selectedChoice={selectedChoice}
          />
        )}
        
        {/* Content Volume Stage - Using specialized component that matches team size format */}
        {stage === 'contentVolume' && (
          <TiaContentVisionStage 
            options={contentVolumeOptions}
            selectedValue={answers.contentVolume}
            onSelect={(value) => handleAnswerChange('contentVolume', value)}
            isAnimating={isAnimatingSelection}
            selectedChoice={selectedChoice}
          />
        )}
        
        {/* Contact Stage - Updated with Tia component */}
        {stage === 'contact' && (
          <TiaContactStage
            title=""
            formTitle="Your Information"
            supportingText="We're almost there! Just a few details to personalize your recommendation."
            answers={answers}
            errors={errors}
            mailingList={answers.mailingList as boolean}
            onMailingListChange={(checked) => handleAnswerChange('mailingList', checked)}
            onChange={handleAnswerChange}
          />
        )}
        
        {/* Loading Animation Stage */}
        {stage === 'loading' && (
          <TiaLoadingAnimation
            message="Finding your unique implementation"
            duration={6} // Reduced to 6 seconds for the new animation
            onComplete={() => {
              console.log("Animation completed after exactly 6 seconds");
              // Calculate recommendation synchronously
              processAnswers();
              // Immediately transition to recommendation stage
              setStage('recommendation');
            }}
          />
        )}
        
        {/* Recommendation Stage */}
        {stage === 'recommendation' && recommendation && (
          <TiaRecommendationStage
            title="Your Personalised Plan"
            recommendationTitle={recommendation.title}
            tagline={recommendation.tagline}
            price={recommendation.pricing}
            description={recommendation.description}
            supportingText="The perfect solution tailored to your specific needs"
            responses={{
              teamSize: getReadableResponse('teamSize', answers.teamSize),
              implementationSupport: getReadableResponse('implementationSupport', answers.implementationSupport),
              timeline: getReadableResponse('timeline', answers.timeline),
              contentVolume: getReadableResponse('contentVolume', answers.contentVolume)
            }}
            responseKeys={['teamSize', 'implementationSupport', 'timeline', 'contentVolume']}
            benefits={recommendation.benefits}
            extras={recommendation.optionalExtras}
            testimonial={recommendation.testimonial}
            ctaText={recommendation.ctaText}
            ctaAction={recommendation.ctaAction}
            onCTA={handleCTAAction}
          />
        )}
        
        {/* Modal Footer - Not shown during recommendation or loading stages */}
        {stage !== 'recommendation' && stage !== 'loading' && (
          <ModalFooter
            stage={stage}
            canProceed={canProceed()}
            handleClose={onClose}
            goToPreviousStage={goToPreviousStage}
            goToNextStage={goToNextStage}
            isFirstStage={stage === 'intro'}
            isLastStage={stage === 'recommendation'}
            nextButtonText={
              stage === 'contact' 
                ? 'Show my recommendation' 
                : stage === 'intro'
                  ? 'Start Quiz'
                  : 'Continue'
            }
            backButtonText="Back"
            closeButtonText={stage === 'intro' ? 'Maybe later' : 'Close'}
          />
        )}
      </TiaModalContainer>
    </>
  );
};

export default TiaQualificationModal;