import React from 'react';

const SimpleTest = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Simple Test Page</h1>
      <p className="mb-4">If you can see this, basic rendering is working.</p>
      <div className="p-4 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-2">Next Steps:</h2>
        <ol className="list-decimal pl-6">
          <li>Check browser console for any errors</li>
          <li>Examine Vite configuration issues</li>
          <li>Look at the tsconfig for issues with included files</li>
          <li>Verify React 19 compatibility</li>
        </ol>
      </div>
    </div>
  );
};

export default SimpleTest;