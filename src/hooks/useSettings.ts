import { useEffect, useState } from 'react'
import {
  defaultSettings,
  type Settings,
  type Theme,
} from '../types/settings'

const STORAGE_KEY = 'flyrank-settings'

function loadSettings(): Settings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return defaultSettings
    return { ...defaultSettings, ...JSON.parse(stored) }
  } catch {
    return defaultSettings
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement

  if (theme === 'system') {
    root.removeAttribute('data-theme')
    return
  }

  root.setAttribute('data-theme', theme)
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(loadSettings)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    applyTheme(settings.theme)
  }, [settings.theme])

  function save(next: Settings) {
    setSettings(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    applyTheme(next.theme)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2000)
  }

  function reset() {
    setSettings(defaultSettings)
    localStorage.removeItem(STORAGE_KEY)
    applyTheme(defaultSettings.theme)
    setSaved(false)
  }

  return { settings, save, reset, saved }
}
