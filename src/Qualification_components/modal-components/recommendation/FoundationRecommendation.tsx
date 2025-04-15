import React from 'react';
import { Button } from "../../../components/ui/button";
import { CheckCircle } from 'lucide-react';

interface FoundationRecommendationProps {
  recommendation: any;
  onUpgradeSelect: () => void;
  onPurchase: () => void;
  answers: any;
}

const FoundationRecommendation: React.FC<FoundationRecommendationProps> = ({ 
  recommendation, 
  onUpgradeSelect, 
  onPurchase,
  answers
}) => {
  return (
    <div className="p-5 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* LEFT COLUMN - Recommended Foundation Program */}
        <div className="border border-theme-border-light rounded-xl overflow-hidden shadow-theme-sm flex flex-col bg-theme-bg-surface/80">
          <div className="p-4 bg-theme-primary/5 border-b border-theme-border-light">
            <div className="bg-theme-primary/15 text-theme-primary text-sm font-medium px-3 py-1 rounded-full inline-block mb-2">
              Recommended for You
            </div>
            <h3 className="text-xl font-bold text-theme-primary">Foundation Program</h3>
            <p className="text-theme-tertiary text-sm">Get started on your content journey</p>
          </div>
          
          <div className="p-5 flex-grow">
            <div className="mb-4">
              <span className="text-sm text-theme-tertiary">One-time payment</span>
              <div className="text-3xl font-bold text-theme-primary">{recommendation.pricing}</div>
            </div>
            
            <div className="space-y-4 mb-5">
              <p className="text-base text-theme-secondary">
                Our Foundation Program gives you the essential building blocks to start implementing our content system.
              </p>
              
              <h4 className="text-sm font-medium text-theme-primary border-b border-theme-border-light pb-1 mb-2">
                Perfect If You're:
              </h4>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                  <p className="text-theme-secondary">Starting your content journey</p>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                  <p className="text-theme-secondary">Testing waters before commitment</p>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-theme-primary shrink-0 mt-0.5" />
                  <p className="text-theme-secondary">Building foundations on a budget</p>
                </li>
              </ul>
            </div>
            
            <Button
              onClick={onPurchase}
              variant="default"
              size="lg"
              className="w-full min-h-[46px] mb-3"
            >
              Start Foundation Program Now
            </Button>
            
            <p className="text-center text-theme-tertiary text-sm">
              Secure checkout • Instant access • 14-day guarantee
            </p>
          </div>
        </div>
        
        {/* RIGHT COLUMN - Executive Partnership (what they're missing) */}
        <div className="border border-theme-border-light rounded-xl overflow-hidden bg-theme-bg-surface/50 shadow-theme-sm flex flex-col">
          <div className="p-4 bg-theme-bg-surface/80 border-b border-theme-border-light">
            <div className="bg-[#B92234]/10 text-[#B92234] text-sm font-medium px-3 py-1 rounded-full inline-block mb-2">
              Premium Offering
            </div>
            <h3 className="text-xl font-bold text-theme-primary">Executive Partnership</h3>
            <p className="text-theme-tertiary text-sm">Full-service implementation support</p>
          </div>
          
          <div className="p-5 flex-grow">
            <div className="mb-4">
              <span className="text-sm text-theme-tertiary">Starting from</span>
              <div className="text-3xl font-bold text-theme-primary">£9,500</div>
            </div>
            
            <div className="space-y-4 mb-5">
              <p className="text-base text-theme-secondary">
                When ready for comprehensive support, our Executive Partnership provides white-glove implementation.
              </p>
              
              <h4 className="text-sm font-medium text-theme-primary border-b border-theme-border-light pb-1 mb-2">
                Future Access To:
              </h4>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#B92234] shrink-0 mt-0.5" />
                  <p className="text-theme-secondary">Dedicated implementation manager</p>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#B92234] shrink-0 mt-0.5" />
                  <p className="text-theme-secondary">Custom strategy development</p>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#B92234] shrink-0 mt-0.5" />
                  <p className="text-theme-secondary">6 months premium support</p>
                </li>
              </ul>
              
              <div className="bg-theme-bg-primary/30 p-4 rounded-lg border border-theme-border-light mt-4">
                <h4 className="font-medium text-theme-primary text-sm mb-1">Not quite ready yet?</h4>
                <p className="text-sm text-theme-tertiary">
                  Start with Foundation today, credit toward Executive when ready.
                </p>
              </div>
            </div>
            
            <Button
              onClick={onUpgradeSelect}
              variant="outline"
              size="lg"
              className="w-full min-h-[46px] border-[#B92234] text-[#B92234] hover:bg-[#B92234]/5"
            >
              Learn About Executive Partnership
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundationRecommendation;