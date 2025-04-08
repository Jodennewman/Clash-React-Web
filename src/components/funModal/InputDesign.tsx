"use client";
import * as React from "react";

interface InputDesignProps {
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

/**
 * InputDesign component - A clear/close button typically used in input fields
 */
function InputDesign({
  onClick,
  className = "",
  ariaLabel = "Clear input",
}: InputDesignProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${className}`}
      aria-label={ariaLabel}
    >
      <span className="text-xl font-medium">×</span>
    </button>
  );
}

export default InputDesign;
