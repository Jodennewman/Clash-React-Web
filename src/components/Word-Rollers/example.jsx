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
        }}
      />
      
      {/* Example 1: With prefix (similar to original) */}
      <section className="min-h-screen flex items-center px-5 sm:px-12">
        <WordRollerWithPrefix 
          prefix="you can" 
          className="max-w-4xl mx-auto"
          prefixClassName="text-transparent bg-clip-text bg-gradient-to-b from-black to-black/60 dark:from-white dark:to-white/60"
        />
      </section>
      
      {/* Example 2: Just the changing words */}
      <section className="min-h-screen">
        <WordRoller 
          words={customWords}
          className="max-w-4xl mx-auto"
        />
      </section>
      
      {/* Footer */}
      <footer className="py-8 text-center opacity-50">
        ʕ⊙ᴥ⊙ʔ jh3yy &copy; 2024
      </footer>
    </div>
  );
}