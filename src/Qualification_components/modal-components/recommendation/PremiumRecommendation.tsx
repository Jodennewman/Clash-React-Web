import React, { useState } from 'react';
import { Button } from "../../../components/ui/button";
import { CheckCircle, Check } from 'lucide-react';

interface PremiumRecommendationProps {
  recommendation: any;
  showCalendly: boolean;
  onClose: () => void;
  answers: any;
}

interface Enhancement {
  id: string;
  name: string;
  price: string;
}

const PremiumRecommendation: React.FC<PremiumRecommendationProps> = ({ 
  recommendation, 
  showCalendly, 
  onClose,
  answers
}) => {
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
  const enhancements: Enhancement[] = recommendation.type === 'executive' ? [
    { id: 'team_training', name: 'Team Training Sessions', price: '£1,200' },
    { id: 'content_audit', name: 'Content Audit & Strategy', price: '£950' },
    { id: 'extended_support', name: 'Extended Support (3 months)', price: '£1,800' }
  ] : [
    { id: 'private_coaching', name: 'Private Coaching Sessions', price: '£850' },
    { id: 'content_audit', name: 'Content Audit & Strategy', price: '£950' },
    { id: 'template_pkg', name: 'Advanced Template Package', price: '£450' }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-8 gap-0">
      {/* Left side - Features and enhancements */}
      <div className="col-span-1 md:col-span-3 p-5 flex flex-col border-b md:border-b-0 md:border-r border-theme-border-light">
        <div className="bg-theme-primary/5 p-4 rounded-lg mb-5">
          <h3 className="font-medium text-theme-primary text-base mb-2">Perfect Match for Your Needs</h3>
          <p className="text-theme-secondary text-base">
            {recommendation.explanation}
          </p>
        </div>
        
        {/* Core features */}
        <h4 className="text-sm font-medium text-theme-primary mb-3 border-b border-[var(--theme-border-light)] pb-1">
          {recommendation.type === 'executive' ? 'Executive Partnership Includes' : 'Comprehensive Implementation Includes'}
        </h4>
        
        <ul className="space-y-2.5 mb-6">
          {recommendation.type === 'executive' ? (
            <>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                <p className="text-theme-secondary text-base">Dedicated implementation manager</p>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                <p className="text-theme-secondary text-base">Custom strategy development</p>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                <p className="text-theme-secondary text-base">6 months premium support</p>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                <p className="text-theme-secondary text-base">Advanced analytics & reporting</p>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                <p className="text-theme-secondary text-base">Group coaching sessions</p>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                <p className="text-theme-secondary text-base">Complete system templates</p>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                <p className="text-theme-secondary text-base">3-month support package</p>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                <p className="text-theme-secondary text-base">Private community access</p>
              </li>
            </>
          )}
        </ul>
        
        {/* Optional enhancements */}
        <div className="mt-auto">
          <h4 className="text-sm font-medium text-theme-primary mb-3 border-b border-[var(--theme-border-light)] pb-1">
            Personalized Enhancements
          </h4>
          
          <div className="space-y-2.5">
            {enhancements.map(enhancement => (
              <div 
                key={enhancement.id}
                className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedEnhancements.includes(enhancement.id)
                    ? 'border-theme-primary bg-theme-primary/5'
                    : 'border-theme-border-light hover:border-theme-primary/30 hover:bg-theme-primary/5'
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
                      <Check className="h-3.5 w-3.5 text-white" />
                    )}
                  </div>
                  <span className="text-theme-secondary text-base">{enhancement.name}</span>
                </div>
                <span className="text-theme-primary text-base font-medium">{enhancement.price}</span>
              </div>
            ))}
          </div>
          
          {recommendation.type === 'comprehensive' && (
            <Button
              onClick={() => setShowComparison(!showComparison)}
              variant="ghost"
              size="sm" 
              className="w-full mt-4 text-theme-tertiary hover:text-theme-primary"
            >
              {showComparison ? 'Hide comparison' : 'Compare with Executive Partnership'}
            </Button>
          )}
        </div>
      </div>
      
      {/* Right side - Calendly */}
      <div className="col-span-1 md:col-span-5"> 
        <div className="flex flex-col h-full">
          {/* Calendly header */}
          <div className="p-4 border-b border-[var(--theme-border-light)] flex justify-between items-center">
            <h3 className="text-base font-medium text-theme-primary">Schedule Your Strategy Session</h3>
            <div className="text-sm text-theme-tertiary font-medium">30 min • Free</div>
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
            style={{ minHeight: "450px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default PremiumRecommendation;