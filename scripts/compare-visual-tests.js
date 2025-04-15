const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

console.log('Starting visual regression test comparison...');

// Check if baseline screenshots exist
const baselineDir = path.join(__dirname, '../visual-regression/before');
if (!fs.existsSync(baselineDir)) {
  console.error('Baseline screenshots not found. Please run "node setup-visual-tests.js" first.');
  process.exit(1);
}

// Function to validate required packages
function validatePackages() {
  try {
    require.resolve('pixelmatch');
    require.resolve('pngjs');
  } catch (e) {
    console.error('Missing required packages. Please run "npm install pixelmatch pngjs" first.');
    process.exit(1);
  }
}

validatePackages();

// Create "after" screenshots if they don't exist or if forced
const afterDir = path.join(__dirname, '../visual-regression/after');
const diffDir = path.join(__dirname, '../visual-regression/diff');

// Create diff directory if needed
if (!fs.existsSync(diffDir)) {
  fs.mkdirSync(diffDir, { recursive: true });
  console.log(`Created directory: ${diffDir}`);
}

// Check if "after" screenshots exist
const hasAfterScreenshots = fs.existsSync(afterDir) && 
                          fs.readdirSync(afterDir).filter(f => f.endsWith('.png')).length > 0;

if (!hasAfterScreenshots || process.argv.includes('--force-capture')) {
  console.log('No "after" screenshots found or force capture requested. Capturing new screenshots...');
  
  exec('node setup-visual-tests.js --after', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error creating "after" screenshots: ${error.message}`);
      console.error(stderr);
      process.exit(1);
    }
    
    console.log(stdout);
    compareScreenshots();
  });
} else {
  console.log('Using existing "after" screenshots.');
  compareScreenshots();
}

// Compare before and after screenshots
function compareScreenshots() {
  console.log('\nComparing screenshots...');
  
  const beforeFiles = fs.readdirSync(baselineDir)
                      .filter(f => f.endsWith('.png'));
  
  if (beforeFiles.length === 0) {
    console.error('No baseline screenshots found to compare.');
    process.exit(1);
  }
  
  console.log(`Found ${beforeFiles.length} baseline screenshots to compare.`);
  
  let totalDiff = 0;
  let fileCount = 0;
  let significantDiffs = 0;
  
  // Track differences by page, mode and viewport
  const diffsByPage = {};
  const diffsByMode = { 'light': 0, 'dark': 0 };
  const diffsByViewport = { 'desktop': 0, 'tablet': 0, 'mobile': 0 };
  
  beforeFiles.forEach(file => {
    const beforeFile = path.join(baselineDir, file);
    const afterFile = path.join(afterDir, file);
    
    if (!fs.existsSync(afterFile)) {
      console.warn(`Missing "after" screenshot: ${file}`);
      return;
    }
    
    try {
      // Load the images
      const img1 = PNG.sync.read(fs.readFileSync(beforeFile));
      const img2 = PNG.sync.read(fs.readFileSync(afterFile));
      
      // Check dimensions
      if (img1.width !== img2.width || img1.height !== img2.height) {
        console.warn(`Size mismatch for ${file}: ${img1.width}x${img1.height} vs ${img2.width}x${img2.height}`);
        return;
      }
      
      // Create diff image
      const { width, height } = img1;
      const diff = new PNG({ width, height });
      
      // Compare the images (threshold: 0.1 is a good value for visual differences)
      const pixelDiff = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
      const diffPercentage = (pixelDiff / (width * height)) * 100;
      
      // Extract page, mode and viewport from filename
      // Format: [page]-[mode]-[viewport].png (e.g., home-light-desktop.png)
      const [pageName, mode, viewport] = file.replace('.png', '').split('-');
      
      // Track diff by page
      if (!diffsByPage[pageName]) diffsByPage[pageName] = 0;
      diffsByPage[pageName] += diffPercentage;
      
      // Track diff by mode and viewport
      if (mode) diffsByMode[mode] += diffPercentage;
      if (viewport) diffsByViewport[viewport] += diffPercentage;
      
      // Handle significant differences
      if (diffPercentage > 0.5) {
        significantDiffs++;
        
        // Write diff image
        fs.writeFileSync(path.join(diffDir, file), PNG.sync.write(diff));
        console.warn(`⚠️ Visual diff of ${diffPercentage.toFixed(2)}% in ${file}`);
      } else if (diffPercentage > 0.1) {
        console.log(`Minor diff of ${diffPercentage.toFixed(2)}% in ${file}`);
      }
      
      totalDiff += diffPercentage;
      fileCount++;
    } catch (error) {
      console.error(`Error comparing ${file}: ${error.message}`);
    }
  });
  
  if (fileCount === 0) {
    console.error('No valid comparisons were made.');
    process.exit(1);
  }
  
  // Calculate average differences
  const avgDiff = totalDiff / fileCount;
  
  // Normalize page, mode and viewport diffs by count
  Object.keys(diffsByPage).forEach(page => {
    const count = beforeFiles.filter(f => f.startsWith(page)).length;
    diffsByPage[page] = diffsByPage[page] / count;
  });
  
  Object.keys(diffsByMode).forEach(mode => {
    const count = beforeFiles.filter(f => f.includes(`-${mode}-`)).length;
    if (count > 0) diffsByMode[mode] = diffsByMode[mode] / count;
  });
  
  Object.keys(diffsByViewport).forEach(viewport => {
    const count = beforeFiles.filter(f => f.endsWith(`-${viewport}.png`)).length;
    if (count > 0) diffsByViewport[viewport] = diffsByViewport[viewport] / count;
  });
  
  // Report results
  console.log('\n=== Visual Regression Test Results ===');
  console.log(`Average difference: ${avgDiff.toFixed(2)}%`);
  console.log(`Files with significant differences: ${significantDiffs}/${fileCount}`);
  
  console.log('\nDifferences by page:');
  Object.entries(diffsByPage)
    .sort((a, b) => b[1] - a[1])
    .forEach(([page, diff]) => {
      console.log(`- ${page}: ${diff.toFixed(2)}%`);
    });
  
  console.log('\nDifferences by mode:');
  Object.entries(diffsByMode)
    .sort((a, b) => b[1] - a[1])
    .forEach(([mode, diff]) => {
      console.log(`- ${mode}: ${diff.toFixed(2)}%`);
    });
  
  console.log('\nDifferences by viewport:');
  Object.entries(diffsByViewport)
    .sort((a, b) => b[1] - a[1])
    .forEach(([viewport, diff]) => {
      console.log(`- ${viewport}: ${diff.toFixed(2)}%`);
    });
  
  // Determine overall result
  if (avgDiff > 5.0) {
    console.error('\n❌ FAIL: Major visual differences detected. Please review before proceeding.');
    console.error(`Diff images saved to: ${diffDir}`);
    process.exit(1);
  } else if (avgDiff > 1.0) {
    console.warn('\n⚠️ WARNING: Significant visual differences detected. Review carefully.');
    console.warn(`Diff images saved to: ${diffDir}`);
  } else {
    console.log('\n✅ PASS: Visual regression tests passed successfully!');
  }
}