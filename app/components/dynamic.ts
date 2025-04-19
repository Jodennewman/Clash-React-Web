'use client'

import dynamic from 'next/dynamic'

/**
 * This file contains all dynamically imported components for the application.
 * These components are loaded on-demand when needed, with SSR disabled
 * for components that use browser-only APIs.
 */

// Basic loading fallback to use for components
const defaultLoading = (componentName: string) => (
  <div className="flex items-center justify-center min-h-[300px] bg-theme-bg-primary/30 rounded-xl">
    <div className="p-8 text-center">
      <div className="text-lg font-medium text-theme-text mb-2">Loading {componentName}...</div>
      <div className="animate-pulse w-16 h-16 rounded-full bg-theme-accent/30 mx-auto"></div>
    </div>
  </div>
)

// UI and Demo Components
export const DynamicVSModalShowcase = dynamic(
  () => import('../../src/components/VSModalShowcase'),
  { 
    ssr: false,
    loading: () => defaultLoading('Modal Showcase')
  }
)

export const DynamicAnimatedButtonsDemo = dynamic(
  () => import('../../src/components/marble-buttons/AnimatedButtonsDemo'),
  { 
    ssr: false,
    loading: () => defaultLoading('Animated Buttons')
  }
)

export const DynamicVSExampleComponent = dynamic(
  () => import('../../src/components/VSExampleComponent'),
  { 
    ssr: false,
    loading: () => defaultLoading('Example Component')
  }
)

export const DynamicApplicationFormWrapper = dynamic(
  () => import('../../src/components/form/ApplicationFormWrapper'),
  { 
    ssr: false,
    loading: () => defaultLoading('Application Form')
  }
)

// Style and Theme Components
export const DynamicThemeStyleGuide = dynamic(
  () => import('../../src/components/ThemeStyleGuide'),
  { 
    ssr: false,
    loading: () => defaultLoading('Theme Style Guide')
  }
)

export const DynamicThemeVisualizer = dynamic(
  () => import('../../src/components/Color-theme-display'),
  { 
    ssr: false,
    loading: () => defaultLoading('Theme Visualizer')
  }
)

// Section Components
export const DynamicModuleHUDShowcase = dynamic(
  () => import('../../src/components/sections/ModuleHUDShowcase'),
  { 
    ssr: false,
    loading: () => defaultLoading('Module HUD')
  }
)

export const DynamicVSPainPoints = dynamic(
  () => import('../../src/components/sections').then(mod => ({ default: mod.VSPainPoints })),
  { 
    ssr: false,
    loading: () => defaultLoading('Pain Points Section')
  }
)

export const DynamicVSCharts = dynamic(
  () => import('../../src/components/sections').then(mod => ({ default: mod.VSCharts })),
  { 
    ssr: false,
    loading: () => defaultLoading('Charts Section')
  }
)

export const DynamicConnectEverything = dynamic(
  () => import('../../src/components/sections').then(mod => ({ default: mod.ConnectEverything })),
  { 
    ssr: false,
    loading: () => defaultLoading('Connect Everything Section')
  }
)

// Qualification Components
export const DynamicModalImplementation = dynamic(
  () => import('../../src/Qualification_components/modal-implementation'),
  { 
    ssr: false,
    loading: () => defaultLoading('Modal Implementation')
  }
)

export const DynamicTiaPreview = dynamic(
  () => import('../../src/Qualification_components/tia-preview'),
  { 
    ssr: false,
    loading: () => defaultLoading('Tia Preview')
  }
)

// Integration Components
export const DynamicCalendlyDemo = dynamic(
  () => import('../../src/components/Calendly/CalendlyDemo'),
  { 
    ssr: false,
    loading: () => defaultLoading('Calendly Integration')
  }
)

// Special Components
export const DynamicDebugPage = dynamic(
  () => import('../../src/pages/DebugPage'),
  {
    ssr: false,
    loading: () => defaultLoading('Debug Tools')
  }
)