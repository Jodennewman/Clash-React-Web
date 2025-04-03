import { Briefcase, Compass, Pencil, Camera, Scissors, Rocket, Wrench } from 'lucide-react';

// Types for course data structures (simplified for easy consumption)
export interface Submodule {
  id: string;
  title: string;
  subtitle: string;
  duration: number;
  difficulty: number;
  resources: string[];
  instructor: string;
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  thumbnail: string;
  tracks: string[];
  duration: number;
  featured: boolean;
  founderMustWatch: boolean;
  submodules: Submodule[];
}

export interface Track {
  name: string;
  icon: string;
  color: string;
  description: string;
}

// Defined tracks for the course
export const tracks: Track[] = [
  {
    name: "Content Creator Growth",
    icon: "rocket",
    color: "#4A90E2",
    description: "The fastest path to growing your audience from zero to millions of views"
  },
  {
    name: "Founders",
    icon: "briefcase",
    color: "#FF3B30",
    description: "Essential strategies for entrepreneurs and business leaders to build personal brands"
  },
  {
    name: "Scriptwriters/Researchers",
    icon: "pencil",
    color: "#FFCC00",
    description: "Deep dive into creating compelling content that drives engagement"
  },
  {
    name: "Video Editors",
    icon: "scissors",
    color: "#34C759",
    description: "Technical skills to transform raw footage into viral-worthy content"
  },
  {
    name: "Video Producers",
    icon: "camera",
    color: "#5856D6",
    description: "Managing the end-to-end process of creating professional short form content"
  },
  {
    name: "Holistic Approach",
    icon: "compass",
    color: "#FF9500",
    description: "Comprehensive strategy for mastering every aspect of short form content"
  },
  {
    name: "Technical Skills",
    icon: "wrench",
    color: "#8E8E93",
    description: "Practical tools and techniques for production and optimization"
  }
];

// Helper function to get icon component by name
export const getTrackIcon = (iconName: string) => {
  switch (iconName) {
    case 'rocket':
      return Rocket;
    case 'briefcase':
      return Briefcase;
    case 'pencil':
      return Pencil;
    case 'scissors':
      return Scissors;
    case 'camera':
      return Camera;
    case 'compass':
      return Compass;
    case 'wrench':
      return Wrench;
    default:
      return Rocket;
  }
};

// Course sections with module counts
export const sections = [
  { id: "theory_basics", name: "Theory Basics", modules: 6, color: "#4A90E2" },
  { id: "theory_advanced", name: "Theory Advanced", modules: 11, color: "#FF9500" },
  { id: "research", name: "Research & Writing", modules: 3, color: "#34C759" },
  { id: "repurposing", name: "Repurposing", modules: 3, color: "#30D158" },
  { id: "shooting", name: "Shooting", modules: 5, color: "#5856D6" },
  { id: "editing", name: "Editing", modules: 4, color: "#FF9500" },
  { id: "monetisation", name: "Monetisation", modules: 3, color: "#FF3B30" },
  { id: "delegation", name: "Delegation", modules: 6, color: "#BF5AF2" },
  { id: "conversions", name: "Conversions", modules: 7, color: "#4A90E2" }
];

