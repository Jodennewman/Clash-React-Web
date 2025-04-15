const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

console.log('===== CSS REFACTORING DEPLOYMENT =====');
console.log('This script will deploy the CSS refactoring changes.');

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to run each deployment step with error handling
function runStep(step, command, options = {}) {
  console.log(`\n----- STEP ${step}: ${options.description || ''} -----`);
  try {
    const output = execSync(command, { encoding: 'utf8', stdio: options.silent ? 'pipe' : 'inherit' });
    if (options.silent) {
      console.log('Step completed successfully');
    }
    return { success: true, output };
  } catch (error) {
    console.error(`Error in step ${step}:`);
    console.error(error.message);
    return { success: false, error };
  }
}

// Function to prompt for confirmation
function confirm(message) {
  return new Promise((resolve) => {
    rl.question(`${message} (y/n): `, (answer) => {
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

// Main deployment process
async function deploy() {
  // Step 1: Create final backups
  const dateStr = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(__dirname, '../backups');
  
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  const backupPath = path.join(backupDir, `globals.css.${dateStr}`);
  const originalCssPath = path.join(__dirname, '../src/app/globals.css');
  
  if (fs.existsSync(originalCssPath)) {
    fs.copyFileSync(originalCssPath, backupPath);
    console.log(`Original CSS backed up to ${backupPath}`);
  } else {
    console.error('Original CSS file not found. Continuing anyway...');
  }

  // Step 2: Run the CSS analysis
  const analysisResult = runStep(2, 'node analyze-css.js', { 
    description: 'Analyzing CSS',
    silent: true 
  });
  
  if (!analysisResult.success && !await confirm('CSS analysis failed. Continue anyway?')) {
    console.log('Deployment aborted.');
    rl.close();
    return;
  }

  // Step 3: Run cleanup script
  const cleanupResult = runStep(3, 'node cleanup-css.js', { 
    description: 'Cleaning up CSS',
    silent: true 
  });
  
  if (!cleanupResult.success && !await confirm('CSS cleanup failed. Continue anyway?')) {
    console.log('Deployment aborted.');
    rl.close();
    return;
  }

  // Step 4: Fix gradients
  const gradientResult = runStep(4, 'node standardize-gradients.js', { 
    description: 'Standardizing gradients',
    silent: true 
  });
  
  if (!gradientResult.success && !await confirm('Gradient standardization failed. Continue anyway?')) {
    console.log('Deployment aborted.');
    rl.close();
    return;
  }

  // Step 5: Create modular structure
  const modularResult = runStep(5, 'node create-modular-css.js', { 
    description: 'Creating modular CSS structure',
    silent: true 
  });
  
  if (!modularResult.success && !await confirm('Modular CSS creation failed. Continue anyway?')) {
    console.log('Deployment aborted.');
    rl.close();
    return;
  }

  // Step 6: Update app entry point
  const entryResult = runStep(6, 'node update-app-entry.js', { 
    description: 'Updating app entry points',
    silent: true 
  });
  
  if (!entryResult.success && !await confirm('App entry point update failed. Continue anyway?')) {
    console.log('Deployment aborted.');
    rl.close();
    return;
  }

  // Step 7: Run theme integrity tests
  const integrityResult = runStep(7, 'node test-theme-integrity.js', { 
    description: 'Testing theme integrity',
    silent: true 
  });
  
  let skipIntegrityCheck = false;
  if (!integrityResult.success) {
    console.warn('Theme integrity tests found issues.');
    skipIntegrityCheck = !await confirm('Some theme integrity issues were found. Continue anyway?');
    
    if (skipIntegrityCheck) {
      console.log('Deployment aborted.');
      rl.close();
      return;
    }
  }

  // Final Confirmation
  const finalConfirm = await confirm('\nAll checks have completed. Deploy the changes?');
  if (!finalConfirm) {
    console.log('Deployment cancelled by user.');
    rl.close();
    return;
  }

  // Copy the final CSS to replace the original
  console.log('\n----- DEPLOYING CHANGES -----');
  
  // Copy modular CSS structure to src/styles
  const stylesDir = path.join(__dirname, '../src/styles');
  if (!fs.existsSync(stylesDir)) {
    console.error('Styles directory not found. The modular CSS structure might not have been created properly.');
    rl.close();
    return;
  }
  
  console.log('CSS refactoring successfully deployed!');
  console.log('\nYou may now:');
  console.log('1. Start the development server to test the changes: npm run dev');
  console.log('2. Run visual regression tests: cd scripts && node compare-visual-tests.js');
  console.log('3. Commit the changes: git add . && git commit -m "Refactor: CSS optimized with theme-aware classes"');
  
  rl.close();
}

// Run the deploy process
deploy();