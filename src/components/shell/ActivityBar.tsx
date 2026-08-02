import { useWorkspace } from '../../context/WorkspaceContext'
import { useTheme } from '../../themes/ThemeContext'
import {
  ExplorerIcon,
  ExtensionsIcon,
  SearchIcon,
  SettingsIcon,
  SourceControlIcon,
  SparkleIcon,
} from './ActivityIcons'

function ActivityIcon({
  label,
  active,
  onClick,
  children,
}: {
  label: string
  active?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      title={label}
      aria-label={label}
      onClick={onClick}
      className={`relative flex h-11 w-11 items-center justify-center ${
        active ? 'text-vscode-bright' : 'text-vscode-dim hover:text-vscode-text'
      }`}
    >
      {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-vscode-blue2" />}
      {children}
    </button>
  )
}

export function ActivityBar() {
  const {
    sidebarOpen,
    sidebarView,
    selectSidebarView,
    copilotOpen,
    toggleCopilot,
    setPaletteOpen,
    setShortcutsOpen,
    isMobile,
  } = useWorkspace()
  const { themes, themeId, setThemeId } = useTheme()

  if (isMobile) return null

  const cycleTheme = () => {
    const idx = themes.findIndex((t) => t.id === themeId)
    setThemeId(themes[(idx + 1) % themes.length].id)
  }

  return (
    <div className="no-select flex w-12 shrink-0 flex-col items-center justify-between border-r border-vscode-border bg-vscode-bg4 py-1">
      <div className="flex flex-col items-center">
        <ActivityIcon
          label="Explorer (Ctrl+B)"
          active={sidebarOpen && sidebarView === 'explorer'}
          onClick={() => selectSidebarView('explorer')}
        >
          <ExplorerIcon className="h-5 w-5" />
        </ActivityIcon>
        <ActivityIcon label="Search (Ctrl+P)" onClick={() => setPaletteOpen(true)}>
          <SearchIcon className="h-5 w-5" />
        </ActivityIcon>
        <ActivityIcon
          label="Source Control"
          active={sidebarOpen && sidebarView === 'sourceControl'}
          onClick={() => selectSidebarView('sourceControl')}
        >
          <SourceControlIcon className="h-5 w-5" />
        </ActivityIcon>
        <ActivityIcon label="Extensions · Change Color Theme" onClick={cycleTheme}>
          <ExtensionsIcon className="h-5 w-5" />
        </ActivityIcon>
        <ActivityIcon label="Copilot (Ctrl+Shift+C)" active={copilotOpen} onClick={toggleCopilot}>
          <SparkleIcon className="h-5 w-5" />
        </ActivityIcon>
      </div>
      <div className="flex flex-col items-center pb-1">
        <ActivityIcon label="Settings · Keyboard Shortcuts" onClick={() => setShortcutsOpen(true)}>
          <SettingsIcon className="h-5 w-5" />
        </ActivityIcon>
      </div>
    </div>
  )
}
