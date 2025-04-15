import React from 'react';
import { getImage, getClashLogos, getAllInDirectory, imageMap } from '../utils/imageMap';

const ImageDemo = () => {
  const clashLogos = getClashLogos();
  const mainDirectoryImages = getAllInDirectory('main');
  
  return (
    <div className="image-demo p-8 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Image Assets Demo</h2>
      
      {/* Logo Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Clash Creation Logos</h3>
        <div className="flex flex-wrap gap-6">
          <div className="p-4 bg-[#09232F] rounded-lg flex flex-col items-center">
            <img 
              src={clashLogos.wordmark.light} 
              alt="Clash Creation Wordmark" 
              className="h-16 mb-2" 
            />
            <span className="text-white text-sm">Wordmark Logo</span>
          </div>
          
          <div className="p-4 bg-[#09232F] rounded-lg flex flex-col items-center">
            <img 
              src={clashLogos.oneLine.light} 
              alt="Clash Creation One Line Logo" 
              className="h-16 mb-2" 
            />
            <span className="text-white text-sm">One Line Logo</span>
          </div>
          
          <div className="p-4 bg-white rounded-lg flex flex-col items-center">
            <img 
              src={getImage('react')} 
              alt="React Logo" 
              className="h-16 mb-2" 
            />
            <span className="text-gray-700 text-sm">React Logo</span>
          </div>
        </div>
      </section>
      
      {/* Main Directory Images Section */}
      {Object.keys(mainDirectoryImages).length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Main Directory Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(mainDirectoryImages).map(([key, src]) => (
              <div key={key} className="p-3 bg-white rounded-lg shadow-sm">
                <img 
                  src={src} 
                  alt={key} 
                  className="w-full h-32 object-contain mb-2" 
                />
                <p className="text-sm text-gray-600 text-center truncate">{key}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Image Map Structure Display */}
      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Image Map Structure</h3>
        <div className="bg-white p-4 rounded-lg shadow-sm overflow-auto max-h-96">
          <pre className="text-xs text-gray-800">
            {JSON.stringify(imageMap, null, 2)}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default ImageDemo; 