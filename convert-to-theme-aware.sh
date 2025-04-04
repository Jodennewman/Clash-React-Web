#!/bin/bash

echo "Converting components to use theme-aware variables..."

# Step 1: Run the gradient fixer script
echo "Step 1: Fixing gradients and competing light/dark mode styles..."
node fix-gradients.js src/components

# Step 2: Run the CSS variable converter script
echo "Step 2: Updating CSS variables to theme-aware versions..."
node fix-css-vars.js

echo "Conversion complete! Please check your components for proper styling in both light and dark modes."
echo "Remember to manually check components with complex styling or custom gradients."