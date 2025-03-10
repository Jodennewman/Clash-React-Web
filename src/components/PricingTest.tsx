import React, { useState } from 'react';

const PricingSection = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({
    journey: '',
    involvement: '',
    speed: ''
  });
  const [recommendedPlan, setRecommendedPlan] = useState(null);

  // Define pricing tiers
  const pricingTiers = [
    {
      name: "Brand Blueprint",
      price: "£2,600",
      color: "#FA9644", // Orange from your palette
      popular: false,
      description: "Perfect for founders ready to take their first step into vertical content creation.",
      features: [
        "All essential founder must-watch basics",
        "Basic library for editors & social managers",
        "Lifetime Access to All Content",
        "4 weeks of Group Q&A Calls",
        "Condensed Monetization & Conversions Pro Series",
        "2 weeks email support",
        "Updates for 3-6 months"
      ],
      buttonText: "Get Blueprint",
      buttonLink: "#pricing-blueprint"
    },
    {
      name: "Authority Autopilot",
      price: "£4,600",
      color: "#3196AD", // Blue from your palette
      popular: true,
      description: "The complete system for serious founders ready to dominate short-form content.",
      features: [
        "Full set of advanced strategic modules",
        "Extended library with advanced lessons",
        "Lifetime Access to All Content",
        "8-12 weeks of Group Q&A Calls",
        "Standard channel access to private community",
        "Ready-to-use pipeline templates",
        "1-2 private strategy sessions",
        "Group calls for your team",
        "Initial brand/content audit",
        "Full set of advanced monetization strategies",
        "4 weeks priority support"
      ],
      buttonText: "Get Authority Autopilot",
      buttonLink: "#pricing-builder"
    },
    {
      name: "Viral Growth Engine",
      price: "£7,600",
      color: "#D45D56", // Red from your palette
      popular: false,
      description: "The ultimate authority-building system with hands-on implementation support.",
      features: [
        "Everything in Authority Autopilot",
        "Templates + custom adjustments by our team",
        "Hands-on help to configure & test",
        "Weekly or on-demand strategy sessions",
        "Dedicated mentorship for each key team member",
        "Initial + monthly ongoing audits",
        "Full monetization strategies + personalized coaching",
        "8+ weeks rolling priority support",
        "Lifetime updates with beta access",
        "Deep-dive training + monthly data interpretation"
      ],
      buttonText: "Get Growth Engine",
      buttonLink: "#pricing-accelerate"
    }
  ];

  // Quiz questions
  const quizSteps = [
    {
      question: "Where are you in your content journey?",
      options: [
        { value: "beginner", label: "Honestly I've got no clue and haven't started—but have heard it's a good idea." },
        { value: "started", label: "I've started posting but haven't seen the results I want yet." }
      ]
    },
    {
      question: "How much involvement do you want?",
      options: [
        { value: "hands-on", label: "I've got time to learn it all—but might have to pass some of it to my team." },
        { value: "basics", label: "I want to understand the basics—but ideally someone else will do most of it." },
        { value: "none", label: "I'm way too busy to do any of it." }
      ]
    },
    {
      question: "How quickly do you want to see results?",
      options: [
        { value: "slow", label: "I'm not in a big hurry (happy to go slowly)." },
        { value: "balanced", label: "I'd like a balanced approach—some speed, but I still want to do it right." },
        { value: "fast", label: "I want the fastest route possible—ASAP." }
      ]
    }
  ];

  // Handle quiz option selection
  const handleOptionSelect = (questionKey, value) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionKey]: value
    });
  };

  // Navigate through quiz
  const goToNextStep = () => {
    if (currentStep < quizSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateRecommendation();
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Calculate recommended plan based on answers
  const calculateRecommendation = () => {
    // Default to Blueprint
    let recommendation = 0;
    
    // Rule 1: If involvement is "none" OR speed is "fast" => Growth Engine
    if (quizAnswers.involvement === 'none' || quizAnswers.speed === 'fast') {
      recommendation = 2; // Viral Growth Engine
    }
    // Rule 2: Else If journey is beginner/started AND involvement is hands-on AND speed is slow => Blueprint
    else if ((quizAnswers.journey === 'beginner' || quizAnswers.journey === 'started') && 
             quizAnswers.involvement === 'hands-on' && 
             quizAnswers.speed === 'slow') {
      recommendation = 0; // Brand Blueprint
    }
    // Rule 3: All other combinations => Authority Autopilot
    else {
      recommendation = 1; // Authority Autopilot
    }
    
    setRecommendedPlan(recommendation as unknown as React.SetStateAction<null>);
  };

  // Reset quiz
  const resetQuiz = () => {
    setCurrentStep(1);
    setQuizAnswers({
      journey: '',
      involvement: '',
      speed: ''
    });
    setRecommendedPlan(null);
  };

  return (
    <div className="py-16 relative bg-gray-900 overflow-hidden" id="pricing">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500 rounded-full opacity-5"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-rose-500 rounded-full opacity-5"></div>
        <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-amber-500 rounded-full opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-500 via-rose-500 to-blue-500 bg-clip-text text-transparent">
            Choose Your Path to Vertical Growth
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Select the plan that best fits your goals and current stage
          </p>
          
          {/* Quiz prompt */}
          <div className="mt-8">
            <p className="text-gray-300 mb-3">Not sure which plan is right for you?</p>
            <button 
              onClick={() => setIsQuizOpen(true)}
              className="px-6 py-3 bg-transparent border-2 border-rose-500 text-rose-500 font-medium rounded-lg hover:bg-rose-500 hover:text-white transition-all duration-300 hover:-translate-y-1"
            >
              Take the 60-Second Quiz to Find Out
            </button>
          </div>
        </div>
        
        {/* Limited Spots Badge */}
        <div className="text-center mb-10">
          <div className="inline-block bg-gradient-to-r from-amber-500 to-rose-500 px-6 py-2 rounded-full">
            <span className="text-white font-semibold">Beta Cohort: Only 10 Spots Available!</span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <div 
              key={index} 
              className={`bg-gray-800 rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
                tier.popular ? 'md:scale-105 z-10 relative shadow-xl shadow-blue-500/20' : 'shadow-lg'
              }`}
              style={{ borderTop: `5px solid ${tier.color}` }}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 rotate-45">
                  <div className="w-32 h-32 bg-blue-500 rotate-45 flex items-center justify-center">
                    <span className="text-white font-bold text-sm -rotate-45 text-center">
                      Most<br/>Popular
                    </span>
                  </div>
                </div>
              )}
              
              {/* Card content */}
              <div className="p-8">
                <h3 
                  className="text-2xl font-bold mb-2"
                  style={{ color: tier.color }}
                >
                  {tier.name}
                </h3>
                <div 
                  className="text-4xl font-bold mb-4" 
                  style={{ color: tier.color }}
                >
                  {tier.price}
                </div>
                <p className="text-gray-300 mb-6 min-h-16">
                  {tier.description}
                </p>
                
                <a 
                  href={tier.buttonLink}
                  className="block w-full py-3 text-center rounded-lg font-semibold text-white mb-8 transition-all duration-300 hover:shadow-lg"
                  style={{ backgroundColor: tier.color }}
                >
                  {tier.buttonText}
                </a>
                
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-gray-300">
                      <div 
                        className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                        style={{ backgroundColor: tier.color }}
                      ></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        {/* Quiz Modal */}
        {isQuizOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-xl max-w-xl w-full max-h-[90vh] overflow-hidden">
              {/* Quiz Header */}
              <div className="bg-gradient-to-r from-rose-500 to-blue-500 px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Find Your Perfect Plan</h3>
                <button 
                  onClick={() => {setIsQuizOpen(false); resetQuiz();}}
                  className="text-white text-2xl"
                >
                  &times;
                </button>
              </div>
              
              {/* Quiz Content */}
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                {recommendedPlan !== null ? (
                  // Recommendation result
                  <div className="text-center">
                    <div 
                      className="inline-block rounded-full px-4 py-2 mb-4"
                      style={{ backgroundColor: `${pricingTiers[recommendedPlan].color}30` }}
                    >
                      <span style={{ color: pricingTiers[recommendedPlan].color }} className="font-bold">
                        {pricingTiers[recommendedPlan].name}
                      </span>
                    </div>
                    
                    <h3 
                      className="text-2xl font-bold mb-4"
                      style={{ color: pricingTiers[recommendedPlan].color }}
                    >
                      We Recommend: {pricingTiers[recommendedPlan].name}
                    </h3>
                    
                    <p className="text-gray-300 mb-6">
                      {pricingTiers[recommendedPlan].description}
                    </p>
                    
                    <div className="text-left mb-6">
                      <h4 className="font-semibold mb-2 text-white">Key Benefits:</h4>
                      <ul className="space-y-2">
                        {pricingTiers[recommendedPlan].features.slice(0, 4).map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <a
                      href={pricingTiers[recommendedPlan].buttonLink}
                      className="inline-block px-6 py-3 rounded-lg font-semibold text-white mb-2"
                      style={{ backgroundColor: pricingTiers[recommendedPlan].color }}
                      onClick={() => setIsQuizOpen(false)}
                    >
                      Get Started with {pricingTiers[recommendedPlan].name}
                    </a>
                  </div>
                ) : (
                  // Quiz questions
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-white">
                      {quizSteps[currentStep-1].question}
                    </h4>
                    
                    <div className="space-y-3 mb-6">
                      {quizSteps[currentStep-1].options.map((option, index) => (
                        <label 
                          key={index}
                          className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                            quizAnswers[Object.keys(quizAnswers)[currentStep-1]] === option.value
                              ? 'border-blue-500 bg-blue-500 bg-opacity-10'
                              : 'border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-start">
                            <input
                              type="radio"
                              name={Object.keys(quizAnswers)[currentStep-1]}
                              value={option.value}
                              checked={quizAnswers[Object.keys(quizAnswers)[currentStep-1]] === option.value}
                              onChange={() => handleOptionSelect(Object.keys(quizAnswers)[currentStep-1], option.value)}
                              className="mt-1 mr-3"
                            />
                            <span className="text-gray-300">{option.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Quiz Footer */}
              <div className="px-6 py-4 bg-gray-900 flex justify-between">
                {recommendedPlan === null ? (
                  <>
                    <button
                      onClick={goToPrevStep}
                      disabled={currentStep === 1}
                      className={`px-4 py-2 border border-gray-600 rounded-lg ${
                        currentStep === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'
                      }`}
                    >
                      Back
                    </button>
                    
                    <button
                      onClick={goToNextStep}
                      disabled={!quizAnswers[Object.keys(quizAnswers)[currentStep-1]]}
                      className={`px-6 py-2 bg-blue-500 text-white rounded-lg ${
                        !quizAnswers[Object.keys(quizAnswers)[currentStep-1]] 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:bg-blue-600'
                      }`}
                    >
                      {currentStep === quizSteps.length ? 'See Recommendation' : 'Next'}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {setIsQuizOpen(false); resetQuiz();}}
                    className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 mx-auto"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingSection;