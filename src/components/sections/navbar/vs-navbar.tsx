"use client";
import * as React from "react";

const NavBar: React.FC = () => {
  return (
    <div
      className="flex justify-between items-center px-8 py-4 mx-auto my-5 w-full rounded-3xl border-solid backdrop-blur-[14.85px] border-[3px] max-w-[1312px] max-md:px-6 max-md:py-3 max-md:m-4 max-sm:px-4 max-sm:py-2 max-sm:m-3 max-sm:rounded-2xl bg-theme-bg-primary border-theme-accent-secondary dark:bg-theme-bg-primary dark:border-theme-accent-secondary"
    >
      <div className="flex gap-2 items-center">
        <div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="var(--theme-text-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="var(--theme-text-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="var(--theme-text-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          className="text-lg font-semibold leading-7 max-md:text-base text-theme-text-primary"
        >
          Clash Creation
        </div>
      </div>
      <div>
        <div
          className="flex gap-3 justify-center items-center p-1 rounded-xl border-2 border-solid max-md:hidden border-theme-accent-secondary"
        >
          <div
            className="flex gap-2 justify-center items-center px-4 py-2 text-sm font-medium leading-5 rounded-md cursor-pointer text-theme-text-primary"
          >
            <span>Getting started</span>
            <div>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="var(--theme-text-primary)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div
            className="flex gap-2 justify-center items-center px-4 py-2 text-sm font-medium leading-5 rounded-md cursor-pointer text-theme-text-primary"
          >
            <span>Components</span>
            <div>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="var(--theme-text-primary)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div
            className="gap-2 px-4 py-2 text-sm font-medium leading-5 rounded-md cursor-pointer text-theme-text-primary"
          >
            Documentation
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center max-sm:gap-2">
        <div
          className="px-4 py-2 text-sm font-medium leading-5 rounded-md cursor-pointer max-sm:px-3 max-sm:py-1.5 max-sm:text-xs text-theme-text-primary"
        >
          Sign in
        </div>
        <div
          className="px-4 py-2 text-sm font-medium leading-5 rounded-md shadow cursor-pointer max-sm:px-3 max-sm:py-1.5 max-sm:text-xs bg-theme-accent-secondary text-theme-on-primary hover:bg-theme-accent-secondary-hover transition-colors duration-300"
        >
          Get started
        </div>
      </div>
    </div>
  );
};

export default NavBar;