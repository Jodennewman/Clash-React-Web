"use client";

import React, { useState } from 'react';
import { Section } from '../ui/section';
import { VSText, VSHeading, VSGradientText } from '../ui/vs-text';
import { VSBackground, VSCard, VSSection } from '../ui/vs-background';
import { AnimatedButton } from '../marble-buttons/AnimatedButton';
import { Badge } from '../ui/badge';
import { CircleCheck, Check, Zap, Award, Users } from 'lucide-react';
import { pricingTiers } from '../../data/pricing';
import { courseStats } from '../../lib/course-utils';

type PricingSimpleProps = {
  onCtaClick: () => void;
};

const PricingSimple: React.FC<PricingSimpleProps> = ({ onCtaClick }) => {
  const [isYearly, setIsYearly] = useState(true);
  
  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };
  
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
                
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <Badge 
            variant="outline" 
            className="bg-theme-primary/10 border-theme-primary/30 mb-4 py-2 px-4 mx-auto"
          >
            <VSText className="font-semibold text-theme-primary">
              Program Details
            </VSText>
          </Badge>
          
          <VSHeading 
            variant="h2" 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-theme-primary mb-6"
          >
            Choose Your Plan
          </VSHeading>
          
          <div className="body-text mb-6 mx-auto max-w-[90%] md:max-w-3xl">
            <p className="mb-4">
              Duration: 8 Weeks (ish)
            </p>
            <p className="mb-4">
              Commitment: 4 Hours a week
            </p>
            <p className="mb-4">
              Format: Online + Live Sessions
            </p>
            <p className="mb-4">
              Next Cohort: 25th April, 2025
            </p>
            <p className="mb-4">
              Class Size: limited to 20 students
            </p>
          </div>
          
          <div className="flex justify-center items-center gap-3 mt-6 mb-10">
            <span className={`text-sm ${!isYearly ? 'text-theme-primary font-bold' : 'text-theme-secondary'}`}>
              Monthly
            </span>
            <div 
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-7 rounded-full cursor-pointer transition-colors duration-300 ${isYearly ? 'bg-theme-accent' : 'bg-theme-secondary/30'}`}
            >
              <div 
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-theme-sm transition-transform duration-300 ${isYearly ? 'translate-x-8' : 'translate-x-1'}`}
              ></div>
            </div>
            <span className={`text-sm flex items-center ${isYearly ? 'text-theme-primary font-bold' : 'text-theme-secondary'}`}>
              Yearly
              <span className="bg-theme-accent/20 text-theme-accent ml-1.5 rounded-full px-2 py-0.5 text-xs">
                Save 20%
              </span>
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier, index) => {
            // Calculate pricing based on yearly/monthly selection
            const displayPrice = isYearly 
              ? Math.round(tier.basePrice * 0.8) / 100 
              : tier.basePrice / 100;
            
            // Calculate monthly price when displayed yearly
            const monthlyEquivalent = isYearly 
              ? Math.round((tier.basePrice * 0.8) / 1200) 
              : null;
            
            return (
              <VSCard
                key={tier.id}
                className={`p-8 rounded-xl shadow-theme-md relative overflow-hidden transition-all duration-300 hover-bubbly ${
                  tier.popular 
                    ? 'border-[2px] border-theme-accent scale-[1.02] lg:scale-[1.05] z-10' 
                    : 'border border-theme-border-light'
                }`}
                lightBg={tier.popular ? 'bg-theme-surface' : 'bg-theme-surface/70'}
                darkBg={tier.popular ? 'dark:bg-theme-surface' : 'dark:bg-theme-surface/70'}
              >
                {/* Theme-aware floating element for visual interest */}
                <div className="absolute -z-10 -bottom-8 -right-8 w-32 h-32 rounded-[40%] rotate-12 
                              opacity-theme-float bg-theme-float-primary animate-float-slow"></div>
                
                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute -right-12 top-7 w-40 transform rotate-45 bg-theme-accent py-1 text-white text-center text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                
                {/* Tier header with icon */}
                <div className="flex items-start mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-theme-gradient-primary text-white shadow-theme-sm`}>
                        {index === 0 ? <Users size={20} /> : index === 1 ? <Award size={20} /> : <Zap size={20} />}
                      </div>
                      <VSHeading variant="h3" className="text-xl font-bold text-theme-primary">
                        {tier.name}
                      </VSHeading>
                    </div>
                    <VSText className="text-theme-secondary text-sm max-w-[280px]">
                      {tier.description}
                    </VSText>
                  </div>
                </div>
                
                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-theme-primary">
                      {formatPrice(displayPrice)}
                    </span>
                    {!isYearly ? (
                      <span className="text-theme-secondary ml-2">/month</span>
                    ) : (
                      <span className="text-theme-secondary ml-2">/year</span>
                    )}
                  </div>
                  
                  {isYearly && monthlyEquivalent && (
                    <div className="text-theme-secondary text-sm">
                      Just {formatPrice(monthlyEquivalent)}/month, billed annually
                    </div>
                  )}
                </div>
                
                {/* CTA Button */}
                <div className="mb-8">
                  <AnimatedButton
                    text={tier.ctaText}
                    variant={tier.popular ? "accent" : "start"}
                    saturation={tier.popular ? "high" : "normal"}
                    size="md"
                    onClick={onCtaClick}
                    className="w-full"
                  />
                </div>
                
                {/* Features list */}
                <div>
                  <VSText className="text-theme-primary font-medium mb-4">
                    What's included:
                  </VSText>
                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-theme-accent mr-2 flex-shrink-0 mt-0.5" />
                        <VSText className="text-theme-secondary">{feature}</VSText>
                      </li>
                    ))}
                  </ul>
                </div>
              </VSCard>
            );
          })}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <VSText className="text-theme-secondary text-lg mb-6">
            Not sure which plan is right for you? Let us help you decide.
          </VSText>
          <AnimatedButton
            text="Find Your Perfect Plan"
            variant="accent"
            saturation="high"
            size="lg" 
            onClick={onCtaClick}
            className="mx-auto"
          />
        </div>
      </div>
    </VSSection>
  );
};

export default PricingSimple;