import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './app/globals.css'  // Import the globals.css with all our color variables
import App from './App'
import { ThemeProvider } from './components/ui/theme-provider'

// Create root and render app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system">
      <App />
    </ThemeProvider>
  </StrictMode>,
);