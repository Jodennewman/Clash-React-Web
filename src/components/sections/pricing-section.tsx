// src/components/sections/pricing-section.tsx
import React, { useState } from 'react';
import { Section } from '../ui/section';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Book, Award, Zap, Check, X, Shield } from 'lucide-react';
import ReactDOM from 'react-dom/client';
import { AnimatedButton } from "../marble-buttons/AnimatedButton";

// Import data and utility from your pricing.ts file
import {
  pricingTiers,
  pricingConfig,
  moduleCategories,
  supportFeatures,
  quizSteps
} from '../../data/pricing';

// Import course information from course-utils for all course data access
import courseUtils from '../../lib/course-utils';

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

// Module preview component
const ModulePreview = () => {
  // Use category data from pricing module, but pull in stats from course-utils
  const categoryNames = Object.keys(moduleCategories).sort();
  const midpoint = Math.ceil(categoryNames.length / 2);
  
  // Access stats from course-utils as the single source of truth
  const stats = courseUtils.courseStats;
  const totalModules = stats.totalModules || 0;
  const totalHours = stats.totalHours || 0;
  const totalCategories = courseUtils.tracks.length || 0;

  return (
    <div className="relative overflow-hidden 
                  vs-btn-primary-gradient/80 
                  bg-theme-gradient
                  border border-white/10
                  shadow-theme-sm
                  rounded-xl p-6 mt-8">
      
      {/* Floating elements for visual interest */}
      <div className="absolute -z-10 top-20 left-20 w-16 h-16 rounded-[40%] rotate-12 opacity-5 
                    bg-[var(--theme-primary)] animate-float-slow hidden dark:hidden"></div>
      <div className="absolute -z-10 bottom-10 right-20 w-24 h-24 rounded-[30%] -rotate-6 opacity-5
                    bg-[var(--theme-accent-tertiary)] animate-float-medium hidden dark:hidden"></div>
                    
      {/* Dark mode floating elements */}
      <div className="absolute -z-10 top-20 left-20 w-16 h-16 rounded-[40%] rotate-12 opacity-10 
                    vs-btn-primary-gradient 
                    animate-float-slow hidden dark:block"></div>
      <div className="absolute -z-10 bottom-10 right-20 w-24 h-24 rounded-[30%] -rotate-6 opacity-10
                    vs-btn-secondary-gradient 
                    animate-float-medium hidden dark:block"></div>
      
      <h3 className="text-xl font-semibold mb-6 text-theme-custom ">Comprehensive Learning Tracks</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Column 1 */}
        <div className="space-y-2">
          {categoryNames.slice(0, midpoint).map((category, index) => (
            <div
              key={index}
              className="flex justify-between items-center group rounded-lg p-2 hover:bg-theme-bg-surface/10 dark:hover:bg-theme-bg-surface/10 transition-colors"
            >
              <div className="text-theme-custom/80 /80">{category}</div>
              <div className="text-theme-primary-light  text-sm">{moduleCategories[category]?.length || 0}</div>
            </div>
          ))}
        </div>

        {/* Column 2 */}
        <div className="space-y-2">
          {categoryNames.slice(midpoint).map((category, index) => (
            <div
              key={index}
              className="flex justify-between items-center group rounded-lg p-2 hover:bg-theme-bg-surface/10 dark:hover:bg-theme-bg-surface/10 transition-colors"
            >
              <div className="text-theme-custom/80 /80">{category}</div>
              <div className="text-theme-primary-light  text-sm">{moduleCategories[category]?.length || 0}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="bg-[var(--theme-bg-secondary)]/50 /50 backdrop-blur-sm px-6 py-3 rounded-lg flex items-center gap-4 border border-theme-border-light-card-shadow">
          <div className="text-center">
            <div className="text-2xl font-bold text-theme-primary-light ">{totalModules}+</div>
            <div className="text-sm text-theme-custom/60 /60">Lessons</div>
          </div>
          <div className="h-10 w-px bg-theme-bg-surface/10"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-theme-primary-light ">{totalCategories}</div>
            <div className="text-sm text-theme-custom/60 /60">Learning Tracks</div>
          </div>
          <div className="h-10 w-px bg-theme-bg-surface/10"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-theme-primary-light ">{totalHours}+</div>
            <div className="text-sm text-theme-custom/60 /60">Hours</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Comparison table component
const ComparisonTable = () => {
  const categoryNames = Object.keys(moduleCategories);

  return (
    <div className="mt-12 overflow-x-auto relative">
      <h3 className="text-2xl font-semibold mb-6 text-theme-custom ">Plan Comparison</h3>
      <div className="min-w-full rounded-xl overflow-hidden
                      border border-white/10 dark:border-theme-border-light-[2px_2px_8px_rgba(0,0,0,0.1)] 
                      shadow-theme-">
        <table className="w-full">
          <thead>
            <tr className="vs-btn-primary-gradient 
                         bg-theme-gradient dark:from-[var(--theme-bg-primary)]">
              <th className="p-4 text-left text-theme-custom ">Feature</th>
              <th className="p-4 text-center text-theme-custom ">Brand Blueprint</th>
              <th className="p-4 text-center text-theme-custom ">Authority Automator</th>
              <th className="p-4 text-center text-theme-custom ">Viral Growth Machine</th>
            </tr>
          </thead>
          <tbody>
            {/* Learning tracks section */}
            <tr className="bg-[var(--theme-bg-secondary)]/50 /50">
              <td colSpan={4} className="p-4 font-semibold text-theme-custom ">
                Learning Tracks
              </td>
            </tr>

            {categoryNames.map((category, idx) => {
              // Blueprint has access to first 4 tracks
              const blueprintAccess = idx < 4;
              // Automator has access to first 8 tracks
              const automatorAccess = idx < 8;
              // Growth has access to all tracks
              const growthAccess = true;

              return (
                <tr key={category} className="border-t border-theme-border-light-theme-bg-surface/5 dark:hover:bg-theme-bg-surface/5 transition-colors">
                  <td className="p-4 text-theme-custom/80 /80">{category}</td>
                  <td className="p-4 text-center">
                    {blueprintAccess ? (
                      <Check className="h-5 w-5 text-theme-primary-light  mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-theme-custom/30 /30 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {automatorAccess ? (
                      <Check className="h-5 w-5 text-theme-accent  mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-theme-custom/30 /30 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {growthAccess ? (
                      <Check className="h-5 w-5 text-theme-accent-quaternary  mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-theme-custom/30 /30 mx-auto" />
                    )}
                  </td>
                </tr>
              );
            })}

            {/* Support features section */}
            <tr className="bg-[var(--theme-bg-secondary)]/50 /50">
              <td colSpan={4} className="p-4 font-semibold text-theme-custom ">
                Support &amp; Features
              </td>
            </tr>

            {supportFeatures.map((feature, idx) => (
              <tr key={idx} className="border-t border-theme-border-light-theme-bg-surface/5 dark:hover:bg-theme-bg-surface/5 transition-colors">
                <td className="p-4 text-theme-custom/80 /80">{feature.name}</td>
                <td className="p-4 text-center">
                  {feature.blueprint ? (
                    <Check className="h-5 w-5 text-theme-primary-light  mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-theme-custom/30 /30 mx-auto" />
                  )}
                </td>
                <td className="p-4 text-center">
                  {feature.automator ? (
                    <Check className="h-5 w-5 text-theme-accent  mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-theme-custom/30 /30 mx-auto" />
                  )}
                </td>
                <td className="p-4 text-center">
                  {feature.growth ? (
                    <Check className="h-5 w-5 text-theme-accent-quaternary  mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-theme-custom/30 /30 mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// FAQ section
const PricingFAQ = () => {
  return (
    <div className="mt-16 relative">
      {/* Add subtle floating elements */}
      <div className="absolute -z-10 top-10 right-1/4 w-16 h-16 rounded-[40%] rotate-12 opacity-5 
                    bg-[var(--theme-primary)] animate-float-slow hidden dark:hidden"></div>
      <div className="absolute -z-10 bottom-10 left-1/4 w-20 h-20 rounded-[30%] -rotate-6 opacity-5
                    bg-[var(--theme-accent-tertiary)] animate-float-medium hidden dark:hidden"></div>
                    
      {/* Dark mode floating elements */}
      <div className="absolute -z-10 top-10 right-1/4 w-16 h-16 rounded-[40%] rotate-12 opacity-10 
                    vs-btn-primary-gradient 
                    animate-float-slow hidden dark:block"></div>
      <div className="absolute -z-10 bottom-10 left-1/4 w-20 h-20 rounded-[30%] -rotate-6 opacity-10
                    vs-btn-secondary-gradient 
                    animate-float-medium hidden dark:block"></div>
    
      <h3 className="text-2xl font-semibold mb-6 text-theme-custom ">Frequently Asked Questions</h3>
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="item-1" className="border border-white/10 dark:border-theme-border-light-lg overflow-hidden
                                              shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
                                              shadow-theme-
                                              bg-[var(--theme-bg-primary)]/50 dark:bg-[var(--theme-bg-primary)]/50 backdrop-blur-sm hover-bubbly-sm">
          <AccordionTrigger className="px-4 py-4 hover:bg-theme-bg-surface/5 dark:hover:bg-theme-bg-surface/5 text-theme-custom ">
            How is this different from other content courses?
          </AccordionTrigger>
          <AccordionContent className="px-4 py-4 bg-[var(--theme-bg-secondary)]/50 /50 text-theme-custom/80 /80">
            Unlike most courses that focus only on tactics, we teach a comprehensive system that's
            been proven with real founders across industries, generating over 800M organic views.
            This is the exact framework we use at our agency, not theory but battle-tested processes
            for sustainable growth.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border border-white/10 dark:border-theme-border-light-lg overflow-hidden
                                              shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
                                              shadow-theme-
                                              bg-[var(--theme-bg-primary)]/50 dark:bg-[var(--theme-bg-primary)]/50 backdrop-blur-sm hover-bubbly-sm">
          <AccordionTrigger className="px-4 py-4 hover:bg-theme-bg-surface/5 dark:hover:bg-theme-bg-surface/5 text-theme-custom ">
            How much time do I need to commit?
          </AccordionTrigger>
          <AccordionContent className="px-4 py-4 bg-[var(--theme-bg-secondary)]/50 /50 text-theme-custom/80 /80">
            The course is designed for busy founders. You can progress at your own pace, with most
            modules taking 20-30 minutes to complete. Implementing what you learn may take 2-4 hours
            per week, but this replaces inefficient content creation time you're likely already
            spending.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border border-white/10 dark:border-theme-border-light-lg overflow-hidden
                                              shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
                                              shadow-theme-
                                              bg-[var(--theme-bg-primary)]/50 dark:bg-[var(--theme-bg-primary)]/50 backdrop-blur-sm hover-bubbly-sm">
          <AccordionTrigger className="px-4 py-4 hover:bg-theme-bg-surface/5 dark:hover:bg-theme-bg-surface/5 text-theme-custom ">
            Do I need to be on camera for this to work?
          </AccordionTrigger>
          <AccordionContent className="px-4 py-4 bg-[var(--theme-bg-secondary)]/50 /50 text-theme-custom/80 /80">
            While founder-led content often performs best, we have modules specifically covering
            different content approaches, including ways to create high-performing content without
            being on camera. Our system works regardless of your comfort level with being the face
            of your brand.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="border border-white/10 dark:border-theme-border-light-lg overflow-hidden
                                              shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
                                              shadow-theme-
                                              bg-[var(--theme-bg-primary)]/50 dark:bg-[var(--theme-bg-primary)]/50 backdrop-blur-sm hover-bubbly-sm">
          <AccordionTrigger className="px-4 py-4 hover:bg-theme-bg-surface/5 dark:hover:bg-theme-bg-surface/5 text-theme-custom ">
            Which plan is right for me?
          </AccordionTrigger>
          <AccordionContent className="px-4 py-4 bg-[var(--theme-bg-secondary)]/50 /50 text-theme-custom/80 /80">
            The Brand Blueprint is perfect if you're self-motivated and want the core system. The
            Authority Automator adds group coaching and feedback to accelerate results. The Viral
            Growth Machine is for founders who want maximum support with custom strategy and direct
            agency access. Not sure? Take our quiz or schedule a call to help you decide.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="border border-white/10 dark:border-theme-border-light-lg overflow-hidden
                                              shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
                                              shadow-theme-
                                              bg-[var(--theme-bg-primary)]/50 dark:bg-[var(--theme-bg-primary)]/50 backdrop-blur-sm hover-bubbly-sm">
          <AccordionTrigger className="px-4 py-4 hover:bg-theme-bg-surface/5 dark:hover:bg-theme-bg-surface/5 text-theme-custom ">
            How long do I have access to the course?
          </AccordionTrigger>
          <AccordionContent className="px-4 py-4 bg-[var(--theme-bg-secondary)]/50 /50 text-theme-custom/80 /80">
            You'll have lifetime access to the course materials, including all future updates. The
            coaching and support components of higher-tier plans run for the duration specified in
            each package (typically 3-6 months).
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6" className="border border-white/10 dark:border-theme-border-light-lg overflow-hidden
                                              shadow-[2px_2px_8px_rgba(0,0,0,0.05)] 
                                              shadow-theme-
                                              bg-[var(--theme-bg-primary)]/50 dark:bg-[var(--theme-bg-primary)]/50 backdrop-blur-sm hover-bubbly-sm">
          <AccordionTrigger className="px-4 py-4 hover:bg-theme-bg-surface/5 dark:hover:bg-theme-bg-surface/5 text-theme-custom ">
            Can I upgrade my plan later?
          </AccordionTrigger>
          <AccordionContent className="px-4 py-4 bg-[var(--theme-bg-secondary)]/50 /50 text-theme-custom/80 /80">
            Yes! You can upgrade to a higher-tier plan at any time. We'll simply credit your initial
            investment toward the upgraded plan price.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

// Inline quiz component
// (If you prefer the quiz in its own modal file, see pricing-quiz-modal.tsx example)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PlanQuiz = ({ onComplete }: { onComplete: (result: number) => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = (value: string) => {
    const currentQuestion = quizSteps[currentStep];
    setAnswers({
      ...answers,
      [currentQuestion.key]: value
    });
  };

  const handleNext = () => {
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate recommendation
      calculateRecommendation();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateRecommendation = () => {
    // Default to Blueprint
    let recommendation = 0;

    // Rule 1: If involvement is "none" OR speed is "fast" => Growth Engine
    if (answers.involvement === "none" || answers.speed === "fast") {
      recommendation = 2; // Viral Growth
    }
    // Rule 2: If journey is beginner/started + involvement=hands-on + speed=slow => Blueprint
    else if (
      (answers.journey === "beginner" || answers.journey === "started") &&
      answers.involvement === "hands-on" &&
      answers.speed === "slow"
    ) {
      recommendation = 0; // Brand Blueprint
    }
    // Rule 3: Otherwise => Authority Automator
    else {
      recommendation = 1; // Authority Automator
    }

    onComplete(recommendation);
  };

  const currentQuestion = quizSteps[currentStep];
  const isOptionSelected = currentQuestion && answers[currentQuestion.key];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-theme-on-primary/60">
          Step {currentStep + 1} of {quizSteps.length}
        </div>
        <div className="flex gap-2">
          {Array(quizSteps.length)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 w-6 rounded-full ${
                  idx <= currentStep ? "bg-[#FEA35D]" : "bg-white/20"
                }`}
              />
            ))}
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>

      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              answers[currentQuestion.key] === option.value
                ? "border-[#FEA35D] bg-[#FEA35D]/10"
                : "border-white/10 hover:border-white/30"
            }`}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="border-theme-border-light"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isOptionSelected}
          className="bg-[#FEA35D] hover:bg-[#F89A67]"
        >
          {currentStep === quizSteps.length - 1 ? "See My Result" : "Next"}
        </Button>
      </div>
    </div>
  );
};

// Main Pricing page component
export const PricingSection = () => {
  const [useInstallments, setUseInstallments] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showQuiz, setShowQuiz] = useState(false);
  const [recommendedPlan, setRecommendedPlan] = useState<number | null>(null);
  const [showPricingSection, setShowPricingSection] = useState(true);
  // Use courseUtils instead of local calculation
  const pricingStats = courseUtils.courseStats;

  // Price logic
  const calculateDisplayPrice = (tier: number) => {
    const base = pricingTiers[tier].basePrice;
    let finalPrice = base;

    // Apply promotional discount if applicable
    if (pricingConfig.promotionalOffer && pricingConfig.promotionalOfferTiers[tier]) {
      finalPrice = base * (1 - pricingConfig.promotionalDiscount);
    }

    // Apply installment markup if selected
    if (useInstallments) {
      // Only apply markup if no promotion or discount doesn't include installments
      if (!pricingConfig.promotionalOffer || !pricingConfig.discountIncludesInstallment) {
        finalPrice = finalPrice * (1 + pricingConfig.installmentMarkup);
      }
      // Divide by number of installments
      finalPrice = finalPrice / pricingConfig.installmentMonths;
    }

    return {
      displayPrice: formatPrice(finalPrice),
      originalPrice:
        pricingConfig.promotionalOffer && pricingConfig.promotionalOfferTiers[tier]
          ? formatPrice(base)
          : null,
      perInstallment: useInstallments ? `${pricingConfig.installmentMonths} payments of` : null
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleQuizComplete = (result: number) => {
    setRecommendedPlan(result);
    setShowQuiz(false);
    setShowPricingSection(true);

    // Scroll to recommended plan
    setTimeout(() => {
      const element = document.getElementById(`plan-${pricingTiers[result].id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        // Add highlight effect
        element.classList.add("ring-4", "ring-[#FEA35D]", "ring-opacity-50");
        setTimeout(() => {
          element.classList.remove("ring-4", "ring-[#FEA35D]", "ring-opacity-50");
        }, 3000);
      }
    }, 500);
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case "blueprint":
        return <Book className="h-6 w-6 text-[#FEA35D]" />;
      case "automator":
        return <Award className="h-6 w-6 text-[#387292]" />;
      case "growth":
        return <Zap className="h-6 w-6 text-[#B92234]" />;
      default:
        return null;
    }
  };

  // Get course stats from courseUtils
  const totalCategories = courseUtils.tracks.length || 0;
  const totalModules = courseUtils.courseStats.totalModules || 0;

  const getTrackAccessContent = (tierIndex: number) => {
    const plan = pricingTiers[tierIndex];
    if (plan.trackAccess === "all") {
      return (
        <div className="text-theme-on-primary/80 mt-2">
          <p>
            <span className="text-theme-on-primary-semibold">
              All {totalCategories} learning tracks
            </span>{" "}
            with {totalModules}+ lessons
          </p>
        </div>
      );
    } else {
      return (
        <div className="text-theme-on-primary/80 mt-2">
          <p>
            <span className="text-theme-on-primary-semibold">{plan.trackAccess.length} key learning tracks</span>{" "}
            with focus on core skills
          </p>
        </div>
      );
    }
  };

  return (
    <Section id="pricing" className="py-24 vs-section-dark border-t" style={{ borderColor: 'rgba(var(--secondary-teal-rgb), 0.3)' }}>
      <div className="container mx-auto px-4 relative">
        {/* Floating elements for visual interest - light mode */}
        <div className="absolute top-20 left-10 w-16 h-16 rounded-[40%] rotate-12 opacity-5 vs-float-element-light-1"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-[30%] -rotate-6 opacity-8 vs-float-element-light-2"></div>
        
        {/* Dark mode floating elements */}
        <div className="absolute top-20 left-10 w-16 h-16 rounded-[40%] rotate-12 vs-float-element-dark-1"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-[30%] -rotate-6 vs-float-element-dark-2"></div>
                      
        <div className="text-center mb-16 relative z-10">
          <Badge variant="outline" className="vs-accent-badge mb-4 py-2 px-4">
            Your Growth Path
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-theme-on-primary">Choose Your Content Strategy</h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Access the proven system that has generated over 800M views and helped founders grow
            engaged communities and drive revenue.
          </p>

          <div className="mt-8 flex flex-wrap gap-6 justify-center items-center">
            <div className="flex items-center gap-4 backdrop-blur-sm px-4 py-2 rounded-full border vs-card-shadow" 
                 style={{ 
                   backgroundColor: 'rgba(var(--bg-navy-darker-rgb), 0.5)', 
                   borderColor: 'rgba(255, 255, 255, 0.05)' 
                 }}>
              <div className="text-center px-3">
                <div className="text-2xl font-bold bg-[var(--theme-primary)]">{pricingStats.totalModules}+</div>
                <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Lessons</div>
              </div>
              <div className="h-8 w-px" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}></div>
              <div className="text-center px-3">
                <div className="text-2xl font-bold bg-[var(--theme-primary)]">{pricingStats.totalCategories}</div>
                <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Tracks</div>
              </div>
              <div className="h-8 w-px" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}></div>
              <div className="text-center px-3">
                <div className="text-2xl font-bold bg-[var(--theme-primary)]">{pricingStats.totalHours}+</div>
                <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Hours</div>
              </div>
            </div>

            {/* Top Text & Quiz CTA */}
            <div className="text-center mb-16">
              <p className="mb-6 max-w-2xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Choose the plan that's right for your goals. All plans include personalized coaching, community access, and implementation resources.
              </p>
              <AnimatedButton 
                text="Take the Quiz"
                variant="pro"
                saturation="subtle"
                size="md"
                onClick={() => {
                  // Import and open the enhanced VS pricing quiz modal
                  import('./pricing-quiz-modal').then(module => {
                    const VSPricingQuizModal = module.PricingQuizModal;
                    // Create a div to mount the modal
                    const modalContainer = document.createElement('div');
                    document.body.appendChild(modalContainer);
                    
                    // Render the enhanced quiz modal
                    const root = ReactDOM.createRoot(modalContainer);
                    root.render(
                      <VSPricingQuizModal 
                        onComplete={(plan) => {
                          // Scroll to the recommended plan
                          document.getElementById(`pricing-tier-${plan}`)?.scrollIntoView({ behavior: 'smooth' });
                          // Clean up
                          setTimeout(() => {
                            root.unmount();
                            document.body.removeChild(modalContainer);
                          }, 500);
                        }} 
                      />
                    );
                  });
                }}
                className="flex items-center justify-center gap-2 w-auto"
              />
            </div>
          </div>
        </div>

        {showPricingSection && (
          <>
            {/* Payment Option Toggle */}
            <div className="flex justify-center mb-10">
              <div className="flex items-center gap-4 backdrop-blur-sm px-6 py-3 rounded-full border hover-bubbly-sm vs-card-shadow" 
                   style={{ 
                     backgroundColor: 'rgba(var(--bg-navy-darker-rgb), 0.5)', 
                     borderColor: 'rgba(255, 255, 255, 0.05)' 
                   }}>
                <span
                  style={{ 
                    color: !useInstallments ? 'white' : 'rgba(255, 255, 255, 0.6)',
                    fontWeight: !useInstallments ? '500' : 'normal'
                  }}
                  className="text-sm"
                >
                  One-time Payment
                </span>
                <Switch checked={useInstallments} onCheckedChange={setUseInstallments} />
                <span
                  style={{ 
                    color: useInstallments ? 'white' : 'rgba(255, 255, 255, 0.6)',
                    fontWeight: useInstallments ? '500' : 'normal'
                  }}
                  className="text-sm"
                >
                  3-Month Installments
                </span>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {pricingTiers.map((tier, index) => {
                const priceInfo = calculateDisplayPrice(index);
                const isHidden = index === 2 && !pricingConfig.showThirdTierPrice;
                const isRecommended = recommendedPlan === index;

                return (
                  <Card
                    key={tier.id}
                    id={`plan-${tier.id}`}
                    className={`relative overflow-hidden transition-all duration-300 hover-bubbly
                      ${tier.popular ? "md:scale-105 md:-translate-y-2 z-10" : ""}
                      ${isRecommended ? "ring-2" : ""}
                      vs-card-shadow`}
                    style={{
                      background: 'var(--theme-bg-navy-gradient)',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      boxShadow: 'var(--theme-shadow-md)',
                      ...(isRecommended && {
                        ringColor: 'var(--theme-primary)',
                      })
                    }}
                  >
                    {/* Add floating element for visual interest */}
                    <div className="absolute -z-10 bottom-10 right-10 w-20 h-20 rounded-[40%] rotate-12 vs-float-element-light-1"></div>
                    <div className="absolute -z-10 bottom-10 right-10 w-20 h-20 rounded-[40%] rotate-12 vs-float-element-dark-1"></div>
                    
                    {/* Top-right badge */}
                    {tier.badge && (
                      <div
                        className="absolute top-0 right-0 text-xs font-medium text-theme-on-primary-3 py-1 rounded-bl-lg bg-[var(--theme-primary)]"
                      >
                        {tier.badge}
                      </div>
                    )}

                    {/* Recommended badge */}
                    {isRecommended && (
                      <div className="absolute top-0 left-0 text-xs font-medium px-3 py-1 rounded-br-lg bg-[var(--theme-primary)]">
                        Recommended
                      </div>
                    )}

                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center border bg-[var(--theme-bg-navy-gradient)]"
                        >
                          {getPlanIcon(tier.id)}
                        </div>
                        <CardTitle className="text-xl text-theme-on-primary">{tier.name}</CardTitle>
                      </div>
                      <CardDescription className="mt-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {tier.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Price */}
                      {!isHidden ? (
                        <div className="text-center py-4 relative">
                          {/* Add subtle pattern behind price */}
                          <div className="absolute inset-0 -z-10 dot-bg" style={{ opacity: 0.05 }}></div>
                          
                          {priceInfo.originalPrice && (
                            <div className="line-through mb-1" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                              {priceInfo.originalPrice}
                            </div>
                          )}

                          <div className="text-3xl font-bold text-theme-on-primary">{priceInfo.displayPrice}</div>

                          {priceInfo.perInstallment && (
                            <div className="text-sm mt-1" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{priceInfo.perInstallment}</div>
                          )}

                          {pricingConfig.promotionalOffer && pricingConfig.promotionalOfferTiers[index] && (
                            <div className="mt-2">
                              <Badge className="text-theme-on-primary-btn-destructive-gradient">
                                Save {pricingConfig.promotionalDiscount * 100}%
                              </Badge>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <div className="text-3xl font-bold text-theme-on-primary">Custom</div>
                          <div className="text-sm mt-1" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Contact for pricing</div>
                        </div>
                      )}

                      {/* Track Access */}
                      {getTrackAccessContent(index)}

                      {/* Features */}
                      <div className="space-y-3">
                        {tier.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2 group hover:bg-theme-bg-surface/5 rounded-md p-1 transition-colors">
                            <Check 
                              className="h-5 w-5 shrink-0 mt-0.5 group-hover:scale-110 transition-transform bg-[var(--theme-primary)]"
                            />
                            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{feature}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-4 pt-4">
                      <AnimatedButton 
                        text={tier.ctaText}
                        variant="start"
                        saturation={index === 0 ? "normal" : index === 1 ? "high" : "low"}
                        size="lg"
                        onClick={() => window.location.href = '/application-form'}
                        className="w-full"
                      />
                      <AnimatedButton
                        text="Schedule a Call"
                        variant="docs"
                        saturation="subtle"
                        size="md"
                        onClick={() => window.open('https://calendly.com/jodenclashnewman/vertical-shortcut-discovery-call', '_blank')}
                        className="w-full"
                      />
                    </CardFooter>
                  </Card>
                );
              })}
            </div>

            {/* Price range info */}
            <div className="text-center mt-6 text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Prices from {formatPrice(pricingConfig.lowestVisiblePrice)}
            </div>

            {/* Module breakdown */}
            

            {/* Comparison table */}
            <ComparisonTable />

            <ModulePreview />

            {/* Final CTA */}
            <div className="mt-16 text-center relative">
              {/* Add subtle floating elements */}
              <div className="absolute top-5 left-1/4 w-16 h-16 rounded-[40%] rotate-12 vs-float-element-light-1"></div>
              <div className="absolute bottom-5 right-1/4 w-16 h-16 rounded-[40%] rotate-12 vs-float-element-dark-1"></div>
            
              <h3 className="text-2xl font-semibold mb-4 text-theme-on-primary">Ready to Transform Your Content Strategy?</h3>
              <p className="max-w-2xl mx-auto mb-8" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Join hundreds of founders who have already used our proven system to build engaged
                audiences and drive sustainable growth.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <AnimatedButton 
                  text="Enroll Now"
                  variant="pro" 
                  saturation="normal"
                  size="lg"
                  onClick={() => window.location.href = '/application-form'}
                  className="w-auto"
                />
                <AnimatedButton
                  text="Schedule a Call"
                  variant="docs"
                  saturation="normal"
                  size="lg"
                  onClick={() => window.open('https://calendly.com/jodenclashnewman/vertical-shortcut-discovery-call', '_blank')}
                  className="w-auto"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Section>
  );
};