/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['verticalshortcut.com'],
    formats: ['image/avif', 'image/webp'],
    sizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 31536000
  },
  // Add path aliases for cleaner imports
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': `${__dirname}/src`,
    };
    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)\\.(.*)$',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig