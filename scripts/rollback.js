const fs = require('fs');
const path = require('path');
const readline = require('readline');

console.log('===== CSS REFACTORING ROLLBACK =====');
console.log('This script will revert the CSS refactoring changes.');

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt for confirmation
function confirm(message) {
  return new Promise((resolve) => {
    rl.question(`${message} (y/n): `, (answer) => {
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

// Function to find the latest backup
function findLatestBackup() {
  const backupsDir = path.join(__dirname, '../backups');
  
  if (!fs.existsSync(backupsDir)) {
    return null;
  }
  
  const backups = fs.readdirSync(backupsDir)
    .filter(file => file.startsWith('globals.css.'))
    .sort()
    .reverse();
  
  if (backups.length === 0) {
    return null;
  }
  
  return path.join(backupsDir, backups[0]);
}

// Main rollback process
async function rollback() {
  // Find most recent backup
  let backupPath = findLatestBackup();
  
  if (!backupPath) {
    console.log('No backup files found in the backups directory.');
    
    // Check for the backup in src/app directory
    const fallbackBackup = path.join(__dirname, '../src/app/globals.css.backup');
    if (fs.existsSync(fallbackBackup)) {
      backupPath = fallbackBackup;
      console.log(`Found fallback backup: ${backupPath}`);
    } else {
      console.error('No backup files found. Cannot proceed with rollback.');
      rl.close();
      return;
    }
  }
  
  // Confirm the rollback
  const proceedWithRollback = await confirm(`Rolling back to backup: ${backupPath}. Proceed?`);
  if (!proceedWithRollback) {
    console.log('Rollback cancelled.');
    rl.close();
    return;
  }
  
  // Restore CSS file
  const originalPath = path.join(__dirname, '../src/app/globals.css');
  fs.copyFileSync(backupPath, originalPath);
  console.log(`Restored CSS from backup: ${backupPath}`);
  
  // Restore main.tsx
  const entryFile = path.join(__dirname, '../src/main.tsx');
  const entryBackup = `${entryFile}.css-refactor-backup`;
  
  if (fs.existsSync(entryBackup)) {
    fs.copyFileSync(entryBackup, entryFile);
    console.log(`Restored entry file from backup: ${entryBackup}`);
  } else {
    // If backup doesn't exist, try to fix manually
    if (fs.existsSync(entryFile)) {
      let content = fs.readFileSync(entryFile, 'utf8');
      content = content.replace(
        /import ['"]\.\/styles\/index\.css['"]/,
        'import "./app/globals.css"'
      );
      fs.writeFileSync(entryFile, content);
      console.log('Modified entry file to use original CSS');
    } else {
      console.warn('Entry file not found, could not update imports');
    }
  }
  
  // Clean up the modular styles directory
  const stylesDir = path.join(__dirname, '../src/styles');
  if (fs.existsSync(stylesDir)) {
    if (await confirm(`Remove modular styles directory (${stylesDir})?`)) {
      fs.rmSync(stylesDir, { recursive: true, force: true });
      console.log('Removed modular styles directory');
    } else {
      console.log('Styles directory left intact');
    }
  }
  
  console.log('\nRollback complete! The CSS changes have been reverted.');
  rl.close();
}

// Run the rollback process
rollback();