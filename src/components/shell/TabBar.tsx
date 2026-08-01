import { useWorkspace } from '../../context/WorkspaceContext'
import { getFile } from '../../data/files'
import { FileIcon } from './FileIcons'

export function TabBar() {
  const { openTabs, activeFile, setActiveFile, closeTab } = useWorkspace()

  return (
    <div className="no-select flex h-9 shrink-0 items-center overflow-x-auto border-b border-vscode-border bg-vscode-bg2">
      {openTabs.map((id) => {
        const file = getFile(id)
        if (!file) return null
        const active = id === activeFile
        return (
          <div
            key={id}
            onClick={() => setActiveFile(id)}
            className={`group flex h-full min-w-[120px] shrink-0 cursor-pointer items-center gap-2 border-r border-vscode-border px-3 text-[13px] ${
              active
                ? 'bg-vscode-bg text-vscode-bright border-t-2 border-t-vscode-blue2'
                : 'text-vscode-dim hover:bg-white/5 border-t-2 border-t-transparent'
            }`}
          >
            <FileIcon ext={file.ext} />
            <span className="truncate">{file.label}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeTab(id)
              }}
              aria-label={`Close ${file.label}`}
              className="ml-auto rounded-sm px-1 text-vscode-dim opacity-0 hover:bg-white/10 hover:text-vscode-bright group-hover:opacity-100"
            >
              ×
            </button>
          </div>
        )
      })}
    </div>
  )
}
