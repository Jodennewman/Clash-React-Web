import React from "react";
import { Section } from "../../ui/section";
import { Badge } from "../../ui/badge";
import { Globe, Zap, Database, PieChart, VideoIcon, BarChart, Code, Smartphone, Layout, Activity, MessageSquare, Shield, ArrowUpRight } from "lucide-react";

export default function VSBentoGrid() {
  return (
    <Section className="py-24 relative overflow-hidden bg-[var(--bg-cream-gradient)] dark:bg-[var(--bg-navy-gradient)]">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 dot-bg pointer-events-none dark:hidden" />
      <div className="absolute inset-0 opacity-0 dark:opacity-15 grid-bg pointer-events-none" />
      
      {/* Floating elements - light mode only */}
      <div className="absolute top-40 right-10 w-32 h-32 rounded-[40%] rotate-12 opacity-5 
                    bg-[var(--primary-orange)] animate-pulse dark:hidden"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-[30%] -rotate-6 opacity-5
                    bg-[var(--secondary-teal-light)] dark:hidden"></div>
      
      {/* Floating elements - dark mode only */}
      <div className="absolute top-40 right-10 w-32 h-32 rounded-[40%] rotate-12 opacity-10 
                    bg-gradient-to-r from-[var(--primary-orange)] to-[var(--primary-orange-hover)] 
                    animate-pulse hidden dark:block"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-[30%] -rotate-6 opacity-10
                    bg-gradient-to-r from-[var(--secondary-teal)] to-[var(--secondary-teal-light)] 
                    hidden dark:block"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <Badge variant="section" size="xl" className="mb-4">
            Program Resources
          </Badge>
          <h2 className="text-[--text-navy] dark:text-white text-4xl md:text-5xl font-bold mb-6">
            Everything You Need
          </h2>
          <p className="text-[--text-navy] dark:text-white/70 text-xl max-w-3xl mx-auto">
            Vertical Shortcut gives you all the tools, resources, and support to succeed with short-form content.
          </p>
        </div>
        
        <div className="grid grid-cols-12 gap-4">
          {/* First row - 3 cards with col-span-4 each */}
          <div className="col-span-4 rounded-xl p-6 border border-[rgba(0,0,0,0.03)] dark:border-white/5 shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(53,115,128,0.15)] transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:translate-y-[-4px] hover:rotate-[0.5deg] hover:scale-[1.02] hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_20px_rgba(53,115,128,0.2)] group relative overflow-hidden bg-gradient-to-br from-white to-[rgba(255,246,239,0.8)] dark:bg-gradient-to-br dark:from-[var(--card-bg-navy)] dark:to-[rgba(12,67,99,0.8)]">
            {/* Light mode floating element */}
            <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-[40%] rotate-12 opacity-5 
                         bg-[var(--secondary-teal-light)] dark:hidden"></div>
            
            {/* Dark mode floating element */}
            <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-[40%] rotate-12 opacity-10 
                         bg-gradient-to-r from-[var(--secondary-teal)] to-[var(--secondary-teal-light)]
                         hidden dark:block"></div>
            
            <div className="flex flex-col relative z-10">
              <div className="flex items-center justify-center mb-8 transform transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.08] group-hover:translate-y-[-2px]">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-[var(--secondary-teal)] to-[var(--secondary-teal-light)] dark:from-[var(--secondary-teal-hover)] dark:to-[var(--secondary-teal)] shadow-[1px_1px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_0_8px_rgba(53,115,128,0.2)]">
                  <Database className="w-10 h-10 text-white" />
                </div>
              </div>
              <Zap className="size-8 text-[var(--primary-orange)] mb-3 transition-transform duration-300 group-hover:scale-110" />
              <h3 style={{ color: 'var(--text-navy)' }} className="text-2xl font-semibold mb-3 dark:text-white">
                Weekly Growth Labs
              </h3>
              <p style={{ color: 'var(--text-navy)' }} className="dark:text-white/70">
                Live weekly sessions where we review your content and provide actionable feedback for immediate improvement.
              </p>
            </div>
          </div>
          
          <div className="col-span-4 rounded-xl p-6 border border-[rgba(0,0,0,0.03)] dark:border-white/5 shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(254,163,93,0.15)] transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:translate-y-[-4px] hover:rotate-[-0.5deg] hover:scale-[1.02] hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_20px_rgba(254,163,93,0.2)] group relative overflow-hidden bg-gradient-to-br from-white to-[rgba(255,246,239,0.8)] dark:bg-gradient-to-br dark:from-[var(--card-bg-navy)] dark:to-[rgba(12,67,99,0.8)]">
            {/* Light mode floating element */}
            <div className="absolute -top-6 -left-6 w-20 h-20 rounded-[30%] -rotate-6 opacity-5 
                         bg-[var(--primary-orange-light)] dark:hidden"></div>
            
            {/* Dark mode floating element */}
            <div className="absolute -top-6 -left-6 w-20 h-20 rounded-[30%] -rotate-6 opacity-10 
                         bg-gradient-to-r from-[var(--primary-orange)] to-[var(--primary-orange-hover)]
                         hidden dark:block"></div>
            
            <div className="flex flex-col h-full relative z-10">
              <div className="flex items-center justify-center mb-8 transform transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.08] group-hover:translate-y-[-2px]">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-[var(--primary-orange)] to-[var(--primary-orange-light)] dark:from-[var(--primary-orange-hover)] dark:to-[var(--primary-orange)] shadow-[1px_1px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_0_8px_rgba(254,163,93,0.2)]">
                  <MessageSquare className="w-10 h-10 text-white" />
                </div>
              </div>
              <PieChart className="size-8 text-[var(--secondary-teal)] mb-3 transition-transform duration-300 group-hover:scale-110" />
              <h3 style={{ color: 'var(--text-navy)' }} className="text-2xl font-semibold mb-3 dark:text-white">
                Platform Mastery
              </h3>
              <p style={{ color: 'var(--text-navy)' }} className="dark:text-white/70">
                Deep dives into platform algorithms with strategies specifically tailored for each one.
              </p>
            </div>
          </div>
          
          <div className="col-span-4 rounded-xl p-6 border border-[rgba(0,0,0,0.03)] dark:border-white/5 shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(254,163,93,0.15)] transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:translate-y-[-4px] hover:rotate-[0.5deg] hover:scale-[1.02] hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_20px_rgba(254,163,93,0.2)] group relative overflow-hidden bg-gradient-to-br from-white to-[rgba(255,246,239,0.8)] dark:bg-gradient-to-br dark:from-[var(--card-bg-navy)] dark:to-[rgba(12,67,99,0.8)]">
            {/* Light mode floating element */}
            <div className="absolute top-10 right-10 w-16 h-16 rounded-[35%] rotate-12 opacity-5 
                         bg-[var(--primary-orange-light)] dark:hidden"></div>
            
            {/* Dark mode floating element */}
            <div className="absolute top-10 right-10 w-16 h-16 rounded-[35%] rotate-12 opacity-10 
                         bg-gradient-to-r from-[var(--primary-orange)] to-[var(--primary-orange-hover)]
                         hidden dark:block"></div>
            
            <div className="flex flex-col h-full relative z-10">
              <div className="flex items-center justify-center mb-8 transform transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.08] group-hover:translate-y-[-2px]">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-[var(--primary-orange)] to-[var(--primary-orange-light)] dark:from-[var(--primary-orange-hover)] dark:to-[var(--primary-orange)] shadow-[1px_1px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_0_8px_rgba(254,163,93,0.2)]">
                  <Layout className="w-10 h-10 text-white" />
                </div>
              </div>
              <Globe className="size-8 text-[var(--primary-orange)] mb-3 transition-transform duration-300 group-hover:scale-110" />
              <h3 style={{ color: 'var(--text-navy)' }} className="text-2xl font-semibold mb-3 dark:text-white">
                Creator Network
              </h3>
              <p style={{ color: 'var(--text-navy)' }} className="dark:text-white/70">
                Connect with 100+ top creators who've built 7+ figure businesses with short-form content.
              </p>
            </div>
          </div>
          
          {/* Second row - 2 cards with col-span-6 each */}
          <div className="col-span-6 rounded-xl p-6 border border-[rgba(0,0,0,0.03)] dark:border-white/5 shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(53,115,128,0.15)] transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:translate-y-[-4px] hover:rotate-[-0.5deg] hover:scale-[1.02] hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_20px_rgba(53,115,128,0.2)] group relative overflow-hidden bg-gradient-to-br from-white to-[rgba(255,246,239,0.8)] dark:bg-gradient-to-br dark:from-[var(--card-bg-navy)] dark:to-[rgba(12,67,99,0.8)]">
            {/* Light mode floating elements */}
            <div className="absolute bottom-16 right-16 w-24 h-24 rounded-[40%] rotate-12 opacity-5 
                         bg-[var(--secondary-teal-light)] dark:hidden"></div>
            <div className="absolute top-10 left-20 w-16 h-16 rounded-[30%] -rotate-6 opacity-5
                         bg-[var(--secondary-teal)] dark:hidden"></div>
            
            {/* Dark mode floating elements */}
            <div className="absolute bottom-16 right-16 w-24 h-24 rounded-[40%] rotate-12 opacity-10 
                         bg-gradient-to-r from-[var(--secondary-teal)] to-[var(--secondary-teal-light)]
                         hidden dark:block"></div>
            <div className="absolute top-10 left-20 w-16 h-16 rounded-[30%] -rotate-6 opacity-10
                         bg-gradient-to-r from-[var(--secondary-teal-hover)] to-[var(--secondary-teal)]
                         hidden dark:block"></div>
            
            <div className="flex flex-col h-full relative z-10">
              <div className="flex items-center justify-center mb-8 transform transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.08] group-hover:translate-y-[-2px]">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-[var(--secondary-teal)] to-[var(--secondary-teal-light)] dark:from-[var(--secondary-teal-hover)] dark:to-[var(--secondary-teal)] shadow-[1px_1px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_0_8px_rgba(53,115,128,0.2)]">
                  <Smartphone className="w-10 h-10 text-white" />
                </div>
              </div>
              <VideoIcon className="size-8 text-[var(--primary-orange-hover)] mb-3 transition-transform duration-300 group-hover:scale-110" />
              <h3 style={{ color: 'var(--text-navy)' }} className="text-2xl font-semibold mb-3 dark:text-white">
                Viral Case Studies
              </h3>
              <p style={{ color: 'var(--text-navy)' }} className="dark:text-white/70">
                Detailed breakdowns of 45+ videos that reached millions of views across different niches and industries.
              </p>
            </div>
          </div>
          
          <div className="col-span-6 rounded-xl p-6 border border-[rgba(0,0,0,0.03)] dark:border-white/5 shadow-[2px_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(222,107,89,0.15)] transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:translate-y-[-4px] hover:rotate-[0.5deg] hover:scale-[1.02] hover:shadow-[2px_2px_12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_20px_rgba(222,107,89,0.2)] group relative overflow-hidden bg-gradient-to-br from-white to-[rgba(255,246,239,0.8)] dark:bg-gradient-to-br dark:from-[var(--card-bg-navy)] dark:to-[rgba(12,67,99,0.8)]">
            {/* Light mode floating elements */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-[35%] rotate-12 opacity-5 
                         bg-[var(--accent-coral)] dark:hidden"></div>
            <div className="absolute top-16 left-24 w-20 h-20 rounded-[30%] -rotate-6 opacity-5
                         bg-[var(--accent-red)] dark:hidden"></div>
            
            {/* Dark mode floating elements */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-[35%] rotate-12 opacity-10 
                         bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-red)]
                         hidden dark:block"></div>
            <div className="absolute top-16 left-24 w-20 h-20 rounded-[30%] -rotate-6 opacity-10
                         bg-gradient-to-r from-[var(--accent-coral-dark)] to-[var(--accent-red)]
                         hidden dark:block"></div>
            
            <div className="flex flex-col h-full relative z-10">
              <div className="flex items-center justify-center mb-8 transform transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.08] group-hover:translate-y-[-2px]">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-[var(--accent-coral)] to-[var(--accent-red)] dark:from-[var(--accent-coral-dark)] dark:to-[var(--accent-red)] shadow-[1px_1px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_0_8px_rgba(222,107,89,0.2)]">
                  <Activity className="w-10 h-10 text-white" />
                </div>
              </div>
              <Shield className="size-8 text-[var(--accent-coral)] mb-3 transition-transform duration-300 group-hover:scale-110" />
              <h3 style={{ color: 'var(--text-navy)' }} className="text-2xl font-semibold mb-3 dark:text-white">
                AI-Powered Tools
              </h3>
              <p style={{ color: 'var(--text-navy)' }} className="dark:text-white/70">
                Exclusive access to our custom AI tools for content research, script generation, and trend prediction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}