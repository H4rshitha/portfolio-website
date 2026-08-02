import { useState } from 'react'

const changes: { status: 'M' | 'A'; file: string }[] = [
  { status: 'M', file: 'about.html' },
  { status: 'M', file: 'projects.js' },
  { status: 'A', file: 'achievements.md' },
  { status: 'M', file: 'contact.css' },
  { status: 'M', file: 'ActivityBar.tsx' },
]

const statusColor: Record<string, string> = {
  M: '#e2c08d',
  A: '#73c991',
}

export function SourceControlPanel() {
  const [message, setMessage] = useState('')
  const [committed, setCommitted] = useState(false)

  return (
    <div className="flex h-full flex-col bg-vscode-bg2">
      <div className="no-select flex items-center justify-between px-4 py-2 text-[11px] font-semibold tracking-wide text-vscode-dim">
        <span>SOURCE CONTROL</span>
      </div>

      <div className="px-3 pb-3">
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
            setCommitted(false)
          }}
          placeholder="Message (Ctrl+Enter to commit)"
          rows={2}
          className="w-full resize-none rounded-sm border border-vscode-border bg-white/[0.03] px-2 py-1.5 text-xs text-vscode-bright outline-none placeholder:text-vscode-dim focus:border-vscode-blue2"
        />
        <button
          onClick={() => setCommitted(true)}
          disabled={committed}
          className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-sm bg-vscode-blue px-2 py-1.5 text-xs font-semibold text-white hover:bg-vscode-blue2 disabled:cursor-default disabled:opacity-60"
        >
          ✓ Commit
        </button>
        {committed && (
          <p className="mt-2 text-[11px] leading-snug text-vscode-dim">
            Nothing to push — she already shipped this to the real GitHub. 🚀
          </p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-1 text-[11px] font-semibold tracking-wide text-vscode-dim">
          <span>CHANGES</span>
          <span className="rounded-full bg-white/10 px-1.5 text-[10px] text-vscode-text">{changes.length}</span>
        </div>
        {changes.map((c) => (
          <div
            key={c.file}
            className="flex items-center justify-between py-1 pl-4 pr-3 text-[13px] text-vscode-text hover:bg-white/5"
          >
            <span className="truncate">{c.file}</span>
            <span className="ml-2 shrink-0 font-mono text-xs font-bold" style={{ color: statusColor[c.status] }}>
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
