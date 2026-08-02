type IconProps = { className?: string }

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function ExplorerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 2h9a2 2 0 0 1 2 2z" />
    </svg>
  )
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <circle cx="11" cy="11" r="7.5" />
      <line x1="21" y1="21" x2="16.2" y2="16.2" />
    </svg>
  )
}

export function SourceControlIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21 8.25C21 6.1815 19.3185 4.5 17.25 4.5C15.1815 4.5 13.5 6.1815 13.5 8.25C13.5 10.023 14.739 11.5035 16.395 11.892C16.116 12.819 15.2655 13.5 14.25 13.5H9.75C8.9025 13.5 8.1285 13.7925 7.5 14.268V7.4235C9.21 7.0755 10.5 5.5605 10.5 3.75C10.5 1.6815 8.8185 0 6.75 0C4.6815 0 3 1.6815 3 3.75C3 5.562 4.29 7.0755 6 7.4235V16.575C4.29 16.923 3 18.438 3 20.2485C3 22.317 4.6815 23.9985 6.75 23.9985C8.8185 23.9985 10.5 22.317 10.5 20.2485C10.5 18.4755 9.261 16.995 7.605 16.6065C7.884 15.6795 8.7345 14.9985 9.75 14.9985H14.25C16.0845 14.9985 17.61 13.6725 17.931 11.9295C19.674 11.607 21 10.0845 21 8.25ZM4.5 3.75C4.5 2.5095 5.5095 1.5 6.75 1.5C7.9905 1.5 9 2.5095 9 3.75C9 4.9905 7.9905 6 6.75 6C5.5095 6 4.5 4.9905 4.5 3.75ZM9 20.25C9 21.4905 7.9905 22.5 6.75 22.5C5.5095 22.5 4.5 21.4905 4.5 20.25C4.5 19.0095 5.5095 18 6.75 18C7.9905 18 9 19.0095 9 20.25ZM17.25 10.5C16.0095 10.5 15 9.4905 15 8.25C15 7.0095 16.0095 6 17.25 6C18.4905 6 19.5 7.0095 19.5 8.25C19.5 9.4905 18.4905 10.5 17.25 10.5Z" />
    </svg>
  )
}

export function ExtensionsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1" />
    </svg>
  )
}

export function SparkleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.5c.6 3.4 1.4 5.4 2.6 6.6 1.2 1.2 3.2 2 6.6 2.6-3.4.6-5.4 1.4-6.6 2.6-1.2 1.2-2 3.2-2.6 6.6-.6-3.4-1.4-5.4-2.6-6.6-1.2-1.2-3.2-2-6.6-2.6 3.4-.6 5.4-1.4 6.6-2.6 1.2-1.2 2-3.2 2.6-6.6z" />
    </svg>
  )
}

export function SettingsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82A1.65 1.65 0 0 0 3 13.09H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}
