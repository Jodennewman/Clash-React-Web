import React from 'react';
import IsometricGrid from './components/isometricGrid';
import './components/isometricCube.css';
import { COLORS } from './components/isometricGrid';


// Main foreground grid cubes
const mainGridCubes = [
  // Top single cube
  { row: 1, col: 2, color: COLORS.TEAL_LIGHT },
  
  // Main isometric cluster
  { row: 5, col: 1, color: COLORS.WHITE, isGlowing: true },
  { row: 5, col: 2, color: COLORS.MAROON },
  { row: 5, col: 3, color: COLORS.TEAL_LIGHT},
  { row: 6, col: 1, color: COLORS.DEFAULT },
  { row: 6, col: 2, color: COLORS.RED, isGlowing: true },
  { row: 6, col: 3, color: COLORS.DEFAULT },
  { row: 7, col: 1, color: COLORS.DEFAULT },
  { row: 7, col: 2, color: COLORS.DEFAULT },
  { row: 7, col: 3, color: COLORS.DEFAULT },
  { row: 8, col: 2, color: COLORS.DEFAULT },
  
  // Right-side highlight cube
  { row: 4, col: 6, color: COLORS.ORANGE, isGlowing: true },
  
  // Additional cubes for structure
  { row: 6, col: 5, color: COLORS.DEFAULT },
  { row: 7, col: 4, color: COLORS.DEFAULT }
];

// Background grid with smaller, more distant cubes
const backgroundGridCubes = [
  // Bottom-right area
  { row: 10, col: 7, color: COLORS.DEFAULT },
  { row: 11, col: 6, color: COLORS.DEFAULT },
  { row: 11, col: 8, color: COLORS.DEFAULT },
  { row: 12, col: 7, color: COLORS.ORANGE, isGlowing: true },
  
  // Top-right area
  { row: 2, col: 10, color: COLORS.WHITE, isGlowing: true },
  { row: 3, col: 11, color: COLORS.DEFAULT },
  { row: 4, col: 12, color: COLORS.DEFAULT },
  
  // Left area
  { row: 9, col: 0, color: COLORS.DEFAULT },
  { row: 10, col: 1, color: COLORS.DEFAULT },
  { row: 11, col: 0, color: COLORS.DEFAULT }
];

// Far background grid with even smaller cubes
const farBackgroundGridCubes = [
  // Scattered pattern
  { row: 1, col: 14, color: COLORS.DEFAULT },
  { row: 2, col: 13, color: COLORS.DEFAULT },
  { row: 3, col: 15, color: COLORS.DEFAULT },
  { row: 15, col: 1, color: COLORS.RED, isGlowing: true },
  { row: 16, col: 2, color: COLORS.DEFAULT },
  { row: 14, col: 3, color: COLORS.DEFAULT },
  { row: 15, col: 18, color: COLORS.DEFAULT },
  { row: 16, col: 11, color: COLORS.DEFAULT },
  { row: 14, col: 10, color: COLORS.DEFAULT }
];

function App() {
  return (
    <div className="bg-linear-60 from-black to-cyan-700 min-h-screen overflow-hidden relative">
      <div className="container mx-auto py-10 px-4 relative z-10">
        <header className="flex justify-between items-center mb-20">
          <div className="text-white text-xl font-bold">ClashCreation.</div>
          <nav className="flex gap-6">
            <button className="text-white/70 hover:text-red-600 transition-colors">Documentation</button>
            <button className="text-white/70 hover:text-white transition-colors">Components</button>
            <button className="px-6 py-3 bg-[#FEA35D] text-white rounded-md hover:bg-[#F89A67] transition-colors">
              Get Started
            </button>
          </nav>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[550px] items-center">
          {/* IsometricGrid Column - Taking 5/12 of the width on large screens */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="w-full h-[550px] relative">
              {/* Far background layer - Smaller cubes with less opacity */}
              <div className="absolute inset-0" style={{ opacity: 0.3 }}>
                <IsometricGrid 
                  rows={18}                 
                  cols={16}                 
                  cubeSize={50}             
                  horizontalSpacing={70}    
                  verticalSpacing={40}      
                  containerWidth={550}     
                  containerHeight={550}
                  customCubes={farBackgroundGridCubes}
                  offsetX={-100}
                  offsetY={50}
                />
              </div>
            
              {/* Background layer - Medium-sized cubes */}
              <div className="absolute inset-0" style={{ opacity: 0.7 }}>
                <IsometricGrid 
                  rows={14}                 
                  cols={14}                 
                  cubeSize={70}            
                  horizontalSpacing={80}   
                  verticalSpacing={60}     
                  containerWidth={550}     
                  containerHeight={550}
                  customCubes={backgroundGridCubes}
                  offsetX={-50}
                  offsetY={20}
                />
              </div>
              
              {/* Main foreground layer - Largest, fully opaque cubes */}
              <div className="absolute inset-0" style={{ zIndex: 10 }}>
                <IsometricGrid 
                  rows={12}                 
                  cols={8}                 
                  cubeSize={110}            
                  horizontalSpacing={155}   
                  verticalSpacing={140}     
                  containerWidth={550}     
                  containerHeight={550}
                  customCubes={mainGridCubes}
                  offsetX={0}
                  offsetY={0}
                />
              </div>
              
              {/* Add dotted path line to represent the path between cubes */}
              <svg width="100%" height="100%" className="absolute top-0 left-0" 
                   style={{ zIndex: 0, pointerEvents: 'none' }}>
                <path 
                  d="M200,310 Q250,350 300,330 L390,150" 
                  stroke="#FEA35D" 
                  strokeWidth="2" 
                  strokeDasharray="5,5" 
                  fill="none" 
                  opacity="0.5"
                />
              </svg>
            </div>
          </div>
          
          {/* Text Column - Taking 7/12 of the width and centered in the layout */}
          <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
            <h1 className="text-6xl md:text-7xl text-white font-bold mb-6 leading-tight">
              800 million <span className="text-[#FEA35D]">views</span>,<br />
              zero spent on ads
            </h1>
            <p className="text-white/80 text-xl mb-10 max-w-xl leading-relaxed">
              A proven turn-key system to survive, thrive,
              and monetise with short form content.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-[#FEA35D] text-white rounded-md hover:bg-[#F89A67] transition-colors">
                Get Started
              </button>
              <button className="px-6 py-3 border border-white/20 text-white rounded-md hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background gradient */}
      <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-radial from-[#FEA35D]/20 to-transparent opacity-40 blur-3xl"></div>
    </div>
  );
}

export default App;