// Featured modules across all sections
export const featuredModules: Module[] = [
  {
    id: "big_picture",
    title: "The Big Picture on Short Form",
    subtitle: "Why short form is the highest-leverage marketing investment of 2025",
    icon: "lightbulb",
    color: "#4A90E2",
    thumbnail: "big_picture.jpg",
    tracks: ["Content Creator Growth", "Holistic Approach", "Founders"],
    duration: 25,
    featured: true,
    founderMustWatch: true,
    submodules: [
      {
        id: "big_picture_1",
        title: "Introduction to Short Form",
        subtitle: "The transformative impact of vertical video on the digital landscape",
        duration: 6,
        difficulty: 1,
        resources: ["pdf"],
        instructor: "Joden"
      },
      {
        id: "big_picture_2",
        title: "Market Opportunity",
        subtitle: "The staggering statistics that make short form impossible to ignore",
        duration: 5,
        difficulty: 1,
        resources: ["pdf"],
        instructor: "Joden"
      }
    ]
  },
  {
    id: "cardinal_sins",
    title: "The 3 Cardinal Sins and Cardinal Virtues",
    subtitle: "The critical mistakes killing your videos and their powerful antidotes",
    icon: "warning",
    color: "#FF3B30",
    thumbnail: "cardinal_sins.jpg",
    tracks: ["Content Creator Growth", "Holistic Approach", "Founders"],
    duration: 30,
    featured: true,
    founderMustWatch: true,
    submodules: [
      {
        id: "sin_boring",
        title: "The Sin of Being Boring",
        subtitle: "Why entertainment value trumps information on short form platforms",
        duration: 7,
        difficulty: 1,
        resources: ["pdf", "worksheets"],
        instructor: "Joden"
      },
      {
        id: "sin_confusing",
        title: "The Sin of Being Confusing",
        subtitle: "How complexity kills engagement and drives viewers away",
        duration: 7,
        difficulty: 1,
        resources: ["pdf", "worksheets"],
        instructor: "Joden"
      }
    ]
  },
  {
    id: "strategy_pillars",
    title: "Strategy: Pillars, Topics, Buckets",
    subtitle: "Build a framework that generates unlimited viral-worthy content ideas",
    icon: "strategy",
    color: "#FFCC00",
    thumbnail: "strategy_pillars.jpg",
    tracks: ["Content Creator Growth", "Scriptwriters/Researchers", "Founders"],
    duration: 35,
    featured: true,
    founderMustWatch: true,
    submodules: [
      {
        id: "defining_pillars",
        title: "Defining Your Content Pillars",
        subtitle: "The foundation that gives your content direction and consistency",
        duration: 8,
        difficulty: 2,
        resources: ["pdf", "workshop", "worksheets"],
        instructor: "Joden"
      },
      {
        id: "generating_topics",
        title: "Generating Engaging Topics",
        subtitle: "How to develop specific angles that captivate your target audience",
        duration: 7,
        difficulty: 2,
        resources: ["pdf", "worksheets"],
        instructor: "Joden"
      }
    ]
  },
  {
    id: "hooking_fundamentals",
    title: "Hooking Fundamentals",
    subtitle: "Master the art of the first 3 seconds that determine your video's success",
    icon: "hook",
    color: "#50E3C2",
    thumbnail: "hooking_fundamentals.jpg",
    tracks: ["Content Creator Growth", "Scriptwriters/Researchers"],
    duration: 30,
    featured: true,
    founderMustWatch: true,
    submodules: [
      {
        id: "hook_importance",
        title: "Why Hooks Matter",
        subtitle: "The psychology behind what makes viewers stop scrolling",
        duration: 5,
        difficulty: 1,
        resources: ["pdf"],
        instructor: "Joden"
      },
      {
        id: "hook_clarity",
        title: "Clarity & Intrigue",
        subtitle: "The perfect balance that creates curiosity without confusion",
        duration: 8,
        difficulty: 2,
        resources: ["pdf", "worksheets"],
        instructor: "Joden"
      }
    ]
  },
  {
    id: "founders_paradox",
    title: "The Founders Paradox",
    subtitle: "How busy entrepreneurs can create authentic, engaging content without sacrificing professionalism",
    icon: "founders",
    color: "#FF3B30",
    thumbnail: "founders_paradox.jpg",
    tracks: ["Founders"],
    duration: 35,
    featured: true,
    founderMustWatch: true,
    submodules: [
      {
        id: "authenticity_balance",
        title: "The Authenticity Balance",
        subtitle: "Creating content that feels authentic without sacrificing authority",
        duration: 8,
        difficulty: 3,
        resources: ["pdf", "worksheets"],
        instructor: "Tia Warner"
      },
      {
        id: "founder_batching",
        title: "Strategic Batching for Busy Founders",
        subtitle: "Maximize efficiency without sacrificing authenticity",
        duration: 9,
        difficulty: 3,
        resources: ["pdf", "worksheets"],
        instructor: "Tia Warner"
      }
    ]
  }
];

