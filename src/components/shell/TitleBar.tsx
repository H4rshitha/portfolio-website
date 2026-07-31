import { useWorkspace } from '../../context/WorkspaceContext'
import { getFile } from '../../data/files'

export function TitleBar() {
  const { activeFile, isMobile, toggleSidebar } = useWorkspace()
  const file = getFile(activeFile)

  return (
    <div className="no-select flex h-8 shrink-0 items-center gap-2 border-b border-black bg-vscode-bg3 px-3 text-xs text-vscode-dim">
      {isMobile && (
        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="mr-1 flex h-5 w-5 flex-col items-center justify-center gap-[3px] text-vscode-text"
        >
          <span className="block h-[1.5px] w-4 bg-current" />
          <span className="block h-[1.5px] w-4 bg-current" />
          <span className="block h-[1.5px] w-4 bg-current" />
        </button>
      )}
      {!isMobile && (
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
      )}
      <div className="flex-1 truncate text-center">
        harshitha-palaram — portfolio {file ? `— ${file.label}` : ''} — Visual Studio Code
      </div>
      {!isMobile && <div className="w-[54px]" />}
    </div>
  )
}
