import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crmIntegrationHandler } from './src/api/crm-integration'
import schemaPlugin from './vite-schema-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    schemaPlugin(), // Add schema injection plugin
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
      },
      getTotalDuration: (data: any[]) => {
        if (!data) return 0;
        return data.reduce((acc, item) => acc + item.duration, 0);
      },
  css: {
    modules: false,
  },
  // Skip strict type checking during build
  optimizeDeps: {
    // Force inclusion of these modules in the bundle
    include: ['react', 'react-dom']
  },
  build: {
    // Be more permissive with TypeScript errors
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  server: {
    sourcemapIgnoreList: false, // Ensures all sources are included in source maps
    proxy: {
      '/api/crm-integration': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        rewrite: () => '/api/crm-integration',
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
        },
        bypass: (req, res) => {
          if (req.url === '/api/crm-integration') {
            crmIntegrationHandler(req).then(response => {
              response.headers.forEach((value, key) => {
                res.setHeader(key, value);
              });
              response.text().then(body => {
                res.statusCode = response.status;
                res.end(body);
              });
            });
            return true;
          }
          return undefined;
        }
      }
    },
    // Add SPA history fallback
    historyApiFallback: true,
  },
  preview: {
    // Add SPA history fallback for preview server as well
    historyApiFallback: true,
  },
})

