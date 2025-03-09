import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import VerticalShortcutLanding from './VerticalShortcutLanding'

// Create root and render app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VerticalShortcutLanding />
  </StrictMode>,
)