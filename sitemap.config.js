/**
 * Configuration for sitemap generation
 */
export default {
  siteUrl: 'https://verticalshortcut.com',
  generateRobotsTxt: true,
  exclude: ['/', '/debug', '/theme-visualizer'],
  outDir: './public',
  transform: async (config, path) => {
    // Custom priority based on path
    let priority = 0.7;
    let changefreq = 'weekly'; // Default change frequency

    if (path.includes('landing')) {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.includes('application-form')) {
      priority = 0.9;
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
}; 