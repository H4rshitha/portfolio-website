import { useEffect } from 'react'
import { useWorkspace } from '../context/WorkspaceContext'

function isTypingTarget(target: EventTarget | null) {
  const el = target as HTMLElement | null
  if (!el) return false
  const tag = el.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable
}

export function useGlobalShortcuts() {
  const ws = useWorkspace()

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const mod = e.ctrlKey || e.metaKey

      if (mod && e.key.toLowerCase() === 'p') {
        e.preventDefault()
        ws.setPaletteOpen(true)
        return
      }
      if (mod && e.key.toLowerCase() === 'b') {
        e.preventDefault()
        ws.toggleSidebar()
        return
      }
      if (mod && e.key === '`') {
        e.preventDefault()
        ws.toggleTerminal()
        return
      }
      if (mod && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault()
        ws.toggleCopilot()
        return
      }
      if (e.key === 'F5') {
        e.preventDefault()
        ws.setDinoOpen(true)
        return
      }
      if (e.key === '?' && !isTypingTarget(e.target)) {
        e.preventDefault()
        ws.setShortcutsOpen(true)
        return
      }
      if (e.key === 'Escape') {
        if (ws.paletteOpen) return ws.setPaletteOpen(false)
        if (ws.shortcutsOpen) return ws.setShortcutsOpen(false)
        if (ws.dinoOpen) return ws.setDinoOpen(false)
        if (ws.isMobile && ws.copilotOpen) return ws.toggleCopilot()
        if (ws.isMobile && ws.terminalOpen) return ws.toggleTerminal()
        if (ws.isMobile && ws.sidebarOpen) return ws.toggleSidebar()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [ws])
}
