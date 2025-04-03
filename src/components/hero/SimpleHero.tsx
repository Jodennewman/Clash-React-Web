import React from 'react';

interface SimpleHeroProps {
  onCtaClick?: () => void;
}

const SimpleHero = React.forwardRef<HTMLDivElement, SimpleHeroProps>(
  ({ onCtaClick }, ref) => {
    return (
      <section ref={ref} className="relative min-h-screen w-full bg-[#FFF2E4] overflow-hidden">
        {/* Color blocks absolutely positioned */}
        <div className="absolute top-0 right-0 flex z-10">
          <div className="bg-[#32697A] h-[236px] w-[283px]" /> {/* Teal block */}
          <div className="bg-[#FF9D5E] h-[236px] w-[356px]" /> {/* Orange block */}
          <div className="bg-[#E37C7C] h-[379px] w-[221px]" /> {/* Red block */}
        </div>
        
        {/* Eyeball SVG absolutely positioned */}
        <div className="absolute bottom-0 left-0 z-0">
          <svg
            width="679"
            height="332"
            viewBox="0 0 679 332"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[567px] h-[567px] rotate-[15deg] translate-y-[100px] -translate-x-[50px]"
            aria-hidden="true"
          >
            <circle
              cx="331.484"
              cy="347.484"
              r="231.656"
              transform="rotate(-90 331.484 347.484)"
              fill="white"
            />
            <ellipse
              cx="387.704"
              cy="307.815"
              rx="143.553"
              ry="143.168"
              transform="rotate(-90 387.704 307.815)"
              fill="#5F949F"
            />
            <path
              d="M324.537 240.611C337.361 218.609 357.976 202.262 382.267 194.834C406.558 187.406 432.737 189.444 455.577 200.541C478.417 211.637 496.239 230.976 505.483 254.697C514.727 278.417 514.714 304.773 505.446 328.503C496.178 352.233 478.337 371.59 455.485 382.711C432.634 393.832 406.453 395.897 382.169 388.495C357.886 381.092 337.287 364.767 324.486 342.778C311.684 320.789 307.622 294.755 313.109 269.872L411.566 291.649L324.537 240.611Z"
              fill="#122E3B"
            />
          </svg>
        </div>
        
        {/* Grid Layout */}
        <div 
          className="w-full h-full relative"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.618fr) minmax(0, 1fr) minmax(0, 1.618fr) minmax(0, 2.618fr) minmax(0, 4.237fr) minmax(0, 2.618fr) minmax(0, 1.618fr) minmax(0, 1fr) minmax(0, 1.618fr)',
            gridTemplateRows: 'minmax(0, 1.618fr) minmax(0, 1fr) minmax(0, 1.618fr) minmax(0, 2.618fr) minmax(0, 4.237fr) minmax(0, 2.618fr) minmax(0, 1.618fr) minmax(0, 1fr) minmax(0, 1.618fr)',
            // Subtle grid lines
            backgroundImage: 'linear-gradient(to right, rgba(255,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: 'calc(100% / 9) calc(100% / 9)'
          }}
        >
          {/* VS Logo Header */}
          <header style={{ gridColumn: '2 / 3', gridRow: '2 / 3' }} className="flex items-center">
            <div className="text-5xl text-slate-800 max-sm:text-4xl">VS</div>
          </header>

          {/* HeroHeadline */}
          <div style={{ gridColumn: '5 / 9', gridRow: '3 / 5' }} className="flex items-center z-10">
            <h1 className="mb-10 text-7xl leading-tight text-slate-800 max-md:text-6xl max-sm:text-4xl">
              <span className="text-8xl text-[#E37C7C] max-md:text-7xl max-sm:text-5xl">
                800 million
              </span>
              <span> views,</span>
              <span className="block text-7xl max-md:text-6xl max-sm:text-4xl">
                zero spent on ads
              </span>
            </h1>
          </div>

          {/* HeroSubheading */}
          <div style={{ gridColumn: '5 / 9', gridRow: '5 / 7' }} className="z-10">
            <p className="text-4xl leading-tight text-slate-800 max-md:text-3xl max-sm:text-2xl mb-10">
              <span>A </span>
              <span className="text-[#FF9D5E]">proven, turn-key system </span>
              <span>to survive, thrive, and </span>
              <span>monetise </span>
              <span>with short form content, for founders.</span>
            </p>
            
            {/* Buttons - more tasteful, aligned with the design */}
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onCtaClick}
                className="px-6 py-3 bg-[#FF9D5E] text-white rounded-lg font-medium transition-all duration-300 hover:bg-[#E37C7C] hover:shadow-md"
              >
                Apply Now
              </button>
              <button 
                className="px-6 py-3 bg-transparent border border-slate-800 text-slate-800 rounded-lg font-medium transition-all duration-300 hover:bg-slate-800 hover:text-white"
              >
                Book a Call
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

SimpleHero.displayName = 'SimpleHero';

export default SimpleHero;