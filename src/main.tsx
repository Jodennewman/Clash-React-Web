import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './components/isometricCube.css'
import App from './AppIsometric.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
