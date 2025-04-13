const fs = require('fs');
const path = require('path');

console.log('Setting up visual regression tests...');

// Check if puppeteer is installed
try {
  require.resolve('puppeteer');
} catch (e) {
  console.error('The "puppeteer" package is not installed. Please run "npm install puppeteer" and try again.');
  console.error('Note: Alternatively, place this script in a new directory and run "npm init -y && npm install puppeteer"');
  process.exit(1);
}

const puppeteer = require('puppeteer');

// Create screenshots of key pages in both light and dark modes
async function captureScreenshots() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  const isAfterMode = process.argv.includes('--after');
  const screenshotDir = isAfterMode ? 'after' : 'before';
  
  // List of routes to capture - these should be available in your app
  const pages = [
    '/', '/courses', '/about', '/pricing'
  ];
  
  // Test both light and dark modes
  const modes = ['light', 'dark'];
  
  // Test different device sizes
  const viewports = [
    { width: 1920, height: 1080, name: 'desktop' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 375, height: 667, name: 'mobile' }
  ];
  
  // Create directory for screenshots
  const screenshotsDir = path.join(__dirname, '../visual-regression', screenshotDir);
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
    console.log(`Created directory: ${screenshotsDir}`);
  }
  
  // Set up base URL - assuming localhost:5173 for Vite
  const baseUrl = 'http://localhost:5173';
  console.log(`Using base URL: ${baseUrl}`);
  
  // Take screenshots for each combination
  for (const pageUrl of pages) {
    for (const mode of modes) {
      for (const viewport of viewports) {
        // Set viewport
        await page.setViewport(viewport);
        
        // Navigate to the page
        const fullUrl = `${baseUrl}${pageUrl}`;
        console.log(`Navigating to ${fullUrl} (${mode} mode, ${viewport.name})`);
        
        try {
          await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
          
          // Set theme mode
          if (mode === 'dark') {
            await page.evaluate(() => {
              document.documentElement.classList.add('dark');
              
              // Reset data-theme if it exists
              if (document.documentElement.hasAttribute('data-theme')) {
                document.documentElement.setAttribute('data-theme', 'dark');
              }
            });
          } else {
            await page.evaluate(() => {
              document.documentElement.classList.remove('dark');
              
              // Reset data-theme if it exists
              if (document.documentElement.hasAttribute('data-theme')) {
                document.documentElement.setAttribute('data-theme', 'light');
              }
            });
          }
          
          // Wait for any animations/transitions
          await page.waitForTimeout(1000);
          
          // Create filename
          const filename = `${pageUrl.replace(/\//g, '-') || 'home'}-${mode}-${viewport.name}.png`;
          const screenshotPath = path.join(screenshotsDir, filename);
          
          // Take screenshot
          await page.screenshot({
            path: screenshotPath,
            fullPage: true
          });
          
          console.log(`Captured: ${filename}`);
        } catch (error) {
          console.error(`Error capturing ${fullUrl} (${mode}, ${viewport.name}): ${error.message}`);
        }
      }
    }
  }
  
  await browser.close();
  console.log(`\nVisual regression ${isAfterMode ? 'after' : 'baseline'} screenshots created.`);
}

// Run the function
captureScreenshots().catch(error => {
  console.error('Error in captureScreenshots:', error);
});