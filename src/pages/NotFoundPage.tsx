// File: src/pages/NotFound.tsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-theme-gradient">
      <h1 className="text-4xl font-bold text-theme-primary mb-4">Page Not Found</h1>
      <p className="text-lg text-theme-text mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="px-6 py-2 bg-theme-gradient-primary text-white rounded-lg shadow-theme-sm hover-bubbly-sm">
        Return Home
      </Link>
    </div>
  );
}