"use client";

import React, { useRef, useEffect } from "react";

export interface AnimatedButtonProps {
  text: string;
  variant: "start" | "pro" | "learn" | "docs";
  saturation?: "normal" | "high" | "low" | "subtle";
  className?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  text,
  variant,
  saturation = "normal",
  className = "",
  onClick,
  size = "md",
  type = "button",
  disabled = false,
}) => {
  const patternRef = useRef<HTMLDivElement>(null);

  // Size variants
  const sizeStyles = {
    sm: "h-[40px] sm:h-[44px] text-[14px] sm:text-[15px] px-4",
    md: "h-[50px] sm:h-[56px] text-[16px] sm:text-[18px] px-6",
    lg: "h-[60px] sm:h-[68px] text-[18px] sm:text-[20px] px-8",
  };

  // Define variant-specific styles using CSS variables
  const variantStylesMap = {
    start: {
      normal: {
        textColor: "text-[--text-cream]",
        bgColor: "bg-gradient-to-r from-[--accent-coral] to-[--accent-coral-rgb,#E07559]",
        shadow: "shadow-[0_8px_16px_rgba(var(--accent-coral-rgb,222,107,89),0.3)]",
        border: "",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDEwMCwxMDAgTCA1MCw1MCBMIDE1MCw1MCBaIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')",
      },
      high: {
        textColor: "text-[--text-cream]",
        bgColor: "bg-gradient-to-r from-[--hud-accent-red)] to-[--accent-red)]",
        shadow: "shadow-[0_8px_16px_rgba(var(--accent-red-rgb,185,34,52),0.35)]",
        border: "",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDEwMCwxMDAgTCA1MCw1MCBMIDE1MCw1MCBaIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTUpIi8+PC9zdmc+')",
      },
      low: {
        textColor: "text-[--text-cream]",
        bgColor: "bg-gradient-to-r from-[#D87F70] to-[#E08B7A]",
        shadow: "shadow-[0_8px_16px_rgba(216,127,112,0.25)]",
        border: "",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDEwMCwxMDAgTCA1MCw1MCBMIDE1MCw1MCBaIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDgpIi8+PC9zdmc+')",
      },
      subtle: {
        textColor: "text-[--text-navy)] dark:text-[--text-cream]",
        bgColor: "bg-[--card-bg-light)] dark:bg-[--card-bg-navy)]",
        shadow: "shadow-[0_8px_16px_rgba(0,0,0,0.1)]",
        border: "border border-[--accent-coral)] border-opacity-30",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDEwMCwxMDAgTCA1MCw1MCBMIDE1MCw1MCBaIiBmaWxsPSJyZ2JhKDIyMiwxMDcsODksMC4wNSkiLz48L3N2Zz4=')",
      },
    },
    pro: {
      normal: {
        textColor: "text-[--text-navy)] dark:text-[--text-cream]",
        bgColor: "bg-gradient-to-r from-[--primary-orange)] to-[--primary-orange-light)]",
        shadow: "shadow-[0_8px_16px_rgba(var(--primary-orange-rgb,254,163,93),0.3)]",
        border: "",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDAsMCBMIDUwLDUwIEwgMCwxMDAgWiIgZmlsbD0icmdiYSgwLDAsMCwwLjA1KSIvPjwvc3ZnPg==')",
      },
      high: {
        textColor: "text-[--text-navy)] dark:text-[--text-cream]",
        bgColor: "bg-gradient-to-r from-[--primary-orange-hover)] to-[--primary-orange)]",
        shadow: "shadow-[0_8px_16px_rgba(var(--primary-orange-rgb,254,163,93),0.35)]",
        border: "",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDAsMCBMIDUwLDUwIEwgMCwxMDAgWiIgZmlsbD0icmdiYSgwLDAsMCwwLjA4KSIvPjwvc3ZnPg==')",
      },
      low: {
        textColor: "text-[--text-navy)] dark:text-[--text-cream]",
        bgColor: "bg-gradient-to-r from-[--ui-peach-light)] to-[--ui-peach-dark)]",
        shadow: "shadow-[0_8px_16px_rgba(var(--primary-orange-rgb,254,163,93),0.2)]",
        border: "",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDAsMCBMIDUwLDUwIEwgMCwxMDAgWiIgZmlsbD0icmdiYSgyNTUsMTYzLDkzLDAuMDUpIi8+PC9zdmc+')",
      },
      subtle: {
        textColor: "text-[--primary-orange)] dark:text-[--primary-orange-light)]",
        bgColor: "bg-gradient-to-r from-[--bg-cream)] to-[--bg-cream-darker)]",
        shadow: "shadow-[0_8px_16px_rgba(var(--primary-orange-rgb,254,163,93),0.1)]",
        border: "border border-[--primary-orange)] border-opacity-20",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDAsMCBMIDUwLDUwIEwgMCwxMDAgWiIgZmlsbD0icmdiYSgyNTQsMTYzLDkzLDAuMDMpIi8+PC9zdmc+')",
      },
    },
    learn: {
      normal: {
        textColor: "text-[--text-cream]",
        bgColor: "bg-gradient-to-r from-[--secondary-teal)] to-[--secondary-teal-light)]",
        shadow: "shadow-[0_8px_16px_rgba(var(--secondary-teal-rgb,53,115,128),0.3)]",
        border: "",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjUwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')",
      },
      high: {
        textColor: "text-[--text-cream]",
        bgColor: "bg-gradient-to-r from-[--secondary-teal-hover)] to-[--secondary-teal)]",
        shadow: "shadow-[0_8px_16px_rgba(var(--secondary-teal-rgb,53,115,128),0.35)]",
        border: "",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjUwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTUpIi8+PC9zdmc+')",
      },
      low: {
        textColor: "text-[--text-cream]",
        bgColor: "bg-gradient-to-r from-[--neutral-blue-1)] to-[--neutral-blue-2)]",
        shadow: "shadow-[0_8px_16px_rgba(var(--secondary-teal-rgb,53,115,128),0.25)]",
        border: "",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjUwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDgpIi8+PC9zdmc+')",
      },
      subtle: {
        textColor: "text-[--secondary-teal)] dark:text-[--secondary-teal-light)]",
        bgColor: "bg-[--bg-cream)] dark:bg-[--bg-navy)]",
        shadow: "shadow-[0_8px_16px_rgba(var(--secondary-teal-rgb,53,115,128),0.15)]",
        border: "border border-[--secondary-teal)] border-opacity-30",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjUwIiBmaWxsPSJyZ2JhKDUzLDExNSwxMjgsMC4wNSkiLz48L3N2Zz4=')",
      },
    },
    docs: {
      normal: {
        textColor: "text-[--text-navy)] dark:text-[--text-cream]",
        bgColor: "bg-transparent dark:bg-transparent",
        shadow: "shadow-[0_8px_16px_rgba(var(--text-navy-rgb,18,46,59),0.1)]",
        border: "border-[2px] border-[--text-navy)] dark:border-[--text-cream)]",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSI1MCIgeT0iNTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJyZ2JhKDE4LDQ2LDU5LDAuMDUpIi8+PC9zdmc+')",
      },
      high: {
        textColor: "text-[--bg-cream)] dark:text-[--bg-navy)]",
        bgColor: "bg-[--text-navy)] dark:bg-[--text-cream)]",
        shadow: "shadow-[0_8px_16px_rgba(var(--text-navy-rgb,18,46,59),0.2)]",
        border: "border-[2px] border-[--text-navy)] dark:border-[--text-cream)]",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSI1MCIgeT0iNTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDgpIi8+PC9zdmc+')",
      },
      low: {
        textColor: "text-[--text-navy)] dark:text-[--text-cream]",
        bgColor: "bg-transparent dark:bg-transparent",
        shadow: "shadow-[0_4px_12px_rgba(var(--text-navy-rgb,18,46,59),0.08)]",
        border: "border border-[--text-navy)] dark:border-[--text-cream)] border-opacity-60 dark:border-opacity-60",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSI1MCIgeT0iNTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJyZ2JhKDE4LDQ2LDU5LDAuMDIpIi8+PC9zdmc+')",
      },
      subtle: {
        textColor: "text-[--text-navy)] dark:text-[--text-cream]",
        bgColor: "bg-transparent dark:bg-transparent",
        shadow: "shadow-[0_2px_8px_rgba(var(--text-navy-rgb,18,46,59),0.05)]",
        border: "border border-[--text-navy)] dark:border-[--text-cream)] border-opacity-30 dark:border-opacity-30",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSI1MCIgeT0iNTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJyZ2JhKDE4LDQ2LDU5LDAuMDIpIi8+PC9zdmc+')",
      },
    },
  };

  // Animation parameters based on variant
  const animationParams = {
    start: { scale: "1.05", rotate: "3deg", duration: 9 },
    pro: { scale: "1.1", rotate: "-2deg", duration: 12 },
    learn: { scale: "1.08", rotate: "2deg", duration: 10 },
    docs: { scale: "1.03", rotate: "-1.5deg", duration: 11 },
  };

  // Add floating animation effect to the pattern when button is idle
  useEffect(() => {
    if (!patternRef.current || disabled) return;
    
    const params = animationParams[variant];
    const pattern = patternRef.current;
    
    // Set initial transform position
    pattern.style.transition = "none";
    pattern.style.transform = `translate(-${Math.random() * 10}%, -${Math.random() * 10}%) scale(1.2)`;
    
    // Create animation
    const animation = pattern.animate([
      { 
        transform: `translate(-5%, -5%) scale(1.2) rotate(0deg)`,
        backgroundPosition: '0% 0%'
      },
      { 
        transform: `translate(5%, -10%) scale(${params.scale}) rotate(${params.rotate})`,
        backgroundPosition: '10% 20%'
      },
      { 
        transform: `translate(10%, 5%) scale(${params.scale}) rotate(0deg)`,
        backgroundPosition: '20% 10%'
      },
      { 
        transform: `translate(-8%, 8%) scale(1.2) rotate(${params.rotate.startsWith('-') ? params.rotate : `-${params.rotate}`})`,
        backgroundPosition: '5% 15%'
      },
      { 
        transform: `translate(-5%, -5%) scale(1.2) rotate(0deg)`,
        backgroundPosition: '0% 0%'
      }
    ], {
      duration: params.duration * 1000,
      iterations: Infinity,
      easing: 'ease-in-out'
    });
    
    return () => {
      animation.cancel();
    };
  }, [variant, disabled]);

  const style = variantStylesMap[variant][saturation];

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        relative overflow-hidden w-full sm:w-auto ${sizeStyles[size]}
        ${style.textColor} ${style.bgColor} ${style.shadow} ${style.border}
        rounded-[12px] font-[600]
        transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:translate-y-[-6px] hover:scale-[1.05] hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] focus:scale-[1.02] hover:rotate-[0.5deg]'}
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50
        ${variant === "docs" ? "hover:bg-[rgba(var(--bg-cream-rgb),0.8)] dark:hover:bg-[rgba(var(--bg-navy-rgb),0.8)] focus:ring-[var(--text-navy)]" 
          : "hover:brightness-105 focus:brightness-105 focus:ring-white"}
        ${className}
      `}
      onClick={onClick}
    >
      <div
        ref={patternRef}
        className={`absolute inset-0 marble-button-pattern ${disabled ? 'opacity-30' : ''}`}
        style={{ 
          backgroundImage: style.pattern,
          backgroundSize: "250px 250px",
          backgroundRepeat: "repeat"
        }}
      />
      <span className="relative z-10">{text}</span>
    </button>
  );
};
