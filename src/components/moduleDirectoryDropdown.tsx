import React, { useState, useEffect } from 'react';

const ModuleDirectoryMap = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Group modules by main category
  const modulesByCategory = {
    "Theory Basics": [
      "Starting an account", "Naming your account", "Creating a bio", "Managing highlights",
      "Developing your Linkspace", "Using Pinned Videos", "The Frame", 
      "Safe Zones & Clutter", "Visual Hierarchy", "Movement & Contrast"
    ],
    "Cardinal Principles": [
      "Cardinal Sins", "Cardinal Virtues", "Algorithmic Reality", 
      "How Videos Actually Grow", "Good Vs Bad in Short Form", 
      "Nailing What Actually Counts", "Applying it Across Platforms"
    ],
    "Hook Mastery": [
      "Using Clarity and Intrigue", "Developing Authority", "Nailing Delivery", 
      "The Text Hook", "The Visual Hook", "Nuanced Hooks", "BIG vs small",
      "False Assumptions", "The Impossible Question", "A Contrarian Statement",
      "This Just Happened!!?!", "PR: Who Are You?"
    ],
    "Scripting": [
      "Rule 1: Simplicity", "Rule 2: Being Concise", "Rule 3: Rehooking", 
      "Rule 4: Authenticity", "Rule 5: Storytelling", "Rule 6: Would I watch this?",
      "Bonus: Boulder Theory", "Script Mastery", "Getting it wrong (on purpose)",
      "The FOMO comment section", "Using Controversy"
    ],
    "Metrics & Analysis": [
      "Likes", "Saves", "Shares", "Retention", "Comments", 
      "Advanced Metrics", "Follower Conversion", "Completed Watchtime", 
      "Demographics", "Traffic Sources"
    ],
    "Platform Strategy": [
      "TikTok", "Instagram", "YouTube", "The Rest!", "Pillar Content Strategy",
      "Topics", "Buckets", "Data-Led Iteration"
    ],
    "Authority Building": [
      "Scripting for Authority", "The 6 Rules of Authority",
      "Brand Wholism", "Complex formats", "Remixing formats",
      "Breaking Expectations", "The Unexpected Pivot"
    ],
    "Content Management": [
      "What to do when it goes wrong", "How to save your page",
      "Handling Comments", "Reframing Anger", "Managing Debate",
      "The Best Kind of Comment", "Optimising for Conversion", "Optimising for Watch Time"
    ],
    "Production": [
      "Camera Confidence", "Producing a Podcast for Clips", 
      "Home Studio Setup", "Solo Phone Shooter", 
      "Lofi - respecting the medium", "Hifi - the founders paradox",
      "Editing Basics", "Editing Team", "Editing Advanced"
    ],
    "Research": [
      "Research and Writing", "Research advanced", "Generating Ideas",
      "Targeted Search", "Keyword Mapping", "Tailoring Your Algorithm",
      "Inspiration Through Different Sources", "Refining Your Script",
      "The Research Toolkit"
    ],
    "Repurposing": [
      "From Shortform", "From Longform", "From Articles", 
      "From LinkedIn", "Serialisation", "Podcast Clipping"
    ],
    "Planning & Distribution": [
      "Posting and Scheduling for Founders", "Posting for Creators", 
      "Platform Monetisation", "Partnerships", "Business Integration"
    ],
    "Delegation & Team": [
      "First bottlenecks", "Managing Creatives", "Videography Delegated",
      "Make Content Run Itself", "Team Pipeline Breakdown", "Team Workflow"
    ],
    "Conversion Strategy": [
      "Lead Magnets", "Youtube Strategy", "Podcasts", 
      "Building a Newsletter", "Using your platform for sales", 
      "Speaking engagements", "Taking People Off Platform"
    ]
  };

  // Define color schemes for each category (using your brand colors)
  const categoryColors = {
    "Theory Basics": { bg: "#0F474A", text: "#FDF7E4" },
    "Cardinal Principles": { bg: "#123C55", text: "#FDF7E4" },
    "Hook Mastery": { bg: "#186080", text: "#FDF7E4" },
    "Scripting": { bg: "#3196AD", text: "#FDF7E4" },
    "Metrics & Analysis": { bg: "#D45D56", text: "#FDF7E4" },
    "Platform Strategy": { bg: "#F49272", text: "#08141B" },
    "Authority Building": { bg: "#FFC590", text: "#08141B" },
    "Content Management": { bg: "#FDF7E4", text: "#08141B" },
    "Production": { bg: "#A12C3B", text: "#FDF7E4" },
    "Research": { bg: "#E76662", text: "#FDF7E4" },
    "Repurposing": { bg: "#33626F", text: "#FDF7E4" },
    "Planning & Distribution": { bg: "#378596", text: "#FDF7E4" },
    "Delegation & Team": { bg: "#FEAF52", text: "#08141B" },
    "Conversion Strategy": { bg: "#FA9644", text: "#08141B" }
  };

  // Count total modules
  const totalModules = Object.values(modulesByCategory).reduce(
    (total, modules) => total + modules.length, 0
  );

  // Add pulsing animation to draw attention to the module count
  useEffect(() => {
    const interval = setInterval(() => {
      const element = document.getElementById('module-counter');
      if (element) {
        element.classList.add('pulse');
        setTimeout(() => {
          element.classList.remove('pulse');
        }, 1000);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Handle category click to expand/collapse
  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl max-w-3xl mx-auto my-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-500 via-rose-500 to-blue-500 bg-clip-text text-transparent">
          Complete Course Curriculum
        </h2>
        <p className="text-gray-300 mb-4">
          A comprehensive framework with <span id="module-counter" className="font-bold text-rose-500">{totalModules}+ lessons</span> designed specifically for founders and their teams
        </p>
        <p className="text-sm text-gray-400">
          Click any category to explore the modules
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(modulesByCategory).map((category) => (
          <div 
            key={category}
            className={`rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
              expandedCategory === category ? 'shadow-lg shadow-rose-500/20' : 'shadow-md hover:shadow-lg'
            }`}
            onClick={() => toggleCategory(category)}
          >
            {/* Category Header */}
            <div 
              className="px-4 py-3 flex items-center justify-between"
              style={{ 
                backgroundColor: categoryColors[category]?.bg || '#1E293B',
                color: categoryColors[category]?.text || '#FFFFFF'
              }}
            >
              <h3 className="font-bold">{category}</h3>
              <div className="flex items-center">
                <span className="text-sm mr-2">{modulesByCategory[category].length} modules</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${expandedCategory === category ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {/* Module List (Expandable) */}
            <div 
              className={`transition-all duration-300 overflow-hidden ${
                expandedCategory === category ? 'max-h-96' : 'max-h-0'
              }`}
              style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)' }}
            >
              <ul className="p-4">
                {modulesByCategory[category].map((module, index) => (
                  <li key={index} className="mb-2 flex items-start">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 mr-2 flex-shrink-0"
                      style={{ backgroundColor: categoryColors[category]?.bg || '#3B82F6' }}
                    ></div>
                    <span className="text-sm text-gray-300">{module}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a 
          href="#pricing" 
          className="inline-block px-6 py-3 bg-gradient-to-r from-rose-500 to-blue-500 text-white font-semibold rounded-lg transition-transform hover:-translate-y-1"
        >
          Explore Pricing Options
        </a>
      </div>

      {/* CSS for the pulse animation */}
      <style>{`
        .pulse {
          animation: pulse-animation 1s ease-out;
        }
        @keyframes pulse-animation {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ModuleDirectoryMap;