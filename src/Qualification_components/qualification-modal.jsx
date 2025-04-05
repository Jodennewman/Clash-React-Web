import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Check, Info, Calendar, CheckCircle } from 'lucide-react';
import { PopupModal } from '@calendly/react-calendly';

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
const VSQualificationModal = ({ isOpen, onClose }) => {
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
  const [recommendation, setRecommendation] = useState(null);
  const [showCalendly, setShowCalendly] = useState(false);
  
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
  
  // Handle user answers
  const handleAnswerChange = (key, value) => {
    setAnswers(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Track interaction for engagement metrics
    setEngagement(prev => ({
      ...prev,
      questionInteractions: prev.questionInteractions + 1
    }));
  };
  
  // Reset modal state when closed
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
    }
  }, [isOpen]);
  
  // Calculate recommendation based on answers and engagement
  const processAnswers = () => {
    // Parse team size to number
    const teamSize = parseInt(answers.teamSize || 0);
    
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
    let recommendationType;
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
    const baseExplanations = {
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
    
    // Save lead data to sessionStorage for potential CRM integration
    const leadData = {
      contact: {
        name: answers.name,
        email: answers.email,
        company: answers.company,
        position: answers.position
      },
      qualification: {
        teamSize: parseInt(answers.teamSize || 0),
        implementationSupport: answers.implementationSupport,
        timeline: answers.timeline,
        contentVolume: answers.contentVolume,
        recommendedApproach: recommendation.type
      },
      engagement: {
        timeSpent: engagement.timeSpent,
        questionInteractions: engagement.questionInteractions,
        focusChanges: engagement.focusChanges
      },
      funnel: {
        qualificationCompleted: true,
        recommendationViewed: true,
        calendlyScheduled: true
      }
    };
    
    // Store in session storage - in real implementation, this could be sent to a CRM
    sessionStorage.setItem('qualificationData', JSON.stringify(leadData));
  };
  
  // Close Calendly popup
  const handleCalendlyClose = () => {
    setShowCalendly(false);
  };
  
  // Proceed to next stage
  const goToNextStage = () => {
    switch (stage) {
      case 'intro':
        setStage('contact');
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
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay backdrop */}
      <div 
        className="absolute inset-0 bg-[var(--theme-bg-primary)]/80 backdrop-blur-md" 
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--theme-border-light)] bg-[var(--theme-bg-surface)] shadow-[var(--theme-shadow-lg)]">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-[var(--theme-border-light)] p-6">
          <h2 className="text-xl font-medium text-[var(--theme-text-primary)]">
            {stage === 'intro' && 'Find Your Implementation Strategy'}
            {stage === 'contact' && 'Your Information'}
            {stage === 'teamSize' && 'Team Structure'}
            {stage === 'implementationSupport' && 'Implementation Support'}
            {stage === 'timeline' && 'Implementation Timeline'}
            {stage === 'contentVolume' && 'Content Production Goals'}
            {stage === 'recommendation' && 'Your Personalized Recommendation'}
          </h2>
          
          <button 
            onClick={onClose}
            className="rounded-full p-2 text-[var(--theme-text-secondary)] hover:bg-[var(--theme-bg-secondary)] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Progress bar - only show during questions */}
        {stage !== 'intro' && stage !== 'recommendation' && (
          <div className="w-full h-1 bg-[var(--theme-bg-secondary)]">
            <div 
              className="h-full bg-[var(--theme-primary)]"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        )}
        
        {/* Modal content - changes based on current stage */}
        <div className="p-6">
          {/* Introduction Stage */}
          {stage === 'intro' && (
            <div className="space-y-4">
              <p className="text-[var(--theme-text-primary)]">
                Answer a few questions to receive a personalized implementation strategy for your content production needs. This helps us understand your specific situation and recommend the right approach.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-[var(--theme-bg-primary)] rounded-lg p-4 border border-[var(--theme-border-light)]">
                  <h3 className="text-lg font-medium text-[var(--theme-text-primary)] mb-2">
                    You'll discover:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[var(--theme-primary)] shrink-0 mt-0.5" />
                      <span className="text-[var(--theme-text-secondary)]">Your ideal implementation approach</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[var(--theme-primary)] shrink-0 mt-0.5" />
                      <span className="text-[var(--theme-text-secondary)]">Personalized strategy recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[var(--theme-primary)] shrink-0 mt-0.5" />
                      <span className="text-[var(--theme-text-secondary)]">Support level that matches your needs</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[var(--theme-bg-primary)] rounded-lg p-4 border border-[var(--theme-border-light)]">
                  <h3 className="text-lg font-medium text-[var(--theme-text-primary)] mb-2">
                    Quick process:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex items-center justify-center h-5 w-5 rounded-full bg-[var(--theme-primary)] text-white text-xs shrink-0 mt-0.5">1</div>
                      <span className="text-[var(--theme-text-secondary)]">Answer a few strategic questions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex items-center justify-center h-5 w-5 rounded-full bg-[var(--theme-primary)] text-white text-xs shrink-0 mt-0.5">2</div>
                      <span className="text-[var(--theme-text-secondary)]">Get your personalized recommendation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex items-center justify-center h-5 w-5 rounded-full bg-[var(--theme-primary)] text-white text-xs shrink-0 mt-0.5">3</div>
                      <span className="text-[var(--theme-text-secondary)]">Book a call with the right specialist</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Contact Information Stage */}
          {stage === 'contact' && (
            <div className="space-y-4">
              <p className="text-[var(--theme-text-secondary)] mb-4">
                Let's start with some basic information about you and your company.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--theme-text-primary)] mb-1">
                    Your Name*
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={answers.name}
                    onChange={(e) => handleAnswerChange('name', e.target.value)}
                    className="w-full rounded-lg border border-[var(--theme-border-light)] bg-[var(--theme-bg-surface)] px-3 py-2 text-[var(--theme-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:border-transparent"
                    placeholder="Full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--theme-text-primary)] mb-1">
                    Email Address*
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={answers.email}
                    onChange={(e) => handleAnswerChange('email', e.target.value)}
                    className="w-full rounded-lg border border-[var(--theme-border-light)] bg-[var(--theme-bg-surface)] px-3 py-2 text-[var(--theme-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:border-transparent"
                    placeholder="you@company.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-[var(--theme-text-primary)] mb-1">
                    Company Name*
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={answers.company}
                    onChange={(e) => handleAnswerChange('company', e.target.value)}
                    className="w-full rounded-lg border border-[var(--theme-border-light)] bg-[var(--theme-bg-surface)] px-3 py-2 text-[var(--theme-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:border-transparent"
                    placeholder="Company name"
                  />
                </div>
                
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-[var(--theme-text-primary)] mb-1">
                    Your Position
                  </label>
                  <input
                    id="position"
                    type="text"
                    value={answers.position}
                    onChange={(e) => handleAnswerChange('position', e.target.value)}
                    className="w-full rounded-lg border border-[var(--theme-border-light)] bg-[var(--theme-bg-surface)] px-3 py-2 text-[var(--theme-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:border-transparent"
                    placeholder="Job title"
                  />
                </div>
              </div>
              
              <p className="text-[var(--theme-text-tertiary)] text-sm mt-4">
                *Required fields
              </p>
            </div>
          )}
          
          {/* Team Size Stage */}
          {stage === 'teamSize' && (
            <div className="space-y-4">
              <p className="text-[var(--theme-text-secondary)] mb-6">
                How would you describe your content team structure?
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleAnswerChange('teamSize', '1')}
                  className={`w-full flex items-center p-4 rounded-lg border transition-all hover:border-[var(--theme-primary)] ${
                    answers.teamSize === '1' 
                      ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10' 
                      : 'border-[var(--theme-border-light)] bg-[var(--theme-bg-surface)]'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-[var(--theme-text-primary)] font-medium">Solo Creator or Founder</h3>
                    <p className="text-[var(--theme-text-secondary)] text-sm">You handle most content creation yourself or with 1-2 freelancers</p>
                  </div>
                  {answers.teamSize === '1' && (
                    <CheckCircle className="h-5 w-5 text-[var(--theme-primary)]" />
                  )}
                </button>
                
                <button
                  onClick={() => handleAnswerChange('teamSize', '5')}
                  className={`w-full flex items-center p-4 rounded-lg border transition-all hover:border-[var(--theme-primary)] ${
                    answers.teamSize === '5' 
                      ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10' 
                      : 'border-[var(--theme-border-light)] bg-[var(--theme-bg-surface)]'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-[var(--theme-text-primary)] font-medium">Small Team</h3>
                    <p className="text-[var(--theme-text-secondary)] text-sm">You have a small in-house team (2-9 people) producing content</p>
                  </div>
                  {answers.teamSize === '5' && (
                    <CheckCircle className="h-5 w-5 text-[var(--theme-primary)]" />
                  )}
                </button>
                
                <button
                  onClick={() => handleAnswerChange('teamSize', '15')}
                  className={`w-full flex items-center p-4 rounded-lg border transition-all hover:border-[var(--theme-primary)] ${
                    answers.teamSize === '15' 
                      ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10' 
                      : 'border-[var(--theme-border-light)] bg-[var(--theme-bg-surface)]'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-[var(--theme-text-primary)] font-medium">Mid-Size Team</h3>
                    <p className="text-[var(--theme-text-secondary)] text-sm">Your content team consists of 10-19 people across various roles</p>
                  </div>
                  {answers.teamSize === '15' && (
                    <CheckCircle className="h-5 w-5 text-[var(--theme-primary)]" />
                  )}
                </button>
                
                <button
                  onClick={() => handleAnswerChange('teamSize', '25')}
                  className={`w-full flex items-center p-4 rounded-lg border transition-all hover:border-[var(--theme-primary)] ${
                    answers.teamSize === '25' 
                      ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10' 
                      : 'border-[var(--theme-border-light)] bg-[var(--theme-bg-surface)]'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-[var(--theme-text-primary)] font-medium">Large Organization</h3>
                    <p className="text-[var(--theme-text-secondary)] text-sm">You have 20+ people involved in content production or multiple teams</p>
                  </div>
                  {answers.teamSize === '25' && (
                    <CheckCircle className="h-5 w-5 text-[var(--theme-primary)]" />
                  )}
                </button>
              </div>
            </div>
          )}
          
          {/* Implementation Support Stage */}
          {stage === 'implementationSupport' && (
            <div className="space-y-4">
              <p className="text-[var(--theme-text-secondary)] mb-6">
                What level of implementation support would best serve your team?
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleAnswerChange('implementationSupport', 'self_directed')}
                  className={`w-full flex items-center p-4 rounded-lg border transition-all hover:border-[var(--theme-primary)] ${
                    answers.implementationSupport === 'self_directed' 
                      ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10' 
                      : 'border-[var(--theme-border-light)] bg-[var(--theme-bg-surface)]'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-[var(--theme-text-primary)] font-medium">Self-Directed Implementation</h3>
                    <p className="text-[var(--theme-text-secondary)] text-sm">You prefer to implement systems yourself with documentation and resources</p>
                  </div>
                  {answers.implementationSupport === 'self_directed' && (
                    <CheckCircle className="h-5 w-5 text-[var(--theme-primary)]" />
                  )}
                </button>
                
                <button
                  onClick={() => handleAnswerChange('implementationSupport', 'guided')}
                  className={`w-full flex items-center p-4 rounded-lg border transition-all hover:border-[var(--theme-primary)] ${
                    answers.implementationSupport === 'guided' 
                      ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10' 
                      : 'border-[var(--theme-border-light)] bg-[var(--theme-bg-surface)]'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-[var(--theme-text-primary)] font-medium">Guided Implementation</h3>
                    <p className="text-[var(--theme-text-secondary)] text-sm">You want regular coaching and guidance while your team implements</p>
                  </div>
                  {answers.implementationSupport === 'guided' && (
                    <CheckCircle className="h-5 w-5 text-[var(--theme-primary)]" />
                  )}
                </button>
                
                <button
                  onClick={() => handleAnswerChange('implementationSupport', 'full_service')}
                  className={`w-full flex items-center p-4 rounded-lg border transition-all hover:border-[var(--theme-primary)] ${
                    answers.implementationSupport === 'full_service' 
                      ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10' 
                      : 'border-[var(--theme-border-light)] bg-[var(--theme-bg-surface)]'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-[var(--theme-text-primary)] font-medium">Full-Service Implementation</h3>
                    <p className="text-[var(--theme-text-secondary)] text-sm">You want dedicated support and done-for-you implementation assistance</p>
                  </div>
                  {answers.implementationSupport === 'full_service' && (
                    <CheckCircle className="h-5 w-5 text-[var(--theme-primary)]" />
                  )}
                </button>
              </div>
            </div>
          )}
          
          {/* Timeline Stage */}
          {stage === 'timeline' && (
            <div className="space-y-4">
              <p className="text-[var(--theme-text-secondary)] mb-6">
                When are you looking to implement these new content systems?
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleAnswerChange('timeline', 'immediate')}
                  className={`w-full flex items-center p-4 rounded-lg border transition-all hover:border-[var(--theme-primary)] ${
                    answers.timeline === 'immediate' 
                      ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10' 
                      : 'border-[var(--theme-border-light)] bg-[var(--theme-bg-surface)]'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-[var(--theme-text-primary)] font-medium">Immediate (0-4 weeks)</h3>
                    <p className="text-[var(--theme-text-secondary)] text-sm">You're ready to begin implementation immediately</p>
                  </div>
                  {answers.timeline === 'immediate' && (
                    <CheckCircle className="h-5 w-5 text-[var(--theme-primary)]" />
                  )}
                </button>
                
                <button
                  onClick={() => handleAnswerChange('timeline', 'next_quarter')}
                  className={`w-full flex items-center p-4 rounded-lg border transition