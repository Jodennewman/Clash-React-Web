import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
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
  }
})

