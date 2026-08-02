import { useWorkspace } from '../../context/WorkspaceContext'
import { files, type FileExt } from '../../data/files'
import { downloadResume } from '../../utils/downloadResume'
import { FileIcon } from './FileIcons'
import { SourceControlPanel } from './SourceControlPanel'
import { SparkleIcon } from './ActivityIcons'

function FileRow({
  id,
  label,
  ext,
  download = false,
}: {
  id: string
  label: string
  ext: FileExt
  download?: boolean
}) {
  const { activeFile, openFile } = useWorkspace()
  const active = !download && activeFile === id
  return (
    <button
      onClick={() => (download ? downloadResume() : openFile(id))}
      className={`flex w-full items-center gap-1.5 py-1 pr-2 pl-4 text-left text-[13px] ${
        active ? 'bg-vscode-blue/15 text-vscode-bright' : 'text-vscode-text hover:bg-white/5'
      }`}
    >
      <FileIcon ext={ext} />
      <span className="truncate">{label}</span>
    </button>
  )
}

function CopilotLaunchButton() {
  const { toggleCopilot } = useWorkspace()
  return (
    <div className="no-select shrink-0 border-t border-vscode-border bg-vscode-bg2 p-2">
      <button
        onClick={toggleCopilot}
        className="flex w-full items-center gap-2 rounded-sm border border-vscode-accent/40 bg-vscode-accent/10 px-3 py-2 text-left text-xs font-semibold text-vscode-bright hover:bg-vscode-accent/20"
      >
        <SparkleIcon className="h-3.5 w-3.5 shrink-0 text-vscode-accent" />
        <span className="truncate">Harshitha's Copilot</span>
        <span className="ml-auto shrink-0 rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] font-bold text-vscode-dim">
          AI
        </span>
      </button>
    </div>
  )
}

export function Sidebar() {
  const { sidebarOpen, sidebarView, isMobile, toggleSidebar } = useWorkspace()

  if (!sidebarOpen) return null

  const content = (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1">
        {sidebarView === 'sourceControl' ? (
          <SourceControlPanel />
        ) : (
          <div className="flex h-full flex-col bg-vscode-bg2">
            <div className="no-select flex items-center justify-between px-4 py-2 text-[11px] font-semibold tracking-wide text-vscode-dim">
              <span>EXPLORER</span>
            </div>
            <div className="no-select px-3 pb-1 text-[11px] font-bold uppercase tracking-wide text-vscode-bright">
              harshitha-palaram-portfolio
            </div>
            <div className="flex-1 overflow-y-auto pb-4">
              {files.map((f) => (
                <FileRow key={f.id} id={f.id} label={f.label} ext={f.ext} download={f.download} />
              ))}
            </div>
          </div>
        )}
      </div>
      <CopilotLaunchButton />
    </div>
  )

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 flex">
        <div className="w-72 max-w-[80vw] animate-slide-in-left border-r border-vscode-border">{content}</div>
        <div className="flex-1 bg-black/50" onClick={toggleSidebar} />
      </div>
    )
  }

  return <div className="w-60 shrink-0 border-r border-vscode-border">{content}</div>
}
