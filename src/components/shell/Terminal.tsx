import { useEffect, useRef, useState } from 'react'
import { useWorkspace } from '../../context/WorkspaceContext'
import { profile, skills, projects } from '../../data/resume'

interface Line {
  type: 'input' | 'output'
  text: string
}

const HELP_TEXT = [
  'Available commands:',
  '  help          show this list',
  '  about         who is Harshitha?',
  '  whoami        current user',
  '  projects      list projects',
  '  skills        list tech stack',
  '  contact       show contact info',
  '  date          current date/time',
  '  git log       recent (fake) commits',
  '  git status    repo status',
  '  clear         clear the terminal',
  '  cd <dir>      change directory (cosmetic only)',
]

const FAKE_LOG = [
  'a1f3c2e feat: add glacial lake segmentation pipeline',
  'b7d4a1f fix: optimise inference latency for rip current model',
  'd1f8c4a chore: deploy portfolio to Vercel',
  'e29a01c docs: update resume and project links',
]

function runCommand(raw: string, cwd: string): { output: string[]; cwd?: string; clear?: boolean } {
  const cmd = raw.trim()
  const lower = cmd.toLowerCase()

  if (!cmd) return { output: [] }
  if (lower === 'help') return { output: HELP_TEXT }
  if (lower === 'clear') return { output: [], clear: true }
  if (lower === 'date') return { output: [new Date().toString()] }
  if (lower === 'whoami') return { output: [`${profile.name.toLowerCase().replace(/\s+/g, '-')} (${profile.roles[0]})`] }
  if (lower === 'about') return { output: [profile.bio] }
  if (lower === 'pwd') return { output: [cwd] }
  if (lower === 'ls') return { output: ['about.md  experience.json  projects/  skills.json  contact.tsx'] }
  if (lower === 'contact')
    return {
      output: [`email  ${profile.email}`, `phone  ${profile.phone}`, `github ${profile.github}`, `linkedin ${profile.linkedin}`],
    }
  if (lower === 'skills') return { output: skills.map((s) => `${s.category.padEnd(20)} ${s.items.join(', ')}`) }
  if (lower === 'projects') return { output: projects.map((p) => `- ${p.name} (${p.period})`) }
  if (lower === 'git log') return { output: FAKE_LOG }
  if (lower === 'git status')
    return { output: ["On branch main", 'Your branch is up to date with origin/main.', 'nothing to commit, working tree clean'] }
  if (lower.startsWith('cd')) {
    const target = cmd.slice(2).trim() || '~'
    return { output: [], cwd: target === '..' ? '~' : `~/${target.replace(/^~\/?/, '')}` }
  }
  if (lower === 'sudo' || lower.startsWith('sudo ')) return { output: ["Nice try. This isn't that kind of terminal."] }
  if (lower === 'python' || lower === 'python3') return { output: ['Python interactive mode not available here.'] }
  return { output: [`command not found: ${cmd}`, "type 'help' to see available commands."] }
}

export function TerminalPanel() {
  const { terminalOpen, toggleTerminal, isMobile } = useWorkspace()
  const [lines, setLines] = useState<Line[]>([
    { type: 'output', text: "Type 'help' to see available commands." },
  ])
  const [input, setInput] = useState('')
  const [cwd, setCwd] = useState('~')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (terminalOpen) setTimeout(() => inputRef.current?.focus(), 10)
  }, [terminalOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [lines])

  if (!terminalOpen) return null

  const submit = () => {
    const result = runCommand(input, cwd)
    if (result.clear) {
      setLines([])
    } else {
      setLines((ls) => [...ls, { type: 'input', text: `${cwd} $ ${input}` }, ...result.output.map((t) => ({ type: 'output' as const, text: t }))])
    }
    if (result.cwd) setCwd(result.cwd)
    setInput('')
  }

  return (
    <div
      className={`no-select flex flex-col border-t border-vscode-border bg-vscode-bg2 ${
        isMobile ? 'fixed inset-x-0 bottom-0 top-8 z-50' : 'h-56 shrink-0'
      }`}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center justify-between border-b border-vscode-border px-3 py-1 text-[11px] text-vscode-dim">
        <span>TERMINAL — bash</span>
        <button onClick={toggleTerminal} className="px-2 hover:text-vscode-bright" aria-label="Close terminal">
          ×
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-2 font-mono text-[12.5px] leading-relaxed">
        {lines.map((l, i) => (
          <div key={i} className={l.type === 'input' ? 'text-vscode-green' : 'whitespace-pre-wrap text-vscode-text'}>
            {l.text}
          </div>
        ))}
        <div className="flex items-center gap-1 text-vscode-green">
          <span>{cwd} $</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            className="flex-1 bg-transparent text-vscode-bright outline-none"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
