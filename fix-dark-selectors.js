#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get dirname in ES modules context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const ROOT_DIR = __dirname;
const CSS_FILE = path.join(ROOT_DIR, 'src/app/globals.css');

console.log('Fixing dark mode selectors in CSS...');

try {
  let cssContent = fs.readFileSync(CSS_FILE, 'utf8');
  
  // Find all instances of [data-theme="dark"] selectors followed by a space and not preceded by ".dark,"
  const regex = /(?<!\\.dark,\s*)\[data-theme="dark"\]\s+([a-zA-Z0-9\-_\.#\[\]="':,\s]+)(?=\{)/g;
  
  // Replace all matches with .dark, [data-theme="dark"] followed by the original selector
  cssContent = cssContent.replace(regex, (match, selector) => {
    return `.dark ${selector}, [data-theme="dark"] ${selector}`;
  });
  
  // Write the updated content back to the file
  fs.writeFileSync(CSS_FILE, cssContent, 'utf8');
  
  console.log('CSS dark mode selectors fixed successfully!');
} catch (error) {
  console.error('Error fixing dark mode selectors:', error);
}