// Modules for each section
export const getModulesForSection = (sectionId: string): Module[] => {
  switch(sectionId) {
    case 'theory_basics':
      return [
        {
          id: "big_picture",
          title: "The Big Picture on Short Form",
          subtitle: "Why short form is the highest-leverage marketing investment of 2025",
          icon: "lightbulb",
          color: "#4A90E2",
          thumbnail: "big_picture.jpg",
          tracks: ["Content Creator Growth", "Holistic Approach", "Founders"],
          duration: 25,
          featured: true,
          founderMustWatch: true,
          submodules: [
            {
              id: "big_picture_1",
              title: "Introduction to Short Form",
              subtitle: "The transformative impact of vertical video on the digital landscape",
              duration: 6,
              difficulty: 1,
              resources: ["pdf"],
              instructor: "Joden"
            },
            {
              id: "big_picture_2",
              title: "Market Opportunity",
              subtitle: "The staggering statistics that make short form impossible to ignore",
              duration: 5,
              difficulty: 1,
              resources: ["pdf"],
              instructor: "Joden"
            }
          ]
        },
        {
          id: "cardinal_sins",
          title: "The 3 Cardinal Sins and Cardinal Virtues",
          subtitle: "The critical mistakes killing your videos and their powerful antidotes",
          icon: "warning",
          color: "#FF3B30",
          thumbnail: "cardinal_sins.jpg",
          tracks: ["Content Creator Growth", "Holistic Approach", "Founders"],
          duration: 30,
          featured: true,
          founderMustWatch: true,
          submodules: [
            {
              id: "sin_boring",
              title: "The Sin of Being Boring",
              subtitle: "Why entertainment value trumps information on short form platforms",
              duration: 7,
              difficulty: 1,
              resources: ["pdf", "worksheets"],
              instructor: "Joden"
            },
            {
              id: "sin_confusing",
              title: "The Sin of Being Confusing",
              subtitle: "How complexity kills engagement and drives viewers away",
              duration: 7,
              difficulty: 1,
              resources: ["pdf", "worksheets"],
              instructor: "Joden"
            }
          ]
        },
        {
          id: "algorithmic_reality",
          title: "Algorithmic Reality",
          subtitle: "Demystifying the 'black box' that determines which videos go viral",
          icon: "algorithm",
          color: "#5856D6",
          thumbnail: "algorithmic_reality.jpg",
          tracks: ["Content Creator Growth", "Holistic Approach", "Scriptwriters/Researchers"],
          duration: 25,
          featured: false,
          founderMustWatch: true,
          submodules: [
            {
              id: "algorithm_truth",
              title: "The Truth About Algorithms",
              subtitle: "Why the algorithm isn't a black box—it's human psychology",
              duration: 6,
              difficulty: 2,
              resources: ["pdf"],
              instructor: "Tia Warner"
            },
            {
              id: "content_distribution",
              title: "Content Distribution Process",
              subtitle: "How platforms decide which viewers see your content",
              duration: 7,
              difficulty: 2,
              resources: ["pdf"],
              instructor: "Tia Warner"
            }
          ]
        },
        {
          id: "strategy_pillars",
          title: "Strategy: Pillars, Topics, Buckets",
          subtitle: "Build a framework that generates unlimited viral-worthy content ideas",
          icon: "strategy",
          color: "#FFCC00",
          thumbnail: "strategy_pillars.jpg",
          tracks: ["Content Creator Growth", "Scriptwriters/Researchers", "Founders"],
          duration: 35,
          featured: true,
          founderMustWatch: true,
          submodules: [
            {
              id: "defining_pillars",
              title: "Defining Your Content Pillars",
              subtitle: "The foundation that gives your content direction and consistency",
              duration: 8,
              difficulty: 2,
              resources: ["pdf", "workshop", "worksheets"],
              instructor: "Joden"
            },
            {
              id: "generating_topics",
              title: "Generating Engaging Topics",
              subtitle: "How to develop specific angles that captivate your target audience",
              duration: 7,
              difficulty: 2,
              resources: ["pdf", "worksheets"],
              instructor: "Joden"
            }
          ]
        },
        {
          id: "hooking_fundamentals",
          title: "Hooking Fundamentals",
          subtitle: "Master the art of the first 3 seconds that determine your video's success",
          icon: "hook",
          color: "#50E3C2",
          thumbnail: "hooking_fundamentals.jpg",
          tracks: ["Content Creator Growth", "Scriptwriters/Researchers"],
          duration: 30,
          featured: true,
          founderMustWatch: true,
          submodules: [
            {
              id: "hook_importance",
              title: "Why Hooks Matter",
              subtitle: "The psychology behind what makes viewers stop scrolling",
              duration: 5,
              difficulty: 1,
              resources: ["pdf"],
              instructor: "Joden"
            },
            {
              id: "hook_clarity",
              title: "Clarity & Intrigue",
              subtitle: "The perfect balance that creates curiosity without confusion",
              duration: 8,
              difficulty: 2,
              resources: ["pdf", "worksheets"],
              instructor: "Joden"
            }
          ]
        }
      ];
    case 'theory_advanced':
      return [
        {
          id: "nuanced_hook",
          title: "Nuanced Hook: Morally Dubious",
          subtitle: "Advanced hook strategies that generate massive engagement",
          icon: "advanced-hook",
          color: "#FF9500",
          thumbnail: "nuanced_hook.jpg",
          tracks: ["Content Creator Growth", "Scriptwriters/Researchers"],
          duration: 35,
          featured: false,
          founderMustWatch: false,
          submodules: [
            {
              id: "big_small_hook",
              title: "The Big-Small Hook",
              subtitle: "Connect something tiny to something massive to create instant intrigue",
              duration: 7,
              difficulty: 3,
              resources: ["pdf", "worksheets"],
              instructor: "Tia Warner"
            },
            {
              id: "false_assumption",
              title: "The False Assumption Hook",
              subtitle: "Create FOMO that compels viewers to watch to the end",
              duration: 7,
              difficulty: 4,
              resources: ["pdf", "worksheets"],
              instructor: "Tia Warner"
            }
          ]
        },
        {
          id: "emotional_positioning",
          title: "Advanced Emotional Positioning",
          subtitle: "Harness powerful emotions to create content that resonates and drives action",
          icon: "emotions",
          color: "#AF52DE",
          thumbnail: "emotional_positioning.jpg",
          tracks: ["Content Creator Growth", "Scriptwriters/Researchers", "Founders"],
          duration: 30,
          featured: false,
          founderMustWatch: true,
          submodules: [
            {
              id: "emotion_anger",
              title: "Harnessing Anger",
              subtitle: "The most engaging emotion and how to use it responsibly",
              duration: 7,
              difficulty: 4,
              resources: ["pdf", "worksheets"],
              instructor: "Tia Warner"
            },
            {
              id: "emotion_fear",
              title: "Leveraging Fear & Anxiety",
              subtitle: "Creating FOMO and urgency that compels action",
              duration: 7,
              difficulty: 4,
              resources: ["pdf", "worksheets"],
              instructor: "Tia Warner"
            }
          ]
        },
        {
          id: "script_mastery",
          title: "Script Mastery: Optimising for Engagement",
          subtitle: "Advanced scripting techniques that maximize retention",
          icon: "script-pro",
          color: "#50E3C2",
          thumbnail: "script_mastery.jpg",
          tracks: ["Content Creator Growth", "Scriptwriters/Researchers", "Founders"],
          duration: 35,
          featured: false,
          founderMustWatch: true,
          submodules: [
            {
              id: "comment_optimization",
              title: "Optimizing for Comments",
              subtitle: "Strategic scripting techniques that fill your comment section with engagement",
              duration: 9,
              difficulty: 4,
              resources: ["pdf", "worksheets"],
              instructor: "Tia Warner"
            },
            {
              id: "conversion_scripts",
              title: "Conversion-Optimized Scripts",
              subtitle: "The perfect CTA placement that drives action without killing retention",
              duration: 8,
              difficulty: 4,
              resources: ["pdf", "worksheets"],
              instructor: "Tia Warner"
            }
          ]
        },
        {
          id: "founders_paradox",
          title: "The Founders Paradox",
          subtitle: "How busy entrepreneurs can create authentic, engaging content without sacrificing professionalism",
          icon: "founders",
          color: "#FF3B30",
          thumbnail: "founders_paradox.jpg",
          tracks: ["Founders"],
          duration: 35,
          featured: true,
          founderMustWatch: true,
          submodules: [
            {
              id: "authenticity_balance",
              title: "The Authenticity Balance",
              subtitle: "Creating content that feels authentic without sacrificing authority",
              duration: 8,
              difficulty: 3,
              resources: ["pdf", "worksheets"],
              instructor: "Tia Warner"
            },
            {
              id: "founder_batching",
              title: "Strategic Batching for Busy Founders",
              subtitle: "Maximize efficiency without sacrificing authenticity",
              duration: 9,
              difficulty: 3,
              resources: ["pdf", "worksheets"],
              instructor: "Tia Warner"
            }
          ]
        }
      ];
    // Add cases for other sections as needed
    default:
      return [];
  }
};

