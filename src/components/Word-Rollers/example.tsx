import React from 'react';
import { WordRollerWithPrefix } from './WordRollerWithPrefix';
import { WordRoller } from './WordRoller';

export default function App() {
  // Custom words you can use
  const customWords = [
    "design.",
    "create.",
    "build.",
    "ship.",
    "debug.",
    "scale."
  ];
  
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Background grid pattern (from original CSS) */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30 
        bg-[linear-gradient(90deg,var(--line)_1px,transparent_1px_var(--size))_50%_50%/var(--size)_var(--size),linear-gradient(var(--line)_1px,transparent_1px_var(--size))_50%_50%/var(--size)_var(--size)]"
        style={{
          '--size': '45px',
          '--line': 'color-mix(in hsl, currentColor, transparent 70%)',
          mask: 'linear-gradient(-20deg, transparent 50%, white)'
        } as React.CSSProperties}
      />
      
      {/* Example 1: Default rainbow gradient (OKLCH color space) */}
      <WordRollerWithPrefix 
        prefix="you can" 
        sectionClassName="min-h-screen w-full max-w-7xl mx-auto"
        prefixClassName="text-transparent bg-clip-text bg-gradient-to-b from-black to-black/60 dark:from-white dark:to-white/60"
      />
      
      {/* Example 2: Custom HSL gradient (blue to purple) */}
      <WordRoller 
        words={customWords}
        sectionClassName="min-h-screen w-full max-w-7xl mx-auto"
        colorSpace="hsl"
        startColor={{ h: 240, s: 80, l: 60 }} // Blue
        endColor={{ h: 290, s: 80, l: 60 }}   // Purple
      />
      
      {/* Example 3: Custom RGB gradient (red to yellow) */}
      <WordRollerWithPrefix 
        prefix="I will" 
        words={["learn.", "create.", "innovate.", "lead.", "succeed."]}
        sectionClassName="min-h-screen w-full max-w-7xl mx-auto"
        colorSpace="rgb"
        startColor={{ r: 255, g: 50, b: 50 }}  // Red
        endColor={{ r: 255, g: 220, b: 50 }}   // Yellow
        prefixClassName="text-transparent bg-clip-text bg-gradient-to-b from-black to-black/60 dark:from-white dark:to-white/60"
      />
      
      {/* Footer */}
      <footer className="py-8 text-center opacity-50">
        ʕ⊙ᴥ⊙ʔ jh3yy &copy; 2024
      </footer>
    </div>
  );
}