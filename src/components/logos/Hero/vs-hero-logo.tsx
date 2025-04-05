import React from "react";


export default function VSLogo() {
  return (
    <div className="relative">
      <div className="text-[80px] font-bold leading-none text-theme-on-primary/90 tracking-tighter">
        <span className="bg-gradient-to-b from-white to-[#FDEBDD] bg-clip-text text-transparent">V</span>
        <span className="bg-gradient-to-b from-[#FEA35D] to-[#DE6B59] bg-clip-text text-transparent">S</span>
      </div>
      <div className="absolute top-0 right-0 transform translate-x-full -translate-y-1/4">
        <svg width="80" height="100" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 95 L75 5" stroke="url(#arrow-gradient)" strokeWidth="2" />
          <circle cx="75" cy="5" r="4" fill="#DE6B59" />
          <circle cx="5" cy="95" r="4" fill="#387292" />
          <defs>
            <linearGradient id="arrow-gradient" x1="5" y1="95" x2="75" y2="5" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#387292" />
              <stop offset="1" stopColor="#DE6B59" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};