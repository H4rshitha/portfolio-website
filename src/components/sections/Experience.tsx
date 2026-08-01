import { experience } from '../../data/resume'
import { Card, Comment, ExternalLink, FileWrap, Heading } from './shared'

export function Experience() {
  return (
    <FileWrap>
      <Comment>{'// experience.json'}</Comment>
      <Heading>Experience</Heading>
      {experience.map((e) => (
        <Card key={e.title + e.company}>
          <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="font-display text-base font-bold text-vscode-bright">{e.title}</h3>
            <span className="font-mono text-xs text-vscode-dim">{e.period}</span>
          </div>
          <p className="mb-3 text-sm italic text-vscode-blue2">
            {e.company} · {e.location}
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-vscode-text">
            {e.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          {e.certificate && (
            <div className="mt-3 text-sm">
              <ExternalLink href={e.certificate}>View certificate</ExternalLink>
            </div>
          )}
        </Card>
      ))}
    </FileWrap>
  )
}
