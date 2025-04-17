"use client";

import React from 'react';
import { VSText, VSHeading, VSGradientText } from '../ui/vs-text';
import { VSBackground, VSCard, VSSection } from '../ui/vs-background';
import { AnimatedButton } from '../marble-buttons/AnimatedButton';
import { Badge } from '../ui/badge';
import { Check, Settings, Users, Calendar, BookOpen, Zap } from 'lucide-react';

type CustomisationProps = {
  onCtaClick: () => void;
};

const Customisation: React.FC<CustomisationProps> = ({ onCtaClick }) => {
  // Custom options available
  const customOptions = [
    {
      icon: <Users className="h-5 w-5" />,
      title: "Team Onboarding",
      description: "Custom training for your marketing team to implement the strategies"
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: "Implementation Workshop",
      description: "Hands-on session to help you set up systems and workflows"
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Custom Modules",
      description: "Additional content specific to your industry or business model"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Accelerated Timeline",
      description: "Fast-track implementation with dedicated support"
    }
  ];

  return (
    <VSSection 
      lightBg="bg-theme-gradient"
      darkBg="dark:bg-theme-gradient"
      className="py-24 relative overflow-hidden"
    >
      {/* Theme-aware floating elements */}
      <div className="absolute -z-10 top-20 left-[10%] w-32 h-32 rounded-[40%] rotate-12 
                 opacity-theme-float bg-theme-float-primary animate-float-slow"></div>
      <div className="absolute -z-10 bottom-20 right-[15%] w-36 h-36 rounded-[35%] -rotate-6 
                 opacity-theme-float-secondary bg-theme-float-secondary animate-float-medium"></div>
                 
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge 
              variant="outline" 
              className="bg-theme-primary/10 border-theme-primary/30 mb-4 py-2 px-4 mx-auto"
            >
              <VSText className="font-semibold flex items-center gap-2 text-theme-primary">
                <Settings className="h-4 w-4" /> Tailored Solutions
              </VSText>
            </Badge>
            
            <VSHeading 
              variant="h2" 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-theme-primary mb-6"
            >
              Customisation
            </VSHeading>
            
            <div className="body-text mb-6 mx-auto max-w-[90%] md:max-w-3xl">
              <p>
                The vertical shortcut is designed to work for everyone, but we understand as founders, you're not everyone. So you think you'll need something more bespoke, we're able to tailor the offering to you, additional possibilities depending.
              </p>
            </div>
          </div>
          
          <VSCard 
            className="p-8 md:p-12 rounded-xl shadow-theme-md mb-10 overflow-hidden relative"
            lightBg="bg-theme-surface"
          >
            <div className="grid gap-8 md:grid-cols-2">
              {customOptions.map((option, index) => (
                <div key={index} className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-theme-gradient-button rounded-xl">
                    <div className="text-theme-on-primary">
                      {option.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-theme-primary mb-2">
                      {option.title}
                    </h3>
                    <p className="text-theme-secondary">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 pt-6 border-t border-theme-border-light">
              <VSHeading variant="h3" className="text-xl md:text-2xl font-bold text-theme-primary mb-4">
                Why Customise?
              </VSHeading>
              
              <ul className="space-y-3 mb-6">
                {[
                  "Get specific solutions tailored to your industry",
                  "Scale faster with done-for-you implementations",
                  "Train your entire team at once with custom workshops",
                  "Overcome specific challenges with personalized guidance"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-theme-accent mr-2 flex-shrink-0 mt-0.5" />
                    <VSText className="text-theme-secondary">{item}</VSText>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 flex justify-center md:justify-start">
                <AnimatedButton 
                  text="Find your plan"
                  variant="accent" 
                  saturation="high"
                  size="lg"
                  onClick={onCtaClick}
                  className="w-full md:w-auto"
                />
              </div>
            </div>
          </VSCard>
          
          <div className="text-center mt-16">
            <p className="text-theme-secondary mb-6">
              Not sure what you need? Book a call and we'll help you figure it out.
            </p>
            <AnimatedButton 
              text="Book a 15-min chat"
              variant="start" 
              saturation="medium"
              size="lg"
              onClick={onCtaClick}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </VSSection>
  );
};

export default Customisation;