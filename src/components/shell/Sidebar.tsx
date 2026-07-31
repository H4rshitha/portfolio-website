import { useState } from 'react'
import { useWorkspace } from '../../context/WorkspaceContext'
import { files, fileGroups, extColor } from '../../data/files'

function FileRow({ id, label, ext, indent = false }: { id: string; label: string; ext: keyof typeof extColor; indent?: boolean }) {
  const { activeFile, openFile } = useWorkspace()
  const active = activeFile === id
  return (
    <button
      onClick={() => openFile(id)}
      className={`flex w-full items-center gap-1.5 py-1 pr-2 text-left text-[13px] ${
        indent ? 'pl-8' : 'pl-4'
      } ${active ? 'bg-vscode-blue/15 text-vscode-bright' : 'text-vscode-text hover:bg-white/5'}`}
    >
      <span className={extColor[ext]}>●</span>
      <span className="truncate">{label}</span>
    </button>
  )
}

export function Sidebar() {
  const { sidebarOpen, isMobile, toggleSidebar } = useWorkspace()
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({ projects: true })

  if (!sidebarOpen) return null

  const rootFiles = files.filter((f) => !f.group)
  const grouped = (groupId: string) => files.filter((f) => f.group === groupId)

  const content = (
    <div className="flex h-full flex-col bg-vscode-bg2">
      <div className="no-select flex items-center justify-between px-4 py-2 text-[11px] font-semibold tracking-wide text-vscode-dim">
        <span>EXPLORER</span>
      </div>
      <div className="no-select px-3 pb-1 text-[11px] font-bold uppercase tracking-wide text-vscode-bright">
        harshitha-palaram-portfolio
      </div>
      <div className="flex-1 overflow-y-auto pb-4">
        {fileGroups.map((group) => (
          <div key={group.id}>
            <button
              onClick={() => setOpenGroups((g) => ({ ...g, [group.id]: !g[group.id] }))}
              className="flex w-full items-center gap-1.5 py-1 pl-4 text-left text-[13px] text-vscode-text hover:bg-white/5"
            >
              <span className={`inline-block transition-transform ${openGroups[group.id] ? 'rotate-90' : ''}`}>
                ▸
              </span>
              <span>📂 {group.label}</span>
            </button>
            {openGroups[group.id] &&
              grouped(group.id).map((f) => <FileRow key={f.id} id={f.id} label={f.label} ext={f.ext} indent />)}
          </div>
        ))}
        {rootFiles.map((f) => (
          <FileRow key={f.id} id={f.id} label={f.label} ext={f.ext} />
        ))}
      </div>
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
