import type { ReactNode } from 'react'

export function FileWrap({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-10">{children}</div>
}

export function Comment({ children }: { children: ReactNode }) {
  return <div className="mb-6 font-mono text-xs text-vscode-green/80">{children}</div>
}

export function Heading({ children }: { children: ReactNode }) {
  return (
    <h1 className="mb-6 font-display text-2xl font-bold text-vscode-bright sm:text-3xl">
      <span className="text-vscode-dim">## </span>
      {children}
    </h1>
  )
}

export function SubHeading({ children }: { children: ReactNode }) {
  return <h2 className="mb-2 font-display text-base font-bold text-vscode-blue2">{children}</h2>
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm border border-vscode-border bg-white/5 px-2 py-0.5 text-[11px] text-vscode-blue2">
      {children}
    </span>
  )
}

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-vscode-blue2 hover:text-vscode-bright hover:underline"
    >
      {children} ↗
    </a>
  )
}

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 rounded-md border border-vscode-border bg-white/[0.02] p-5 transition-colors hover:border-white/20">
      {children}
    </div>
  )
}
