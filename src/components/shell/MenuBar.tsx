import { useState } from 'react'
import { useWorkspace } from '../../context/WorkspaceContext'
import { useTheme } from '../../themes/ThemeContext'
import { profile } from '../../data/resume'
import { Dropdown, type MenuItem } from './Dropdown'

function downloadResume() {
  const a = document.createElement('a')
  a.href = profile.resumeFile
  a.download = 'Harshitha_Palaram_Resume.pdf'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export function MenuBar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const {
    closeTab,
    activeFile,
    setPaletteOpen,
    toggleSidebar,
    toggleTerminal,
    toggleCopilot,
    setShortcutsOpen,
    setDinoOpen,
    openFile,
  } = useWorkspace()
  const { themes, themeId, setThemeId } = useTheme()

  const cycleTheme = () => {
    const idx = themes.findIndex((t) => t.id === themeId)
    setThemeId(themes[(idx + 1) % themes.length].id)
  }

  const menus: Record<string, MenuItem[]> = {
    File: [
      { label: 'Go to File...', shortcut: 'Ctrl+P', onClick: () => setPaletteOpen(true) },
      { label: 'Download Resume PDF', shortcut: '⬇', onClick: downloadResume },
      { divider: true, label: '' },
      { label: 'Close Editor', shortcut: 'Ctrl+W', onClick: () => closeTab(activeFile) },
    ],
    Edit: [
      { label: 'Undo', disabled: true },
      { label: 'Redo', disabled: true },
      { divider: true, label: '' },
      { label: "Ctrl+W won't save you here", disabled: true },
    ],
    Selection: [{ label: 'Select All', disabled: true }],
    View: [
      { label: 'Toggle Sidebar', shortcut: 'Ctrl+B', onClick: toggleSidebar },
      { label: 'Toggle Terminal', shortcut: 'Ctrl+`', onClick: toggleTerminal },
      { label: "Toggle Harshitha's Copilot", shortcut: 'Ctrl+Shift+C', onClick: toggleCopilot },
      { label: 'Command Palette', shortcut: 'Ctrl+P', onClick: () => setPaletteOpen(true) },
      { divider: true, label: '' },
      { label: `Next Color Theme (${themes.find((t) => t.id === themeId)?.label})`, onClick: cycleTheme },
    ],
    Go: [
      { label: 'Go to File...', shortcut: 'Ctrl+P', onClick: () => setPaletteOpen(true) },
      { divider: true, label: '' },
      { label: 'Go to about.md', onClick: () => openFile('about') },
      { label: 'Go to skills.json', onClick: () => openFile('skills') },
      { label: 'Go to contact.tsx', onClick: () => openFile('contact') },
    ],
    Run: [
      { label: 'Start Debugging', shortcut: 'F5', onClick: () => setDinoOpen(true) },
      { label: 'Run Without Debugging (play the dino game)', onClick: () => setDinoOpen(true) },
    ],
    Terminal: [
      { label: 'New Terminal', shortcut: 'Ctrl+`', onClick: toggleTerminal },
      { label: 'Split Terminal', disabled: true },
    ],
    Help: [
      { label: 'Keyboard Shortcuts', shortcut: '?', onClick: () => setShortcutsOpen(true) },
      { label: 'Welcome', onClick: () => openFile('welcome') },
      { divider: true, label: '' },
      { label: 'About This Portfolio', onClick: () => openFile('welcome') },
    ],
  }

  return (
    <div className="no-select relative z-40 hidden h-7 shrink-0 items-center gap-0.5 border-b border-vscode-border bg-vscode-bg3 px-2 text-xs text-vscode-text md:flex">
      {Object.entries(menus).map(([label, items]) => (
        <div key={label} className="relative">
          <button
            onClick={() => setOpenMenu((m) => (m === label ? null : label))}
            className={`rounded-sm px-2 py-1 hover:bg-white/10 ${openMenu === label ? 'bg-white/10' : ''}`}
          >
            {label}
          </button>
          <Dropdown open={openMenu === label} onClose={() => setOpenMenu(null)} items={items} />
        </div>
      ))}
    </div>
  )
}
