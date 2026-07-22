import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { type Theme } from './types/settings'
import './index.css'
import App from './App.tsx'

function applyStoredTheme() {
  try {
    const stored = localStorage.getItem('flyrank-settings')
    if (!stored) return
    const { theme } = JSON.parse(stored) as { theme?: Theme }
    if (theme && theme !== 'system') {
      document.documentElement.setAttribute('data-theme', theme)
    }
  } catch {
    // ignore invalid stored settings
  }
}

applyStoredTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
