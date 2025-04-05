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
        textColor: "text-theme-secondary",
        bgColor: "bg-theme-gradient-accent",
        shadow: "shadow-theme-md",
        border: "",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDEwMCwxMDAgTCA1MCw1MCBMIDE1MCw1MCBaIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')",
      },
      high: {
        textColor: "text-theme-secondary",
        bgColor: "bg-theme-gradient-primary",
        shadow: "shadow-theme-lg",
        border: "",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDEwMCwxMDAgTCA1MCw1MCBMIDE1MCw1MCBaIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTUpIi8+PC9zdmc+')",
      },
      low: {
        textColor: "text-theme-secondary",
        bgColor: "bg-theme-gradient-accent",
        shadow: "shadow-theme-sm",
        border: "",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDEwMCwxMDAgTCA1MCw1MCBMIDE1MCw1MCBaIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDgpIi8+PC9zdmc+')",
      },
      subtle: {
        textColor: "text-theme-primary",
        bgColor: "bg-theme-card",
        shadow: "shadow-theme-sm",
        border: "border border-theme-primary border-opacity-30",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDEwMCwxMDAgTCA1MCw1MCBMIDE1MCw1MCBaIiBmaWxsPSJyZ2JhKDIyMiwxMDcsODksMC4wNSkiLz48L3N2Zz4=')",
      },
    },
    pro: {
      normal: {
        textColor: "text-theme-primary",
        bgColor: "bg-theme-gradient-primary",
        shadow: "shadow-theme-md",
        border: "",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDAsMCBMIDUwLDUwIEwgMCwxMDAgWiIgZmlsbD0icmdiYSgwLDAsMCwwLjA1KSIvPjwvc3ZnPg==')",
      },
      high: {
        textColor: "text-theme-primary",
        bgColor: "bg-theme-gradient-primary",
        shadow: "shadow-theme-lg",
        border: "",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDAsMCBMIDUwLDUwIEwgMCwxMDAgWiIgZmlsbD0icmdiYSgwLDAsMCwwLjA4KSIvPjwvc3ZnPg==')",
      },
      low: {
        textColor: "text-theme-primary",
        bgColor: "bg-theme-gradient-primary",
        shadow: "shadow-theme-sm",
        border: "",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDAsMCBMIDUwLDUwIEwgMCwxMDAgWiIgZmlsbD0icmdiYSgyNTUsMTYzLDkzLDAuMDUpIi8+PC9zdmc+')",
      },
      subtle: {
        textColor: "text-theme-primary",
        bgColor: "bg-theme-primary/10",
        shadow: "shadow-theme-sm",
        border: "border border-theme-primary border-opacity-20",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDAsMCBMIDUwLDUwIEwgMCwxMDAgWiIgZmlsbD0icmdiYSgyNTQsMTYzLDkzLDAuMDMpIi8+PC9zdmc+')",
      },
    },
    learn: {
      normal: {
        textColor: "text-theme-secondary",
        bgColor: "bg-theme-gradient-secondary",
        shadow: "shadow-theme-md",
        border: "",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjUwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')",
      },
      high: {
        textColor: "text-theme-secondary",
        bgColor: "bg-theme-gradient-secondary",
        shadow: "shadow-theme-lg",
        border: "",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjUwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTUpIi8+PC9zdmc+')",
      },
      low: {
        textColor: "text-theme-secondary",
        bgColor: "bg-theme-gradient-secondary",
        shadow: "shadow-theme-sm",
        border: "",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjUwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDgpIi8+PC9zdmc+')",
      },
      subtle: {
        textColor: "text-theme-accent-secondary",
        bgColor: "bg-theme-surface",
        shadow: "shadow-theme-sm",
        border: "border border-theme-accent-secondary border-opacity-30",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjUwIiBmaWxsPSJyZ2JhKDUzLDExNSwxMjgsMC4wNSkiLz48L3N2Zz4=')",
      },
    },
    docs: {
      normal: {
        textColor: "text-theme-primary",
        bgColor: "bg-transparent",
        shadow: "shadow-theme-sm",
        border: "border-[2px] border-theme-primary",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSI1MCIgeT0iNTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJyZ2JhKDE4LDQ2LDU5LDAuMDUpIi8+PC9zdmc+')",
      },
      high: {
        textColor: "text-theme-bg-primary",
        bgColor: "bg-theme-primary",
        shadow: "shadow-theme-md",
        border: "border-[2px] border-theme-primary",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSI1MCIgeT0iNTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDgpIi8+PC9zdmc+')",
      },
      low: {
        textColor: "text-theme-primary",
        bgColor: "bg-transparent",
        shadow: "shadow-theme-sm",
        border: "border border-theme-primary border-opacity-60",
        pattern:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSI1MCIgeT0iNTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJyZ2JhKDE4LDQ2LDU5LDAuMDIpIi8+PC9zdmc+')",
      },
      subtle: {
        textColor: "text-theme-primary",
        bgColor: "bg-transparent",
        shadow: "shadow-theme-sm",
        border: "border border-theme-primary border-opacity-30",
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
        transition-all duration-[var(--theme-transition-bounce)]
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover-bubbly focus:scale-[1.02]'}
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50
        ${variant === "docs" ? "hover:bg-[var(--theme-bg-primary)]/10 focus:ring-theme-primary" 
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
