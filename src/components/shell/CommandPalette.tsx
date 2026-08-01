import { useEffect, useMemo, useRef, useState } from 'react'
import { useWorkspace } from '../../context/WorkspaceContext'
import { files, type FileExt } from '../../data/files'
import { downloadResume } from '../../utils/downloadResume'
import { FileIcon } from './FileIcons'

interface PaletteEntry {
  id: string
  label: string
  hint: string
  ext?: FileExt
  icon?: string
  run: () => void
}

export function CommandPalette() {
  const {
    paletteOpen,
    setPaletteOpen,
    openFile,
    toggleSidebar,
    toggleTerminal,
    toggleCopilot,
    setShortcutsOpen,
    setDinoOpen,
  } = useWorkspace()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (paletteOpen) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [paletteOpen])

  const entries: PaletteEntry[] = useMemo(() => {
    const fileEntries: PaletteEntry[] = files.map((f) => ({
      id: `file-${f.id}`,
      label: f.label,
      hint: f.download ? 'download' : f.group ? `projects/${f.label}` : 'go to file',
      ext: f.ext,
      run: f.download ? downloadResume : () => openFile(f.id),
    }))
    const commandEntries: PaletteEntry[] = [
      { id: 'cmd-sidebar', label: 'View: Toggle Sidebar', hint: 'Ctrl+B', icon: '⚙', run: toggleSidebar },
      { id: 'cmd-terminal', label: 'View: Toggle Terminal', hint: 'Ctrl+`', icon: '⚙', run: toggleTerminal },
      { id: 'cmd-copilot', label: "View: Toggle Copilot", hint: 'Ctrl+Shift+C', icon: '⚙', run: toggleCopilot },
      { id: 'cmd-shortcuts', label: 'Help: Keyboard Shortcuts', hint: '?', icon: '⚙', run: () => setShortcutsOpen(true) },
      { id: 'cmd-dino', label: 'Run: Start Debugging (play dino)', hint: 'F5', icon: '▶', run: () => setDinoOpen(true) },
    ]
    return [...commandEntries, ...fileEntries]
  }, [openFile, toggleSidebar, toggleTerminal, toggleCopilot, setShortcutsOpen, setDinoOpen])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return entries
    return entries.filter((e) => e.label.toLowerCase().includes(q))
  }, [entries, query])

  useEffect(() => {
    setSelected(0)
  }, [query])

  if (!paletteOpen) return null

  const run = (entry?: PaletteEntry) => {
    if (!entry) return
    entry.run()
    setPaletteOpen(false)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 pt-[10vh]"
      onClick={() => setPaletteOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl animate-slide-up overflow-hidden rounded-md border border-vscode-border bg-vscode-bg3 shadow-2xl"
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setSelected((s) => Math.min(s + 1, filtered.length - 1))
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              setSelected((s) => Math.max(s - 1, 0))
            } else if (e.key === 'Enter') {
              run(filtered[selected])
            } else if (e.key === 'Escape') {
              setPaletteOpen(false)
            }
          }}
          placeholder="Go to file or run command..."
          className="w-full border-b border-vscode-border bg-transparent px-4 py-3 text-sm text-vscode-bright outline-none placeholder:text-vscode-dim"
        />
        <div className="max-h-80 overflow-y-auto py-1">
          {filtered.length === 0 && (
            <div className="px-4 py-6 text-center text-xs text-vscode-dim">No results found.</div>
          )}
          {filtered.map((entry, i) => (
            <button
              key={entry.id}
              onMouseEnter={() => setSelected(i)}
              onClick={() => run(entry)}
              className={`flex w-full items-center gap-3 px-4 py-2 text-left text-[13px] ${
                i === selected ? 'bg-vscode-blue text-white' : 'text-vscode-text'
              }`}
            >
              {entry.ext ? (
                <FileIcon ext={entry.ext} />
              ) : (
                <span className="inline-flex w-6 shrink-0 justify-center text-vscode-blue2">{entry.icon}</span>
              )}
              <span className="truncate">{entry.label}</span>
              <span className={`ml-auto text-[11px] ${i === selected ? 'text-white/70' : 'text-vscode-dim'}`}>
                {entry.hint}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
