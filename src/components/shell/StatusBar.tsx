import { useWorkspace } from '../../context/WorkspaceContext'
import { useTheme } from '../../themes/ThemeContext'
import { getFile } from '../../data/files'

const langLabel: Record<string, string> = {
  md: 'Markdown',
  json: 'JSON',
  tsx: 'TypeScript React',
  ts: 'TypeScript',
  html: 'HTML',
  js: 'JavaScript',
  css: 'CSS',
  pdf: 'PDF Document',
  yml: 'YAML',
  txt: 'Plain Text',
}

export function StatusBar() {
  const { activeFile, toggleTerminal, toggleCopilot, setPaletteOpen, isMobile } = useWorkspace()
  const { theme, themes, setThemeId } = useTheme()
  const file = getFile(activeFile)

  const cycleTheme = () => {
    const idx = themes.findIndex((t) => t.id === theme.id)
    setThemeId(themes[(idx + 1) % themes.length].id)
  }

  return (
    <div className="no-select flex h-6 shrink-0 items-center justify-between bg-vscode-blue px-2 text-[11px] text-white">
      <div className="flex items-center gap-3 overflow-hidden">
        <span>🌿 main</span>
        {!isMobile && <span className="hidden sm:inline">✓ up to date</span>}
        <button onClick={() => setPaletteOpen(true)} className="hidden truncate hover:underline sm:inline">
          Ln 1, Col 1
        </button>
      </div>
      <div className="flex items-center gap-3">
        {file && <span className="hidden sm:inline">{langLabel[file.ext]}</span>}
        <span className="hidden sm:inline">UTF-8</span>
        <button onClick={cycleTheme} className="hover:underline">
          🎨 {theme.label}
        </button>
        <button onClick={toggleTerminal} className="hover:underline">
          Terminal
        </button>
        <button onClick={toggleCopilot} className="hover:underline">
          🤖 Copilot
        </button>
      </div>
    </div>
  )
}