// Modules specifically for founders
export const founderModules: Module[] = [
  {
    id: "founders_paradox",
    title: "The Founders Paradox",
    subtitle: "How busy entrepreneurs can create authentic, engaging content without sacrificing professionalism",
    icon: "founders",
    color: "#FF3B30",
    thumbnail: "founders_paradox.jpg",
    tracks: ["Founders"],
    duration: 35,
    featured: true,
    founderMustWatch: true,
    submodules: [
      {
        id: "authenticity_balance",
        title: "The Authenticity Balance",
        subtitle: "Creating content that feels authentic without sacrificing authority",
        duration: 8,
        difficulty: 3,
        resources: ["pdf", "worksheets"],
        instructor: "Tia Warner"
      },
      {
        id: "founder_batching",
        title: "Strategic Batching for Busy Founders",
        subtitle: "Maximize efficiency without sacrificing authenticity",
        duration: 9,
        difficulty: 3,
        resources: ["pdf", "worksheets"],
        instructor: "Tia Warner"
      }
    ]
  },
  {
    id: "monetisation_founder",
    title: "Monetisation Founder",
    subtitle: "Leverage your personal brand for lucrative partnerships and opportunities",
    icon: "money-founder",
    color: "#4A90E2",
    thumbnail: "monetisation_founder.jpg",
    tracks: ["Founders"],
    duration: 30,
    featured: true,
    founderMustWatch: true,
    submodules: [
      {
        id: "brand_partnerships",
        title: "Securing Brand Partnerships",
        subtitle: "Attracting and negotiating valuable sponsorship deals",
        duration: 8,
        difficulty: 3,
        resources: ["pdf", "worksheets"],
        instructor: "Alex O'Connor"
      },
      {
        id: "media_kit",
        title: "Media Kit Development",
        subtitle: "Creating materials that showcase your value to partners",
        duration: 7,
        difficulty: 3,
        resources: ["pdf", "worksheets", "templates"],
        instructor: "Alex O'Connor"
      }
    ]
  }
];

