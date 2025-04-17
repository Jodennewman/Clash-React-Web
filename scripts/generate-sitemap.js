/**
 * Script to generate sitemap.xml and robots.txt (ESM)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamically import sitemap configuration (ES module)
const { default: config } = await import(path.join(__dirname, '../sitemap.config.js'));

// Function to get the current date in W3C format
const getW3CDate = () => new Date().toISOString();

// Function to generate XML for a single URL
const generateUrlXml = (loc, lastmod, changefreq = 'weekly', priority = '0.7') => {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
};

// Function to extract routes from router.tsx
const extractRoutes = () => {
  const routerContent = fs.readFileSync(path.join(__dirname, '../src/router.tsx'), 'utf-8');
  const routeMatches = routerContent.match(/path:\s*["']([^"']+)["']/g) || [];
  const routes = routeMatches
    .map(match => match.match(/["']([^"']+)["']/)[1])
    .filter(route => !config.exclude.some(pattern => 
      new RegExp(pattern.replace('*', '.*')).test(route)
    ));

  // Add the root route if it's not excluded
  if (!config.exclude.includes('/')) {
    routes.unshift('/');
  }

  return routes;
};

// Function to generate sitemap XML
const generateSitemapXml = (routes) => {
  const date = getW3CDate();
  
  const urlsets = routes.map(route => {
    const fullUrl = new URL(route, config.siteUrl).toString();
    const transformConfig = typeof config.transform === 'function' 
      ? config.transform(config, route)
      : { priority: '0.7', changefreq: 'weekly' };
    
    return generateUrlXml(
      fullUrl,
      date,
      transformConfig.changefreq,
      transformConfig.priority
    );
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsets.join('\n')}
</urlset>`;
};

// Function to generate robots.txt
const generateRobotsTxt = (sitemapUrl) => {
  return `# *
User-agent: *
Allow: /

# Host
Host: ${config.siteUrl}

# Sitemaps
Sitemap: ${sitemapUrl}`;
};

// Main execution
try {
  // Create output directory if it doesn't exist
  const outDir = path.join(__dirname, '..', config.outDir || 'public');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Generate and write sitemap.xml
  const routes = extractRoutes();
  const sitemapXml = generateSitemapXml(routes);
  const sitemapPath = path.join(outDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapXml);
  console.log('✅ Successfully generated sitemap.xml');

  // Generate and write robots.txt if enabled
  if (config.generateRobotsTxt) {
    const sitemapUrl = new URL('/sitemap.xml', config.siteUrl).toString();
    const robotsTxt = generateRobotsTxt(sitemapUrl);
    const robotsPath = path.join(outDir, 'robots.txt');
    fs.writeFileSync(robotsPath, robotsTxt);
    console.log('✅ Successfully generated robots.txt');
  }
} catch (error) {
  console.error('❌ Failed to generate sitemap:', error);
  process.exit(1);
} 