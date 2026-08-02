import { useEffect, useRef, useState } from 'react'
import { useWorkspace } from '../../context/WorkspaceContext'
import { getResponse, suggestions } from './responseEngine'

interface Message {
  role: 'user' | 'assistant'
  text: string
}

const COUNT_KEY = 'harshitha_copilot_count'
const BASE_FREE_MESSAGES = 8

function loadCount(): number {
  if (typeof window === 'undefined') return 0
  return Number(localStorage.getItem(COUNT_KEY) || 0)
}

export function CopilotPanel() {
  const { copilotOpen, toggleCopilot, isMobile, dinoHighScore, setDinoOpen } = useWorkspace()
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "Hi, I'm Harshitha's Copilot 🤖 Ask me about her projects, skills, experience, or how to get in touch.",
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [usedCount, setUsedCount] = useState(loadCount)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const bonus = Math.floor(dinoHighScore / 10)
  const limit = BASE_FREE_MESSAGES + bonus
  const remaining = Math.max(0, limit - usedCount)

  useEffect(() => {
    if (copilotOpen) setTimeout(() => inputRef.current?.focus(), 10)
  }, [copilotOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }, [messages, typing])

  if (!copilotOpen) return null

  async function send(text?: string) {
    const q = (text ?? input).trim()
    if (!q || remaining <= 0) return
    const nextMessages = [...messages, { role: 'user' as const, text: q }]
    setMessages(nextMessages)
    setInput('')
    setTyping(true)
    const nextCount = usedCount + 1
    setUsedCount(nextCount)
    localStorage.setItem(COUNT_KEY, String(nextCount))

    const firstUserIdx = nextMessages.findIndex((m) => m.role === 'user')
    const apiMessages = nextMessages
      .slice(firstUserIdx)
      .map((m) => ({ role: m.role, content: m.text }))

    let reply: string
    try {
      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })
      if (!res.ok) throw new Error(`Copilot API error: ${res.status}`)
      const data = (await res.json()) as { text: string }
      reply = data.text
    } catch {
      reply = getResponse(q)
    }

    setMessages((m) => [...m, { role: 'assistant', text: reply }])
    setTyping(false)
  }

  const panelClasses = isMobile
    ? 'fixed inset-0 z-[90] animate-fade-in'
    : 'w-[360px] shrink-0 border-l border-vscode-border animate-slide-in-right'

  return (
    <div className={`${panelClasses} flex flex-col bg-vscode-bg2`}>
      <div className="no-select flex items-center justify-between border-b border-vscode-border px-3 py-2">
        <div>
          <p className="text-sm font-bold text-vscode-bright">Harshitha's Copilot</p>
          <p className="text-[11px] text-vscode-dim">Ask about my projects, skills &amp; experience</p>
        </div>
        <button
          onClick={toggleCopilot}
          className="rounded-sm px-2 text-vscode-dim hover:bg-white/10 hover:text-vscode-bright"
          aria-label="Close Copilot"
        >
          ×
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[90%] whitespace-pre-wrap rounded-md px-3 py-2 text-[13px] leading-relaxed animate-slide-up ${
              m.role === 'user'
                ? 'ml-auto bg-vscode-accent/25 text-vscode-bright'
                : 'mr-auto border border-vscode-border bg-vscode-bg text-vscode-text'
            }`}
          >
            {m.text}
          </div>
        ))}
        {typing && (
          <div className="mr-auto flex w-fit items-center gap-1 rounded-md border border-vscode-border bg-vscode-bg px-3 py-2">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-vscode-dim [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-vscode-dim [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-vscode-dim" />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length < 3 && (
        <div className="flex flex-wrap gap-1.5 border-t border-vscode-border px-3 py-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-vscode-border px-2.5 py-1 text-[11px] text-vscode-dim hover:border-vscode-blue2/50 hover:text-vscode-blue2"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="border-t border-vscode-border p-3">
        {remaining > 0 ? (
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  send()
                }
              }}
              rows={1}
              placeholder="Ask a question..."
              className="max-h-24 flex-1 resize-none rounded-sm border border-vscode-border bg-white/[0.03] px-2.5 py-2 text-[13px] text-vscode-bright outline-none placeholder:text-vscode-dim focus:border-vscode-blue2"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim()}
              className="rounded-sm border border-vscode-accent/50 bg-vscode-accent/20 px-3 py-2 text-xs font-semibold text-vscode-bright hover:bg-vscode-accent/30 disabled:opacity-40"
            >
              Send
            </button>
          </div>
        ) : (
          <div className="rounded-sm border border-vscode-border bg-white/[0.03] p-3 text-center">
            <p className="mb-2 text-[12px] text-vscode-text">
              You've used all your free messages for now.
            </p>
            <button
              onClick={() => setDinoOpen(true)}
              className="rounded-sm border border-vscode-accent/50 bg-vscode-accent/15 px-3 py-1.5 text-[11px] font-semibold text-vscode-bright hover:bg-vscode-accent/25"
            >
              🦖 Beat your dino high score to unlock more
            </button>
          </div>
        )}
        <p className="mt-1.5 text-center text-[10px] text-vscode-dim">
          {remaining} of {limit} messages left · powered by Gemini
        </p>
      </div>
    </div>
  )
}