// Course statistics for presentations
export const courseStats = {
  totalModules: 178,
  totalHours: 1000,
  resources: 450,
  workshops: 42,
  pdfs: 89,
  templates: 64,
  systems: 37,
  bonusResources: 12
};

// Section descriptions for ModuleBreakdown
export const getSectionDescription = (sectionId: string): string => {
  switch(sectionId) {
    case 'theory_basics':
      return 'Foundational concepts to understand short-form content strategy';
    case 'theory_advanced':
      return 'Advanced techniques for maximum engagement and growth';
    case 'research':
      return 'Discover and adapt top-performing content ideas';
    case 'repurposing':
      return 'Transform existing content into viral short-form videos';
    case 'shooting':
      return 'Camera work, setup, and filming techniques';
    case 'editing':
      return 'Post-production methods to enhance your content';
    case 'monetisation':
      return 'Strategies to generate revenue from your content';
    case 'conversions':
      return 'Turn viewers into customers and build your business';
    default:
      return 'Master the essential skills for short-form video success';
  }
};

// Get modules by track
export const getModulesByTrack = (trackName: string): Module[] => {
  // Combine modules from all sections and filter by track
  const allModules = [
    ...getModulesForSection('theory_basics'),
    ...getModulesForSection('theory_advanced'),
    ...founderModules,
    // Add more sections as needed
  ];
  
  return allModules.filter(module => module.tracks.includes(trackName));
};


export default {
  tracks,
  sections,
  featuredModules,
  getModulesForSection,
  founderModules,
  courseStats,
  getSectionDescription,
  getModulesByTrack,
  getTrackIcon
};
