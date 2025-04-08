# VS Theme System

The VS Theme System is a comprehensive solution for implementing and managing themes in the VS application, with a focus on beautiful light and dark mode transitions. The system defaults to using the user's system theme preference ('system') rather than forcing light or dark mode.

## Theme-Aware CSS Variables Approach

Our theme system uses a **theme-aware variables approach** that provides several key benefits:

1. **Single source of truth**: Variables automatically update with theme changes
2. **No competing styles**: Avoid conflicting light/dark mode class declarations
3. **Simplified maintenance**: Update themes by changing variables in one place
4. **Cleaner components**: Component code is more readable without multiple theme variants

### Key Concept: Theme-Aware Variables

Instead of using competing styles like this:
```jsx
<div className="text-[--text-navy] dark:text-white">Competing styles</div>
```

We use theme-aware variables that automatically update:
```jsx
<div className="text-[var(--theme-text-primary)]">Theme-aware variable</div>
```

These theme-aware variables are defined in globals.css:
```css
:root {
  --theme-text-primary: var(--text-navy);
}

@variant(dark) {
  :root {
    --theme-text-primary: white;
  }
}
```

### Implementation Methods

1. **Direct theme variables**: `className="text-[var(--theme-text-primary)]"`
2. **Theme utility classes**: `className="text-theme-primary"`
3. **Component-specific theme classes**: `className="card-primary"`

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

### 3. Style your components with theme-aware variables

```jsx
// Using theme-aware variables
<div className="bg-[var(--theme-bg-primary)] text-[var(--theme-text-primary)]">
  Content with theme-aware styling
</div>

// Using theme utility classes
<div className="bg-theme-surface text-theme-primary p-4 rounded-lg">
  Content with theme utility classes
</div>

// Using component-specific theme classes
<div className="card-primary">
  Card with complete theme styling
</div>

// For legacy components or isolated sections
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

## Theme Preference Guidelines

The VS Theme System follows these principles for theme preferences:

1. **System First**: 
   - `defaultTheme="system"` is always set in ThemeProvider
   - This ensures the site respects user operating system preference
   - Never hardcode to 'light' or 'dark' by default

2. **Persistent Preference**:
   - User selections are stored in localStorage under 'clash-theme'
   - Valid values are: 'light', 'dark', or 'system'
   - Persisted between site visits

3. **Theme Toggle Logic**:
   - The ThemeToggle component preserves system preference when possible
   - If on system preference, clicking toggles to the opposite of current resolved theme
   - Once manually set, toggling cycles between 'light' and 'dark'
   - Reset to 'system' available through ThemeDemo

4. **System Preference Changes**:
   - If theme is set to 'system', changes to OS theme are detected automatically
   - ThemeProvider listens for '(prefers-color-scheme: dark)' media query changes
   - No page reload required

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