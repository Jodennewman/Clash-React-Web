/**
 * Configuration for sitemap generation
 */
module.exports = {
  siteUrl: 'https://verticalshortcut.com',
  generateRobotsTxt: true,
  exclude: ['/debug', '/theme-visualizer'],
  outDir: './public',
  transform: async (config, path) => {
    // Custom priority based on path
    let priority = 0.7;
    
    if (path === '/') priority = 1.0;
    if (path.includes('application-form')) priority = 0.9;
    
    return {
      loc: path,
      changefreq: path === '/' ? 'daily' : 'weekly',
      priority,
      lastmod: new Date().toISOString(),
    };
  },
}; 