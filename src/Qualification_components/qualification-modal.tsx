import React, { useState, useEffect, useRef } from 'react';
import { 
  X, ChevronRight, Check, Info, Calendar, CheckCircle, Moon, Sun,
  Users, Compass, Clock, BarChart4, Mail, Award, Briefcase
} from 'lucide-react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Stage icon component to render the appropriate icon for each stage
interface StageIconProps {
  stage: string;
  className?: string;
  size?: number;
}

const StageIcon: React.FC<StageIconProps> = ({ stage, className = '', size = 24 }) => {
  switch (stage) {
    case 'intro':
      return <Compass className={className} size={size} />;
    case 'teamSize':
      return <Users className={className} size={size} />;
    case 'implementationSupport':
      return <Briefcase className={className} size={size} />;
    case 'timeline':
      return <Clock className={className} size={size} />;
    case 'contentVolume':
      return <BarChart4 className={className} size={size} />;
    case 'contact':
      return <Mail className={className} size={size} />;
    case 'analysis':
      return <BarChart4 className={className} size={size} />;
    case 'breakdown':
      return <CheckCircle className={className} size={size} />;
    case 'recommendation':
      return <Award className={className} size={size} />;
    default:
      return <Info className={className} size={size} />;
  }
};

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
// Analysis Animation Component
const AnalysisAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const animationRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    let timeout: NodeJS.Timeout;
    
    // GSAP animation sequence
    if (animationRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            timeout = setTimeout(onComplete, 500);
          }
        });
        
        // Animation for analysis steps
        tl.from(".analysis-step", {
          y: 20,
          opacity: 0,
          stagger: 0.5,
          duration: 0.4
        });
        
        // Progress bar animation
        tl.to(".progress-bar", {
          width: "100%",
          duration: 4,
          ease: "power1.inOut"
        }, 0);
        
        // Particle/dot animations
        const createParticles = () => {
          for (let i = 0; i < 20; i++) {
            const dot = document.createElement("div");
            dot.className = "absolute w-1.5 h-1.5 rounded-full bg-theme-primary/60";
            
            // Random position
            dot.style.left = `${gsap.utils.random(10, 90)}%`;
            dot.style.top = `${gsap.utils.random(20, 80)}%`;
            
            animationRef.current?.appendChild(dot);
            
            // Animate dot
            gsap.to(dot, {
              y: gsap.utils.random(-50, 50),
              x: gsap.utils.random(-50, 50),
              opacity: 0,
              scale: gsap.utils.random(0, 0.5),
              duration: gsap.utils.random(1, 2),
              ease: "power2.out",
              onComplete: () => {
                if (dot.parentNode) {
                  dot.parentNode.removeChild(dot);
                }
              }
            });
          }
        };
        
        // Trigger particles multiple times
        const particleInterval = setInterval(createParticles, 600);
        
        return () => {
          clearInterval(particleInterval);
        };
      }, animationRef);
      
      return () => {
        ctx.revert();
        if (timeout) clearTimeout(timeout);
      };
    }
  }, [onComplete]);
  
  return (
    <div className="h-full flex flex-col items-center justify-center relative overflow-hidden" ref={animationRef}>
      <div className="text-center mb-12 z-10">
        <h3 className="text-2xl font-bold text-theme-primary mb-6">Finding Your Perfect Solution</h3>
        
        <div className="space-y-5 mb-8">
          <div className="analysis-step flex items-center opacity-0">
            <Check className="h-5 w-5 text-green-500 mr-3" />
            <span className="text-theme-secondary">Analyzing response patterns</span>
          </div>
          <div className="analysis-step flex items-center opacity-0">
            <Check className="h-5 w-5 text-green-500 mr-3" />
            <span className="text-theme-secondary">Matching implementation frameworks</span>
          </div>
          <div className="analysis-step flex items-center opacity-0">
            <Check className="h-5 w-5 text-green-500 mr-3" />
            <span className="text-theme-secondary">Calculating resource requirements</span>
          </div>
          <div className="analysis-step flex items-center opacity-0">
            <Check className="h-5 w-5 text-green-500 mr-3" />
            <span className="text-theme-secondary">Generating personalized recommendation</span>
          </div>
        </div>
        
        <div className="w-64 h-1.5 bg-theme-bg-surface rounded-full overflow-hidden">
          <div className="progress-bar h-full w-0 bg-theme-primary rounded-full"></div>
        </div>
      </div>
      
      {/* Floating elements for visual interest */}
      <div className="absolute top-10 right-10 -z-0 w-32 h-32 rounded-[40%] rotate-12 opacity-20 bg-theme-primary blur-xl"></div>
      <div className="absolute bottom-10 left-10 -z-0 w-40 h-40 rounded-[30%] -rotate-12 opacity-10 bg-theme-primary blur-xl"></div>
    </div>
  );
};

