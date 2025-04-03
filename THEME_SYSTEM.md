# VS Theme System

The VS Theme System is a comprehensive solution for implementing and managing themes in the VS application, with a focus on beautiful light and dark mode transitions.

## Quick Start Guide

### 1. Use the ThemeProvider at the root of your application

```jsx
// In main.tsx
import { ThemeProvider } from './components/ui/theme-provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="clash-theme">
      <App />
    </ThemeProvider>
  </StrictMode>,
);
```

### 2. Add a theme toggle to your UI

```jsx
import { ThemeToggle } from './components/ui/theme-toggle';

function Layout() {
  return (
    <div>
      <ThemeToggle />
      {/* Rest of your layout */}
    </div>
  );
}
```

### 3. Style your components for both light and dark modes

```jsx
// Using direct CSS variable references
<div className="bg-[--bg-cream] dark:bg-[--bg-navy] text-[--text-navy] dark:text-white">
  Content with proper theming
</div>

// Using VSThemeWrapper for simplified theming
<VSThemeWrapper
  lightClassName="bg-[--bg-cream]"
  darkClassName="bg-[--bg-navy]"
  defaultClassName="p-4 rounded-lg"
>
  <YourComponent />
</VSThemeWrapper>
```

## Complete Documentation

For complete information about the VS Theme System, including:

- Core implementation principles
- CSS variable architecture
- Theme switching implementation
- Using theme variables in components
- Handling isolated components
- Implementation workflow for new components
- Best practices
- Troubleshooting

See the comprehensive [VS Color Implementation Strategy](./VS_COLOR_IMPLEMENTATION.md) document.

## Demo

To see a live demo of the VS Theme System:

1. Import the ThemeDemo component:
```jsx
import { ThemeDemo } from './components/ThemeDemo';
```

2. Add it to your application:
```jsx
<ThemeDemo />
```

This demo showcases:
- Light and dark mode styling
- Theme toggling between light, dark, and system modes
- Color palette visualization
- Button styling examples
- Proper use of CSS variables
- VSThemeWrapper usage

## Available Components

The VS Theme System provides the following components:

- `ThemeProvider`: Context provider for theme state
- `useTheme`: Hook for accessing theme state and functions
- `ThemeToggle`: UI component for theme switching
- `WithTheme`: HOC for wrapping isolated components
- `ThemeWrapper`: Component for wrapping isolated sections
- `VSThemeWrapper`: Helper for applying theme-specific classes
- `ThemeScript`: Script for preventing flash of wrong theme

All components are available from a single export:

```jsx
import { 
  ThemeProvider, 
  useTheme, 
  ThemeToggle, 
  WithTheme, 
  ThemeWrapper,
  VSThemeWrapper,
  ThemeScript 
} from './components/ui/theme-index';
```

## The VS Visual Design Philosophy

The VS Theme System implements a visual design philosophy that balances creative energy with professional polish:

- **Strategic vibrancy**: Bold colors used thoughtfully
- **Depth through subtle details**: Gradients, shadows, and floating elements
- **Playful motion**: More pronounced animations than typical corporate sites
- **Professional foundation**: Clean layouts with clear hierarchy

Both light and dark modes are designed with these principles in mind, creating a cohesive experience that adapts to user preferences while maintaining the VS brand identity.