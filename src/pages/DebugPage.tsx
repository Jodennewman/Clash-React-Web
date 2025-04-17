// File: src/pages/DebugPage.tsx
import { Link } from 'react-router-dom';
import { DirectTest } from '../components/DirectTest';
import { DirectClassTest } from '../components/DirectClassTest';

export default function DebugPage() {
  return (
    <div className="bg-theme-gradient min-h-screen">
      <h1 className="text-3xl font-bold text-theme-primary text-center py-6">Style Debugging</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        <div className="border border-theme-border rounded-lg shadow-theme-sm">
          <DirectTest />
        </div>
        <div className="border border-theme-border rounded-lg shadow-theme-sm">
          <DirectClassTest />
        </div>
      </div>
      <div className="mt-8 text-center space-y-4">
        {/* All the links */}
        <div>
          <Link to="/landing" className="px-6 py-2 bg-theme-gradient-primary text-white rounded-lg shadow-theme-sm hover-bubbly-sm">
            Go to Landing Page
          </Link>
        </div>
        {/* Include all other links from the original code */}
        {/* ... */}
      </div>
    </div>
  );
}