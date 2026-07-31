import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { themes, defaultThemeId, type Theme } from './themes'

const STORAGE_KEY = 'harshitha-portfolio-theme'

interface ThemeContextValue {
  theme: Theme
  themeId: string
  setThemeId: (id: string) => void
  themes: Theme[]
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function applyTheme(theme: Theme) {
  const root = document.documentElement
  for (const [key, value] of Object.entries(theme.colors)) {
    root.style.setProperty(`--${key}`, value)
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState<string>(() => {
    if (typeof window === 'undefined') return defaultThemeId
    return localStorage.getItem(STORAGE_KEY) || defaultThemeId
  })

  const theme = useMemo(
    () => themes.find((t) => t.id === themeId) || themes[0],
    [themeId],
  )

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setThemeId = (id: string) => {
    setThemeIdState(id)
    localStorage.setItem(STORAGE_KEY, id)
  }

  return (
    <ThemeContext.Provider value={{ theme, themeId, setThemeId, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
