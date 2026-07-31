import { useWorkspace } from '../../context/WorkspaceContext'

const shortcuts: { keys: string; action: string }[] = [
  { keys: 'Ctrl / Cmd + P', action: 'Open command palette / go to file' },
  { keys: 'Ctrl / Cmd + B', action: 'Toggle the file explorer sidebar' },
  { keys: 'Ctrl / Cmd + `', action: 'Toggle the integrated terminal' },
  { keys: 'Ctrl / Cmd + Shift + C', action: "Toggle Harshitha's Copilot chat" },
  { keys: 'F5', action: 'Start "debugging" (opens the dino game)' },
  { keys: 'Ctrl / Cmd + W', action: 'Close the active editor tab' },
  { keys: '?', action: 'Open this keyboard shortcuts reference' },
  { keys: 'Esc', action: 'Close any open modal or panel' },
  { keys: 'Space / Click', action: 'Jump, while playing the dino game' },
]

export function KeyboardShortcutsModal() {
  const { shortcutsOpen, setShortcutsOpen } = useWorkspace()
  if (!shortcutsOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={() => setShortcutsOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md animate-slide-up rounded-md border border-vscode-border bg-vscode-bg3 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-vscode-border px-4 py-3">
          <h2 className="font-display text-sm font-bold text-vscode-bright">Keyboard Shortcuts</h2>
          <button
            onClick={() => setShortcutsOpen(false)}
            className="rounded-sm px-2 text-vscode-dim hover:bg-white/10 hover:text-vscode-bright"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-4">
          <table className="w-full text-[13px]">
            <tbody>
              {shortcuts.map((s) => (
                <tr key={s.keys} className="border-b border-vscode-border/60 last:border-0">
                  <td className="py-2 pr-4 text-vscode-text">{s.action}</td>
                  <td className="py-2 text-right">
                    <kbd className="rounded border border-vscode-border bg-vscode-bg px-1.5 py-0.5 font-mono text-[11px] text-vscode-blue2">
                      {s.keys}
                    </kbd>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
