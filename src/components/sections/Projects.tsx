import { projects } from '../../data/resume'
import { Comment, ExternalLink, FileWrap, Heading, Tag, hoverCard } from './shared'

export function Projects() {
  return (
    <FileWrap>
      <Comment>{"// projects.js — things I've built & shipped"}</Comment>
      <Heading>Projects</Heading>
      <p className="-mt-4 mb-8 font-mono text-xs text-vscode-dim">
        const projects = [ ...shipped, ...building ]
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <div
            key={p.slug}
            className={`flex flex-col rounded-md border border-vscode-border bg-white/[0.02] p-5 ${hoverCard}`}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <span className="text-2xl leading-none">{p.emoji}</span>
              <div className="flex flex-wrap justify-end gap-3 text-xs">
                {p.github && <ExternalLink href={p.github}>GitHub</ExternalLink>}
                {p.demo && <ExternalLink href={p.demo}>Live</ExternalLink>}
              </div>
            </div>
            <p className="mb-1 font-mono text-[11px] font-bold uppercase tracking-wider text-vscode-yellow">
              {p.category}
            </p>
            <h3 className="mb-2 font-display text-lg font-bold leading-snug text-vscode-bright">{p.name}</h3>
            <p className="mb-4 flex-1 text-sm leading-relaxed text-vscode-text">{p.description}</p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </FileWrap>
  )
}
