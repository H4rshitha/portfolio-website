import { projects } from '../../data/resume'
import { Comment, ExternalLink, FileWrap, Heading, Tag } from './shared'

export function ProjectFile({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug)
  if (!project) return null

  return (
    <FileWrap>
      <Comment>{`// projects/${project.slug}.tsx`}</Comment>
      <Heading>{project.name}</Heading>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-vscode-dim">{project.period}</span>
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <p className="mb-4 text-sm italic leading-relaxed text-vscode-blue2">{project.description}</p>
      <ul className="mb-6 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-vscode-text">
        {project.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-4 text-sm">
        {project.github && <ExternalLink href={project.github}>View on GitHub</ExternalLink>}
        {project.demo && <ExternalLink href={project.demo}>Live Demo</ExternalLink>}
        {project.admin && <ExternalLink href={project.admin}>Admin Panel</ExternalLink>}
      </div>
    </FileWrap>
  )
}
