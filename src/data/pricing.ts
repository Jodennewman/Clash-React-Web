// src/data/pricing.ts

export interface PricingTier {
    id: string;
    name: string;
    icon: string;
    description: string;
    basePrice: number;
    popular: boolean;
    badge?: string;
    features: string[];
    trackAccess: string[] | "all";
    color: string;
    ctaText: string;
  }
  
  export interface PricingConfig {
    showThirdTierPrice: boolean;
    promotionalOffer: boolean;
    promotionalDiscount: number;
    discountIncludesInstallment: boolean;
    promotionalOfferTiers: boolean[];
    installmentMarkup: number; // Default 10%
    installmentMonths: number; // Default 3
    lowestVisiblePrice: number;
  }
  
  // Module categories data
  export const moduleCategories: Record<string, string[]> = {
    "Theory Basics": [
      "Starting an account",
      "Naming your account",
      "Creating a bio",
      "Managing highlights",
      "Developing your Linkspace",
      "Using Pinned Videos",
      "The Frame",
      "Safe Zones & Clutter",
      "Visual Hierarchy",
      "Movement & Contrast"
    ],
    "Cardinal Principles": [
      "Cardinal Sins",
      "Cardinal Virtues",
      "Algorithmic Reality",
      "How Videos Actually Grow",
      "Good Vs Bad in Short Form",
      "Nailing What Actually Counts",
      "Applying it Across Platforms"
    ],
    "Hook Mastery": [
      "Using Clarity and Intrigue",
      "Developing Authority",
      "Nailing Delivery",
      "The Text Hook",
      "The Visual Hook",
      "Nuanced Hooks",
      "BIG vs small",
      "False Assumptions",
      "The Impossible Question",
      "A Contrarian Statement",
      "This Just Happened!!?!",
      "PR: Who Are You?"
    ],
    "Scripting": [
      "Rule 1: Simplicity",
      "Rule 2: Being Concise",
      "Rule 3: Rehooking",
      "Rule 4: Authenticity",
      "Rule 5: Storytelling",
      "Rule 6: Would I watch this?",
      "Bonus: Boulder Theory",
      "Script Mastery",
      "Getting it wrong (on purpose)",
      "The FOMO comment section",
      "Using Controversy"
    ],
    "Metrics & Analysis": [
      "Likes",
      "Saves",
      "Shares",
      "Retention",
      "Comments",
      "Advanced Metrics",
      "Follower Conversion",
      "Completed Watchtime",
      "Demographics",
      "Traffic Sources"
    ],
    "Platform Strategy": [
      "TikTok",
      "Instagram",
      "YouTube",
      "The Rest!",
      "Pillar Content Strategy",
      "Topics",
      "Buckets",
      "Data-Led Iteration"
    ],
    "Authority Building": [
      "Scripting for Authority",
      "The 6 Rules of Authority",
      "Brand Wholism",
      "Complex formats",
      "Remixing formats",
      "Breaking Expectations",
      "The Unexpected Pivot"
    ],
    "Content Management": [
      "What to do when it goes wrong",
      "How to save your page",
      "Handling Comments",
      "Reframing Anger",
      "Managing Debate",
      "The Best Kind of Comment",
      "Optimising for Conversion",
      "Optimising for Watch Time"
    ],
    "Production": [
      "Camera Confidence",
      "Producing a Podcast for Clips",
      "Home Studio Setup",
      "Solo Phone Shooter",
      "Lofi - respecting the medium",
      "Hifi - the founders paradox",
      "Editing Basics",
      "Editing Team",
      "Editing Advanced"
    ],
    "Research": [
      "Research and Writing",
      "Research advanced",
      "Generating Ideas",
      "Targeted Search",
      "Keyword Mapping",
      "Tailoring Your Algorithm",
      "Inspiration Through Different Sources",
      "Refining Your Script",
      "The Research Toolkit"
    ],
    "Repurposing": [
      "From Shortform",
      "From Longform",
      "From Articles",
      "From LinkedIn",
      "Serialisation",
      "Podcast Clipping"
    ],
    "Planning & Distribution": [
      "Posting and Scheduling for Founders",
      "Posting for Creators",
      "Platform Monetisation",
      "Partnerships",
      "Business Integration"
    ],
    "Delegation & Team": [
      "First bottlenecks",
      "Managing Creatives",
      "Videography Delegated",
      "Make Content Run Itself",
      "Team Pipeline Breakdown",
      "Team Workflow"
    ],
    "Conversion Strategy": [
      "Lead Magnets",
      "Youtube Strategy",
      "Podcasts",
      "Building a Newsletter",
      "Using your platform for sales",
      "Speaking engagements",
      "Taking People Off Platform"
    ]
  };
  
  // Support feature comparison data
  export const supportFeatures = [
    { name: "Community Access", blueprint: true, automator: true, growth: true },
    { name: "Content Templates", blueprint: true, automator: true, growth: true },
    { name: "Group Coaching", blueprint: false, automator: true, growth: true },
    { name: "Content Reviews", blueprint: false, automator: true, growth: true },
    { name: "1-on-1 Strategy Sessions", blueprint: false, automator: true, growth: true },
    { name: "Custom Content Strategy", blueprint: false, automator: false, growth: true },
    { name: "Team Training", blueprint: false, automator: true, growth: true },
    { name: "Personal Coaching", blueprint: false, automator: false, growth: true },
    { name: "Agency Access", blueprint: false, automator: false, growth: true }
  ];
  
  // Pricing configuration
  export const pricingConfig: PricingConfig = {
    showThirdTierPrice: true, // Set to false to hide tier 3 price
    promotionalOffer: false,
    promotionalDiscount: 0.15, // 15% discount
    discountIncludesInstallment: false,
    promotionalOfferTiers: [true, true, false], // Which tiers the promo applies to
    installmentMarkup: 0.1, // 10% markup for installment plans
    installmentMonths: 3, // 3 month installments
    lowestVisiblePrice: 3095 // For "prices from £X" text
  };
  
  // Pricing tiers data
  export const pricingTiers: PricingTier[] = [
    {
      id: "blueprint",
      name: "Brand Blueprint",
      icon: "book-open",
      description: "Perfect for founders who prefer a hands-on approach and want the essentials.",
      basePrice: 3095,
      popular: false,
      badge: "Self-Guided",
      features: [
        "Full Course Access",
        "Content Templates",
        "Self-Paced Learning",
        "Lifetime Updates",
        "Community Access"
      ],
      trackAccess: ["Theory Basics", "Cardinal Principles", "Hook Mastery", "Scripting"],
      color: "text-[#FEA35D] bg-[#FEA35D]/10 border-[#FEA35D]/30",
      ctaText: "Get Started"
    },
    {
      id: "automator",
      name: "Authority Automator",
      icon: "award",
      description: "Our most popular plan! Perfect balance of learning and support.",
      basePrice: 5095,
      popular: true,
      badge: "Most Popular",
      features: [
        "Everything in Brand Blueprint",
        "Weekly Group Coaching",
        "Content Review & Feedback",
        "1-on-1 Strategy Session",
        "Team Training Templates",
        "Content Calendar Setup"
      ],
      trackAccess: [
        "Theory Basics", "Cardinal Principles", "Hook Mastery", "Scripting",
        "Metrics & Analysis", "Platform Strategy", "Authority Building", "Content Management"
      ],
      color: "text-[#387292] bg-[#387292]/10 border-[#387292]/30",
      ctaText: "Get Started"
    },
    {
      id: "growth",
      name: "The Viral Growth Machine",
      icon: "zap",
      description: "Maximum support and results for founders who want the fastest growth.",
      basePrice: 7500,
      popular: false,
      badge: "By Application",
      features: [
        "Everything in Authority Automator",
        "Custom Content Strategy",
        "3 Month Done-For-You Setup",
        "Team Hiring & Onboarding",
        "Private Coaching Sessions",
        "Direct Agency Access"
      ],
      trackAccess: "all",
      color: "text-[#B92234] bg-[#B92234]/10 border-[#B92234]/30",
      ctaText: "Apply Now"
    }
  ];
  
  // Quiz data
  export const quizSteps = [
    {
      question: "Where are you in your content journey?",
      key: "journey",
      options: [
        { value: "beginner", label: "Honestly I've got no clue and haven't started—but have heard it's a good idea." },
        { value: "started", label: "I've started posting but haven't seen the results I want yet." }
      ]
    },
    {
      question: "How much involvement do you want?",
      key: "involvement",
      options: [
        { value: "hands-on", label: "I've got time to learn it all—but might have to pass some of it to my team." },
        { value: "basics", label: "I want to understand the basics—but ideally someone else will do most of it." },
        { value: "none", label: "I'm way too busy to do any of it." }
      ]
    },
    {
      question: "How quickly do you want to see results?",
      key: "speed",
      options: [
        { value: "slow", label: "I'm not in a big hurry (happy to go slowly)." },
        { value: "balanced", label: "I'd like a balanced approach—some speed, but I still want to do it right." },
        { value: "fast", label: "I want the fastest route possible—ASAP." }
      ]
    }
  ];
  
  // Calculate total modules and other stats
  export function calculateCourseStats() {
    const totalCategories = Object.keys(moduleCategories).length;
    const totalModules = Object.values(moduleCategories).reduce(
      (acc, modules) => acc + modules.length,
      0
    );
    const totalHours = Math.round((totalModules * 35) / 60); // Estimate 35 minutes per module
    
    return {
      totalCategories,
      totalModules,
      totalHours,
      bonusResources: 12 // Fixed number of bonus resources
    };
  }