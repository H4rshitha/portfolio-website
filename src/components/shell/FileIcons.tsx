import type { FileExt } from '../../data/files'

function Chip({ bg, fg, children }: { bg: string; fg: string; children: string }) {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0">
      <rect x="0.5" y="0.5" width="15" height="15" rx="3" fill={bg} />
      <text
        x="8"
        y="11.3"
        textAnchor="middle"
        fontSize={children.length > 2 ? 6.2 : 7.4}
        fontWeight="700"
        fontFamily="ui-monospace, Menlo, monospace"
        letterSpacing="-0.3"
        fill={fg}
      >
        {children}
      </text>
    </svg>
  )
}

function Glyph({ color, children, size = 9 }: { color: string; children: string; size?: number }) {
  return (
    <span
      className="inline-flex w-4 shrink-0 justify-center font-mono font-bold leading-none"
      style={{ color, fontSize: size }}
    >
      {children}
    </span>
  )
}

function Css3Icon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="#2965f1">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
    </svg>
  )
}

function ReactAtom({ color }: { color: string }) {
  return (
    <svg viewBox="-12 -11 24 22" className="h-4 w-4 shrink-0" style={{ color }}>
      <circle r="2.1" fill="currentColor" />
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <ellipse rx="10.5" ry="4.2" />
        <ellipse rx="10.5" ry="4.2" transform="rotate(60)" />
        <ellipse rx="10.5" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  )
}

export function FileIcon({ ext }: { ext: FileExt }) {
  switch (ext) {
    case 'tsx':
      return <ReactAtom color="#61dafb" />
    case 'ts':
      return <Chip bg="#3178c6" fg="#ffffff">TS</Chip>
    case 'js':
      return <Chip bg="#f7df1e" fg="#1a1a1a">JS</Chip>
    case 'html':
      return <Chip bg="#e34f26" fg="#ffffff">{'</>'}</Chip>
    case 'css':
      return <Css3Icon />
    case 'pdf':
      return <Chip bg="#eb5757" fg="#ffffff">PDF</Chip>
    case 'json':
      return <Glyph color="#dcb67a">{'{}'}</Glyph>
    case 'yml':
      return <Glyph color="#cb171e">YML</Glyph>
    case 'txt':
      return <Glyph color="#9aa0a6">TXT</Glyph>
    case 'md':
    default:
      return <Chip bg="#8957e5" fg="#ffffff">{'M↓'}</Chip>
  }
}
