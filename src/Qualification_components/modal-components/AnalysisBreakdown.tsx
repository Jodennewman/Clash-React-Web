import React from 'react';
import { Button } from "../../components/ui/button";

interface AnalysisBreakdownProps {
  answers: any;
  score: number;
  onContinue: () => void;
}

const AnalysisBreakdown: React.FC<AnalysisBreakdownProps> = ({ 
  answers, 
  score, 
  onContinue 
}) => {
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
  
  // Get appropriate background color based on score
  const scoreColorClass = score >= 8 
    ? 'bg-vs-gradient-coral-orange'
    : score >= 5 
      ? 'bg-vs-gradient-primary-accent'
      : 'bg-vs-gradient-teal';
  
  return (
    <div className="p-5 md:p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-bold text-theme-primary mb-3">Your Implementation Analysis</h3>
          
          <p className="text-theme-secondary text-base mb-6">
            We've analyzed your responses to find the implementation approach that best matches your needs
          </p>
        </div>
        
        {/* Factor breakdown - more visually appealing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          <div className="space-y-3 p-4 bg-theme-bg-surface/50 rounded-lg border border-theme-border-light">
            <h4 className="text-sm font-medium text-theme-primary flex items-center">
              <span className="inline-block w-3 h-3 bg-theme-primary rounded-full mr-2"></span>
              Team Structure
            </h4>
            <div className="h-4 bg-theme-bg-surface rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-theme-primary rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${percentages.teamSize}%` }}
              />
            </div>
            <p className="text-sm text-theme-tertiary">
              {answers.teamSize === '25' ? 'Large organization' :
               answers.teamSize === '15' ? 'Mid-size team' :
               answers.teamSize === '5' ? 'Small team' : 'Solo creator'}
            </p>
          </div>
          
          <div className="space-y-3 p-4 bg-theme-bg-surface/50 rounded-lg border border-theme-border-light">
            <h4 className="text-sm font-medium text-theme-primary flex items-center">
              <span className="inline-block w-3 h-3 bg-theme-primary rounded-full mr-2"></span>
              Implementation Support
            </h4>
            <div className="h-4 bg-theme-bg-surface rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-theme-primary rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${percentages.support}%` }}
              />
            </div>
            <p className="text-sm text-theme-tertiary">
              {answers.implementationSupport === 'full_service' ? 'Hands-on support' :
               answers.implementationSupport === 'guided' ? 'Coaching & support' :
               answers.implementationSupport === 'self_directed' ? 'Self-guided' : 'Flexible'}
            </p>
          </div>
          
          <div className="space-y-3 p-4 bg-theme-bg-surface/50 rounded-lg border border-theme-border-light">
            <h4 className="text-sm font-medium text-theme-primary flex items-center">
              <span className="inline-block w-3 h-3 bg-theme-primary rounded-full mr-2"></span>
              Timeline
            </h4>
            <div className="h-4 bg-theme-bg-surface rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-theme-primary rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${percentages.timeline}%` }}
              />
            </div>
            <p className="text-sm text-theme-tertiary">
              {answers.timeline === 'immediate' ? 'Ready now' :
               answers.timeline === 'next_quarter' ? 'Next quarter' :
               answers.timeline === 'exploratory' ? 'Planning phase' : 'Flexible'}
            </p>
          </div>
          
          <div className="space-y-3 p-4 bg-theme-bg-surface/50 rounded-lg border border-theme-border-light">
            <h4 className="text-sm font-medium text-theme-primary flex items-center">
              <span className="inline-block w-3 h-3 bg-theme-primary rounded-full mr-2"></span>
              Content Vision
            </h4>
            <div className="h-4 bg-theme-bg-surface rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-theme-primary rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${percentages.volume}%` }}
              />
            </div>
            <p className="text-sm text-theme-tertiary">
              {answers.contentVolume === 'high' ? 'Content engine' :
               answers.contentVolume === 'medium' ? 'Consistent publishing' :
               answers.contentVolume === 'low' ? 'Focused content' : 'Strategic approach'}
            </p>
          </div>
        </div>
        
        {/* Implementation match - improved visual appearance */}
        <div className={`p-5 rounded-lg shadow-md text-white ${scoreColorClass}`}>
          <h4 className="font-semibold text-white text-lg mb-2">Your Implementation Match</h4>
          <p className="text-base text-white/90 mb-3">
            {score >= 8 ? 
              'Your needs align with our Executive Partnership approach for complex teams with hands-on support and ambitious content goals.' :
             score >= 5 ?
              'Your profile fits our Comprehensive Implementation approach for growing teams with balanced support needs.' :
              'The Foundation Program is your ideal starting point. This self-paced approach helps you build momentum at your own pace.'}
          </p>
          
          {/* Visual score indicator */}
          <div className="flex items-center justify-center mt-2">
            <div className="bg-white/20 rounded-full px-4 py-1.5 text-white font-medium text-sm">
              Match Score: {score}/11
            </div>
          </div>
        </div>
        
        <div className="flex justify-center pt-2">
          <Button
            onClick={onContinue}
            variant="default"
            size="lg"
            className="px-6 min-h-[46px]"
          >
            See My Recommendation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisBreakdown;