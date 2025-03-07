import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Define TypeScript interfaces
interface ModuleItem {
  title: string;
  thumbnail: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface CategoryColor {
  bg: string;
  text: string;
}

interface CategoryColors {
  [key: string]: CategoryColor;
}

interface ModulesByCategory {
  [key: string]: ModuleItem[];
}

interface CategorySectionProps {
  category: string;
  modules: ModuleItem[];
  expandedCategories: string[];
  toggleCategory: (category: string) => void;
}

// Module categories with color mapping
const categoryColors: CategoryColors = {
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

const modulesByCategory: ModulesByCategory = {
  "Theory Basics": [
    { title: "Starting an account", thumbnail: "./assets/main/Course Teaching images/Account Layout0.webp", difficulty: "Beginner" as const },
    { title: "Naming your account", thumbnail: "./assets/main/Course Teaching images/Account Layout0.webp", difficulty: "Beginner" as const },
    { title: "Creating a bio", thumbnail: "./assets/main/Course Teaching images/Account Layout0.webp", difficulty: "Beginner" as const },
    { title: "Managing highlights", thumbnail: "./assets/main/Course Teaching images/Account Layout0.webp", difficulty: "Intermediate" as const },
    { title: "Developing your Linkspace", thumbnail: "./assets/main/Course Teaching images/Account Layout0.webp", difficulty: "Intermediate" as const },
    { title: "Using Pinned Videos", thumbnail: "./assets/main/Course Teaching images/Account Layout0.webp", difficulty: "Beginner" as const },
    { title: "The Frame", thumbnail: "./assets/main/Course Teaching images/Account Layout0.webp", difficulty: "Beginner" as const },
    { title: "Safe Zones & Clutter", thumbnail: "./assets/main/Course Teaching images/Account Layout0.webp", difficulty: "Intermediate" as const },
    { title: "Visual Hierarchy", thumbnail: "./assets/main/Course Teaching images/Account Layout0.webp", difficulty: "Advanced" as const },
    { title: "Movement & Contrast", thumbnail: "./assets/main/Course Teaching images/Account Layout0.webp", difficulty: "Advanced" as const }
  ],
  "Cardinal Principles": [
    // Content for other categories...
  ]
};

// Component for displaying course module statistics
const ModuleStatistics = () => {
  // Calculate totals
  const totalCategories = Object.keys(modulesByCategory).length;
  const totalModules = Object.values(modulesByCategory).reduce((acc, modules) => acc + modules.length, 0);
  const totalHours = Math.round(totalModules * 35 / 60); // Approximately 35 minutes per module
  
  return (
    <div className="py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center transform transition-transform duration-300 hover:scale-105 module-stat">
          <div className="text-4xl font-bold text-coral-500 mb-2">{totalModules}+</div>
          <div className="text-dark-teal font-medium">Total Lessons</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center transform transition-transform duration-300 hover:scale-105 module-stat">
          <div className="text-4xl font-bold text-coral-500 mb-2">{totalCategories}</div>
          <div className="text-dark-teal font-medium">Core Tracks</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center transform transition-transform duration-300 hover:scale-105 module-stat">
          <div className="text-4xl font-bold text-coral-500 mb-2">{totalHours}</div>
          <div className="text-dark-teal font-medium">Hours of Content</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center transform transition-transform duration-300 hover:scale-105 module-stat">
          <div className="text-4xl font-bold text-coral-500 mb-2">10</div>
          <div className="text-dark-teal font-medium">Beta Cohort Slots</div>
        </div>
      </div>
    </div>
  );
};

// Module card component
interface ModuleCardProps {
  title: string;
  thumbnail: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  color: string;
}

const ModuleCard = ({ title, thumbnail, difficulty, color }: ModuleCardProps) => {
  // Tailwind classes for difficulty levels
  const difficultyClasses: Record<'Beginner' | 'Intermediate' | 'Advanced', string> = {
    "Beginner": "bg-green-500 text-white",
    "Intermediate": "bg-amber-500 text-dark-black",
    "Advanced": "bg-red-600 text-white"
  };
  
  return (
    <div 
      className="flex flex-col overflow-hidden bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-40 object-cover" 
        />
        <div className={`absolute bottom-2 right-2 text-xs font-semibold px-2 py-1 rounded-full ${difficultyClasses[difficulty]}`}>
          {difficulty}
        </div>
      </div>
      <div className="p-4 font-medium text-dark-black">
        {title}
      </div>
    </div>
  );
};

// Category section component
const CategorySection = ({ category, modules, expandedCategories, toggleCategory }: CategorySectionProps) => {
  const colors = categoryColors[category] || { bg: "#123C55", text: "#FDF7E4" };
  const isOpen = expandedCategories.includes(category);
  
  return (
    <div className="mb-4 overflow-hidden rounded-lg shadow-sm">
      <Disclosure
        as="div"
        defaultOpen={isOpen}
        onChange={() => toggleCategory(category)}
      >
        {({ open }) => (
          <>
            <Disclosure.Button 
              className="flex w-full justify-between items-center px-5 py-4 text-left transition-colors duration-200 focus:outline-none focus-visible:ring focus-visible:ring-opacity-50"
              style={{ backgroundColor: colors.bg, color: colors.text }}
            >
              <h3 className="text-xl font-semibold">{category}</h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm opacity-90">{modules.length} modules</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'transform rotate-180' : ''
                  } w-5 h-5 transition-transform duration-300`}
                />
              </div>
            </Disclosure.Button>
            
            <Transition
              enter="transition duration-300 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-200 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="bg-white p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {modules.map((module: ModuleItem, idx: number) => (
                    <div 
                      className="animate-fadeIn" 
                      style={{ 
                        animationDelay: `${idx * 50}ms`,
                        animationFillMode: 'both' 
                      }}
                      key={`${category}-${idx}`} 
                    >
                      <ModuleCard
                        title={module.title} 
                        thumbnail={module.thumbnail} 
                        difficulty={module.difficulty}
                        color={colors.bg}
                      />
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};

// The main module display component
const ModuleDisplayGrid = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Theory Basics']);
  
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category) 
        : [...prev, category]
    );
    
    // Schedule a ScrollTrigger refresh after state updates
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
  };
  
  // Initialize animations - simplified to use Tailwind for basic animations
  useEffect(() => {
    console.log("Initializing main animations with simplified approach");
    
    // Only use GSAP for staggered animations that Tailwind can't handle
    gsap.from('.module-stat', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.module-stat',
        start: 'top bottom-=100px',
        toggleActions: 'play none none none',
      }
    });
    
    // Cleanup
    return () => {
      // Kill all ScrollTriggers to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Simplified animation for category changes
  useEffect(() => {
    // Set a delay to ensure DOM updates are complete
    const timer = setTimeout(() => {
      // We'll let the Tailwind animations handle most of this now
      // Just refresh ScrollTrigger to ensure any GSAP animations update
      ScrollTrigger.refresh();
    }, 200);
    
    return () => clearTimeout(timer);
  }, [expandedCategories]);
  
  return (
    <div className="px-4 py-16 md:px-8 lg:px-16 xl:px-24 bg-light-100">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-dark-black">Complete Course Curriculum</h2>
        <p className="text-xl text-dark-teal max-w-2xl mx-auto">
          A comprehensive framework designed specifically for founders and their teams
        </p>
      </div>
      
      <ModuleStatistics />
      
      <div className="bg-gradient-to-r from-coral-500 to-coral-600 rounded-lg p-6 my-10 text-center text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
        <div className="inline-block bg-white text-coral-500 font-bold px-3 py-1 rounded-full text-sm mb-3 shadow-sm">Limited Offer</div>
        <p className="text-lg font-medium">Join our beta cohort - only 10 slots available!</p>
      </div>
      
      <div className="space-y-4 my-12">
        {Object.entries(modulesByCategory).map(([category, modules]) => (
          <CategorySection 
            key={category}
            category={category}
            modules={modules}
            expandedCategories={expandedCategories}
            toggleCategory={toggleCategory}
          />
        ))}
      </div>
      
      <div className="text-center mt-16">
        <a 
          href="#pricing" 
          className="inline-block bg-coral-500 hover:bg-coral-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl"
        >
          Secure Your Spot Now
        </a>
      </div>
    </div>
  );
};

export default ModuleDisplayGrid;