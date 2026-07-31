import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

interface WorkspaceContextValue {
  openTabs: string[]
  activeFile: string
  openFile: (id: string) => void
  closeTab: (id: string) => void
  setActiveFile: (id: string) => void

  isMobile: boolean

  sidebarOpen: boolean
  toggleSidebar: () => void

  terminalOpen: boolean
  toggleTerminal: () => void

  copilotOpen: boolean
  toggleCopilot: () => void

  paletteOpen: boolean
  setPaletteOpen: (v: boolean) => void

  shortcutsOpen: boolean
  setShortcutsOpen: (v: boolean) => void

  dinoOpen: boolean
  setDinoOpen: (v: boolean) => void
  dinoHighScore: number
  reportDinoScore: (score: number) => void
}

const WorkspaceContext = createContext<WorkspaceContextValue | undefined>(undefined)

const HIGHSCORE_KEY = 'harshitha-portfolio-dino-highscore'

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  )

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const [openTabs, setOpenTabs] = useState<string[]>(['welcome'])
  const [activeFile, setActiveFileState] = useState('welcome')

  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [copilotOpen, setCopilotOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [shortcutsOpen, setShortcutsOpen] = useState(false)
  const [dinoOpen, setDinoOpen] = useState(false)
  const [dinoHighScore, setDinoHighScore] = useState<number>(() => {
    if (typeof window === 'undefined') return 0
    return Number(localStorage.getItem(HIGHSCORE_KEY) || 0)
  })

  const openFile = useCallback((id: string) => {
    setOpenTabs((tabs) => (tabs.includes(id) ? tabs : [...tabs, id]))
    setActiveFileState(id)
    if (isMobile) setSidebarOpen(false)
  }, [isMobile])

  const setActiveFile = useCallback((id: string) => {
    setActiveFileState(id)
  }, [])

  const closeTab = useCallback(
    (id: string) => {
      setOpenTabs((tabs) => {
        const next = tabs.filter((t) => t !== id)
        if (activeFile === id) {
          const idx = tabs.indexOf(id)
          const fallback = next[idx] || next[idx - 1] || next[0]
          setActiveFileState(fallback || 'welcome')
          if (!fallback) return ['welcome']
        }
        return next.length ? next : ['welcome']
      })
    },
    [activeFile],
  )

  const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), [])
  const toggleTerminal = useCallback(() => setTerminalOpen((v) => !v), [])
  const toggleCopilot = useCallback(() => setCopilotOpen((v) => !v), [])

  const reportDinoScore = useCallback((score: number) => {
    setDinoHighScore((prev) => {
      if (score > prev) {
        localStorage.setItem(HIGHSCORE_KEY, String(score))
        return score
      }
      return prev
    })
  }, [])

  const value = useMemo(
    () => ({
      openTabs,
      activeFile,
      openFile,
      closeTab,
      setActiveFile,
      isMobile,
      sidebarOpen,
      toggleSidebar,
      terminalOpen,
      toggleTerminal,
      copilotOpen,
      toggleCopilot,
      paletteOpen,
      setPaletteOpen,
      shortcutsOpen,
      setShortcutsOpen,
      dinoOpen,
      setDinoOpen,
      dinoHighScore,
      reportDinoScore,
    }),
    [
      openTabs,
      activeFile,
      openFile,
      closeTab,
      setActiveFile,
      isMobile,
      sidebarOpen,
      toggleSidebar,
      terminalOpen,
      toggleTerminal,
      copilotOpen,
      toggleCopilot,
      paletteOpen,
      shortcutsOpen,
      dinoOpen,
      dinoHighScore,
      reportDinoScore,
    ],
  )

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext)
  if (!ctx) throw new Error('useWorkspace must be used within WorkspaceProvider')
  return ctx
}
