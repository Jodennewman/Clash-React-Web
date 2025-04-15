const fs = require('fs');
const path = require('path');

console.log('Starting app entry point update...');

// Find main entry files
const entryFiles = [
  '../src/main.tsx',
  '../src/main.jsx',
  '../src/index.tsx',
  '../src/index.jsx'
];

let entryFile;
let entryFilePath;

for (const file of entryFiles) {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    entryFile = file;
    entryFilePath = fullPath;
    break;
  }
}

if (!entryFile) {
  console.error('Could not find entry file');
  process.exit(1);
}

console.log(`Found entry file: ${entryFile}`);

// Read the file
let content;
try {
  content = fs.readFileSync(entryFilePath, 'utf8');
  console.log(`Read ${content.length} bytes from ${entryFile}`);
} catch (error) {
  console.error(`Error reading entry file: ${error.message}`);
  process.exit(1);
}

// Create backup of the original file
const backupPath = `${entryFilePath}.css-refactor-backup`;
fs.writeFileSync(backupPath, content);
console.log(`Created backup at ${backupPath}`);

// Update the import
const originalContent = content;
let newContent = content;

// Check for existing CSS import
const oldImportRegex = /import ['"]\.\/app\/globals\.css['"]/;
const newImportPath = './styles/index.css';

if (oldImportRegex.test(content)) {
  // Replace existing import
  newContent = content.replace(oldImportRegex, `import "${newImportPath}"`);
  console.log('Replaced existing CSS import');
} else {
  // No existing import found, add new one
  console.log('No existing CSS import found, adding new one');
  
  // Try to find a good position to add the import
  // 1. After the last import statement
  const importRegex = /^import .+$/gm;
  const importMatches = [...content.matchAll(importRegex)];
  
  if (importMatches.length > 0) {
    // Get the last import statement
    const lastImport = importMatches[importMatches.length - 1];
    const position = lastImport.index + lastImport[0].length;
    
    // Add the new import after the last one
    newContent = content.slice(0, position) + 
                `\nimport "${newImportPath}";` + 
                content.slice(position);
    
    console.log('Added import after last import statement');
  } else {
    // No imports found, add to the top of the file
    newContent = `import "${newImportPath}";\n` + content;
    console.log('Added import to the top of the file');
  }
}

// Only write if the content changed
if (newContent !== originalContent) {
  fs.writeFileSync(entryFilePath, newContent);
  console.log(`Updated ${entryFile} with new CSS import`);
} else {
  console.warn('No changes were needed in the entry file');
}

console.log('App entry point update complete!');