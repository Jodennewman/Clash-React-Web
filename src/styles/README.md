# Modular CSS Structure

This directory contains the modularized CSS for the Vertical Shortcut theme system.

## Directory Structure

- `index.css`: Main entry point that imports all modules
- `modules/`: Contains individual CSS modules

## Modules

- `variables.css`: variables styles
- `dark-mode.css`: dark mode styles
- `base-elements.css`: base elements styles
- `animations.css`: animations styles
- `theme-utilities.css`: theme utilities styles
- `components.css`: components styles
- `utilities.css`: utilities styles

## How to Use

Import the main CSS file in your application entry point:

```javascript
import './styles/index.css';
```

## Development

When making style changes:

1. Modify the appropriate module file in `modules/`
2. Test changes in both light and dark mode
3. Ensure theme-aware variables are used consistently

For large-scale changes, consult the CSS refactoring documentation first.

DO NOT edit the `index.css` file directly, as it's auto-generated.
