// File: src/components/layout/Layout.tsx
import { Outlet, Link } from "react-router-dom";
import { ThemeToggle } from "./ui/theme-toggle";

export default function Layout() {
  return (
    <div className="min-h-screen bg-theme-gradient">
      {/* Main content */}
      <main>
        <Outlet />
      </main>

      {/* Theme toggle and debug button */}
      <div className="fixed bottom-4 right-4 z-50 flex space-x-2">
        <Link
          to="/debug"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-theme-accent-secondary shadow-theme-sm hover-bubbly-sm"
          title="Debug Page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M12 22c7 0 9-3 9-9V4l-9 3-9-3v9c0 6 2 9 9 9z"></path>
            <path d="M12 8v14"></path>
          </svg>
        </Link>
        <ThemeToggle />
      </div>

      {/* Marble buttons navigation */}
      <div className="fixed bottom-4 left-4 z-50">
        <Link
          to="/marble-buttons"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-theme-primary shadow-theme-sm hover-bubbly-sm"
          title="Marble Buttons"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
