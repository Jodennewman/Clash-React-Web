/**
 * Script to generate sitemap.xml and robots.txt
 */
const { generateSitemap } = require('next-sitemap');
const config = require('../sitemap.config');

async function generate() {
  await generateSitemap(config);
  console.log('✅ Sitemap generated successfully!');
}

generate().catch(err => {
  console.error('❌ Error generating sitemap:', err);
  process.exit(1);
}); 