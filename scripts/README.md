# CSS Refactoring Scripts

This directory contains scripts for analyzing, optimizing, and refactoring the CSS theme system.

## Prerequisites

Before running these scripts, make sure you have Node.js installed and run:

```bash
npm install
```

This will install the required dependencies (glob, puppeteer, pixelmatch, pngjs).

## Available Scripts

### Analysis

- `analyze-css.js`: Analyzes the CSS file to identify theme variables, classes, and potential issues
- `analyze-usage.js`: Analyzes how theme classes are used across the codebase

### Transformation

- `cleanup-css.js`: Cleans up the CSS file by removing duplicates and organizing sections
- `standardize-gradients.js`: Fixes gradient syntax issues and standardizes gradient definitions
- `create-modular-css.js`: Converts the monolithic CSS file into a modular structure
- `update-app-entry.js`: Updates application entry points to use the new modular CSS structure

### Testing

- `setup-visual-tests.js`: Creates baseline screenshots for visual regression testing
- `compare-visual-tests.js`: Compares before/after screenshots to detect visual regressions
- `test-theme-integrity.js`: Validates the theme system by checking for inconsistencies

### Deployment

- `deploy-css-changes.js`: Orchestrates the entire refactoring process with validation steps
- `rollback.js`: Reverts changes if issues are discovered

## Typical Workflow

1. **Analysis**: Run the analysis scripts to understand the current state of the CSS
   ```bash
   node analyze-css.js
   node analyze-usage.js
   ```

2. **Baseline Screenshots**: Capture before screenshots while running the development server
   ```bash
   # In another terminal, start dev server
   # npm run dev
   
   # Capture baseline screenshots
   node setup-visual-tests.js
   ```

3. **Transformation**: Run the transformation scripts to optimize the CSS
   ```bash
   node cleanup-css.js
   node standardize-gradients.js
   node create-modular-css.js
   node update-app-entry.js
   ```

4. **Testing**: Validate the changes
   ```bash
   # In another terminal, start dev server with new CSS
   # npm run dev
   
   # Run visual regression tests
   node compare-visual-tests.js
   
   # Check theme integrity
   node test-theme-integrity.js
   ```

5. **Deployment**: Complete the refactoring process
   ```bash
   node deploy-css-changes.js
   ```

6. **Rollback** (if needed): Revert changes if issues are discovered
   ```bash
   node rollback.js
   ```

## Output Files

- `theme-analysis.json`: Detailed analysis of theme variables and classes
- `theme-usage.json`: Analysis of theme class usage across components
- `theme-integrity-report.json`: Report on theme system integrity
- `visual-regression/diff/*.png`: Visual difference images (if any)

## Development

To add more functionality to these scripts:

1. Create a new script file in this directory
2. Update this README to document the new script
3. If appropriate, integrate the new script into `deploy-css-changes.js`