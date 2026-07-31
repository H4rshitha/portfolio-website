import { useRef, type ReactNode } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'

export interface MenuItem {
  label: string
  shortcut?: string
  onClick?: () => void
  disabled?: boolean
  divider?: boolean
}

export function Dropdown({
  open,
  onClose,
  items,
  children,
}: {
  open: boolean
  onClose: () => void
  items: MenuItem[]
  children?: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, onClose, open)

  if (!open) return null

  return (
    <div
      ref={ref}
      className="absolute left-0 top-full z-50 mt-0.5 min-w-[220px] rounded-sm border border-vscode-border bg-vscode-bg3 py-1 text-xs shadow-xl animate-fade-in"
    >
      {children}
      {items.map((item, i) =>
        item.divider ? (
          <div key={i} className="my-1 border-t border-vscode-border" />
        ) : (
          <button
            key={i}
            disabled={item.disabled}
            onClick={() => {
              item.onClick?.()
              onClose()
            }}
            className="flex w-full items-center justify-between gap-6 px-3 py-1.5 text-left text-vscode-text hover:bg-vscode-blue hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-vscode-text"
          >
            <span>{item.label}</span>
            {item.shortcut && <span className="text-vscode-dim">{item.shortcut}</span>}
          </button>
        ),
      )}
    </div>
  )
}
