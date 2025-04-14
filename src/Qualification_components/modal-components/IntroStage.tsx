import React from 'react';
import { BarChart4, Clock, Award, Users, Compass, ChevronRight } from 'lucide-react';
import { Button } from "../../components/ui/button";

interface IntroStageProps {
  onNext: () => void;
  onClose: () => void;
}

const IntroStage: React.FC<IntroStageProps> = ({ onNext, onClose }) => {
  return (
    <div className="p-5 md:p-6">
      <div className="flex flex-col space-y-6">
        {/* Main title section with more vibrant styling */}
        <div className="vs-gradient-coral-orange rounded-xl p-4 flex items-center shadow-theme-md">
          <div className="min-w-[44px] h-11 rounded-full bg-white/20 flex items-center justify-center mr-3 backdrop-blur-sm">
            <Compass size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-white font-medium text-base md:text-lg mb-1">Find Your Perfect Path</h3>
            <p className="text-white/90 text-sm">
              Discover the ideal implementation approach for your content strategy
            </p>
          </div>
        </div>
        
        {/* Social proof badge with enhanced styling */}
        <div className="flex items-center gap-2 text-sm bg-theme-gradient-primary/10 border border-theme-primary/20 rounded-full px-3 py-1.5 mb-2 w-fit mx-auto shadow-theme-sm">
          <Users size={14} className="text-theme-primary"/>
          <span className="text-theme-primary font-medium">Trusted by 1,200+ clients in 27 industries</span>
        </div>
        
        {/* Mini Feature Showcase - Improved with more vibrant styling */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Feature 1 */}
          <div className="bg-theme-gradient-primary/5 p-3 rounded-lg shadow-theme-sm border border-theme-primary/10 hover:shadow-theme-md transition-all duration-300">
            <div className="flex items-center mb-2">
              <div className="p-1.5 rounded-full vs-gradient-orange flex items-center justify-center mr-2 shadow-theme-sm">
                <BarChart4 size={16} className="text-white" />
              </div>
              <h4 className="font-medium text-theme-primary text-sm">800M+ Views</h4>
            </div>
            <p className="text-sm text-theme-secondary">Generated for 120+ clients</p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-theme-gradient-secondary/5 p-3 rounded-lg shadow-theme-sm border border-theme-accent-secondary/10 hover:shadow-theme-md transition-all duration-300">
            <div className="flex items-center mb-2">
              <div className="p-1.5 rounded-full vs-gradient-teal flex items-center justify-center mr-2 shadow-theme-sm">
                <Clock size={16} className="text-white" />
              </div>
              <h4 className="font-medium text-theme-accent-secondary text-sm">42% Growth</h4>
            </div>
            <p className="text-sm text-theme-secondary">30-day audience increase</p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-theme-gradient-accent/5 p-3 rounded-lg shadow-theme-sm border border-theme-accent-tertiary/10 hover:shadow-theme-md transition-all duration-300">
            <div className="flex items-center mb-2">
              <div className="p-1.5 rounded-full vs-gradient-coral-orange flex items-center justify-center mr-2 shadow-theme-sm">
                <Award size={16} className="text-white" />
              </div>
              <h4 className="font-medium text-theme-accent-tertiary text-sm">7-Figure ROI</h4>
            </div>
            <p className="text-sm text-theme-secondary">Proven in 27 industries</p>
          </div>
        </div>
        
        {/* Process steps - more streamlined and informative */}
        <div className="bg-theme-gradient/5 rounded-lg p-4 border border-theme-border-light">
          <h4 className="text-sm font-medium text-theme-primary mb-2">60-Second Assessment</h4>
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-theme-accent-secondary-light text-white font-bold text-sm flex items-center justify-center mb-2 shadow-theme-sm">1</div>
              <span className="text-theme-secondary text-sm text-center">Quick<br/>Assessment</span>
            </div>
            
            <div className="hidden sm:block text-theme-primary text-lg">→</div>
            <div className="block sm:hidden text-theme-primary text-lg rotate-90">↓</div>
            
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-theme-gradient-secondary text-white text-sm flex items-center justify-center mb-2 shadow-theme-sm">2</div>
              <span className="text-theme-secondary text-sm text-center">Custom<br/>Solution</span>
            </div>
            
            <div className="hidden sm:block text-theme-primary text-lg">→</div>
            <div className="block sm:hidden text-theme-primary text-lg rotate-90">↓</div>
            
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-theme-gradient-accent text-white text-sm flex items-center justify-center mb-2 shadow-theme-sm">3</div>
              <span className="text-theme-secondary text-sm text-center">Start<br/>Growing</span>
            </div>
          </div>
        </div>

        {/* Call to action section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="bg-theme-gradient-primary/10 rounded-full px-4 py-2 text-sm text-center text-theme-primary font-medium">
            No obligation | Personalized recommendations
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="ghost"
              size="lg"
              className="min-h-[44px]"
            >
              Maybe later
            </Button>
            
            <Button
              onClick={onNext}
              variant="default"
              size="lg"
              className="flex items-center gap-1 min-h-[44px] px-5"
            >
              Start Now
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroStage;