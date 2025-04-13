import React, { useEffect, useState } from 'react';
import { getImage, getAllImageKeys, getClashLogos, imageMap } from '../utils/imageMap';

// Import one image directly to show the difference
import clashLogo from '../assets/Clash-Logo-One-Line-Light-for-Dark.png';

const ImageTest = () => {
  const [availableImages, setAvailableImages] = useState([]);
  
  useEffect(() => {
    // Get all available image keys
    const imageKeys = getAllImageKeys();
    setAvailableImages(imageKeys);
    
    // Log the image map for debugging
    console.log('Available images in image map:', imageKeys);
    console.log('Full image map:', imageMap);
  }, []);
  
  // Get the Clash logos specifically
  const clashLogos = getClashLogos();
  
  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Image Mapper Test</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Direct Import (Traditional)</h2>
        <div className="p-4 bg-gray-800 rounded-lg inline-block">
          <img 
            src={clashLogo} 
            alt="Clash Logo Direct Import" 
            className="h-12 object-contain"
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Direct import using: import clashLogo from '../assets/Clash-Logo-One-Line-Light-for-Dark.png'
        </p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Using Image Mapper</h2>
        <div className="p-4 bg-gray-800 rounded-lg inline-block">
          <img 
            src={getImage('Clash-Logo-One-Line-Light-for-Dark')} 
            alt="Clash Logo via Mapper" 
            className="h-12 object-contain"
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Using image mapper: getImage('Clash-Logo-One-Line-Light-for-Dark')
        </p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Using getClashLogos() Helper</h2>
        <div className="p-4 bg-gray-800 rounded-lg inline-block">
          <img 
            src={clashLogos.oneLine.light} 
            alt="Clash Logo via Helper" 
            className="h-12 object-contain"
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Using helper function: clashLogos.oneLine.light
        </p>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">All Available Images ({availableImages.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {availableImages.map(key => (
            <div key={key} className="bg-white p-3 rounded-lg shadow">
              <div className="bg-gray-100 h-32 flex items-center justify-center mb-2 rounded overflow-hidden">
                <img 
                  src={getImage(key)} 
                  alt={key} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="text-sm font-medium text-center truncate">{key}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageTest; 