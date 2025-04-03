import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/globals.css'  // Import globals.css first so its variables take precedence
import './index.css'
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