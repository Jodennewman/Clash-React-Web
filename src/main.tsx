import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/globals.css'  // Keep using globals.css for now for core variables

import './styles/index.css'  // Import modular CSS structure for styling
import './app/modulehud.css'  // Import ModuleHUD specific styles
import './styles/custom-text.css'  // Import custom text styles
import App from './App'
import { ThemeProvider } from './components/ui/theme-provider'

// Import and initialize GSAP for global use and setup
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

// Configure GSAP
ScrollTrigger.config({
  ignoreMobileResize: true, // Reduces updates during mobile resize events
});

// Import and initialize image mappers
import { registerThumbnails } from './utils/thumbnailMapper';
import { registerWithImageMapper } from './utils/importImages';
import { addPublicImage } from './utils/imageMap';

// Register images and thumbnails
registerThumbnails();
registerWithImageMapper(addPublicImage);

// Create root and render app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system">
      <App />
    </ThemeProvider>
  </StrictMode>,
);