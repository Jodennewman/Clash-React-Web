/**
 * Test Modular CSS Implementation
 * 
 * This script helps test the new modular CSS structure by:
 * 1. Creating a backup of the current main.tsx
 * 2. Modifying main.tsx to either use globals.css, modular CSS, or both
 * 3. Providing a quick way to switch between implementations for testing
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuration
const MAIN_TSX_PATH = path.join(__dirname, '..', '..', 'src', 'main.tsx');
const BACKUP_PATH = path.join(__dirname, '..', '..', 'src', 'main.tsx.css-test-backup');

// Import patterns for different CSS modes
const GLOBALS_ONLY_IMPORTS = `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/globals.css'  // Using only globals.css for styling
// import './styles/index.css'  // Modular CSS structure disabled for testing
import './app/modulehud.css'  // Import ModuleHUD specific styles
import './styles/custom-text.css'  // Import custom text styles`;

const MODULAR_ONLY_IMPORTS = `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './app/globals.css'  // Globals CSS disabled for testing
import './styles/index.css'  // Using only modular CSS structure for styling
import './app/modulehud.css'  // Import ModuleHUD specific styles
import './styles/custom-text.css'  // Import custom text styles`;

const HYBRID_IMPORTS = `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/globals.css'  // Keep using globals.css for core variables
import './styles/index.css'  // Import modular CSS structure for styling
import './app/modulehud.css'  // Import ModuleHUD specific styles
import './styles/custom-text.css'  // Import custom text styles`;

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to replace imports in main.tsx
function replaceImports(content, newImports) {
  // Replace the import section
  return content.replace(
    /import.*?from\s+['"]react['"][\s\S]*?import.*?\.css.*?['"][\s\S]*?import.*?\.css.*?['"][\s\S]*?import.*?\.css.*?['"]/,
    newImports
  );
}

// Helper function to create backup
function createBackup() {
  if (!fs.existsSync(BACKUP_PATH)) {
    fs.copyFileSync(MAIN_TSX_PATH, BACKUP_PATH);
    console.log(`✅ Created backup at ${BACKUP_PATH}`);
  }
}

// Helper function to restore backup
function restoreBackup() {
  if (fs.existsSync(BACKUP_PATH)) {
    fs.copyFileSync(BACKUP_PATH, MAIN_TSX_PATH);
    console.log(`✅ Restored from backup ${BACKUP_PATH}`);
  } else {
    console.log('❌ No backup file found at', BACKUP_PATH);
  }
}

// Main function to apply changes
function applyChanges(mode) {
  // Read the current content
  const content = fs.readFileSync(MAIN_TSX_PATH, 'utf8');
  
  let newContent;
  switch (mode) {
    case '1':
      newContent = replaceImports(content, GLOBALS_ONLY_IMPORTS);
      console.log('🔄 Switching to globals.css only...');
      break;
    case '2':
      newContent = replaceImports(content, MODULAR_ONLY_IMPORTS);
      console.log('🔄 Switching to modular CSS only...');
      break;
    case '3':
      newContent = replaceImports(content, HYBRID_IMPORTS);
      console.log('🔄 Switching to hybrid mode (both globals.css and modular CSS)...');
      break;
    default:
      console.log('❌ Invalid mode, no changes made.');
      return;
  }
  
  // Write the modified content
  fs.writeFileSync(MAIN_TSX_PATH, newContent);
  console.log(`✅ Updated ${MAIN_TSX_PATH}`);
  console.log('🚀 Restart your development server to apply changes.');
}

// Main menu
function showMenu() {
  console.log('\n📋 CSS Testing Menu:');
  console.log('====================');
  console.log('1. Test with globals.css only (original)');
  console.log('2. Test with modular CSS only (target state)');
  console.log('3. Test with hybrid approach (current state)');
  console.log('4. Restore from backup');
  console.log('5. Exit');
  
  rl.question('\nSelect an option (1-5): ', (answer) => {
    switch (answer) {
      case '1':
      case '2':
      case '3':
        createBackup();
        applyChanges(answer);
        showMenu();
        break;
      case '4':
        restoreBackup();
        showMenu();
        break;
      case '5':
        console.log('👋 Goodbye!');
        rl.close();
        break;
      default:
        console.log('⚠️ Invalid option, please try again.');
        showMenu();
    }
  });
}

// Start the script
console.log('🧪 CSS Implementation Tester');
console.log('===========================');
console.log('This tool helps you test different CSS implementations');
console.log('A backup will be created before making any changes.');

createBackup();
showMenu();