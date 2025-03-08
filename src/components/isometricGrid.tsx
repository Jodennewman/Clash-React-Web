import React, { JSX, useState } from 'react';
import IsometricCube from './IsometricCube';

interface ActiveCube {
  row: number;
  col: number;
}

const IsometricGrid = () => {
  const [activeCube, setActiveCube] = useState<ActiveCube | null>(null);
  const [rotatingCube, setRotatingCube] = useState<ActiveCube | null>(null);

  const handleCubeClick = (row: number, col: number) => {
    // Toggle active state
    if (activeCube?.row === row && activeCube?.col === col) {
      setActiveCube(null);
    } else {
      setActiveCube({ row, col });
    }

    // Add rotation effect
    setRotatingCube({ row, col });
    
    // Reset rotation after animation completes
    setTimeout(() => setRotatingCube(null), 1200);
  };

  // Grid configuration
  const rows = 5;
  const cols = 5;
  const cubeSize = 80;
  const spacing = 40;

  // Build the grid
  const renderGrid = () => {
    const grid: JSX.Element[] = [];
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const isActive = activeCube?.row === row && activeCube?.col === col;
        const isRotating = rotatingCube?.row === row && rotatingCube?.col === col;
        
        // Calculate isometric position
        const xPos = col * (cubeSize + spacing/2) - row * (cubeSize/2);
        const yPos = row * (cubeSize/2 + spacing/2);
        
        grid.push(
          <IsometricCube 
            key={`cube-${row}-${col}`}
            size={cubeSize}
            position={{ x: xPos, y: yPos }}
            isGlowing={isActive}
            glowColor={isActive ? '#FEA35D' : '#154D59'} 
            rotationDirection={isRotating ? 1 : 0}
            onClick={() => handleCubeClick(row, col)}
          />
        );
      }
    }
    
    return grid;
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-[#09232F]/10 rounded-xl p-10">
      <div className="relative w-full h-full">
        {renderGrid()}
      </div>
    </div>
  );
};

export default IsometricGrid;