// src/data/course-data.ts
import { Briefcase, Compass, Pencil, Camera, Scissors, Rocket, Wrench } from 'lucide-react';

// Types for course data structure
export interface Submodule {
  id: string;
  title: string;
  subtitle: string;
  duration: number;
  difficulty: number;
  resources: string[];
  highValue: boolean;
  week: number;
  instructor: string;
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  thumbnail: string;
  points: string[];
  tracks: string[];
  duration: number;
  founderMustWatch: boolean;
  entrepreneurSpecific: boolean;
  popular: boolean;
  featured: boolean;
  submodules: Submodule[];
}

export interface Section {
  id: string;
  name: string;
  number: number;
  modules: Module[];
}

export interface Category {
  id: string;
  name: string;
  color: string;
  sections: Section[];
}

export interface Track {
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface Course {
  title: string;
  categories: Category[];
  tracks: Track[];
}

// Track data
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

// Course data structure
export const courseData: Course = {
  title: "The Vertical Shortcut: Master Short Form Video",
  
  // Categories
  categories: [
    // Category: Theory
    {
      id: "theory",
      name: "Theory",
      color: "#4A90E2",
      sections: [
        // Section: Theory Basics
        {
          id: "theory_basics",
          name: "Theory Basics",
          number: 1,
          modules: [
            // Module: The Big Picture on Short Form
            {
              id: "big_picture",
              title: "The Big Picture on Short Form",
              subtitle: "Why short form is the highest-leverage marketing investment of 2025",
              icon: "lightbulb",
              color: "#4A90E2",
              thumbnail: "big_picture.jpg",
              points: [
                "Discover why 5 billion people spend 2.5 hours daily on platforms you can dominate",
                "Learn why 73% of consumers prefer to learn about products through short form",
                "Understand how to position yourself to capture attention in the new digital landscape"
              ],
              tracks: ["Content Creator Growth", "Holistic Approach", "Founders"],
              duration: 25,
              founderMustWatch: true,
entrepreneurSpecific: false,
              popular: true,
              featured: true,
              submodules: [
                {
                  id: "big_picture_1",
                  title: "Introduction to Short Form",
                  subtitle: "The transformative impact of vertical video on the digital landscape",
                  duration: 6,
                  difficulty: 1,
                  resources: ["pdf"],
                  highValue: true,
                  week: 1,
                  instructor: "Joden"
                },
                {
                  id: "big_picture_2",
                  title: "Market Opportunity",
                  subtitle: "The staggering statistics that make short form impossible to ignore",
                  duration: 5,
                  difficulty: 1,
                  resources: ["pdf"],
                  highValue: true,
                  week: 1,
                  instructor: "Joden"
                },
                {
                  id: "big_picture_3",
                  title: "Consumer Behavior Shift",
                  subtitle: "Why audiences prefer short form for discovering products and services",
                  duration: 7,
                  difficulty: 1,
                  resources: ["pdf"],
                  highValue: true,
                  week: 1,
                  instructor: "Joden"
                },
                {
                  id: "big_picture_4",
                  title: "Case Studies",
                  subtitle: "Real-world examples of explosive growth through short form mastery",
                  duration: 7,
                  difficulty: 1,
                  resources: ["pdf"],
                  highValue: true,
                  week: 1,
                  instructor: "Joden"
                }
              ]
            },
            
            // Module: The 3 Cardinal Sins and Cardinal Virtues
            {
              id: "cardinal_sins",
              title: "The 3 Cardinal Sins and Cardinal Virtues",
              subtitle: "The critical mistakes killing your videos and their powerful antidotes",
              icon: "warning",
              color: "#FF3B30",
              thumbnail: "cardinal_sins.jpg",
              points: [
                "Identify the three fatal errors that guarantee your videos will flop",
                "Master the three virtues that transform ordinary content into viral sensations",
                "Learn simple fixes to immediately improve your engagement rates"
              ],
              tracks: ["Content Creator Growth", "Holistic Approach", "Founders"],
              duration: 30,
              founderMustWatch: true,
              entrepreneurSpecific: false,
              popular: true,
              featured: true,
              submodules: [
                {
                  id: "sin_boring",
                  title: "The Sin of Being Boring",
                  subtitle: "Why entertainment value trumps information on short form platforms",
                  duration: 7,
                  difficulty: 1,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 1,
                  instructor: "Joden"
                },
                {
                  id: "sin_confusing",
                  title: "The Sin of Being Confusing",
                  subtitle: "How complexity kills engagement and drives viewers away",
                  duration: 7,
                  difficulty: 1,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 1,
                  instructor: "Joden"
                },
                {
                  id: "sin_corporate",
                  title: "The Sin of Being Corporate",
                  subtitle: "The authenticity gap that makes viewers instantly distrust your content",
                  duration: 7,
                  difficulty: 1,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 1,
                  instructor: "Joden"
                },
                {
                  id: "virtue_framing",
                  title: "The Virtue of Framing",
                  subtitle: "Transform boring topics into compelling content that viewers can't resist",
                  duration: 5,
                  difficulty: 2,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 1,
                  instructor: "Joden"
                },
                {
                  id: "virtue_clarity",
                  title: "The Virtue of Clarity",
                  subtitle: "Crafting hooks and scripts that instantly communicate value",
                  duration: 5,
                  difficulty: 2,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 1,
                  instructor: "Joden"
                },
                {
                  id: "virtue_authenticity",
                  title: "The Virtue of Authenticity",
                  subtitle: "Building genuine connection that converts viewers into loyal fans",
                  duration: 5,
                  difficulty: 2,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 1,
                  instructor: "Joden"
                }
              ]
            },
            
            // Module: Algorithmic Reality
            {
              id: "algorithmic_reality",
              title: "Algorithmic Reality",
              subtitle: "Demystifying the 'black box' that determines which videos go viral",
              icon: "algorithm",
              color: "#5856D6",
              thumbnail: "algorithmic_reality.jpg",
              points: [
                "Discover how algorithms actually work (and why they're not as mysterious as you think)",
                "Learn the metrics that truly matter for getting your content pushed to new viewers",
                "Master the psychological triggers that make videos perform across all platforms"
              ],
              tracks: ["Content Creator Growth", "Holistic Approach", "Scriptwriters/Researchers"],
              duration: 25,
              founderMustWatch: true,
              entrepreneurSpecific: false,
              popular: true,
              featured: false,
              submodules: [
                {
                  id: "algorithm_truth",
                  title: "The Truth About Algorithms",
                  subtitle: "Why the algorithm isn't a black box—it's human psychology",
                  duration: 6,
                  difficulty: 2,
                  resources: ["pdf"],
                  highValue: true,
                  week: 1,
                  instructor: "Tia Warner"
                },
                {
                  id: "content_distribution",
                  title: "Content Distribution Process",
                  subtitle: "How platforms decide which viewers see your content",
                  duration: 7,
                  difficulty: 2,
                  resources: ["pdf"],
                  highValue: true,
                  week: 1,
                  instructor: "Tia Warner"
                },
                {
                  id: "feedback_loops",
                  title: "Engagement Feedback Loops",
                  subtitle: "The virtuous cycle that turns one successful video into many",
                  duration: 6,
                  difficulty: 2,
                  resources: ["pdf"],
                  highValue: true,
                  week: 1,
                  instructor: "Tia Warner"
                },
                {
                  id: "platform_specifics",
                  title: "Platform-Specific Nuances",
                  subtitle: "The subtle differences in how TikTok, Instagram, and YouTube evaluate content",
                  duration: 6,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 1,
                  instructor: "Tia Warner"
                }
              ]
            },
            
            // Module: Strategy: Pillars, Topics, Buckets
            {
              id: "strategy_pillars",
              title: "Strategy: Pillars, Topics, Buckets",
              subtitle: "Build a framework that generates unlimited viral-worthy content ideas",
              icon: "strategy",
              color: "#FFCC00",
              thumbnail: "strategy_pillars.jpg",
              points: [
                "Develop a content engine that never runs out of engaging ideas",
                "Create a framework for consistent growth without creative burnout",
                "Learn how to systematically identify topics your audience craves"
              ],
              tracks: ["Content Creator Growth", "Scriptwriters/Researchers", "Founders"],
              duration: 35,
              founderMustWatch: true,
              entrepreneurSpecific: true,
              popular: true,
              featured: true,
              submodules: [
                {
                  id: "defining_pillars",
                  title: "Defining Your Content Pillars",
                  subtitle: "The foundation that gives your content direction and consistency",
                  duration: 8,
                  difficulty: 2,
                  resources: ["pdf", "workshop", "worksheets"],
                  highValue: true,
                  week: 1,
                  instructor: "Joden"
                },
                {
                  id: "generating_topics",
                  title: "Generating Engaging Topics",
                  subtitle: "How to develop specific angles that captivate your target audience",
                  duration: 7,
                  difficulty: 2,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 1,
                  instructor: "Joden"
                },
                {
                  id: "content_buckets",
                  title: "Creating Content Buckets",
                  subtitle: "The repeatable formats that build your brand identity and recognition",
                  duration: 9,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 1,
                  instructor: "Joden"
                },
                {
                  id: "content_ratio",
                  title: "The 70:20:10 Rule",
                  subtitle: "Balance broad appeal, focused value, and conversion content for maximum growth",
                  duration: 6,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 1,
                  instructor: "Joden"
                },
                {
                  id: "strategy_implementation",
                  title: "Implementation Workshop",
                  subtitle: "Apply what you've learned to develop your own custom content strategy",
                  duration: 5,
                  difficulty: 3,
                  resources: ["workshop", "worksheets"],
                  highValue: true,
                  week: 1,
                  instructor: "Joden"
                }
              ]
            },
            
            // Module: Hooking Fundamentals
            {
              id: "hooking_fundamentals",
              title: "Hooking Fundamentals",
              subtitle: "Master the art of the first 3 seconds that determine your video's success",
              icon: "hook",
              color: "#50E3C2",
              thumbnail: "hooking_fundamentals.jpg",
              points: [
                "Learn the psychological triggers that make viewers stop scrolling instantly",
                "Master the three components of an irresistible hook that works across platforms",
                "See real examples of hooks that transformed ordinary videos into viral sensations"
              ],
              tracks: ["Content Creator Growth", "Scriptwriters/Researchers"],
              duration: 30,
              founderMustWatch: true,
              entrepreneurSpecific: false,
              popular: true,
              featured: true,
              submodules: [
                {
                  id: "hook_importance",
                  title: "Why Hooks Matter",
                  subtitle: "The psychology behind what makes viewers stop scrolling",
                  duration: 5,
                  difficulty: 1,
                  resources: ["pdf"],
                  highValue: true,
                  week: 1,
                  instructor: "Joden"
                },
                {
                  id: "hook_clarity",
                  title: "Clarity & Intrigue",
                  subtitle: "The perfect balance that creates curiosity without confusion",
                  duration: 8,
                  difficulty: 2,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 1,
                  instructor: "Joden"
                },
                {
                  id: "hook_authority",
                  title: "Establishing Authority",
                  subtitle: "How to subtly convey expertise without sounding arrogant",
                  duration: 6,
                  difficulty: 2,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 1,
                  instructor: "Joden"
                },
                {
                  id: "hook_delivery",
                  title: "Hook Delivery",
                  subtitle: "Voice, energy, and presentation techniques that maximize impact",
                  duration: 5,
                  difficulty: 2,
                  resources: ["pdf", "workshop"],
                  highValue: true,
                  week: 1,
                  instructor: "Joden"
                },
                {
                  id: "text_visual_hooks",
                  title: "Text & Visual Hooks",
                  subtitle: "Leveraging on-screen elements to create multi-dimensional engagement",
                  duration: 6,
                  difficulty: 2,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 1,
                  instructor: "Joden"
                }
              ]
            }
          ]
        },
        
        // Section: Theory Advanced
        {
          id: "theory_advanced",
          name: "Theory Advanced",
          number: 2,
          modules: [
            // Module: Nuanced Hook: Morally Dubious
            {
              id: "nuanced_hook",
              title: "Nuanced Hook: Morally Dubious",
              subtitle: "Advanced hook strategies that generate massive engagement (without crossing ethical lines)",
              icon: "advanced-hook",
              color: "#FF9500",
              thumbnail: "nuanced_hook.jpg",
              points: [
                "Learn the controversial hook techniques that top creators use to generate millions of views",
                "Master the balance between provocation and staying on the right side of platform policies",
                "Discover how to create debate-driving content that maintains your professional integrity"
              ],
              tracks: ["Content Creator Growth", "Scriptwriters/Researchers"],
              duration: 35,
              founderMustWatch: false,
              entrepreneurSpecific: false,
              popular: true,
              featured: false,
              submodules: [
                {
                  id: "big_small_hook",
                  title: "The Big-Small Hook",
                  subtitle: "Connect something tiny to something massive to create instant intrigue",
                  duration: 7,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "false_assumption",
                  title: "The False Assumption Hook",
                  subtitle: "Create FOMO that compels viewers to watch to the end",
                  duration: 7,
                  difficulty: 4,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "impossible_question",
                  title: "The Impossible Question Hook",
                  subtitle: "Generate massive engagement through provocative framing",
                  duration: 7,
                  difficulty: 4,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "contrarian_statement",
                  title: "The Lighthearted Contrarian Statement",
                  subtitle: "Spark debate without damaging your brand reputation",
                  duration: 7,
                  difficulty: 4,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "urgency_hook",
                  title: "The 'This JUST Happened' Hook",
                  subtitle: "Create urgency that makes viewers feel they can't miss out",
                  duration: 7,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                }
              ]
            },
            
            // Module: Advanced Emotional Positioning
            {
              id: "emotional_positioning",
              title: "Advanced Emotional Positioning",
              subtitle: "Harness powerful emotions to create content that resonates and drives action",
              icon: "emotions",
              color: "#AF52DE",
              thumbnail: "emotional_positioning.jpg",
              points: [
                "Learn how to strategically trigger emotions that stop the scroll and drive engagement",
                "Discover the four core emotions that consistently drive viral sharing",
                "Master the subtle art of providing emotional catharsis to build loyal followers"
              ],
              tracks: ["Content Creator Growth", "Scriptwriters/Researchers", "Founders"],
              duration: 30,
              founderMustWatch: true,
              entrepreneurSpecific: true,
              popular: true,
              featured: false,
              submodules: [
                {
                  id: "emotion_anger",
                  title: "Harnessing Anger",
                  subtitle: "The most engaging emotion and how to use it responsibly",
                  duration: 7,
                  difficulty: 4,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "emotion_fear",
                  title: "Leveraging Fear & Anxiety",
                  subtitle: "Creating FOMO and urgency that compels action",
                  duration: 7,
                  difficulty: 4,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "emotion_surprise",
                  title: "The Power of Surprise",
                  subtitle: "Pattern interruption techniques that wake viewers from passive scrolling",
                  duration: 7,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "emotion_catharsis",
                  title: "Creating Catharsis",
                  subtitle: "The ultimate emotional payoff that builds deep audience connection",
                  duration: 9,
                  difficulty: 4,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                }
              ]
            },
            
            // Module: Script Mastery
            {
              id: "script_mastery",
              title: "Script Mastery: Optimising for Engagement",
              subtitle: "Advanced scripting techniques that maximize retention and drive massive engagement",
              icon: "script-pro",
              color: "#50E3C2",
              thumbnail: "script_mastery.jpg",
              points: [
                "Learn the secret scripting hacks that top creators use to generate millions of comments",
                "Master the art of conversion-optimized scripts that turn viewers into paying customers",
                "Discover how to craft scripts that keep viewers watching until the very last second"
              ],
              tracks: ["Content Creator Growth", "Scriptwriters/Researchers", "Founders"],
              duration: 35,
              founderMustWatch: true,
              entrepreneurSpecific: true,
              popular: true,
              featured: false,
              submodules: [
                {
                  id: "comment_optimization",
                  title: "Optimizing for Comments",
                  subtitle: "Strategic scripting techniques that fill your comment section with engagement",
                  duration: 9,
                  difficulty: 4,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "conversion_scripts",
                  title: "Conversion-Optimized Scripts",
                  subtitle: "The perfect CTA placement that drives action without killing retention",
                  duration: 8,
                  difficulty: 4,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "retention_optimization",
                  title: "Optimizing for Watch Time",
                  subtitle: "Script structures that keep viewers engaged until the final second",
                  duration: 8,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "hooks_rehooks",
                  title: "The Art of Re-Hooking",
                  subtitle: "Keep viewers watching with strategically placed curiosity loops",
                  duration: 5,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "script_hacks",
                  title: "Advanced Script Hacks",
                  subtitle: "Psychological triggers that create viral-worthy engagement",
                  duration: 5,
                  difficulty: 4,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                }
              ]
            },
            
            // Module: Complex Formats & Remixing
            {
              id: "complex_formats",
              title: "Complex Formats & Remixing",
              subtitle: "Take your content to the next level with advanced format combinations that viewers can't resist",
              icon: "remix",
              color: "#FF9500",
              thumbnail: "complex_formats.jpg",
              points: [
                "Discover how to combine popular formats to create unique, attention-grabbing content",
                "Learn the art of pattern disruption that keeps viewers engaged throughout your videos",
                "Master the last-minute pivot technique that drives massive comment engagement"
              ],
              tracks: ["Content Creator Growth", "Scriptwriters/Researchers"],
              duration: 30,
              founderMustWatch: false,
              entrepreneurSpecific: false,
              popular: true,
              featured: false,
              submodules: [
                {
                  id: "format_layering",
                  title: "Format Layering",
                  subtitle: "Combining multiple formats to create rich, engaging content",
                  duration: 8,
                  difficulty: 4,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "format_subversion",
                  title: "Breaking Format Expectations",
                  subtitle: "Pattern disruption techniques that wake viewers from passive scrolling",
                  duration: 7,
                  difficulty: 4,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "unexpected_pivot",
                  title: "The Unexpected Pivot",
                  subtitle: "Last-minute format changes that drive massive comment engagement",
                  duration: 8,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "format_experimentation",
                  title: "Format Experimentation",
                  subtitle: "Testing and iterating to discover your unique winning combinations",
                  duration: 7,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                }
              ]
            },
            
            // Module: Data-Led Iteration
            {
              id: "data_led_iteration",
              title: "Data-Led Iteration",
              subtitle: "Transform underperforming content into viral hits through strategic iteration",
              icon: "data",
              color: "#5856D6",
              thumbnail: "data_led_iteration.jpg",
              points: [
                "Learn how to analyze video performance data to identify exactly what's working and what's not",
                "Discover the three-step process for systematically improving underperforming content",
                "Master the art of turning one viral hit into an entire series of successful videos"
              ],
              tracks: ["Content Creator Growth", "Holistic Approach", "Founders"],
              duration: 25,
              founderMustWatch: true,
              entrepreneurSpecific: true,
              popular: true,
              featured: false,
              submodules: [
                {
                  id: "retention_analysis",
                  title: "Retention Analysis",
                  subtitle: "Interpreting retention graphs to pinpoint exactly where viewers drop off",
                  duration: 7,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "comment_analysis",
                  title: "Comment Analysis",
                  subtitle: "Extract actionable insights from viewer feedback to improve content",
                  duration: 6,
                  difficulty: 2,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "iteration_process",
                  title: "The Iteration Process",
                  subtitle: "The systematic approach to improving underperforming content",
                  duration: 6,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "viral_analysis",
                  title: "Viral Hit Analysis",
                  subtitle: "Identify exactly why a video went viral and replicate that success",
                  duration: 6,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                }
              ]
            },
            
            // Module: Authority and Brand Holism
            {
              id: "authority_brand",
              title: "Authority and Brand Holism through Short Form",
              subtitle: "Establish yourself as the go-to expert in your niche through strategic positioning",
              icon: "authority",
              color: "#FF3B30",
              thumbnail: "authority_brand.jpg",
              points: [
                "Learn how to become \"the person who...\" in your industry through consistent positioning",
                "Discover how to subtly convey expertise without coming across as arrogant",
                "Master the art of creating a unique, recognizable format that builds your brand identity"
              ],
              tracks: ["Content Creator Growth", "Founders"],
              duration: 30,
              founderMustWatch: true,
              entrepreneurSpecific: true,
              popular: true,
              featured: true,
              submodules: [
                {
                  id: "subtle_bragging",
                  title: "The Art of Subtle Bragging",
                  subtitle: "How to establish credibility without alienating your audience",
                  duration: 8,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "visual_authority",
                  title: "Visual Authority Signals",
                  subtitle: "Using setting, props, and presentation to establish expertise",
                  duration: 7,
                  difficulty: 2,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "unique_positioning",
                  title: "Unique Positioning Strategy",
                  subtitle: "Becoming 'the person who...' instead of just another creator in your niche",
                  duration: 8,
                  difficulty: 4,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "format_uniqueness",
                  title: "Format Development",
                  subtitle: "Creating a signature style that viewers instantly recognize",
                  duration: 7,
                  difficulty: 4,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                }
              ]
            },
            
            // Additional modules follow the same pattern
            // Module: Advanced Engagement Metrics
            {
              id: "advanced_metrics",
              title: "Advanced Engagement Metrics",
              subtitle: "Master the deeper metrics that drive algorithmic success and audience growth",
              icon: "metrics",
              color: "#4A90E2",
              thumbnail: "advanced_metrics.jpg",
              points: [
                "Go beyond basic metrics to understand the nuanced data that truly drives growth",
                "Learn how to optimize specifically for the metrics that matter most to the algorithm",
                "Discover how to tailor your content to maximize specific engagement types"
              ],
              tracks: ["Content Creator Growth", "Holistic Approach", "Founders"],
              duration: 25,
              founderMustWatch: true,
              entrepreneurSpecific: true,
              popular: false,
              featured: false,
              submodules: [
                {
                  id: "follower_conversion",
                  title: "Follower Conversion",
                  subtitle: "Strategies to transform casual viewers into loyal followers",
                  duration: 6,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "watch_completion",
                  title: "Percentage Completed Watch Time",
                  subtitle: "Techniques to keep viewers engaged until the final second",
                  duration: 6,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "demographic_analysis",
                  title: "Demographic Analysis",
                  subtitle: "Understanding your audience to tailor content for maximum impact",
                  duration: 7,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "traffic_sources",
                  title: "Traffic Source Optimization",
                  subtitle: "Leveraging different sources to maximize algorithmic exposure",
                  duration: 6,
                  difficulty: 4,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                }
              ]
            },
            
            // Module: Handling a Comment Section
            {
              id: "comment_section",
              title: "Handling a Comment Section",
              subtitle: "Turn your comment section into a powerful community-building and growth tool",
              icon: "comments",
              color: "#30D158",
              thumbnail: "comment_section.jpg",
              points: [
                "Learn when and how to engage with comments to maximize growth and build loyalty",
                "Discover strategies for handling negative comments that turn critics into fans",
                "Master the art of using comments to create a thriving, engaged community"
              ],
              tracks: ["Content Creator Growth", "Founders"],
              duration: 25,
              founderMustWatch: true,
              entrepreneurSpecific: true,
              popular: true,
              featured: false,
              submodules: [
                {
                  id: "negative_comments",
                  title: "Handling Negative Comments",
                  subtitle: "How to respond to criticism without damaging your brand",
                  duration: 7,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "debate_management",
                  title: "Managing Debates",
                  subtitle: "Steering controversial conversations to maximize engagement",
                  duration: 6,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "information_gaps",
                  title: "Filling Information Gaps",
                  subtitle: "Using comments to provide additional context and value",
                  duration: 6,
                  difficulty: 2,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "community_building",
                  title: "Building Community Through Comments",
                  subtitle: "Strategies to foster connection and loyalty among viewers",
                  duration: 6,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                }
              ]
            },

            // Module: The Importance of Lo-Fi
            {
              id: "importance_lofi",
              title: "The Importance of Lo-Fi",
              subtitle: "Why authenticity trumps production value in the battle for audience attention",
              icon: "authentic",
              color: "#FF9500",
              thumbnail: "importance_lofi.jpg",
              points: [
                "Understand why over-produced content often performs worse than authentic, lo-fi videos",
                "Learn the balance between professional quality and relatable authenticity",
                "Discover how to make your content feel genuine even with higher production value"
              ],
              tracks: ["Content Creator Growth", "Founders"],
              duration: 30,
              founderMustWatch: true,
              entrepreneurSpecific: true,
              popular: true,
              featured: false,
              submodules: [
                {
                  id: "lofi_psychology",
                  title: "The Psychology of Lo-Fi",
                  subtitle: "Why audiences connect more deeply with authentic content",
                  duration: 7,
                  difficulty: 2,
                  resources: ["pdf"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "production_balance",
                  title: "Finding the Production Balance",
                  subtitle: "The sweet spot between quality and authenticity",
                  duration: 8,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "authentic_techniques",
                  title: "Techniques for Authentic Delivery",
                  subtitle: "Presentation methods that feel genuine and relatable",
                  duration: 7,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "respect_platform",
                  title: "Respecting Platform Culture",
                  subtitle: "Why understanding platform norms is crucial for content success",
                  duration: 8,
                  difficulty: 2,
                  resources: ["pdf"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                }
              ]
            },
            
            // Module: The Founders Paradox
            {
              id: "founders_paradox",
              title: "The Founders Paradox",
              subtitle: "How busy entrepreneurs can create authentic, engaging content without sacrificing professionalism",
              icon: "founders",
              color: "#FF3B30",
              thumbnail: "founders_paradox.jpg",
              points: [
                "Discover how to balance professional credibility with platform-native authenticity",
                "Learn strategic batching techniques that save time without sacrificing quality",
                "Master the art of finding the right talent to execute your content vision"
              ],
              tracks: ["Founders"],
              duration: 35,
              founderMustWatch: true,
              entrepreneurSpecific: true,
              popular: true,
              featured: true,
              submodules: [
                {
                  id: "authenticity_balance",
                  title: "The Authenticity Balance",
                  subtitle: "Creating content that feels authentic without sacrificing authority",
                  duration: 8,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "founder_batching",
                  title: "Strategic Batching for Busy Founders",
                  subtitle: "Maximize efficiency without sacrificing authenticity",
                  duration: 9,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "talent_selection",
                  title: "Finding the Right Creative Talent",
                  subtitle: "How to select team members who understand the balance",
                  duration: 8,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "presentation_style",
                  title: "Developing Your Presentation Style",
                  subtitle: "Authentic delivery techniques for camera-shy founders",
                  duration: 5,
                  difficulty: 3,
                  resources: ["pdf", "workshop"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                },
                {
                  id: "founder_formats",
                  title: "Founder-Friendly Formats",
                  subtitle: "Content structures that work well for busy entrepreneurs",
                  duration: 5,
                  difficulty: 2,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 2,
                  instructor: "Tia Warner"
                }
              ]
            }

            // Continue with the rest of the modules for theory_advanced and other sections as needed
          ]
        },
        
        // Section: Research
        {
          id: "research",
          name: "Research",
          number: 3,
          modules: [
            // Module: Research Basics
            {
              id: "research_basics",
              title: "Research Basics",
              subtitle: "Find and adapt viral-worthy content without starting from scratch",
              icon: "research",
              color: "#34C759",
              thumbnail: "research_basics.jpg",
              points: [
                "Learn how to find pre-validated content ideas that are guaranteed to perform well",
                "Discover the sources that top creators use for reliable inspiration",
                "Master the art of adaptation that transforms existing ideas into unique content"
              ],
              tracks: ["Content Creator Growth", "Scriptwriters/Researchers"],
              duration: 30,
              founderMustWatch: false,
              entrepreneurSpecific: false,
              popular: true,
              featured: false,
              submodules: [
                {
                  id: "active_scrolling",
                  title: "Active Scrolling",
                  subtitle: "The critical mindset shift that transforms casual viewing into research",
                  duration: 7,
                  difficulty: 2,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 1,
                  instructor: "Tia Warner"
                },
                {
                  id: "keyword_research",
                  title: "Keyword Research for Short Form",
                  subtitle: "Finding the terms that lead to valuable content inspiration",
                  duration: 8,
                  difficulty: 2,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 1,
                  instructor: "Tia Warner"
                },
                {
                  id: "algorithm_tailoring",
                  title: "Algorithm Tailoring",
                  subtitle: "Creating a research-focused feed that delivers consistent inspiration",
                  duration: 8,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 1,
                  instructor: "Tia Warner"
                },
                {
                  id: "cross_platform",
                  title: "Cross-Platform Research",
                  subtitle: "Finding inspiration in unexpected places beyond short form",
                  duration: 7,
                  difficulty: 2,
                  resources: ["pdf"],
                  highValue: true,
                  week: 1,
                  instructor: "Tia Warner"
                }
              ]
            },
            
            // Module: Research Advanced Tasks
            {
              id: "research_advanced",
              title: "Research Advanced Tasks",
              subtitle: "Transform raw research into focused, actionable content ideas",
              icon: "adv-research",
              color: "#34C759",
              thumbnail: "research_advanced.jpg",
              points: [
                "Master the art of sifting through massive research to identify the most valuable elements",
                "Learn how to verify information and ensure your content maintains credibility",
                "Discover techniques for extracting the emotional core that drives engagement"
              ],
              tracks: ["Scriptwriters/Researchers", "Content Creator Growth"],
              duration: 25,
              founderMustWatch: false,
              entrepreneurSpecific: false,
              popular: true,
              featured: false,
              submodules: [
                {
                  id: "research_verification",
                  title: "Verification Techniques",
                  subtitle: "Ensuring accuracy and credibility in your research",
                  duration: 6,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 3,
                  instructor: "Tia Warner"
                },
                {
                  id: "high_impact_selection",
                  title: "Cherry-Picking for Impact",
                  subtitle: "Identifying the most emotionally resonant elements in your research",
                  duration: 7,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 3,
                  instructor: "Tia Warner"
                },
                {
                  id: "theme_identification",
                  title: "Theme Identification",
                  subtitle: "Finding common threads across multiple research sources",
                  duration: 6,
                  difficulty: 4,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 3,
                  instructor: "Tia Warner"
                },
                {
                  id: "content_refinement",
                  title: "Content Refinement",
                  subtitle: "Streamlining research into concise, impactful material",
                  duration: 6,
                  difficulty: 4,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 3,
                  instructor: "Tia Warner"
                }
              ]
            }
          ]
        },
        
        // Section: Repurposing
        {
          id: "repurposing",
          name: "Repurposing",
          number: 4,
          modules: [
            // Module: Repurposing Normal
            {
              id: "repurposing_normal",
              title: "Repurposing Normal",
              subtitle: "Transform existing content into platform-optimized short form videos",
              icon: "recycle",
              color: "#30D158",
              thumbnail: "repurposing_normal.jpg",
              points: [
                "Learn how to identify high-potential content that's ready for repurposing",
                "Discover techniques to adapt long-form content for maximum short-form impact",
                "Master the art of maintaining the original value while optimizing for new platforms"
              ],
              tracks: ["Content Creator Growth", "Scriptwriters/Researchers"],
              duration: 30,
              founderMustWatch: false,
              entrepreneurSpecific: false,
              popular: true,
              featured: false,
              submodules: [
                {
                  id: "pre_script_research",
                  title: "Pre-Script Research Approach",
                  subtitle: "Finding and evaluating content worth repurposing",
                  duration: 7,
                  difficulty: 2,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 3,
                  instructor: "Tia Warner"
                },
                {
                  id: "short_form_adaptation",
                  title: "Short Form Adaptation",
                  subtitle: "Transforming long-form content into engaging short videos",
                  duration: 8,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 3,
                  instructor: "Tia Warner"
                },
                {
                  id: "article_repurposing",
                  title: "Article Repurposing",
                  subtitle: "Converting written content into compelling visual scripts",
                  duration: 7,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 3,
                  instructor: "Tia Warner"
                },
                {
                  id: "value_retention",
                  title: "Value Retention Techniques",
                  subtitle: "Maintaining core insights while adapting for shorter formats",
                  duration: 8,
                  difficulty: 4,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 3,
                  instructor: "Tia Warner"
                }
              ]
            },
            
            // Module: Repurposing from LinkedIn
            {
              id: "linkedin_repurposing",
              title: "Repurposing from LinkedIn: Worked Examples",
              subtitle: "Transform professional content into platform-native short form videos",
              icon: "linkedin",
              color: "#0077B5",
              thumbnail: "linkedin_repurposing.jpg",
              points: [
                "Learn how to adapt professional LinkedIn content for casual short-form platforms",
                "See real-world transformations of different LinkedIn post types into viral videos",
                "Master the art of maintaining authority while avoiding the \"corporate\" cardinal sin"
              ],
              tracks: ["Founders", "Content Creator Growth", "Scriptwriters/Researchers"],
              duration: 35,
              founderMustWatch: true,
              entrepreneurSpecific: true,
              popular: true,
              featured: false,
              submodules: [
                {
                  id: "listicle_transformation",
                  title: "Listicle Transformation",
                  subtitle: "Converting LinkedIn lists into engaging short-form content",
                  duration: 9,
                  difficulty: 3,
                  resources: ["pdf", "worksheets", "examples"],
                  highValue: true,
                  week: 3,
                  instructor: "Tia Warner"
                },
                {
                  id: "case_study_adaptation",
                  title: "Case Study Adaptation",
                  subtitle: "Turning business analyses into visually engaging stories",
                  duration: 9,
                  difficulty: 4,
                  resources: ["pdf", "worksheets", "examples"],
                  highValue: true,
                  week: 3,
                  instructor: "Tia Warner"
                },
                {
                  id: "founder_story_conversion",
                  title: "Founder Story Conversion",
                  subtitle: "Adapting personal business narratives for authentic short-form delivery",
                  duration: 9,
                  difficulty: 3,
                  resources: ["pdf", "worksheets", "examples"],
                  highValue: true,
                  week: 3,
                  instructor: "Tia Warner"
                },
                {
                  id: "corporate_detuning",
                  title: "Corporate Detuning Techniques",
                  subtitle: "Removing professional jargon while maintaining credibility",
                  duration: 8,
                  difficulty: 4,
                  resources: ["pdf", "worksheets", "examples"],
                  highValue: true,
                  week: 3,
                  instructor: "Tia Warner"
                }
              ]
            },
            
            // Module: Serialisation
            {
              id: "serialisation",
              title: "Serialisation",
              subtitle: "Create consistent series that build audience anticipation and loyalty",
              icon: "series",
              color: "#FFCC00",
              thumbnail: "serialisation.jpg",
              points: [
                "Learn how to design content series that keep viewers coming back daily",
                "Discover how to turn a single viral hit into an entire successful series",
                "Master the art of maintaining audience interest across multiple episodes"
              ],
              tracks: ["Content Creator Growth", "Scriptwriters/Researchers"],
              duration: 25,
              founderMustWatch: false,
              entrepreneurSpecific: false,
              popular: true,
              featured: false,
              submodules: [
                {
                  id: "series_from_scratch",
                  title: "Creating a Series from Scratch",
                  subtitle: "Designing serialized content with built-in audience engagement",
                  duration: 6,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 3,
                  instructor: "Tia Warner"
                },
                {
                  id: "viral_extension",
                  title: "Extending Viral Success",
                  subtitle: "Transforming one successful video into a series of hits",
                  duration: 7,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 3,
                  instructor: "Tia Warner"
                },
                {
                  id: "audience_interaction",
                  title: "Series with Audience Interaction",
                  subtitle: "Creating formats that incorporate viewer participation",
                  duration: 6,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 3,
                  instructor: "Tia Warner"
                },
                {
                  id: "series_lifecycle",
                  title: "Managing Series Lifecycle",
                  subtitle: "Recognizing when to evolve or end a series for maximum impact",
                  duration: 6,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 3,
                  instructor: "Tia Warner"
                }
              ]
            }
          ]
        }
      ]
    },
    
    // Category: Production
    {
      id: "production",
      name: "Production",
      color: "#FF9500",
      sections: [
        // Section: Shooting
        {
          id: "shooting",
          name: "Shooting",
          number: 5,
          modules: [
            // Module: Solo Phone Shooter
            {
              id: "solo_phone",
              title: "Solo Phone Shooter",
              subtitle: "Create professional-quality content with just your smartphone",
              icon: "mobile",
              color: "#5856D6",
              thumbnail: "solo_phone.jpg",
              points: [
                "Learn how to produce high-quality videos using only your smartphone",
                "Discover simple techniques for professional lighting and audio with minimal equipment",
                "Master the art of self-recording that looks and sounds polished"
              ],
              tracks: ["Content Creator Growth", "Technical Skills"],
              duration: 25,
              founderMustWatch: false,
              entrepreneurSpecific: false,
              popular: true,
              featured: false,
              submodules: [
                {
                  id: "phone_setup",
                  title: "Basic Phone Setup",
                  subtitle: "Essential settings and preparation for quality smartphone recording",
                  duration: 6,
                  difficulty: 1,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 3,
                  instructor: "Aydan"
                },
                {
                  id: "lighting_techniques",
                  title: "Simple Lighting Techniques",
                  subtitle: "Creating professional lighting with household items",
                  duration: 7,
                  difficulty: 2,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 3,
                  instructor: "Aydan"
                },
                {
                  id: "audio_for_phones",
                  title: "Audio Optimization",
                  subtitle: "Getting clean, clear sound with smartphone recording",
                  duration: 6,
                  difficulty: 2,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 3,
                  instructor: "Aydan"
                },
                {
                  id: "self_recording",
                  title: "Self-Recording Techniques",
                  subtitle: "Methods for recording yourself effectively without assistance",
                  duration: 6,
                  difficulty: 2,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 3,
                  instructor: "Aydan"
                }
              ]
            },
            
            // Module: Setting up a Studio Space
            {
              id: "studio_setup",
              title: "Setting up a Studio Space",
              subtitle: "Create a professional recording environment that elevates your content quality",
              icon: "studio",
              color: "#FF9500",
              thumbnail: "studio_setup.jpg",
              points: [
                "Learn how to create a professional studio setup without breaking the bank",
                "Discover the essential equipment that makes the biggest impact on quality",
                "Master space management techniques for clean, consistent production"
              ],
              tracks: ["Technical Skills", "Video Producers"],
              duration: 30,
              founderMustWatch: false,
              entrepreneurSpecific: true,
              popular: true,
              featured: false,
              submodules: [
                {
                  id: "camera_setup",
                  title: "Camera Selection and Setup",
                  subtitle: "Choosing the right camera and optimizing settings for short form",
                  duration: 8,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 3,
                  instructor: "Joden"
                },
                {
                  id: "audio_setup",
                  title: "Audio Setup",
                  subtitle: "Creating a clean, professional sound environment",
                  duration: 7,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 3,
                  instructor: "Joden"
                },
                {
                  id: "lighting_design",
                  title: "Lighting Design",
                  subtitle: "Professional lighting techniques for flattering, consistent results",
                  duration: 8,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 3,
                  instructor: "Joden"
                },
                {
                  id: "space_management",
                  title: "Space Management",
                  subtitle: "Optimizing your recording area for efficient production",
                  duration: 7,
                  difficulty: 2,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 3,
                  instructor: "Joden"
                }
              ]
            },
            
            // Module: Camera Confidence
            {
              id: "camera_confidence",
              title: "Camera Confidence",
              subtitle: "Develop natural, engaging presentation skills that connect with viewers",
              icon: "confidence",
              color: "#BF5AF2",
              thumbnail: "camera_confidence.jpg",
              points: [
                "Overcome camera anxiety with proven techniques used by professional presenters",
                "Learn the delivery styles that create authentic connection with viewers",
                "Master the art of conversational presentation that boosts engagement"
              ],
              tracks: ["Content Creator Growth", "Founders"],
              duration: 25,
              founderMustWatch: true,
              entrepreneurSpecific: true,
              popular: true,
              featured: false,
              submodules: [
                {
                  id: "anxiety_reduction",
                  title: "Camera Anxiety Reduction",
                  subtitle: "Proven techniques to feel comfortable and natural on camera",
                  duration: 6,
                  difficulty: 2,
                  resources: ["pdf", "workshop"],
                  highValue: true,
                  week: 3,
                  instructor: "Aydan"
                },
                {
                  id: "eye_contact",
                  title: "Eye Contact and Engagement",
                  subtitle: "Creating connection through effective camera interaction",
                  duration: 6,
                  difficulty: 2,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 3,
                  instructor: "Aydan"
                },
                {
                  id: "voice_elocution",
                  title: "Voice and Elocution",
                  subtitle: "Speaking techniques that boost clarity and engagement",
                  duration: 7,
                  difficulty: 3,
                  resources: ["pdf", "workshop"],
                  highValue: true,
                  week: 3,
                  instructor: "Aydan"
                },
                {
                  id: "conversational_delivery",
                  title: "Conversational Delivery",
                  subtitle: "Creating an authentic, relatable presentation style",
                  duration: 6,
                  difficulty: 3,
                  resources: ["pdf", "workshop"],
                  highValue: true,
                  week: 3,
                  instructor: "Aydan"
                }
              ]
            }
            
            // Add more modules for the Shooting section as needed
          ]
        },
        
        // Section: Editing
        {
          id: "editing",
          name: "Editing",
          number: 6,
          modules: [
            // Module: Editing Basics
            {
              id: "editing_basics",
              title: "Editing Basics",
              subtitle: "Learn the fundamental techniques for creating engaging short-form videos",
              icon: "edit-basic",
              color: "#30D158",
              thumbnail: "editing_basics.jpg",
              points: [
                "Master the essential editing skills that transform raw footage into engaging content",
                "Learn intuitive software techniques that save time and improve quality",
                "Discover simple visual enhancements that make your videos stand out"
              ],
              tracks: ["Content Creator Growth", "Technical Skills", "Video Editors"],
              duration: 25,
              founderMustWatch: false,
              entrepreneurSpecific: false,
              popular: true,
              featured: false,
              submodules: [
                {
                  id: "capcut_basics",
                  title: "CapCut Fundamentals",
                  subtitle: "Essential skills for the most accessible editing platform",
                  duration: 6,
                  difficulty: 1,
                  resources: ["pdf", "workshop"],
                  highValue: true,
                  week: 4,
                  instructor: "Aydan"
                },
                {
                  id: "basic_enhancement",
                  title: "Video Enhancement Techniques",
                  subtitle: "Simple adjustments that improve visual appeal",
                  duration: 6,
                  difficulty: 2,
                  resources: ["pdf", "workshop"],
                  highValue: true,
                  week: 4,
                  instructor: "Aydan"
                },
                {
                  id: "transitions_effects",
                  title: "Transitions and Effects",
                  subtitle: "Adding visual interest without overwhelming viewers",
                  duration: 7,
                  difficulty: 2,
                  resources: ["pdf", "workshop"],
                  highValue: true,
                  week: 4,
                  instructor: "Aydan"
                },
                {
                  id: "audio_editing",
                  title: "Basic Audio Editing",
                  subtitle: "Creating clean, clear sound for maximum engagement",
                  duration: 6,
                  difficulty: 2,
                  resources: ["pdf", "workshop"],
                  highValue: true,
                  week: 4,
                  instructor: "Aydan"
                }
              ]
            },
            
            // Module: Editing Advanced
            {
              id: "editing_advanced",
              title: "Editing Advanced",
              subtitle: "Professional techniques that elevate your content to the next level",
              icon: "edit-pro",
              color: "#FF9500",
              thumbnail: "editing_advanced.jpg",
              points: [
                "Master advanced editing techniques used by top content creators",
                "Learn professional color grading that creates a distinctive visual style",
                "Discover time-saving workflows that dramatically increase your output"
              ],
              tracks: ["Technical Skills", "Video Editors"],
              duration: 35,
              founderMustWatch: false,
              entrepreneurSpecific: false,
              popular: true,
              featured: false,
              submodules: [
                {
                  id: "premiere_workflow",
                  title: "Premiere Pro Workflow",
                  subtitle: "Setting up efficient projects for consistent, rapid editing",
                  duration: 9,
                  difficulty: 4,
                  resources: ["pdf", "workshop"],
                  highValue: true,
                  week: 4,
                  instructor: "Joden"
                },
                {
                  id: "advanced_color",
                  title: "Advanced Color Grading",
                  subtitle: "Creating a distinctive visual style through professional color techniques",
                  duration: 9,
                  difficulty: 4,
                  resources: ["pdf", "workshop"],
                  highValue: true,
                  week: 4,
                  instructor: "Joden"
                },
                {
                  id: "motion_graphics",
                  title: "Motion Graphics Integration",
                  subtitle: "Adding professional visual elements that enhance engagement",
                  duration: 8,
                  difficulty: 4,
                  resources: ["pdf", "workshop"],
                  highValue: true,
                  week: 4,
                  instructor: "Joden"
                },
                {
                  id: "batch_processing",
                  title: "Batch Processing Techniques",
                  subtitle: "Workflows that maximize efficiency for high-volume content",
                  duration: 9,
                  difficulty: 3,
                  resources: ["pdf", "workshop"],
                  highValue: true,
                  week: 4,
                  instructor: "Joden"
                }
              ]
            }
            
            // Add more modules for the Editing section as needed
          ]
        }
      ]
    },
    
    // Category: Business Growth
    {
      id: "business",
      name: "Business Growth",
      color: "#B92234",
      sections: [
        // Section: Monetisation
        {
          id: "monetisation",
          name: "Monetisation",
          number: 9,
          modules: [
            // Module: Monetisation Pro
            {
              id: "monetisation_pro",
              title: "Monetisation Pro",
              subtitle: "Build product-based revenue streams from your audience",
              icon: "money-pro",
              color: "#FF9500",
              thumbnail: "monetisation_pro.jpg",
              points: [
                "Learn how to develop products that your audience actually wants to buy",
                "Discover strategies for selling to followers without jeopardizing trust",
                "Master the art of building sales funnels that convert casual viewers to customers"
              ],
              tracks: ["Founders", "Content Creator Growth"],
              duration: 30,
              founderMustWatch: true,
              entrepreneurSpecific: true,
              popular: true,
              featured: true,
              submodules: [
                {
                  id: "audience_alignment",
                  title: "Audience-Product Alignment",
                  subtitle: "Creating offerings that resonate with your specific followers",
                  duration: 8,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 6,
                  instructor: "Alex O'Connor"
                },
                {
                  id: "trust_selling",
                  title: "Trust-Based Selling Techniques",
                  subtitle: "Converting without compromising audience relationship",
                  duration: 7,
                  difficulty: 4,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 6,
                  instructor: "Alex O'Connor"
                },
                {
                  id: "content_funnel",
                  title: "Content-to-Customer Funnel",
                  subtitle: "Creating strategic pathways from viewer to buyer",
                  duration: 8,
                  difficulty: 4,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 6,
                  instructor: "Alex O'Connor"
                },
                {
                  id: "product_strategy",
                  title: "Product Development Strategy",
                  subtitle: "Creating scalable offerings that match your audience needs",
                  duration: 7,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 6,
                  instructor: "Alex O'Connor"
                }
              ]
            },
            
            // Module: Monetisation Founder
            {
              id: "monetisation_founder",
              title: "Monetisation Founder",
              subtitle: "Leverage your personal brand for lucrative partnerships and opportunities",
              icon: "money-founder",
              color: "#4A90E2",
              thumbnail: "monetisation_founder.jpg",
              points: [
                "Learn how to attract and negotiate high-value brand partnerships",
                "Discover strategies for positioning yourself as the perfect brand ambassador",
                "Master the art of creating mutually beneficial sponsorship relationships"
              ],
              tracks: ["Founders"],
              duration: 30,
              founderMustWatch: true,
              entrepreneurSpecific: true,
              popular: true,
              featured: true,
              submodules: [
                {
                  id: "brand_partnerships",
                  title: "Securing Brand Partnerships",
                  subtitle: "Attracting and negotiating valuable sponsorship deals",
                  duration: 8,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 7,
                  instructor: "Alex O'Connor"
                },
                {
                  id: "media_kit",
                  title: "Media Kit Development",
                  subtitle: "Creating materials that showcase your value to partners",
                  duration: 7,
                  difficulty: 3,
                  resources: ["pdf", "worksheets", "templates"],
                  highValue: true,
                  week: 7,
                  instructor: "Alex O'Connor"
                },
                {
                  id: "agent_relationships",
                  title: "Talent Agent Relationships",
                  subtitle: "Working with representation to secure better deals",
                  duration: 8,
                  difficulty: 4,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 7,
                  instructor: "Alex O'Connor"
                },
                {
                  id: "sponsored_integration",
                  title: "Sponsored Content Integration",
                  subtitle: "Creating authentic, effective branded content",
                  duration: 7,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 7,
                  instructor: "Alex O'Connor"
                }
              ]
            }
            
            // Add more modules for the Monetisation section as needed
          ]
        },
        
        // Section: Conversions
        {
          id: "conversions",
          name: "Conversions",
          number: 10,
          modules: [
            // Module: Taking People off Platform
            {
              id: "off_platform",
              title: "Taking People off Platform",
              subtitle: "Convert casual viewers into loyal fans and paying customers",
              icon: "funnel",
              color: "#FF3B30",
              thumbnail: "off_platform.jpg",
              points: [
                "Learn the fundamental principles of creating an effective audience funnel",
                "Discover strategies for moving followers to owned platforms and channels",
                "Master the balance between platform growth and audience conversion"
              ],
              tracks: ["Founders", "Content Creator Growth"],
              duration: 25,
              founderMustWatch: true,
              entrepreneurSpecific: true,
              popular: true,
              featured: true,
              submodules: [
                {
                  id: "funnel_basics",
                  title: "Audience Funnel Fundamentals",
                  subtitle: "Understanding the progression from stranger to customer",
                  duration: 6,
                  difficulty: 2,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 7,
                  instructor: "Alex O'Connor"
                },
                {
                  id: "off_platform_strategy",
                  title: "Off-Platform Strategy",
                  subtitle: "Moving followers to channels you control",
                  duration: 7,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 7,
                  instructor: "Alex O'Connor"
                },
                {
                  id: "platform_balance",
                  title: "Platform Growth vs. Conversion Balance",
                  subtitle: "Optimizing both audience building and monetization",
                  duration: 6,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 7,
                  instructor: "Alex O'Connor"
                },
                {
                  id: "funnel_metrics",
                  title: "Funnel Metrics and Optimization",
                  subtitle: "Tracking and improving your conversion process",
                  duration: 6,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 7,
                  instructor: "Alex O'Connor"
                }
              ]
            },
            
            // Module: Lead Magnets
            {
              id: "lead_magnets",
              title: "Lead Magnets",
              subtitle: "Create irresistible free offerings that convert followers to leads",
              icon: "magnet",
              color: "#FFCC00",
              thumbnail: "lead_magnets.jpg",
              points: [
                "Learn how to create high-value lead magnets that your audience craves",
                "Discover promotion techniques that maximize opt-ins without hurting engagement",
                "Master the technical setup that makes lead capture seamless and effortless"
              ],
              tracks: ["Founders", "Content Creator Growth"],
              duration: 30,
              founderMustWatch: true,
              entrepreneurSpecific: true,
              popular: true,
              featured: true,
              submodules: [
                {
                  id: "magnet_creation",
                  title: "Lead Magnet Creation",
                  subtitle: "Designing valuable freebies that convert followers to leads",
                  duration: 8,
                  difficulty: 3,
                  resources: ["pdf", "worksheets", "templates"],
                  highValue: true,
                  week: 7,
                  instructor: "Alex O'Connor"
                },
                {
                  id: "magnet_promotion",
                  title: "Lead Magnet Promotion",
                  subtitle: "Strategic content techniques that drive opt-ins",
                  duration: 7,
                  difficulty: 3,
                  resources: ["pdf", "worksheets"],
                  highValue: true,
                  week: 7,
                  instructor: "Alex O'Connor"
                },
                {
                  id: "technical_setup",
                  title: "Technical Setup",
                  subtitle: "Tools and systems for seamless lead capture",
                  duration: 8,
                  difficulty: 3,
                  resources: ["pdf", "worksheets", "workshop"],
                  highValue: true,
                  week: 7,
                  instructor: "Alex O'Connor"
                },
                {
                  id: "manychat_strategies",
                  title: "ManyChat Implementation",
                  subtitle: "Leveraging automation for enhanced lead generation",
                  duration: 7,
                  difficulty: 3,
                  resources: ["pdf", "worksheets", "workshop"],
                  highValue: true,
                  week: 7,
                  instructor: "Alex O'Connor"
                }
              ]
            }
            
            // Add more modules for the Conversions section as needed
          ]
        }
      ]
    }
  ],
  
  tracks: tracks
};

// Course overview statistics
export const courseStats = {
  totalModules: 178,
  totalHours: 1000,
  resources: 450,
  workshops: 42,
  pdfs: 89,
  templates: 64,
  systems: 37
};

// Helper functions for working with course data
export const getFeaturedModules = () => {
  const featuredModules: Module[] = [];
  
  courseData.categories.forEach(category => {
    category.sections.forEach(section => {
      section.modules.forEach(module => {
        if (module.featured) {
          featuredModules.push(module);
        }
      });
    });
  });
  
  return featuredModules;
};

export const getModulesByTrack = (trackName: string) => {
  const modulesByTrack: Module[] = [];
  
  courseData.categories.forEach(category => {
    category.sections.forEach(section => {
      section.modules.forEach(module => {
        if (module.tracks.includes(trackName)) {
          modulesByTrack.push(module);
        }
      });
    });
  });
  
  return modulesByTrack;
};

export const getFounderModules = () => {
  return getModulesByTrack("Founders").filter(module => module.founderMustWatch);
};

export const getAllInstructors = () => {
  const instructors = new Set<string>();
  
  courseData.categories.forEach(category => {
    category.sections.forEach(section => {
      section.modules.forEach(module => {
        module.submodules.forEach(submodule => {
          instructors.add(submodule.instructor);
        });
      });
    });
  });
  
  return Array.from(instructors);
};

export const calculateTotalDuration = () => {
  let totalMinutes = 0;
  
  courseData.categories.forEach(category => {
    category.sections.forEach(section => {
      section.modules.forEach(module => {
        totalMinutes += module.duration;
      });
    });
  });
  
  return totalMinutes;
};

export default courseData;