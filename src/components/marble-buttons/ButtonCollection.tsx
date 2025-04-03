"use client";

import React from "react";
import { AnimatedButton } from "./AnimatedButton";

export interface ButtonCollectionProps {
  className?: string;
}

export const ButtonCollection: React.FC<ButtonCollectionProps> = ({
  className = "",
}) => {
  return (
    <section className={`flex flex-col gap-10 max-w-[900px] mx-auto w-full ${className}`}>
      {/* Normal saturation */}
      <div className="flex flex-wrap justify-center gap-[24px]">
        <h3 className="w-full text-xl font-semibold text-center mb-5">Normal Saturation</h3>
        <AnimatedButton text="START" variant="start" />
        <AnimatedButton text="GO PRO" variant="pro" />
        <AnimatedButton text="LEARN" variant="learn" />
        <AnimatedButton text="DOCS" variant="docs" />
      </div>
      
      {/* High saturation */}
      <div className="flex flex-wrap justify-center gap-[24px]">
        <h3 className="w-full text-xl font-semibold text-center mb-5">High Saturation</h3>
        <AnimatedButton text="START" variant="start" saturation="high" />
        <AnimatedButton text="GO PRO" variant="pro" saturation="high" />
        <AnimatedButton text="LEARN" variant="learn" saturation="high" />
        <AnimatedButton text="DOCS" variant="docs" saturation="high" />
      </div>
      
      {/* Low saturation */}
      <div className="flex flex-wrap justify-center gap-[24px]">
        <h3 className="w-full text-xl font-semibold text-center mb-5">Low Saturation</h3>
        <AnimatedButton text="START" variant="start" saturation="low" />
        <AnimatedButton text="GO PRO" variant="pro" saturation="low" />
        <AnimatedButton text="LEARN" variant="learn" saturation="low" />
        <AnimatedButton text="DOCS" variant="docs" saturation="low" />
      </div>
      
      {/* Subtle */}
      <div className="flex flex-wrap justify-center gap-[24px]">
        <h3 className="w-full text-xl font-semibold text-center mb-5">Subtle</h3>
        <AnimatedButton text="START" variant="start" saturation="subtle" />
        <AnimatedButton text="GO PRO" variant="pro" saturation="subtle" />
        <AnimatedButton text="LEARN" variant="learn" saturation="subtle" />
        <AnimatedButton text="DOCS" variant="docs" saturation="subtle" />
      </div>
      
      {/* Size Variations */}
      <div className="flex flex-wrap justify-center gap-[24px]">
        <h3 className="w-full text-xl font-semibold text-center mb-5">Size Variations</h3>
        <AnimatedButton text="SMALL" variant="start" size="sm" />
        <AnimatedButton text="MEDIUM" variant="pro" size="md" />
        <AnimatedButton text="LARGE" variant="learn" size="lg" />
        <AnimatedButton text="DISABLED" variant="docs" disabled={true} />
      </div>
    </section>
  );
};