// Analysis Breakdown Component
const AnalysisBreakdown: React.FC<{ 
  answers: any, 
  score: number, 
  onContinue: () => void 
}> = ({ answers, score, onContinue }) => {
  // Calculate individual scores for visualization
  const teamSizeScore = parseInt(answers.teamSize || '0') >= 20 ? 3 : 
                     parseInt(answers.teamSize || '0') >= 10 ? 2 : 1;
  
  const supportScore = answers.implementationSupport === 'full_service' ? 3 :
                     answers.implementationSupport === 'guided' ? 2 : 1;
                       
  const timelineScore = answers.timeline === 'immediate' ? 2 :
                      answers.timeline === 'next_quarter' ? 1 : 0;
                      
  const volumeScore = answers.contentVolume === 'high' ? 2 :
                    answers.contentVolume === 'medium' ? 1 : 0;
  
  // Calculate percentage scores for visualization
  const percentages = {
    teamSize: (teamSizeScore / 3) * 100,
    support: (supportScore / 3) * 100,
    timeline: (timelineScore / 2) * 100,
    volume: (volumeScore / 2) * 100
  };
  
  return (
    <div className="h-full flex flex-col p-6">
      <h3 className="text-2xl font-bold text-theme-primary mb-4 text-center">Your Implementation Analysis</h3>
      
      <p className="text-theme-secondary text-center mb-6">
        We've analyzed your responses to find the implementation approach that best matches your needs
      </p>
      
      
      {/* Factor breakdown - without showing the actual score */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-theme-primary mb-1">Team Structure</h4>
          <div className="h-4 bg-theme-bg-surface rounded-full overflow-hidden">
            <div 
              className="h-full bg-theme-primary rounded-full"
              style={{ width: `${percentages.teamSize}%` }}
            />
          </div>
          <p className="text-xs text-theme-tertiary">
            {answers.teamSize === '25' ? 'Large organization' :
             answers.teamSize === '15' ? 'Mid-size team' :
             answers.teamSize === '5' ? 'Small team' : 'Solo creator'}
          </p>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-theme-primary mb-1">Implementation Support</h4>
          <div className="h-4 bg-theme-bg-surface rounded-full overflow-hidden">
            <div 
              className="h-full bg-theme-primary rounded-full"
              style={{ width: `${percentages.support}%` }}
            />
          </div>
          <p className="text-xs text-theme-tertiary">
            {answers.implementationSupport === 'full_service' ? 'Hands-on support' :
             answers.implementationSupport === 'guided' ? 'Coaching & support' :
             answers.implementationSupport === 'self_directed' ? 'Self-guided' : 'Flexible approach'}
          </p>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-theme-primary mb-1">Timeline</h4>
          <div className="h-4 bg-theme-bg-surface rounded-full overflow-hidden">
            <div 
              className="h-full bg-theme-primary rounded-full"
              style={{ width: `${percentages.timeline}%` }}
            />
          </div>
          <p className="text-xs text-theme-tertiary">
            {answers.timeline === 'immediate' ? 'Ready now' :
             answers.timeline === 'next_quarter' ? 'Next quarter' :
             answers.timeline === 'exploratory' ? 'Strategic planning' : 'Timeline flexible'}
          </p>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-theme-primary mb-1">Content Vision</h4>
          <div className="h-4 bg-theme-bg-surface rounded-full overflow-hidden">
            <div 
              className="h-full bg-theme-primary rounded-full"
              style={{ width: `${percentages.volume}%` }}
            />
          </div>
          <p className="text-xs text-theme-tertiary">
            {answers.contentVolume === 'high' ? 'Content engine' :
             answers.contentVolume === 'medium' ? 'Consistent presence' :
             answers.contentVolume === 'low' ? 'Focused impact' : 'Strategy first'}
          </p>
        </div>
      </div>
      
      {/* Implementation match */}
      <div className="bg-theme-primary/5 p-4 rounded-lg mb-8">
        <h4 className="font-medium text-theme-primary mb-2">Your Implementation Match</h4>
        <p className="text-sm text-theme-secondary">
          {score >= 8 ? 
            'Your needs align with our Executive Partnership approach. You have a complex team structure, desire hands-on support, and have ambitious content goals on an accelerated timeline.' :
           score >= 5 ?
            'Your profile fits our Comprehensive Implementation approach. You have a growing team with balanced support needs and a clear vision for content production.' :
            'The Foundation Program is your ideal starting point. This self-paced approach allows you to build momentum at your own pace while establishing core content systems.'}
        </p>
      </div>
      
      <button
        onClick={onContinue}
        className="py-3 px-8 bg-theme-primary hover:bg-theme-primary-hover text-white rounded-lg transition-colors shadow-theme-btn hover:shadow-theme-lg hover-bubbly self-center"
      >
        See My Recommendation
      </button>
    </div>
  );
};

// Differentiated recommendation views
const FoundationRecommendationView: React.FC<{
  recommendation: any,
  onUpgradeSelect: () => void,
  onPurchase: () => void,
  answers: any
}> = ({ recommendation, onUpgradeSelect, onPurchase, answers }) => {
  return (
    <div className="grid grid-cols-2 gap-6 h-full p-6">
      {/* LEFT COLUMN - Recommended Foundation Program */}
      <div className="border border-theme-border-light rounded-xl overflow-hidden shadow-theme-sm flex flex-col">
        <div className="p-4 bg-theme-bg-surface border-b border-theme-border-light">
          <div className="bg-theme-primary/10 text-theme-primary text-xs font-medium px-2 py-1 rounded-full inline-block mb-2">
            Recommended for You
          </div>
          <h3 className="text-xl font-bold text-theme-primary">Foundation Program</h3>
          <p className="text-theme-tertiary text-sm">Get started on your content journey</p>
        </div>
        
        <div className="p-4 flex-grow">
          <div className="mb-6">
            <span className="text-sm text-theme-tertiary">One-time payment</span>
            <div className="text-3xl font-bold text-theme-primary">{recommendation.pricing}</div>
          </div>
          
          <div className="space-y-4 mb-6">
            <p className="text-sm text-theme-secondary">
              Our Foundation Program gives you the essential building blocks to start implementing our content system at your own pace.
            </p>
            
            <h4 className="text-sm font-medium text-theme-primary border-b border-theme-border-light pb-1">
              Perfect If You're:
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-0.5" />
                <p className="text-theme-secondary text-sm">Just starting your content journey</p>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-0.5" />
                <p className="text-theme-secondary text-sm">Testing the waters before full commitment</p>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-0.5" />
                <p className="text-theme-secondary text-sm">Building foundations while on a budget</p>
              </li>
            </ul>
          </div>
          
          <button
            onClick={onPurchase}
            className="w-full py-3 bg-theme-primary hover:bg-theme-primary-hover text-white rounded-lg transition-colors shadow-theme-btn hover:shadow-theme-lg hover-bubbly mb-3"
          >
            Start Foundation Program Now
          </button>
          
          <p className="text-center text-theme-tertiary text-xs">
            Secure checkout • Instant access • 14-day guarantee
          </p>
        </div>
      </div>
      
      {/* RIGHT COLUMN - Executive Partnership (what they're missing) */}
      <div className="border border-theme-border-light rounded-xl overflow-hidden bg-theme-bg-surface shadow-theme-sm flex flex-col opacity-90">
        <div className="p-4 bg-theme-bg-surface border-b border-theme-border-light">
          <div className="bg-[#B92234]/10 text-[#B92234] text-xs font-medium px-2 py-1 rounded-full inline-block mb-2">
            Premium Offering
          </div>
          <h3 className="text-xl font-bold text-theme-primary">Executive Partnership</h3>
          <p className="text-theme-tertiary text-sm">Full-service implementation support</p>
        </div>
        
        <div className="p-4 flex-grow">
          <div className="mb-6">
            <span className="text-sm text-theme-tertiary">Starting from</span>
            <div className="text-3xl font-bold text-theme-primary">£9,500</div>
          </div>
          
          <div className="space-y-4 mb-6">
            <p className="text-sm text-theme-secondary">
              When you're ready for comprehensive support, our Executive Partnership provides white-glove implementation.
            </p>
            
            <h4 className="text-sm font-medium text-theme-primary border-b border-theme-border-light pb-1">
              Future Access To:
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-[#B92234] shrink-0 mt-0.5" />
                <p className="text-theme-secondary text-sm">Dedicated implementation manager</p>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-[#B92234] shrink-0 mt-0.5" />
                <p className="text-theme-secondary text-sm">Custom strategy development</p>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-[#B92234] shrink-0 mt-0.5" />
                <p className="text-theme-secondary text-sm">6 months premium support</p>
              </li>
            </ul>
            
            <div className="bg-theme-bg-primary/50 p-3 rounded-lg border border-theme-border-light mt-6">
              <h4 className="font-medium text-theme-primary text-sm mb-1">Not quite ready yet?</h4>
              <p className="text-xs text-theme-tertiary">
                Start with Foundation today, and you'll get credit toward Executive Partnership when you're ready to upgrade.
              </p>
            </div>
          </div>
          
          <button
            onClick={onUpgradeSelect}
            className="w-full py-3 border border-[#B92234] text-[#B92234] hover:bg-[#B92234]/5 rounded-lg transition-colors hover-bubbly-sm"
          >
            Learn About Executive Partnership
          </button>
        </div>
      </div>
    </div>
  );
};

// Premium recommendation view
const PremiumRecommendationView: React.FC<{
  recommendation: any,
  showCalendly: boolean,
  onClose: () => void,
  answers: any
}> = ({ recommendation, showCalendly, onClose, answers }) => {
  const [selectedEnhancements, setSelectedEnhancements] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  
  // Handle enhancement toggles
  const toggleEnhancement = (id: string) => {
    if (selectedEnhancements.includes(id)) {
      setSelectedEnhancements(prev => prev.filter(item => item !== id));
    } else {
      setSelectedEnhancements(prev => [...prev, id]);
    }
  };
  
  // Available enhancements based on recommendation type
  const enhancements = recommendation.type === 'executive' ? [
    { id: 'team_training', name: 'Team Training Sessions', price: '£1,200' },
    { id: 'content_audit', name: 'Content Audit & Strategy', price: '£950' },
    { id: 'extended_support', name: 'Extended Support (3 months)', price: '£1,800' }
  ] : [
    { id: 'private_coaching', name: 'Private Coaching Sessions', price: '£850' },
    { id: 'content_audit', name: 'Content Audit & Strategy', price: '£950' },
    { id: 'template_pkg', name: 'Advanced Template Package', price: '£450' }
  ];
  
  return (
    <div className="grid grid-cols-5 gap-0 h-full">
      {/* Left side - Features and enhancements */}
      <div className="col-span-2 p-5 flex flex-col">
        <div className="bg-theme-primary/5 p-4 rounded-lg mb-4">
          <h3 className="font-medium text-theme-primary mb-2">Perfect Match for Your Needs</h3>
          <p className="text-theme-secondary text-sm">
            {recommendation.explanation}
          </p>
        </div>
        
        {/* Core features */}
        <h4 className="text-sm font-medium text-theme-primary mb-3 border-b border-[var(--theme-border-light)] pb-1">
          {recommendation.type === 'executive' ? 'Executive Partnership Includes' : 'Comprehensive Implementation Includes'}
        </h4>
        
        <ul className="space-y-3 mb-6">
          {recommendation.type === 'executive' ? (
            <>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-0.5" />
                <p className="text-theme-secondary text-sm">Dedicated implementation manager</p>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-0.5" />
                <p className="text-theme-secondary text-sm">Custom strategy development</p>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-0.5" />
                <p className="text-theme-secondary text-sm">6 months premium support</p>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-0.5" />
                <p className="text-theme-secondary text-sm">Advanced analytics & reporting</p>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-0.5" />
                <p className="text-theme-secondary text-sm">Group coaching sessions</p>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-0.5" />
                <p className="text-theme-secondary text-sm">Complete system templates</p>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-0.5" />
                <p className="text-theme-secondary text-sm">3-month support package</p>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-theme-primary shrink-0 mt-0.5" />
                <p className="text-theme-secondary text-sm">Private community access</p>
              </li>
            </>
          )}
        </ul>
        
        {/* Optional enhancements */}
        <div className="mt-auto">
          <h4 className="text-sm font-medium text-theme-primary mb-3 border-b border-[var(--theme-border-light)] pb-1">
            Personalized Enhancements
          </h4>
          
          <div className="space-y-2">
            {enhancements.map(enhancement => (
              <div 
                key={enhancement.id}
                className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedEnhancements.includes(enhancement.id)
                    ? 'border-theme-primary bg-theme-primary/5'
                    : 'border-theme-border-light'
                }`}
                onClick={() => toggleEnhancement(enhancement.id)}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-md border mr-3 flex items-center justify-center ${
                    selectedEnhancements.includes(enhancement.id)
                      ? 'border-theme-primary bg-theme-primary'
                      : 'border-theme-border-light'
                  }`}>
                    {selectedEnhancements.includes(enhancement.id) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <span className="text-theme-secondary text-sm">{enhancement.name}</span>
                </div>
                <span className="text-theme-primary text-sm font-medium">{enhancement.price}</span>
              </div>
            ))}
          </div>
          
          {recommendation.type === 'comprehensive' && (
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="w-full mt-4 py-2 text-sm text-theme-tertiary hover:text-theme-primary transition-colors"
            >
              {showComparison ? 'Hide comparison' : 'Compare with Executive Partnership'}
            </button>
          )}
        </div>
      </div>
      
      {/* Right side - Calendly */}
      <div className="col-span-3 border-l border-[var(--theme-border-light)] h-full"> 
        <div className="h-full flex flex-col">
          {/* Calendly header */}
          <div className="p-3 border-b border-[var(--theme-border-light)] flex justify-between items-center">
            <h3 className="text-lg font-medium text-theme-primary">Schedule Your Strategy Session</h3>
            <div className="text-sm text-theme-tertiary">30 min • Free</div>
          </div>
          
          {/* Calendly Widget - Takes up remaining height */}
          <div 
            className="calendly-inline-widget w-full flex-grow" 
            data-url={`https://calendly.com/jodenclashnewman/vertical-shortcut-discovery-call?hide_gdpr_banner=1&primary_color=FEA35D${
              recommendation.type === 'executive' ? '&name=Executive_Partnership' : 
              '&name=Comprehensive_Implementation'
            }${
              selectedEnhancements.length > 0 ? `&custom_enhancements=${selectedEnhancements.join(',')}` : ''
            }`}
            style={{ height: "100%", minWidth: "320px" }}
          />
        </div>
      </div>
    </div>
  );
};

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
  const progressBarRef = useRef<HTMLDivElement>(null);
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

      // Stage transition animation - sequential fade with no overlap
      if (lastStageRef.current !== stage && contentRef.current) {
        // Wait until any existing animations are complete to prevent double animations
        if (contentRef.current.style.opacity !== "0") {
          // First fade out the current content completely
          gsap.to(contentRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
              // Then fade in the new content only after old content is gone
              gsap.fromTo(contentRef.current,
                { opacity: 0, y: 10 },
                { 
                  opacity: 1, 
                  y: 0, 
                  duration: 0.3, 
                  ease: "power2.out",
                  clearProps: "all"
                }
              );
            }
          });
        } else {
          // If content is already faded out, just fade in the new content
          gsap.fromTo(contentRef.current,
            { opacity: 0, y: 10 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.3, 
              ease: "power2.out",
              clearProps: "all"
            }
          );
        }

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

      // Animate the progress bar when stage changes
      if (progressBarRef.current && 
          lastStageRef.current !== stage && 
          stage !== 'intro' && 
          stage !== 'recommendation') {
        // Calculate progress for animation
        const progress = getProgress();
        
        // Helper function to get progress for a specific stage
        const getProgressForStage = (stg: string) => {
          const stgIndex = stageSequence.indexOf(stg);
          return Math.round((stgIndex / (stageSequence.length - 1)) * 100);
        };
        
        // Animate the progress bar with a bounce effect
        gsap.fromTo(progressBarRef.current,
          { width: `${lastStageRef.current !== 'intro' ? getProgressForStage(lastStageRef.current) : 0}%` },
          { 
            width: `${progress}%`, 
            duration: 0.6, 
            ease: "power2.out"
          }
        );
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

  // State to track selection animation
  const [isAnimatingSelection, setIsAnimatingSelection] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

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
    }
    
    // Update actual answer
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
    
    // Animate selection for multiple-choice questions only (not form fields)
    if (!isFormField && ['teamSize', 'implementationSupport', 'timeline', 'contentVolume'].includes(stage)) {
      // Get all option buttons
      const optionButtons = document.querySelectorAll(`.${stage}-option`);
      const selectedButton = document.querySelector(`.${stage}-option[data-value="${value}"]`);
      // Get the index within the visible dots (excluding intro and recommendation)
      const visibleDotIndex = stageSequence.filter(s => s !== 'intro' && s !== 'recommendation').indexOf(stage);
      const progressDot = document.querySelector(`.progress-dot-${visibleDotIndex}`);
      
      if (selectedButton && optionButtons.length && progressDot) {
        
        // Create a complete timeline that properly handles stage transition
        const tl = gsap.timeline({
          onComplete: () => {
            // Reset animation state
            setIsAnimatingSelection(false);
            setSelectedChoice(null);
            
            // Track the stage completion event
            trackEvent('qualification_step_completed', {
              stage: stage,
              timeSpent: engagement.timeSpent,
              interactionCount: engagement.questionInteractions
            });
            
            // Process animation only if we haven't already changed stage
            if (stage === lastStageRef.current) {
              // Get the next stage in the sequence - delayed to allow animation to complete
              const currentIndex = stageSequence.indexOf(stage);
              if (currentIndex >= 0 && currentIndex < stageSequence.length - 1) {
                setStage(stageSequence[currentIndex + 1]);
              }
            }
          }
        });

        // 1. First just highlight the selected option (don't fade others yet)
        tl.to(selectedButton, {
          backgroundColor: 'var(--theme-primary)',
          color: 'white',
          borderColor: 'var(--theme-primary)',
          scale: 1.05,
          duration: 0.2,
          ease: "power2.out"
        });
        
        // 2. Now fade out EVERYTHING together
        optionButtons.forEach(btn => {
          tl.to(btn, {
            opacity: 0,
            scale: btn === selectedButton ? 0 : 0.95,
            duration: 0.25,
            ease: btn === selectedButton ? "back.in(1.2)" : "power2.out",
          }, "fadeAll");
        });
        
        // 3. Highlight the progress dot to show connection
        tl.to(progressDot, {
          scale: 1.5,
          backgroundColor: 'var(--theme-primary)',
          boxShadow: '0 0 10px var(--theme-primary)',
          duration: 0.25,
          ease: "back.out(1.2)"
        }, "fadeAll");
        
        // 4. Return progress dot to normal
        tl.to(progressDot, {
          scale: 1.1,
          boxShadow: 'none',
          duration: 0.2,
          ease: "power2.out",
        }, "+=0.05");
      } else {
        // If animation isn't working, fall back to immediate stage change
        setIsAnimatingSelection(false);
        
        // Get the next stage in the sequence
        const currentIndex = stageSequence.indexOf(stage);
        if (currentIndex >= 0 && currentIndex < stageSequence.length - 1) {
          setStage(stageSequence[currentIndex + 1]);
        }
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
  
  // Process CRM integration for recommendation stage
  useEffect(() => {
    if (stage === 'recommendation' && recommendation) {
      processCrmIntegration();
    }
  }, [stage, recommendation]);
  
  // Calendly script loading
  useEffect(() => {
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
  }, [stage]);
  
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
      
      {/* Modal content - expand for recommendation stage */}
      <div 
        ref={modalRef}
        className={`relative z-10 w-full ${stage === 'recommendation' ? 'max-w-5xl' : 'max-w-3xl'} max-h-[90vh] overflow-y-auto bg-theme-gradient rounded-2xl shadow-theme-md opacity-0 transition-all duration-500`}
      >
        {/* Floating elements for visual interest */}
        <div className="modal-floating-element absolute top-10 right-10 -z-10 w-20 h-20 rounded-[40%] rotate-12 opacity-[var(--theme-float-opacity)] bg-[var(--theme-float-bg-primary)]"></div>
        <div className="modal-floating-element absolute bottom-10 left-10 -z-10 w-24 h-24 rounded-[30%] -rotate-6 opacity-[var(--theme-float-opacity-secondary)] bg-[var(--theme-float-bg-secondary)]"></div>
        
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-[var(--theme-border-light)] p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-theme-primary/10 text-theme-primary">
              <StageIcon stage={stage} size={20} />
            </div>
            <h2 className="text-xl font-medium text-theme-primary">
              {stage === 'intro' && 'Discover Your Perfect Implementation'}
              {stage === 'contact' && 'Let\'s Personalize Your Plan'}
              {stage === 'teamSize' && 'About Your Team'}
              {stage === 'implementationSupport' && 'Your Implementation Style'}
              {stage === 'timeline' && 'Project Timeline'}
              {stage === 'contentVolume' && 'Content Vision'}
              {stage === 'analysis' && 'Crafting Your Solution'}
              {stage === 'breakdown' && 'Your Implementation Analysis'}
              {stage === 'recommendation' && 'Your Personalized Strategy'}
            </h2>
          </div>
          
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
          <div className="w-full h-2 bg-theme-bg-secondary relative">
            <div 
              className="h-full bg-theme-primary relative overflow-hidden transition-all duration-700 ease-out"
              style={{ width: `${getProgress()}%` }}
              ref={progressBarRef}
            >
              {/* Add decorative elements within the progress bar */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-1 bg-theme-primary-hover/30 rotate-45 blur-sm transform -translate-x-full animate-[progress-shimmer_3s_infinite]"></div>
              </div>
            </div>
            
            {/* Progress markers for each stage - explicitly include exactly 5 dots */}
            <div className="absolute top-0 left-0 w-full h-full flex justify-between px-1">
              {/* Team Size dot */}
              <div 
                className={`progress-dot-0 h-5 w-5 rounded-full -mt-1.5 transition-all duration-500 ${
                  stageSequence.indexOf(stage) > stageSequence.indexOf('teamSize')
                    ? 'bg-theme-primary scale-100 shadow-theme-sm' 
                    : stageSequence.indexOf(stage) === stageSequence.indexOf('teamSize')
                      ? 'bg-theme-primary scale-110 ring-3 ring-theme-primary/40 shadow-theme-md' 
                      : 'bg-theme-bg-surface border-2 border-theme-border-light'
                }`}
              />
              
              {/* Implementation Support dot */}
              <div 
                className={`progress-dot-1 h-5 w-5 rounded-full -mt-1.5 transition-all duration-500 ${
                  stageSequence.indexOf(stage) > stageSequence.indexOf('implementationSupport')
                    ? 'bg-theme-primary scale-100 shadow-theme-sm' 
                    : stageSequence.indexOf(stage) === stageSequence.indexOf('implementationSupport')
                      ? 'bg-theme-primary scale-110 ring-3 ring-theme-primary/40 shadow-theme-md' 
                      : 'bg-theme-bg-surface border-2 border-theme-border-light'
                }`}
              />
              
              {/* Timeline dot */}
              <div 
                className={`progress-dot-2 h-5 w-5 rounded-full -mt-1.5 transition-all duration-500 ${
                  stageSequence.indexOf(stage) > stageSequence.indexOf('timeline')
                    ? 'bg-theme-primary scale-100 shadow-theme-sm' 
                    : stageSequence.indexOf(stage) === stageSequence.indexOf('timeline')
                      ? 'bg-theme-primary scale-110 ring-3 ring-theme-primary/40 shadow-theme-md' 
                      : 'bg-theme-bg-surface border-2 border-theme-border-light'
                }`}
              />
              
              {/* Content Volume dot */}
              <div 
                className={`progress-dot-3 h-5 w-5 rounded-full -mt-1.5 transition-all duration-500 ${
                  stageSequence.indexOf(stage) > stageSequence.indexOf('contentVolume')
                    ? 'bg-theme-primary scale-100 shadow-theme-sm' 
                    : stageSequence.indexOf(stage) === stageSequence.indexOf('contentVolume')
                      ? 'bg-theme-primary scale-110 ring-3 ring-theme-primary/40 shadow-theme-md' 
                      : 'bg-theme-bg-surface border-2 border-theme-border-light'
                }`}
              />
              
              {/* Contact dot */}
              <div 
                className={`progress-dot-4 h-5 w-5 rounded-full -mt-1.5 transition-all duration-500 ${
                  stageSequence.indexOf(stage) > stageSequence.indexOf('contact')
                    ? 'bg-theme-primary scale-100 shadow-theme-sm' 
                    : stageSequence.indexOf(stage) === stageSequence.indexOf('contact')
                      ? 'bg-theme-primary scale-110 ring-3 ring-theme-primary/40 shadow-theme-md' 
                      : 'bg-theme-bg-surface border-2 border-theme-border-light'
                }`}
              />
            </div>
          </div>
        )}
        
        {/* Modal content - changes based on current stage */}
        <div className="p-6" ref={contentRef}>
          {/* Introduction Stage - Simplified to reduce text and scrolling */}
          {stage === 'intro' && (
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-theme-primary/10 flex items-center justify-center mr-4">
                  <Compass size={24} className="text-theme-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-theme-primary">
                    Build Your Content System
                  </h3>
                  <p className="text-theme-secondary text-sm">
                    Let's find the perfect approach to scale your content performance
                  </p>
                </div>
              </div>
              
              {/* Social proof badge */}
              <div className="flex items-center gap-1 text-xs text-theme-tertiary border border-theme-border-light rounded-full px-2 py-1 mb-3 w-fit mx-auto">
                <Users size={12} className="text-theme-primary"/>
                <span>Trusted by 1,200+ clients in 27 industries</span>
              </div>
              
              {/* Mini Feature Showcase - Enhanced with stronger stats */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {/* Feature 1 */}
                <div className="bg-theme-bg-surface p-2 rounded-lg shadow-theme-sm border border-theme-border-light hover-bubbly-sm transition-all">
                  <div className="flex items-center mb-1">
                    <div className="p-1 rounded-full bg-theme-primary/10 text-theme-primary mr-2">
                      <BarChart4 size={14} />
                    </div>
                    <h4 className="font-medium text-theme-primary text-xs">800M+ Views</h4>
                  </div>
                  <p className="text-xs text-theme-secondary">Generated for 120+ clients without ads</p>
                </div>
                
                {/* Feature 2 */}
                <div className="bg-theme-bg-surface p-2 rounded-lg shadow-theme-sm border border-theme-border-light hover-bubbly-sm transition-all">
                  <div className="flex items-center mb-1">
                    <div className="p-1 rounded-full bg-theme-primary/10 text-theme-primary mr-2">
                      <Clock size={14} />
                    </div>
                    <h4 className="font-medium text-theme-primary text-xs">42% Growth</h4>
                  </div>
                  <p className="text-xs text-theme-secondary">Average 30-day audience increase</p>
                </div>
                
                {/* Feature 3 */}
                <div className="bg-theme-bg-surface p-2 rounded-lg shadow-theme-sm border border-theme-border-light hover-bubbly-sm transition-all">
                  <div className="flex items-center mb-1">
                    <div className="p-1 rounded-full bg-theme-primary/10 text-theme-primary mr-2">
                      <Award size={14} />
                    </div>
                    <h4 className="font-medium text-theme-primary text-xs">7-Figure Results</h4>
                  </div>
                  <p className="text-xs text-theme-secondary">27 industries, proven framework</p>
                </div>
              </div>
              
              <div className="bg-theme-bg-surface rounded-lg p-3 mb-3 border border-theme-border-light">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-medium text-theme-primary">How It Works</h4>
                  <span className="text-xs text-theme-tertiary">Takes 60 seconds</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-7 w-7 rounded-full bg-theme-gradient text-white text-xs mb-1">1</div>
                    <span className="text-theme-secondary text-[10px]">Quick<br/>Assessment</span>
                  </div>
                  <div className="text-theme-tertiary">→</div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-7 w-7 rounded-full bg-theme-gradient-primary text-white text-xs mb-1">2</div>
                    <span className="text-theme-secondary text-[10px]">Personalized<br/>Solution</span>
                  </div>
                  <div className="text-theme-tertiary">→</div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-7 w-7 rounded-full bg-theme-gradient-primary text-white text-xs mb-1">3</div>
                    <span className="text-theme-secondary text-[10px]">Start<br/>Growing</span>
                  </div>
                </div>
              </div>

              <p className="text-theme-tertiary text-[10px] text-center italic">
                No obligation • Personalized to your specific needs
              </p>
            </div>
          )}
          
          {/* Contact Information Stage */}
          {stage === 'contact' && (
            <div className="space-y-4">
              {/* Stage illustration */}
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 rounded-full bg-theme-gradient/10 flex items-center justify-center">
                  <Mail size={32} className="text-theme-primary" />
                </div>
              </div>
              
              <div className="bg-theme-bg-surface rounded-lg p-3 mb-3 border border-theme-border-light">
                <h3 className="text-theme-primary font-medium text-center mb-1">Just One More Step</h3>
                <p className="text-theme-secondary text-center text-sm">
                  We'll create your personalized implementation strategy and send it directly to you
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {/* Left Column - About You */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-theme-primary border-b border-[var(--theme-border-light)] pb-1">About You</h3>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-theme-primary mb-1">
                      Your Name*
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={answers.name}
                      onChange={(e) => handleAnswerChange('name', e.target.value)}
                      className={`w-full rounded-lg border ${errors.name ? 'border-red-500 dark:border-red-400' : 'border-[var(--theme-border-light)]'} bg-theme-bg-surface px-3 py-2 text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent shadow-theme-sm`}
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
                      onChange={(e) => handleAnswerChange('email', e.target.value)}
                      className={`w-full rounded-lg border ${errors.email ? 'border-red-500 dark:border-red-400' : 'border-[var(--theme-border-light)]'} bg-theme-bg-surface px-3 py-2 text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent shadow-theme-sm`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-red-500 dark:text-red-400 text-sm">{errors.email}</p>
                    )}
                  </div>
                </div>
                
                {/* Right Column - About the Brand */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-theme-primary border-b border-[var(--theme-border-light)] pb-1">About Your Brand</h3>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-theme-primary mb-1">
                      Company/Brand Name*
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={answers.company}
                      onChange={(e) => handleAnswerChange('company', e.target.value)}
                      className={`w-full rounded-lg border ${errors.company ? 'border-red-500 dark:border-red-400' : 'border-[var(--theme-border-light)]'} bg-theme-bg-surface px-3 py-2 text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent shadow-theme-sm`}
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
                      onChange={(e) => handleAnswerChange('position', e.target.value)}
                      className="w-full rounded-lg border border-[var(--theme-border-light)] bg-theme-bg-surface px-3 py-2 text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent shadow-theme-sm"
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
              {/* Stage illustration */}
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 rounded-full bg-theme-gradient/10 flex items-center justify-center">
                  <Users size={32} className="text-theme-primary" />
                </div>
              </div>
              
              <div className="bg-theme-bg-surface rounded-lg p-3 mb-3 border border-theme-border-light">
                <h3 className="text-theme-primary font-medium text-center mb-1">Your Content Team</h3>
                <p className="text-theme-secondary text-center text-sm">
                  We'll tailor our system to match your team's specific structure and size
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleAnswerChange('teamSize', '1')}
                  data-value="1"
                  className={`teamSize-option flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.teamSize === '1' || selectedChoice === '1'
                      ? 'border-theme-primary bg-theme-primary/10 shadow-theme-md' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  } ${isAnimatingSelection && selectedChoice !== '1' ? 'pointer-events-none' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Solo Creator</h3>
                    {answers.teamSize === '1' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">Just you (or with occasional freelance help)</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('teamSize', '5')}
                  data-value="5"
                  className={`teamSize-option flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.teamSize === '5' || selectedChoice === '5'
                      ? 'border-theme-primary bg-theme-primary/10 shadow-theme-md' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  } ${isAnimatingSelection && selectedChoice !== '5' ? 'pointer-events-none' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Small Team</h3>
                    {answers.teamSize === '5' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">You lead a tight-knit team of 2-9 people</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('teamSize', '15')}
                  data-value="15"
                  className={`teamSize-option flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.teamSize === '15' || selectedChoice === '15'
                      ? 'border-theme-primary bg-theme-primary/10 shadow-theme-md' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  } ${isAnimatingSelection && selectedChoice !== '15' ? 'pointer-events-none' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Growing Team</h3>
                    {answers.teamSize === '15' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">Your team has 10-19 members across functions</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('teamSize', '25')}
                  data-value="25"
                  className={`teamSize-option flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.teamSize === '25' || selectedChoice === '25'
                      ? 'border-theme-primary bg-theme-primary/10 shadow-theme-md' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  } ${isAnimatingSelection && selectedChoice !== '25' ? 'pointer-events-none' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Organization</h3>
                    {answers.teamSize === '25' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">20+ people with dedicated content teams</p>
                </button>
              </div>
            </div>
          )}
          
          {/* Implementation Support Stage */}
          {stage === 'implementationSupport' && (
            <div className="space-y-4">
              {/* Stage illustration */}
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 rounded-full bg-theme-gradient/10 flex items-center justify-center">
                  <Briefcase size={32} className="text-theme-primary" />
                </div>
              </div>
              
              <div className="bg-theme-bg-surface rounded-lg p-3 mb-3 border border-theme-border-light">
                <h3 className="text-theme-primary font-medium text-center mb-1">Your Implementation Style</h3>
                <p className="text-theme-secondary text-center text-sm">
                  How do you prefer to learn new systems? We'll match you with the right level of support.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleAnswerChange('implementationSupport', 'self_directed')}
                  data-value="self_directed"
                  className={`implementationSupport-option flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.implementationSupport === 'self_directed' || selectedChoice === 'self_directed'
                      ? 'border-theme-primary bg-theme-primary/10 shadow-theme-md' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  } ${isAnimatingSelection && selectedChoice !== 'self_directed' ? 'pointer-events-none' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Self-Driven</h3>
                    {answers.implementationSupport === 'self_directed' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">I prefer complete resources I can implement at my own pace</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('implementationSupport', 'guided')}
                  data-value="guided"
                  className={`implementationSupport-option flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.implementationSupport === 'guided' || selectedChoice === 'guided'
                      ? 'border-theme-primary bg-theme-primary/10 shadow-theme-md' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  } ${isAnimatingSelection && selectedChoice !== 'guided' ? 'pointer-events-none' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Coaching & Support</h3>
                    {answers.implementationSupport === 'guided' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">I value strategic guidance while implementing myself</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('implementationSupport', 'full_service')}
                  data-value="full_service"
                  className={`implementationSupport-option flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.implementationSupport === 'full_service' || selectedChoice === 'full_service'
                      ? 'border-theme-primary bg-theme-primary/10 shadow-theme-md' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  } ${isAnimatingSelection && selectedChoice !== 'full_service' ? 'pointer-events-none' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Full Implementation</h3>
                    {answers.implementationSupport === 'full_service' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">I want dedicated experts handling the implementation for me</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('implementationSupport', 'undecided')}
                  data-value="undecided"
                  className={`implementationSupport-option flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.implementationSupport === 'undecided' || selectedChoice === 'undecided'
                      ? 'border-theme-primary bg-theme-primary/10 shadow-theme-md' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  } ${isAnimatingSelection && selectedChoice !== 'undecided' ? 'pointer-events-none' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Discuss Options</h3>
                    {answers.implementationSupport === 'undecided' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">I'd like to explore all options based on my specific needs</p>
                </button>
              </div>
            </div>
          )}
          
          {/* Timeline Stage */}
          {stage === 'timeline' && (
            <div className="space-y-4">
              {/* Stage illustration */}
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 rounded-full bg-theme-gradient/10 flex items-center justify-center">
                  <Clock size={32} className="text-theme-primary" />
                </div>
              </div>
              
              <div className="bg-theme-bg-surface rounded-lg p-3 mb-3 border border-theme-border-light">
                <h3 className="text-theme-primary font-medium text-center mb-1">Your Growth Timeline</h3>
                <p className="text-theme-secondary text-center text-sm">
                  When do you want to see results? We'll adjust our approach to match your goals.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleAnswerChange('timeline', 'immediate')}
                  data-value="immediate"
                  className={`timeline-option flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.timeline === 'immediate' || selectedChoice === 'immediate'
                      ? 'border-theme-primary bg-theme-primary/10 shadow-theme-md' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  } ${isAnimatingSelection && selectedChoice !== 'immediate' ? 'pointer-events-none' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">ASAP Growth</h3>
                    {answers.timeline === 'immediate' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">I need results immediately, ready to implement now</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('timeline', 'next_quarter')}
                  data-value="next_quarter"
                  className={`timeline-option flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.timeline === 'next_quarter' || selectedChoice === 'next_quarter'
                      ? 'border-theme-primary bg-theme-primary/10 shadow-theme-md' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  } ${isAnimatingSelection && selectedChoice !== 'next_quarter' ? 'pointer-events-none' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Next 90 Days</h3>
                    {answers.timeline === 'next_quarter' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">Planning for implementation within 1-3 months</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('timeline', 'exploratory')}
                  data-value="exploratory"
                  className={`timeline-option flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.timeline === 'exploratory' || selectedChoice === 'exploratory'
                      ? 'border-theme-primary bg-theme-primary/10 shadow-theme-md' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  } ${isAnimatingSelection && selectedChoice !== 'exploratory' ? 'pointer-events-none' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Strategic Planning</h3>
                    {answers.timeline === 'exploratory' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">Building roadmap for implementation later this year</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('timeline', 'flexible')}
                  data-value="flexible"
                  className={`timeline-option flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.timeline === 'flexible' || selectedChoice === 'flexible'
                      ? 'border-theme-primary bg-theme-primary/10 shadow-theme-md' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  } ${isAnimatingSelection && selectedChoice !== 'flexible' ? 'pointer-events-none' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Quality First</h3>
                    {answers.timeline === 'flexible' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">Focused on getting perfect results over quick timeline</p>
                </button>
              </div>
            </div>
          )}
          
          {/* Content Volume Stage */}
          {stage === 'contentVolume' && (
            <div className="space-y-4">
              {/* Stage illustration */}
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 rounded-full bg-theme-gradient/10 flex items-center justify-center">
                  <BarChart4 size={32} className="text-theme-primary" />
                </div>
              </div>
              
              <div className="bg-theme-bg-surface rounded-lg p-3 mb-3 border border-theme-border-light">
                <h3 className="text-theme-primary font-medium text-center mb-1">Your Content Vision</h3>
                <p className="text-theme-secondary text-center text-sm">
                  What volume and approach fits your growth goals? We'll design your ideal framework.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleAnswerChange('contentVolume', 'low')}
                  data-value="low"
                  className={`contentVolume-option flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.contentVolume === 'low' || selectedChoice === 'low'
                      ? 'border-theme-primary bg-theme-primary/10 shadow-theme-md' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  } ${isAnimatingSelection && selectedChoice !== 'low' ? 'pointer-events-none' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">High-Impact Focus</h3>
                    {answers.contentVolume === 'low' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">Strategic pieces that maximize ROI and conversions</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('contentVolume', 'medium')}
                  data-value="medium"
                  className={`contentVolume-option flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.contentVolume === 'medium' || selectedChoice === 'medium'
                      ? 'border-theme-primary bg-theme-primary/10 shadow-theme-md' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  } ${isAnimatingSelection && selectedChoice !== 'medium' ? 'pointer-events-none' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Consistent Growth</h3>
                    {answers.contentVolume === 'medium' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">Regular content system (10-30 pieces monthly)</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('contentVolume', 'high')}
                  data-value="high"
                  className={`contentVolume-option flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.contentVolume === 'high' || selectedChoice === 'high'
                      ? 'border-theme-primary bg-theme-primary/10 shadow-theme-md' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  } ${isAnimatingSelection && selectedChoice !== 'high' ? 'pointer-events-none' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Full-Scale Engine</h3>
                    {answers.contentVolume === 'high' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">Comprehensive system across multiple platforms</p>
                </button>
                
                <button
                  onClick={() => handleAnswerChange('contentVolume', 'undecided')}
                  data-value="undecided"
                  className={`contentVolume-option flex flex-col h-full p-4 rounded-lg border transition-all hover-bubbly-sm ${
                    answers.contentVolume === 'undecided' || selectedChoice === 'undecided'
                      ? 'border-theme-primary bg-theme-primary/10 shadow-theme-md' 
                      : 'border-theme-border-light bg-theme-bg-surface'
                  } ${isAnimatingSelection && selectedChoice !== 'undecided' ? 'pointer-events-none' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-theme-primary font-medium">Strategic Guidance</h3>
                    {answers.contentVolume === 'undecided' && (
                      <CheckCircle className="h-5 w-5 text-theme-primary" />
                    )}
                  </div>
                  <p className="text-theme-secondary text-sm">Help me determine the optimal approach for my goals</p>
                </button>
              </div>
            </div>
          )}
          
          {/* Analysis Animation Stage */}
          {stage === 'analysis' && (
            <AnalysisAnimation onComplete={handleAnalysisAnimationComplete} />
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
            <div className="h-[68vh] overflow-hidden flex flex-col">
              {/* Recommendation Header - More visual with badge design */}
              <div className="p-5 flex items-center justify-between border-b border-[var(--theme-border-light)] bg-theme-gradient-primary/10">
                <div className="flex items-center gap-4">
                  <div className={`
                    p-3.5 rounded-full shadow-theme-sm
                    ${recommendation.type === 'executive' ? 'bg-[#B92234]/10 text-[#B92234] dark:bg-[#B92234]/20 dark:text-[#D72D41]' : 
                    recommendation.type === 'comprehensive' ? 'bg-[#FEA35D]/10 text-[#FEA35D] dark:bg-[#FEA35D]/20 dark:text-[#FEB77D]' : 
                    'bg-[#357380]/10 text-[#357380] dark:bg-[#357380]/20 dark:text-[#4789A0]'}
                  `}>
                    <Award className="h-8 w-8" />
                  </div>
                  
                  <div>
                    <span className="text-sm text-theme-tertiary">Your Personalized Recommendation</span>
                    <h3 className="font-bold text-theme-primary text-2xl leading-tight">
                      {recommendation.type === 'executive' ? 'Executive Partnership: Accelerated Implementation' : 
                       recommendation.type === 'comprehensive' ? 'Comprehensive Implementation: Complete Support' : 
                       'Foundation Program: Essential Building Blocks'}
                    </h3>
                  </div>
                </div>
                
                <div className="bg-theme-primary/10 p-3 rounded-xl">
                  <span className="text-sm text-theme-tertiary block">Starting at</span>
                  <span className="text-2xl font-bold text-theme-primary">{recommendation.pricing}</span>
                </div>
              </div>
              
              {/* Different layouts based on recommendation type */}
              {recommendation.type === 'foundation' ? (
                <FoundationRecommendationView 
                  recommendation={recommendation}
                  onUpgradeSelect={() => window.open('https://your-sales-page.com/executive', '_blank')}
                  onPurchase={() => alert('Starting Foundation Program checkout process')} // Would implement actual checkout in production
                  answers={answers}
                />
              ) : (
                <PremiumRecommendationView
                  recommendation={recommendation}
                  showCalendly={recommendation.showCalendly || false}
                  onClose={handleCalendlyClose}
                  answers={answers}
                />
              )}
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
            
            {/* Enhanced intro stage footer with Learn More option */}
            {stage === 'intro' && (
              <div className="space-x-3">
                <button
                  onClick={() => window.scrollTo({ top: document.getElementById('features-section')?.offsetTop || 0, behavior: 'smooth' })}
                  className="border border-theme-border-light text-theme-secondary hover:text-theme-primary px-4 py-2 rounded-lg transition-colors hover-bubbly-sm"
                >
                  See all features
                </button>
                
                <button
                  onClick={goToNextStage}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg transition-colors hover-bubbly-sm bg-theme-gradient text-white shadow-theme-sm hover:shadow-theme-md"
                >
                  Get my personalized plan
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
            
            {/* Contact stage button */}
            {stage === 'contact' && (
              <button
                onClick={goToNextStage}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors hover-bubbly-sm ${
                  !canProceed()
                    ? 'bg-theme-bg-secondary text-theme-tertiary cursor-not-allowed'
                    : 'bg-theme-primary hover:bg-theme-primary-hover text-white'
                }`}
              >
                Show My Recommendation
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VSQualificationModal;