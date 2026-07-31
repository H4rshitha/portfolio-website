import { useWorkspace } from '../../context/WorkspaceContext'
import { useTheme } from '../../themes/ThemeContext'

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
      className={`relative flex h-11 w-11 items-center justify-center text-xl ${
        active ? 'text-vscode-bright' : 'text-vscode-dim hover:text-vscode-text'
      }`}
    >
      {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-vscode-blue2" />}
      {children}
    </button>
  )
}

export function ActivityBar() {
  const { sidebarOpen, toggleSidebar, copilotOpen, toggleCopilot, terminalOpen, toggleTerminal, isMobile } =
    useWorkspace()
  const { themes, themeId, setThemeId } = useTheme()

  if (isMobile) return null

  return (
    <div className="no-select flex w-12 shrink-0 flex-col items-center justify-between border-r border-vscode-border bg-vscode-bg4 py-1">
      <div className="flex flex-col items-center">
        <ActivityIcon label="Explorer (Ctrl+B)" active={sidebarOpen} onClick={toggleSidebar}>
          📁
        </ActivityIcon>
        <ActivityIcon label="Terminal (Ctrl+`)" active={terminalOpen} onClick={toggleTerminal}>
          ⌨️
        </ActivityIcon>
        <ActivityIcon label="Copilot (Ctrl+Shift+C)" active={copilotOpen} onClick={toggleCopilot}>
          🤖
        </ActivityIcon>
      </div>
      <div className="flex flex-col items-center pb-1">
        <ActivityIcon
          label="Change Color Theme"
          onClick={() => {
            const idx = themes.findIndex((t) => t.id === themeId)
            setThemeId(themes[(idx + 1) % themes.length].id)
          }}
        >
          🎨
        </ActivityIcon>
      </div>
    </div>
  )
}
